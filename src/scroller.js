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

            $l(this).click(function(ev){
                var self = $l(this),
                    of = $l(self.attr("href")).offset();

                var scrollPos = {
                    scrollTop: of.top,
                    scrollLeft: of.left
                };

                // safari6では現在バグが残っているため、
                // ブラウザバージョンの差異を吸収させるため、leftオプションは
                // safari6では無効になるようにした
                if($.browser.webkit && navigator.appVersion) {
                    if(navigator.appVersion.match(new RegExp("Version/6.0"))) {
                        delete scrollPos.scrollLeft;
                    }
                }

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
    };
})(laquu);
