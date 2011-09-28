/**
 * ブリンクプラグイン
 *
 * オプション:
 *   opacity: マウスを載せたときに下げる透明度
 *   speed: 透明度が元に戻るまでの所要時間（ms）
 *   onComplete: 透明度が1に戻った際に呼び出されるコールバック関数
 *   onOver: マウスがのっかったときに呼び出されるコールバック関数
 *   onOut: マウスが外れたときに呼び出されるコールバック関数
 */
(function($l){
    var defaults = {
        opacity: .65,
        speed: 100,
        onComplete: $l.empty,
        onHover: $l.empty,
        onOut: $l.empty
    };

    $l.fn.blink = function(settings) {
        var o = $l.extend({}, defaults, settings || {});
        return this.each(function(){
            $l(this).bind("mouseover", o.onHover).bind("mouseout", o.onOut).bind("mouseover", function(ev){
                $l(this).stop(true, true).css("opacity", o.opacity).animate({ opacity: 1 }, {
                	duration: o.speed,
                    queue: false,
                    complete: o.onComplete
                });
            });
        });
    };
})(laquu);
