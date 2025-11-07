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

    // uwBootstrapAccordionHeader converters.
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
      model: 'uwBootstrapAccordionHeader',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });

    // uwBootstrapAccordionHeading converters.
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
    conversion.for('upcast').elementToElement({
      view: {
        name: 'button',
        classes: ['btn', 'btn-link'],
      },
      // Write the model element. Use the class values in the view to determine the attribute value for
      // uwBootstrapAccordionCollapseState. Set that value as we create the model element.
      model: ( viewElement, { writer }) => {
        const modelElement = writer.createElement('uwBootstrapAccordionButton');
        const viewValue = viewElement.getAttribute('class');
        console.log(viewValue);
        const valueToSet = viewValue.includes('collapsed') ? false : true;
        console.log(valueToSet)
        writer.setAttribute('uwBootstrapAccordionButtonCollapseState', valueToSet, modelElement);

        return modelElement;
      }
      // model: (viewElement, { writer }) => {
      //   return writer.createElement('uwBootstrapAccordionButton');
      // },
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
            class:  modelElement.getAttribute( 'uwBootstrapAccordionButtonCollapseState' ) ? 'btn btn-link' : 'btn btn-link collapsed',
            type: modelElement.getAttribute('buttonType'),
            'data-toggle': modelElement.getAttribute('buttonDataToggle'),
            'data-target': modelElement.getAttribute('buttonDataTarget'),
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
        // console.log('XXXX', modelElement.getAttribute('uwBootstrapAccordionButtonCollapseState'))
        const buttonViewElement = writer.createContainerElement(
          'button',
          {
            class:  modelElement.getAttribute( 'uwBootstrapAccordionButtonCollapseState' ) ? 'btn btn-link' : 'btn btn-link collapsed',
            type: modelElement.getAttribute('buttonType'),
            'data-toggle': modelElement.getAttribute('buttonDataToggle'),
            'data-target': modelElement.getAttribute('buttonDataTarget'),
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
      model: (viewElement, { writer }) => {
        const textClasses = viewElement.getAttribute('class');

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

    // uwBootstrapAccordionCollapse
    conversion.for('upcast').elementToElement({
      view: {
        name: 'div',
        classes: ['collapse']
      },
      // Write the model element. Use the class values in the view to determine the attribute value for
      // uwBootstrapAccordionCollapseState. Set that value as we create the model element.
      model: ( viewElement, { writer }) => {
        const modelElement = writer.createElement('uwBootstrapAccordionCollapse');
        const viewValue = viewElement.getAttribute('class');
        const valueToSet = viewValue.includes('show') ? true : false;
        writer.setAttribute('uwBootstrapAccordionCollapseState', valueToSet, modelElement);

        return modelElement;
      }
    });
    conversion.for('downcast').elementToElement({
      model: {
        name: 'uwBootstrapAccordionCollapse',
        attributes: [ 'uwBootstrapAccordionCollapseState' ]
      },
      view: ( modelElement, { writer } ) => {
        return writer.createContainerElement(
          'div', {'class':  modelElement.getAttribute( 'uwBootstrapAccordionCollapseState' ) ? 'collapse show' : 'collapse'}
        );
      }
    });

    // Put this here for now while developing this collapse / show state.
    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionButtonCollapseState',
      view: (modelAttributeValue) => {
        return {
          key: 'class',
          value: modelAttributeValue === false ? ['btn', 'btn-link', 'collapsed'] : ['btn', 'btn-link']
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
