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
    // Global object
    $.monogusa = {
        version: 1.0
    };


    /**
     * opacity rollover plugin
     *
     * @param  elms    jQuery ElementCollection
     * @param  options  Object
     *         opacity: rolloverd item to opacity
     *         duration: fadeTo speed
     *         onComplete: complete callback
     *         onHover: hover callback
     *         onOut: mouseout callback
     */
    $.monogusa.opacityOver = function(elms, options) {
        elms.each(function(){
            new opacityOver($(this));
        });
    };
    var opacityOver = function(elm, options) {
        this.init(elm, options);
    };
    opacityOver.fn = opacityOver.prototype = {};
    opacityOver.fn.extend = $.extend;
    opacityOver.fn.extend({
        options: {
            opacity: .7,
            duration: 300,
            onComplete: function() {},
            onHover: function() {},
            onOut: function() {}
        },
        init: function(elm, options) {
            var t = this;
            this.element = elm;
            this.options = this.extend(this.options, options || {});

            // add event
            this.element.hover(function(ev){
                t.hoverHandler(ev);
            }, function(ev){
                t.outHandler(ev);
            });
        },
        hoverHandler: function(ev) {
            this.options.onHover.call(ev.currentTarget);
            this.doTween(ev.currentTarget, this.options.opacity);
        },
        outHandler: function(ev) {
            this.options.onOut.call(ev.currentTarget);
            this.doTween(ev.currentTarget, 1);
        },
        doTween: function(e, o) {
            $(e).stop(true, true).fadeTo(this.options.duration, o, this.options.onComplete);
        }
    });


    /**
     * image rollover plugin
     *
     * @param  elems    jQuery ElementCollection
     * @param  options  Object
     *         suffix: image rollover suffix
     *         onComplete: complete callback
     *         onHover: hover callback
     *         onOut: mouseout callback
     */
    $.monogusa.imageOver= function(elems, options) {
        elems.each(function(){
            new imageOver($(this), options);
        });
    };
    var imageOver = function(elm, options) {
        this.init(elm, options);
    };
    imageOver.fn = imageOver.prototype = {};
    imageOver.fn.extend = $.extend;
    imageOver.fn.extend({
        options: {
            suffix: "_on",
            onComplete: function() {},
            onHover: function() {},
            onOut: function() {}
        },
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.options = this.extend(this.options, o || {});

            this.element.hover(function(ev){
                t.hoverHandler(ev);
            }, function(ev){
                t.outHandler(ev);
            });
        },
        hoverHandler: function(ev) {
            this.toggle(ev.currentTarget);
            this.options.onHover.call(ev.currentTarget);
        },
        outHandler: function(ev) {
            this.toggle(ev.currentTarget);
            this.options.onOut.call(ev.currentTarget);
        },
        toggle: function(e) {
            var $e = $(e),
                base_src = $e.attr("src"),
                src, tmp, ext, exp = new RegExp(this.options.suffix);

            if(exp.test(base_src)) {
                src = base_src.replace(exp, "");
            }
            else {
                tmp = base_src.split(".");
                ext = tmp.pop();
                src = tmp.join(".") + this.options.suffix + "." + ext;
            }
            $e.attr("src", src);
            this.options.onComplete.call(e);
        }
    });


    /**
     * news ticker plugin
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     *         speed: animate speed
     *         duration: interval speed ( call real time is speed + duration)
     *         onComplete: Function
     *         onStep: Function
     */
    $.monogusa.ticker = function(elems, options){
        elems.each(function(){
            new ticker($(this), options);
        });
    };
    var ticker = function(el, options) {
        this.init(el, options);
    };
    ticker.fn = ticker.prototype = {};
    ticker.fn.extend = $.extend;
    ticker.fn.extend({
        options: {
            speed: 1000,
            duration: 2000,
            onComplete: function() {},
            onStep: function() {}
        },
        current_item: 0,
        timer: null,
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.parent  = e.parent();
            this.items = e.children();
            this.options = this.extend(this.options, o || {});

            this.parent.css("position", "relative");
            this.element.css("position", "absolute");
            this.element.hover(function(){
                t.clearTimer();
            }, function(){
                --t.current_item;
                t.next();
            });

            this.next();
        },
        next: function() {
            ++this.current_item;
            this.rewind();
            if(!this.timer) {
                this.timer = setInterval(this.tween, (this.options.duration + this.options.speed), this);
            }
        },
        rewind: function() {
            if(this.current_item >= this.items.length) {
                this.current_item = 0;
            }
        },
        tween: function(caller) {
            var t = caller;
            var item = t.items.get(t.current_item);
            t.element.animate({
                top: -item.offsetTop,
                left: -item.offsetLeft
            }, {
                duration: t.options.speed,
                queue: false,
                complete: function() {
                    var i = (t.current_item === 0) ? t.items.length : t.current_item;
                    $(t.items[i -1]).appendTo(t.element);
                    t.element.css({
                        top: 0,
                        left: 0
                    });
                    t.options.onComplete.call(this, t.items[i -1]);
                    t.next();
                },
                step: t.options.onStep
            });
        },
        clearTimer: function() {
            clearInterval(this.timer);
            this.timer = null;
        }
    });


    /**
     * blank window
     *
     * @param  elems      jQuery HTML Collection Object
     * @param  options    Object
     *         toolbar: shown toolbar 'yes' or 'no'
     *         location: shown location bar 'yes' or 'no'
     *         directories: shown directories bar 'yes' or 'no'
     *         status: shown status bar 'yes' or 'no'
     *         menubar: shown menubar 'yes' or 'no'
     *         scrollbar: shown scrollbar 'yes' or 'no'
     *         resizable: window resizable 'yes' or 'no'
     *         close: shown close button 'yes' or 'no'
     */
    $.monogusa.blank = function(elems, options) {
        elems.each(function(){
            new blank($(this), options);
        });
    };
    var blank = function(elem, options) {
        this.init(elem, options);
    };
    blank.fn = blank.prototype = {};
    blank.fn.extend = $.extend;
    blank.fn.extend({
        options: {
            toolbar:     "yes",
            location:    "yes",
            directories: "yes",
            status:      "yes",
            menubars:    "yes",
            scrollbar:   "yes",
            resizable:   "yes",
            close:       "yes"
        },
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.options = this.extend(this.options, o || {});

            var query_string = this.element.attr("href").split(/\?/);
            this.element.data("query_string", this._parseQuery(query_string[1]));
            this.element.attr("href", query_string[0]);
            this.element.bind("click", function(ev){
                t.open($(this), ev);
            });
        },
        open: function(e, ev) {
            var size = e.data("query_string"),
                param = "", i;

            for(i in this.options) {
                param += i + "=" + this.options[i] + ",";
            }
            for(i in size) {
                param += i + "=" + size[i] + ",";
            }

            param = param.substr(0, param.length - 1);
            window.open(e.attr("href"), "monogusa_blank_window", param);
            ev.preventDefault();
        },
        _parseQuery: function(q) {
            var result = {},
                params, i;

            if(!q) {
                return result;
            }

            params = q.split(/[;&]/);
            for(i = 0; i < params.length; i++) {
                var param = params[i].split(/=/);
                result[param[0]] = param[1];
            }
            return result;
        }
    });


    /**
     * accordion panel
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     */
    $.monogusa.accordion = function(elems, options) {
        elems.each(function(){
            new accordion($(this), options);
        });
    };
    var accordion = function(elm, options) {
        this.init(elm, options);
    };
    accordion.fn = accordion.prototype = {};
    accordion.fn.extend = $.extend;
    accordion.fn.extend({
        options: {
            speed: 600,
            header_class: "monogusa_accordion_header",
            content_class: "monogusa_accordion_content",
            current_class: "active",
            onHide: function() {},
            onShow: function() {}
        },
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.headers = this.element.find("." + this.options.header_class);
            this.content = this.element.find("." + this.options.content_class)
            this.options = $.extend(this.options, o || {});

            this.headers.bind("click", function(ev){
                t.headers.removeClass(t.options.current_class);
                $(this).addClass(t.options.current_class);
                t.show($(this), ev);
            });
            this.headers.first().trigger("click");
        },
        show: function(e, ev) {
            var t = this;
            this.content.not(e.next()).slideUp(this.options.speed, function(){
                t.options.onHide.call(this);
            });

            e.next().slideDown(t.options.speed, function(){
                t.options.onShow.call(this);
            });
        }
    });


    /**
     * tab panel
     *
     * @param elems
     * @param options
     */
    $.monogusa.tab = function(elems, options) {
        elems.each(function(){
            new tab($(this), options);
        });
    };
    var tab = function(elem, options) {
        this.init(elem, options);
    };
    tab.fn = tab.prototype = {};
    tab.fn.extend  = $.extend;
    tab.fn.extend({
        options: {
            active_class: "active"
        },
        tab: null,
        tabs: null,
        panels: null,
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.options = this.extend(this.options, 0 || {});

            this.tab = this.element.find("ul");
            this.tabs = this.tab.find("li a");

            this.tabs.each(function(){
                if(t.panels) {
                    t.panels = t.panels.add($(this).attr("href"));
                }
                else {
                    t.panels = $($(this).attr("href"));
                }
            });

            this.panels.addClass("monogusa-tab-panel");
            this.tabs.addClass("monogusa-tab");

            this.tabs.bind("click", function(ev){
                t.showTab(ev);
            });

            this.tabs.first().trigger("click");
        },
        showTab: function(ev) {
            var target = $(ev.currentTarget),
                panel = $(target.attr("href"));

            this.panels.hide();
            this.tabs.removeClass(this.options.active_class);
            target.addClass(this.options.active_class);
            panel.show();
            ev.preventDefault();
        }
    });


    /**
     * stripe table
     *
     * @param  elems      jQuery HTML Collection Object
     * @param  options    Object
     *         even_class: even data row class
     *         odd_class: odd data row class
     *         onHover: hover action callback
     *         onOut: mouseout callback
     */
    $.monogusa.stripe = function(elems, options) {
        var o = $.extend({
            even_class: "even",
            odd_class: "odd",
            onHover: function() {},
            onOut: function() {}
        }, options || {});
        elems.each(function(i){
            $(this).addClass((i%2 == 0) ? o.even_class: o.odd_class);
            $.monogusa.hover($(this), options);
        });
    };


    /**
     * hover
     *
     * @param  elems     jQuery HTMLCollection Object
     * @param  options   Object
     *         onHover: hover action callback
     *         onOut: mouseout callback
     */
    $.monogusa.hover = function(elems, options) {
        var o = $.extend({
            hover_class: "hover",
            onHover: function() {},
            onOut: function() {}
        }, options || {});
        elems.each(function(){
            $(this).hover(function(){
                o.onHover.call(this);
                $(this).addClass(o.hover_class);
            }, function(){
                o.onOut.call(this);
                $(this).removeClass(o.hover_class);
            });
        });
    };


    /**
     * font size switcher
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     *         css_file: to css file absolute path
     *         onChange: fon size switched callback
     *         cookie: if loaded jQuery cookie plugin uses.
     *                 @see: jQuery.cookie
     */
    $.monogusa.fss = function(elems, options) {
        elems.each(function(){
            new FontSizeSwitcher($(this), options);
        });
    };
    var FontSizeSwitcher = function(elem, options) {
        this.init(elem, options);
    };
    FontSizeSwitcher.fn = FontSizeSwitcher.prototype = {};
    FontSizeSwitcher.fn.extend = $.extend;
    FontSizeSwitcher.fn.extend({
        options: {
            css_file: "/css/fss.css",
            onChange: function() {},
            cookie: {
                expires: 7, // 1 week
                path: "/",
                domain: "",
                secure: false
            }
        },
        init: function(e, o) {
            var t = this,
                path = location.protocol + "//" + location.hostname;

            this.$b = $("body");
            this.element = e;
            this.options = $.extend(this.options, o || {});

            this.element.find("a").bind("click", function(ev){
                t.change($(this), ev);
                return false;
            });

            this.classes = $.map(this.element.find("a"), function(e, i){
                return $(e).attr("href").replace(/#/, "");
            }).join(" ");

            if($.cookie) {
                var loaded = $.cookie("monogusa_ffs_selected");
                if(loaded) {
                    this.$b.addClass(loaded);
                }
            }

            var link = document.createElement("link");
                link.type = "text/css";
                link.rel = "stylesheet";
                link.href = path + this.options.css_file;
            $(link).appendTo("head");
        },
        change: function(e, ev) {
            var size = e.attr("href").replace(/#/, "");
            this.$b.removeClass(this.classes);
            this.$b.addClass(size);
            this.options.onChange.apply(arguments);

            if($.cookie) {
                $.cookie("monogusa_ffs_selected", size, this.options.cookie);
            }
        }
    });


    /**
     * drop down menu
     *
     * @param  elems   jQuery HTML Collection Object
     * @param  options Object
     *         hover_class: on hoverd list item clas
     *         show_speed: slide down speed
     *         hide_speed: slide up speed
     *         onShow: slide down callback
     *         onHide: slide up callback
     */
    $.monogusa.dropdown = function(elems, options) {
        elems.each(function(){
            new dropdown($(this), options);
        });
    };
    var dropdown = function(elem, options) {
        this.init(elem, options);
    };
    dropdown.fn = dropdown.prototype = {};
    dropdown.fn.extend = $.extend;
    dropdown.fn.extend({
        options: {
            hover_class: "hover",
            show_speed: 200,
            hide_speed: 400,
            onShow: function(){},
            onHide: function(){}
        },
        init: function(e, o) {
            var t = this;
            this.element = e;
            this.options = this.extend(this.options, o || {});
            this.menus   = this.element.find("li").filter(function(){
                if($(this).children("ul").size()) {
                    $(this).children("ul").css("display", "none");
                    return $(this);
                }
            });

            this.menus.hover(function(ev){
                t.show($(this), ev);
            }, function(ev){
                t.hide($(this), ev);
            });
        },
        show: function(e, ev) {
            e.addClass(this.options.hover_class);
            e.children("ul").stop(true, true).slideDown(this.options.show_speed, this.options.onShow);
        },
        hide: function(e, ev) {
            e.removeClass(this.options.hover_class);
            e.children("ul").stop(true, true).slideUp(this.options.hide_speed, this.options.onHide);
        }
    });


    /**
     * tooltip
     *
     * @param  elems     jQuery HTML Collection Object
     * @param  options    Object
     *         dist_x: mouse x to distance tooltip
     *         dist_y: mouse y to distance tooltip
     *         show_speed: tooltip shown speed
     *         hide_speed: tooltip hide speed
     *         onShow: show callback function
     *         onHide: hide callback function
     */
    $.monogusa.tooltip = function(elems, options) {
        elems.each(function(i){
            new tooltip(i, this, options);
        });
    };
    var tooltip = function(elem, options) {
        this.init(elem, options);
    };
    tooltip.fn = tooltip.prototype = {};
    tooltip.fn.extend = $.extend;
    tooltip.fn.extend({
        options: {
            dist_x: -10,
            dist_y: -20,
            show_speed: 200,
            onShow: function() {},
            onHide: function() {},
            onMove: function() {}
        },
        init: function(n, e, o) {
            var t = this;
            this.id = n;
            this.element = e;
            this.title = this.element.title;
            this.options = this.extend(this.options, o || {});
            this.tooltip = $('<p class="monogusa-tooltip-wrap-'+ this.id +'" />');

            $(this.element).hover(function(ev){
                t.show(this);
            }, function(ev){
                t.hide(this);
            }).mousemove(function(ev){
                t.move(this, ev);
            });
        },
        show: function(e, ev) {
            var t = this;
            e.title = "";
            this.tooltip
                .css("display", "none")
                .stop(true, true)
                .appendTo("body")
                .text(this.title).fadeIn(this.options.show_speed, function(){
                    t.options.onShow(this);
                });
        },
        hide: function(e, ev) {
            e.title = this.title;
            this.tooltip.stop(true, true).remove();
            this.options.onHide.call(e);
        },
        move: function(e, ev) {
            this.tooltip.css({
                top: ev.pageY + this.options.dist_y + "px",
                left: ev.pageX + this.options.dist_x + "px"
            });
        }
    });


    /**
     * Konami command
     *
     * @param  cmd        String    CSV pattern key code
     * @param  callback   Function  callback function
     *                              default callback method is MeltDown.js
     */
    $.monogusa.konami = function(cmd, callback) {
        var stack = [];
        callback = $.isFunction(callback) ? callback: function () {(function(){var s=document.createElement("script");s.charset="UTF-8";var da=new Date();s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime(); document.body.appendChild(s)})();};
        cmd = (cmd ? cmd : "38,38,40,40,37,39,37,39,66,65").split(",");
        $(document).keyup(function(ev){
            stack.push(ev.keyCode);
            if(stack.length >= cmd.length) {
                stack = [];
            }
        });
    };
})(jQuery);

