/**
 * jQuery plugin laquu.
 *
 * @Auth    Nully
 * @Url     
 * @Make    10/04/26(Mon)
 * Version  1.2.0
 * @License MIT Lincense
 * The MIT License
 *
 * Copyright (c) 2010 <copyright Nully>
 *
 * Permission is hereby granted, free of charge, to any person obtaining a copy
 * of this software and associated documentation files (the "Software"), to deal
 * in the Software without restriction, including without limitation the rights
 * to use, copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the Software is
 * furnished to do so, subject to the following conditions:
 *
 * The above copyright notice and this permission notice shall be included in
 * all copies or substantial portions of the Software.
 *
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND, EXPRESS OR
 * IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES OF MERCHANTABILITY,
 * FITNESS FOR A PARTICULAR PURPOSE AND NONINFRINGEMENT. IN NO EVENT SHALL THE
 * AUTHORS OR COPYRIGHT HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER
 * LIABILITY, WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING FROM,
 * OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR OTHER DEALINGS IN
 * THE SOFTWARE.
 */

// jQuery subClass laquu !
if(!laquu) var laquu = jQuery.sub();

// Empty method alias.
laquu.empty = function() {};

// Debug alias
laquu.debug = function() {
	if(window.console && console.log)
		console.log(arguments);
	else
		this.error(arguments);
};

// path to Absolute.
laquu.toAbsolute = function(p) {
	var _ = document.createElement("span").innerHTML = '<a href="'+ p +'"></a>';
	return _.firstChild.href;
};

// Error alias
laquu.error = function(msg) {
	throw msg;
};

// Under the IE version 6
laquu.isUnderIE6 = !!(laquu.browser.msie && Math.abs(laquu.browser.version) <= 6);
