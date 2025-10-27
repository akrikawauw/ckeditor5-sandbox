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

    // Process accordionEl attributes
    for (const [
      attrKey,
      attrValue,
    ] of uwBootstrapAccordionItemEl.getAttributes()) {
      this.value[attrKey] = attrValue;
      // console.log('attributes', attrKey, attrValue);
    }

    // Get the first child and its data which will be the accessible title.
    // const childEl = uwBootstrapAccordionEl.getChild(0);
    // const childTextNode = childEl.getChild(0);
    // this.value[childEl.name] = childTextNode._data;

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
        // console.log('values.id in execute', values.uwBootstrapAccordionId);
        // Set the id for the uwBootstrapAccordion.
        writer.setAttribute(
          'uwBootstrapAccordionItemId',
          values.uwBootstrapAccordionItemId,
          uwBootstrapAccordionItemEl
        );
      }

      // if (values.uwBootstrapAccordionTitleStyle) {
      //   writer.setAttribute(
      //     'uwBootstrapAccordionTitleStyle',
      //     values.uwBootstrapAccordionTitleStyle,
      //     uwBootstrapAccordionEl
      //   );
      // }

      // if (values.uwBootstrapAccordionTitleWeight) {
      //   writer.setAttribute(
      //     'uwBootstrapAccordionTitleWeight',
      //     values.uwBootstrapAccordionTitleWeight,
      //     uwBootstrapAccordionEl
      //   );
      // }

      // The Accessible Title is the first child in the schema. Get it.
      // const uwBootstrapAccordionAccessibleTitleEl =
      //   uwBootstrapAccordionEl.getChild(0);

      // if (values.uwBootstrapAccordionAccessibleTitle) {
      //   console.log(
      //     'values.uwBootstrapAccordionAccessibleTitle in execute',
      //     values.uwBootstrapAccordionAccessibleTitle
      //   );
      //   // Determine the position of the current text in <uwBootstrapAccordionAccessibleTitle>.
      //   const insertPosition = writer.createPositionAt(
      //     uwBootstrapAccordionAccessibleTitleEl,
      //     0
      //   );
      //   const endPosition = writer.createPositionAt(
      //     uwBootstrapAccordionAccessibleTitleEl,
      //     'end'
      //   );
      //   const rangeToPurge = writer.createRange(insertPosition, endPosition);

      // Remove the current text.
      // writer.remove(rangeToPurge);

      // Insert the text.
      // writer.insertText(
      //   values.uwBootstrapAccordionAccessibleTitle,
      //   uwBootstrapAccordionAccessibleTitleEl,
      //   'end'
      // );
      // }
    });
  }
}
