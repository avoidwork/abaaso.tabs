/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function (abaaso) {
	var instance = {};

	$ = global[abaaso.aliased];

	// hashbang hook
	abaaso.on("hash", function (hash) {
		active(hash);
	}, "tabs", abaaso, "all");

	// Hooking into the prototype
	$.property(Element.prototype, "tab", {
		value: function (route) {
			return create(this, {}, args, route, first);
		}
	});

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

	instance = {
		active : active,
		create : create
	};

	return abaaso.module("tabs", instance);
};
