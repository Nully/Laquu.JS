/**
 * パンくずプラグイン
 *
 * オプション
 *   timer: パンくずがアニメーションするまでの時間
 *   animTime: パンくずがアニメーションする時間
 *   isVertical: 縦もしくは横のアニメーションを指定
 *   not: アニメーションさせたくない要素のCSSセレクタ
 *   lastItemClass: パンくずの最後の要素に付けるクラス名
 *   easing: イージング（jQuery.easingが必要）
 *   onComplete: 各パンくずがアニメーション終了後に呼び出されるコールバック関数
 *   onStep: 各パンくずのステップ実行時に呼び出されるコールバック関数
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
            var o = $l.extend({}, defaults, options || {}),
                _this = $l(this),
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
                self = $l(this);

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
                    current_item = $l(items.get(current - 1));

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

                    if($l.isFunction(o.onComplete))
                        o.onComplete.apply(current_item);
                };

                if($l.isFunction(o.onStep))
                    opts.onStep = o.onStep;

                if($l.easing && o.easing && $l.easing[o.easing])
                    opts.easing = o.easing;

                current_item.show().animate(params, opts);

                ++current;
                if(isStop) clearInterval(timer);
            }, o.timer);
        });
    };
})(laquu);