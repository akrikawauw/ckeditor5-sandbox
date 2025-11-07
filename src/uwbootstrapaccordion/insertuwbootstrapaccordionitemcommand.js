import { Command, uid } from 'ckeditor5';
import { UwBootstrapAccordionItemPropertiesCommand } from './uwbootstrapaccordionitemproperties/uwbootstrapaccordionitempropertiescommand';
import { createAccordionItemId } from './uwbootstrapaccordionutils';

export class InsertUwBootstrapAccordionItemCommand extends Command {
  execute(options = { positionOffset: 'before' }) {
    const value = options.positionOffset;
    const accordionItem = this.accordionItem;
    this.editor.model.change((writer) => {
      const accordion = accordionItem.parent;
      const accordionId = accordion.getAttribute('uwBootstrapAccordionId');
      const accordionItemNumber = createAccordionItemId();
      console.log('accordionItemNumber', accordionItemNumber);
      // Check if the accordion has an accordionItem already
      if (accordion.getChildIndex(accordionItem) === 0) {
        console.log('yes getChildIndex has a zero');
      }

      const newAccordionItem = createBootstrapAccordionItem(
        writer,
        accordionId,
        accordionItemNumber
      );
      writer.insert(newAccordionItem, accordionItem, options.positionOffset);
    });
  }

  refresh() {
    const model = this.editor.model;
    const selection = model.document.selection;
    // const allowedIn = model.schema.findAllowedParent(
    //   selection.getFirstPosition(),
    //   'uwBootstrapAccordion'
    // );
    this.accordionItem = selection
      .getFirstPosition()
      .findAncestor('uwBootstrapAccordionItem');
    this.isEnabled = !!this.accordionItem;
  }
}

export const createBootstrapAccordionItem = (
  writer,
  accordionId,
  accordionItemNumber
) => {
  const bootstrapAccordionItem = writer.createElement(
    'uwBootstrapAccordionItem',
    { uwBootstrapAccordionItemId: `accordion-item-${accordionItemNumber}` }
  );
  const bootstrapAccordionHeader = writer.createElement(
    'uwBootstrapAccordionHeader',
    { uwBootstrapAccordionHeaderId: `collapse-${accordionItemNumber}-header` }
  );
  const bootstrapAccordionHeading = writer.createElement(
    'uwBootstrapAccordionHeading'
  );
  const bootstrapAccordionButton = writer.createElement(
    'uwBootstrapAccordionButton',
    {
      buttonType: 'button',
      buttonDataToggle: `collapse-${accordionItemNumber}`,
      buttonDataTarget: `#collapse-${accordionItemNumber}`,
      buttonAriaExpanded: 'false',
      buttonAriaControls: `collapse-${accordionItemNumber}`,
    }
  );
  const bootstrapAccordionButtonText = writer.createElement(
    'uwBootstrapAccordionButtonText'
  );
  const bootstrapAccordionButtonArrow = writer.createElement(
    'uwBootstrapAccordionButtonArrow'
  );
  const bootstrapAccordionCollapse = writer.createElement(
    'uwBootstrapAccordionCollapse',
    {
      'data-parent': `#${accordionId}`,
      role: 'region',
      id: `collapse-${accordionItemNumber}`,
      'aria-labelledby': `collapse-${accordionItemNumber}-header`,
    }
  );
  const bootstrapAccordionBody = writer.createElement(
    'uwBootstrapAccordionBody'
  );
  const placeholderButtonText = writer.createText(
    'Put your accordion button text here'
  );
  const placeholderBodyText = writer.createText(
    'Put your accordion content here'
  );

  const placeholderBodyParagraph = writer.createElement('paragraph');
  writer.append(placeholderBodyText, placeholderBodyParagraph);
  writer.append(placeholderBodyParagraph, bootstrapAccordionBody);

  writer.append(placeholderButtonText, bootstrapAccordionButtonText);

  writer.append(bootstrapAccordionButtonText, bootstrapAccordionButton);

  // writer.append(bootstrapAccordionButtonArrow, bootstrapAccordionButton);
  writer.append(bootstrapAccordionButton, bootstrapAccordionHeading);
  writer.append(bootstrapAccordionHeading, bootstrapAccordionHeader);
  writer.append(bootstrapAccordionBody, bootstrapAccordionCollapse);
  writer.append(bootstrapAccordionHeader, bootstrapAccordionItem);
  writer.append(bootstrapAccordionCollapse, bootstrapAccordionItem);

  return bootstrapAccordionItem;
};
