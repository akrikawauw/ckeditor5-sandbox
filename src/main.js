// Import plugins by adding them to the previously added import.
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  List,
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
import JustAButton from './justabutton/justabutton';

// Get the HTML element with the ID of 'app'.
const element = document.querySelector('#editor');

// Update the call to the `create()` method.
const editor = await ClassicEditor.create(element, {
  licenseKey: 'GPL', // Or '<YOUR_LICENSE_KEY>'.
  plugins: [
    Essentials,
    Paragraph,
    Heading,
    List,
    Bold,
    Italic,
    SimpleBox,
    UwBootstrapAccordion,
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
      // {
      //   name: 'span',
      //   attributes: true, // Allow all attributes on <span>
      //   classes: true, // Allow classes on <span>
      //   styles: true, // Allow styles on <span>
      // },
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
      }
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
    'uwBootstrapAccordion',
    'justAButton',
    'sourceEditing',

  ],
})
  .then((editor) => {
    CKEditorInspector.attach(editor);
    window.editor = editor;
  })
  .catch((error) => {
    console.log(error);
  });
