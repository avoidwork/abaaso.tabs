/**
 * abaaso.tabs
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright Jason Mulligan 2012
 * @license BSD-3 <http://opensource.org/licenses/BSD-3-Clause>
 * @link https://github.com/avoidwork/abaaso.tabs
 * @module abaaso.tabs
 * @version 1.4.3
 */

(function (global) {

var $;

/**
 * Sets "active" class on tabs based on hash parsing
 * 
 * @param  {String} arg Hash delimited by "/"
 * @return {Array} Tabs that received "active"
 */
var active = function (arg) {
	var hash = arg.explode("/"),
	    tabs = [],
	    prev = "",
	    a, u, s;

	// Hiding tab Elements
	$(".tab .active").removeClass("active");
	$(".tab").addClass("hidden");
	$(".root").removeClass("hidden");

	if (hash.first() === "#!") hash.shift();

	// Setting the route path active & visible
	hash.each(function (i) {
		a = "a[data-hash=\"" + i + "\"]";
		u = "ul.tab[data-hash=\"" + i + "\"]";
		s = "section.tab[data-hash=\"" + i + "\"]";

		// Prepending parent selector
		a = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + a;
		u = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + u;
		s = (prev !== "" ? "section.active[data-hash=\"" + prev + "\"] " : ".root ") + s;

		// Setting classes
		tabs.concat($(a).addClass("active"));
		$(u).removeClass("hidden").addClass("active");
		$(s).removeClass("hidden").addClass("active");

		// Tracking
		prev = i;
	});

	return tabs;
};

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
		fn   = typeof i === "function" ? i : function () { void 0; };

		$.route.set(h, fn);

		// Creating anchor
		anchor = obj.create("li").create("a", {"data-hash": item.hyphenate().toLowerCase(), "data-route": hash}).html(item);

		// Setting click listener, not tied to route to keep concerns seperate
		anchor.on("click", function (e) {
			if (!this.hasClass("disabled")) location.hash = "!" + this.data("route");
		}, "route", anchor, "all");

		// Creating tab or collection
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

/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function () {
	// hashbang hook
	abaaso.on("hash", function (hash) {
		this.active(hash);
	}, "tabs", abaaso.tabs, "all");

	// Hooking into the prototype
	$.property(Element.prototype, "tabs", {
		value: function (children, args, route, first) {
			return create(this, children, args, route, first);
		}
	});

	// IE8 only
	if (typeof HTMLDocument !== "undefined") $.property(HTMLDocument.prototype, "tabs", {
		value: function (children, args, route, first) {
			return create(this, children, args, route, first);
		}
	});
};

// AMD or classic
if (typeof define === "function") {
	define(["abaaso"], function (abaaso) {
		$ = global[abaaso.aliased];
		return init();
	});
}
else abaaso.on("init", function () {
	$ = global[abaaso.aliased];
	init();
}, "abaaso.tabs");
})(this);
