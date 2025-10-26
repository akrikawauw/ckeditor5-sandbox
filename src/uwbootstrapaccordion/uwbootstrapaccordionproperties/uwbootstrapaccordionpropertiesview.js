// uwbootstrapaccordion/uwbootstrapaccordion.js

import {
  View,
  LabeledFieldView,
  createLabeledInputText,
  createLabeledTextarea,
  FormHeaderView,
  FormRowView,
  LabelView,
  ButtonView,
  SwitchButtonView,
  IconCheck,
  IconCancel,
  submitHandler,
} from 'ckeditor5';

export default class UwBootstrapAccordionPropertiesView extends View {
  constructor(locale) {
    super(locale);

    this.idInputView = this._createInputText('Accordion ID');
    this.accessibleTitleInput = this._createInputText('Accessible title text');
    this.titleStyleSwitchButton = this._createSwitchButton('Uppercase?', true);
    this.titleWeightSwitchButton = this._createSwitchButton('Bold?', true);

    // Form header.
    this.formHeader = new FormHeaderView(locale, {
      label: this.t('Accordion properties'),
      class: 'ck ck-form__header',
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

    // this.listenTo(view, 'submit', () => {});
    this.cancelButtonView = this._createButton(
      'Cancel',
      IconCancel,
      'ck-button-cancel'
    );

    this.switchButtonRow = new FormRowView(locale, {
      children: [this.titleStyleSwitchButton, this.titleWeightSwitchButton],
      class: 'ck-accordion-properties-form__switch-button-row',
    });

    this.accessibleTitleInputRow = new FormRowView(locale, {
      children: [this.accessibleTitleInput],
      class: 'ck-accordion-properties-form__accessible-title-input-row',
    });

    this.idInputViewRow = new FormRowView(locale, {
      children: [this.idInputView],
      class: 'ck-accordion-properties-form__id-input-view-row',
    });

    // Action row.
    this.actionRow = new FormRowView(locale, {
      children: [this.saveButtonView, this.cancelButtonView],
      class: 'ck-accordion-properties-form__action-row',
    });

    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.formHeader,
      this.idInputViewRow,
      this.accessibleTitleInputRow,
      this.switchButtonRow,
      this.actionRow,
    ]);

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: [
          'ck',
          'ck-accordion-form',
          'ck-accordion-properties-form',
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

  _createIdInput() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = t('Accordion ID');

    return labeledInput;
  }

  _createAccessibleTitleInput() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = t('Accessible name');

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
