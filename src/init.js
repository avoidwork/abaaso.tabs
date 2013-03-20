/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function ( abaaso ) {
	var module = {},
	    add    = "tabs",
	    remove = "unTabs",
	    fnAdd, fnRemove;

	// Setting reference
	$ = global[abaaso.aliased];

	// create() facade
	fnAdd = function ( children, args, route ) {
		return create( this, children, args, route );
	};

	// destroy() facade
	fnRemove = function ( arg ) {
		return destroy( this, arg );
	};

	// hashbang hook
	$.on( "hash", function ( hash ) {
		active( hash );
	}, "tabs", abaaso, "all" );

	// Prototype hooks
	$.property( Element.prototype, add,    {value: fnAdd} );
	$.property( Element.prototype, remove, {value: fnRemove} );

	if ( typeof HTMLDocument !== "undefined" ) {
		$.property( HTMLDocument.prototype, add,    {value: fnAdd} );
		$.property( HTMLDocument.prototype, remove, {value: fnRemove} );
	}

	module = {
		active  : active,
		create  : create,
		destroy : destroy
	};

	return abaaso.module( "tabs", module );
};
