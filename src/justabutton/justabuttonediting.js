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
    const schema = this.editor.model.schema;

    schema.extend('$text', {
      allowAttributes: ['justAButtonText', 'textClass'],
    });

    schema.register('justAButton', {
      // Behaves like a self-contained object (e.g. an image).
      isObject: true,
      // Allow in places where other blocks are allowed (e.g. directly in the root).
      allowWhere: '$block',

      // allowContentOf: '$text',
      allowChildren: ['justAButtonText'],
    });

    schema.register('justAButtonText', {
      // Cannot be split or left by the caret.
      allowWhere: '$block',
      // allowIn: 'justAButton',
      // Allow content which is allowed in blocks (i.e. text with attributes).
      allowAttributes: ['buttonText'],
    });
  }

  _defineConverters() {
    const conversion = this.editor.conversion;

    // <justAButton> converters
    conversion.for('upcast').elementToElement({
      model: 'justAButton',
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
    });
    conversion.for('dataDowncast').elementToElement({
      model: 'justAButton',
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
    });
    conversion.for('editingDowncast').elementToElement({
      model: 'justAButton',
      view: (modelElement, { writer: viewWriter }) => {
        const button = viewWriter.createContainerElement('button', {
          class: ['btn btn-link'],
        });

        return toWidgetEditable(button, viewWriter, {
          label: 'justAButton widgets',
        });
      },
    });

    // <justAButtonTitle> converters
    conversion.for('upcast').elementToElement({
      // model: 'justAButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
      model: (viewElement, { writer: modelWriter }) => {
        // Extract the "name" from "{name}".
        console.log('viewElement', viewElement);
        const textData = viewElement.getChild(0).data;
        console.log('textData', textData);
        // const name = viewElement.getChild(0).data.slice(1, -1);

        return modelWriter.createElement('justAButtonText', { textData });
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'justAButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
      // view: (modelItem, { writer }) => {
      //   return writer.createContainerElement('span', { class: 'btn-text' });
      // },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'justAButtonText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'btn-text',
          id: 'bob',
          textData: 'textData',
        });
        // console.log('here', modelElement);
        // return toWidgetEditable(nested, writer, {
        //   label: 'label for editable',
        // });
        return toWidgetEditable(span, viewWriter, {
          label: 'this editable',
        });
      },
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
