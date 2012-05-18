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
 * @requires abaaso 1.9.9
 * @requires abaaso.route 1.3
 * @version 1.3.6
 */
(function(a){"use strict";var b=function(a){var b,c;return c=function(b){var c=b.explode("/"),d=[],e="",f,g,h;return a(".active").removeClass("active"),a(".tab").addClass("hidden"),a(".root").removeClass("hidden"),c.first()==="#!"&&c.shift(),c.each(function(b){f='a[data-hash="'+b+'"]',g='ul.tab[data-hash="'+b+'"]',h='section.tab[data-hash="'+b+'"]',f=(e!==""?'ul.active[data-hash="'+e+'"] ':".root ")+f,g=(e!==""?'ul.active[data-hash="'+e+'"] ':".root ")+g,h=(e!==""?'section.active[data-hash="'+e+'"] ':".root ")+h,d.concat(a(f).addClass("active")),a(g).removeClass("hidden").addClass("active"),a(h).removeClass("hidden").addClass("active"),e=b}),d},b=function(b,c,d,e,f){var g,h,i,j,k,l,m,n;d instanceof Object?d["class"]="tab":d={"class":"tab"},e=typeof e=="undefined"?"":e,k=c instanceof Array,g=b.create("ul",d),l=b.create("section",{"class":"tab"}),f=typeof f=="undefined"||f===!0;switch(!0){case!e.isEmpty():n=e.replace(/^\/{1,1}/,""),g.attr("data-hash",n),l.attr("data-hash",n);break;case e.isEmpty():g.addClass("root"),l.addClass("root")}return m=function(b,c){var d,i,n;j=k?b:c,h=e+"/"+j.hyphenate().toLowerCase(),d=h.replace(/^\/{1,1}/,""),m=typeof b=="function"?b:function(){void 0},a.route.set(d,m),g.create("li").create("a",{href:"#!"+h,"data-hash":j.hyphenate().toLowerCase()}).html(j);switch(!0){case/function|string/.test(typeof b):case b===null:l.create("section",{"class":"tab hidden","data-hash":d});break;case typeof b=="object":l.tabs(b,null,h,f),i=a('section[data-hash="'+d+'"]'),typeof i!="undefined"&&b.each(function(a,b){var c=typeof a=="object"?b:a;i.create("section",{"class":"tab hidden","data-hash":c.toLowerCase()})})}},c instanceof Array?c.each(m):a.iterate(c,m),b},a.on("hash",function(a){c(a)},"tabs"),Element.prototype.tabs=function(a,c,d,e){return b(this,a,c,d,e)},a.client.ie&&a.client.version===8&&(HTMLDocument.prototype.tabs=function(a,c,d,e){return b(this,a,c,d,e)}),{active:c,create:b}},c=function(c){return c.module("tabs",b(a[c.aliased])),c.tabs};typeof define=="function"?define("abaaso.tabs",["abaaso","abaaso.route"],function(b){return c(a[b.aliased])}):abaaso.on("init",function(){c(a[abaaso.aliased])},"abaaso.tabs")})(this)