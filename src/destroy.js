/**
 * Removes one or many tabs from an Element
 * 
 * @param  {Object} obj Element containing the tab(s)
 * @param  {Mixed}  arg Array of routes or route to destroy, e.g. "/blog"
 * @return {Object}     Element which contained the tab(s)
 */
var destroy = function (obj, arg) {
	if (!(obj instanceof Element) || typeof arg === "undefined") throw Error($.label.error.invalidArguments);

	if (!(arg instanceof Array)) arg = String(arg).explode();

	// Removing tab(s) if found
	arg.each(function (i) {
		var root = false,
		    li, section;

		i = i.toLowerCase().replace(/^\/{1,1}/, "");
		i = "/" + i;

		li      = obj.find("a[data-route=\"" + i + "\"]")[0].parentNode;
		section = li.parentNode.parentNode.find("section[data-hash=\"" + i + "\"]")[0];

		li.destroy();
		section.destroy();

		// Loading initial route if the current one was just destroyed
		if ($.route.hash() === i) $.route.hash($.route.initial);
	});

	return obj;
};
