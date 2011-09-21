/**
 * エクストアイコン
 *
 * オプション
 *  prefix: 付与されるクラス名の接頭辞
 */
(function($l){
    $l.fn.exticon = function(options) {
        var o = $l.extend({}, {
            prefix: "icon-"
        }, options || {});

        return this.each(function(){
            var $t = $(this), href, tmp, ext;

            if(!$t.attr("href") && !(/\./.test($t.attr("href")))) {
                return true;
            }

            href = $t.attr("href");
            tmp = href.split(".");
            ext = tmp.pop();

            if(!ext) {
                return true;
            }


            $t.addClass(o.prefix ? o.prefix + ext: ext);
        });
    };
})(laquu);