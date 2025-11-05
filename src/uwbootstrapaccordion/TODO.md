# Todos:
* Collapse for accoridon item. Make switch read in something and make save execute do what it needs to.
* New accordion should get id like "#accordion-N". Make this work similar to accordionItemId getting created on insert.
* When accordion id changes via form, the children need to have their collapse attribute change for data-parent.
* When accordion item id changes via the form, the derivative attributes need to change as well.
* Allow AccordionItem model to track open/closed and an id for each item
* Balloon position for accordion properties form.
* Draggable accordion items (how? are schema rules preventing this currently).
* Balloon form accessibility/tabability.
* Clean utils file.
* Review naming conventions everywhere (variables, model, function names). Sometimes I shortened and not sure what best practice is.

# Completed
* Allow insertion of AccordionItem
* Figure out ClipboardPipeline to enable drag and drop of entire accordion.
* Figure out enable placeholder text for each element we need it for data-placeholder
* Add style setting in properties balloon for the accordion title style
* Accept input from user for accordion id, uppercase/sentencecase/nonbold
* Turn off editing view for accessible title (it'll only be in the properties balloon)
* Figure out what bootstrap provides by default related to ids, aria, data-toggle, etc.
