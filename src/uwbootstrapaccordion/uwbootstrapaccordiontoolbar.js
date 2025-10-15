import { Plugin } from 'ckeditor5';
import { Widget, WidgetToolbarRepository } from 'ckeditor5';

import { _getSelectedAccordionWidget } from './uwbootstrapaccordionutils.js';

export default class UwBootstrapAccordionToolbar extends Plugin {
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
    const config = editor.config;
    const widgetToolbarRepository = editor.plugins.get(WidgetToolbarRepository);

    const uwBootstrapAccordionToolbarItems = editor.config.get(
      'uwBootstrapAccordion.toolbar'
    );

    if (uwBootstrapAccordionToolbarItems) {
      widgetToolbarRepository.register('uwBootstrapAccordion', {
        ariaLabel: t('UW Bootstrap Accordion Item toolbar'),
        items: config.get('uwBootstrapAccordion.toolbar'),
        getRelatedElement: _getSelectedAccordionWidget,
      });
    }
  }
}
