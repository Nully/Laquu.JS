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

    String.prototype.replaceAll = function(o, n) {
        return this.split(o).join(n);
    }
})();



(function($){
    $.fn.monogusa = function(fn, options) {
        return new $.monogusa(this, fn, options);
    }

    $.monogusa = function(el, fn, options) {
        try {
            this[fn].call(el, options);
        }
        catch(e) {
            this.riseError(e);
        }
    }


    // prototype alias
    $.monogusa.fn = $.monogusa.prototype = {};
    $.monogusa.fn.extend = $.extend;
    $.monogusa.fn.extend({
        /**
         * autoover to link
         *
         * @access public
         * @param  options      Object
         *  mode   :     String        rollover mode. set to 'opacity' or 'toggle'.
         *  opacity:     Float|Int     rollover opacity value
         *  onStep :     Function      rollover animate callback method
         *  onHover:     Function      rollover hover callback
         *  onOut  :     Function      rollover mouseout callback
         */
        autoover: function(options) {
            var settings = $.extend({
                mode: "opacity",
                opacity: .7,
                duration: 400,
                suffix: "_on",
                onStep: function() {},
                onComplete: function() {},
                onHover: function() {},
                onOut: function() {}
            }, options || {});
            var modeHandler = (function(mode) {
                switch(mode) {
                    case "opacity":
                        return function(event) {
                            var $t = $(this);
                            if(event.originalEvent.type == "mouseover") {
                                $t.animate({ opacity: settings.opacity }, {
                                    duration: settings.duration,
                                    queue: false,
                                    complete: settings.onComplete,
                                    step: settings.onStep
                                });
                            }
                            else {
                                $t.animate({ opacity: 1 }, {
                                    duration: settings.duration,
                                    queue: false,
                                    complete: settings.onComplete,
                                    step: settings.onStep
                                });
                            }
                        }
                        break;
                    default:
                        return function(event) {
                            var $t = $(this),
                                $img = $t.children("img:first");

                            // no have a image
                            if($img.size() <= 0) {
                                return;
                            }

                            if(event.originalEvent.type == "mouseover") {
                                var tmp = $img.attr("src").split(".");
                                var ext = "." + tmp.pop(),
                                    _on = tmp.join(".") + settings.suffix;
                                $img.attr("src", _on + ext);
                            }
                            else {
                                $img.attr("src", $img.attr("src").replace(settings.suffix, ""));
                            }
                        }
                        break;
                }
            })(settings.mode);


            // on step is function ?
            if(!$.isFunction(settings.onStep))
                settings.onStep = function() {};

            // on step is function ?
            if(!$.isFunction(settings.onComplete))
                settings.onComplete = function() {};

            // onHover is function ?
            if(!$.isFunction(settings.onStep))
                settings.onHover = function() {};

            // onOut is function ?
            if(!$.isFunction(settings.onStep))
                settings.onOut = function() {};

            // do each anchors
            return this.each(function(i){
                var t = this,
                    $t = $(t),
                    $anchors = (function(el){
                        if(el.tagName == "A") {
                            return $(el);
                        }
                        return $(el).find("a");
                    })(t);

                // if has no anchors continue next elements
                if($anchors.size() <= 0) {
                    return true;
                }

                $anchors.each(function() {
                    $(this).hover(function(ev){
                        settings.onHover.call(this, ev);
                        modeHandler.call(this, ev);
                    }, function(ev) {
                        settings.onOut.call(this, ev);
                        modeHandler.call(this, ev);
                    });
                });
            });
        },
        /**
         * simple new ticker
         *
         * @access public
         * @param  options    Object
         */
        ticker: function(options) {
            var settings =$.extend({
                hide_speed: .6,
                pause: 3,
                show_count: 1
            }, options || {});

            this.each(function(){
                var $t  = $(this),
                    $ul = $("ul", $t),
                    $items = $("li", $ul),
                    currentItem = 0,
                    itemLength = $items.size(),
                    itemHeight = $items.first().outerHeight(),
                    timer,
                    hideSpeed = settings.hide_speed * 1000;

                // start timer
                function startTimer() {
                    timer = setInterval(slideTicker, settings.pause * 1000);
                }

                // stop timer
                function stopTimer() {
                    clearInterval(timer);
                }

                // do animation ticker
                function slideTicker() {
                    var firstItem = $ul.children().first(),
                        moveTicker = function() {
                            $items.animate({top: "-=" + itemHeight});
                        };
                    if(currentItem >= itemLength) { currentItem = 0; }
                    $items.eq(currentItem)
                        .animate({opacity: 0}, hideSpeed, function(){
                            $ul.append(firstItem);
                            $(this).css("top", itemHeight * itemLength);
                            firstItem.animate({opacity: 1});
                            moveTicker();
                        });
                    ++ currentItem;
                }


                $ul.addClass("monogusa-ticker");
                $items.addClass("monogusa-tiker-items");

                $ul.css({
                    position: "relative",
                    overflow: "hidden",
                    height: itemHeight * settings.show_count
                });
                $items.css({position: "absolute"});
                $items.each(function(i){
                    $(this).css("top", i * itemHeight);
                });

                // hover action
                $items.hover(startTimer, stopTimer);

                // do ticker !
                startTimer();
            });
        },
        /**
         * popup window blacnk link
         *
         * @access public
         * @param  options    Object
         */
        blank: function (options) {
            var settings = $.extend({
                toolbar:     "yes",
                location:    "yes",
                directories: "yes",
                status:      "yes",
                menubar:     "yes",
                scrollbar:   "yes",
                resizable:   "yes",
                close:       "yes"
            }, options || {}),
            parseQuery = function(q) {
                var query = q.replace(/^[^\?]+\??/, ""),
                    params = {};

                if(!query) return params;

                var parts = query.split(/[;&]/);
                for(var i = 0; i < parts.length; i ++) {
                    var pairs = parts[i].split("="),
                        k = unescape(pairs[0]),
                        v = unescape(pairs[1]);

                    params[k] = v;
                }

                return params;
            },
            windowHandler = function(elm) {
                var baseURL = elm.href.split("?")[0],
                    q = parseQuery(elm.href),
                    param = "",
                    window_title = elm.title || "";

                // parsed query
                for(var j in q) {
                    param += j + "=" + q[j] + ",";
                }

                // setting object
                for(var i in settings) {
                    param += i + "=" + settings[i] + ",";
                }

                param = param.slice(0, param.length - 1);
                window.open(baseURL, "monogusa_blank_window", param);
            };

            this.bind("click", function(ev){
                windowHandler(this);
                ev.preventDefault();
            });
        },
        /**
         * accordion slider menu
         *
         * @access public
         * @param  options    Object
         *  header_class:   accordion slider header class name
         *  in_speed    :   accordion slide in speed (open)
         *  out_speed   :   accordion slide out speed (close)
         *  in_callback :   accordion open complete callback
         *  out_callback:   accordion close complete callback
         */
        accordion: function(options) {
            var settings = $.extend({
                header_class: "accordion_header",
                in_speed: 200,
                out_speed: 300,
                in_callback: function() {},
                out_callback: function() {}
            }, options || {});

            // calback functions is not a function, set to clouser function.
            if(!$.isFunction(settings.in_callback)) {
                settings.in_callback = function() {};
            }
            if(!$.isFunction(settings.out_callback)) {
                settings.out_callback = function() {};
            }


            // each of accordions
            return this.each(function(i){
                var $headers = $("." + settings.header_class + " a", this),
                    $panels;

                $headers.each(function(j){
                    var _target = $(this).attr("href");

                    // panel selectors
                    if($panels) $panels = $panels.add(_target);
                    else $panels = $(_target);

                    $(this).bind("click", function(ev){
                        var $current_panel = $($(this).attr("href"));

                        // is current panel shown return false.
                        if($current_panel.is(":visible")) {
                            return false;
                        }

                        // toggle accordion.
                        $panels.filter(":visible").slideUp(settings.out_speed, settings.out_callback);
                        $current_panel.slideDown(settings.in_speed, settings.in_callback);
                        ev.preventDefault();
                    });
                });
                $panels.not(":first").hide();
            });
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
                show_speed: 800,
                onClick: function() {},
                onChange: function() {}
            }, options || {});


            return this.each(function(i){
                var $t = $(this),
                    $ul = $("ul:first", $t),
                    $li = $("li", $ul),
                    $anchors = $("a", $li),
                    panelSelectors;

                $ul.addClass("monogusa-tabs monogusa-tabbox-" + i);
                $anchors.each(function(){
                    var selector = $(this).attr("href");
                    if(panelSelectors) {
                        panelSelectors = panelSelectors.add(selector).addClass("monogusa-panels");
                    }
                    else {
                        panelSelectors = $(selector);
                    }

                    $(this).bind("click", function(ev){
                        panelSelectors.hide();
                        $li.removeClass(settings.tab_active_class);
                        
                        // onClick handler
                        if($.isFunction(settings.onClick)) { settings.onClick.call(this, this); }

                        $(this).parent().addClass(settings.tab_active_class);
                        $(selector).fadeIn(settings.show_speed);
                        ev.preventDefault();
                    });
                });
                panelSelectors.wrapAll('<div class="monogusa-tab-panel-wrap">');
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
         * simple font size switcher
         *
         * @access public
         * @param  options     Object
         *  path : font-switch.css file path
         *  name : font-switch.css file name.
         */
        fswitch: function(options) {
            var settings = $.extend({
                path: "css/",
                name: "fswitch.css",
                title: "\u30d5\u30a9\u30f3\u30c8\u30b5\u30a4\u30ba",
                label: {
                    small: "\u5c0f",
                    middle: "\u4e2d",
                    large: "\u5927"
                }
            }, options || {});

            // font-size switch buttons
            var sizes = [
                "small", "middle", "large"
            ];

            // sanitize file path, file name
            var path = settings.path,
                filename = settings.name,
                loc = window.location.pathname;

            // dose not end slash.
            if(!path.match(/.+[/]$/)) {
                path = path + "/";
            }

            // location pattern filename ?
            var pattern = loc.match(/[\w.]+$/)
            if(pattern) {
                loc = loc.replace(pattern[0], "");
            }

            // location pathname end of slash ?
            if(!loc.match(/\/$/)) {
                loc = loc + "/";
            }

            // create font-switch css link element
            var link = document.createElement("link");
            link.href = loc + path + filename;
            link.type = "text/css";
            link.rel  = "stylesheet";
            link.id   = "monogusa-fontswitch-link";
            $("head").append(link);

            /**
             * @TODO: cookie manage by last selected font-size class name.
             **/

            // do each create button element
            this.each(function(i){
                var $box = $(this),
                    $dl = $('<dl id="monogusa-fswitch-'+ i +'" />').appendTo($box),
                    nodes;

                $('<dt class="monogusa-fswitch-title-'+ i +'" />').text(settings.title).appendTo($dl);
                $.each(sizes, function(i, name) {
                    var elm = $('<a href="#'+ name +'" class="monogusa-fsize-'+ name +'" />').text(settings.label[name]);
                    elm.data("font-size", name);

                    var $dd = $('<dd class="monogusa-fswitch-label" />').append(elm).appendTo($dl);

                    // push jQuery nodes
                    if(nodes) {
                        nodes = nodes.add($dd);
                    }
                    else {
                        nodes = $dd;
                    }
                });

                nodes.find("a").bind("click", function(){
                    nodes.removeClass("fswitch_current");
                    $(this).addClass("fswitch_current");
                    var $body = $("body");
                    $body.removeClass($body.attr("class"));
                    $body.addClass($(this).data("font-size"));
                    return false;
                });
            });
        },
        /**
         * scroller
         *
         * @access public
         * @param  options     Object
         *  scroll_speed:    text or int. "ex) 'slow', 'fast', 1500"
         *  easing      :    required jQuery easing plugin. default supported 'linear', 'swing'.
         *  callback    :    scroll to end callback
         */
        scroller: function(options) {
            var _target = $.browser.safari ? "body": "html";
            var settings = $.extend({
                scroll_speed: 1000,
                easing: "swing",
                callback: function() {}
            }, options || {});

            return this.each(function(i){
                var t = this,
                    $t = $(t)
                    anchor = function() {
                        if(t.tagName == "A") {
                            return t;
                        }
                        return $t.find("a").get(0);
                    }(),
                    $anchor = $(anchor);

                // bind to click handler
                $anchor.bind("click", function(ev){
                    var top = $($(this).attr("href")).offset().top;
                    $(_target).animate({scrollTop: top}, settings.scroll_speed, settings.easing, settings.callback);
                    ev.preventDefault();
                });
            });
        },
        /**
         * KONAMI command !!
         *
         * @access public
         * @param  cmd        execute command
         * @param  callback   commnad executable callback, default meltdown !
         */
        konami: function(cmd, callback) {
            var pushed =[],
                command = cmd ? cmd: "38,38,40,40,37,39,37,39,66,65";
                clb = $.isFunction(callback) ? callback : function () {(function(){var s=document.createElement("script");s.charset="UTF-8";var da=new Date();s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime(); document.body.appendChild(s)})();};

            $(document).keyup(function(ev) {
                if(command.match(ev.keyCode)) {
                    pushed.push(ev.keyCode);
                    var tmp = pushed.join(",");
                    if(tmp == command) {
                        clb.call(this, this, ev);
                    }
                }
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
    });
})(jQuery);

