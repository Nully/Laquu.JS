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

// Empty method alias.
laquu.empty = function() {};

// Debug alias
laquu.debug = function(msg) {
	if(window.console && console.log)
		console.log.apply(arguments);
	else
		this.error(msg);
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


/**
 * Accordion plugin
 *
 * paramaters:
 *   selected: accordion panel selected number.
 *   currentClass: accordion current panel class.
 *   speed: animation speed:
 *   easing: animation easing. (required jQuery.easing plugin!)
 *   onHide: on slideup callback method.
 *   onShow:  on slidedown callback method.
 */
(function($l){
	$l.fn.accordion = function(options) {
		var defaults = {
            selected: false,
            currentClass: "current",
            speed: 300,
            easing: "easeOutQuad",
            onHide: $l.empty,
            onShow: $l.empty,
		};

		return this.each(function(i, elm){
			var o = $l.extend({}, defaults, options || {}),
				self = $l(this),
				t = $l(this).find("a[href^=#]"),
				c = null;

			// break, next loop index.
			if(t.size() < 1) return true;

			t.each(function(){
				var tr = $l($l(this).attr("href")).hide();
				if(c)
					c = c.add(tr);
				else
					c = tr;
			});

			t.bind("click", function(ev){
				t.removeClass(o.currentClass)
					.filter("[href="+ ev.currentTarget.hash +"]")
					.addClass(o.currentClass).end();

				c.not(ev.currentTarget.hash)
					.slideUp({
						speed: o.speed,
						easing: o.easing,
						complete: $l.isFunction(o.onHide) ? o.onHide: $l.empty
					})
					.end()
					.filter(ev.currentTarget.hash)
					.slideDown({
						speed: o.speed,
						easing: o.easing,
						complete: $l.isFunction(o.onShow) ? o.onShow: $l.empty
					});

				ev.preventDefault();
			});

			if(o.selected != false && typeof o.selected == "number")
				$l(t.get(o.selected)).trigger("click");
			else
				$l(t.get(0)).trigger("click");
		});
	};
})(laquu);


/**
 * blackout scroller plugin
 * blackout warp scroll.
 * parametes
 *   overlayColor: blackout overlay color.
 *   speed: fade in/out speed.
 * 
 */
(function($l){
	var defaults = {
		overlayColor: "#000000",
		speed: 300,
		easing: "easeOutQuad",
		onShow: $l.empty,
		onHide: $l.empty
	}, d = $(document), w = $(window), b;

	$l.fn.blackoutScroll = function(options) {
		var o = $l.extend({}, defaults, options || {});
		if(!b) {
			b = $('<div id="laquu_blackout_scroller_overlay" />')
				.appendTo("body").hide().css({
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 100000
				});
		}

		this.bind("click", function(ev){
			var _t = $l($l(this).attr("href"));

			if(_t.size() < 1) return true;

			b.css({
				background: "#000",
				width: d.width(),
				height: d.height()
			}).fadeIn(o.speed, o.easing, function(){
				$.isFunction(o.onShow) ? o.onShow.call(_t, _t, b): $l.empty();

				var _o = _t.offset();
				w.scrollTop(_o.top).scrollLeft(_o.left);

				b.fadeOut(o.speed, o.easing, function(){
					$.isFunction(o.onHide) ? o.onHide.call(_t, _t, b): $l.empty();

					b.hide().css({ top: 0, left: 0, width: 0, height: 0 });
				});
			});

			ev.preventDefault();
		});

		return this;
	};
})(laquu);


/**
 * Blank plugin
 *
 * paramaters
 *   extensions: do not open in brank target extensions. separated comma.
 */
(function($l){
	$l.fn.blank = function(options) {
	    var defaults = {
	    	extensions: false,
	    	width: null,
	    	height: null
	    },
	    s = null,
	    o = $l.extend({}, defaults, options || {}),
	    i;

		if(o.extensions) {
			s = [];
			var l = o.extensions.split(",");
			for(i in l) {
				s.push('[href$="'+ l[i] +'"]');
			}
			s = s.join(",");
		}

		if(s != null)
			this.not(s).attr("target", "_blank");
		else if(o.width || o.height) {
			this.bind("click", o, open);
		}
		else {
			this.attr("target", "_blank");
		}

		return this;
	};

	function open(ev) {
		var d = ev.data,
			params = "toolbar=yes, location=yes, directories=yes, status=yes, menubar=yes, scrollbars=yes, resizable=yes, close=yes",
			w;

		params += ",width=300";
		window.open(this.href, "", params);
		ev.preventDefault();
	}
})(laquu);


/**
 * breadcrumb plugin
 * simple animation for breadcrumb.
 * paramaters
 *   timer: interval time number
 *   animTime: crumb animation timer
 *   isVertical: animation type vertical, or holizontal
 *   not:
 *   lastItemClass: crumb last item class name
 *   easing: easing type (required jQuery.easing plugin)
 *   onComplete: animation complate callback
 *   onStep: animation step callback
 */
(function($l){
    var defaults = {
        timer: 100,
        animTime: 50,
        isVertical: false,
        not: null,
        lastItemClass: "breadcrumb-last",
        easing: null,
        onComplete: $l.empty,
        onStep: $l.empty
    };

    $l.fn.breadcrumb = function(options) {
        return this.each(function(){
            var o = $.extend({}, defaults, options || {}),
                _this = $(this),
                items = _this.children(),
                itemSize = items.size(),
                current = 1,
                timer = null,
                isStop = false;

            _this.css({
                position: "relative",
                height: _this.innerHeight(),
                overflow: "hidden"
            });

            // set children item css
            items.filter(":not(" + o.not + ")").each(function(i, e) {
                var p = {
                    position: "absolute", top: 0, left: 0, zIndex: itemSize - i
                },
                self = $(this);

                if(o.isVertical) {
                    var left = 0;
                    if(self.prev().size() != 0) {
                        left = self.prev().outerWidth({ margin: true }) + parseInt(self.prev().css("left").replace("px", ""));
                    }
                    p.left = left;
                    p.top = "-" + _this.outerHeight() + "px";
                }
                self.addClass("breadcrumb-items breadcrumb-item"+i).css(p);

                return this;
            }).not(":first").hide();

            items.last().addClass(o.lastItemClass);

            if(o.timer < 50)
                o.timer = 50;

            // reset interval timer.
            o.timer = o.timer + o.animTime;

            timer = setInterval(function(){
                var params = {},
                    opts = {},
                    current_item = $(items.get(current - 1));

                params.queue = false;
                params.top = 0;
                opts.duration = o.animTime;

                if(o.isVertical) {
                    isStop = (current - itemSize) > 0;
                }
                else {
                    var beforeLeft = current_item.prev().css("left");
                    if(typeof beforeLeft == "undefined")
                        beforeLeft = "0px";

                    beforeLeft = parseInt(beforeLeft.replace("px", ""));
                    params.left = current_item.prev().outerWidth({ margin: true }) + beforeLeft;
                    current_item.css("left", beforeLeft);
                    isStop = (current > itemSize - 1);
                }

                opts.complete = function() {
                    if(o.isVertical)
                        current_item.css("top", params.top);
                    else
                        current_item.css("left", params.left);

                    if($.isFunction(o.onComplete))
                        o.onComplete.apply(current_item);
                };

                if($.isFunction(o.onStep))
                    opts.onStep = o.onStep;

                if($.easing && o.easing && $.easing[o.easing])
                    opts.easing = o.easing;

                current_item.show().animate(params, opts);

                ++current;
                if(isStop) clearInterval(timer);
            }, o.timer);
        });
    };
})(laquu);


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
(function($l){
    $l.fn.bubblepopup = function(settings) {
        var defaults = {
            easing: "swing",
            distance: 15,
            hideDelay: 1800,
            popupClass: ".popup",
            triggerClass: ".trigger",
            onShow: $l.empty,
            onHide: $l.empty,
            onStep: $l.empty
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
})(laquu);


/**
 * Dropdown menu plugin
 *
 */
(function($l){
    $l.fn.dropdown = function(settings) {
        var defaults = {
            hoverClass: "hover",
            showSpeed: 200,
            hideSpeed: 400,
            hideTime: 500,
            onShow: $l.empty,
            onHide: $l.empty
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
                    ul.hide().parent("li").hover(function(){
                        $(this).children("ul").slideDown(opts.showSpeed);
                    }, function(){
                        var t = $(this);
                        setTimeout(function() {
                            t.children("ul").slideUp(opts.hideSpeed);
                        }, opts.hideTime);
                    });
                }
            });
        });
    };
})(laquu);


