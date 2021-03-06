/**
 * jQuery plugin laquu.
 *
 * @Auth    Nully
 * @Url
 * @Make    10/04/26(Mon)
 * @Version  2.0.0
 * @License MIT Lincense
 * The MIT License
 *
 * Copyright (c) 2010 - 2013 <copyright Nully>
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
(function($, _w){
    "use strict";

    var L = $.laquu = function() {
        // L.forge(this, arguments);
    };

    $.extend(L, {
        version: '2.0.0',
        device: {
            isWebkit: ($.support.checkOn === false ? true: false),
            isIE6: ($.support.leadingWhitespace == false && $.support.tbody == false && /MSIE 6.0/.test(navigator.userAgent)),
            isIE7: ($.support.leadingWhitespace == false && $.support.tbody == false && /MSIE 7.0/.test(navigator.userAgent)),
            isIE8: ($.support.leadingWhitespace == false && $.support.tbody == true),
            isIE9: ($.support.leadingWhitespace == true && $.support.tbody == true),
            isFirefox: ($.support.checkOn == true && /Firefox/.test(navigator.userAgent)),
            isOpera: ($.support.checkOn == true && /Opera/.test(navigator.userAgent))
        },
        /**
         * 絶対パスへ変換する
         * 
         * @param p string
         */
        toAbsPath: function(p) {
            var _ = document.createElement("span").innerHTML = '<a href="'+ p +'"></a>';
            return _.firstChild.href;
        },
        /**
         * 中身を展開する（デバッグ用）
         */
        dump: function() {
            if(console && console.log) {
                console.log(arguments);
            }
        },
        /**
         * 空関数
         */
        empty: function() {},
        /**
         * 例外を投げる
         * @param msg string メッセージ
         */
        error: function(msg) {
            throw msg;
        },
        /**
         * 警告文を表示する
         * @param msg string メッセージ
         */
        notice: function(msg) {
            alert(msg);
        },
        /**
         * ランダムな数と文字列を合体させたUIDを取得する
         * 
         * @param len int 長さ
         */
        uid: function(len) {
            return Math.ceil(Math.random(1, 1000) * 1000);
        },
        /**
         * 引数以下のバージョンかを調べる
         * 
         * @return bool
         */
        versionLessThan: function(v) {
        },
        /**
         * 引数以上のバージョンかを調べる
         * 
         * @return bool
         */
        versionOverThan: function(v) {
        },
        /**
         * Laquuプラグインを構築する
         */
        forge: function(fn, op) {
            if(!$.isFunction(L[fn]))
                return L.notice("プラグイン "+ fn +" はLaquuには登録されていません。");

            L[fn].call(this, op);
            // L.accordion.call(this, op);
            // L.accordion.apply(this, arguments);
        },
        /**
         * アコーディオンプラグイン
         * 
         * @param option Object
         *        selected: bool or int    洗濯済みパネル
         *        currentClass: string     洗濯済みクラス
         *        speed: int               アニメーションスピード
         *        easing: string           アニメーションのイージング
         *        onHide: function         消えた際のコールバック関数
         *        onShow: function         表示された際のコールバック関数
         */
        accordion: function(option) {
            var options = $.extend({
                selected: false,
                currentClass: "current",
                speed: 300,
                easing: "swing",
                onHide: L.empty,
                onShow: L.empty
            }, option || {}),
            $t = $(this),
            targets = $t.find("a[href^=#]"),
            panels;
            targets.each(function() {
                var $p = $($(this).attr("href")).hide();
                panels ? (panels = panels.add($p)) : panels = $p;
            }).click(function(ev){
                var hash = ev.currentTarget.hash,
                    panel = $(hash);

                if(panel.is(":visible"))
                    return ev.preventDefault();

                // クラスを除去する
                targets.removeClass(options.currentClass).filter("[href="+ hash +"]").addClass(options.currentClass).end();

                // パネルの開閉
                panels.not(hash).slideUp({
                    duration: options.speed,
                    easing: options.easing,
                    complete: $.isFunction(options.onHide) ? options.onHide: L.empty
                }).end().filter(hash).slideDown({
                    duration: options.speed,
                    easing: options.easing,
                    complete: $.isFunction(options.onShow) ? options.onShow: L.empty
                });
                ev.preventDefault();
            });

			if(options.selected != false && typeof options.selected == "number") {
				$(targets.get(options.selected)).trigger("click");
            }
            else {
				$(targets.get(0)).trigger("click");
            }
        },
        /**
         * ブラックアウトスクロール
         * 
         * @param option
         *   overlayColor: オーバーレイの色（16進数）
         *   speed: エフェクトのスピード
         *   onShow: オーバーレイ表示時のコールバック
         *   onHide: オーバーレイ非表示時のコールバック
         *   @return void
         */
        blackoutscroll: function(option) {
            var options = $.extend({
                overlayColor: "#000000",
                speed: 300,
                onShow: L.empty,
                onHide: L.empty
            }, option || {}), d = $(document), w = $(window), b;

            // オーバーレイの作成
            if(!b) {
                b = $('<div class="laquu_blackout_scroller_overlay'+ L.uid() +'" />').appendTo("body").hide().css({
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 100000
                });
            }

            // イベントを登録
            this.on("click", function(ev){
                var $scrollTarget = $($(this).attr("href"));

                // 対象が1個以上ある場合は普通のリンク動作を行わせる
                if($scrollTarget.length < 1) return true;

                b.css({
                    background: options.overlayColor,
                    width: d.width(),
                    height: d.height()
                }).fadeIn(options.speed, function(){
                    $.isFunction(options.onShow) ? options.onShow.call($scrollTarget, $scrollTarget, b): L.empty();

                    var offset = $scrollTarget.offset();
                    w.scrollTop(offset.top).scrollLeft(offset.left);

                    b.fadeOut(options.speed, function(){
                        $.isFunction(options.onHide) ? options.onHide.call($scrollTarget, $scrollTarget, b): L.empty();
                        b.hide().css({ top: 0, left: 0, width: 0, height: 0 });
                    });
                });
                ev.preventDefault();
            });
        },
        /**
         * ブランクプラグイン
         */
        blank: function() {
            this.each(function(){
                $(this).attr("target", "_blank");
            });
        },
        /**
         * ブリンクプラグイン
         * 
         * @param object option
         *   opacity: 要素の透明度
         *   speed: アニメーション速度
         *   onComplete: アニメーション完了時のコールバック
         *   onHover: マウスオーバー時のコールバック
         *   onOut: マウスアウト時のコールバック
         */
        blink: function(option) {
            var options = $.extend({
                opacity: .65,
                speed: 100,
                onComplete: L.empty,
                onHover: L.empty,
                onOut: L.empty
            }, option || {});

            return this.each(function(){
                var $t = $(this);
                $t.on("mouseover", options.onHover).on("mouseout", options.onOut);
                $t.on("mouseover", function(ev){
                    $(this).stop(true, true).css("opacity", options.opacity).animate({ opacity: 1 }, {
                        duration: options.speed,
                        queue: false,
                        complete: options.onComplete
                    });
                });
            });
        },
        /**
         * パンくずプラグイン
         * 
         * @param option object
         *   timer: アニメーションインターバル時間（ms）
         *   animTime: アニメーション速度（ms）
         *   isVertical: アニメーション方向 trueを指定すると縦方向に
         *   not: アニメーションさせない要素のCSSセレクタ
         *   lastItemClass: パンくずの最後に付くクラス
         *   easing: アニメーションイージング
         *   onComplete: アニメーション完了時のコールバック
         *   onStep: アニメーション実行ごとのコールバック
         */
        breadcrumb: function(option) {
            var options = $.extend({
                timer: 100,
                animTime: 50,
                isVertical: false,
                not: null,
                lastItemClass: "breadcrumb-last",
                easing: null,
                onComplete: L.empty,
                onStep: L.empty
            }, option || {});

            return this.each(function(){
                var $t = $(this),
                    items = $t.children(),
                    itemSize = items.size(),
                    current = 1,
                    timer = null,
                    isStop = false;

                $t.css({
                    position: "relative",
                    height: $t.innerHeight(),
                    overflow: "hidden"
                });

                // set children item css
                items.filter(":not(" + options.not + ")").each(function(i, e) {
                    var p = {
                        position: "absolute", top: 0, left: 0, zIndex: itemSize - i
                    },
                    self = $(this);

                    if(options.isVertical) {
                        var left = 0;
                        if(self.prev().size() != 0) {
                            left = self.prev().outerWidth({ margin: true }) + parseInt(self.prev().css("left").replace("px", ""));
                        }
                        p.left = left;
                        p.top = "-" + $t.outerHeight() + "px";
                    }
                    self.addClass("breadcrumb-items breadcrumb-item"+i).css(p);

                    return this;
                }).not(":first").hide();

                items.last().addClass(options.lastItemClass);

                if(options.timer < 50)
                    options.timer = 50;

                // reset interval timer.
                options.timer = options.timer + options.animTime;

                timer = setInterval(function(){
                    var params = {},
                        opts = {},
                        current_item = $(items.get(current - 1));

                    params.queue = false;
                    params.top = 0;
                    opts.duration = options.animTime;

                    if(options.isVertical) {
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
                        if(options.isVertical)
                            current_item.css("top", params.top);
                        else
                            current_item.css("left", params.left);

                        if($.isFunction(options.onComplete))
                            options.onComplete.apply(current_item);
                    };

                    if($.isFunction(options.onStep))
                        opts.step = options.onStep;

                    if($.easing && options.easing && $.easing[options.easing])
                        opts.easing = options.easing;

                    current_item.show().animate(params, opts);

                    ++current;
                    if(isStop) clearInterval(timer);
                }, options.timer);
            });
        },
        /**
         * バブルポッププラグイン
         * 
         * @param option object
         *   easing: アニメーションイージング
         *   distance: 要素までの距離
         *   step: 要素までのステップ数
         *   hideDelay: 消えるまでのインターバル
         *   popupClass: ポップアップさせる要素のクラス名
         *   triggerClass: ポップアップを起動する要素のクラス名
         *   onShow: ポップアップが表示されきった際のコールバック
         *   onHide: ポップアップが非表示になった際のコールバック
         */
        bubblepop: function(option) {
            var options = $.extend({
                easing: "swing",
                distance: 40,
                step: 30,
                hideDelay: 1500,
                popupClass: ".popup",
                triggerClass: ".trigger",
                onShow: L.empty,
                onHide: L.empty
            }, option || {});

            return this.each(function(){
                var self = $(this),
                    popup = self.find(options.popupClass),
                    trigger = self.find(options.triggerClass),
                    popupPos = "-" + (options.distance + popup.outerHeight()) + "px",
                    isShow = false,
                    isStarted = false,
                    timer = null;


                function stopTimer() {
                    if(timer) {
                        clearTimeout(timer);
                        timer = null;
                    }
                }

                function showBubble() {
                    stopTimer();
                    if(isShow || isStarted) return;

                    isStarted = true;
                    popup.stop(true, true).css({ top: popupPos, display: "block" }).animate({
                        opacity: 1,
                        top: "+=" + options.step
                    }, {
                        queue: false,
                        easing: options.easign,
                        duration: options.duration,
                        complete: function() {
                            isShow = true;
                            isStarted = false;
                            options.onShow.call(this, popup, trigger);
                        }
                    });
                }

                function hideBubble() {
                    stopTimer();
                    timer = setTimeout(function(){
                        popup.stop(true, true).animate({
                            top: "-=" + options.step,
                            opacity: 0
                        }, {
                            queue: false,
                            easing: options.easing,
                            duration: options.duration,
                            complete: function() {
                                isShow = false;
                                isStarted = false;
                                popup.hide();
                                options.onHide.call(this, popup, trigger);
                            }
                        });
                    }, options.hideDelay);
                }

                self.css("position", "relative");
                popup.hide().css({
                    opacity: 0,
                    position: "absolute"
                });

                popup.css({
                    left: ( Math.floor(trigger.outerWidth() / 2) - Math.floor(popup.outerWidth() / 2)),
                    top: popupPos
                });

                trigger.add(popup).on("mouseover", showBubble).on("mouseout", hideBubble);
            });
        },
        /**
         * クリアオーバープラグイン
         * 
         * @param option object
         *   opacity: 透明度
         *   speed: アニメーション速度
         *   onComplete: アニメーション完了時のコールバック
         *   onHover: マウスオーバー時のコールバック
         *   onOut: マウスアウト時のコールバック
         */
        clearover: function(option) {
            var options = $.extend({
                opacity: .7,
                speed: 300,
                onComplete: L.empty,
                onHover: L.empty,
                onOut: L.empty
            }, option || {});

            return this.each(function(){
                $(this).laquu("over", {
                    onHover: function(ev){
                        $.isFunction(options.onHover) ? options.onHover.call(this, this, ev): $.empty;
                        $(this).stop(true, true).fadeTo(options.speed, options.opacity, options.onComplete ? options.onComplete : $.empty);
                    },
                    onOut: function(ev) {
                        $.isFunction(options.onOut) ? options.onOut.call(this, this, ev): $.empty;
                        $(this).stop(true, true).fadeTo(options.speed, 1, options.onComplete ? options.onComplete : $.empty);
                    }
                });
            });
        },
        /**
         * ドロップダウン
         * 
         * @param object option
         *   hoverClass: マウスオーバー時のコールバック
         *   showSpeed: 表示速度
         *   hideSpeed: 非表示速度
         *   hideTime: 消えるまでの遅延時間
         *   onShow: 表示時のコールバック
         *   onHide: 非表示時のコールバック
         */
        dropdown: function(option) {
            var options = $.extend({
                hoverClass: "hover",
                showSpeed: 200,
                hideSpeed: 400,
                hideTime: 100,
                onShow: L.empty,
                onHide: L.empty
            }),
            css = {
                display: "none",
                position: "absolute"
            };

            return this.each(function(){
                var root =$(this), zIndex = 1000;

                $(this).find("li").filter(function(){
                    var ul = $("ul", this),
                        $t = $(this);

                    if(ul.size()) {
                        ul.hide().parent("li").laquu("over", {
                            hoverClass: options.hoverClass,
                            onHover: function(){
                                var _s = $(this);
                                _s.children("ul:not(:animated)").css("z-index", ++zIndex).slideDown(options.showSpeed, function(){
                                    if($.isFunction(options.onShow))
                                        options.onShow.call(this);

                                    $(this).css("overflow", "visible");
                                });
                            },
                            onOut: function() {
                                var _t = $(this);
                                setTimeout(function(){
                                    _t.children("ul").slideUp(options.hideSpeed, function(){
                                        if($.isFunction(options.onHide))
                                            options.onHide.call(this);

                                        $(this).css("overflow", "hidden");
                                    });
                                }, options.hideTime);
                            }
                        });
                    }
                });
            });
        },
        /**
         * イーキューヘイトプラグイン
         * 
         * @param int min 最小高さ
         * @param int max 最高高さ
         * @param bool enableOverflow overflowの可否
         */
        eqheight: function(option) {
            var tmp = 0,
                options = $.extend({
                    min: null,
                    max: null,
                    enableOverflow: false
                }, option || {});

             if(L.device.isIE6) enableOverflow = true;

            this.each(function(){
                var _h = $(this).height();
                if(tmp < _h) {
                    tmp = _h;
                }
            });

            // 最小値及び最大値での割合を出す
            if(options.min != null) tmp = options.min;
            if(options.max != null) tmp = options.max;

            // overflowの設定
            if(options.enableOverflow) this.css("overflow", "auto");

            return this.height(tmp);
        },
        /**
         * 拡張子アイコンプラグイン
         * 
         */
        exticon: function(option) {
            var o = $.extend({}, {
                prefix: "icon-"
            }, option || {});

            return this.each(function(){
                var $t = $(this), href, tmp, ext;

                if(!$t.attr("href") && !(/\./.test($t.attr("href")))) return true;

                href = $t.attr("href");
                tmp = href.split(".");
                ext = tmp.pop();

                if(!ext) return true;

                $t.addClass(o.prefix ? o.prefix + ext: ext);
            });
        },
        /**
         * フォントサイズプラグイン
         */
        fontsize: function(option) {
            var defaults = {
                onChange: L.empty,
                cookie: {expires: 7, path: "/", domain: "", secure: false}
            };

            return this.each(function(){
                var opts = $.extend({}, defaults, option || {}),
                    elements = $("a", this),
                    body = $(opts.target),
                    classes = $.map(elements, function(e, i){
                        return $(e).attr("href").replace("#", "");
                    }).join(" ");

                elements.bind("click", function(ev){
                    var size = $(this).attr("href").replace("#", "");
                    $("body").removeClass(classes).addClass(size);

                    if($.isFunction(opts.onChange))
                        opts.onChange.call(this, elements, size);

                    if($.cookie)
                        $.cookie("laquu_font-size", size, opts.cookie);

                    ev.preventDefault();
                });

                if($.cookie)
                    body.addClass($l.cookie("laquu_font-size"));
            });
        },
        /**
         * インクリメンタルサーチプラグイン
         * 
         */
        ics: function(option) {
            var setting = $.extend({
                target: 'table tr',
                on: 'keyup',
                callback: L.emtpy
            }, option || {});

            function quote(str) {
                return str.replace(new RegExp(/(\W)/), '\\$1');
            }

            var elements = $(setting.target);
            $(this).bind(setting.on, function(){
                var self = $(this),
                    keyword = self.val(),
                    keywords = keyword.split(new RegExp(/\s/)),
                    i;

                // 検索文字がない場合はすべての要素を表示
                if(keyword.length == 0) {
                    elements.show();
                    return;
                }

                elements.each(function(){
                    var s = $(this);
                    s.show();
                    // or 検索の為、半角スペースで文字列を切り出し、文字列分ループして一致を
                    for(i in keywords) {
                        if(keywords[i].length == 0)
                            continue;

                        var pattern = quote(keywords[i]);
                        if(!s.text().replace(new RegExp(/\s/g), "").match(pattern)) {
                            s.hide();
                        }

                        // 強調表示などはユーザーでやってもらうのです！
                        if($.isFunction(setting.callback))
                            setting.callback.call(self, elements, pattern);
                    }
                });
            });
        },
        /**
         * イメージオーバープラグイン
         */
        imageover: function(option) {
            var defaults = {
                suffix: "_on",
                onHover: L.empty,
                onOut: L.empty,
                onImageLoaded: L.empty
            };

            function swap(e, s, c) {
                e.src = s;
                c.call(e, e);
            }

            return this.each(function(i, e){
                var o = $.extend({}, defaults, option || {}),
                    a = this.src,
                    b,
                    ext,
                    overImage = new Image();

                b = this.src.split(".");
                ext = b.pop();
                b = b.join(".") + o.suffix + "." + ext;

                // プリロード
                overImage.src = b;
                if($.isFunction(o.onImageLoaded)) {
                    overImage.onload = o.onImageLoaded;
                }

                $(this).laquu("over", {
                    onHover: function(ev){
                        swap.call(this, this, b, $.isFunction(o.onHover) ? o.onHover: L.empty);
                    },
                    onOut: function(ev){
                        swap.call(this, this, a, $.isFunction(o.onOut) ? o.onOut: L.empty);
                    }
                });
            });
        },
        /**
         * インナースライドプラグイン
         */
        innerslide: function(option) {
            var defaults = {
                innerSlideClass: ".laquu-innerslide",
                showSpeed:300,
                hideSpeed:200,
                easing:"swing",
                slideIn:"bottom",
                onShowComplete: L.empty,
                onHideComplete: L.empty
            };

            return this.each(function() {
                var t = $(this), slider, sliderCss, o = $.extend({}, defaults, option || {});

                slider = t.find(o.innerSlideClass);
                sliderCss = (function(type) {
                    var _over, _out;
                    switch(type) {
                        case "top":
                            _over = { top: 0, left:0 };
                            _out  = { top: parseInt("-" + slider.outerHeight()), left: 0 };
                            break;
                        case "right":
                            _over = { top: 0, right: 0 };
                            _out  = { top: 0, right: parseInt( "-" + slider.outerWidth()) };
                            break;
                        case "bottom":
                            _over = { top: 0, left: 0 };
                            _out  = { top: parseInt(slider.outerHeight()), left: 0 };
                            break;
                        case "left":
                            _over = { top: 0, right: 0 };
                            _out  = { top: 0, right: parseInt(slider.outerWidth()) };
                            break;
                        case "top-right":
                            _over = { top: 0, left: 0 };
                            _out =  { top: parseInt("-" + slider.outerHeight()), left: parseInt(slider.outerWidth()) };
                            break;
                        case "top-left":
                            _over = { top: 0, left: 0 };
                            _out =  { top: parseInt("-" + slider.outerHeight()), left: parseInt("-" + slider.outerWidth()) };
                            break;
                        case "bottom-right":
                            _over = { top: 0, right: 0 };
                            _out =  { top: parseInt(slider.outerHeight()), right: parseInt("-" + slider.outerWidth()) };
                            break;
                        case "bottom-left":
                            _over = { top: 0, right: 0 };
                            _out =  { top: parseInt(slider.outerHeight()), right: parseInt(slider.outerWidth()) };
                            break;
                    }
                    return { over: _over, out: _out };
                })(o.slideIn);

                slider.css(sliderCss.out);
                t.laquu("over", {
                    onHover: function(){
                        slider.stop(true,false).animate(sliderCss.over, {
                            queue: false,
                            easing: o.easing,
                            duration: o.showSpeed,
                            complete: o.onShowComplete
                        });
                    },
                    onOut: function() {
                        slider.stop(true,false).animate(sliderCss.out, {
                            queue: false,
                            easing: o.easing,
                            duration: o.hideSpeed,
                            complete: o.onHideComplete
                        });
                    }
                });
            });
        },
        /**
         * コナミコマンドプラグイン
         */
        konami: function(option) {
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
                    opts = $.extend({}, defaults, option || {});
                $(this).bind("keydown", function(ev){
                    stack.push(ev.keyCode);
                    if(stack.toString().indexOf(opts.cmd) >= 0) {
                        $(this).unbind("keydown");
                        opts.callback.call(this, this, ev, stack);
                    }
                });
            });
        },
        /**
         * オーバープラグイン
         * 
         * @param object option
         *   hoverClass: マウスオーバー時に付与するクラス名
         *   onHover: マウスオーバー時のコールバック
         *   onOut: マウスアウト時のコールバック
         */
        over: function(option) {
            var options = $.extend({
                hoverClass: "hover",
                onHover: L.empty,
                onOut: L.empty
            }, option || {});

            return this.each(function(i, e){
                $(this).hover(function(ev){
                    $(this).addClass(options.hoverClass);
                    if($.isFunction(options.onHover))
                        options.onHover.call(this, this, ev);
                }, function(ev){
                    $(this).removeClass(options.hoverClass);
                    if($.isFunction(options.onOut))
                        options.onOut.call(this, this, ev);
                });
            });
        },
        /**
         * ピックメニュープラグイン
         */
        picmenu: function(option) {
            var defaults = {
                showSize: 240,
                hideSize: 90,
                speed: 400,
                duration: 2000,
                easing: "swing",
                auto: false,
                isVertical: false,
                current: 0
            };

            return this.each(function(){
                var o = $.extend({}, defaults, option || {}),
                    self = $(this), items = null, current = 0, timer;

                function startTimer() {
                    timer = setInterval(function(){
                        autoRotate();
                    }, o.duration + o.speed);
                }

                function stopTimer() {
                    var t = $(this).parent();
                    items.each(function(i){
                        if($(this).hasClass(t.data("tag"))) {
                            current = (i+1);
                            return true;
                        }
                    });

                    clearInterval(timer);
                    timer = null;
                }

                function autoRotate() {
                    if(current >= items.size()) {
                        current = 0;
                    }

                    var prev = (current === 0) ? items.size() : current;
                    $(items.get(current)).trigger("mouseover");
                    $(items.get(prev - 1)).trigger("mouseout");
                    ++current;
                }

                function showImage(ev) {
                    items.not(ev.currentTarget).trigger("mouseout");
                    $(this).addClass("active").stop().animate( o.isVertical ? { height: o.showSize }: { width: o.showSize }, {
                        easing: o.easing,
                        queue: false,
                        duration: o.speed,
                        complete: o.complete
                    });
                }

                function hideImage(ev) {
                    $(this).removeClass("active").stop().animate( o.isVertical ? { height: o.hideSize }: { width: o.hideSize }, {
                        easing: o.easing,
                        queue: false,
                        duration: o.speed - 100,
                        complete: o.complete
                    });
                }

                // 各画像要素（Aタグ）にイベントをバインド
                items = self.find("a").css("overflow", "hidden");
                items.bind("mouseover", showImage).bind("mouseout", hideImage);
                items.trigger("mouseout");
                items.each(function(i){
                    i ++;
                    var name = "laquu-picmenu-item" + i;
                    $(this).data("tag", name).addClass(name);
                });

                // カレントが1以上であるなら、loopIndexの値として入れる
                if (o.current >= 1 && items.size() > 1) {
                    current = (o.current > items.size() ? items.size(): o.current);
                    $(items.get(current - 1)).trigger("mouseover");
                }

                // autoがあるならば、自動めくりを実行
                if(o.auto) {
                    startTimer();
                    self.find("img").bind("mouseover", stopTimer).bind("mouseout", startTimer);
                }
            });
        },
        /**
         * ポスフィックスプラグイン
         */
        posfix: function() {
            if(L.device.isIE6 === false)
                return this;

            var $w = $(window);
            this.css("position", "absolute");
            return this.each(function(){
                var $t = $(this),
                    o = {};

                function isUndefined(n) {
                    return typeof n == "undefined";
                }

                $.each([ "top", "right", "bottom", "left" ], function(i, prop){
                    if($t.css(prop) != "auto") {
                        o[prop] = parseInt($t.css(prop));
                    }
                });

                $w.bind("scroll", function(ev){
                    var pos = 0;
                    if(!isUndefined(o.top)) {
                        pos = $w.scrollTop() + o.top;
                    }
                    else if(!isUndefined(o.bottom)) {
                        pos = $w.scrollTop() + $w.height() - $t.outerHeight({ margin: true }) - o.bottom;
                    }

                    $t.css("top", pos);
                }).scrollTop(1).scrollTop(0);
            });
        },
        /**
         * スクロールトゥービュープラグイン
         */
        s2v: function(option) {
            var o = $.extend({}, {
                detectTop: 300,
                fadeSpeed: 200,
                scrollType: "default",
                scrollOptions: {}
            }, option || {});
            return this.each(function(){
                var $t = $(this), trigger;

                $t.hide();
                trigger = $t.find("a");
                if(trigger.size()) {
                    if(o.scrollType.toLowerCase() === "blackout") {
                        trigger.laquu("blackoutscroll", o.scrollOptions);
                    }
                    else {
                        trigger.laquu("scroller", o.scrollOptions);
                    }
                }

                $(window).scroll(function(){
                    var $w = $(this);
                    if($w.scrollTop() > o.detectTop) {
                        $t.filter(":not(:visible)").fadeIn(o.fadeSpeed);
                    }
                    else {
                        $t.filter(":visible").fadeOut(o.fadeSpeed);
                    }
                });
            });
        },
        /**
         * スクローラープラグイン
         */
        scroller: function(option) {
            var scrollElement = $("body,html");

            return this.each(function(){
                var o = $.extend({}, {
                    easing: "swing",
                    speed: 1500,
                    onComplete: L.empty,
                    onStep: L.empty
                }, option || {});

                $(this).click(function(ev){
                    var self = $(this),
                        of = $(self.attr("href")).offset();

                    var scrollPos = {
                        scrollTop: of.top,
                        scrollLeft: of.left
                    };

                    // safari6では現在バグが残っているため、
                    // ブラウザバージョンの差異を吸収させるため、leftオプションは
                    // safari6では無効になるようにした
                    /* if(L.device.isWebkit && navigator.appVersion) {
                        if(navigator.appVersion.match(new RegExp("Version/6.0"))) {
                            delete scrollPos.scrollLeft;
                        }
                    }*/

                    scrollElement.animate(scrollPos, {
                        queue: false,
                        easing: o.easing,
                        duration: o.speed,
                        step: o.onStep,
                        complete: o.onComplete
                    });

                    ev.preventDefault();
                });
            });
        },
        /**
         * ストライププラグイン
         */
        stripe: function(option) {
            var o = $.extend({
                stripeClass: ["even", "odd"],
                hoverClass: "hover",
                onHover: L.empty,
                onOut: L.empty
            }, option || {});

            return this.each(function(i){
                $(this).addClass(o.stripeClass[i%o.stripeClass.length]).laquu("over", {
                    hoverClass: o.hoverClass,
                    onHover: o.onHover,
                    onOut: o.onOut
                });
            });
        },
        /**
         * タブプラグイン
         */
        tab: function(options) {
            var defaults = {
                tabSelector: "#tabs",
                activeTabClass: "active",
                onChange: L.empty,
                triggerTabNum: 0,
                isAnimate: false
            };

            return this.each(function(){
                var o = $.extend({}, defaults, options || {}),
                    panels,
                    self = $(this),
                    tabGroup = self.find(o.tabSelector),
                    tabs = tabGroup.find("li");

                tabs.each(function(){
                    var i = $($("a", this).attr("href"), self);
                    if(panels)
                        panels = panels.add(i);
                    else
                        panels = i;
                }).find("a[href^=#]").bind("click", function(ev){
                    panels.hide();
                    tabs.removeClass(o.activeTabClass);
                    $(this).parent().addClass(o.activeTabClass);

                    var p = self.find($(this).attr("href")).show();

                    if($.isFunction(o.onChange))
                        o.onChange.call(this, this, p);

                    ev.preventDefault();
                });

                if(tabs.size() < o.triggerTabNum)
                    o.triggerTabNum = 0;

                $("a", tabs.get(o.triggerTabNum)).trigger("click");
            });
        },
        /**
         * ティッカープラグイン
         */
        ticker: function(options) {
            return this.each(function(){
                var self = $(this), isStarted = false, current = 0, timer = null, items = self.children();
                var o = $.extend({}, {
                    speed: 1000,
                    duration: 2000,
                    onShow: L.empty,
                    onHide: L.empty
                }, options || {});

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

                function tween() {
                    ++current;

                    if(current >= items.size()) {
                        current = 0;
                    }

                    var item = items.get(current);
                    self.animate({
                        top: parseInt("-" + item.offsetTop),
                        left: item.offsetLeft
                    }, {
                        queue: false,
                        duration: o.speed,
                        complete: function() {
                             var i = (current === 0) ? items.size(): current;
                            $(items[i -1]).appendTo(self);
                            self.css({ top: 0, left: 0 });
                            o.onShow.call(item, item);
                            o.onHide.call(items[i -1], items[i -1]);
                        }
                    });
                }

                self.parent().css("position", "relative").end().css({
                    position: "absolute",
                    top: 0,
                    left: 0
                }).bind("mouseover", stop).bind("mouseout", start);

                start();
            });
        },
        /**
         * トーストプラグイン
         * Androidの簡易通知機能の「Toast」をjQueryで実装したもの。
         * 使い方： $.laquu.toast();
         */
        toast: {
            LENGTH_SHORT: 800,
            LENGTH_LONG: 1800,
            _defaults: {
                message: "AndroidOS風のToastメッセージ通知です。",
                showTime: 2000,
                fadeTime: 800,
                position: "center-center"
            },
            _queues: [],
            isToasted: false,
            show: function(options) {
                var o = $.extend({}, this._defaults, options || {});
                if(this.isToasted === false) {
                    this.isToasted = true;

                    var toast = this._createToastContainer(o.message, o.position),
                        Toast = this;

                    toast.fadeIn(o.fadeTime, function(){
                        var timer = setTimeout(function(){
                            toast.fadeOut(o.fadeTime, function(){
                                toast.remove();
                                Toast.isToasted = false;
                                clearTimeout(timer);
                                if(Toast.hasQueue()) {
                                    Toast.show(Toast.getNextQueue());
                                }
                            });
                        }, o.showTime);
                    });
                }
                else {
                    this.pushQueue(o);
                }
            },
            /**
             * キューにメッセージを追加
             */
            pushQueue: function(options) {
                this._queues.push(options);
            },
            /**
             * 現在のキューから先頭を削除
             */
            dequeue: function() {
                if(this.hasQueue()) {
                    this._queues.shift();
                }
            },
            /**
             * 全てのキューを削除
             */
            dequeueAll: function() {
                this._queues.length = 0;
            },
            /**
             * 次の再生スるキューを取得
             */
            getNextQueue: function() {
                return this._queues.shift();
            },
            /**
             * キューが有るか調べる
             */
            hasQueue: function() {
                return (this._queues.length >= 1);
            },
            /**
             * トーストのコンテナーを生成
             */
            _createToastContainer: function(msg, position) {
                var toast = $('<div class="laquu-toast-container"><p class="laquu-toast-message">'+ msg +'</p></div>').hide().appendTo("body");

                var props = this._getToastPosition(position);
                props.position = "absolute";
                toast.css(props);

                return toast;
            },
            _getToastPosition: function(position) {
                // Objectならそのまま返却
                if(typeof position != "string") {
                    return position;
                }

                // 文字列なら、画面のどこに配置するかを決定する
                var $w = $(window),
                    pos = {},
                    toast = jQuery(".laquu-toast-container");
                switch(position) {
                    case "top-left":
                        pos.top = (toast.outerHeight(true) - toast.innerHeight()) / 2 + $w.scrollTop();
                        pos.left = (toast.outerWidth(true) - toast.innerWidth()) / 2 + $w.scrollLeft();
                        break;
                    case "top-center":
                        pos.top = (toast.outerHeight(true) - toast.innerHeight()) / 2 + $w.scrollTop();
                        pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                        break;
                    case "top-right":
                        pos.top = (toast.outerHeight(true) - toast.innerHeight()) / 2+ $w.scrollTop();
                        pos.left = $w.width() - (toast.outerWidth(true) * 2) + toast.innerWidth() + $w.scrollLeft();
                        break;
                    case "center-left":
                        pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                        pos.left = (toast.outerWidth(true) - toast.innerWidth()) / 2 + $w.scrollLeft();
                        break;
                    case "center-right":
                        pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                        pos.left = $w.width() - (toast.outerWidth(true) * 2) + toast.innerWidth() + $w.scrollLeft();
                        break;
                    case "bottom-left":
                        pos.top = $w.height() - (toast.outerHeight(true) * 2) + toast.innerHeight() + $w.scrollTop();
                        pos.left = (toast.outerWidth(true) - toast.innerWidth()) / 2 + $w.scrollLeft();
                        break;
                    case "bottom-center":
                        pos.top = $w.height() - (toast.outerHeight(true) * 2) + toast.innerHeight() + $w.scrollTop();
                        pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                        break;
                    case "bottom-right":
                        pos.top = $w.height() - (toast.outerHeight(true) * 2) + toast.innerHeight() + $w.scrollTop();
                        pos.left = $w.width() - (toast.outerWidth(true) * 2) + toast.innerWidth() + $w.scrollLeft();
                        break;
                    case "center-center":
                    default:
                        pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                        pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                        break;
                }

                return pos;
            }
        },

        /**
         * ツールチッププラグイン
         */
        tooltip: function(options) {
            this.each(function(){
                var o = $.extend({}, {
                    distX: 0,
                    distY: 25,
                    onShow: L.empty,
                    onHide: L.empty,
                    onMove: L.empty
                }, options || {}),
                $this = $(this),
                hasAlt = false;

                function createTooltipContainer() {
                    return $('<div id="laquu-tooltip-container'+ L.uid() +'" class="laquu-tooltip-container"></div>')
                                .appendTo("body")
                                .css({ position: "absolute", display: "none", top: 0, left: 0 });
                }

                function showTooltip(ev) {
                    var container = createTooltipContainer(),
                        self = $(this),
                        outerHeigh,
                        outerWidth;

                    if(hasAlt) {
                        self.removeAttr("alt");
                    }
                    self.removeAttr("title");
                    container.text(self.data("lq-tooltip-title"));
                    var containerHeight = Math.floor(container.outerHeight() / 2) + o.distY;
                    var containerWidth  = Math.floor(container.outerWidth() / 2) + o.distX;

                    container.css({
                        top: ev.pageY - containerHeight,
                        left: ev.pageX - containerWidth
                    }).stop(true, true).fadeIn("fast", function(){
                        o.onShow.call(this, this, self);
                    });

                    self.mousemove(function(ev){
                        container.css({
                            top: ev.pageY - containerHeight,
                            left: ev.pageX - containerWidth
                        });
                        o.onMove.call(this, container.get(0), self);
                    });
                }


                function hideTooltip(ev) {
                    var self = $(this);
                    self.unbind("mousemove");
                    self.attr("title", self.data("lq-tooltip-title"));
                    if(hasAlt) {
                        self.attr("alt", self.data("lq-tooltip-alt"));
                    }
                    $(".laquu-tooltip-container").fadeOut("fast", function(){
                        $(this).remove();
                        o.onHide.call(this, this, self);
                    });
                }

                if(typeof $this.attr("alt") !== "undefined") {
                    $this.data("lq-tooltip-alt", $this.attr("alt"));
                    hasAlt = true;
                }
                $this.data("lq-tooltip-title", $this.attr("title"));
                $this.hover(showTooltip, hideTooltip);
            });
        }
    });


    /**
     * Laquuの実行
     * 
     * @param fn string 実行するプラグイン名
     * @param options Object プラグインのオプション
     * @return jQuery Object
     */
    $.fn.laquu = function(fn, options) {
        L.forge.apply(this, arguments);
        return this;
    };
})(jQuery, this);



