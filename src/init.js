/**
 * Initializes the module
 * 
 * @return {Undefined} undefined
 */
var init = function () {
	var module = {},
	    add    = "tabs",
	    remove = "unTabs",
	    fnAdd, fnRemove;

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
	}, "tabs", $, "all" );

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

	return $.module( "tabs", module );
};
