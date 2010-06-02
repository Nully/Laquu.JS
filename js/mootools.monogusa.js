var monogusa;
(function(){
    /**
     * monogusa Konami command class Object
     */
    var monogusaRollOpacity = new Class({
        Extends: Fx.Tween,
        initialize: function(e, o) {
            this.elements = e;
            this.options  = $extend(o || {}, {
                "opacity": .7,
                "duration": 300,
                "onComplete": $empty,
                "onHover": $empty,
                "onOut": $empty
            });

            this.elements.each(function(e, i){
                e.addEvents({
                    "mouseover": this.onHandler.bind(this),
                    "mouseout": this.outHandler.bind(this)
                });
            }, this);
        },
        onHandler: function(ev) {
            this.options.onHover.bind(ev.target);
            this._doTween(ev.target, this.options.opacity);
        },
        outHandler: function(ev) {
            this.options.onOut.bind(ev.target);
            this._doTween(ev.target, 1);
        },
        _doTween: function(el, o) {
            el.get("tween", {
                "property": "opacity",
                "onComplete": this.options.onComplete,
                "duration": this.options.duration
            }).start(o);
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaRollImage = new Class({
        initialize: function(e, o) {
            this.elements = e;
            this.options  = $extend(o || {}, {
                "suffix": "_on",
                "onHover": $empty,
                "onOut": $empty
            });

            this.elements.addEvents({
                "mouseover": this.onHandler.bind(this),
                "mouseout": this.outHandler.bind(this)
            });
        },
        onHandler: function(ev) {
            this.options.onHover.bind(ev.target);
            this._dispatch(ev.target);
        },
        outHandler: function(ev) {
            this.options.onOut.bind(ev.target);
            this._dispatch(ev.target);
        },
        _dispatch: function(el) {
            var base_src = el.getProperty("src"),
                src, tmp, ext, exp = new RegExp(this.options.suffix);

            if(exp.test(base_src)) {
                src = base_src.replace(exp, "");
            }
            else {
                tmp = base_src.split(".");
                ext = tmp.pop();
                src = tmp.join(".") + this.options.suffix + "." + ext;
            }
            el.setProperty("src", src);
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaTicker = new Class({
        current_item: null,
        current: -1,
        items:[],
        initialize: function(e, o) {
            this.element = e;
            this.parent_elem = e.getParent();
            this.options = $extend(o || {}, {
                speed: 2,
                duration: 2,
                onComplete: $empty
            });

            this.parent_elem.setStyle("position", "relative");
            this.element.setStyle("position", "absolute");

            this.items = this.element.getChildren();
            this.element.set("morph", {
                duration: this.options.speed * 1000,
                onComplete: function(){
                    var i = (this.current === 0) ? this.items.length : this.current;
                    this.items[ i - 1].inject(this.element);
                    this.element.setStyles({
                        top: 0,
                        left: 0
                    });
                }.bind(this)
            });
            this.next();
        },
        next: function() {
            ++this.current;
            this.rewind();
            var pos = this.items[this.current];
            var morph = this.element.get("morph");
            morph.start({
                top: -pos.offsetTop,
                left: -pos.offsetLeft
            });
            this.next.bind(this).delay(this.options.speed * 1000 + this.options.duration * 1000);
        },
        rewind: function() {
            if(this.current >= this.items.length)
                this.current = 0;
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaBlank = new Class({
        initialize: function(e, o) {
            this.elements = e;
            this.options  = $extend(o || {}, {
                toolbar:     "yes",
                location:    "yes",
                directories: "yes",
                status:      "yes",
                menubar:     "yes",
                scrollbar:   "yes",
                resizable:   "yes",
                close:       "yes"
            });

            this.elements.each(function(el, i){
                var href = el.getProperty("href").split(/\?/);
                el.setProperty("href", href[0]);
                el.store("query_string", this._parseQuery(href[1]));
                el.addEvent("click", this.clickHandler.bind(this));
            }, this);
        },
        clickHandler: function(ev) {
            var params = $merge(this.options, ev.target.retrieve("query_string")),
                param = "";

            for(var i in params) {
                param += i + "=" + params[i] + ",";
            }

            param = param.substr(0, param.length - 1);
            window.open(ev.target.getProperty("href"), "monogusa_blank_window", param);
            return false;
        },
        _parseQuery: function(query) {
            var result = {},
                params = [],
                i;

            if(!query) return result;

            params = query.split(/[;&]/);
            if(params.length <= 0) {
                return result;
            }

            for(i = 0; i < params.length; i++) {
                var param = params[i].split(/[=]/);
                result[param[0]] = param[1];
            }

            return result;
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaAccordion = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaTab = new Class({
        tabs: [],
        panels: [],
        initialize: function(e, o) {
            this.element = e;
            this.options = $extend(o || {}, {
                active_class: "active"
            });

            this.tabs   = this.element.getElements("li")[0];
            this.tabs.each(function(e, i){
                var h = e.getElement("a").getProperty("href");
                this.panels.push(this.element.getElement(h)[0].setStyle("display", "none"));
            }, this);

            this.tabs.addEvents({
                "click": this.clickHandler.bind(this)
            });
        },
        clickHandler: function(ev) {
            var target = ev.target;
            this.panels.each(function(el, i){
                el.setStyle("display", "none").addClass("hide").removeClass("show");
            }, this);
            $$(target.getProperty("href")).setStyle("display", "block").removeClass("hide").addClass("show");
            return false;
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaStripe = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaHighlight = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaFswitch = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaScroller = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaGmap = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaKonami = new Class({
        initialize: function(e, o) {
        }
    });


    /**
     * monogusa Class Object
     *
     */
    var monogusaFn = {
        "rollopacity": monogusaRollOpacity,
        "rollimage": monogusaRollImage,
        "ticker": monogusaTicker,
        "blank": monogusaBlank,
        "accordion": monogusaAccordion,
        "tab": monogusaTab,
        "stripe": monogusaStripe,
        "highlight": monogusaHighlight,
        "fswitch": monogusaFswitch,
        "scroller": monogusaScroller,
        "gmap": monogusaGmap,
        "konami": monogusaKonami
    };


    /**
     * monogusa factory Class
     *
     */
    monogusa = new Class({
        initialize: function(method, elem, options) {
            return this.factory(method, elem, options);
        },
        /**
         * factory method
         *
         * @access public
         * @param  fn        String                 callable Class name
         * @param  el        HTMLElementNode|Array  HTMLElement Node(s)
         * @param  op        Object                 Class options Object
         * @return monogusaBase
         */
        factory: function(fn, el, op) {
            try {
                this._isAllowedMethod(fn);
                this._isAllowedElement(el);

                var cls = new monogusaFn[fn](el, op);
                return cls;
            }
            catch(e) {
                throw e;
            }
        },
        /**
         * check for allowed method ?
         *
         * @throw
         */
        _isAllowedMethod: function(m) {
            if($type(monogusaFn[m]) != "class")
                throw "Mehtod "+ m +" is not defined !";
        },
        /**
         * check for allowed HTMLElement ?
         *
         * @throw
         */
        _isAllowedElement: function(e) {
            if($type(e) == undefined)
                throw "HTML Element required !";
        }
    });
})();

