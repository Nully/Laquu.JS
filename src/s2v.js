/**
 * スクロール2ビュープラグイン
 *
 * @required: [ blackoutScroll, scroller ]
 * @since: ver1.1.0
 * @オプション
 *  detectTop: 表示を検出する縦位置
 *  fadeSpeed: フェードインのアニメーション速度
 *  scrollType: スクロールタイプ（defaultかblackout）
 *  scrollOptions: 各スクローラーに見合ったオプション
 */
(function($l){
    $l.fn.s2v = function(options) {
        var o = $l.extend({}, {
            detectTop: 300,
            fadeSpeed: 200,
            scrollType: "default",
            scrollOptions: {
            }
        }, options || {});
        return this.each(function(){
            var $t = $l(this), trigger;

            $t.hide();
            trigger = $t.find("a");
            if(trigger.size()) {
                if(o.scrollType.toLowerCase() === "blackout") {
                    trigger.blackoutScroll(o.scrollOptions);
                }
                else {
                    trigger.scroller(o.scrollOptions);
                }
            }

            $l(window).scroll(function(){
                var $w = $l(this);
                if($w.scrollTop() > o.detectTop) {
                    $t.fadeIn(o.fadeSpeed);
                }
                else {
                    $t.fadeOut(o.fadeSpeed);
                }
            });
        });
    };
})(laquu);
