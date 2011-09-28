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
			var $t = $l(this),
    			o = {};

            function isUndefined(n) {
                return typeof n == "undefined";
            }

            $.each([ "top", "right", "bottom", "left" ], function(i, prop){
                if($t.css(prop) != "auto") {
                    o[prop] = parseInt($t.css(prop));
                }
            });

			$w.bind("scroll", function(ev){
			    var pos = 0;
			    if(!isUndefined(o.top)) {
			        pos = $w.scrollTop() + o.top;
			    }
			    else if(!isUndefined(o.bottom)) {
			        pos = $w.scrollTop() + $w.height() - $t.outerHeight({ margin: true }) - o.bottom;
			    }

			    $t.css("top", pos);
			}).scrollTop(1).scrollTop(0);
		});
	};
})(laquu);