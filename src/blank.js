/**
 * ブランクプラグイン
 *
 * オプション:
 *   オプションはありません。
 */
(function($l){
	$l.fn.blank = function(options) {
        return this.each(function(){
            $l(this).attr("target", "_blank");
        });
    };
})(laquu);
