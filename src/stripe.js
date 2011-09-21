/**
 * ストライププラグイン
 *
 * @since: ver1.0.0
 * @オプション
 *   stripeClass: ストライプ表示の際に付与するクラス名
 *   onHover: ホバー時のコールバック関数
 *   onOut: マウスが離れた際のコールバック関数
 */
(function($l){
    $l.fn.stripe = function(settings) {
        var o = $l.extend({
            stripeClass: ["even", "odd"],
            onHover: $l.empty,
            onOut: $l.empty
        }, settings || {});

        return this.each(function(i){
            $l(this).addClass(o.stripeClass[i%o.stripeClass.length]).over({
                onHover: o.onHover,
                onOut: o.onOut
            });
        });
    };
})(laquu);
