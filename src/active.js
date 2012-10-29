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
	    a, u, s, x, xb;

	// Hiding tab Elements
	$(".tab .active").removeClass("active");
	$(".tab").addClass("hidden");
	$(".root").removeClass("hidden");

	if (hash.first() === "#!") hash.shift();

	// Setting the route path active & visible
	hash.each(function (i) {
		/*a = "a[data-hash=\"" + i + "\"]";
		u = "ul.tab[data-hash=\"" + i + "\"]";
		s = "section.tab[data-hash=\"" + i + "\"]";

		// Prepending parent selector
		a = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + a;
		u = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + u;
		s = (prev !== "" ? "section.active[data-hash=\"" + prev + "\"] " : ".root ") + s;
		 */
		
		x  = "a[data-hash=\"" + i + "\"]";
		//x  = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + x;
		xb = (prev !== "" ? ".tab[data-hash=\"" + prev + "\"] " : ".root ") + x;

		// Setting classes
		//tabs.concat($(a).addClass("active"));
		//$(u + ", " + s).removeClass("hidden").addClass("active");
		//
		
		$(x).addClass("active");
		$(xb).addClass("active").removeClass("hidden")

		// Tracking
		prev = i;
	});

	return tabs;
};
