/**
 * クリアオーバープラグイン
 *
 * オプション
 *   opacity: ロールオーバー時の東名道
 *   speed: アニメーション速度
 *   onComplete: アニメーション完了後のコールバック関数
 *   onHover: マウスが乗っかった時に呼び出されるコールバック関数
 *   onOut: マウスが離れた際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.clearOver = function(options) {
    	var defaults = {
            opacity: .7,
            speed: 300,
            onComplete: $l.empty,
            onHover: $l.empty,
            onOut: $l.empty
       };

        return this.each(function(){
			var o = $l.extend({}, defaults, options || {});

            $l(this).over({
                onHover: function(ev){
                    $l.isFunction(o.onHover) ? o.onHover.call(this, this, ev): $l.empty;
                    $l(this).stop(true, true).fadeTo(o.speed, o.opacity, o.onComplete ? o.onComplete : $l.empty);
                },
                onOut: function(ev) {
                    $l.isFunction(o.onOut) ? o.onOut.call(this, this, ev): $l.empty;
                    $l(this).stop(true, true).fadeTo(o.speed, 1, o.onComplete ? o.onComplete : $l.empty);
                }
            });
        });
    };
})(laquu);