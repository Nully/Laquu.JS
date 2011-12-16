/**
 * タブプラグイン
 *
 * @since: ver1.0.0
 * @オプション
 *   tabSelector: タブとして動作させるタブグループのCSSセレクタ
 *   activeTabClass: アクティブなタブに付与されるクラス名
 *   onChange: タブ表示が切り替わった際に呼び出されるコールバック関数
 *   triggerTabNum: 初期表示にしたいタブパネル番号を指定
 */
(function($l){
    $l.fn.tab = function(settings) {
        var defaults = {
            tabSelector: "#tab",
            activeTabClass: "active",
            onChange: $l.empty,
            triggerTabNum: 0
        };

        return this.each(function(){
            var o = $l.extend({}, defaults, settings || {}),
                panels,
                self = $l(this),
                tabGroup = self.find(o.tabSelector),
                tabs = tabGroup.find("li");

			// tab group not found was throw error.
			if(tabGroup.size() < 1)
				laquu.error("Tab group is not found.");

            tabs.each(function(){
                var i = $l($l("a", this).attr("href"), self);
                if(panels)
                    panels = panels.add(i);
                else
                    panels = i;
            }).find("a[href^=#]").bind("click", function(ev){
                panels.hide();
                tabs.removeClass(o.activeTabClass);
                $l(this).parent().addClass(o.activeTabClass);
                // fix find the group child.
                var p = self.find($l(this).attr("href")).show();

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