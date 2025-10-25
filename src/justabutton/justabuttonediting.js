// justabutton/justabuttonediting.js

import { Plugin, Widget, toWidget, toWidgetEditable } from 'ckeditor5';

import InsertJustAButtonCommand from './insertjustabuttoncommand';

export default class JustAButtonEditing extends Plugin {
  static get requires() {
    return [Widget];
  }

  init() {
    // console.log('JustAButtonEditing#init() got called');

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
      allowAttributes: [
        'buttonType',
        'buttonDataToggle',
        'buttonDataTarget',
        'buttonAriaExpanded',
        'buttonAriaControls',
      ],
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
      view: 'type',
    });
    conversion.attributeToAttribute({
      model: 'buttonDataToggle',
      view: 'data-toggle',
    });
    conversion.attributeToAttribute({
      model: 'buttonDataTarget',
      view: 'data-target',
    });
    conversion.attributeToAttribute({
      model: 'buttonAriaExpanded',
      view: 'aria-expanded',
    });
    conversion.attributeToAttribute({
      model: 'buttonAriaControls',
      view: 'aria-controls',
    });

    // <justAButton> converters
    conversion.for('upcast').elementToElement({
      model: 'justAButton',
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
    });
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
    conversion.for('editingDowncast').elementToElement({
      model: 'justAButton',
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
      // view: ( modelElement, { writer }) => {
      //   const element = writer.createEditableElement('button', {
      //     class: 'btn btn-link',
      //   });
      //   console.log(modelElement);
      //   element.placeholder = 'Button here';
      //   const widget = toWidgetEditable(element, writer, { label: 'Button header whatnot'});
      //   return widget;
      // }
    });

    conversion.for('dataDowncast').elementToElement({
      model: {
        name: 'justAButton',
        attributes: ['buttonType'],
      },
      view: {
        name: 'button',
        classes: 'btn btn-link',
      },
      // view: ( modelElement, { writer }) => {
      //   return writer.createContainerElement('button', {
      //     'class': 'btn btn-link',
      //     'type': modelElement.getAttribute('buttonType'),
      //     'data-toggle': modelElement.getAttribute('buttonDataToggle'),
      //     'data-target': modelElement.getAttribute('buttonDataTarget'),
      //     'aria-expanded': modelElement.getAttribute('buttonAriaExpanded'),
      //     'aria-controls': modelElement.getAttribute('buttonAriaControls'),
      //   });
      // },
      // converterPriority: 'highest',
    });

    // <justAButtonText> converters
    conversion.for('upcast').elementToElement({
      // model: 'justAButtonText',
      model: (viewElement, { writer }) => {
        const textClasses = viewElement.getAttribute('class');
        // console.log('upcast for justAButtonText', viewElement);
        return writer.createElement('justAButtonText', { textClasses });
      },
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    });

    conversion.for('dataDowncast').elementToElement({
      model: 'justAButtonText',
      view: {
        name: 'span',
        classes: ['btn-text'],
      },
    });

    conversion.for('editingDowncast').elementToElement({
      model: 'justAButtonText',
      view: (modelElement, { writer: viewWriter }) => {
        const span = viewWriter.createEditableElement('span', {
          class: 'btn-text',
        });
        return toWidgetEditable(span, viewWriter, {
          label: 'Edit button text',
        });
      },
    });
  }
}
