/**
 * コナミコマンドプラグイン
 *
 * オプション
 *    cmd: キーコマンド文字列
 *    callback: コマンドが成功した際のコールバック関数
 *
 * Special thanks.
 *   meltdown js.
 *   KAZUMiX: http://d.hatena.ne.jp/KAZUMiX/20071105/meltdown
 */
(function($l){
    $l.fn.konami = function(settings) {
        var defaults = {
            cmd: "38,38,40,40,37,39,37,39,66,65",
            callback: function() {
                var s = document.createElement("script");
                s.charset="UTF-8";
                var da = new Date();
                s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime();
                document.body.appendChild(s)
            }
        };

        return this.each(function(){
            var stack = [],
                opts = $l.extend({}, defaults, settings || {});
            $l(this).bind("keydown", function(ev){
                stack.push(ev.keyCode);
                if(stack.toString().indexOf(opts.cmd) >= 0) {
                    $l(this).unbind("keydown");
                    opts.callback.call(this, this, ev, stack);
                }
            });
        });
    };
})(laquu);
