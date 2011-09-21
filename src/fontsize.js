/**
 * フォントサイズプラグイン
 *
 * オプション
 *   onChange: フォントサイズを変更した際に呼び出されるコールバック関数
 *   cookie: jQuery.cookieプラグインを導入時のみ利用可能
 *           詳しくは、jQuery.cookieプラグインを御覧ください。
 */
(function($l){
    $l.fn.fontsize = function(settings) {
        var defaults = {
            onChange: $l.empty,
            cookie: {expires: 7, path: "/", domain: "", secure: false}
        };

        return this.each(function(){
            var opts = $l.extend({}, defaults, settings || {}),
                elements = $l("a", this),
                body = $l(opts.target),
                classes = $l.map(elements, function(e, i){
                    return $l(e).attr("href").replace("#", "");
                }).join(" ");

            elements.bind("click", function(ev){
                var size = $l(this).attr("href").replace("#", "");
                $l("body").removeClass(classes).addClass(size);

                if($l.isFunction(opts.onChange))
                    opts.onChange.call(body, body, size);

                if($l.cookie)
                    $l.cookie("laquu_font-size", size, opts.cookie);

                ev.preventDefault();
            });

            if($l.cookie)
                body.addClass($l.cookie("laquu_font-size"));
        });
    };
})(laquu);
