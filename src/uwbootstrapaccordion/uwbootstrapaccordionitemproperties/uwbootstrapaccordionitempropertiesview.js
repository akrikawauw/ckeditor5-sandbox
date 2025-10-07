// uwbootstrapaccordion/uwbootstrapaccordion.js

import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  FormHeaderView,
  FormRowView,
  ButtonView,
  IconCheck,
  IconCancel,
  submitHandler,
} from 'ckeditor5';

export default class UwBootstrapAccordionItemPropertiesView extends View {
  constructor(locale) {
    super(locale);

    // What we need.
    // Id for accordion heading.
    // Id for accordion collapse.
    // Collapsed/open default state switch.
    // Title for accordion button / heading.

    this.idInputView = this._createInput('Accordion heading id');
    this.titleInputView = this._createInput('Accordion collapse id');

    // Form header.
    this.formHeader = new FormHeaderView(locale, {
      label: this.t('Accordion item properties'),
    });

    // Text alignment row.
    this.myRow = new FormRowView(locale, {
      labelView: 'label is here',
      children: [this.idInputView, this.titleInputView],
      class: 'ck-table-cell-properties-form__alignment-row',
    });
    // Create the save and cancel buttons.
    this.saveButtonView = this._createButton(
      'Save',
      IconCheck,
      'ck-button-save'
    );
    // Set the type to 'submit', which will trigger
    // the submit event on entire form when clicked.
    this.saveButtonView.type = 'submit';
    this.cancelButtonView = this._createButton(
      'Cancel',
      IconCancel,
      'ck-button-cancel'
    );
    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.formHeader,
      this.myRow,
      // this.idInputView,
      // this.titleInputView,
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

  focus() {
    this.childViews.first.focus();
  }

  _createInput(label) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );
    labeledInput.label = label;
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
