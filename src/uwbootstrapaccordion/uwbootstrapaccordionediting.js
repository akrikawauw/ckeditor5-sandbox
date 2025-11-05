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

    schema.register('uwBootstrapAccordionItem', {
      isObject: true,
      allowIn: 'uwBootstrapAccordion',
      allowedChildren: [
        'uwBootstrapAccordionHeader',
        'uwBootstrapAccordionCollapse',
      ],
      allowAttributes: [
        'uwBootstrapAccordionItemId',
        'uwBootstrapAccordionItemButtonText',
      ],
    });

    schema.register('uwBootstrapAccordionHeader', {
      isLimit: true,
      allowIn: 'uwBootstrapAccordionItem',
      allowAttributes: ['uwBootstrapAccordionHeaderId'],
    });

    schema.register('uwBootstrapAccordionHeading', {
      isLimit: true,
      allowIn: 'uwBootstrapAccordionHeader',
      allowedChildren: 'uwBootstrapAccordionButton',
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
        'uwBootstrapAccordionButtonCollapseState',
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
      allowAttributes: [
        'data-parent',
        'role',
        'id',
        'aria-labelledby',
        'uwBootstrapAccordionCollapseState',
      ],
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

    // <uwBootstrapAccordion> converters
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
    conversion.for('downcast').elementToElement({
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
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionItem',
      view: {
        name: 'div',
        classes: 'card',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionItem',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createEditableElement('div', {
          class: 'card',
        });
        return toWidget(div, viewWriter, {
          label: 'UW bootstrap accordion item',
          hasSelectionHandle: true,
        });
      },
    });
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionItemId',
      view: 'id',
    });

    // uwBootstrapAccordionHeader converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      // model: 'uwBootstrapAccordionHeader',
      // view: (modelElement, { writer: viewWriter }) => {
      //   const section = viewWriter.createContainerElement('div', {
      //     class: 'card-header',
      //   });

      //   return toWidget(section, viewWriter, {
      //     label: 'card header',
      //   });
      // },
      model: 'uwBootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });

    // uwBootstrapAccordionHeading converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'h3',
        classes: 'mb-0',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'h3',
        classes: 'mb-0',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'h3',
        classes: 'mb-0',
      },
    });

    // uwBootstrapAccordionButton converters
    // See: https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/conversion/upcast.html.
    // There is no structure to element conversion for upcast, so we need to use the event-based API.
    // conversion.for('upcast').add((dispatcher) => {
    //   // Look for every view <h3> element.
    //   dispatcher.on('element:button', (evt, data, conversionApi) => {
    //     // Get all the necessary items from the conversion API object.
    //     const {
    //       consumable,
    //       writer,
    //       safeInsert,
    //       convertChildren,
    //       updateConversionResult,
    //     } = conversionApi;

    //     // Get view item from data object.
    //     const { viewItem } = data;

    //     // Define elements consumables.
    //     const wrapper = {
    //       name: true,
    //       classes: ['btn', 'btn-link'],
    //       attributes: [
    //         'type',
    //         'data-toggle',
    //         'data-target',
    //         'aria-expanded',
    //         'aria-controls',
    //       ],
    //     };
    //     const innerWrapper = {
    //       name: true,
    //       classes: ['btn', 'btn-link'],
    //       attributes: [
    //         'type',
    //         'data-toggle',
    //         'data-target',
    //         'aria-expanded',
    //         'aria-controls',
    //       ],
    //     };
    //     console.log(viewItem);
    //     // Tests if the view element can be consumed.
    //     if (!consumable.test(viewItem, wrapper)) {
    //       return;
    //     }

    //     // Check if there is only one child.
    //     if (viewItem.childCount !== 1) {
    //       return;
    //     }

    //     // Get the first child element.
    //     const firstChildItem = viewItem.getChild(0);
    //     // Check if the first element is a <button>.
    //     if (!firstChildItem.is('element', 'button')) {
    //       return;
    //     }
    //     console.log('firstChildItem', firstChildItem);

    //     // Tests if the first child element can be consumed.
    //     if (!consumable.test(firstChildItem, innerWrapper)) {
    //       console.log('gonna return', firstChildItem, innerWrapper);
    //       return;
    //     }

    //     // Create model element.
    //     const modelElement = writer.createElement(
    //       'uwBootstrapAccordionButton',
    //       {
    //         buttonType: firstChildItem.getAttribute('type'),
    //         buttonDataToggle: firstChildItem.getAttribute('data-toggle'),
    //         buttonDataTarget: firstChildItem.getAttribute('data-target'),
    //         buttonAriaExpanded: firstChildItem.getAttribute('aria-expanded'),
    //         buttonAriaControls: firstChildItem.getAttribute('aria-controls'),
    //       }
    //     );
    //     console.log('modelElement', modelElement);
    //     // Insert element on a current cursor location.
    //     if (!safeInsert(modelElement, data.modelCursor)) {
    //       return;
    //     }

    //     // Consume the main outer wrapper element.
    //     consumable.consume(viewItem, wrapper);
    //     // Consume the inner wrapper element.
    //     consumable.consume(firstChildItem, innerWrapper);

    //     // console.log('HETE!!!!', firstChildItem);
    //     // Handle children conversion inside inner wrapper element.
    //     convertChildren(firstChildItem, modelElement);

    //     // console.log('almost FINISHED', modelElement);
    //     // Necessary function call to help setting model range and cursor
    //     // for some specific cases when elements being split.
    //     updateConversionResult(modelElement, data);
    //   });
    // });

    conversion.for('upcast').elementToElement({
      view: {
        name: 'button',
        classes: ['btn', 'btn-link'],
      },
      model: (viewElement, { writer }) => {
        return writer.createElement('uwBootstrapAccordionButton');
      },
    });

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
          {
            class: 'btn btn-link',
            type: modelElement.getAttribute('buttonType'),
            'data-toggle': modelElement.getAttribute('buttonDataToggle'),
            'data-target': modelElement.getAttribute('butonDataTarget'),
            'aria-expanded': modelElement.getAttribute('buttonAriaExpanded'),
            'aria-controls': modelElement.getAttribute('buttonAriaControls'),
          },
          [slotForButtonViewElement, arrowBoxOuterSpanElement]
        );
        return buttonViewElement;
        // return writer.createContainerElement('h3', { class: 'mb-0' }, [
        //   buttonViewElement,
        // ]);
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
          {
            class: 'btn btn-link',
            type: modelElement.getAttribute('buttonType'),
            'data-toggle': modelElement.getAttribute('buttonDataToggle'),
            'data-target': modelElement.getAttribute('butonDataTarget'),
            'aria-expanded': modelElement.getAttribute('buttonAriaExpanded'),
            'aria-controls': modelElement.getAttribute('buttonAriaControls'),
          },
          [slotForButtonViewElement, arrowBoxOuterSpanElement]
        );
        return buttonViewElement;
        // return writer.createContainerElement('h3', { class: 'mb-0' }, [
        //   buttonViewElement,
        // ]);
      },
    });

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

    conversion.for('downcast').elementToElement({
      model: 'uwBootstrapAccordionButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    });
    /*
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionButtonText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createElement('span', {
          class: 'btn-text',
        });
        return span;
        // });
        // const span = viewWriter.createEditableElement('span', {
        //   class: 'btn-text',
        // });
        // return toWidget(span, viewWriter, {
        //   label: 'Edit button text',
        // });
        // return toWidgetEditable(span, viewWriter, {
        //   label: 'Edit button text',
        // });
      },
    });
*/
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
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionCollapseState',
      view: (modelAttributeValue) => {
        return {
          key: 'class',
          value: modelAttributeValue === false ? 'collapse' : 'collapse show',
        };
      },
    });
    // Put this here for now while developing this collapse / show state.
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionButtonCollapseState',
      view: (modelAttributeValue) => {
        return {
          key: 'class',
          value: modelAttributeValue === false ? 'collapse' : 'collapse show',
          key: 'aria-expanded',
          value: modelAttributeValue,
        };
      },
    });

    conversion.attributeToAttribute({
      model: 'data-parent',
      view: 'data-parent',
    });
    conversion.attributeToAttribute({
      model: 'role',
      view: 'role',
    });
    conversion.attributeToAttribute({
      model: 'id',
      view: 'id',
    });
    conversion.attributeToAttribute({
      model: 'aria-labelledby',
      view: 'aria-labelledby',
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
