/**
 * jQuery plugin laquu.
 *
 * @Auth    Nully
 * @Url     
 * @Make    10/04/26(Mon)
 * Version  0.16
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

(function($){
    $.laquu = {
        empty: function() {},
        error: function(e) {
            if(window.console && console.log)
                console.log.aplly(arguments);
            else
                throw e;
        }
    };

    /**
     * Accordion plugin
     *
     * paramaters:
     *   triggerSelector: accordion trigger selector.
     *   currentClass: accordion current panel class.
     *   speed: animation speed:
     *   onHide: on slideup callback method.
     *   onShow:  on slidedown callback method.
     */
    laquu.fn.accordion = function(settings) {
        var defaults = {
            triggerSelector: ".accordion_trigger",
            currentClass: "current",
            speed: 400,
            onHide: $.laquu.empty,
            onShow: $.laquu.empty
        };

        return this.each(function(i, e){
            var box = this,
                opts = laquu.extend({}, defaults, settings || {}),
                triggers = laquu(opts.triggerSelector, this),
                contents;

            if(triggers.size() == 0)
                return;

            triggers.each(function(){
                var target = laquu(laquu(this).attr("href"));
                target.hide();
                if(!contents) contents = target;
                else contents = contents.add(target);
            });

            triggers.bind("click", function(e){
                triggers.removeClass(opts.currentClass)
                    .filter("[href="+ e.currentTarget.hash +"]")
                    .addClass(opts.currentClass);
                contents.slideUp(opts.speed, function(){
                    if($.isFunction(opts.onHide))
                        opts.onHide.call(this);
                }).filter(e.currentTarget.hash)
                .slideDown(opts.speed, function(){
                    if($.isFunction(opts.onShow))
                        opts.onShow.apply(this);
                });
                return false;
            });
            laquu(triggers.get(0)).trigger("click");
        });
    };


    /**
     * Blank plugin
     *
     * paramaters
     *   toolbar: display toolbar.
     *   location: shown location bar.
     *   directories: shown direcotries.
     *   status: show status bar.
     *   menubars: shown menu bars.
     *   scrollbar: shown scroll bar.
     *   resizable: browser resizable.
     *   close: shown close button.
     */
    laquu.fn.blank = function(settings) {
        var defaults = {
            toolbar:     "yes", location:    "yes", directories: "yes",
            status:      "yes", menubars:    "yes", scrollbar:   "yes",
            resizable:   "yes", close:       "yes"
        };

        return this.each(function(){
            var params = (function(sizes){
                var opts = $.extend({}, defaults, settings || {}),
                    _param = "";
                for(var k in opts) {
                    _param += k + "=" + opts[k] + ", ";
                }
                _param = _param.substr(0, _param.length - 2);
                if(sizes) {
                    sizes = sizes.split(",");
                    _param += ", width=" + sizes[0];
                    _param += ", height=" + sizes[0];
                }
                return _param;
            })(laquu(this).attr("data-windowsize"));

            laquu(this).bind("click", function(e){
                e.preventDefault();
                window.open(this.href, "laquu_blank", params);
            });
        });
    };


    /**
     * Bubblepopup plugin
     *
     * paramaters
     *   easing: jQuery animation type.
     *   distance: trigger popup animation distance.
     *   hideDelay: popup window hide delay time.
     *   popupClass: popup selector class.
     *   triggerClass: popup trigger selector class.
     *   onShow: popup on show callback method.
     *   onHide: popup on hide callback method.
     *   onStep: popup on step callback method.
     */
    laquu.fn.bubblepopup = function(settings) {
        var defaults = {
            easing: "swing",
            distance: 15,
            hideDelay: 1800,
            popupClass: ".popup",
            triggerClass: ".trigger",
            onShow: $.laquu.empty,
            onHide: $.laquu.empty,
            onStep: $.laquu.empty
        };

        return this.each(function(){
            var opts = $.extend({}, defaults, settings || {}),
                t= $(this),
                popup = t.find(opts.popupClass),
                trigger = t.find(opts.triggerClass),
                popupPos = "-" + (opts.distance + popup.outerHeight()) + "px",
                isShow = false,
                isStarted = false,
                hideTimer = null,
                triggerWidthHalf = trigger.outerWidth({ margin: true }) / 2,
                triggerPosLeft = trigger.position().left,
                popupWidthHalf = popup.outerWidth({ margin: true }) / 2;

            function clearTimer() {
                if(hideTimer) {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                }
            }

            function show() {
                clearTimer();
                if(isShow || isStarted) return;
                isStarted = true;

                popup.stop(true, true).css({
                    top: popupPos, display: "block"
                }).animate({
                    opacity: 1, top: "+=" + opts.distance,
                }, {
                    queue: false,
                    easing: opts.easing,
                    complete: function() {
                        isShow = true;
                        isStarted = false;
                        if($.isFunction(opts.onShow))
                            opts.onShow.call(this, this);
                    },
                    step: opts.onStep
                });
            }

            function hide() {
                clearTimer();
                hideTimer = setTimeout(function(){
                    popup.stop().animate({
                        opacity: 0,
                        top: "-=" + opts.distance
                    }, {
                        queue: false,
                        easing: opts.easing,
                        complete: function() {
                            $(this).css("display", "none");
                            isStarted = false;
                            isShow = false;
                            if($.isFunction(opts.onHide))
                                opts.onHide.call(this, this);
                        },
                        step: opts.onStep
                    });
                }, opts.hideDelay);
            }

            t.css("position", "relative");
            popup.css({
                position: "absolute",
                opacity: 0,
                display: "none",
                top: popupPos
            });

            $([popup.get(0), trigger.get(0)]).hover(show, hide);
        });
    };


    /**
     * Dropdown menu plugin
     *
     */
    laquu.fn.dropdown = function(settings) {
        var defaults = {
            hoverClass: "hover",
            showSpeed: 200,
            hideSpeed: 400,
            hideTime: 500,
            hasSubIcon: '&raquo;',
            onShow: $.laquu.empty,
            onHide: $.laquu.empty
        },
        css = {
            display: "none",
            position: "absolute"
        };

        return this.each(function(){
            var opts = $.extend({}, defaults, settings || {}),
                root =$(this);
            $(this).find("li").filter(function(){
                var ul = $("ul", this),
                    $t = $(this);
                if(ul.size()) {
                    ul.css({ /*display: "none"*/ }).parent("li").hover(function(){
                        $(this).children("ul").slideDown();
                    }, function(){
                        var t = $(this);
                        setTimeout(function() {
                            t.children("ul").slideUp();
                        }, opts.hideTime);
                    });
                }
            });
    };


    /**
     * Fontsize plugin
     *
     * paramaters
     *   onChange: font size on change callback
     *   cookie: jQuery.cookie plugin options
     */
    laquu.fn.fontsize = function(settings) {
        var defaults = {
            onChange: $.laquu.empty,
            cookie: {expires: 7, path: "/", domain: "", secure: false},
            target: "#container"
        };

        return this.each(function(){
                elements = $("a", this),
                body = $(opts.target),
                classes = $.map(elements, function(e, i){
                    return $(e).attr("href").replace("#", "");
                }).join(" ");

            elements.bind("click", function(ev){
                var size = $(this).attr("href").replace("#", "");
                body.removeClass(classes);
                body.addClass(size);

                if($.isFunction(opts.onChange))
                    opts.onChange.call(body, body, size);

                if($.cookie)
                    $.cookie("laquu_font-size", size, opts.cookie);

                ev.preventDefault();
            });

            if($.cookie)
                body.addClass($.cookie("laquu_font-size"));
        });
    };


    // Global object
    $.laquu = $.l = {
        version: 1.0,
        error: function(msg) {
            if($.isFunction(console.log)) {
                console.error(msg);
            }
            return false;
        },
        debug: function(a) {
            if($.isFunction(console.log)) {
                console.log(a);
            }
        }
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
    $.laquu.opacityOver = function(elms, options) {
        var setting = $.extend({}, {
                opacity: .7,
                duration: 300,
                onComplete: function() {},
                onHover: function() {},
                onOut: function() {}
            }, options || {}),
            fn = {
                /**
                 * on mouse over handler
                 *
                 * @param event    jQuery Event Object
                 */
                hoverHandler: function(event) {
                    setting.onHover.call(this);
                    fn.doTween(this, setting.opacity);
                },
                /**
                 * on mouse over handler
                 *
                 * @param event    jQuery Event Object
                 */
                outHandler: function(event) {
                    setting.onOut.call(this);
                    fn.doTween(this, 1);
                },
                /**
                 * on mouse over handler
                 *
                 * @param elm     HTMLNode
                 * @param opacity Int
                 */
                doTween: function(elm, opacity) {
                    $(elm).stop(true, true).fadeTo(setting.duration, opacity, setting.onComplete);
                }
            };

        return elms.each(function(){
            $(this).hover(fn.hoverHandler, fn.outHandler);
        });
    };


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
    $.laquu.imageOver= function(elems, options) {
        var setting = $.extend({}, {
                suffix: "_on",
                onComplete: function() {},
                onHover: function() {},
                onOut: function() {}
            }, options || {}),
            fn = {
                hoverHandler: function(elm) {
                    setting.onHover.call(elm);
                    fn.toggle(elm, $(elm).data("laquu_imgrollover_on"));
                },
                outHandler: function(elm) {
                    setting.onOut.call(elm);
                    fn.toggle(elm, $(elm).data("laquu_imgrollover_out"));
                },
                toggle: function(e, src) {
                    $(e).attr("src", src);
                },
				/* Added */
				toAbsolute: function (path) {
					var span = document.createElement("span");
					span.innerHTML = '<a href="'+ path +'"></a>';
					return span.firstChild.href;
				}
            };

        return elems.each(function(){
            var $t = $(this),
                src = fn.toAbsolute($t.attr("src")),
                _on = "",
                tmp = src.split("."),
                ext = tmp.pop();

			_on = tmp.join(".") + setting.suffix + "." + ext;

			//tmp[tmp.length] = setting.suffix;
            //_on = tmp.join("") + "." + ext;

            $t.data("laquu_imgrollover_out", src);
            $t.data("laquu_imgrollover_on", _on);

            $t.hover(function(){
                fn.hoverHandler(this);
            }, function() {
                fn.outHandler(this);
            });
        });
    };


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
    $.laquu.ticker = function(elems, options){
        return elems.each(function(){
            var $self = $(this), current_item = 0, timer = null, parent = null,
                items = null, item = null, isStarted = false,
                setting = $.extend({}, {
                    speed: 1000,
                    duration: 2000,
                    onComplete: function() {},
                    onStep: function() {}
                }, options || {});


            // rewind iteration
            function rewind() {
                if(current_item >= items.length) { current_item = 0; }
            }

            function next() {
                current_item++;
                rewind();
                item = items.get(current_item);
            }

            function tween() {
                next();
                $self.animate({ top: -item.offsetTop, left: item.offsetLeft }, {
                    duration: setting.duration,
                    queue: false,
                    step: setting.onStep,
                    complete: function() {
                        var i = (current_item === 0) ? items.length : current_item;
                        $self.css({ top: 0, left: 0 });
                        $(items[i -1]).appendTo($self);
                        setting.onComplete.call(items[i -1]);
                    }
                });
            }

            // start animation
            function start() {
                isStarted = true;
                timer = setInterval(function(){
                    tween();
                }, setting.speed + setting.duration);
            }

            // stop animation
            function stop() {
                clearInterval(timer);
                timer = null;
                isStarted = false;
            }

            parent = $self.parent();
            items  = $self.children();

            parent.css("position", "relative");
            $self.css("position", "absolute").hover(stop, start);

            if(!isStarted) { start(); }
        });
    };


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
    $.laquu.blank = function(elems, options) {
        var setting = $.extend({}, {
                toolbar:     "yes",
                location:    "yes",
                directories: "yes",
                status:      "yes",
                menubars:    "yes",
                scrollbar:   "yes",
                resizable:   "yes",
                close:       "yes"
            }),
            fn = {
                parse_query: function(s) {
                    var result = {
                        query: "?",
                        size: {
                            width: 800, height: 600
                        }
                    }, params = s.split(/[;&]/), i, j;

                    if(1 >= params.length) return result;

                    for(i = 0; i < params.length; i++) {
                        var param = params[i].split("=");
                        if(param[0] == "width" || param[0] == "height") {
                            result.size[param[0]] = parseInt(param[1]);
                        }
                        else {
                            result.query += params[i] + "&";
                        }
                    }

                    result.query = result.query.replace(/(&)$/, "");
                    return result;
                },
                open: function(e) {
                    var $e = $(e);
                    window.open($e.attr("href"), "laquu_blank_window", $e.data("laquu_blank_param"));
                }
            };

        return elems.each(function(){
            var $t = $(this),
                src = $t.attr("href").split(/\?/),
                params = fn.parse_query(src[src.length - 1]),
                window_param = $.extend({}, setting, params.size),
                param = "", i;

            for(i in window_param) {
                if(window_param[i]) {
                    param += i + "=" + window_param[i] + ","
                }
            }
            param = param.substr(0, param.length - 1);

            $t.attr("href", src[0] + params.query);
            $t.data("laquu_blank_param", param);

            $t.bind("click", function(){
                fn.open(this);
                return false;
            });
        });
    };


    /**
     * accordion panel
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     */
    $.laquu.accordion = function(elems, options) {
        return elems.each(function(){
            var $self = $(this),
                setting = $.extend({}, {
                    speed: 600,
                    header_class: "laquu_accordion_header",
                    content_class: "laquu_accordion_content",
                    current_class: "active",
                    onHide: function() {},
                    onShow: function() {}
                }, options || {});

            var headers = $self.find("." + setting.header_class),
                content = $self.find("." + setting.content_class);

            function show(e, ev) {
                content.not($(e).next()).slideUp(setting.speed, function(){
                    setting.onHide.call(this);
                });
                $(e).next().slideDown(setting.speed, function(){
                    setting.onShow.call(this);
                });
            }

            headers.bind("click", function(ev){
                headers.removeClass(setting.current_class);
                $(this).addClass(setting.current_class);
                show(this, ev);
                ev.preventDefault();
            });
            $(headers.get(0)).trigger("click");
        });
    };


    /**
     * tab panel
     *
     * @param elems
     * @param options
     */
    $.laquu.tab = function(elems, options) {
        var setting = $.extend({}, {
                active_class: "active"
            });

        return elems.each(function(){
            var $t = $(this), tabs = $t.find("li a"), panels;

            tabs.each(function(){
                if(panels)
                    panels = panels.add($($(this).attr("href"), $t));
                else
                    panels = $($(this).attr("href"), $t);
            });


            panels.addClass("laquu-tab-panel");
            tabs.addClass("laquu-tab").bind("click", function(){
                var $e = $(this),
                    panel = $e.attr("href");

                tabs.not($e).removeClass(setting.active_class);
                panels.hide();

                $e.addClass(setting.active_class);
                $(panel).show();

                return false;
            });
            tabs.first().trigger("click");
        });
    };


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
    $.laquu.stripe = function(elems, options) {
        var o = $.extend({
            even_class: "even",
            odd_class: "odd",
            onHover: function() {},
            onOut: function() {}
        }, options || {});
        return elems.each(function(i){
            $(this).addClass((i%2 == 0) ? o.even_class: o.odd_class);
            $.laquu.hover($(this), options);
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
    $.laquu.hover = function(elems, options) {
        var o = $.extend({
            hover_class: "hover",
            onHover: function() {},
            onOut: function() {}
        }, options || {});
        return elems.each(function(){
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
     *         css_file: to css file absolute path. set to false, not load style file.
     *         onChange: fon size switched callback
     *         cookie: if loaded jQuery cookie plugin uses.
     *                 @see: jQuery.cookie
     */
    $.laquu.fss = function(elems, options) {
        var setting = $.extend({}, {
                css_file: "/css/fss.css",
                onChange: function(element, options) {},
                cookie: {expires: 7, path: "/", domain: "", secure: false}
            }, options || {}),
            fn = {
                change: function(el){
                    var size = $(el).attr("href").replace(/#/, "");
                    $("body").removeClass(classes).addClass(size);

                    if($.isFunction($.cookie)) {
                        $.cookie("laquu_fss_selected", size, setting.cookie);
                    }
                },
                toAbsolute: function(p) {
                    var a = document.createElement("span");
                    a.innerHTML = '<a href="'+ p +'"></a>';
                    return a.firstChild.href;
                },
                addCssFile: function(p) {
                    var l = document.createElement("link");
                    l.type = "text/css";
                    l.rel  = "stylesheet";
                    l.href = p;
                    $(l).appendTo("head");
                }
            },
            classes = $.map(elems.find("a"), function(el){
                var href = fn.toAbsolute($(el).attr("href"));
                if(/#/.test(href)) {
                    return href.split("#").pop();
                }
            }).join(" ");

        fn.addCssFile(fn.toAbsolute(setting.css_file));
        elems.each(function(){
            $("a", this).bind("click", function(){
                fn.change(this);
                return false;
            });
        });

        if($.isFunction($.cookie)) {
            elems.filter(function(){
                $("a[href=#"+ $.cookie("laquu_fss_selected") +"]").trigger("click");
            });
        }
    };


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
    $.laquu.dropdown = function(elems, options) {
        var setting = $.extend({}, {
                hover_class: "hover",
                show_speed: 200,
                hide_speed: 400,
                onShow: function() {},
                onHide: function() {}
            }, options || {}),
            fn = {
                show: function($e, ev) {
                    $e.addClass(setting.hover_class)
                        .children("ul").stop(true, true)
                        .slideDown(setting.show_speed, setting.onShow);
                },
                hide: function($e, ev) {
                    $e.removeClass(setting.hover_class)
                        .children("ul").stop(true, true)
                        .slideUp(setting.hide_speed, setting.onHide);
                }
            };

        return elems.each(function(){
            $(this).find("li").filter(function(){
                if($(this).children("ul").size()) {
                    $(this).children("ul").css("display", "none");
                    return $(this);
                }
            }).hover(function(event){
                fn.show($(this), event);
            }, function(event){
                fn.hide($(this), event);
            });
        });
    };


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
    $.laquu.tooltip = function(elems, options) {
        var setting = $.extend({}, {
                dist_x: -10,
                dist_y: -20,
                show_speed: 200,
                onShow: function() {},
                onHide: function() {},
                onMove: function() {}
            }, options || {}),
            fn = {
                uid: function() {
                    var id = 0;
                    return function(){return ++id;}
                }(),
                createTooltip: function() {
                    return $('<p id="laquu-tooltip-'+ fn.uid() +'" class="laquu-tooltip-wrap"></p>')
                                .appendTo("body").css({
                                    position: "absolute", display: "none"
                                });
                },
                show: function(title, event) {
                    fn.createTooltip().css({
                        top: (event.pageY + setting.dist_y) + "px",
                        left: (event.pageX + setting.dist_x) + "px"
                    })
                    .stop(true, true).text(title)
                    .fadeIn(setting.show_speed, function(){
                        setting.onShow.call(this);
                    });

                    setting.onShow.call(elm);
                },
                hide: function(elm) {
                    $(".laquu-tooltip-wrap").stop(true, true).remove();
                    setting.onHide.call(elm);
                },
                move: function(e, ev) {
                    $(".laquu-tooltip-wrap").css({
                        top: (ev.pageY + setting.dist_y) + "px",
                        left: (ev.pageX + setting.dist_x) + "px"
                    })
                }
            };

        return elems.each(function(i){
            $(this).hover(function(event){
                fn.show($(this).attr("title"), event);
            }, function(){
                fn.hide(this);
            }).mousemove(function(event){
                fn.move(this, event);
            });
        });
    };


    /**
     * bubble popup
     *
     * @param  elems    jQuery HTML Collection
     * @param  options  Object
     *         dist: bubble popup diplay to trigger distance
     *         hide_delay: after mouseout to delay time
     *         popup_class: bubble popup class name
     *         trigger_class: bubble popup trigger class name
     *         easing: required jQuery.easing plugin. easing type
     *         onStep: animation on step calback
     *         onShowComplete: shown complete callback
     *         onHideComplete: hidden complete callback
     */
    $.laquu.bubblepop = function(elems, options) {
        var setting = $.extend({}, {
                dist: 15,
                hide_delay: 2000,
                popup_class: ".popup",
                trigger_class: ".trigger",
                easing: "swing",
                onStep: function(step, options) {},
                onShowComplete: function() {},
                onHideComplete: function() {}
            }, options || {});

        return elems.each(function(){
            var $t = $(this).css("position", "relative"),
                popup = $(setting.popup_class, this), trigger = $(setting.trigger_class, this),
                popup_pos = "-" + (setting.dist + popup.outerHeight()) + "px",
                isShow = false, isStarted = false, hideTimer = null;

                popup.css({
                    position: "absolute",
                    opacity: 0,
                    display: "none",
                    top: popup_pos
                });

            function clear_hide_timer() {
                if(hideTimer) {
                    clearTimeout(hideTimer);
                    hideTimer = null;
                }
            }

            function show_popup(ev) {
                clear_hide_timer();
                if(isShow || isStarted) {
                    return;
                }

                isStarted = true;
                popup.stop().css({top: popup_pos, display: "block"})
                    .animate(
                        {opacity: 1, top: "+=" + setting.dist},
                        {queue: false, easing: setting.easing, complete: function(){
                            isShow = true;
                            isStarted = false;
                            setting.onShowComplete.call(this);
                        }, step: setting.onStep}
                    );
            }

            function hide_popup(ev) {
                clear_hide_timer();
                hideTimer = setTimeout(function(){
                    popup.stop().animate(
                        {opacity: 0, top: "-=" + setting.dist},
                        {queue: false, easing: setting.easing, complete: function() {
                            $(this).css("display", "none");
                            isStarted = false;
                            isShow = false;
                            clear_hide_timer();
                            setting.onHideComplete.call(this);
                        }, step: setting.onStep}
                    );
                }, setting.hide_delay);
            }

            $([popup.get(0), trigger.get(0)]).hover(show_popup, hide_popup);
            return true;
        });
    };


    /**
     * simple image menu
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     *         easing: required jQuery.easing plugin, default swing.
     *         duration: image slide speed
     *         show_size: showing image size
     *         hide_size: hidden image size
     *         is_vertical: default false. set to 'true', vertical slide images.
     *         selected:
     */
    $.laquu.imgmenu = function(elems, options) {
        return elems.each(function(){
            return new imgMenu($(this), options);
        });
    };
    var imgMenu = function(elem, options) {
        this.init(elem, options);
    };
    imgMenu.fn = imgMenu.prototype = {};
    imgMenu.fn.extend = $.extend;
    imgMenu.fn.extend({
        timer: null,
        init: function(e, o) {
            var t = this;

            this.element = e;
            this.options = this.extend({
                easing: "swing",
                duration: 300,
                show_size: "200px",
                hide_size: "160px",
                is_vertical: false,
                auto: false,
                auto_duration: 2500
            }, o || {});
            this.items = this.element.children();

            this.element.css("overflow", "hidden");
            this.items.each(function(i){
                $(this).bind("mouseover", function(ev){t.showItem(i, ev);})
                       .bind("mouseout",  function(ev){t.hideItems(ev);});

                var size;
                if(t.options.is_vertical) size = $(this).css("height");
                else size = $(this).css("width");

                $(this).data("base_size", size);
            });

            this.startAutoSlide();
        },
        showItem: function(n, event) {
            var item, others = [];

            if(event != undefined) {
                this.stopAutoSlide();
            }

            this.items.each(function(i){

                if(n == i) item = $(this);
                else others.push(this);

            });

            $(others).stop().animate(this.getAnimateDirection(this.options.hide_size), {queue: false, duration: this.options.duration});
            item.stop().animate(this.getAnimateDirection(this.options.show_size), {queue: false, duration: this.options.duration});
        },
        hideItems: function(event) {
            var t = this;
            this.items.each(function(el){
                var $t = $(this);
                $t.stop().animate(t.getAnimateDirection($t.data("base_size")), {queue: false, duration: t.options.duration});
            });

            this.startAutoSlide();
        },
        startAutoSlide: function() {
            var t = this, current = 0;
            if(this.options.auto === false) {return;}
            if(this.timer) {return;}

            this.timer = setInterval(function(){
                if(current > t.items.size() - 1) {
                    current = 0;
                }
                t.showItem(current);
                ++current;
            }, this.options.auto_duration);
        },
        stopAutoSlide: function() {
            if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        /**
         * get a animation direction
         *
         * @return String
         */
        getAnimateDirection: function(size) {
            if(this.options.is_vertical) {return {"height": size}; }
            else {return {"width": size}; }
        }
    });


    /**
     * page scroller
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     *          easing: required jQuery.easing plugin. default swing
     *          speed: scrolling animation speed
     *          onScrollEnd: scroll complete callback
     *          onStep: scrolling step callback
     */
    $.laquu.scroller = function(elems, options) {
        var defaults = {
            easing: "swing",
            speed: 1500,
            onScrollEnd: function(obj) {},
            onStep: function(step, obj) {}
        },
        $target = $.browser.webkit ? $("body") : $("html");

        elems.bind("click", function(ev){
            var offset = $($(this).attr("href")).offset(),
                option = $.extend({}, defaults, options || {});

            $target.animate(
                {scrollTop: offset.top, scrollLeft: offset.left},
                {"queue": false, "easing": option.easing, "duration": option.speed, "complete": function(){
                      option.onScrollEnd.call(ev.currentTarget, $target);
                }, "step": function(step, o) {
                      option.onStep.call(ev.currentTarget, step, o);
                }
            });
            return false;
        });
    };


    /**
     * lightbox type simplebox plugin
     *
     * @param element jQueryHTMLCollection
     * @param options Object
     *        loader_img: ajax loading image
     *        prev_text: previous link text
     *        next_text: next link text
     */
    $.laquu.simplebox = function(element, options){
        // simplebox defualt options object
        var simplebox_default_options = {
            loader_img: "img/ajax-loader.gif",
            prev_text: "&laquo; prev",
            next_text: "next &raquo;"
        },


        /**
         * Merged simplebox options Object
         */
        simplebox_options = {},


        /**
         * current showd image number
         */
        simpleboxSelectedImage = 0;


        /**
         * simplebox box node
         *
         * <div id="laquu-simplebox-overlay"></div>
         * <div id="laquu-simplebox">
         *     <div id="laquu-simplebox-content">
         *         <div id="laquu-simplebox-loader"><img src="" /></div>
         *         <div id="laquu-simplebox-image"></div>
         *         <div id="laquu-simplebox-controller">
         *             <div id="laquu-simplebox-title"></div>
         *             <div id="laquu-simplebox-pager">
         *                 <span id="laquu-simplebox-prev"><a href="#"></a></span>
         *                 <span id="laquu-simplebox-next"><a href="#"></a></span>
         *             </div>
         *         </div>
         *     </div>
         * </div>
         */
        var simplebox = '<div id="laquu-simplebox-overlay"></div><div id="laquu-simplebox"><div id="laquu-simplebox-content"><div id="laquu-simplebox-loader"><img src="" /></div><div id="laquu-simplebox-image"></div><div id="laquu-simplebox-controller"><div id="laquu-simplebox-title"></div><div id="laquu-simplebox-pager"><span id="laquu-simplebox-prev"><a href="#"></a></span><span id="laquu-simplebox-next"><a href="#"></a></span></div></div></div></div>';


        /**
         * jQuery HTMLCollection node
         */
        var jQueryObjects;


        /**
         * initialize simplebox
         *
         * @return false
         */
        function simplebox_init() {
            while(this.href != simplebox_options.simpleboxElements.get(simpleboxSelectedImage).href) {
                simpleboxSelectedImage++;
            }

            // create simplebox Element
            simplebox_create_box();

            simplebox_show_image.call(this);
            return false;
        }


        /**
         * Create simplebox image box & overlay
         * reference by clicked anchor Element
         *
         */
        function simplebox_create_box() {
            var box = $(simplebox).appendTo("body"),
                size = get_page_size(), scroll = get_page_scroll();

            // do attach events
            simplebox_attach_events();

            // loading image
            $("#laquu-simplebox-loader > img").attr("src", simplebox_options.loader_img);

            // overlay
            $("#laquu-simplebox-overlay").show().css({ height: size.height, width: size.width });
            $("#laquu-simplebox").show().css({ top: scroll.top + 50, left: scroll.left });
        }


        /**
         * simplebox attachment Events
         *
         */
        function simplebox_attach_events() {
            var overlay = $("#laquu-simplebox-overlay"),
                box     = $("#laquu-simplebox-image");

            // click events
            $([overlay.get(0), box.get(0)]).click(function(){ simplebox_flush(); });

            // window events
            // $(window).scroll(simplebox_scroll_window);
            $(window).resize(simplebox_resize_window);

            // key events
            $(document).keyup(simplebox_keyevent_doc);

            // anchor events
            $("#laquu-simplebox-prev > a").click(simplebox_show_prev_image);
            $("#laquu-simplebox-next > a").click(simplebox_show_next_image);
        }


        /**
         * shown simplebox in image
         */
        function simplebox_show_image() {
            var imgLoader = new Image(),
                loader    = $("#laquu-simplebox-loader"),
                image_content = $("#laquu-simplebox-image"),
                controller = $("#laquu-simplebox-controller"),
                next_btn = $("#laquu-simplebox-next > a", controller).text(""),
                prev_btn = $("#laquu-simplebox-prev > a", controller).text("");


            if(image_content.children("img").size()) { image_content.children("img").remove(); }
            if(loader.is(":hidden")) { loader.show(); }

            imgLoader.src = this.href;
            imgLoader.alt = this.title || this.href.split("/").pop();
            imgLoader.onload = function() {
                var i = this;

                loader.hide();
                controller.hide();

                // user setting link text
                if(simpleboxSelectedImage > 0) {
                    prev_btn.html(simplebox_options.prev_text);
                }
                if(simpleboxSelectedImage < (simplebox_options.simpleboxElements.size() - 1)) {
                    next_btn.html(simplebox_options.next_text);
                }

                // append image to #laquu-simplebox-image
                $("#laquu-simplebox-title").text(this.alt);
                $("#laquu-simplebox-content").css({ width: this.width, height: this.height + controller.innerHeight() });
                image_content.append(this);
                controller.show();
            };
        }


        /**
         * show previous image
         */
        function simplebox_show_prev_image() {
            if(simplebox_options.simpleboxElements[simpleboxSelectedImage -1]) {
                --simpleboxSelectedImage;
                simplebox_show_image.call(simplebox_options.simpleboxElements.get(simpleboxSelectedImage));
            }
            return false;
        }


        /**
         * show previous image
         */
        function simplebox_show_next_image() {
            if(simplebox_options.simpleboxElements[simpleboxSelectedImage + 1]) {
                ++simpleboxSelectedImage;
                simplebox_show_image.call(simplebox_options.simpleboxElements.get(simpleboxSelectedImage));
            }
            return false;
        }


        /**
         * flush out simplebox Elements
         *
         */
        function simplebox_flush() {
            // flush selected image number
            simpleboxSelectedImage = 0;

            $("#laquu-simplebox-overlay, #laquu-simplebox").remove();

            // unbind events
            $(window).unbind("resize", simplebox_resize_window);
            $(document).unbind("keyup", simplebox_keyevent_doc);
            $("#laquu-simplebox-prev > a").unbind("click", simplebox_show_prev_image);
            $("#laquu-simplebox-next > a").unbind("click", simplebox_show_next_image);
        }


        /**
         * simplebox Scroll event
         */
        function simplebox_scroll_window() {
            var scroll = get_page_scroll();
            $("#laquu-simplebox").css({ top: scroll.top + 50, left: scroll.left });
        }


        /**
         * window resize event
         *
         */
        function simplebox_resize_window() {
            var size = get_page_size();
            $("#laquu-simplebox-overlay").css({ width: size.width, height: size.height });
        }


        /**
         * document event for keyEvents
         *
         * @param event    jQuery EventObject
         */
        function simplebox_keyevent_doc(event) {
            switch(event.keyCode) {
                // ESC key
                case 27: simplebox_flush(); break;
                // left cursor key
                case 37: simplebox_show_prev_image(); break;
                // right cursor key
                case 39: simplebox_show_next_image(); break;
            }
        }


        /**
         * get page size
         *
         * @return Object
         */
        function get_page_size() {
            var de = document.documentElement,
                db = document.body;
            var w, h;

            if(window.innerHeight && window.ScrollMaxY) {
                // for Mozilla
                h = window.innerHeight + window.ScrollMaxY;
                w = window.innerWidth + window.ScrollMaxX;
            }
            else {
                h = (db.scrollHeight > db.offsetHeight) ? db.scrollHeight : db.offsetHeight;
                w = db.offsetWidth;
            }
            return  {
                width: w,
                height: h
            };
        }


        /**
         * get Document scroll size
         *
         */
        function get_page_scroll() {
            var de = document.documentElement;
            var t = window.pageYOffset || self.pageYOffset || (de && de.scrollTop)  || document.body.scrollTop;
            var l = window.pageXOffset || self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
            return {
                top: t,
                left: l
            };
        }

        // extended simple box Options
        simplebox_options = $.extend(simplebox_options, simplebox_default_options, options || {}, {
            simpleboxElements: element
        });

        element.click(simplebox_init);
    };


    /**
     * Konami command
     *
     * @param  cmd        String    CSV pattern key code
     * @param  callback   Function  callback function
     *                              default callback method is MeltDown.js
     */
    $.laquu.konami = function(cmd, callback) {
        var stack = [];
        callback = $.isFunction(callback) ? callback: function () {(function(){var s=document.createElement("script");s.charset="UTF-8";var da=new Date();s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime();document.body.appendChild(s)})();};
        cmd = (cmd ? cmd : "38,38,40,40,37,39,37,39,66,65");
        $(document).keyup(function(ev){
            stack.push(ev.keyCode);
            if(stack.toString().indexOf(cmd) >= 0) {
                $(document).unbind("keydown");
                callback.apply(null, arguments);
            }
        });
    };
})(jQuery);
