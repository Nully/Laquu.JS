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
         * Laquuプラグインを構築する
         */
        forge: function(fn, op) {
            L.accordion.call(this, op);
            // L.accordion.apply(this, arguments);
        },
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



