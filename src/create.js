/**
 * Add a tab widget to a target Element
 * 
 * @param  {Object} target   Element to receive the tabs
 * @param  {Object} children Tabs to add to this widget
 * @param  {Object} args     Properties to set on the tabs
 * @param  {String} route    URI route to prepend
 * @return {Object} Element
 */
var create = function (target, children, args, route, first) {
	var regex = /function|string/,
	    obj, hash, x, item, array, section, fn, dhash;

	args instanceof Object ? args["class"] = "tab" : args = {"class": "tab"};

	route   = typeof route === "undefined" ? "" : route;
	array   = (children instanceof Array);
	obj     = target.create("ul", args);
	section = target.create("section", {"class": "tab"});
	first   = (typeof first === "undefined" || first === true);

	switch (true) {
		case !route.isEmpty():
			dhash = route.replace(/^\/{1,1}/, "");
			obj.data("hash", dhash);
			section.data("hash", dhash);
			break;
		case route.isEmpty():
			obj.addClass("root");
			section.addClass("root");
			break;
	}

	fn = function (i, k) {
		var h, w, y, anchor;

		item = array ? i : k;
		hash = route + "/" + item.hyphenate().toLowerCase();
		h    = hash.replace(/^\//, "");
		fn   = typeof i === "function" ? i : function () { void(0); };

		$.route.set(h, fn);
		anchor = obj.create("li").create("a", {"data-hash": item.hyphenate().toLowerCase(), "data-route": hash}).html(item)
		anchor.on("click", function (e) { if (!this.hasClass("disabled")) location.hash = "!" + this.data("route"); }, "route", anchor, "all");
		switch (true) {
			case regex.test(typeof i):
			case i === null:
				section.create("section", {"class": "tab hidden", "data-hash": h});
				break;
			case typeof i === "object":
				section.tabs(i, null, hash, first);
				w = $("section[data-hash=\"" + h + "\"]");
				if (typeof w !== "undefined") i.each(function (e, f) {
					var x = typeof e === "object" ? f : e;
					w.create("section", {"class": "tab hidden", "data-hash": x.toLowerCase()});
				});
				break;
		}
	};

	children instanceof Array ? children.each(fn) : $.iterate(children, fn);
	return target;
};
