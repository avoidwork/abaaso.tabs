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
 * @version 1.2
 */
(function(a){"use strict";var b=function(){var b=a[abaaso.aliased],c,d;return d=function(a){var c=a.explode("/"),d=[];return b("ul.tab a.active").removeClass("active"),b(".tab").addClass("hidden"),b(".root").removeClass("hidden"),c.first()==="#!"&&c.shift(),c.each(function(a){d.concat(b('ul.tab a[data-hash="'+a+'"]').addClass("active")),b('.tab[data-hash="'+a+'"]').removeClass("hidden")}),d},c=function(a,c,d,e,f){var f=!0,g,h,i,j,k,l,m,n;d instanceof Object?d["class"]="tab":d={"class":"tab"},e=typeof e=="undefined"?"":e,k=c instanceof Array,g=a.create("ul",d),l=a.create("section",{"class":"tab"}),f=typeof f=="undefined"||f===!0;switch(!0){case!e.isEmpty():n=e.replace(/^\/{1,1}/,""),g.update({"data-hash":n}),l.update({"data-hash":n});break;case e.isEmpty():g.addClass("root"),l.addClass("root")}for(i in c)(function(){var a=i,d,n,o,p;if(!c.hasOwnProperty(a))return;j=k?c[parseInt(a)]:a,h=e+"/"+j.toLowerCase(),d=h.replace(/^\/{1,1}/,""),m=!k&&typeof c[j]=="function"?c[j]:function(){void 0},b.route.set(d,m),g.create("li").create("a",{href:"#!"+h,"data-hash":j.toLowerCase()}).html(j);switch(!0){case String(c[a]).isEmpty():case typeof c[a]=="function":case c[a]===null:l.create("section",{"class":"tab hidden","data-hash":d});break;case typeof c[a]=="object":p=c[k?parseInt(a):a],l.tabs(p,null,h,f),n=b('section[data-hash="'+d+'"]');for(o in p){if(!p.hasOwnProperty(o))continue;p instanceof Array&&(o=p[parseInt(o)].toLowerCase()),n.create("div",{"class":"tab hidden","data-hash":o})}}})();return a},b.on("hash",function(a){d(a)},"tabs"),Element.prototype.tabs=function(a,b,d,e){return c(this,a,b,d,e)},{active:d,create:c}},c=function(){abaaso.module("tabs",b())};typeof define=="function"?define("abaaso.tabs",["abaaso","abaaso.route"],c):abaaso.on("init",c,"abaaso.tabs")})(window)