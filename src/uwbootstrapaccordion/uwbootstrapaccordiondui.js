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
  LabeledFieldView,
  createLabeledInputText,
  IconChevronDown,
  IconChevronUp,
  IconCode,
  IconCheck,
  IconRemoveComment,
} from 'ckeditor5';
import './css/accordion.css';
import FormView from './uwbootstrapaccordionview.js';
import UwBootstrapAccordionItemPropertiesUI from './uwbootstrapaccordionitemproperties/uwbootstrapaccordionitempropertiesui.js';
import {
  _getSelectedAccordionWidget,
  _getSelectedAccordionModelElement,
} from './uwbootstrapaccordionutils.js';

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
    // editor.ui.componentFactory.add(
    //   'uwBootstrapAccordionItemProperties',
    //   (locale) => {
    //     const itemFormView = new UwBootstrapAccordionItemPropertiesUI(editor);
    //     console.log(itemFormview);
    //     const button = new ButtonView();
    //     button.set({
    //       label: 'Button',
    //       withText: false,
    //       icon: IconRemoveComment,
    //     });

    //     this.listenTo(button, 'execute', () => {
    //       // editor.execute('insertUwBootstrapAccordion');
    //       itemFormView.render();
    //     });
    //   }
    // );

    editor.ui.componentFactory.add('uwBootstrapAccordionItem', (locale) => {
      const command = editor.commands.get('insertUwBootstrapAccordionItem');

      //Create the toolbar
      const toolbarView = this._createToolbarView();

      const dropdownView = this._createDropdownView(locale, command);

      toolbarView.items.add(dropdownView);

      // toolbarView.items.add(button);
      return toolbarView;
    });
  }

  afterInit() {
    // const { config, plugins } = this.editor;
    // const widgetToolbarRepository = plugins.get(WidgetToolbarRepository);
    // widgetToolbarRepository.register('uwBootstrapAccordionItem', {
    //   items: config.get('uwBootstrapAccordion.toolbar'),
    //   getRelatedElement: _getSelectedAccordionWidget,
    // });
  }

  _createFormView() {
    const editor = this.editor;
    const formView = new FormView(editor.locale);
    // const formView = new UwBootstrapAccordionItemPropertiesView(editor.locale);

    this.listenTo(formView, 'submit', () => {
      // Setting texts: title and abbreviation.
      // ...
      const title = formView.accessibleTitleInput.fieldView.element.value;
      const id = formView.idInputView.fieldView.element.value;

      // Write the field data to the model
      editor.model.change((writer) => {
        const selection = editor.model.document.selection;
        const selectedElement = selection.getSelectedElement();
        // const foundElement; // todo, figure out how to find the accordion element
        // write a function for this _getSelectedAccordionAccessibleTitle

        if (selectedElement && id) {
          writer.setAttribute('id', id, selectedElement);
        }
        if (selectedElement && title) {
          this._changeViewContent(title, selection);
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

  _changeViewContent(incomingText, modelElement) {
    const model = this.editor.model;
    // const conversion = editor.conversion;

    // schema.extend('uwBootstrapAccordion', {
    //   allowAttributes: 'data-accessible-title',
    // });

    // const referencePoint = this._getSelectedAccordionAccessibleTitleText();
    const referencePoint = _getSelectedAccordionModelElement(
      model,
      'uwBootstrapAccordionAccessibleTitle'
    );
    console.log(referencePoint);

    model.change((writer) => {
      const range = writer.createRangeIn(referencePoint);
      writer.insertText(incomingText, referencePoint, 'end');
      writer.remove(range);
    });
  }

  _createToolbarView() {
    const editor = this.editor;
    const locale = new Locale();
    const toolbarButton = new ToolbarView(locale);
    return toolbarButton;
  }

  _createDropdownView(locale, command) {
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
        icon: IconChevronUp,
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
        icon: IconChevronDown,
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

    const button = new ButtonView();
    button.set({ label: 'Button', withText: false, icon: IconRemoveComment });

    buttonView.set({
      // label: t('Accordion item'),
      icon: IconCode,
      tooltip: t('Accordion item'),
      class: 'ck-dropdown__button_label-width_auto',
      withText: true,
    });
    return dropdownView;
  }

  _hideUI() {
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
      // view: this.UwBootstrapAccordionItemPropertiesView,
      position: this._getBalloonPositionData(),
    });

    this.formView.focus();
  }

  /**
   * Returns selected link text content.
   * If link is not selected it returns the selected text.
   * If selection or link includes non text node (inline object or block) then returns undefined.
   */
  _getSelectedAccordionAccessibleTitleText() {
    // TODO: write this
    const model = this.editor.model;

    const selection = model.document.selection;
    const foundElements = [];

    for (const range of selection.getRanges()) {
      for (const item of range.getItems()) {
        if (
          // item.is('element')
          item.is('element') &&
          item.name === 'uwBootstrapAccordionAccessibleTitle'
        ) {
          foundElements.push(item);
        }
      }
    }
    console.log('foundElements', foundElements[0]);

    return foundElements[0];
  }
}
