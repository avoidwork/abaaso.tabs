# abaaso.tabs
abaaso.tabs makes creating UI tabs with hash routing extremely easy!

#### tabs.create($("#target"), ["Tab 1", "Tab 2"])
Creates a tab element structure in #target with implicit routing handlers (remember to set the before allowing the User to interact with the tabs!).

#### tabs.create($("#target"), {"Tab 1": function(){}, "Tab 2": function(){})
Creates a tab element structure in #target with explicit routing handlers

#### $("#target").tabs(…)
Element.prototype is agumented with $.tabs.create()

#### License
abaaso.route is licensed under BSD-3 http://www.opensource.org/licenses/BSD-3-Clause

#### Copyright
Copyright (c) 2012, Jason Mulligan <jason.mulligan@avoidwork.com>