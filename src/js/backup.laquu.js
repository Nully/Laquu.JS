(function($){
    $.laquu = {
        empty: function() {},
        error: function(e) {
            if(window.console && console.log)
                console.log.aplly(arguments);
            else
                throw e;
        }
    };


    /**
     * simple image menu
     *
     * @param  elems    jQuery HTML Collection Object
     * @param  options  Object
     *         easing: required jQuery.easing plugin, default swing.
     *         duration: image slide speed
     *         show_size: showing image size
     *         hide_size: hidden image size
     *         is_vertical: default false. set to 'true', vertical slide images.
     *         selected:
     */
    $.laquu.imgmenu = function(elems, options) {
        return elems.each(function(){
            return new imgMenu($(this), options);
        });
    };
    var imgMenu = function(elem, options) {
        this.init(elem, options);
    };
    imgMenu.fn = imgMenu.prototype = {};
    imgMenu.fn.extend = $.extend;
    imgMenu.fn.extend({
        timer: null,
        init: function(e, o) {
            var t = this;

            this.element = e;
            this.options = this.extend({
                easing: "swing",
                duration: 300,
                show_size: "200px",
                hide_size: "160px",
                is_vertical: false,
                auto: false,
                auto_duration: 2500
            }, o || {});
            this.items = this.element.children();

            this.element.css("overflow", "hidden");
            this.items.each(function(i){
                $(this).bind("mouseover", function(ev){t.showItem(i, ev);})
                       .bind("mouseout",  function(ev){t.hideItems(ev);});

                var size;
                if(t.options.is_vertical) size = $(this).css("height");
                else size = $(this).css("width");

                $(this).data("base_size", size);
            });

            this.startAutoSlide();
        },
        showItem: function(n, event) {
            var item, others = [];

            if(event != undefined) {
                this.stopAutoSlide();
            }

            this.items.each(function(i){

                if(n == i) item = $(this);
                else others.push(this);

            });

            $(others).stop().animate(this.getAnimateDirection(this.options.hide_size), {queue: false, duration: this.options.duration});
            item.stop().animate(this.getAnimateDirection(this.options.show_size), {queue: false, duration: this.options.duration});
        },
        hideItems: function(event) {
            var t = this;
            this.items.each(function(el){
                var $t = $(this);
                $t.stop().animate(t.getAnimateDirection($t.data("base_size")), {queue: false, duration: t.options.duration});
            });

            this.startAutoSlide();
        },
        startAutoSlide: function() {
            var t = this, current = 0;
            if(this.options.auto === false) {return;}
            if(this.timer) {return;}

            this.timer = setInterval(function(){
                if(current > t.items.size() - 1) {
                    current = 0;
                }
                t.showItem(current);
                ++current;
            }, this.options.auto_duration);
        },
        stopAutoSlide: function() {
            if(this.timer) {
                clearInterval(this.timer);
                this.timer = null;
            }
        },
        /**
         * get a animation direction
         *
         * @return String
         */
        getAnimateDirection: function(size) {
            if(this.options.is_vertical) {return {"height": size}; }
            else {return {"width": size}; }
        }
    });



    /**
     * lightbox type simplebox plugin
     *
     * @param element jQueryHTMLCollection
     * @param options Object
     *        loader_img: ajax loading image
     *        prev_text: previous link text
     *        next_text: next link text
     */
    $.laquu.simplebox = function(element, options){
        // simplebox defualt options object
        var simplebox_default_options = {
            loader_img: "img/ajax-loader.gif",
            prev_text: "&laquo; prev",
            next_text: "next &raquo;"
        },


        /**
         * Merged simplebox options Object
         */
        simplebox_options = {},


        /**
         * current showd image number
         */
        simpleboxSelectedImage = 0;


        /**
         * simplebox box node
         *
         * <div id="laquu-simplebox-overlay"></div>
         * <div id="laquu-simplebox">
         *     <div id="laquu-simplebox-content">
         *         <div id="laquu-simplebox-loader"><img src="" /></div>
         *         <div id="laquu-simplebox-image"></div>
         *         <div id="laquu-simplebox-controller">
         *             <div id="laquu-simplebox-title"></div>
         *             <div id="laquu-simplebox-pager">
         *                 <span id="laquu-simplebox-prev"><a href="#"></a></span>
         *                 <span id="laquu-simplebox-next"><a href="#"></a></span>
         *             </div>
         *         </div>
         *     </div>
         * </div>
         */
        var simplebox = '<div id="laquu-simplebox-overlay"></div><div id="laquu-simplebox"><div id="laquu-simplebox-content"><div id="laquu-simplebox-loader"><img src="" /></div><div id="laquu-simplebox-image"></div><div id="laquu-simplebox-controller"><div id="laquu-simplebox-title"></div><div id="laquu-simplebox-pager"><span id="laquu-simplebox-prev"><a href="#"></a></span><span id="laquu-simplebox-next"><a href="#"></a></span></div></div></div></div>';


        /**
         * jQuery HTMLCollection node
         */
        var jQueryObjects;


        /**
         * initialize simplebox
         *
         * @return false
         */
        function simplebox_init() {
            while(this.href != simplebox_options.simpleboxElements.get(simpleboxSelectedImage).href) {
                simpleboxSelectedImage++;
            }

            // create simplebox Element
            simplebox_create_box();

            simplebox_show_image.call(this);
            return false;
        }


        /**
         * Create simplebox image box & overlay
         * reference by clicked anchor Element
         *
         */
        function simplebox_create_box() {
            var box = $(simplebox).appendTo("body"),
                size = get_page_size(), scroll = get_page_scroll();

            // do attach events
            simplebox_attach_events();

            // loading image
            $("#laquu-simplebox-loader > img").attr("src", simplebox_options.loader_img);

            // overlay
            $("#laquu-simplebox-overlay").show().css({ height: size.height, width: size.width });
            $("#laquu-simplebox").show().css({ top: scroll.top + 50, left: scroll.left });
        }


        /**
         * simplebox attachment Events
         *
         */
        function simplebox_attach_events() {
            var overlay = $("#laquu-simplebox-overlay"),
                box     = $("#laquu-simplebox-image");

            // click events
            $([overlay.get(0), box.get(0)]).click(function(){ simplebox_flush(); });

            // window events
            // $(window).scroll(simplebox_scroll_window);
            $(window).resize(simplebox_resize_window);

            // key events
            $(document).keyup(simplebox_keyevent_doc);

            // anchor events
            $("#laquu-simplebox-prev > a").click(simplebox_show_prev_image);
            $("#laquu-simplebox-next > a").click(simplebox_show_next_image);
        }


        /**
         * shown simplebox in image
         */
        function simplebox_show_image() {
            var imgLoader = new Image(),
                loader    = $("#laquu-simplebox-loader"),
                image_content = $("#laquu-simplebox-image"),
                controller = $("#laquu-simplebox-controller"),
                next_btn = $("#laquu-simplebox-next > a", controller).text(""),
                prev_btn = $("#laquu-simplebox-prev > a", controller).text("");


            if(image_content.children("img").size()) { image_content.children("img").remove(); }
            if(loader.is(":hidden")) { loader.show(); }

            imgLoader.src = this.href;
            imgLoader.alt = this.title || this.href.split("/").pop();
            imgLoader.onload = function() {
                var i = this;

                loader.hide();
                controller.hide();

                // user setting link text
                if(simpleboxSelectedImage > 0) {
                    prev_btn.html(simplebox_options.prev_text);
                }
                if(simpleboxSelectedImage < (simplebox_options.simpleboxElements.size() - 1)) {
                    next_btn.html(simplebox_options.next_text);
                }

                // append image to #laquu-simplebox-image
                $("#laquu-simplebox-title").text(this.alt);
                $("#laquu-simplebox-content").css({ width: this.width, height: this.height + controller.innerHeight() });
                image_content.append(this);
                controller.show();
            };
        }


        /**
         * show previous image
         */
        function simplebox_show_prev_image() {
            if(simplebox_options.simpleboxElements[simpleboxSelectedImage -1]) {
                --simpleboxSelectedImage;
                simplebox_show_image.call(simplebox_options.simpleboxElements.get(simpleboxSelectedImage));
            }
            return false;
        }


        /**
         * show previous image
         */
        function simplebox_show_next_image() {
            if(simplebox_options.simpleboxElements[simpleboxSelectedImage + 1]) {
                ++simpleboxSelectedImage;
                simplebox_show_image.call(simplebox_options.simpleboxElements.get(simpleboxSelectedImage));
            }
            return false;
        }


        /**
         * flush out simplebox Elements
         *
         */
        function simplebox_flush() {
            // flush selected image number
            simpleboxSelectedImage = 0;

            $("#laquu-simplebox-overlay, #laquu-simplebox").remove();

            // unbind events
            $(window).unbind("resize", simplebox_resize_window);
            $(document).unbind("keyup", simplebox_keyevent_doc);
            $("#laquu-simplebox-prev > a").unbind("click", simplebox_show_prev_image);
            $("#laquu-simplebox-next > a").unbind("click", simplebox_show_next_image);
        }


        /**
         * simplebox Scroll event
         */
        function simplebox_scroll_window() {
            var scroll = get_page_scroll();
            $("#laquu-simplebox").css({ top: scroll.top + 50, left: scroll.left });
        }


        /**
         * window resize event
         *
         */
        function simplebox_resize_window() {
            var size = get_page_size();
            $("#laquu-simplebox-overlay").css({ width: size.width, height: size.height });
        }


        /**
         * document event for keyEvents
         *
         * @param event    jQuery EventObject
         */
        function simplebox_keyevent_doc(event) {
            switch(event.keyCode) {
                // ESC key
                case 27: simplebox_flush(); break;
                // left cursor key
                case 37: simplebox_show_prev_image(); break;
                // right cursor key
                case 39: simplebox_show_next_image(); break;
            }
        }


        /**
         * get page size
         *
         * @return Object
         */
        function get_page_size() {
            var de = document.documentElement,
                db = document.body;
            var w, h;

            if(window.innerHeight && window.ScrollMaxY) {
                // for Mozilla
                h = window.innerHeight + window.ScrollMaxY;
                w = window.innerWidth + window.ScrollMaxX;
            }
            else {
                h = (db.scrollHeight > db.offsetHeight) ? db.scrollHeight : db.offsetHeight;
                w = db.offsetWidth;
            }
            return  {
                width: w,
                height: h
            };
        }


        /**
         * get Document scroll size
         *
         */
        function get_page_scroll() {
            var de = document.documentElement;
            var t = window.pageYOffset || self.pageYOffset || (de && de.scrollTop)  || document.body.scrollTop;
            var l = window.pageXOffset || self.pageXOffset || (de && de.scrollLeft) || document.body.scrollLeft;
            return {
                top: t,
                left: l
            };
        }

        // extended simple box Options
        simplebox_options = $.extend(simplebox_options, simplebox_default_options, options || {}, {
            simpleboxElements: element
        });

        element.click(simplebox_init);
    };


    /**
     * Konami command
     *
     * @param  cmd        String    CSV pattern key code
     * @param  callback   Function  callback function
     *                              default callback method is MeltDown.js
     */
    $.laquu.konami = function(cmd, callback) {
        var stack = [];
        callback = $.isFunction(callback) ? callback: function () {(function(){var s=document.createElement("script");s.charset="UTF-8";var da=new Date();s.src="http://www.rr.iij4u.or.jp/~kazumix/d/javascript/meltdown/meltdown.js?"+da.getTime();document.body.appendChild(s)})();};
        cmd = (cmd ? cmd : "38,38,40,40,37,39,37,39,66,65");
        $(document).keyup(function(ev){
            stack.push(ev.keyCode);
            if(stack.toString().indexOf(cmd) >= 0) {
                $(document).unbind("keydown");
                callback.apply(null, arguments);
            }
        });
    };
})(jQuery);