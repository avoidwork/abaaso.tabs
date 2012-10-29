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
