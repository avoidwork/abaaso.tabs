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
 * @requires abaaso 2.2.5
 * @requires abaaso.route 1.3.4
 * @version 1.4.0
 */
(function(a){"use strict";var b,c;b=function(a){var b,c;return c=function(b){var c=b.explode("/"),d=[],e="",f,g,h;return a(".tab .active").removeClass("active"),a(".tab").addClass("hidden"),a(".root").removeClass("hidden"),c.first()==="#!"&&c.shift(),c.each(function(b){f='a[data-hash="'+b+'"]',g='ul.tab[data-hash="'+b+'"]',h='section.tab[data-hash="'+b+'"]',f=(e!==""?'ul.active[data-hash="'+e+'"] ':".root ")+f,g=(e!==""?'ul.active[data-hash="'+e+'"] ':".root ")+g,h=(e!==""?'section.active[data-hash="'+e+'"] ':".root ")+h,d.concat(a(f).addClass("active")),a(g).removeClass("hidden").addClass("active"),a(h).removeClass("hidden").addClass("active"),e=b}),d},b=function(b,c,d,e,f){var g=/function|string/,h,i,j,k,l,m,n,o;d instanceof Object?d["class"]="tab":d={"class":"tab"},e=typeof e=="undefined"?"":e,l=c instanceof Array,h=b.create("ul",d),m=b.create("section",{"class":"tab"}),f=typeof f=="undefined"||f===!0;switch(!0){case!e.isEmpty():o=e.replace(/^\/{1,1}/,""),h.data("hash",o),m.data("hash",o);break;case e.isEmpty():h.addClass("root"),m.addClass("root")}return n=function(b,c){var d,j,o,p;k=l?b:c,i=e+"/"+k.hyphenate().toLowerCase(),d=i.replace(/^\//,""),n=typeof b=="function"?b:function(){void 0},a.route.set(d,n),p=h.create("li").create("a",{"data-hash":k.hyphenate().toLowerCase(),"data-route":i}).html(k),p.on("click",function(a){this.hasClass("disabled")||(location.hash="!"+this.data("route"))},"route",p,"all");switch(!0){case g.test(typeof b):case b===null:m.create("section",{"class":"tab hidden","data-hash":d});break;case typeof b=="object":m.tabs(b,null,i,f),j=a('section[data-hash="'+d+'"]'),typeof j!="undefined"&&b.each(function(a,b){var c=typeof a=="object"?b:a;j.create("section",{"class":"tab hidden","data-hash":c.toLowerCase()})})}},c instanceof Array?c.each(n):a.iterate(c,n),b},a.property(Element.prototype,"tabs",{value:function(a,c,d,e){return b(this,a,c,d,e)}}),a.client.ie&&a.client.version===8&&a.property(HTMLDocument.prototype,"tabs",{value:function(a,c,d,e){return b(this,a,c,d,e)}}),{active:c,create:b}},c=function(c){return c.module("tabs",b(a[c.aliased])),c.on("hash",function(a){this.active(a)},"tabs",c.tabs,"all"),c.tabs},typeof define=="function"?define(["abaaso","abaaso.route"],function(b){return c(a[b.aliased])}):abaaso.on("init",function(){c(a[abaaso.aliased])},"abaaso.tabs")})(this)