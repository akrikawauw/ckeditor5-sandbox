// Bootstrap docs: https://getbootstrap.com/docs/4.1/components/collapse/#accordion-example

import { Plugin, Widget, toWidget, toWidgetEditable } from 'ckeditor5';

// import { uid } from 'ckeditor5/src/utils';
import InsertUwBootstrapAccordionCommand from './insertuwbootstrapaccordioncommand';

export default class UwBootstrapAccordionEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log('UwBootstrapAccordionEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertUwBootstrapAccordion',
      new InsertUwBootstrapAccordionCommand(this.editor)
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
          <h3 class="mb-0"><button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-0" aria-expanded="false" aria-controls="collapse-0"><span class="btn-text">Sleep over your phone and make cute snoring noises touch water with paw then recoil in horror</span><span class="arrow-box"><span class="arrow"></span></span></button></h3>
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
      allowAttributes: ['id'],
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
      allowedChildren: ['uwBootstrapAccordionHeading', 'uwBootstrapAccordionCollapse']
    });

    schema.register('uwBootstrapAccordionHeading', {
      isLimit: true,
      allowIn: 'uwBootstrapAccordionItem',
    });

    schema.register('uwBootstrapAccordionButton', {
      // Cannot be split or left by the caret.
      isLimit: true,
      allowAttributes: ['buttonType', 'buttonDataToggle', 'buttonDataTarget', 'buttonAriaExpanded', 'buttonAriaControls'],
      allowIn: 'uwBootstrapAccordionHeading',

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowContentOf: '$text',
    });

    schema.register( 'uwBootstrapAccordionButtonText', {
      isLimit: true,
      isObject: true,
      isInline: true,
      allowWhere: '$block',
      allowIn: 'uwBootstrapAccordionButton',
      allowChildren: ['$text'],

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowAttributes: ['buttonText'],
    })

    schema.register( 'uwBootstrapAccordionCollapse', {
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

    conversion.attributeToAttribute({
      model: 'uwBootstrapAccordionId',
      view: 'id'
    });
    conversion.attributeToAttribute({
      model: 'buttonType',
      view: 'type',
    });
    conversion.attributeToAttribute( {
      model: 'buttonDataToggle',
      view: 'data-toggle',
    })
    conversion.attributeToAttribute( {
      model: 'buttonDataTarget',
      view: 'data-target',
    })
    conversion.attributeToAttribute( {
      model: 'buttonAriaExpanded',
      view: 'aria-expanded',
    })
    conversion.attributeToAttribute( {
      model: 'buttonAriaControls',
      view: 'aria-controls',
    })

    // <bootstrapAccordion> converters
    // TODO: explore using a dispatcher
    conversion.for('upcast').add ( dispatcher => {
      // Look for every accordion.
      dispatcher.on( 'element:div', ( evt, data, conversionApi ) => {
        const viewItem = data.viewItem;
        const {
          consumable,
          writer,
          safeInsert,
          convertChildren,
          updateConversionResult
        } = conversionApi;

        if (consumable.consume(viewItem, {name: true, classes: 'accordion'})) {
          const modelElement = writer.createElement('uwBootstrapAccordion', {
            uwBootstrapAccordionId: viewItem.getAttribute('id') || uid()
          });
          if (safeInsert(modelElement, data.modelCursor)) {
            convertChildren(viewItem, modelElement);
            updateConversionResult(modelElement, data);
          }
        }
      });
    })
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordion',
      view: {
        name: 'div',
        classes: 'accordion'
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordion',
      view: (modelElement, { writer: viewWriter }) => {
        const div = viewWriter.createContainerElement('div', {
          class: 'accordion'
        });
        return toWidget(div, viewWriter, {
          label: 'UW bootstrap accordion widget',
        });
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

    // uwBootstrapAccordionHeading converters
    conversion.for('upcast').add(dispatcher => {
      dispatcher.on('element:div', (evt, data, conversionApi) => {
        // Get all the necessary items from the conversion API object.
        const {
          consumable,
          writer,
          safeInsert,
          convertChildren,
          updateConversionResult
        } = conversionApi;
        if (consumable.consume(data.viewItem, { name: true, classes: 'card-header' })) {
          const modelElement = writer.createElement('uwBootstrapAccordionHeading', [
            writer.createElement('h3', {class: 'mb-0'})
          ]);
          // Forces insertion and conversion of a clean
          // `uwBootstrapAccordionHeading` model element.
          if (safeInsert(modelElement, data.modelCursor)) {
            convertChildren(data.viewItem, modelElement);
            updateConversionResult(modelElement, data);
          }
        }
      });
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionHeading',
      view: {
        name: 'div',
        classes: 'card-header',
      },
    });
    conversion.for('editingDowncast').elementToStructure({
      model: 'uwBootstrapAccordionHeading',
      view: (modelElement, conversionApi) => {
        const {writer} = conversionApi;
        const headingViewElement = writer.createContainerElement(
          'h3',
          {class: 'mb-0'}, [
            writer.createSlot()
          ]);
        return writer.createContainerElement('div', {class: 'card-header'}, [
          headingViewElement
        ]);
      }});

    // uwBootstrapAccordionButton
    // TODO: dig into how this model element should be cast in all ways. it's complex.
    conversion.for('upcast').elementToElement( {
      model: 'uwBootstrapAccordionButton',
      view: {
        name: 'button',
        classes: ['btn','btn-link'],
      },
    });

    // conversion.for('upcast').add(dispatcher => {
    //   dispatcher.on('element:button', (evt, data, conversionApi) => {
    //     // Get all the necessary items from the conversion API object.
    //     const {
    //       consumable,
    //       writer,
    //       safeInsert,
    //       convertChildren,
    //       updateConversionResult
    //     } = conversionApi;
    //     console.log(data.viewItem);
    //     const wrapper = { name: true, classes: ['btn btn-link']};
    //     const innerWrapper = {name: true, class: 'btn-text'};
    //     // Get the first child element.
    //     console.log(innerWrapper)
    //     const firstChildItem = data.viewItem.getChild( 0 );
    //     // Check if the first element is a <div>.
    //     if ( !firstChildItem.is( 'element', 'span' ) ) {
    //       return;
    //     }
    //     const modelElement = writer.createElement('uwBootstrapAccordionButton');
    //     // if (consumable.consume(data.viewItem, wrapper)) {
    //
    //
    //       // console.log(modelElement);
    //       // Forces insertion and conversion of a clean
    //       // `uwBootstrapAccordionHeading` model element.
    //       if (safeInsert(modelElement, data.modelCursor)) {
    //         console.log(firstChildItem)
    //         consumable.consume( data.viewItem, wrapper);
    //         consumable.consume( firstChildItem, innerWrapper);
    //         convertChildren(firstChildItem, modelElement);
    //         console.log(modelElement);
    //         updateConversionResult(modelElement, data);
    //
    //       }
    //
    //   });
    // });
    //   model: ( viewElement, { writer } ) => {
    //     return writer.createElement( 'uwBootstrapAccordionButton', { expanded: viewElement.getAttribute( 'aria-expanded' ) } );
    //   },
    //   // model: 'uwBootstrapAccordionButton',
    //   view: {
    //     name: 'button',
    //     classes: ['btn', 'btn-link'],
    //     attributes: [ 'data-toggle', 'data-target', 'aria-expanded', 'aria-controls'],
    //   },
    // });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionButton',
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionButton',
      view: {
        name: 'button',
        classes: ['btn', 'btn-link'],
      }
    });
    // conversion.for('editingDowncast').elementToElement({
    //   model: 'uwBootstrapAccordionButton',
    //   view: (modelElement, conversionApi) => {
    //     const {writer} = conversionApi;
    //     const buttonTextSpan = writer.createEditableElement(
    //       'span',
    //       {class: 'btn-text'},
    //     );
    //     const button = writer.createContainerElement('button', {classes: 'btn btn-link'}, [
    //       buttonTextSpan
    //     ]);
    //     // return writer.createContainerElement('button', {classes: 'btn btn-link'}, [
    //     //   buttonTextSpan
    //     // ]);
    //     const buttonAndSpan = writer.createContainerElement('button', {class: 'btn btn-link'}, [
    //       buttonTextSpan
    //     ]);
    //     return toWidget(buttonAndSpan, writer);
    //
    //   }
    // });
    // For <span>s
    // conversion.for('downcast').attributeToAttribute( {
    //   model: {name: 'span', class: ['btn-text']},
    //   view: 'span'
    // })

    // uwBootstrapAccordionButtonText
    // <justAButtonText> converters
    conversion.for('upcast').elementToElement({
      // model: 'justAButtonText',
      model: ( viewElement, { writer } ) => {
        const textClasses = viewElement.getAttribute('class');
        // console.log('upcast for justAButtonText', viewElement);
        return writer.createElement('uwBootstrapAccordionButtonText', {textClasses});
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
        return toWidgetEditable(span, viewWriter, {
          label: 'Edit button text',
        });
      },
    });

    // uwBootstrapAccordionCollapse
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse'
      }
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse'
      }
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionCollapse',
      view: {
        name: 'div',
        classes: 'collapse'
      }
    });

    // uwBootstrapAccordionBody converters
    conversion.for('upcast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: {
        name: 'p',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: {
        name: 'p',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'uwBootstrapAccordionBody',
      view: (modelElement, { writer: viewWriter }) => {
        const element = viewWriter.createEditableElement('p'
        );

        return toWidgetEditable(element, viewWriter);
      },
    });
  }
}
