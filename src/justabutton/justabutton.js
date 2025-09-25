// justabutton/justabutton.js

import JustAButtonEditing from './justabuttonediting';
import JustAButtonUI from './justabuttonui';
import { Plugin } from 'ckeditor5';

export default class JustAButton extends Plugin {
  static get requires() {
    return [JustAButtonEditing, JustAButtonUI];
  }
}
