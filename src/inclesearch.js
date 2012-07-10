/**
 * 簡易的なインクリメンタルサーチプラグイン
 * 指定されたターゲットの子要素に、入力された文字があるかを検索し、
 * 一致したものがあれば、該当の要素を表示する
 *
 * options
 *    target: フィルタリング（インクリメンタル）する対象のCSSセレクタ
 *    on    : フィルタリングするイベント名
 *
 * defaults:
 *    target: table > tr（テーブルの行全体）
 *    on:     keyup（キーボードが離されたら）
 * -----------------------------------------------------------------------------
 * 使い方
 * jQuery("テキストボックスなどのセレクタ").inclesearch();
 *
 * キーワード入力フィールドに半角スペースを入れると絞り込み検索（AND検索）
 * を行える
 */
(function($l){
    $l.fn.extend({
        inclesearch: function(options) {
            var setting = $.extend({
                target: 'table tr',
                on: 'keyup'
            }, options || {});

            function quote(str) {
                str = str.replace(/(\W)/, "\\$1");
                str = str.split(/\s/).join(")(?=.*");
                str = "(?=.*" + str + ")";
                return str;
            }

            var elements = $l(setting.target);
            $l(this).bind(setting.on, function(){
                var str = $l(this).val(), words = null;
                if(!str) {
                    elements.show();
                    return;
                }

                var pattern = new RegExp(quote(str), "i");
                elements.filter(function(){
                    var s = jQuery(this);

                    if(s.text().replace(/\s/g, "").match(pattern)) {
                        s.show();
                    }
                    else {
                        s.hide();
                    }
                });
            });
        }
    });
})(laquu);