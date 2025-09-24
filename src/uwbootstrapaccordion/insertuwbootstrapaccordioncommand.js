import { Command } from 'ckeditor5';

export default class Insertuwbootstrapaccordioncommand extends Command {
  execute() {
    this.editor.model.change((writer) => {
      // Inster <bootstrapAccordion>*</bootstrapAccordion> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createBootstrapAccordion(writer));
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    const allowedIn = model.schema.findAllowedParent(
      selection.getFirstPosition(),
      'bootstrapAccordion'
    );

    this.isEnabled = allowedIn !== null;
  }
}

function createBootstrapAccordion(writer) {
  const bootstrapAccordion = writer.createElement('bootstrapAccordion');
  const bootstrapAccordionBody = writer.createElement('bootstrapAccordionBody');

  writer.append(bootstrapAccordionBody, bootstrapAccordion);

  writer.appendElement('paragraph', bootstrapAccordionBody);

  return bootstrapAccordion;
}
