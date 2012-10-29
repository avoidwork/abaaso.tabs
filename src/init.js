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
