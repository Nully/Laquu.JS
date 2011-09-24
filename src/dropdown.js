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
                root =$l(this), zIndex = 1000;

            $l(this).find("li").filter(function(){
                var ul = $l("ul", this),
                    $t = $l(this);

                if(ul.size()) {
                    ul.hide().parent("li").over({
                        hoverClass: o.hoverClass,
                        onHover: function(){
                        	var _s = $l(this);
                            _s.children("ul:not(:animated)").css("z-index", ++zIndex).slideDown(o.showSpeed, function(){
                            	if($l.isFunction(o.onShow))
                            		o.onShow.call(this);

								$l(this).css("overflow", "visible");
                            });
                        },
                        onOut: function() {
                            var _t = $l(this);
                            setTimeout(function(){
                                _t.children("ul").slideUp(o.hideSpeed, function(){
	                                if($l.isFunction(o.onHide))
	                                	o.onHide.call(this);

									$l(this).css("overflow", "hidden");
                                });
                            }, o.hideTime);
                        }
                    });
                }
            });
        });
    };
})(laquu);