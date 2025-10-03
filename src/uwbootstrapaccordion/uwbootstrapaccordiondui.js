// uwbootstrapaccordion/uwbootstrapaccordionui.js

import {
  ButtonView,
  ContextualBalloon,
  clickOutsideHandler,
  Plugin,
  WidgetToolbarRepository,
  ToolbarView,
  Collection,
  Locale,
  createDropdown,
  addListToDropdown,
} from 'ckeditor5';
import './css/accordion.css';
import FormView from './uwbootstrapaccordionview.js';

export default class UwBootstrapAccordionUI extends Plugin {
  static get requires() {
    return [ContextualBalloon, WidgetToolbarRepository];
  }

  init() {
    const editor = this.editor;
    const t = editor.t;

    // Create the balloon and the form view.
    this._balloon = this.editor.plugins.get(ContextualBalloon);
    this.formView = this._createFormView();

    // Create the toolbar
    this.toolbarView = this._createToolbarView();

    // TODO: break these out into build functions
    // Building the main uwBootstrapAccordion button
    editor.ui.componentFactory.add('uwBootstrapAccordion', (locale) => {
      const command = editor.commands.get('insertUwBootstrapAccordion');
      const buttonView = new ButtonView(locale);

      buttonView.set({
        label: t('UW Accordion'),
        withText: true,
        tooltip: true,
        class: 'ck-button-action',
      });

      buttonView.bind('isOn', 'isEnabled').to(command, 'value', 'isEnabled');

      this.listenTo(buttonView, 'execute', () => {
        editor.execute('insertUwBootstrapAccordion');
        this._showUI();
      });

      return buttonView;
    });

    // Building the toolbar buttons
    editor.ui.componentFactory.add('uwBootstrapAccordionItem', (locale) => {
      const command = editor.commands.get('insertUwBootstrapAccordionItem');

      const dropdownView = createDropdown(locale);
      const buttonView = dropdownView.buttonView;
      const list = new Collection();
      const t = locale.t;

      // Found that using model: new Model({}) didn't work.
      list.add({
        type: 'button',
        model: {
          command: command,
          withText: true,
          label: 'Insert item above',
          id: 'insert-accordion-item',
          options: { positionOffset: 'before' },
        },
      });
      list.add({
        type: 'button',
        model: {
          command: command,
          withText: true,
          label: 'Insert item below',
          id: 'insert-accordion-item',
          options: { positionOffset: 'after' },
        },
      });

      addListToDropdown(dropdownView, list);

      // This
      dropdownView.on('execute', (eventInfo) => {
        // console.log(event);
        if (eventInfo.source.id === 'insert-accordion-item') {
          // this.event.fire(command);
          editor.execute(
            'insertUwBootstrapAccordionItem',
            eventInfo.source.options
          );
        }
      });

      buttonView.set({
        label: t('Accordion item'),
        tooltip: t('Accordion item'),
        class: 'ck-dropdown__button_label-width_auto',
        withText: true,
      });

      return dropdownView;
    });
  }

  afterInit() {
    const { config, plugins } = this.editor;
    const widgetToolbarRepository = plugins.get(WidgetToolbarRepository);

    widgetToolbarRepository.register('uwBootstrapAccordion', {
      items: config.get('uwBootstrapAccordion.toolbar'),
      getRelatedElement: this._getSelectedAccordionWidget,
    });
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new FormView(editor.locale);

    this.listenTo(formView, 'submit', () => {
      // Setting texts: title and abbreviation.
      // ...
      const title = formView.titleInputView.fieldView.element.value;
      const id = formView.idInputView.fieldView.element.value;

      editor.model.change((writer) => {
        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();
        // const foundElement; // todo, figure out how to find the accordion element
        if (selectedElement && id) {
          writer.setAttribute('id', id, selectedElement);
        }
      });

      // Hide the form view after submit.
      this._hideUI();
    });

    // Hide the form view after clicking the "Cancel" button.
    this.listenTo(formView, 'cancel', () => {
      this._hideUI();
    });

    // Hide the form view when clicking outside the balloon.
    clickOutsideHandler({
      emitter: formView,
      activator: () => this._balloon.visibleView === formView,
      contextElements: [this._balloon.view.element],
      callback: () => this._hideUI(),
    });
    return formView;
  }

  _createToolbarView() {
    const editor = this.editor;

    const locale = new Locale();

    const button = new ButtonView();
    button.set({ label: 'Button', withText: true });

    const toolbarButton = new ToolbarView(locale);
    toolbarButton.items.add(button);
    toolbarButton.render();

    return toolbarButton;
  }

  _hideUI() {
    this.formView.idInputView.fieldView.value = '';
    this.formView.titleInputView.fieldView.value = '';
    this.formView.element.reset();

    this._balloon.remove(this.formView);

    // Focus the editing view after closing the form view.
    this.editor.editing.view.focus();
  }

  _getBalloonPositionData() {
    const view = this.editor.editing.view;
    const viewDocument = view.document;
    let target = null;

    // Set a target position by converting view selection range to DOM.
    target = () =>
      view.domConverter.viewRangeToDom(viewDocument.selection.getFirstRange());

    return {
      target,
    };
  }

  _showUI() {
    this._balloon.add({
      view: this.formView,
      position: this._getBalloonPositionData(),
    });

    this.formView.focus();
  }

  // Callback which returns an element the toolbar should be attached to.
  _getSelectedAccordionWidget(selection) {
    // if (this.editor.ui.focusTracker.isFocused) {
    const selectionFocus = selection.focus;
    // console.log(selection.focus);
    if (selectionFocus !== null) {
      // console.log('im trying');
      const accordion = selectionFocus
        .getAncestors()
        .reverse()
        // TODO: build a helper function that determines if we're inside an accordion.
        .find((node) => node.name == 'div' && node.hasClass('accordion'));
      // .find((node) => node == 'element' && this._isAccordionWidget(node));
      // console.log('type', accordion);
      return accordion;
      // return accordion.is('element') ? accordion : null;
    }
    return null;
  }
}
