/**
 * イーキューヘイトプラグイン
 *
 * @since: ver1.2.0
 * @オプション
 */
(function($l){
    $l.fn.eqheight = function(min, max, enableOverflow){
    	var _min = 120, _max = 300, tmp = 0;

		// サイズのスワップ
		min = (min ? min: _min);
		max = (max ? max: _max);

        enableOverflow = (typeof enableOverflow == "undefined") ? true : enableOverflow;

    	this.each(function(){
    		var _h = $l(this).outerHeight();
    		if(tmp < _h) {
    			tmp = _h;
    		}
    	});

		if(min > tmp) tmp = min;
		if(max < tmp) tmp = max;

        if(enableOverflow == true)
            this.css("overflow", "auto");

        return this.height(tmp);
    };
})(laquu);