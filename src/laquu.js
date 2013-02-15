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
            isIE: navigator.userAgent.match(/msie/),
            isAndroid: navigator.userAgent.match(/Android/),
            isAndoirdMobile: navigator.userAgent.match(/Android(.*?)Mobile/),
            isiPhone: navigator.userAgent.match(/iPhone/),
            isiPod: navigator.userAgent.match(/iPod/),
            isiPad: navigator.userAgent.match(/iPad/)
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
        blackoutScroll: function(option) {
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



