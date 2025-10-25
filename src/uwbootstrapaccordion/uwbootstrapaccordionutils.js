import { BalloonPanelView, ModelElement } from 'ckeditor5';
// Callback which returns an element the toolbar should be attached to.
export function _getSelectedAccordionWidget(selection) {
  const selectionFocus = selection.focus;
  // console.log(selection.focus);
  if (selectionFocus !== null) {
    const accordion = selection.focus
      .getAncestors()
      .reverse()
      // TODO: build a helper function that determines if we're inside an accordion.
      // .find((node) => node.name == 'div' && node.hasClass('accordion'));
      .find((node) => node.is('element', 'div') && isAccordionWidget(node));

    if (accordion !== undefined && accordion.is('element')) {
      console.log('is accordion', accordion);
      return accordion;
    }
    return null;
  }
}

export function getSelectedAccordionWidget(selection) {
  const viewElement = selection.getSelectedElement();

  if (viewElement && isAccordionWidget(viewElement)) {
    return viewElement;
  }

  return null;
}

export function isAccordionWidget(element) {
  // console.log(element.hasClass('ckeditor5-uw-bootstrap-accordion__widget'));
  console.log('checking for isAccordionWidget');
  // return element.hasClass('ckeditor5-uw-bootstrap-accordion__widget');
  return element.hasClass('accordion');
}
// export function getSelectedAccordionWidget(
//   selection: ViewDocumentSelection
// ): ViewElement | null {
//   const accordion = selection.focus
//     ?.getAncestors()
//     .reverse()
//     .find((node) => node.is('element') && isAccordionWidget(node));
//   return accordion?.is('element') ? accordion : null;
// }
/*
 * Returns selected link text content.
 * If link is not selected it returns the selected text.
 * If selection or link includes non text node (inline object or block) then returns undefined.
 */
export function _getSelectedAccordionModelElement(model, modelName) {
  const selection = model.document.selection;
  const foundElements = [];
  for (const range of selection.getRanges()) {
    for (const item of range.getItems()) {
      if (
        // item.is('element')
        item.is('element') &&
        item.name === modelName
      ) {
        foundElements.push(item);
      }
    }
  }

  return foundElements[0];
}

/**
 * Checks if a given view element is an accordion widget.
 *
 * @internal
 */
// export function isAccordionWidget(viewNode) {
//   console.log(viewNode.getClassNames());
//   return (
//     viewNode.is('element') &&
//     // viewNode.getCustomProperty('div') &&
//     viewNode.getClassNames().filter('accordion') &&
//     isWidget(viewNode)
//   );
// }

/**
 * Returns an accordion widget editing view element if one is among the selection's ancestors.
 *
 * @internal
 */
export function getAccordionWidgetAncestor(selection) {
  const selectionPosition = selection.getFirstPosition();

  if (!selectionPosition) {
    return null;
  }

  let parent = selectionPosition.parent;

  while (parent) {
    if (parent.is('element') && isAccordionWidget(parent)) {
      return parent;
    }

    parent = parent.parent;
  }

  return null;
}

// export function getSelectedAccordionWidget(selection) {
//   const viewElement = selection.getSelectedElement();

//   if (viewElement && isAccordionWidget(viewElement)) {
//     return viewElement;
//   }

//   return null;
// }

export function getSelectionAffectedAccordionWidget(selection) {
  const selectedAccordion = getSelectedAccordionWidget(selection);

  if (selectedAccordion) {
    return selectedAccordion;
  }

  return getAccordionWidgetAncestor(selection);
}

/*
 * Returns the positioning options that control the geometry of the
 * {@link module:ui/panel/balloon/contextualballoon~ContextualBalloon contextual balloon} with respect
 * to the selected table in the editor content.
 *
 * @param editor The editor instance.
 */
export function getBalloonAccordionPositionData(editor) {
  const selection = editor.model.document.selection;
  const modelAccordion = getSelectionAffectedAccordionWidget(selection);
  const viewAccordion = editor.editing.mapper.toViewElement(modelAccordion);

  return {
    target: editor.editing.view.domConverter.mapViewToDom(viewAccordion),
    positions: BALLOON_POSITIONS,
  };
}

const BALLOON_POSITIONS = (() => [
  BalloonPanelView.defaultPositions.northArrowSouth,
  BalloonPanelView.defaultPositions.northArrowSouthWest,
  BalloonPanelView.defaultPositions.northArrowSouthEast,
  BalloonPanelView.defaultPositions.southArrowNorth,
  BalloonPanelView.defaultPositions.southArrowNorthWest,
  BalloonPanelView.defaultPositions.southArrowNorthEast,
  BalloonPanelView.defaultPositions.viewportStickyNorth,
])();

/**
 * Finds a closest element of a model name in a given selection.
 *
 * @param {module:engine/model/selection~Selection} modelSelection
 *   Model selection.
 *
 * @param {string} modelName
 *   Model name of a searched element.
 *
 * @returns {module:engine/model/element~Element}
 *   Found element.
 */
export function findElement(modelSelection, modelName) {
  const selectedElement = modelSelection.getSelectedElement();
  if (selectedElement && selectedElement.name == modelName) {
    return selectedElement;
  } else {
    return modelSelection
      .getFirstRange()
      .getCommonAncestor()
      .findAncestor(modelName);
    // if (foundAncestor) {
    //   console.log('FOUND IT ancestor', foundAncestor);
    //   return foundAncestor;
    // }
    // console.log('looking for child');
    // const foundChild = modelSelection.getSelectedElement();
    // // .getChild(1)
    // // .find((item) => item.name === modelName);
    // console.log('FOUND IT child', foundChild);
    // return foundChild;
  }
}

export function repositionContextualBalloon(editor, target) {
  const balloon = editor.plugins.get('ContextualBalloon');
  const selection = editor.editing.view.document.selection;
  let position;
  console.log('reposition');
  return;
}
