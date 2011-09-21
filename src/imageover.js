/**
 * イメージオーバープラグイン
 *
 * オプション
 *   suffix: ロールオーバー画像の接尾辞
 *   onHover: マウスの乗っかったときに呼び出されるコールバック関数
 *   onOut: マウスが離れた時に呼び出されるコールバック関数
 *   onImageLoaded: 画像のプリロードが完了した際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.imageOver= function(options) {
    	var defaults = {
			suffix: "_on",
			onHover: $l.empty,
			onOut: $l.empty,
			onImageLoaded: $l.empty
    	};

		function swap(e, s, c) {
			e.src = s;
			c.call(e, e);
		}

		return this.each(function(i, e){
			var o = $l.extend({}, defaults, options || {}),
				a = this.src,
				b,
				ext,
				overImage = new Image();

            b = this.src.split(".");
            ext = b.pop();
            b = b.join(".") + o.suffix + "." + ext;

            // プリロード
            overImage.src = b;
            if($l.isFunction(o.onImageLoaded)) {
                overImage.onLoad = o.onImageLoaded;
            }

			$l(this).over({
			    onHover: function(ev){
    				swap.call(this, this, b, $l.isFunction(o.onHover) ? o.onHover: $l.empty);
			    },
			    onOut: function(ev){
	    			swap.call(this, this, a, $l.isFunction(o.onOut) ? o.onOut: $l.empty);
    			}
			});
		});
    };
})(laquu);