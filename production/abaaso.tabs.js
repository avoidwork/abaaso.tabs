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
 */
(function(a){"use strict";var b=function(){var c=a[abaaso.aliased],d;return d=function(a,d,e,f){var g,h,i,j,k,l,m;e instanceof Object?e["class"]="tabs":e={"class":"tabs"},f=typeof f=="undefined"?"":f,k=d instanceof Array,g=a.create("ul",e),l=a.create("section",{"class":"content"});for(i in d)(function(){var a=i;if(!d.hasOwnProperty(a))return;j=k?d[parseInt(a)]:a,h=f+"/"+j.toLowerCase(),m=!k&&typeof d[j]=="function"?d[j]:function(){l.get(h)},c.route.set(h.replace(/^\/{1,1}/,""),m),typeof a!="object"?g.create("li").create("a",{href:"#!"+h}).html(j):b(g,d[k?parseInt(a):a],null,h)})();return a},Element.prototype.tabs=function(a,b,c){return d(this,a,b,c)},{create:d}},c=function(){abaaso.module("tabs",b())};typeof define=="function"?define("abaaso.tabs",["abaaso","abaaso.route"],c):abaaso.on("init",c,"abaaso.tabs")})(window)