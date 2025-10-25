import {
  ContextualBalloon,
  Plugin,
  ButtonView,
  IconTableProperties,
  clickOutsideHandler,
} from 'ckeditor5';
import UwBootstrapAccordionItemPropertiesView from './uwbootstrapaccordionitempropertiesview';
import { _getSelectedAccordionWidget } from '../uwbootstrapaccordionutils';

export default class UwBootstrapAccordionItemPropertiesUI extends Plugin {
  static get requires() {
    return [ContextualBalloon];
  }
  /**
   * @inheritDoc
   */
  constructor(editor) {
    super(editor);

    editor.config.define('uwBootstrapAccordion.accordionItemProperties', {});
  }

  /**
   * @inheritDoc
   */
  init() {
    const editor = this.editor;

    this._balloon = editor.plugins.get(ContextualBalloon);

    editor.ui.componentFactory.add('accordionItemProperties', () =>
      this._createAccordionItemPropertiesButton()
    );
  }

  /**
   * Creates the table properties button.
   *
   * @internal
   */
  _createAccordionItemPropertiesButton() {
    const editor = this.editor;
    const t = editor.t;

    const view = new ButtonView(editor.locale);

    view.set({
      label: t('Accordion item properties'),
      icon: IconTableProperties,
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

  _createAccordionItemPropertiesView() {
    const editor = this.editor;
    const config = editor.config.get(
      'uwBootstrapAccordion.accordionItemProperties'
    );
    // Get configuration settings for all things here. TODO:

    const view = new UwBootstrapAccordionItemPropertiesView(editor.locale, {
      // assign values from config here.
    });
    const t = editor.t;

    // Render the view so its #element is available for the clickOutsideHandler.
    view.render();

    this.listenTo(view, 'submit', () => {
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

    return view;
  }

  _showView() {
    const editor = this.editor;

    // const viewAccordionItem = _getSelectedAccordionWidget(
    //   editor.editing.view.document.selection
    // );

    this.view = this._createAccordionItemPropertiesView();

    this.listenTo(editor.ui, 'update', () => {
      this._updateView();
    });

    this._balloon.add({
      view: this.view,
      position: this._getBalloonPositionData(),
    });
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

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
    // this.view.saveButtonView.focus();

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

    if (!_getSelectedAccordionWidget(viewDocument.selection)) {
      this._hideView();
    } else if (this._isViewVisible) {
      repositionContextualBalloon(editor, 'uwBootstrapAccordionItem');
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
  // _getPropertyChangeCallback(commandName) {
  //   return (EventInfo, propertyName, newValue) => {
  //     // Do not execute the command on initial call (opening the table properties view).
  //     if (this._isReady) {
  //       return;
  //     }

  //     this.editor.execute(commandName, {
  //       value: newValue,
  //     });
  //   };
  // }
}
