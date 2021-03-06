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
