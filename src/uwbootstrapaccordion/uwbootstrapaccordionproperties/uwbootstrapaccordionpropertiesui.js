import {
  ContextualBalloon,
  Plugin,
  ButtonView,
  IconTableProperties,
  clickOutsideHandler,
  ViewPosition,
  IconInsertMergeField,
  ViewDocumentSelection,
  LabeledFieldView,
} from 'ckeditor5';
import { UwBootstrapAccordionPropertiesCommand } from './uwbootstrapaccordionpropertiescommand';
import UwBootstrapAccordionPropertiesView from './uwbootstrapaccordionpropertiesview';
import {
  _getSelectedAccordionWidget,
  _getSelectedAccordionModelElement,
  getSelectedAccordionWidget,
  getAccordionWidgetAncestor,
} from '../uwbootstrapaccordionutils';

export default class UwBootstrapAccordionPropertiesUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);

    editor.config.define('uwBootstrapAccordion.accordionProperties', {});
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;

    this._balloon = editor.plugins.get(ContextualBalloon);

    editor.ui.componentFactory.add('accordionProperties', () =>
      this._createAccordionPropertiesButton()
    );
  }

  /**
   * Creates the accordion properties button.
   *
   * @internal
   */
  _createAccordionPropertiesButton() {
    const editor = this.editor;
    const t = editor.t;

    const view = new ButtonView(editor.locale);

    view.set({
      label: t('Accordion properties'),
      icon: IconInsertMergeField,
      tooltip: true,
    });

    this.listenTo(view, 'execute', () => this._showView());

    return view;
  }
  /**
   * @inheritDoc
   */
  destroy() {
    super.destroy();

    // Destroy created UI components as they are not automatically destroyed.
    // See https://github.com/ckeditor/ckeditor5/issues/1341.
    if (this.view) {
      this.view.destroy();
    }
  }

  _createAccordionPropertiesView() {
    const editor = this.editor;
    const config = editor.config.get(
      'uwBootstrapAccordion.accordionProperties'
    );
    // Get configuration settings for all things here. TODO:

    const view = new UwBootstrapAccordionPropertiesView(editor.locale, {
      // assign values from config here.
    });
    const t = editor.t;

    // Render the view so its #element is available for the clickOutsideHandler.
    // view.render();
    view.on('change:idInputView', this._someCallbackFunction('idInputView'));
    // Listen for submit and change model accordingly.
    this.listenTo(view, 'submit', () => {
      // Setting texts: title and abbreviation.
      // ...
      const title = view.accessibleTitleInput.fieldView.element.value;
      const id = view.idInputView.fieldView.element.value;
      console.log('readingthis', title);
      // Write the field data to the model
      editor.model.change((writer) => {
        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();
        // const foundElement; // todo, figure out how to find the accordion element
        // write a function for this _getSelectedAccordionAccessibleTitle

        if (selectedElement && id) {
          writer.setAttribute('id', id, selectedElement);
        }
        if (selectedElement && title) {
          this._changeViewContent(title, selection);
        }
      });

      // Hide the form view after submit.
      this._hideView();
    });

    this.listenTo(view, 'cancel', () => {
      this._hideView();
    });

    // Close on click outside of balloon panel element.
    clickOutsideHandler({
      emitter: view,
      activator: () => this._isViewInBalloon,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideView(),
    });

    view.on(
      'change:idInputView',
      this._someCallbackFunction({ viewField: view.idInputView })
    );
    view.on('change:accessibleTitleInput', () => {
      console.log('on event');
    });

    return view;
  }

  _showView() {
    const editor = this.editor;
    const viewAccordion = _getSelectedAccordionWidget(
      editor.editing.view.document.selection
    );
    const modelAccordion =
      viewAccordion && editor.editing.mapper.toModelElement(viewAccordion);

    this.view = this._createAccordionPropertiesView();

    this.listenTo(editor.ui, 'update', () => {
      this._updateView();
    });

    this._fillViewWithValues();

    this._balloon.add({
      view: this.view,
      position: this._getBalloonPositionData(),
    });
  }

  // _getBalloonPositionData(editor) {
  //   const selection = this.editor.model.document.selection;
  //   // const modelAccordion = _getSelectedAccordionWidget(selection);
  //   const modelAccordion = _getSelectedAccordionWidget(selection);
  //   // console.log(modelAccordion);
  //   const viewAccordion =
  //     this.editor.editing.mapper.toViewElement(modelAccordion);

  //   console.log(viewAccordion);
  //   // const view = this.editor.editing.view;
  //   // const viewDocument = view.document;
  //   // let target = null;

  //   // console.log(
  //   //   _getSelectedAccordionWidget(viewDocument.selection).is(ViewPosition)
  //   // );

  //   // Set a target position by converting view selection range to DOM.
  //   // view.domConverter.viewRangeToDom(
  //   //   _getSelectedAccordionWidget(viewDocument.selection).getFirstRange()
  //   // );
  //   // view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
  //   console.log(
  //     this.editor.editing.view.domConverter.mapViewToDom(viewAccordion)
  //   );
  //   return {
  //     target: this.editor.editing.view.domConverter.mapViewToDom(viewAccordion),
  //   };
  // }
  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;
    // console.log(viewDocument.getSelectedElement());
    // this.editor.model.change((writer) => {
    //   const firstAccordion = _getSelectedAccordionWidget(
    //     this.editor.view.document.selection
    //   );
    //   const position = writer.createPositionAt(firstAccordion.selection, 0);
    //   writer.setSelection(position);
    //   console.log(position);
    // });
    // console.log(
    //   'HERE',
    //   _getSelectedAccordionWidget(viewDocument.selection).document.selection
    // );
    // const thisStartingPoint = _getSelectedAccordionWidget(
    //   viewDocument.selection
    // );
    // Set a target position by converting view selection range to DOM.
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
    // view.domConverter.viewRangeToDom(
    //   thisStartingPoint.document.selection.getFirstRange()
    // );
    // console.log('TARGET', target);

    return {
      target,
    };
  }

  /**
   * Removes the {@link #view} from the {@link #_balloon}.
   */
  _hideView() {
    const editor = this.editor;

    this.stopListening(editor.ui, 'update');

    this._isReady = false;

    // Blur any input element before removing it from DOM to prevent issues in some browsers.
    // See https://github.com/ckeditor/ckeditor5/issues/1501.
    this.view.saveButtonView.focus();

    this._balloon.remove(this.view);

    // Make sure the focus is not lost in the process by putting it directly
    // into the editing view.
    this.editor.editing.view.focus();
  }

  /**
   * Repositions the {@link #_balloon} or hides the {@link #view} if a table is no longer selected.
   */
  _updateView() {
    const editor = this.editor;
    const viewDocument = editor.editing.view.document;
    const view = this.editor.editing.view;
    // console.log('updateView', view);

    // const title = view.accessibleTitleInput.fieldView.element.value;
    // const id = view.idInputView.fieldView.element.value;
    // console.log('readingthis');
    // // Write the field data to the model
    // editor.model.change((writer) => {
    //   const selection = editor.model.document.selection;
    //   const selectedElement = selection.getSelectedElement();
    //   // const foundElement; // todo, figure out how to find the accordion element
    //   // write a function for this _getSelectedAccordionAccessibleTitle

    //   if (selectedElement && id) {
    //     writer.setAttribute('id', id, selectedElement);
    //   }
    //   if (selectedElement && title) {
    //     this._changeViewContent(title, selection);
    //   }
    // });

    if (
      // !_getSelectedAccordionModelElement(
      //   this.editor.model,
      //   'uwBootstrapAccordion'
      // )
      !getAccordionWidgetAncestor(viewDocument.selection)
    ) {
      this._hideView();
    } else if (this._isViewVisible) {
      repositionContextualBalloon(editor, 'uwBootstrapAccordion');
    }
  }

  /**
   * Creates a callback that when executed upon {@link #view view's} property change
   * executes a related editor command with the new property value.
   *
   * If new value will be set to the default value, the command will not be executed.
   *
   * @param commandName The command that will be executed.
   */
  _getPropertyChangeCallback(commandName) {
    return (EventInfo, propertyName, newValue) => {
      // Do not execute the command on initial call (opening the table properties view).
      if (this._isReady) {
        return;
      }

      this.editor.execute(commandName, {
        value: newValue,
      });
    };
  }

  _someCallbackFunction(viewField) {
    // TODO - need to write a Command and put that in
    // uwbootstrapaccordionpropertiescommand.js or something like that.
    // if (this._isReady) {
    //   return;
    // }
    // console.log('on event fired + ', viewField);
    this.editor.execute('uwBootstrapAccordionProperties', {
      incomingText: viewField,
      modelElement: 'uwBootstrapAccordionAccessibleTitle',
    });
  }

  _fillViewWithValues() {
    this.view.accessibleTitleInput.fieldView.value = 'NOW!';
    // this.view.set(this.view.accessibleTitleInput, 'badooobaa!');
    // console.log('AGGGGHHH', this.view);
  }
}
