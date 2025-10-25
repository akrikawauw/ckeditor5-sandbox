// uwbootstrapaccordion/uwbootstrapaccordion.js

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

export default class UwBootstrapAccordionPropertiesView extends View {
  constructor(locale) {
    super(locale);

    this.idInputView = this._createIdInput();
    this.accessibleTitleInput = this._createAccessibleTitleInput();
    this.titleStyleSwitchButton = this._createSwitchButton(
      'Uppercase titles?',
      true
    );
    this.titleBoldSwitchButton = this._createSwitchButton('Bold titles?', true);
    // console.log('SDFDSAFDSFS', this.accessibleTitleInput);
    // this.idInputView.fieldView.value = idInputViewIncoming;
    // this.accessibleTitleInput.fieldView.value = accessibleTitleInputIncoming;

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

    // Action row.
    this.actionRow = new FormRowView(locale, {
      children: [this.saveButtonView, this.cancelButtonView],
      class: 'ck-accordion--properties-form__action-row',
    });

    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection([
      this.formHeader,
      this.titleStyleSwitchButton,
      this.idInputView,
      this.accessibleTitleInput,
      this.actionRow,
    ]);

    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-accordion-form', 'ck-accordion--properties-form'],
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

  _createIdInput() {
    const t = this.locale.t;
    const labeledInput = new LabeledFieldView(
      this.locale,
      createLabeledInputText
    );

    labeledInput.label = t('Accordion ID');
    labeledInput.class = 'ck-labeled-field-view_full-width';

    // labeledInput.fieldView.bind('value').to(this, 'idInputView');

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

    // console.log(labeledInput.value);

    return labeledInput;
  }

  _createSwitchButton(label, isOn) {
    const t = this.locale.t;
    const switchButton = new SwitchButtonView(this.locale);

    switchButton.set({
      withText: true,
      label: label,
      // isOn: isOn,
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
