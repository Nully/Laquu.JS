/**
 * jQuery.hoverのラッププラグイン
 * paramaters
 *   hoverClass: マウスが乗っかった時に付与されるクラス名
 *   onHover: マウスが乗っかった時に呼び出されるコールバック関数
 *   onOut: マウスが離れた際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.over = function(settings) {
        var defaults = {
            hoverClass: "hover",
            onHover: $l.empty,
            onOut: $l.empty
        };

        return this.each(function(i, e){
            var opts = $l.extend({}, defaults, settings || {});
            $l(this).hover(function(ev){
                $l(this).addClass(opts.hoverClass);
                if($l.isFunction(opts.onHover))
                    opts.onHover.call(this, this, ev);
            }, function(ev){
                $l(this).removeClass(opts.hoverClass);
                if($l.isFunction(opts.onOut))
                    opts.onOut.call(this, this, ev);
            });
        });
    };
})(laquu);
