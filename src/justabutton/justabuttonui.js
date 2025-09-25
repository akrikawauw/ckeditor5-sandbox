// justabutton/justabuttonui.js

// import ButtonView from '@ckeditor/ckeditor5-ui/src/button/buttonview';
import { Plugin, ButtonView } from 'ckeditor5';

export default class JustAButtonUI extends Plugin {
  init() {
    console.log('JustAButtonUI#init() got called');

    const editor = this.editor;
    const t = editor.t;

    // The "justAButton" button must be registered among the UI components of the editor
    // to be displayed in the toolbar.
    editor.ui.componentFactory.add('justAButton', (locale) => {
      // The state of the button will be bound to the widget command.
      const command = editor.commands.get('insertJustAButton');

      // The button willl be an instance of ButtonView
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('Just a button'),
        withText: true,
        tooltip: true,
      });

      // Bind the state of the button to the command.
      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      // Execute the command when the button is clicked (executed).
      this.listenTo(buttonView, 'execute', () =>
        editor.execute('insertJustAButton')
      );

      return buttonView;
    });
  }
}
