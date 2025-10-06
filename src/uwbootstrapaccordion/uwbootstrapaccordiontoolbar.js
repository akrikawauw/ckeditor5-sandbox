import { Plugin } from 'ckeditor5/src/core.js';
import { Widget, WidgetToolbarRepository } from 'ckeditor5/src/widget.js';

import { _getSelectedAccordionWidget } from './uwbootstrapaccordionutils.js';

export class UwBootstrapAccordionToolbar extends Plugin {
  /**
   * @inheritDoc
   */
  static get requires() {
    return [WidgetToolbarRepository];
  }

  /**
   * @inheritDoc
   */
  static get pluginName() {
    return 'UwBootstrapAccordionToolbar';
  }

  /**
   * @inheritDoc
   */
  afterInit() {
    const editor = this.editor;
    const t = editor.t;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    const uwBootstrapAccordionToolbarItems = editor.config.get(
      'uwBootstrapAccordion.accordionItemToolbar'
    );

    if (uwBootstrapAccordionToolbarItems) {
      widgetToolbarRepository.register('uwBootstrapAccordion', {
        ariaLabel: t('UW Bootstrap Accordion Item toolbar'),
        items: uwBootstrapAccordionToolbarItems,
        getRelatedElement: this._getSelectedAccordionWidget,
      });
    }
  }
}