/**
 * Fontsize plugin
 *
 * paramaters
 *   onChange: font size on change callback
 *   cookie: jQuery.cookie plugin options
 */
(function($l){
    $l.fn.fontsize = function(settings) {
        var defaults = {
            onChange: $l.empty,
            cookie: {expires: 7, path: "/", domain: "", secure: false},
            target: "#container"
        };

        return this.each(function(){
            var opts = $.extend({}, defaults, settings || {}),
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
})(laquu);


/**
 * image rollover plugin
 *
 * @param  elems    jQuery ElementCollection
 * @param  options  Object
 *         suffix: image rollover suffix
 *         onHover: hover callback
 *         onOut: mouseout callback
 */
(function($l){
    $l.fn.imageOver= function(options) {
    	var defaults = {
			suffix: "_on",
			onHover: $l.empty,
			onOut: $l.empty
    	};

		function swap(e, s, c) {
			e.src = s;
			c.call(e, e);
		}

		return this.each(function(i, e){
			var o = $l.extend({}, defaults, options || {}),
				a = this.src,
				b,
				ext;

			 b = this.src.split(".");
			 ext = b.pop();
			 b = b.join(".") + o.suffix + "." + ext;

			$(this).hover(function(ev){
				swap.call(this, this, a, $.isFunction(o.onHover) ? o.onHover: $l.empty);
			}, function(ev){
				swap.call(this, this, b, $.isFunction(o.onOut) ? o.onOut: $l.empty);
			});
		});
    };
})(laquu);


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
(function($l){
    $l.fn.opacityOver = function(options) {
    	var defaults = {
            opacity: .7,
            speed: 300,
            onComplete: $l.empty,
            onHover: $l.empty,
            onOut: $l.empty
       };

        return this.each(function(){
			var o = $.extend({}, defaults, options || {});
			$l(this).hover(function(ev){
				$.isFunction(o.onHover) ? o.onHover.call(this, this, ev): $l.empty;
				$(this).fadeTo(o.speed, o.opacity, o.onComplete ? o.onComplete : $l.empty);
			}, function(ev){
				$.isFunction(o.onOut) ? o.onOut.call(this, this, ev): $l.empty;
				$(this).fadeTo(o.speed, 1, o.onComplete ? o.onComplete : $l.empty);
			});
        });
    };
})(laquu);


/**
 * Hover plugin (over plugin name space)
 * paramaters
 *   hoverClass: mouse over additional class name
 *   onHover: hover callback method
 *   onOut: mouseout callback method
 */
(function($l){
    $l.fn.over = function(settings) {
        var defaults = {
            hoverClass: "hover",
            onHover: $l.empty,
            onOut: $l.empty
        };

        return this.each(function(i, e){
            var opts = $.extend({}, defaults, settings || {});
            $(this).hover(function(ev){
                $(this).addClass(opts.hoverClass);
                if($.isFunction(opts.onHover))
                    opts.onHover.call(this, this, ev);
            }, function(ev){
                $(this).removeClass(opts.hoverClass);
                if($.isFunction(opts.onOut))
                    opts.onOut.call(this, this, ev);
            });
        });
    };
})(laquu);


/**
 * Konami command
 *  paramaters
 *    cmd: command key paramaters.
 *    callback: command complation callback method.
 *
 * Special thanks.
 *   meltdown js.
 *   KAZUMiX: http://d.hatena.ne.jp/KAZUMiX/20071105/meltdown
 */
(function($l){
    $l.fn.konami = function(settings) {
        var defaults = {
            cmd: "38,38,40,40,37,39,37,39,66,65",
            callback: function() {
                var s = document.createElement("script");
                s.charset="UTF-8";
                var da = new Date();
                s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime();
                document.body.appendChild(s)
            }
        };

        return this.each(function(){
            var stack = [],
                opts = $.extend({}, defaults, settings || {});
            $(this).bind("keydown", function(ev){
                stack.push(ev.keyCode);
                if(stack.toString().indexOf(opts.cmd) >= 0) {
                    $(this).unbind("keydown");
                    opts.callback.call(this, this, ev, stack);
                }
            });
        });
    };
})(laquu);


/**
 * tab panel
 *
 * @param elems
 * @param options
 */
(function($l){
    $l.fn.tab = function(elems, options) {
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
})(laquu);


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
(function($l){
    $l.fn.tooltip = function(elems, options) {
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
})(laquu);


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
(function($l){
    $l.fn.ticker = function(elems, options){
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
})(laquu);


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
(function($l){
    $l.fn.scroller = function(elems, options) {
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
})(laquu);


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
(function($l){
    $l.fn.stripe = function(elems, options) {
        var o = $.extend({
            even_class: "even",
            odd_class: "odd",
            onHover: $l.empty,
            onOut: $l.empty
        }, options || {});
        return elems.each(function(i){
            $(this).addClass((i%2 == 0) ? o.even_class: o.odd_class);
            $.laquu.hover($(this), options);
        });
    };
})(laquu);

