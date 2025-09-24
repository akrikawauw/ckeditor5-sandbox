// BootstrapAccordion/BootstrapAccordion.js

import UwBootstrapAccordionEditing from './uwbootstrapaccordionediting';
import UwBootstrapAccordionUI from './uwbootstrapaccordiondui';
import { Plugin } from 'ckeditor5';

export default class UwBootstrapAccordion extends Plugin {
  static get requires() {
    return [UwBootstrapAccordionEditing, UwBootstrapAccordionUI];
  }
}
