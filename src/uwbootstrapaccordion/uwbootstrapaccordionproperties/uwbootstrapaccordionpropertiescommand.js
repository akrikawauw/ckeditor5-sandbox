import { Command } from 'ckeditor5';
import {
  _getSelectedAccordionModelElement,
  _getSelectedAccordionWidget,
  findElement,
  getSelectedAccordionWidget,
} from '../uwbootstrapaccordionutils';

export class UwBootstrapAccordionPropertiesCommand extends Command {
  refresh() {
    // const { document, schema } = this.editor.model;
    this.isEnabled = true;
    this.value = null;
    const { selection } = this.editor.model.document;
    const uwBootstrapAccordionEl = findElement(
      selection,
      'uwBootstrapAccordion'
    );
    if (!uwBootstrapAccordionEl) {
      return;
    }

    this.value = {};

    // Process accordionEl attributes
    for (const [attrKey, attrValue] of uwBootstrapAccordionEl.getAttributes()) {
      this.value[attrKey] = attrValue;
    }

    // Get the first child and its data which will be the accessible title.
    const childEl = uwBootstrapAccordionEl.getChild(0);
    const childTextNode = childEl.getChild(0);
    this.value[childEl.name] = childTextNode._data;
    console.log('REFRESH', this.value);
  }

  execute(values) {
    console.log('EXECUTE', values);
    // console.log('THIS.VALUE', this.value);
    const { model } = this.editor;
    const selection = model.document.selection;
    // console.log('model', model);

    model.change((writer) => {
      // Find the existing uwBootstrapAccordion we are in.
      const uwBootstrapAccordionEl = findElement(
        selection,
        'uwBootstrapAccordion'
      );
      console.log(uwBootstrapAccordionEl);

      if (values.id) {
        // const uwBootstrapAccordionEl = getSelectedAccordionWidget(selection);
        console.log('values.id in execute', values.id);
        // Set the id for the uwBootstrapAccordion.
        writer.setAttribute(
          'id',
          values.id,
          // 'hankus',
          uwBootstrapAccordionEl
        );
      }
      // The Accessible Title is the first child in the schema. Get it.
      const uwBootstrapAccordionAccessibleTitleEl =
        uwBootstrapAccordionEl.getChild(0);

      if (values.uwBootstrapAccordionAccessibleTitle) {
        console.log(
          'values.uwBootstrapAccordionAccessibleTitle in execute',
          values.uwBootstrapAccordionAccessibleTitle
        );
        // Determine the position of the current text in <uwBootstrapAccordionAccessibleTitle>.
        const insertPosition = writer.createPositionAt(
          uwBootstrapAccordionAccessibleTitleEl,
          0
        );
        const endPosition = writer.createPositionAt(
          uwBootstrapAccordionAccessibleTitleEl,
          'end'
        );
        const rangeToPurge = writer.createRange(insertPosition, endPosition);

        // Remove the current text.
        writer.remove(rangeToPurge);

        // Insert the text.
        writer.insertText(
          values.uwBootstrapAccordionAccessibleTitle,
          uwBootstrapAccordionAccessibleTitleEl,
          'end'
        );
      }
    });
  }
}
