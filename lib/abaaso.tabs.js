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
	    x, xb;

	// Hiding tab Elements
	$(".tab .active").removeClass("active");
	$(".tab").addClass("hidden");
	$(".root").removeClass("hidden");

	if (hash.first() === "#!") hash.shift();

	// Setting the route path active & visible
	hash.each(function (i) {
		x  = "a[data-hash=\"" + i + "\"]";
		xb = ".tab[data-hash=\"" + i + "\"]";

		x  = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + x;
		xb = (prev !== "" ? ".tab[data-hash=\"" + prev + "\"] " : ".root ") + xb
		
		$(x).addClass("active");
		$(xb).addClass("active").removeClass("hidden");

		// Tracking
		prev = i;
	});

	// Displaying first nested tab
	$(x + " section.active > section.tab:first-child").addClass("active");
	$(xb + " section.active > section.tab:first-child").addClass("active").removeClass("hidden");

	// Displaying the active route (if nested)
	if (!prev.isEmpty()) $("section[data-hash=\"" + hash.join("/") + "\"]").addClass("active").removeClass("hidden");

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
	obj     = target.find(" > ul.tab").length > 0 ? target.find(" > ul.tab")[0] : target.create("ul", args);
	section = target.find(" > section.tab").length > 0 ? target.find(" > section.tab")[0] : target.create("section", {"class": "tab"});
	first   = (typeof first === "undefined" || first === true);

	if (target.hasClass("tab")) route = "/" + target.data("hash");

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
		       }, "route", anchor, "all")
		      .on("delete", function (arg) {
		       		$.route.del(h);
		      });

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
 * Removes one or many tabs from an Element
 * 
 * @param  {Object} obj Element containing the tab(s)
 * @param  {Mixed}  arg Array of routes or route to destroy, e.g. "/blog"
 * @return {Object}     Element which contained the tab(s)
 */
var destroy = function (obj, arg) {
	if (!(obj instanceof Element) || typeof arg === "undefined") throw Error($.label.error.invalidArguments);

	if (!(arg instanceof Array)) arg = String(arg).explode();

	// Removing tab(s) if found
	arg.each(function (i) {
		var root = false,
		    li, section;

		i  = i.toLowerCase().replace(/^\/{1,1}/, "");
		i  = "/" + i;
		li = obj.find("a[data-route=\"" + i + "\"]")[0].parentNode;

		if (typeof li !== "undefined") {
			section = li.parentNode.parentNode.find("section[data-hash=\"" + i + "\"]")[0];
			section.destroy();
			li.destroy();
		}

		// Loading initial route if the current one was just destroyed
		if ($.route.hash() === i) $.route.hash($.route.initial);
	});

	return obj;
};

/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function (abaaso) {
	var instance = {},
	    add      = "tabs",
	    remove   = "unTabs",
	    fnAdd, fnRemove;

	// Setting reference
	$ = global[abaaso.aliased];

	// create() facade
	fnAdd = function (children, args, route, first) {
		return create(this, children, args, route, first);
	};

	// destroy() facade
	fnRemove = function (arg) {
		return destroy(this, arg);
	};

	// hashbang hook
	abaaso.on("hash", function (hash) {
		active(hash);
	}, "tabs", abaaso, "all");

	// `create` hook
	$.property(Element.prototype, add, {value: fnAdd});
	if (typeof HTMLDocument !== "undefined") $.property(HTMLDocument.prototype, add, {value: fnAdd});

	// `destroy` hook
	$.property(Element.prototype, remove, {value: fnRemove});
	if (typeof HTMLDocument !== "undefined") $.property(HTMLDocument.prototype, remove, {value: fnRemove});

	instance = {
		active  : active,
		create  : create,
		destroy : destroy
	};

	return abaaso.module("tabs", instance);
};

// AMD or classic
typeof define === "function" ? define(["abaaso"], function (abaaso) { return init(abaaso); })
                             : abaaso.on("init", function () { init(abaaso); }, "abaaso.tabs");
})(this);
