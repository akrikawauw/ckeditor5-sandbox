import { Plugin, GeneralHtmlSupport  } from 'ckeditor5';
/**
 * A plugin extending General HTML Support, for example, with custom HTML elements.
 */
export default class ExtendHTMLSupport extends Plugin {
  static get requires() {
    return [ GeneralHtmlSupport ];
  }
  init() {
    // Extend the schema with custom HTML elements.
    const dataFilter = this.editor.plugins.get('DataFilter');
    const dataSchema = this.editor.plugins.get('DataSchema');

    // Inline element.
    dataSchema.registerInlineElement({
      view: 'element-inline',
      model: 'myElementInline'
    });

    // Custom elements need to be registered using direct API instead of configuration.
    dataFilter.allowElement('element-inline');
    dataFilter.allowAttributes({name: 'element-inline', attributes: {'data-foo': false}, classes: ['foo']});

    // Block element.
    dataSchema.registerBlockElement({
      view: 'element-block',
      model: 'myElementBlock',
      modelSchema: {
        inheritAllFrom: '$block'
      }
    });

    dataFilter.allowElement('element-block');
  }
}
