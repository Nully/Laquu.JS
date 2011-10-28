/**
 * ニュースティッカープラグイン
 *
 * @since: ver1.0.0
 * @オプション
 *   speed: ティッカーのアニメーション速度
 *   duration: ティッカーがアニメーションするまでのインターバル
 *   onShow: ティッカーが表示された際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.ticker = function(settings){
        return this.each(function(){
            var self = $l(this), isStarted = false, current = 0, timer = null, items = self.children();
            var o = $l.extend({}, {
                speed: 1000,
                duration: 2000,
                onShow: $l.empty,
                onHide: $l.empty
            }, settings || {});

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
                        $l(items[i -1]).appendTo(self);
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
    };
})(laquu);
