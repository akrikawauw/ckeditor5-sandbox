// Import plugins by adding them to the previously added import.
import {
  ClassicEditor,
  Essentials,
  Paragraph,
  Heading,
  List,
  Bold,
  Italic,
} from 'ckeditor5';

import CKEditorInspector from '@ckeditor/ckeditor5-inspector';
// import './css/style.css';

// Import the styles.
import 'ckeditor5/ckeditor5.css';
import SimpleBox from './simplebox/simplebox';
import UwBootstrapAccordion from './uwbootstrapaccordion/uwbootstrapaccordion';

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
  ],
  // Add the toolbar configuration.
  toolbar: [
    'heading',
    'bold',
    'italic',
    'numberedList',
    'bulletedList',
    'simpleBox',
    'uwBootstrapAccordion',
  ],
})
  .then((editor) => {
    CKEditorInspector.attach(editor);
    window.editor = editor;
  })
  .catch((error) => {
    console.log(error);
  });
