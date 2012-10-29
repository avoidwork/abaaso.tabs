/**
 * Removes one or many tabs from an Element
 * 
 * @param  {Object} obj Element containing the tab(s)
 * @param  {Mixed}  arg Array of tabs or tab (String) to destroy
 * @return {Object}     Element which contained the tab(s)
 */
var destroy = function (obj, arg) {
	if (!(obj instanceof Element) || typeof arg === "undefined") throw Error($.label.error.invalidArguments);

	if (!(arg instanceof Array)) arg = String(arg).explode();

	// Removing tab(s) if found
	arg.each(function (i) {
		i = i.toLowerCase();
		obj.find("li.data-hash['" + i + "']").destroy();
		obj.find("section.data-hash['" + i + "']").destroy();
	});

	return obj;
};
