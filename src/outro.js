
if (typeof define === "function") {
	define(["abaaso"], function (abaaso) { return fn(global[abaaso.aliased]); });
}
else abaaso.on("init", function () { fn(global[abaaso.aliased]); }, "abaaso.tabs");


})(this);
