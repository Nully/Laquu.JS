/**
 * jQuery plugin monogusa.
 *
 * @Auth    Nully
 * @Url     
 * @Make    10/04/26(Mon)
 * Version  1.0
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
(function($){
    // monogusa JS clauser global Object
    $.monogusa = {
        version: 1.0,
        fn: {
            getVersion: function() {return $.monogusa.version;},
            isFunction: $.isFunction,
            riseError:  function(msg) {throw msg;},
            hasClass:   function(class_name) {},
            hasMethod:  function(method) {return $.monogusa.isFunction(method);}
        },
        cls: {
            autoover: function() {}
        },
        extend: $.extend // extend alias
    };


    // autoover
    $.fn.autoover = function() {};


    // alternate
    $.fn.alternate = function() {};


    // hightlight
    $.fn.highlight = function() {};


    // original thickbox
    $.fn.thickbox = function() {};


    // tabs
    $.fn.tabs = function() {};


    // auto scroll
    $.fn.scroll = function() {};


    // accordion
    $.fn.accordion = function() {};


    // prototype alias
    $.autoover.fn  = $.autoover.prototype  = {};
    $.alternate.fn = $.alternate.prototype = {};
    $.highlight.fn = $.highlight.prototype = {};
    $.thickbox.fn  = $.thickbox.prototype  = {};
    $.tabs.fn      = $.tabs.prototype      = {};
    $.scroll.fn    = $.scroll.prototype    = {};
    $.accordion.fn = $.accordion.prototype = {};
})(jQuery);

