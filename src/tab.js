/**
 * タブプラグイン
 *
 * @since: ver1.0.0
 * @オプション
 *   activeTabClass: アクティブなタブに付与されるクラス名
 *   onChange: タブ表示が切り替わった際に呼び出されるコールバック関数
 *   triggerTabNum: 初期表示にしたいタブパネル番号を指定
 */
(function($l){
    $l.fn.tab = function(settings) {
        var defaults = {
            activeTabClass: "active",
            onChange: $l.empty,
            triggerTabNum: 0
        };

        return this.each(function(){
            var self = $l(this), tabs = self.find("li"), panels,
                o = $l.extend({}, defaults, settings || {});

            tabs.each(function(){
                var i = $l($l("a", this).attr("href"), self);
                if(panels)
                    panels = panels.add(i);
                else
                    panels = i;
            }).find("a[href*=#]").bind("click", function(ev){
                tabs.removeClass(o.activeTabClass).find("a[href="+ev.target.hash+"]").parent().addClass(o.activeTabClass);
                var p = panels.hide().parent().find(ev.target.hash);
                p.show();

                if($l.isFunction(o.onChange))
                    o.onChange.call(this, this, p);

                ev.preventDefault();
            });

            if(tabs.size() < o.triggerTabNum)
                o.triggerTabNum = 0;

            $l("a", tabs.get(o.triggerTabNum)).trigger("click");
        });
    };
})(laquu);
