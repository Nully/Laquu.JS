/**
 * イーキューヘイトプラグイン
 *
 * @since: ver1.2.0
 * @オプション
 */
(function($l){
    $l.fn.eqheight = function(min, max, enableOverflow){
    	var tmp = 0;
		enableOverflow = (enableOverflow == 'undefined' ? false: enableOverflow);
		min = (min == 'undefined' ? null: min);
		max = (max == 'undefined' ? null: max);

    	this.each(function(){
    		var _h = $l(this).height();
    		if(tmp < _h) {
				tmp = _h;
    		}
    	});

		// 最小値及び最大値での割合を出す
		if(min != null) tmp = min;
		if(max != null) tmp = max;

		// overflowの設定
		if(enableOverflow) this.css("overflow", "auto");

		return this.height(tmp);
    };
})(laquu);