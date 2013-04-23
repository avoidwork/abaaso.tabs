/**
 * abaaso.tabs
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @copyright 2013 Jason Mulligan
 * @license BSD-3 <https://raw.github.com/avoidwork/abaaso.tabs/master/LICENSE>
 * @link https://github.com/avoidwork/abaaso.tabs
 * @module abaaso.tabs
 * @version 1.5.1
 */

( function () {
"use strict";

var REGEX_FUNCSTR = /function|string/,
    $;

/**
 * Sets "active" class on tabs based on hash parsing
 * 
 * @param  {String} arg Hash delimited by "/"
 * @return {Array}      Tabs that received "active"
 */
var active = function ( arg ) {
	var hash = arg.explode("/"),
	    tabs = [],
	    prev = "",
	    x, xb;

	// Hiding tab Elements
	$( "ul.tab > li > a.active, section.tab > section.active" ).removeClass( "active" );
	$( ".tab" ).addClass( "hidden" );
	$( ".root" ).removeClass( "hidden" );

	if ( hash[0] === "#!" ) hash.shift();

	// Setting the route path active & visible
	hash.forEach(function (i) {
		x  = "a[data-hash=\"" + i + "\"]";
		xb = ".tab[data-hash=\"" + i + "\"]";

		x  = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + x;
		xb = (prev !== "" ? ".tab[data-hash=\"" + prev + "\"] " : ".root ") + xb
		
		$( x ).addClass( "active" );
		$( xb ).addClass( "active" ).removeClass( "hidden" );

		// Tracking
		prev = i;
	});

	// Displaying first nested tab
	$( x + " section.active > section.tab:first-child" ).addClass( "active" );
	$( xb + " section.active > section.tab:first-child" ).addClass( "active" ).removeClass( "hidden" );

	// Displaying the active route (if nested)
	if ( !prev.isEmpty() ) {
		$( "section[data-hash=\"" + hash.join( "/" ) + "\"]" ).addClass( "active" ).removeClass( "hidden" );
	}

	return tabs;
};

/**
 * Add a tab to an Element
 * 
 * @param  {Object} target   Element to receive the tabs
 * @param  {Object} children Tabs to add to this widget
 * @param  {Object} args     Properties to set on the tabs
 * @param  {String} route    [Optional] URI route to prepend
 * @return {Object}          Element
 */
var create = function ( target, children, args, route ) {
	var obj, hash, x, item, array, section, fn, dhash;

	args instanceof Object ? args["class"] = "tab" : args = {"class": "tab"};

	route   = route || "";
	array   = ( children instanceof Array );
	obj     = target.find( "> ul.tab" ).length > 0 ? target.find( "> ul.tab" )[0] : target.create( "ul", args );
	section = target.find( "> section.tab" ).length > 0 ? target.find( "> section.tab" )[0] : target.create( "section", {"class": "tab"} );

	if ( target.hasClass( "tab" ) ) {
		route = "/" + target.data( "hash" );
	}

	if ( !route.isEmpty() ) {
		dhash = route.replace( /^\/{1,1}/, "" );
		obj.data( "hash", dhash );
		section.data( "hash", dhash );
	}
	else {
		obj.addClass( "root" );
		section.addClass( "root" );
	}

	fn = function ( i, k ) {
		var h, w, y, anchor;

		item = array ? i : k;
		hash = route + "/" + item.hyphenate().toLowerCase();
		h    = hash.replace( /^\//, "" );
		fn   = typeof i === "function" ? i : function () { void 0; };

		$.route.set( h, fn );

		// Creating anchor
		anchor = obj.create( "li" ).create( "a", {"data-hash": item.hyphenate().toLowerCase(), "data-route": hash, innerHTML: item, title: item} );

		// Setting click listener, not tied to route to keep concerns seperate
		anchor.on( "click", function ( e ) {
		       		if ( !this.hasClass( "disabled" ) ) {
		       			location.hash = "!" + this.data( "route" );
		       		}
		       }, "route", anchor, "all" )
		      .on( "delete", function ( e ) {
		       		$.route.del( h );
		       });

		// Creating tab or collection
		switch (true) {
			case REGEX_FUNCSTR.test( typeof i ):
			case i === null:
				section.create( "section", {"class": "tab hidden", "data-hash": h} );
				break;
			case typeof i === "object":
				section.tabs( i, null, hash );
				w = $( "section[data-hash=\"" + h + "\"]" );
				i.forEach( function ( e, f ) {
					var x = typeof e === "object" ? f : e;
					w.create( "section", {"class": "tab hidden", "data-hash": x.toLowerCase()} );
				});
				break;
		}
	};

	children instanceof Array ? children.forEach( fn ) : $.iterate( children, fn );

	return target;
};

/**
 * Removes last tab from an Element (e.g. hit Back button)
 * 
 * @param  {Object} obj Element containing the tab(s)
 * @param  {Mixed}  arg Array of routes or route to destroy, e.g. "/blog"
 * @return {Object}     Element which contained the tab(s)
 */
var destroy = function ( obj, arg ) {
	if ( !( obj instanceof Element ) || arg === undefined ) {
		throw Error( $.label.error.invalidArguments );
	}

	if ( !( arg instanceof Array ) ) {
		arg = arg.toString().explode();
	}

	// Removing tab(s) if found
	arg.forEach( function ( i ) {
		var root = false,
		    li, section;

		if ( i === undefined ) {
			return;
		}
		else {
			i  = i.toLowerCase().replace( /^\/{1,1}/, "" );
			li = obj.find( "a[data-route=\"/" + i + "\"]" ).last().parentNode;

			if ( li !== undefined ) {
				section = li.parentNode.parentNode.find( "section[data-hash=\"" + i + "\"]" ).last();
				section.destroy();
				li.destroy();

				// Loading initial route if the current one was just destroyed
				if ( $.route.hash() === i ) {
					$.route.hash( $.route.initial );
				}
			}
		}
	});

	return obj;
};

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
