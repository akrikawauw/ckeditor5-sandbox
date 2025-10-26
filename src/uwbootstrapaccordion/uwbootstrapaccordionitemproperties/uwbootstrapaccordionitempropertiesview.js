// uwbootstrapaccordion/uwbootstrapaccordion.js

import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  createLabeledTextarea,
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

    this.idInputView = this._createInputText('Accordion heading id');
    this.titleInputView = this._createInputText('Accordion collapse id');
    this.accordionHeader = this._createInputTextArea('Accordion button title');

    // Form header.
    this.formHeader = new FormHeaderView(locale, {
      label: this.t('Accordion item properties'),
      class: 'ck ck-form__header',
    });

    // Text alignment row.
    this.myRow = new FormRowView(locale, {
      labelView: 'label is here',
      children: [this.idInputView, this.titleInputView],
      class: 'ck ck-form__row',
    });

    // Text alignment row.
    this.myAccordionButton = new FormRowView(locale, {
      labelView: 'label is here',
      children: [this.accordionHeader],
      class: 'ck ck-form__row',
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

    // Action row.
    this.actionRow = new FormRowView(locale, {
      children: [this.saveButtonView, this.cancelButtonView],
      class: 'ck-accordion-item-properties-form__action-row',
    });

    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.formHeader,
      this.myAccordionButton,
      this.myRow,
      // this.idInputView,
      // this.titleInputView,
      this.actionRow,
    ]);

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: [
          'ck',
          'ck-accordion-form',
          'ck-accortion-item-properties-form',
          'uw-branded-component-form',
        ],
        tabindex: '-1',
      },
      children: this.childViews,
    });
  }

  focus() {
    this.childViews.first.focus();
  }

  _createInputText(label) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );
    labeledInput.label = label;
    return labeledInput;
  }

  _createInputTextArea(label) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledTextarea
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
      withText: true,
    });

    return button;
  }
}
