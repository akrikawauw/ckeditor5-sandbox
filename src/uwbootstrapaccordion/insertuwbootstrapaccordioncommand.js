import { Command } from 'ckeditor5';

import { createBootstrapAccordionItem } from './insertuwbootstrapaccordionitemcommand';

export class InsertUwBootstrapAccordionCommand extends Command {
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
      'uwBootstrapAccordion'
    );

    this.isEnabled = allowedIn !== null;
  }
}

export const createBootstrapAccordion = (writer) => {
  const bootstrapAccordion = writer.createElement('uwBootstrapAccordion');
  const bootstrapAccordionAccessibleTitle = writer.createElement(
    'uwBootstrapAccordionAccessibleTitle'
  );
  const bootstrapAccordionItem = createBootstrapAccordionItem(writer);
  const placeholderAccessibleTitleText = writer.createText(
    'Accessible title here'
  );
  writer.append(
    placeholderAccessibleTitleText,
    bootstrapAccordionAccessibleTitle
  );
  writer.append(bootstrapAccordionAccessibleTitle, bootstrapAccordion);
  writer.append(bootstrapAccordionItem, bootstrapAccordion);

  return bootstrapAccordion;
};
