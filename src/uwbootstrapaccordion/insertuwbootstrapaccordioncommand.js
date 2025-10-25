import { Command, uid } from 'ckeditor5';

import { createBootstrapAccordionItem } from './insertuwbootstrapaccordionitemcommand';

export class InsertUwBootstrapAccordionCommand extends Command {
  execute(values) {
    this.editor.model.change((writer) => {
      // Insert <uwBootstrapAccordion>*</uwBootstrapAccordion> at the current selection position
      // in a way that will result in creating a valid model structure.
      this.editor.model.insertContent(createBootstrapAccordion(writer));
      this.editor.editing.view.focus();
      const viewElement = this.editor.model.document.selection
        .getSelectedElement()
        .getChild(0)
        .getChild(0);
      console.log(viewElement);
      // this.editor.editing.view.focus();
      this.editor.editing.view.document.selection._setFocus(viewElement, 0);
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
  const bootstrapAccordion = writer.createElement('uwBootstrapAccordion', {
    uwBootstrapAccordionId: uid(),
  });
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
