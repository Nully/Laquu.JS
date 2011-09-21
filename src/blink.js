/**
 * ブリンクプラグイン
 *
 * オプション:
 *   opacity: マウスを載せたときに下げる透明度
 *   onComplete: 透明度が1に戻った際に呼び出されるコールバック関数
 *   onMouseOver: マウスがのっかったときに呼び出されるコールバック関数
 */
(function($l){
    var defaults = {
        opacity: .65,
        onComplete: $l.empty,
        onMouseOver: $l.empty
    };

    $l.fn.blink = function(settings) {
        var o = $l.extend({}, defaults, settings || {});
        return this.each(function(){
            $l(this).bind("mouseover", o.onMouseOver).bind("mouseover", function(ev){
                $l(this).stop(true, true).css("opacity", o.opacity).animate({ opacity: 1 }, {
                    queue: false,
                    conplete: o.onComplete
                });
            });
        });
    };
})(laquu);
