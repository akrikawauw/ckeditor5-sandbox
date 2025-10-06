// Callback which returns an element the toolbar should be attached to.
export function _getSelectedAccordionWidget(selection) {
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
