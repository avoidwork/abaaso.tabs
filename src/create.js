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
