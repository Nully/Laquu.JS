/**
 * バブルポッププラグイン
 *
 * オプション
 *   easing: イージング（jQuery.easingが必要）
 *   distance: ポップアップの初期位置
 *   hideDelay: 非表示になるまでのインターバル
 *   popupClass: ポップアップさせる要素のクラス名
 *   triggerClass: ポップアップを表示させるトリガーのクラス名
 *   onShow: ポップアップが表示された際に呼び出されるコールバック関数
 *   onHide: ポップアップが非表示になった際に呼び出されるコールバック関数
 *   onStep: ステップ実行時に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.bubblepopup = function(settings) {
        var defaults = {
            easing: "swing",
            distance: 40,
            step: 30,
            hideDelay: 1500,
            popupClass: ".popup",
            triggerClass: ".trigger",
            onShow: $l.empty,
            onHide: $l.empty
        };

        return this.each(function(){
            var o = $l.extend({}, defaults, settings || {}),
                self = $l(this),
                popup = self.find(o.popupClass),
                trigger = self.find(o.triggerClass),
                popupPos = "-" + (o.distance + popup.outerHeight()) + "px",
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
                    top: "+=" + o.step
                }, {
                    queue: false,
                    easing: o.easign,
                    duration: o.duration,
                    complete: function() {
                        isShow = true;
                        isStarted = false;
                        o.onShow.call(this, popup, trigger);
                    }
                });
            }

            function hideBubble() {
                stopTimer();
                timer = setTimeout(function(){
                    popup.stop(true, true).animate({
                        top: "-=" + o.step,
                        opacity: 0
                    }, {
                        queue: false,
                        easing: o.easing,
                        duration: o.duration,
                        complete: function() {
                            isShow = false;
                            isStarted = false;
                            popup.hide();
                            o.onHide.call(this, popup, trigger);
                        }
                    });
                }, o.hideDelay);
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

            trigger.add(popup).bind("mouseover", showBubble).bind("mouseout", hideBubble);
        });
    };
})(laquu);