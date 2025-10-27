import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  createLabeledTextarea,
  FormHeaderView,
  FormRowView,
  ButtonView,
  SwitchButtonView,
  IconCheck,
  IconCancel,
  submitHandler,
} from 'ckeditor5';

export default class UwBootstrapAccordionItemPropertiesView extends View {
  constructor(locale) {
    super(locale);

    this.idInput = this._createInputText('Accordion section id');
    this.accordionButtonText = this._createInputTextArea(
      'Accordion section title'
    );
    this.openCollapseSwitchButton = this._createSwitchButton(
      'Open by default?',
      false
    );

    // Form header.
    this.formHeader = new FormHeaderView(locale, {
      label: this.t('Accordion section properties'),
      class: 'ck ck-form__header',
    });

    // Text alignment row.
    this.idInputRow = new FormRowView(locale, {
      labelView: 'label is here',
      children: [this.idInput],
      class: 'ck ck-form__row',
    });

    // Text alignment row.
    this.accordionButtonTextRow = new FormRowView(locale, {
      labelView: 'label is here',
      children: [this.accordionButtonText],
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

    this.switchButtonRow = new FormRowView(locale, {
      children: [this.openCollapseSwitchButton],
      class: 'ck-accordion-properties-form__switch-button-row',
    });

    // Action row.
    this.actionRow = new FormRowView(locale, {
      children: [this.saveButtonView, this.cancelButtonView],
      class: 'ck-accordion-item-properties-form__action-row',
    });

    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.formHeader,
      this.accordionButtonTextRow,
      this.idInputRow,
      this.switchButtonRow,
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

  _createInputText(label) {
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );
    labeledInput.label = label;
    return labeledInput;
  }

  _createSwitchButton(label, isOn) {
    const t = this.locale.t;
    const switchButton = new SwitchButtonView(this.locale);

    switchButton.set({
      withText: true,
      label: label,
      isToggleable: true,
    });

    switchButton.on('execute', () => {
      switchButton.isOn = !switchButton.isOn;
    });

    return switchButton;
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
