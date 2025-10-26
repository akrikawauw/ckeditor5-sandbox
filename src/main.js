// Import plugins by adding them to the previously added import.
import {
  ClassicEditor,
  Clipboard,
  Essentials,
  Paragraph,
  Heading,
  List,
  Table,
  TableToolbar,
  TableCellProperties,
  TableProperties,
  Bold,
  Italic,
  GeneralHtmlSupport,
  SourceEditing,
} from 'ckeditor5';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
// import './css/style.css';

// Import the styles.
import 'ckeditor5/ckeditor5.css';
import SimpleBox from './simplebox/simplebox';
import UwBootstrapAccordion from './uwbootstrapaccordion/uwbootstrapaccordion';
import UwBootstrapAccordionToolbar from './uwbootstrapaccordion/uwbootstrapaccordiontoolbar';
import JustAButton from './justabutton/justabutton';

// Get the HTML element with the ID of 'app'.
const element = document.querySelector('#editor');
// const watchdog = new EditorWatchdog(ClassicEditor);

// Update the call to the `create()` method.
const editor = await ClassicEditor.create(element, {
  licenseKey: 'GPL', // Or '<YOUR_LICENSE_KEY>'.
  plugins: [
    Essentials,
    Clipboard,
    Paragraph,
    Heading,
    List,
    Bold,
    Italic,
    Table,
    TableToolbar,
    TableProperties,
    TableCellProperties,
    SimpleBox,
    UwBootstrapAccordion,
    UwBootstrapAccordionToolbar,
    JustAButton,
    GeneralHtmlSupport,
    SourceEditing,
  ],
  // HTMLSupport options.
  htmlSupport: {
    allow: [
      {
        name: 'button',
        classes: /^(?!.*btn)/,
        // classes: true, // Allow all attributes on <button>
        // attributes: true, // Allow children inside <button>
      },
      {
        name: 'span',
        attributes: true, // Allow all attributes on <span>
        classes: true, // Allow classes on <span>
        styles: true, // Allow styles on <span>
      },
      // {
      //   name: /.*/,
      //   attributes: true,
      //   classes: true,
      //   styles: true,
      // },
    ],
    disallow: [
      {
        name: 'button',
        // classes: /(?!.*btn)/,
        // attributes: ['data-toggle'],
      },
    ],
  },

  // Add the toolbar configuration.
  toolbar: [
    'heading',
    'bold',
    'italic',
    'numberedList',
    'bulletedList',
    'simpleBox',
    'insertTable',
    'uwBootstrapAccordion',
    'justAButton',
    'sourceEditing',
  ],
  uwBootstrapAccordion: {
    toolbar: [
      'uwBootstrapAccordionItem',
      'accordionItemProperties',
      'accordionProperties',
    ],
  },
  table: {
    contentToolbar: [
      'tableColumn',
      'tableRow',
      'mergeTableCells',
      'tableProperties',
      'tableCellProperties',
    ],
  },
})
  .then((editor) => {
    CKEditorInspector.attach(editor);
    window.editor = editor;
  })
  .catch((error) => {
    console.log(error);
  });
