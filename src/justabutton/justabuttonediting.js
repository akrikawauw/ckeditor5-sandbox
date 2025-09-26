// justabutton/justabuttonediting.js

import { Plugin, Widget, toWidget, toWidgetEditable } from 'ckeditor5';

import InsertJustAButtonCommand from './insertjustabuttoncommand';

export default class JustAButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    console.log('JustAButtonEditing#init() got called');

    this._defineSchema();
    this._defineConverters();

    this.editor.commands.add(
      'insertJustAButton',
      new InsertJustAButtonCommand(this.editor)
    );
  }

  /*
    <button class="btn btn-link" type="button" data-toggle="collapse" data-target="#collapse-0" aria-expanded="false" aria-controls="collapse-0">
      <span class="btn-text">Sleep over your phone and make cute snoring noises touch water with paw then recoil in horror</span>
    </button>
  */
  _defineSchema() {
    const editor = this.editor;
    const schema = editor.model.schema;

    schema.extend('$text', {
      allowAttributes: ['justAButtonText'],
    });

    schema.register('justAButton', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowIn: '$root',

      // allowContentOf: '$block', // This or something like it is key.
      // allowChildren: '$text'
      // allowAttributes: ['type', 'data-toggle', 'data-target', 'aria-expanded', 'aria-controls']
    });

    schema.register('justAButtonText', {
      // Cannot be split or left by the caret.
      isLimit: true,
      isObject: true,
      isInline: true,
      allowWhere: '$block',
      allowIn: 'justAButton',
      allowChildren: ['$text'],

      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowAttributes: ['buttonText'],
    });

    // If GHS is enabled, ensure that `button` is not being processed.
    // @see https://github.com/ckeditor/ckeditor5/issues/13268
    // AK 9/26/25: This didn't have an effect for me. The allow/disallow settings
    // in htmlSupport: {}  in main.js do.
    if (editor.plugins.has('DataFilter')) {
      const dataFilter = editor.plugins.get('DataFilter');
      console.log(dataFilter);
      // dataFilter.disallowElement('button');
    }
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    conversion.attributeToAttribute({
      model: 'buttonType',
      view: 'type'
    })

    // <justAButton> converters
    // See: https://ckeditor.com/docs/ckeditor5/latest/framework/deep-dive/conversion/upcast.html#converting-structures
    conversion.for('upcast').add (dispatcher => {
      // Look for special buttons
      dispatcher.on('element:button', (evt, data, conversionApi) => {

        if (conversionApi.consumable.consume(data.viewItem, { name: true, classes: ['btn', 'btn-link'] })) {
          console.log(data.viewItem);
          const modelElement = conversionApi.writer.createElement('justAButton');
          // Forces insertion and conversion of a clean
          // `bootstrapAccordionButton` model element.
          console.log(modelElement);
          if (!conversionApi.safeInsert(modelElement, data.modelCursor)) {
            console.log('did this run?')
            conversionApi.convertChildren(data.viewItem, modelElement);
            conversionApi.updateConversionResult(modelElement, data);
          }
        }
        //
        // const viewItem = data.viewItem;
        // const {
        //   consumable,
        //   writer,
        //   safeInsert,
        //   convertChildren,
        //   updateConversionResult
        // } = conversionApi;
        //
        // console.log(data.viewItem);
        // const wrapper = { name: true, classes: ['btn btn-link']};
        // const innerWrapper = { name: 'span'};
        // // Get the first child element.
        // console.log(innerWrapper);
        // const firstChildItem = data.viewItem.getChild( 0 );
        // // Check if the first element is a <span>.
        // if ( !firstChildItem.is( 'element', 'span' ) ) {
        //   return;
        // }
        // const modelElement = writer.createElement('justAButton');
        //
        // // Forces insertion and conversion of a clean
        // // `justAButton` model element.
        // if (safeInsert(modelElement, data.modelCursor)) {
        //   console.log(firstChildItem)
        //   consumable.consume( data.viewItem, wrapper);
        //   consumable.consume( firstChildItem, innerWrapper);
        //   convertChildren(firstChildItem, modelElement);
        //   console.log(modelElement);
        //   updateConversionResult(modelElement, data);
        // }
      });
    });


    // conversion.for('upcast').elementToElement({
    //   model: 'justAButton',
    //   view: {
    //     name: 'button',
    //     classes: 'btn btn-link',
    //   },
      // model: ( viewElement, { writer } ) => {
      //   console.log('upcast for justAButton', viewElement.getChildren());
      //   const buttonType = viewElement.getAttribute('type');
      //   const buttonDataToggle = viewElement.getAttribute('data-toggle');
      //   const buttonDataTarget = viewElement.getAttribute('data-target');
      //   const buttonAriaExpanded = viewElement.getAttribute('aria-expanded');
      //   const buttonAriaControls = viewElement.getAttribute('aria-controls')
      //
      //   return writer.createElement('justAButton', {buttonType, buttonDataToggle, buttonDataTarget, buttonAriaExpanded, buttonAriaControls})
      // },
      // converterPriority: 'highest',
    conversion.for('editingDowncast').elementToElement( {
      model: 'justAButton',
      view: ( modelElement, { writer }) => {
        const element = writer.createEditableElement('button', {
          class: 'btn btn-link',
        });
        console.log(modelElement);
        element.placeholder = 'Button here';
        const widget = toWidgetEditable(element, writer, { label: 'Button header whatnot'});
        return widget;
      }
    })

    conversion.for('dataDowncast').elementToElement({
      model: {
        name: 'justAButton',
        attributes: ['buttonType', 'buttonDataToggle', 'buttonDataTarget', 'buttonAriaExpanded', 'buttonAriaControls']
      },
      // view: {
      //   name: 'button',
      //   classes: 'btn btn-link',
      // },
      view: ( modelElement, { writer }) => {
        return writer.createContainerElement('button', {
          'class': 'btn btn-link',
          'type': modelElement.getAttribute('buttonType'),
          'data-toggle': modelElement.getAttribute('buttonDataToggle'),
          'data-target': modelElement.getAttribute('buttonDataTarget'),
          'aria-expanded': modelElement.getAttribute('buttonAriaExpanded'),
          'aria-controls': modelElement.getAttribute('buttonAriaControls'),
        });
      },
      converterPriority: 'highest',
    });

    // <justAButtonText> converters
    conversion.for('upcast').elementToElement({
      // model: 'justAButtonText',
      model: ( viewElement, { writer } ) => {
        const textClasses = viewElement.getAttribute('class');
        console.log('upcast for justAButtonText', viewElement);
        return writer.createElement('justAButtonText', {textClasses});
      },
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
      // view: (modelElement, { writer: viewWriter }) => {
      //   console.log(viewWriter);
      //   const span = viewWriter.createEditableElement('span', {
      //     class: 'btn-text',
      //   });
      // converterPriority: 'highest',
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'justAButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
      // converterPriority: 'highest',
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'justAButtonText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'btn-text',
        });
        // console.log('here', modelElement);
        // return toWidgetEditable(nested, writer, {
        //   label: 'label for editable',
        // });
        return toWidgetEditable(span, viewWriter, {
          label: 'this editable',
        });
      },
      // converterPriority: 'highest',
    });

    /* conversion.for('upcast').elementToAttribute({
      model: {
        name: 'justAButtonText',
        key: 'textClass',
        value: (viewElement) => viewElement.getAttribute('class'),
      },
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    }); */

    // conversion.for('downcast').attributeToElement({
    //   model: 'textClass',
    //   view: (modelAttributeValue, conversionApi) => {
    //     const { writer } = conversionApi;

    //     return writer.createAttributeElement('span', {
    //       class: modelAttributeValue,
    //     });
    //   },
    // });

    // conversion.for('editingDowncast').attributeToElement({
    //   model: 'justAButtonText',
    //   view: (modelElement, { writer: viewWriter }) => {
    //     // Note: You use a more specialized createEditableElement() method here.
    //     const span = viewWriter.createEditableElement('htmlSpan', {
    //       class: 'btn-text',
    //     });

    //     return toWidgetEditable(span, viewWriter);
    //   },
    // });
  }
}
