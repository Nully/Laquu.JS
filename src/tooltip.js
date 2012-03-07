/**
 * ツールチッププラグイン
 *
 * @オプション
 *   distX: マウスからのX軸の加算位置
 *   distY: マウスからのY軸の加算位置
 *   onShow: ツールチップが表示された際のコールバック関数
 *   onHide: ツールチップが非表示になった際のコールバック関数
 *   onMove: マウスが動いた際のコールバック関数
 */
(function($l){
    var uuid = function() {
        var uid = 0;
        return function(){ return ++uid; };
    }();


    $l.fn.tooltip = function(settings) {
        this.each(function(){
            var o = $l.extend({}, {
                distX: 0,
                distY: 25,
                onShow: $l.empty,
                onHide: $l.empty,
                onMove: $l.empty
            }, settings || {}),
            $this = $l(this),
            hasAlt = false;

            function createTooltipContainer() {
                return $l('<div id="laquu-tooltip-container'+ uuid() +'" class="laquu-tooltip-container"></div>')
                            .appendTo("body")
                            .css({ position: "absolute", display: "none", top: 0, left: 0 });
            }

            function showTooltip(ev) {
                var container = createTooltipContainer(),
                    self = $l(this),
                    outerHeigh,
                    outerWidth;

                if(hasAlt) {
                	self.removeAttr("alt");
                }
                self.removeAttr("title");
                container.text(self.data("lq-tooltip-title"));
                containerHeight = Math.floor(container.outerHeight() / 2) + o.distY;
                containerWidth  = Math.floor(container.outerWidth() / 2) + o.distX;

                container.css({
                    top: ev.pageY - containerHeight,
                    left: ev.pageX - containerWidth
                }).stop(true, true).fadeIn("fast", function(){
                    o.onShow.call(this, this, self);
                });

                self.mousemove(function(ev){
                    container.css({
                        top: ev.pageY - containerHeight,
                        left: ev.pageX - containerWidth
                    });
                    o.onMove.call(this, container.get(0), self);
                });
            }


            function hideTooltip(ev) {
            	var self = $(this);
                self.unbind("mousemove");
                self.attr("title", self.data("lq-tooltip-title"));
                if(hasAlt) {
                	self.attr("alt", self.data("lq-tooltip-alt"));
                }
                $l(".laquu-tooltip-container").fadeOut("fast", function(){
                    $l(this).remove();
                    o.onHide.call(this, this, self);
                });
            }

			if(typeof $this.attr("alt") !== "undefined") {
				$this.data("lq-tooltip-alt", $this.attr("alt"));
				hasAlt = true;
			}
			$this.data("lq-tooltip-title", $this.attr("title"));
            $this.hover(showTooltip, hideTooltip);
        });
    };
})(laquu);