# abaaso.tabs
abaaso.tabs is an HTML5 module that makes creating UI tabs with hash routing extremely easy!

If you do not provide routing listeners when creating tabs, stubs will be set in their place. This is done so application states are not impacted.

##### How do you identify which pair of UL & Section Elements belong to which tab/route?
Each pair has a "data-hash" property set to the route endpoint it belongs to.

## Sample
$("#stage").tabs({User : ["Details", "Projects", "Files", "Folders", "Links", "Versions", "Subscriptions"], Organization : null});

## Syntax
#### $.tabs.create($("#target"), ["Tab 1", "Tab 2"])
Creates a tab element structure in #target with implicit routing handlers

#### $.tabs.create($("#target"), {"Tab 1": function () {…}, "Tab 2": function () {…}})
Creates a tab element structure in #target with explicit routing handlers

#### $("#target").tabs(…)
Element.prototype is augmented with $.tabs.create()

## CSS Classes
#### .active
Identifies "active" tab routing.

#### .content
Identifies Section Elements which hold tab content.

#### .hidden
Hides inactive tab Elements; this should set "display:none;".

#### .tab
Identifies UL Elements that hold tab LI Elements.

## Information
#### License
abaaso.route is licensed under BSD-3 http://www.opensource.org/licenses/BSD-3-Clause

#### Copyright
Copyright (c) 2012, Jason Mulligan <jason.mulligan@avoidwork.com>