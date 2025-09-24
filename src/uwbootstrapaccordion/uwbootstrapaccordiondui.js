// simplebox/bootstrapcardui.js

import { Plugin, ButtonView } from 'ckeditor5';

export default class UwBootstrapAccordionUI extends Plugin {
  init() {
    console.log('UwBootstrapAccordionUI#init() got called');

    const editor = this.editor;
    const t = editor.t;

    editor.ui.componentFactory.add('UwbootstrapAccordion', (locale) => {
      const command = editor.commands.get('insertUwBootstrapAccordion');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('UW Accordion'),
        withText: true,
        tooltip: true,
      });

      // buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertUwBootstrapAccordion')
      );

      return buttonView;
    });
  }
}
