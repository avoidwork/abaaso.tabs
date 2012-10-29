/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function () {
	abaaso.on("hash", function (hash) { this.active(hash); }, "tabs", abaaso.tabs, "all");
	$.property(Element.prototype, "tabs", {value: function (children, args, route, first) { return create(this, children, args, route, first); }});
	if (typeof HTMLDocument !== "undefined") $.property(HTMLDocument.prototype, "tabs", {value: function (children, args, route, first) { return create(this, children, args, route, first); }});
};
