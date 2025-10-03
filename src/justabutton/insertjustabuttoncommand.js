// simplebox/insertjustabuttoncommand.js

import { Command } from 'ckeditor5';

export default class InsertJustAButtonCommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Insert <justAButton>*</justAButton> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createJustAButton(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'justAButton'
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createJustAButton(writer) {
  const justAButton = writer.createElement('justAButton');
  const justAButtonText = writer.createElement('justAButtonText');
  const placeholderText = writer.createText('accordion button')

  // writer.append(justAButton, justAButton);
  writer.append(placeholderText, justAButtonText)
  writer.append(justAButtonText, justAButton);

  // There must be at least one paragraph for the description to be editable.
  // See https://github.com/ckeditor/ckeditor5/issues/1464.

  return justAButton;
}
