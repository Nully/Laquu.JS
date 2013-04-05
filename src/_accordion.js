/**
 * アコーディオンプラグイン
 *
 * オプション:
 *   selected: 選択済みアコーディオンパネル番号
 *   currentClass: 選択済みアコーディオンパネルに付与するクラス名
 *   speed: アニメーションスピード
 *   easing: イージング（jQuery.easingプラグインが必要です）
 *   onHide: アコーディオンが非表示になる際に呼び出されるコールバック関数です
 *   onShow: アコーディオンが表示された後に呼び出されるコールバック関数です
 */
(function($l){
	$l.fn.accordion = function(options) {
		var defaults = {
            selected: false,
            currentClass: "current",
            speed: 300,
            easing: "swing",
            onHide: $l.empty,
            onShow: $l.empty
		};

		return this.each(function(i, elm){
			var o = $l.extend({}, defaults, options || {}),
				self = $l(this),
				t = $l(this).find("a[href^=#]"),
				c = null;

			// break, next loop index.
			if(t.size() < 1) return true;

			t.each(function(){
				var tr = $l($l(this).attr("href")).hide();
				if(c)
					c = c.add(tr);
				else
					c = tr;
			});


			t.bind("click", function(ev){
			    if($l(ev.currentTarget.hash).is(":visible"))
			        return ev.preventDefault();

				t.removeClass(o.currentClass)
					.filter("[href="+ ev.currentTarget.hash +"]")
					.addClass(o.currentClass).end();

				c.not(ev.currentTarget.hash)
					.slideUp({
						duration: o.speed,
						easing: o.easing,
						complete: $l.isFunction(o.onHide) ? o.onHide: $l.empty
					})
					.end()
					.filter(ev.currentTarget.hash)
					.slideDown({
						duration: o.speed,
						easing: o.easing,
						complete: $l.isFunction(o.onShow) ? o.onShow: $l.empty
					});

				ev.preventDefault();
			});

			if(o.selected != false && typeof o.selected == "number")
				$l(t.get(o.selected)).trigger("click");
			else
				$l(t.get(0)).trigger("click");
		});
	};
})(laquu);
