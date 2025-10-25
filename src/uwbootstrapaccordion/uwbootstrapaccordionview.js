// uwbootstrapaccordion/uwbootstrapaccordion.js

import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  ButtonView,
  IconCheck,
  IconCancel,
  submitHandler,
} from 'ckeditor5';

export default class FormView extends View {
  constructor(locale) {
    super(locale);

    // Get default values from view or model. Need to figure this out.

    this.idInputView = this._createIdInput();
    this.accessibleTitleInput = this._createAccessibleTitleInput();

    // console.log('idInputView', this.idInputView);
    // Create the save and cancel buttons.
    this.saveButtonView = this._createButton(
      'Save',
      IconCheck,
      'ck-button-save'
    );
    // Set the type to 'submit', which will trigger
    // the submit event on entire form when clicked.
    this.saveButtonView.type = 'submit';

    // Add a command that updates values when changes happen or on submit.
    // this.titleInputView.fieldView.value = 'balllallalal';

    this.cancelButtonView = this._createButton(
      'Cancel',
      IconCancel,
      'ck-button-cancel'
    );
    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.idInputView,
      this.accessibleTitleInput,
      this.saveButtonView,
      this.cancelButtonView,
    ]);
    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-accordion-form'],
        tabindex: '-1',
      },
      children: this.childViews,
    });
  }

  render() {
    super.render();

    // Submit the form when the user clicked the save button
    // or pressed enter in the input.
    submitHandler({
      view: this,
    });
  }

  focus() {
    this.childViews.first.focus();
  }

  _createInput(label, defaultValue) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );
    labeledInput.label = label;
    labeledInput.fieldView.value = defaultValue;
    return labeledInput;
  }

  _createIdInput() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = t('Accordion ID');
    labeledInput.class = 'ck-labeled-field-view_full-width';
    labeledInput.fieldView.bind('value').to(this, 'id');
    labeledInput.fieldView.on('input', () => {
      this.id = labeledInput.fieldView.element.value;
    });
    return labeledInput;
  }

  _createAccessibleTitleInput() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = t('Accessible name');
    labeledInput.class = 'ck-labeled-field-view_full-width';

    return labeledInput;
  }

  _createButton(label, icon, className) {
    const button = new ButtonView();

    button.set({
      label,
      icon,
      tooltip: true,
      class: className,
    });

    return button;
  }
}
