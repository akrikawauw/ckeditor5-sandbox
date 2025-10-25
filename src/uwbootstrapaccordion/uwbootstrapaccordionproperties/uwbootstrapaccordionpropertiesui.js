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
import UwBootstrapAccordionPropertiesView from './uwbootstrapaccordionpropertiesview';
import {
  _getSelectedAccordionWidget,
  _getSelectedAccordionModelElement,
  getSelectedAccordionWidget,
  getAccordionWidgetAncestor,
  findElement,
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

    editor.config.define('uwBootstrapAccordion.accordionProperties', {
      id: 'putidhere',
      accessibleTitleInput: 'put accessible title here',
    });
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;

    this._balloon = editor.plugins.get(ContextualBalloon);

    this._addToolbarButton();
    this.propertiesFormView = this._createPropertiesFormView();
  }

  /**
   * Adds the accordion properties button.
   *
   * @private
   */
  _addToolbarButton() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('accordionProperties', (locale) => {
      const buttonView = new ButtonView(editor.locale);

      buttonView.set({
        label: t('Accordion properties'),
        icon: IconInsertMergeField,
        tooltip: true,
      });

      // Bind button to the command.
      // The state on the button depends on the command values.
      const command = editor.commands.get('uwBootstrapAccordionProperties');
      buttonView.bind('isEnabled').to(command, 'isEnabled');
      buttonView.bind('isOn').to(command, 'value', (value) => !!value);

      // Execute the command whehn the button is clicked.
      this.listenTo(buttonView, 'execute', () => this._showView());

      return buttonView;
    });
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

  _createPropertiesFormView() {
    const editor = this.editor;
    const t = editor.t;
    const command = editor.commands.get('uwBootstrapAccordionProperties');
    const propertiesFormView = new UwBootstrapAccordionPropertiesView(
      editor.locale
    );

    // Form submit handler.
    this.listenTo(propertiesFormView, 'submit', () => {
      let values = {
        id: propertiesFormView.idInputView.fieldView.element.value,
        uwBootstrapAccordionAccessibleTitle:
          propertiesFormView.accessibleTitleInput.fieldView.element.value,
      };

      this.editor.execute('uwBootstrapAccordionProperties', values);

      // Hide the form view after submit.
      this._hideView();
    });

    this.listenTo(propertiesFormView, 'cancel', () => {
      this._hideView();
    });

    // Close on click outside of balloon panel element.
    clickOutsideHandler({
      emitter: propertiesFormView,
      activator: () => this._isViewInBalloon,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideView(),
    });

    return propertiesFormView;
  }

  _addFormView() {
    this._balloon.add({
      view: this.propertiesFormView,
      position: this._getBalloonPositionData(),
    });

    const command = this.editor.commands.get('uwBootstrapAccordionProperties');

    const modelToFormFields = {
      id: 'idInputView',
      uwBootstrapAccordionAccessibleTitle: 'accessibleTitleInput',
    };

    // Handle text input fields.
    Object.entries(modelToFormFields).forEach(([modelName, formElName]) => {
      const formEl = this.propertiesFormView[formElName];

      // Needed to display a placeholder of the elements being focused before.
      formEl.focus();

      const isEmpty =
        !command.value ||
        !command.value[modelName] ||
        command.value[modelName] === '';

      // Set URL default value.
      // if (modelName === 'demoLinkUrl' && isEmpty) {
      //   formEl.fieldView.element.value = '#';
      //   formEl.set('isEmpty', false);
      //   return;
      // }

      if (!isEmpty) {
        formEl.fieldView.element.value = command.value[modelName];
        console.log(
          'not empty...loading model field conversion',
          formEl.fieldView.element.value
        );
      }
      formEl.set('isEmpty', isEmpty);
    });
    // Reset the focus to the first form element.
    // this.propertiesFormView.focus();
  }

  /**
   * Shows the UI.
   */
  _showView() {
    this._addFormView();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    // console.log('balloon position info', viewDocument.selection);
    // const selection = this.editor.model.document.selection;
    // console.log('selection', selection);
    // const modelAccordion = _getSelectedAccordionWidget(selection);
    // console.log('modelAccordion', modelAccordion);
    // const viewAccordion =
    // this.editor.editing.mapper.toViewElement(modelAccordion);

    // return {
    // TODO: figure out if there's a way to reposition the balloon on the accordion we
    // are in and not where the text cursor position is at the time.
    // target = () =>
    // this.editor.editing.view.domConverter.mapViewToDom(viewAccordion);
    // target = () => view.domConverter.mapViewToDom(viewAccordion);
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());
    // console.log(target);
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
    this.propertiesFormView.saveButtonView.focus();

    this._balloon.remove(this.propertiesFormView);

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

    if (
      !_getSelectedAccordionWidget(viewDocument.selection)
      // !_getSelectedAccordionModelElement(
      //   this.editor.model,
      //   'uwBootstrapAccordion'
      // )
      // !getAccordionWidgetAncestor(viewDocument.selection)
    ) {
      this._hideView();
    } else if (this._isViewVisible) {
      repositionContextualBalloon(editor, 'uwBootstrapAccordion');
    }
  }

  /**
   * Returns `true` when the {@link #view} is the visible in the {@link #_balloon}.
   */
  _isViewVisible() {
    return !this.view && this._balloon.visibleView === this.view;
  }
}
