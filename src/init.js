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
