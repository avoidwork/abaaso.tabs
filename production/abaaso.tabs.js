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
 * @requires abaaso 2.7.0
 * @version 1.4.1
 */
(function(e){"use strict";var t,n;t=function(e){var t,n;return n=function(t){var n=t.explode("/"),r=[],i="",s,o,u;return e(".tab .active").removeClass("active"),e(".tab").addClass("hidden"),e(".root").removeClass("hidden"),n.first()==="#!"&&n.shift(),n.each(function(t){s='a[data-hash="'+t+'"]',o='ul.tab[data-hash="'+t+'"]',u='section.tab[data-hash="'+t+'"]',s=(i!==""?'ul.active[data-hash="'+i+'"] ':".root ")+s,o=(i!==""?'ul.active[data-hash="'+i+'"] ':".root ")+o,u=(i!==""?'section.active[data-hash="'+i+'"] ':".root ")+u,r.concat(e(s).addClass("active")),e(o).removeClass("hidden").addClass("active"),e(u).removeClass("hidden").addClass("active"),i=t}),r},t=function(t,n,r,i,s){var o=/function|string/,u,a,f,l,c,h,p,d;r instanceof Object?r["class"]="tab":r={"class":"tab"},i=typeof i=="undefined"?"":i,c=n instanceof Array,u=t.create("ul",r),h=t.create("section",{"class":"tab"}),s=typeof s=="undefined"||s===!0;switch(!0){case!i.isEmpty():d=i.replace(/^\/{1,1}/,""),u.data("hash",d),h.data("hash",d);break;case i.isEmpty():u.addClass("root"),h.addClass("root")}return p=function(t,n){var r,f,d,v;l=c?t:n,a=i+"/"+l.hyphenate().toLowerCase(),r=a.replace(/^\//,""),p=typeof t=="function"?t:function(){void 0},e.route.set(r,p),v=u.create("li").create("a",{"data-hash":l.hyphenate().toLowerCase(),"data-route":a}).html(l),v.on("click",function(e){this.hasClass("disabled")||(location.hash="!"+this.data("route"))},"route",v,"all");switch(!0){case o.test(typeof t):case t===null:h.create("section",{"class":"tab hidden","data-hash":r});break;case typeof t=="object":h.tabs(t,null,a,s),f=e('section[data-hash="'+r+'"]'),typeof f!="undefined"&&t.each(function(e,t){var n=typeof e=="object"?t:e;f.create("section",{"class":"tab hidden","data-hash":n.toLowerCase()})})}},n instanceof Array?n.each(p):e.iterate(n,p),t},e.property(Element.prototype,"tabs",{value:function(e,n,r,i){return t(this,e,n,r,i)}}),e.client.ie&&e.client.version===8&&e.property(HTMLDocument.prototype,"tabs",{value:function(e,n,r,i){return t(this,e,n,r,i)}}),{active:n,create:t}},n=function(n){return n.module("tabs",t(e[n.aliased])),n.on("hash",function(e){this.active(e)},"tabs",n.tabs,"all"),n.tabs},typeof define=="function"?define(["abaaso"],function(t){return n(e[t.aliased])}):abaaso.on("init",function(){n(e[abaaso.aliased])},"abaaso.tabs")})(this)