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
 * @requires abaaso 1.8
 * @requires abaaso.route
 * @version 1.0
 * @todo  correct redraw of children when they're nested and revisited
 */
(function(a){"use strict";var b=function(){var b=a[abaaso.aliased],c,d;return d=function(a){var c=a.explode("/"),d=[];return b(".tabs a.active").removeClass("active"),c.first()==="#!"&&c.shift(),c.each(function(a){d.concat(b('.tabs a[data-hash="'+a+'"]').addClass("active"))}),d},c=function(a,d,e,f,g){var h=!0,i,j,k,l,m,n,o;e instanceof Object?e["class"]="tabs":e={"class":"tabs"},f=typeof f=="undefined"?"":f,m=d instanceof Array,i=a.create("ul",e),n=a.create("section",{"class":"content"}),h=typeof h=="undefined"||h===!0;for(k in d)(function(){var a=k;if(!d.hasOwnProperty(a))return;l=m?d[parseInt(a)]:a,j=f+"/"+l.toLowerCase(),o=!m&&typeof d[l]=="function"?d[l]:function(){n.get(j)},b.route.set(j.replace(/^\/{1,1}/,""),o),i.create("li").create("a",{href:"#!"+j,"data-hash":l.toLowerCase()}).html(l),typeof d[a]=="object"&&(h?n.tabs(d[m?parseInt(a):a],null,j):c(d[m?parseInt(a):a],null,j,!1))})();return a},b.on("hash",function(a){d(a)},"tabs"),Element.prototype.tabs=function(a,b,d){return c(this,a,b,d)},{active:d,create:c}},c=function(){abaaso.module("tabs",b())};typeof define=="function"?define("abaaso.tabs",["abaaso","abaaso.route"],c):abaaso.on("init",c,"abaaso.tabs")})(window)