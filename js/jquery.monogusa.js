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
(function(){
    Array.prototype.inArray = function(value) {
        for(var i in this) {
            if(this[i] === value) {
                return true;
            }
        }
        return false;
    }
})();

(function($){
    var allowedPlugins = [
        "tab", "stripe", "highlight", "scroller", "accordion"
    ];
    $.fn.monogusa = function(method, options) {
        if(!allowedPlugins.inArray(method)) {
            throw $.monogusa.riseError("not allowd method '"+ method +"' !");
        }

        try{
            return $.monogusa[method].call(this, options);
        }
        catch(e) {
            throw $.monogusa.riseError(e);
        }
    }


    // monogusa Object
    $.monogusa = {
        accordion: function(options) {
        },
        /**
         * simple tab panel
         * for core UI tab, jQuery UI use it.
         *
         * @access pubic
         * @param  options    Object
         *  onClick:  on click to tab click callback
         *  onChange: on change to tab panel callback
         */
        tab: function(options) {
            var settings = $.extend({
                tab_active_class: "active",
                onClick: function() {},
                onChange: function() {}
            }, options || {});


            return this.each(function(i){
                var $t = $(this),
                    $li = $("li", $t),
                    $anchors = $("a", $li),
                    panelSelectors;

                $li.css({
                    "float": "left"
                });
                $anchors.css({
                    "border": "1px solid #CECECE",
                    "padding": "3px",
                    "margin-right": "5px",
                    "display": "block"
                });


                $t.addClass("monogusa-tabbox-" + i);
                $anchors.each(function(){
                    var selector = $(this).attr("href");
                    if(panelSelectors) {
                        panelSelectors = panelSelectors.add(selector);
                    }
                    else {
                        panelSelectors = $(selector);
                    }

                    $(this).bind("click", function(ev){
                        panelSelectors.hide();
                        if($.isFunction(settings.onClick)) {
                            settings.onClick.call(this, this);
                        }
                        $(selector).show();
                        ev.preventDefault();
                    });
                });
                panelSelectors.css("clear", "both");
                $anchors.first().trigger("click");
            });
        },
        /**
         * stripe a rows.
         *
         * @access public
         * @param  options    Object
         *  odd_class:  odd row class
         *  even_class: even row class
         */
        stripe: function(options) {
            var settings = $.extend({
                odd_class: "odd",
                even_class: "even"
            }, options || {});

            this.each(function(){
                $(this).find("tr, li").each(function(i){
                    var cls = (i%2) ? settings.even_class : settings.odd_class;
                    $(this).addClass(cls);
                });
            });
        },
        /**
         * highlight for IE, not supported :hover class.
         *
         * @access public
         * @param  options    Object
         */
        highlight: function(options) {
            var settings = $.extend({
                hover_class: "monogusa_hover",
                onHover: function() {},
                onOut: function() {}
            }, options || {});

            this.each(function(){
                $(this).hover(function(){
                    if($.isFunction(settings.onHover)) {
                        settings.onHover.call(this);
                    }
                    $(this).addClass(settings.hover_class);
                }, function(){
                    if($.isFunction(settings.onOut)) {
                        settings.onOut.call(this);
                    }
                    $(this).removeClass(settings.hover_class);
                });
            });
        },
        /**
         * RiseError message
         *
         * @access public
         * @param  message    String    error message
         */
        riseError: function(message) {
            if(window.console) {
                console.log(message);
            }
            alert(message);
        }
    };
})(jQuery);

