/**
 * ポシフィックスプラグイン
 *
 * @since ver1.2.0
 * @オプション
 *   オプションはありません。
 */
(function($l){
	$l.fn.posfix = function() {
		if($l.isUnderIE6 === false) {
			return this;
		}

		var $w = $l(window);
		this.css("position", "absolute");
		return this.each(function(){
			var $t = $l(this);
			o = {
				top: parseInt($t.css("top")) || null,
				right: parseInt($t.css("right")) || null,
				bottom: parseInt($t.css("bottom")) || null,
				left: ($t.css("left") == "auto" ? null: parseInt($t.css("left")))
			};

			$w.bind("scroll", function(ev){
				$t.css("top", (
					o.top ? $w.scrollTop() + o.top:
						o.bottom ? ($w.scrollTop() + $w.height() - $t.outerHeight({ margin: true }) - o.bottom):
							0
				));
				$t.css((o.left ? "left": "right"), (o.left ? o.left: o.right ? o.right: 0));
			}).scrollTop(1).scrollTop(0);
		});
	};
})(laquu);