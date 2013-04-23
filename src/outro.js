// AMD or classic
if ( typeof define === "function" ) {
	define(["abaaso"], function ( abaaso ) {
		$ = abaaso;
		return init();
	});
}
else {
	$ = abaaso;
	$.ready ? init() : $.on( "init", function () { init(); }, "abaaso.tabs" );
}
})();
