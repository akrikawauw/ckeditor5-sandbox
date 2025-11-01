import { Command } from 'ckeditor5';
import {
  _getSelectedAccordionModelElement,
  _getSelectedAccordionWidget,
  findElement,
} from '../uwbootstrapaccordionutils';

export class UwBootstrapAccordionItemPropertiesCommand extends Command {
  refresh() {
    // const { document, schema } = this.editor.model;
    this.isEnabled = true;
    this.value = null;
    const { selection } = this.editor.model.document;
    const uwBootstrapAccordionItemEl = findElement(
      selection,
      'uwBootstrapAccordionItem'
    );
    if (!uwBootstrapAccordionItemEl) {
      return;
    }
    console.log('uwBootstrapAccordionItemEl', uwBootstrapAccordionItemEl);

    this.value = {};

    // Process uwBootstrapAccordionItemEl attributes.
    for (const [
      attrKey,
      attrValue,
    ] of uwBootstrapAccordionItemEl.getAttributes()) {
      this.value[attrKey] = attrValue;
      console.log('ITEM attributes', attrKey, attrValue);
    }

    // Get the uwBootstrapAccordionButtonText.
    const childEl = uwBootstrapAccordionItemEl
      .getChild(0)
      .getChild(0)
      .getChild(0);
    this.value[childEl.name] = childEl.getChild(0)._data;

    console.log('REFRESH', this.value);
  }

  execute(values) {
    console.log('EXECUTE', values);
    // console.log('THIS.VALUE', this.value);
    const { model } = this.editor;
    const selection = model.document.selection;
    // console.log('model', model);

    model.change((writer) => {
      // Find the existing uwBootstrapAccordionItem we are in.
      const uwBootstrapAccordionItemEl = findElement(
        selection,
        'uwBootstrapAccordionItem'
      );
      // console.log(uwBootstrapAccordionEl);

      if (values.uwBootstrapAccordionItemId) {
        console.log('values.id in execute', values.uwBootstrapAccordionId);
        // Set the id for the uwBootstrapAccordion.
        writer.setAttribute(
          'uwBootstrapAccordionItemId',
          values.uwBootstrapAccordionItemId,
          uwBootstrapAccordionItemEl
        );
      }

      if (values.uwBootstrapAccordionButtonText) {
        writer.setAttribute(
          'uwBootstrapAccordionButtonText',
          values.uwBootstrapAccordionButtonText,
          uwBootstrapAccordionItemEl
        );
      }

      // if (values.uwBootstrapAccordionTitleWeight) {
      //   writer.setAttribute(
      //     'uwBootstrapAccordionTitleWeight',
      //     values.uwBootstrapAccordionTitleWeight,
      //     uwBootstrapAccordionEl
      //   );
      // }

      // The uwBootstrapAccordionButtonText is the third child in the schema. Get it.
      const uwBootstrapAccordionButtonTextEl = uwBootstrapAccordionItemEl
        .getChild(0)
        .getChild(0)
        .getChild(0);

      if (values.uwBootstrapAccordionButtonText) {
        console.log(
          'values.uwBootstrapAccordionButtonText in execute',
          values.uwBootstrapAccordionButtonText
        );
        // Determine the position of the current text in <uwBootstrapAccordionAccessibleTitle>.
        const insertPosition = writer.createPositionAt(
          uwBootstrapAccordionButtonTextEl,
          0
        );
        const endPosition = writer.createPositionAt(
          uwBootstrapAccordionButtonTextEl,
          'end'
        );
        const rangeToPurge = writer.createRange(insertPosition, endPosition);

        // Remove the current text.
        writer.remove(rangeToPurge);

        // Insert the text.
        writer.insertText(
          values.uwBootstrapAccordionButtonText,
          uwBootstrapAccordionButtonTextEl,
          'end'
        );
      }
    });
  }
}
