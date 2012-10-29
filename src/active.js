/**
 * Sets "active" class on tabs based on hash parsing
 * 
 * @param  {String} arg Hash delimited by "/"
 * @return {Array} Tabs that received "active"
 */
var active = function (arg) {
	var hash = arg.explode("/"),
	    tabs = [],
	    prev = "",
	    a, u, s;

	// Hiding tab Elements
	$(".tab .active").removeClass("active");
	$(".tab").addClass("hidden");
	$(".root").removeClass("hidden");

	if (hash.first() === "#!") hash.shift();

	// Setting the route path active & visible
	hash.each(function (i) {
		a = "a[data-hash=\"" + i + "\"]";
		u = "ul.tab[data-hash=\"" + i + "\"]";
		s = "section.tab[data-hash=\"" + i + "\"]";

		// Prepending parent selector
		a = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + a;
		u = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + u;
		s = (prev !== "" ? "section.active[data-hash=\"" + prev + "\"] " : ".root ") + s;

		// Setting classes
		tabs.concat($(a).addClass("active"));
		$(u).removeClass("hidden").addClass("active");
		$(s).removeClass("hidden").addClass("active");

		// Tracking
		prev = i;
	});

	return tabs;
};
