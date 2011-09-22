/**
 * ドロップダウンプラグイン
 *
 * オプション
 *   hoverClass: メニューアイテムにマウスが乗っかったときに付与されるクラス名
 *   showSpeed: メニューアイテムを表示する速度
 *   hideSpeed: メニューアイテムを非表示にする速度
 *   hideTime: メニューが消えるまでのインターバル
 *   onShow: メニューが表示された際に呼び出されるコールバック関数
 *   onHide: メニューが非表示になった際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.dropdown = function(settings) {
        var defaults = {
            hoverClass: "hover",
            showSpeed: 200,
            hideSpeed: 400,
            hideTime: 100,
            onShow: $l.empty,
            onHide: $l.empty
        },
        css = {
            display: "none",
            position: "absolute"
        };

        // 要素が１つの場合のみ適用したい...
        return this.each(function(){
            var o = $l.extend({}, defaults, settings || {}),
                root =$l(this);

            $l(this).find("li").filter(function(){
                var ul = $l("ul", this),
                    $t = $l(this);

                if(ul.size()) {
                    ul.hide().parent("li").over({
                        hoverClass: o.hoverClass,
                        onHover: function(){
                            $l(this).children("ul:not(:animated)").slideDown(o.showSpeed, o.onShow);
                        },
                        onOut: function() {
                            var t = $l(this);
                            setTimeout(function(){
                                t.children("ul:not(:animated)").slideUp(o.hideSpeed, o.onHide);
                            }, o.hideTime);
                        }
                    });
                }
            });
        });
    };
})(laquu);