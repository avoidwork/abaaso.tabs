// AMD or classic
if ( typeof define === "function" ) {
	define( ["abaaso"], function ( abaaso ) {
		return init( abaaso );
	});
}
else {
	!abaaso.ready ? abaaso.on( "init", function () { init( abaaso ); }, "abaaso.tabs" ) : init ( abaaso );
}
})( this );
