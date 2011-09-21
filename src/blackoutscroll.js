/**
 * プラックアウトスクロールプラグイン
 *
 * オプション
 *   overlayColor: オーバーレイの色
 *   speed: オーバーレイの表示/非ヒョじの速度
 *   onShow: オーバーレイが表示された際に呼び出されるコールバック関数
 *   onHide: オーバーレイが非表示になった際に呼び出されるコールバック関数
 */
(function($l){
	var defaults = {
		overlayColor: "#000000",
		speed: 300,
		onShow: $l.empty,
		onHide: $l.empty
	}, d = $l(document), w = $l(window), b;

	$l.fn.blackoutScroll = function(options) {
		var o = $l.extend({}, defaults, options || {});
		if(!b) {
			b = $l('<div id="laquu_blackout_scroller_overlay" />')
				.appendTo("body").hide().css({
					position: "absolute",
					top: 0,
					left: 0,
					zIndex: 100000
				});
		}

		this.bind("click", function(ev){
			var _t = $l($l(this).attr("href"));

			if(_t.size() < 1) return true;

			b.css({
				background: o.overlayColor,
				width: d.width(),
				height: d.height()
			}).fadeIn(o.speed, function(){
				$l.isFunction(o.onShow) ? o.onShow.call(_t, _t, b): $l.empty();

				var _o = _t.offset();
				w.scrollTop(_o.top).scrollLeft(_o.left);

				b.fadeOut(o.speed, function(){
					$l.isFunction(o.onHide) ? o.onHide.call(_t, _t, b): $l.empty();

					b.hide().css({ top: 0, left: 0, width: 0, height: 0 });
				});
			});

			ev.preventDefault();
		});

		return this;
	};
})(laquu);
