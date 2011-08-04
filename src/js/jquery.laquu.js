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
        return this.each(function(){
            $(this).attr("target", "_blank");
        });
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
            cookie: {expires: 7, path: "/", domain: "", secure: false}
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
                $("body").removeClass(classes).addClass(size);

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

			$l(this).over({
			    onHover: function(ev){
    				swap.call(this, this, b, $.isFunction(o.onHover) ? o.onHover: $l.empty);
			    },
			    onOut: function(ev){
	    			swap.call(this, this, a, $.isFunction(o.onOut) ? o.onOut: $l.empty);
    			}
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

            $l(this).over({
                onHover: function(ev){
                    $.isFunction(o.onHover) ? o.onHover.call(this, this, ev): $l.empty;
                    $(this).fadeTo(o.speed, o.opacity, o.onComplete ? o.onComplete : $l.empty);
                },
                onOut: function(ev) {
                    $.isFunction(o.onOut) ? o.onOut.call(this, this, ev): $l.empty;
                    $(this).fadeTo(o.speed, 1, o.onComplete ? o.onComplete : $l.empty);
                }
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
 * page scroller
 *
 * @param  options  Object
 *          easing: required jQuery.easing plugin. default swing
 *          speed: scrolling animation speed
 *          onScrollEnd: scroll complete callback
 *          onStep: scrolling step callback
 */
(function($l){
    $l.fn.scroller = function(settings) {
        var scrollElement = $.browser.webkit ? $("body"): $("html");

        return this.each(function(){
            var o = $.extend({}, {
                easing: "swing",
                speed: 1500
            }, settings || {});
            $(this).bind("click", function(ev){
                var self = $(this),
                    of = $(self.attr("href")).offset();

                scrollElement.animate({
                    scrollTop: of.top,
                    scrollLeft: of.left
                }, {
                    queue: false,
                    easing: o.easing,
                    duration: o.speed
                });

                ev.preventDefault();
            });
        });
    };
})(laquu);


/**
 * stripe table
 *
 * @param  elems      jQuery HTML Collection Object
 * @param  options    Object
 *         stripeCount: stripe display show count
 *         stripeClass: stripe class array
 *         onHover: hover action callback
 *         onOut: mouseout callback
 */
(function($l){
    $l.fn.stripe = function(settings) {
        var o = $.extend({
            stripeCount: 2,
            stripeClass: ["even", "odd"],
            onHover: $l.empty,
            onOut: $l.empty
        }, settings || {});

        return this.each(function(i){
            $l(this).addClass(o.stripeClass[i%o.stripeCount]).over({
                onHover: o.onHover,
                onOut: o.onOut
            });
        });
    };
})(laquu);


/**
 * simple tab panel
 *
 * @param settings   Object
 *          activeTabClass: active tab panel class attribute
 *          onChange: tab on change call back
 *          triggerTabNum; triggerd tab number
 */
(function($l){
    $l.fn.tab = function(settings) {
        var defaults = {
            activeTabClass: "active",
            onChange: $l.empty,
            triggerTabNum: 0
        };

        return this.each(function(){
            var self = $(this), tabs = self.find("li"), panels,
                o = $.extend({}, defaults, settings || {});

            tabs.each(function(){
                var i = $($("a", this).attr("href"), self);
                if(panels)
                    panels = panels.add(i);
                else
                    panels = i;
            }).find("a[href*=#]").bind("click", function(ev){
                tabs.removeClass(o.activeTabClass).find("a[href="+ev.target.hash+"]").parent().addClass(o.activeTabClass);
                var p = panels.hide().parent().find(ev.target.hash);
                p.show();

                if($.isFunction(o.onChange))
                    o.onChange.call(this, this, p);

                ev.preventDefault();
            });

            if(tabs.size() < o.triggerTabNum)
                o.triggerTabNum = 0;

            $("a", tabs.get(o.triggerTabNum)).trigger("click");
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
    $l.fn.ticker = function(settings){
        return this.each(function(){
            var self = $(this), isStarted = false, current = 0, timer = null, items = self.children();
            var o = $l.extend({}, {
                speed: 1000,
                duration: 2000,
                onShow: $l.empty
            }, settings || {});


            function tween() {
                ++current;
    
                if(current >= items.size()) {
                    current = 0;
                }
    
                // 次の要素を取得する
                var item = items.get(current);
                self.animate({
                    top: "-" + item.offsetTop,
                    left: item.offsetLeft
                }, {
                    queue: false,
                    duration: o.speed,
                    complete: function() {
                         var i = (current === 0) ? items.size(): current;
                        $l(items[i -1]).appendTo(self);
                        self.css({ top: 0, left: 0 });

                        if($l.isFunction(o.onShow))
                            o.onShow.call(items[i -1], items[i -1]);
                    }
                });
            }

    
            function start() {
                if(!isStarted) {
                    isStarted = true;
                    timer = setInterval(function(){
                        tween();
                    }, o.duration + o.speed);
                }
            }


            function stop() {
                if(isStarted) {
                    isStarted = false;
                    clearInterval(timer);
                    timer = null;
                }
            }


            self.parent().css("position", "relative").end().css({
                position: "absolute",
                top: 0,
                left: 0,
            }).hover(stop, start);

            start();
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
    var uuid = function() {
        var uid = 0;
        return function(){ return ++uid; };
    }();


    $l.fn.tooltip = function(settings) {
        this.each(function(){
            var o = $.extend({}, {
                distX: 0,
                distY: -20,
                onShow: $l.empty,
                onHide: $l.empty,
                onMove: $l.empty
            }, settings || {});

            function createTooltipContainer() {
                return $l('<div id="laquu-tooltip-container'+ uuid() +'" class="laquu-tooltip-container"></div>')
                            .appendTo("body")
                            .css({ position: "absolute", display: "none", top: 0, left: 0 });
            }
        
        
            function showTooltip(ev) {
                var container = createTooltipContainer(),
                    self = $(this),
                    outerHeigh,
                    outerWidth;

                container.text(self.attr("title"));
                containerHeight = o.distY - Math.floor(container.outerHeight() / 2);
                containerWidth  = o.distX - Math.floor(container.outerWidth() / 2);

                container.css({
                    top: ev.pageY - Math.floor(self.outerHeight() / 2) + ( o.distY - Math.floor(container.outerHeight() / 2) ),
                    left: ev.pageX - Math.floor(self.outerWidth() / 2) + ( o.distX - Math.floor(container.outerWidth() / 2) )
                }).stop(true, true).fadeIn("fast", function(){
                    if($.isFunction(o.onShow))
                        o.onShow.call(this, this);
                });

                self.mousemove(function(ev){
                    container.css({
                        top: ev.pageY - Math.floor(self.outerHeight() / 2) + ( o.distY - Math.floor(container.outerHeight() / 2) ),
                        left: ev.pageX - Math.floor(self.outerWidth() / 2) + ( o.distX - Math.floor(container.outerWidth() / 2) )
                    });
                });
            }


            function hideTooltip(ev) {
                $(this).unbind("mousemove");
                $(".laquu-tooltip-container").fadeOut("fast", function(){
                    $(this).remove();

                    if($.isFunction(o.onHide))
                        o.onHide.call(this, this);
                });
            }

            $(this).hover(showTooltip, hideTooltip);
        });
    };
})(laquu);