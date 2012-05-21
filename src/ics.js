(function($){
    /**
     * simplify incremental search plugin
     *
     * options
     *    target: filtering target CSS selector
     *    on    : triggerd event type.
     */
    $.fn.extend({
        ics: function(options) {
            var setting = $.extend({
                target: 'table tr',
                on: 'keyup',
                callback: function(elements, inputValue) {}
            }, options || {});

            function quote(str) {
                return str.replace(new RegExp(/(\W)/), '\\$1');
            }

            var elements = $(setting.target);
            $(this).bind(setting.on, function(){
                var self = $(this),
                    keyword = self.val(),
                    keywords = keyword.split(new RegExp(/\s/)),
                    i;

                // 検索文字がない場合はすべての要素を表示
                if(keyword.length == 0) {
                    elements.show();
                    return;
                }

                elements.each(function(){
                    var s = $(this);
                    s.show();
                    // or 検索の為、半角スペースで文字列を切り出し、文字列分ループして一致を
                    for(i in keywords) {
                        if(keywords[i].length == 0)
                            continue;

                        var pattern = quote(keywords[i]);
                        if(!s.text().replace(new RegExp(/\s/g), "").match(pattern)) {
                            s.hide();
                        }

                        // 強調表示などはユーザーでやってもらうのです！
                        if($.isFunction(setting.callback))
                            setting.callback.call(self, elements, pattern);
                    }
                });
            });
        }
    });
})(jQuery);