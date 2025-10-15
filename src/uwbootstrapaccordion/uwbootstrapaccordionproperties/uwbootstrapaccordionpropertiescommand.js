import { Command } from 'ckeditor5';

export class UwBootstrapAccordionPropertiesCommand extends Command {
  execute({ incomingText, modelElement }) {
    console.log('UwBootstrapAccordionPropertiesCommand fired!');
    const editor = this.editor;
    const model = editor.model;
    const selection = model.document.selection;

    model.change((writer) => {
      // Get the position where the callout should be inserted
      const referencePoint = _getSelectedAccordionModelElement(
        model,
        modelElement
      );
      console.log(referencePoint);
      // Create the 'callout' element in the model
      const range = writer.createRangeIn(referencePoint);
      writer.insertText(incomingText, referencePoint, 'end');
      writer.remove(range);

      // const calloutElement = writer.createElement('callout', { title });
      // const contentElement = writer.createElement('calloutContent');
      // writer.insertText(content, contentElement);
      // writer.append(contentElement, calloutElement);

      // Insert the callout into the model
      // writer.insert(calloutElement, insertPosition);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    // this.accordionItem = selection
    //   .getFirstPosition()
    //   .findAncestor('uwBootstrapAccordionItem');
    // this.isEnabled = !!this.accordionItem;
  }
}
