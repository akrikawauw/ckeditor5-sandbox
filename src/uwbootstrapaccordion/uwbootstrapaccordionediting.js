// Bootstrap docs: https://getbootstrap.com/docs/4.1/components/collapse/#accordion-example

import { Plugin, Widget, toWidget, toWidgetEditable, uid } from 'ckeditor5';

// import { uid } from 'ckeditor5/src/utils';
import { InsertUwBootstrapAccordionCommand } from './insertuwbootstrapaccordioncommand';
import { InsertUwBootstrapAccordionItemCommand } from './insertuwbootstrapaccordionitemcommand';
import { UwBootstrapAccordionPropertiesCommand } from './uwbootstrapaccordionproperties/uwbootstrapaccordionpropertiescommand';
import { UwBootstrapAccordionItemPropertiesCommand } from './uwbootstrapaccordionitemproperties/uwbootstrapaccordionitempropertiescommand';

export default class UwBootstrapAccordionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    // console.log('UwBootstrapAccordionEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertUwBootstrapAccordion',
      new InsertUwBootstrapAccordionCommand(this.editor)
    );

    this.editor.commands.add(
      'insertUwBootstrapAccordionItem',
      new InsertUwBootstrapAccordionItemCommand(this.editor)
    );

    this.editor.commands.add(
      'uwBootstrapAccordionProperties',
      new UwBootstrapAccordionPropertiesCommand(this.editor)
    );

    this.editor.commands.add(
      'uwBootstrapAccordionItemProperties',
      new UwBootstrapAccordionItemPropertiesCommand(this.editor)
    );
  }
  /*
    MODEL:
    <bootstrapAccordion
      bootstrapAccordionId="..."
      bootstrapAccordionStyle="regular|flush"
      bootstrapAccordionItemsStayOpen="false|true">
      <bootstrapAccordionItem>
        <bootstrapAccordionHeader>
          <bootstrapAccordionButton
            bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
        </bootstrapAccordionHeader>
        <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
          <bootstrapAccordionBody>
            ...
          </bootstrapAccordionBody>
        </bootstrapAccordionCollapse>
      </bootstrapAccordionItem>
      <bootstrapAccordionItem>
        <bootstrapAccordionHeader>
          <bootstrapAccordionButton
            bootstrapAccordionButtonCollapsed="true|false">...</bootstrapAccordionButton>
        </bootstrapAccordionHeader>
        <bootstrapAccordionCollapse bootstrapAccordionCollapseShow="false|true">
          <bootstrapAccordionBody>
            ...
          </bootstrapAccordionBody>
        </bootstrapAccordionCollapse>
      </bootstrapAccordionItem>
      ...
    </bootstrapAccordion>



  */
  /*
    <div class="accordion uppercase-title" id="aa1"> <uwBootstrapAccordion/>
      <div class="screen-reader-text">Accessible Accordion</div> <uwBootstrapAccordionAccessibleTitle/>
      <div class="card" id="top"> <uwBootstrapAccordionItem/>
        <div class="card-header" id="collapse-0-header"> <uwBootstrapAccordionHeader/>
          <h3 class="mb-0">
            <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-0" aria-expanded="false" aria-controls="collapse-0">
              <span class="btn-text">Sleep over your phone and make cute snoring noises touch water with paw then recoil in horror</span> <uwBootstrapAccordionButtonText />
              <span class="arrow-box">
                <span class="arrow"></span>
              </span>
            </button> <uwBootstrapAccordionButton />
          </h3>
        </div>
        <div id="collapse-0" class="collapse " aria-labelledby="collapse-0-header" data-parent="#aa1" role="region">
          <p>Shred all toilet paper and spread around the house bird bird bird bird bird bird human why take bird out i could have eaten that sleep in the bathroom sink. Refuse to drink water except out of someone’s glass fall asleep on the washing machine but present belly, scratch hand when stroked yet what a cat-ass-trophy! for pet me pet me don’t pet me. Chew iPad power cord furrier and even more furrier hairball. Dismember a mouse and then regurgitate parts of it on the family room floor make it to the carpet before i vomit mmmmmm. Purrr purr littel cat, little cat purr purr caticus cuteicus yet intrigued by the shower sit on human they not getting up ever.</p>
          <p>		<a href="https://www.youtube.com/watch?v=SaA_cs4WZHM" class="btn btn-lg square-outline light-gold"><span>This is a button!</span><span class="arrow-box"><span class="arrow"></span></span></a></p>
        </div>
      </div>
      <div class="card" id="example-2">
        <div class="card-header" id="collapse-1-header">
          <h3 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-1" aria-expanded="false" aria-controls="collapse-1"><span class="btn-text">Example 2</span><span class="arrow-box"><span class="arrow"></span></span></button></h3>
        </div>
        <div id="collapse-1" class="collapse " aria-labelledby="collapse-1-header" data-parent="#aa1" role="region">
          <p>Cat walks in keyboard love me! yet stares at human while pushing stuff off a table mew mew small kitty warm kitty little balls of fur. I vomit in the bed in the middle of the night make meme, make cute face but run at 3am stare at owner accusingly then wink. Cats are the world. Weigh eight pounds but take up a full-size bed get suspicious of own shadow then go play with toilette paper slap the dog because cats rule and stretch out on bed so tuxedo cats always looking dapper. Fooled again thinking the dog likes me being gorgeous with belly side up. Always wanting food find box a little too small and curl up with fur hanging out or this cat happen now, it was too purr-fect!!!</p>
        </div>
      </div>
      <div class="card">
        <div class="card-header" id="collapse-2-header">
          <h3 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-2" aria-expanded="false" aria-controls="collapse-2"><span class="btn-text">Example 3</span><span class="arrow-box"><span class="arrow"></span></span></button></h3>
        </div>
        <div id="collapse-2" class="collapse " aria-labelledby="collapse-2-header" data-parent="#aa1" role="region">
          <p>Give me attention or face the wrath of my claws let me in let me out let me in let me out let me in let me out who broke this door anyway yet eat from dog’s food, hey! you there, with the hands attack the child. Hide when guests come over it’s 3am, time to create some chaos so push your water glass on the floor i like frogs and 0 gravity or meow to be let in and</p>
        </div>
      </div>
    </div>
  */

  _defineSchema() {
    const schema = this.editor.model.schema;

    schema.register('uwBootstrapAccordion', {
      isObject: true,

      // Allow in place wehere other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',
      allowAttributes: [
        'id',
        'uwBootstrapAccordionId',
        'uwBootstrapAccordionTitleStyle',
        'uwBootstrapAccordionTitleWeight',
      ],
      allowChildren: ['uwBootstrapAccordionItem'],
    });

    schema.register('uwBootstrapAccordionAccessibleTitle', {
      isLimit: true,
      allowIn: 'uwBootstrapAccordion',
      allowContentOf: '$block',
    });

    // schema.register("bootstrapAccordionImage", {});
    schema.register('uwBootstrapAccordionItem', {
      isObject: true,
      allowIn: 'uwBootstrapAccordion',
      allowedChildren: [
        'uwBootstrapAccordionHeading',
        'uwBootstrapAccordionCollapse',
      ],
      allowAttributes: [
        'uwBootstrapAccordionItemId',
        'uwBootstrapAccordionItemButtonText',
        'uwBootstrapAccordionItemCollapse',
      ],
    });

    schema.register('uwBootstrapAccordionHeading', {
      isLimit: true,
      allowIn: 'uwBootstrapAccordionItem',
    });

    schema.register('uwBootstrapAccordionButton', {
      // Cannot be split or left by the caret.
      isLimit: true,
      allowAttributes: [
        'buttonType',
        'buttonDataToggle',
        'buttonDataTarget',
        'buttonAriaExpanded',
        'buttonAriaControls',
      ],
      allowIn: 'uwBootstrapAccordionHeading',

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: '$text',
      allowChildren: [
        'uwBootstrapAccordionButtonText',
        'uwBootstrapAccordionButtonArrow',
      ],
    });

    schema.register('uwBootstrapAccordionButtonText', {
      isLimit: true,
      isObject: true,
      isInline: true,
      allowWhere: '$block',
      allowIn: 'uwBootstrapAccordionButton',
      allowChildren: ['$text'],

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowAttributes: ['buttonText'],
    });

    schema.register('uwBootstrapAccordionCollapse', {
      allowIn: 'uwBootstrapAccordionItem',
      allowAttributes: ['id'],
      allowChildren: 'uwBootstrapAccordionBody',
    });

    schema.register('uwBootstrapAccordionBody', {
      // Cannot be split or left by the caret.
      // isLimit: true,
      allowIn: 'uwBootstrapAccordionCollapse',

      // Allow content which is allowed in the root (e.g. paragraphs).
      allowContentOf: '$root',
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <bootstrapAccordion> converters
    // TODO: explore using a dispatcher
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionId',
      view: 'id',
    });

    conversion.for('upcast').add((dispatcher) => {
      // Look for every accordion.
      dispatcher.on('element:div', (evt, data, conversionApi) => {
        const viewItem = data.viewItem;
        const {
          consumable,
          writer,
          safeInsert,
          convertChildren,
          updateConversionResult,
        } = conversionApi;

        if (
          consumable.consume(viewItem, { name: true, classes: 'accordion' })
        ) {
          // console.log(viewItem);
          const classes = viewItem.getAttribute('class');
          const titleStyle = classes.includes('uppercase-title')
            ? 'uppercase'
            : 'lowercase';
          const titleWeight = classes.includes('non-bold')
            ? 'non-bold'
            : 'bold';
          const modelElement = writer.createElement('uwBootstrapAccordion', {
            uwBootstrapAccordionId: viewItem.getAttribute('id') || uid(),
            uwBootstrapAccordionTitleStyle: titleStyle,
            uwBootstrapAccordionTitleWeight: titleWeight,
          });
          // Array(classes).find(class === 'uppercase-title'),
          if (safeInsert(modelElement, data.modelCursor)) {
            convertChildren(viewItem, modelElement);
            updateConversionResult(modelElement, data);
          }
        }
      });
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordion',
      view: (modelElement, { writer: viewWriter }) => {
        const titleClassToAdd =
          modelElement.getAttribute('uwBootstrapAccordionTitleStyle') ===
          'uppercase'
            ? ' uppercase-title'
            : '';
        const weightClassToAdd =
          modelElement.getAttribute('uwBootstrapAccordionTitleWeight') ===
          'non-bold'
            ? ' non-bold'
            : '';
        const classesForAccordion =
          'accordion' + titleClassToAdd + weightClassToAdd;
        const div = viewWriter.createContainerElement('div', {
          class: classesForAccordion,
          id: modelElement.getAttribute('uwBootstrapAccordionId'), // Map model attribute to data attribute
        });
        return toWidget(div, viewWriter, {
          label: 'UW bootstrap accordion widget',
          hasSelectionHandle: true,
        });
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordion',
      view: (modelElement, { writer: viewWriter }) => {
        const titleClassToAdd =
          modelElement.getAttribute('uwBootstrapAccordionTitleStyle') ===
          'uppercase'
            ? ' uppercase-title'
            : '';
        const weightClassToAdd =
          modelElement.getAttribute('uwBootstrapAccordionTitleWeight') ===
          'non-bold'
            ? ' non-bold'
            : '';

        const div = viewWriter.createContainerElement('div', {
          class: 'accordion' + titleClassToAdd + weightClassToAdd,
          id: modelElement.getAttribute('uwBootstrapAccordionId'), // Map model attribute to data attribute
        });
        return div;
      },
    });

    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionTitleStyle',
      view: (modelAttributeValue) => {
        return {
          key: 'class',
          value: modelAttributeValue === 'uppercase' ? 'uppercase-title' : '',
        };
      },
    });

    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionTitleWeight',
      view: (modelAttributeValue) => {
        return {
          key: 'class',
          value: modelAttributeValue === 'non-bold' ? 'non-bold' : '',
        };
      },
    });

    // uwBootstrapAccordionAccessibleTitle converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionAccessibleTitle',
      view: {
        name: 'div',
        classes: 'screen-reader-text',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionAccessibleTitle',
      view: {
        name: 'div',
        classes: 'screen-reader-text',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionAccessibleTitle',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'screen-reader-text',
        });
        return toWidgetEditable(div, viewWriter);
      },
    });

    // uwBootstrapAccordionItem converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'card',
      },
    });
    conversion.for('downcast').elementToElement({
      model: 'uwBootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'card',
      },
    });
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionItemId',
      view: 'id',
    });

    // uwBootstrapAccordionHeading converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: (modelElement, { writer: viewWriter }) => {
        const section = viewWriter.createContainerElement('div', {
          class: 'card-header',
        });

        return toWidget(section, viewWriter, {
          label: 'card header',
        });
      },
    });

    // uwBootstrapAccordionButton converters

    conversion.for('upcast').elementToElement({
      // model: (viewElement, { writer }) => {
      //   const myAttributes = viewElement.getAttributes();
      //   // console.log('upcast for justAButtonText', viewElement);
      //   return writer.createElement('uwBootstrapAccordionButton', {
      //     myAttributes,
      //   });
      // },
      model: (viewElement, { writer }) => {
        return writer.createElement('uwBootstrapAccordionButton');
      },
      view: {
        name: 'h3',
        classes: ['mb-0'],
      },
    });
    // uwBootstrapAccordionId: viewItem.getAttribute('id')

    conversion.for('dataDowncast').elementToStructure({
      model: 'uwBootstrapAccordionButton',
      view: (modelElement, conversionApi) => {
        const { writer } = conversionApi;
        const slotForButtonViewElement = writer.createSlot();
        const arrowBoxInnerSpanElement = writer.createAttributeElement('span', {
          class: 'arrow',
        });
        const arrowBoxOuterSpanElement = writer.createContainerElement(
          'span',
          { class: 'arrow-box' },
          [arrowBoxInnerSpanElement]
        );
        const buttonViewElement = writer.createContainerElement(
          'button',
          { class: 'btn btn-link collapse' },
          [slotForButtonViewElement, arrowBoxOuterSpanElement]
        );

        return writer.createContainerElement('h3', { class: 'mb-0' }, [
          buttonViewElement,
        ]);
      },
    });

    conversion.for('editingDowncast').elementToStructure({
      model: 'uwBootstrapAccordionButton',
      view: (modelElement, conversionApi) => {
        const { writer } = conversionApi;
        const slotForButtonViewElement = writer.createSlot();
        const arrowBoxInnerSpanElement = writer.createAttributeElement('span', {
          class: 'arrow',
        });
        const arrowBoxOuterSpanElement = writer.createContainerElement(
          'span',
          { class: 'arrow-box' },
          [arrowBoxInnerSpanElement]
        );
        const buttonViewElement = writer.createContainerElement(
          'button',
          { class: 'btn btn-link collapse', 'data-fudge': 'gola' },
          [slotForButtonViewElement, arrowBoxOuterSpanElement]
        );

        return writer.createContainerElement('h3', { class: 'mb-0' }, [
          buttonViewElement,
        ]);
      },
    });
    // conversion.for('downcast').attributeToAttribute({
    //   model: 'buttonType',
    //   view: 'type',
    // });
    // conversion.attributeToAttribute({
    //   model: 'buttonDataToggle',
    //   view: 'data-toggle',
    // });
    // conversion.attributeToAttribute({
    //   model: 'buttonDataTarget',
    //   view: 'data-target',
    // });
    // conversion.attributeToAttribute({
    //   model: 'buttonAriaExpanded',
    //   view: 'aria-expanded',
    // });
    // conversion.attributeToAttribute({
    //   model: 'buttonAriaControls',
    //   view: 'aria-controls',
    // });

    // uwBootstrapAccordionButtonText
    // <justAButtonText> converters
    conversion.for('upcast').elementToElement({
      // model: 'justAButtonText',
      model: (viewElement, { writer }) => {
        const textClasses = viewElement.getAttribute('class');
        // console.log('upcast for justAButtonText', viewElement);
        return writer.createElement('uwBootstrapAccordionButtonText', {
          textClasses,
        });
      },
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionButtonText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'btn-text',
        });
        return toWidget(span, viewWriter, {
          label: 'Edit button text',
        });
        // return toWidgetEditable(span, viewWriter, {
        //   label: 'Edit button text',
        // });
      },
    });

    // uwBootstrapButtonArrow
    // conversion.for('upcast').elementToElement({
    //   model: 'uwBootstrapAccordionButtonArrow',
    //   view: {
    //     name: 'span',
    //     class: 'arrow-box',
    //   },
    // });

    // conversion.for('downcast').elementToElement({
    //   model: 'uwBoostrapAccordionButtonArrow',
    //   view: (modelElement, { writer }) => {
    //     // You can add attributes to the span if needed
    //     return writer.createAttributeElement(
    //       'span',
    //       {
    //         class: 'arrow-box',
    //       },
    //       { id: 'marker:my' }
    //     );
    //   },
    // });
    // conversion.for('dataDowncast').elementToElement({
    //   model: 'uwBoostrapAccordionButtonArrow',
    //   view: {
    //     name: 'span',
    //     classes: 'arrow-box',
    //   },
    // });
    // conversion.for('editingDowncast').elementToElement({
    //   model: 'uwBoostrapAccordionButtonArrow',
    //   view: {
    //     name: 'span',
    //     classes: 'arrow-box',
    //   },
    // });

    // uwBootstrapAccordionCollapse
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse',
      },
    });

    // uwBootstrapAccordionBody converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: {
        name: 'div',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: {
        name: 'div',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: (modelElement, { writer: viewWriter }) => {
        const element = viewWriter.createEditableElement('div');

        return toWidgetEditable(element, viewWriter);
      },
    });
  }
}
