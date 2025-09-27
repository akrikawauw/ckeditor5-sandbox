// simplebox/bootstrapcardui.js

import { ButtonView, ContextualBalloon, Plugin } from 'ckeditor5';
import './css/accordion.css';
import FormView from './uwbootstrapaccordionview.js';

export default class UwBootstrapAccordionUI extends Plugin {
  static get requires() {
    return [ ContextualBalloon];
  }
  init() {
    // console.log('UwBootstrapAccordionUI#init() got called');

    const editor = this.editor;
    const t = editor.t;

    // Create the balloon and the form view.
    this._balloon = this.editor.plugins.get( ContextualBalloon);
    this.formView = this._createFormView();

    editor.ui.componentFactory.add('uwBootstrapAccordion', (locale) => {
      const command = editor.commands.get('insertUwBootstrapAccordion');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('UW Accordion'),
        withText: true,
        tooltip: true,
      });

      buttonView.bind("isOn", "isEnabled").to(command, "value", "isEnabled");

      this.listenTo(buttonView, 'execute', () => {
        editor.execute('insertUwBootstrapAccordion')
        this._showUI();
        // const title = 'What You See Is What You Get';
        // const abbr = 'WYSIWYG';
        //
        // editor.model.change(writer => {
        //   editor.model.insertContent(
        //     writer.createText(abbr),
        //     {'abbreviation': title}
        //   );
        //   // Show the UI on button click.
        //   this.listenTo(button, 'execute', () => {
        //     this._showUI();
        //   });
        });
        return buttonView;
      // });

    });
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new FormView( editor.locale );

    return formView;
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    target = () => view.domConverter.viewRangeToDom(
      viewDocument.selection.getFirstRange()
    );

    return {
      target
    };
  }

  _showUI() {
    this._balloon.add(
      {
        view: this.formView,
        position: this._getBalloonPositionData(),
      }
    );

    this.formView.focus();
  }
}
