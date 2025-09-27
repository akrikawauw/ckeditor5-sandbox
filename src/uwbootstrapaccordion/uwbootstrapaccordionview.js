// uwbootstrapaccordion/uwbootstrapaccordion.js

import { View, LabeledFieldView, createLabeledInputText, ButtonView, IconCheck, IconCancel, submitHandler } from 'ckeditor5';

export default class FormView extends View {
  constructor( locale ) {
    super(locale);

    this.abbrInputView = this._createInput('Add abbreviation');
    this.titleInputView = this._createInput('Add title');
    // Create the save and cancel buttons.
    this.saveButtonView = this._createButton(
      'Save', IconCheck, 'ck-button-save'
    );
    // Set the type to 'submit', which will trigger
    // the submit event on entire form when clicked.
    this.saveButtonView.type = 'submit';
    this.cancelButtonView = this._createButton(
      'Cancel', IconCancel, 'ck-button-cancel'
    );
    // Delegate ButtonView#execute to FormView#cancel.
    this.cancelButtonView.delegate('execute').to(this, 'cancel');

    this.childViews = this.createCollection( [
      this.abbrInputView,
      this.titleInputView,
      this.saveButtonView,
      this.cancelButtonView
    ])
    this.setTemplate({
      tag: 'form',
      attributes: {
        class: ['ck', 'ck-accordion-form'],
        tabindex: '-1'
      },
      children: this.childViews
    });
  }

  render() {
    super.render();

    // Submit the form when the user clicked the save button
    // or pressed enter in the input.
    submitHandler( {
      view: this
    });
  }

  focus() {
    this.childViews.first.focus();
  }

  _createInput( label ) {
    const labeledInput = new LabeledFieldView( this.locale, createLabeledInputText );
    labeledInput.label = label;
    return labeledInput;
  }

  _createButton( label, icon, className) {
    const button = new ButtonView();

    button.set( {
      label,
      icon,
      tooltip: true,
      class: className
    });

    return button;
  }
}
