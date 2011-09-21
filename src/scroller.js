/**
 * スクローラープラグイン
 *
 * @since: ver.1.0.0
 * @オプション
 *   easing: イージング（jQuery.easingプラグインが必要）
 *   speed: スクロールスピード
 *   onComplete: スクロール完了時に呼び出されるコールバック関数
 *   onStep: ステップ実行時に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.scroller = function(settings) {
        var scrollElement = $.browser.webkit ? $l("body"): $l("html");

        return this.each(function(){
            var o = $l.extend({}, {
                easing: "swing",
                speed: 1500,
                onComplete: $l.empty,
                onStep: $l.empty
            }, settings || {});
            $l(this).bind("click", function(ev){
                var self = $l(this),
                    of = $l(self.attr("href")).offset();

                scrollElement.animate({
                    scrollTop: of.top,
                    scrollLeft: of.left
                }, {
                    queue: false,
                    easing: o.easing,
                    duration: o.speed,
                    step: o.onStep,
                    complete: o.onComplete
                });

                ev.preventDefault();
            });
        });
    };
})(laquu);
