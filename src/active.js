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
	    x, xb;

	// Hiding tab Elements
	$(".tab .active").removeClass("active");
	$(".tab").addClass("hidden");
	$(".root").removeClass("hidden");

	if (hash.first() === "#!") hash.shift();

	// Setting the route path active & visible
	hash.each(function (i) {
		x  = "a[data-hash=\"" + i + "\"]";
		xb = ".tab[data-hash=\"" + i + "\"]";

		x  = (prev !== "" ? "ul.active[data-hash=\"" + prev + "\"] " : ".root ") + x;
		xb = (prev !== "" ? ".tab[data-hash=\"" + prev + "\"] " : ".root ") + xb
		
		$(x).addClass("active");
		$(xb).addClass("active").removeClass("hidden");

		// Tracking
		prev = i;
	});

	$(x + "section.active > section.tab:first-child").addClass("active");
	$(xb + "section.active > section.tab:first-child").addClass("active").removeClass("hidden");

	if (!prev.isEmpty()) $("section[data-hash=\"" + hash.join("/") + "\"]").addClass("active").removeClass("hidden");

	return tabs;
};
