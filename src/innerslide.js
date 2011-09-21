/**
 * インナースライドプラグイン
 *
 * オプション
 *   innerSlideClass: インナースライドするクラス名を指定
 *   showSpeed: 表示するアニメーション速度
 *   hideSpeed: 比表示にするアニメーション速度
 *   easing: イージング（jQuery.easingが必要）
 *   slideIn: スライドしてくる位置の指定
 *   onShowComplete: インナースライドが表示された際に呼び出されるコールバック関数
 *   onHideComplete: インナースライドが非表示になった際に呼び出されるコールバック関数
 */
(function($l){
    $l.fn.innerSlide = function(options) {
        var defaults = {
            innerSlideClass: ".laquu-innerslide",
            showSpeed:300,
            hideSpeed:200,
            easing:"swing",
            slideIn:"bottom",
            onShowComplete: $l.empty,
            onHideComplete: $l.empty
        };

        return this.each(function() {
            var t = $l(this), slider, sliderCss, o = $l.extend({}, defaults, options || {});

            slider = t.find(o.innerSlideClass);
            sliderCss = (function(type) {
                var _over, _out;
                switch(type) {
                    case "top":
                        _over = { top: 0, left:0 };
                        _out  = { top: parseInt("-" + slider.outerHeight()), left: 0 };
                        break;
                    case "right":
                        _over = { top: 0, right: 0 };
                        _out  = { top: 0, right: parseInt( "-" + slider.outerWidth()) };
                        break;
                    case "bottom":
                        _over = { top: 0, left: 0 };
                        _out  = { top: parseInt(slider.outerHeight()), left: 0 };
                        break;
                    case "left":
                        _over = { top: 0, right: 0 };
                        _out  = { top: 0, right: parseInt(slider.outerWidth()) };
                        break;
                    case "top-right":
                        _over = { top: 0, left: 0 };
                        _out =  { top: parseInt("-" + slider.outerHeight()), left: parseInt(slider.outerWidth()) };
                        break;
                    case "top-left":
                        _over = { top: 0, left: 0 };
                        _out =  { top: parseInt("-" + slider.outerHeight()), left: parseInt("-" + slider.outerWidth()) };
                        break;
                    case "bottom-right":
                        _over = { top: 0, right: 0 };
                        _out =  { top: parseInt(slider.outerHeight()), right: parseInt("-" + slider.outerWidth()) };
                        break;
                    case "bottom-left":
                        _over = { top: 0, right: 0 };
                        _out =  { top: parseInt(slider.outerHeight()), right: parseInt(slider.outerWidth()) };
                        break;
                }
                return { over: _over, out: _out };
            })(o.slideIn);

            slider.css(sliderCss.out);
            t.over({
                onHover: function(){
                    slider.stop(true,false).animate(sliderCss.over, {
                        queue: false,
                        easing: o.easing,
                        duration: o.showSpeed,
                        complete: o.onShowComplete
                    });
                },
                onOut: function() {
                    slider.stop(true,false).animate(sliderCss.out, {
                        queue: false,
                        easing: o.easing,
                        duration: o.hideSpeed,
                        complete: o.onHideComplete
                    });
                }
            });
        });
    };
})(laquu);