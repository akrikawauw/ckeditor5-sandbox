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

    this._addToolbarButton();
    this.itemPropertiesFormView = this._createItemPropertiesView();
  }

  /**
   * Creates the table properties button.
   *
   * @internal
   */
  _addToolbarButton() {
    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('accordionItemProperties', (locale) => {
      const buttonView = new ButtonView(editor.locale);

      buttonView.set({
        label: t('Accordion item properties'),
        icon: IconTableProperties,
        tooltip: true,
      });

      const command = editor.commands.get('uwBootstrapAccordionItemProperties');
      buttonView.bind('isEnabled').to(command, 'isEnabled');

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
    if (this.itemPropertiesFormView) {
      this.itemPropertiesFormView.destroy();
    }
  }

  _createItemPropertiesView() {
    const editor = this.editor;
    const t = editor.t;
    const command = editor.config.get('uwBootstrapAccordionItemProperties');
    const itemPropertiesFormView = new UwBootstrapAccordionItemPropertiesView(
      editor.locale
    );

    this.listenTo(itemPropertiesFormView, 'submit', () => {
      let values = {
        uwBootstrapAccordionItemId:
          itemPropertiesFormView.idInput.fieldView.element.value,
        uwBootstrapAccordionButtonText:
          itemPropertiesFormView.accordionButtonText.fieldView.element.value,
      };
      // console.log(values);
      this.editor.execute('uwBootstrapAccordionItemProperties', values);

      // Hide the form view after submit.
      this._hideView();
    });

    this.listenTo(itemPropertiesFormView, 'cancel', () => {
      this._hideView();
    });

    // Close on click outside of balloon panel element.
    clickOutsideHandler({
      emitter: itemPropertiesFormView,
      activator: () => this._isViewInBalloon,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideView(),
    });

    return itemPropertiesFormView;
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

  _addFormView() {
    this._balloon.add({
      view: this.itemPropertiesFormView,
      position: this._getBalloonPositionData(),
    });

    const command = this.editor.commands.get(
      'uwBootstrapAccordionItemProperties'
    );

    const modelToFormFields = {
      uwBootstrapAccordionItemId: 'idInput',
      uwBootstrapAccordionButtonText: 'accordionButtonText',
    };

    // Handle text input fields.
    Object.entries(modelToFormFields).forEach(([modelName, formElName]) => {
      const formEl = this.itemPropertiesFormView[formElName];
      console.log(formElName, formEl);
      // Needed to display a placeholder of the elements being focused before.
      formEl.focus();

      const isEmpty =
        !command.value ||
        !command.value[modelName] ||
        command.value[modelName] === '';

      // TODO - maybe set the id value here instead of in insertuwBootstrapAccorrdionCommand

      if (!isEmpty) {
        formEl.fieldView.element.value = command.value[modelName];
      }
      formEl.set('isEmpty', isEmpty);
    });

    // Handle the switch input fields.
    // const modelToSwitchButtons = {
    //   uwBootstrapAccordionTitleStyle: 'titleStyleSwitchButton',
    //   uwBootstrapAccordionTitleWeight: 'titleWeightSwitchButton',
    // };

    // this.itemPropertiesFormView;
    // Object.entries(modelToSwitchButtons).forEach(([modelName, formElName]) => {
    //   const formEl = this.itemPropertiesFormView[formElName];
    //   // console.log(formEl);
    //   formEl.focus();
    //   let isOn = false;
    //   console.log(formElName);
    //   // Needed to display a placeholder of the elements being focused before.
    //   if (formElName === 'titleStyleSwitchButton') {
    //     isOn = command.value[modelName] === 'uppercase';
    //   } else if (formElName === 'titleWeightSwitchButton') {
    //     isOn = command.value[modelName] === 'bold';
    //   }
    //   formEl.set('isOn', isOn);
    // });
  }

  /**
   * Shows the UI.
   */
  _showView() {
    this._addFormView();
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
    // this.propertiesItemFormView.saveButtonView.focus();

    this._balloon.remove(this.itemPropertiesFormView);

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

    // if (!_getSelectedAccordionWidget(viewDocument.selection)) {
    if (!findElement(viewDocument.selection, 'uwBootstrapAccordionItem')) {
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
