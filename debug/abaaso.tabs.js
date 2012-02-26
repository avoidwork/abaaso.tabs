/**
 * Copyright (c) 2012, Jason Mulligan <jason.mulligan@avoidwork.com>
 * All rights reserved.
 *
 * Redistribution and use in source and binary forms, with or without
 * modification, are permitted provided that the following conditions are met:
 *     * Redistributions of source code must retain the above copyright
 *       notice, this list of conditions and the following disclaimer.
 *     * Redistributions in binary form must reproduce the above copyright
 *       notice, this list of conditions and the following disclaimer in the
 *       documentation and/or other materials provided with the distribution.
 *     * Neither the name of abaaso.tabs nor the
 *       names of its contributors may be used to endorse or promote products
 *       derived from this software without specific prior written permission.
 *
 * THIS SOFTWARE IS PROVIDED BY THE COPYRIGHT HOLDERS AND CONTRIBUTORS "AS IS" AND
 * ANY EXPRESS OR IMPLIED WARRANTIES, INCLUDING, BUT NOT LIMITED TO, THE IMPLIED
 * WARRANTIES OF MERCHANTABILITY AND FITNESS FOR A PARTICULAR PURPOSE ARE
 * DISCLAIMED. IN NO EVENT SHALL JASON MULLIGAN BE LIABLE FOR ANY
 * DIRECT, INDIRECT, INCIDENTAL, SPECIAL, EXEMPLARY, OR CONSEQUENTIAL DAMAGES
 * (INCLUDING, BUT NOT LIMITED TO, PROCUREMENT OF SUBSTITUTE GOODS OR SERVICES;
 * LOSS OF USE, DATA, OR PROFITS; OR BUSINESS INTERRUPTION) HOWEVER CAUSED AND
 * ON ANY THEORY OF LIABILITY, WHETHER IN CONTRACT, STRICT LIABILITY, OR TORT
 * (INCLUDING NEGLIGENCE OR OTHERWISE) ARISING IN ANY WAY OUT OF THE USE OF THIS
 * SOFTWARE, EVEN IF ADVISED OF THE POSSIBILITY OF SUCH DAMAGE.
 */

/**
 * abaaso.tabs
 * 
 * UI tabs module
 *
 * @author Jason Mulligan <jason.mulligan@avoidwork.com>
 * @link http://avoidwork.com
 * @requires abaaso 1.9
 * @requires abaaso.route
 * @version 1.3
 */
(function (window) {
	"use strict";

	var tabs = (function () {
		var $ = window[abaaso.aliased],
		    create, active;

		/**
		 * Sets "active" class on tabs based on hash parsing
		 * 
		 * @param  {String} arg Hash delimited by "/"
		 * @return {Array} Tabs that received "active"
		 */
		active = function (arg) {
			var hash = arg.explode("/"),
			    tabs = [],
			    prev = "",
			    a, u, s;

			// Hiding tab Elements
			$(".active").removeClass("active");
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

		/**
		 * Add a tab widget to a target Element
		 * 
		 * @param  {Object} target   Element to receive the tabs
		 * @param  {Object} children Tabs to add to this widget
		 * @param  {Object} args     Properties to set on the tabs
		 * @param  {String} route    URI route to prepend
		 * @return {Object} Element
		 */
		create = function (target, children, args, route, first) {
			var obj, hash, x, item, array, section, fn, dhash;

			args instanceof Object ? args["class"] = "tab" : args = {"class": "tab"};

			route   = typeof route === "undefined" ? "" : route;
			array   = (children instanceof Array);
			obj     = target.create("ul", args);
			section = target.create("section", {"class": "tab"});
			first   = (typeof first === "undefined" || first === true);

			switch (true) {
				case !route.isEmpty():
					dhash = route.replace(/^\/{1,1}/, "");
					obj.update({"data-hash": dhash});
					section.update({"data-hash": dhash});
					break;
				case route.isEmpty():
					obj.addClass("root");
					section.addClass("root");
					break;
			}

			children.each(function (i, k) {
				var h, w, y;

				item = array ? i : k;
				hash = route + "/" + item.toLowerCase();
				h    = hash.replace(/^\/{1,1}/, "");
				fn   = typeof i === "function" ? i : function () { void(0); };

				$.route.set(h, fn);
				obj.create("li").create("a", {href: "#!" + hash, "data-hash": item.toLowerCase()}).html(item);
				switch (true) {
					case (/function|string/.test(typeof i)):
					case i === null:
						section.create("section", {"class": "tab hidden", "data-hash": h});
						break;
					case typeof i === "object":
						section.tabs(i, null, hash, first);
						w = $("section[data-hash=\"" + h + "\"]");
						i.each(function (e, f) {
							var x = typeof e === "object" ? f : e;
							w.create("section", {"class": "tab hidden", "data-hash": x.toLowerCase()});
						});
						break;
				}
			});

			return target;
		};

		// Setting "active" tab class based on hash parsing
		$.on("hash", function (hash) { active(hash); }, "tabs");

		// Hooking into prototype chain
		Element.prototype.tabs = function (children, args, route, first) { return create(this, children, args, route, first); };

		// @constructor
		return {
			active : active,
			create : create
		};
	}),
	fn = function () { abaaso.module("tabs", tabs()); };

	// AMD support
	typeof define === "function" ? define("abaaso.tabs", ["abaaso", "abaaso.route"], fn) : abaaso.on("init", fn, "abaaso.tabs");
})(window);