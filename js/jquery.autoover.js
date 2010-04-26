/**
 * jQuery plugin autoover
 *
 * @Auth    Nully
 * @Url     http://github.com/Nully:jquery.autoover
 * @Make    10/04/22(Thu)
 * @Version 1.0
 * @License MIT license
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
/**
 * autoover is automate to rollover(image or opacity)
 *
 * Uses simple example
 *  create this example tag elements
 *  <script type="text/javascript" src="js/jquery.autoover.js"></script>
 *  <script type="text/javascript">
 *    $(function(){
 *      $("ul").autoover();
 *    });
 *  </script>
 *
 *  next,
 *  <ul>
 *   <li><a href="/path/to/link">Sample text</a></li>
 *   <li><a href="/path/to/link">Sample text</a></li>
 *   <li><a href="/path/to/link">Sample text</a></li>
 *   <li><a href="/path/to/link">Sample text</a></li>
 *  </ul>
 *
 * Uses image rollover
 * autoover is default rollover type 'opacity'.
 * if you change to image rollover, this.
 *  <script type="text/javascript">
 *    $(function(){
 *      $("ul").autoover("image");
 *    });
 *  </script>
 *
 *  next,
 *  <ul>
 *   <li><a href="/path/to/link"><img src="/path/to/image" /></a></li>
 *   <li><a href="/path/to/link"><img src="/path/to/image" /></a></li>
 *   <li><a href="/path/to/link"><img src="/path/to/image" /></a></li>
 *   <li><a href="/path/to/link"><img src="/path/to/image" /></a></li>
 *  </ul>
 *
 * image file preparetion '_on' suffix image files.
 *  ex).
 *   menu_home.gif
 *     and
 *   menu_home_on.gif
 *
 *
 * if you change image rollover suffix, use option !
 *  <script type="text/javascript">
 *    $(function(){
 *      $("ul").autoover("image", {
 *        "suffix": "_over"
 *      });
 *    });
 *  </script>
 * this change use to rollover suffix by '_over' this !
 *
 *
 * Options
 *  autoover is use otions.
 *  list this.
 * - opacity: target anchor opacity property value. (opacity rollover only uses.)
 * - duration: opacity animation speed. (opacity rollover only uses.)
 *   'use jQuery native animate method.'
 * - suffix: onMouseOver image suffix.  (opacity rollover only uses.)
 *
 * Events
 * - onComplete: fade complete callback. (opacity rollover only uses.)
 *   'use jQuery native complete callback.'
 * -- arguments: none
 * - onStep: fade step callbacl. (opacity rollover only uses.)
 *   'use jQuery native step callback.'
 * -- arguments: String
 * - onHover: onMouseOver call this.
 * -- arguments: onHover HTMLElement
 * - onOut: onMouseOut call this.
 * -- arguments: onOut HTMLElement
 */
/**
 * ChangeLog
 *
 * 10/04/22 -- Version 1.0 release
 *
 */
(function($){
    var defaults;
    $.fn.autoover = function(type, options) {
        return this.each(function(){
            defaults = {
                opcaity: .7,                    // use opacity type only
                duration: "slow",               // use opacity type only
                suffix: "_on",                  // use image type only
                onComplete: function () {},     // use opacity type only
                onStep: function() {},          // use opacity type only
                onHover: function() {},
                onOut: function() {}
            };
            new $.autoover(this, type , options);
        });
    }


    // constructor
    $.autoover = function(e, type, options) {
        // alias prototype
        var self = this;
        this.type = type || "opacity";
        this.options = this.extend(defaults, options || {});
        this.$item = $("li", e);
        self.init();
    }


    // prototype alias
    $.autoover.fn = $.autoover.prototype = {};
    $.autoover.fn.extend = $.extend;
    $.autoover.fn.extend({
        version: 1.0,
        init: function() {

            switch(this.type) {
                case "opacity":
                    this.opacityInit();
                    break;
                case "image":
                    this.imageInit();
                    break;
            }
        },
        // Opacity initialize
        opacityInit: function() {
            var t = this,
                o = this.options,
                opacity = o.opcaity,
                speed = o.duration,
                step = function() {},
                complete = function() {};


            if($.isFunction(o.onStep)) {
                step = o.onStep;
            }

            if($.isFunction(o.onComplete)) {
                complete = o.onComplete;
            }


            $.each(this.$item, function(){
                $("a", this).hover(function(){
                    t.hoverHandler.call(t, this);
                    $(this).animate({"opacity": opacity}, {
                        duration: speed,
                        queue: false,
                        "complete": complete,
                        "step": step
                    });
                }, function() {
                    t.outHandler.call(t, this);
                    $(this).animate({"opacity": 1}, {
                        duration: speed,
                        queue: false,
                        "complete": complete,
                        "step": step
                    });
                });
            });
        },
        // Image initialize
        imageInit: function() {
            var file, t = this, img;
            $.each(this.$item, function(){
                img = $("img", this);
                if(img.size() <= 0) {
                    // continue iterate
                    return true;
                }

                file = t.prepareImagePath(img.attr("src"));

                img.data("on_image", file.on);
                img.data("out_image", file.base);

                img.hover(function(){
                    t.hoverHandler.call(t, this);
                    $(this).attr("src", $(this).data("on_image"));
                }, function(){
                    t.outHandler.call(t, this);
                    $(this).attr("src", $(this).data("out_image"));
                });
            });
        },
        // do call onMouseOver.
        hoverHandler: function(el) {
            if($.isFunction(this.options.onHover)) {
                this.options.onHover.call(this, el);
            }
        },
        // do call onMouseOut.
        outHandler: function(el) {
            if($.isFunction(this.options.onOut)) {
                this.options.onOut.call(this, el);
            }
        },
        // image rollover callable
        // prepare [baseimage_name].sufix.[ext] image file name
        // @return Object { base: base image path, on: rollover image name }
        prepareImagePath: function(src) {
            var _on, base, tmp, ext, result = new Object();
            if(!src.match(new RegExp(/(gif|jp(e)?g|png)$/))) {
                // no roll over
                _on = base = src;
            }
            else {
                // do create rollover Object
                base = src;
                tmp = src.split(".");
                ext = tmp.pop();
                _on = tmp.join(".") + this.options.suffix + "." + ext;
            }
            result.base = base;
            result.on   = _on;
            return result;
        }
    });
})(jQuery);