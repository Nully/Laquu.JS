var monogusa;
(function(){
    /**
     * monogusa Abstract class Object
     *
     */
    var monogusaAbstract = new Class({
        _options: {},
        _element: null,
        _version: 1.0,
        initialize: function(el, op) {
            this.setElement(el);
            this.setOptions(op);
        },
        getVersion: function() {
            return this._version;
        },
        setElement: function(el) {
            this._element = el;
        },
        getElement: function() {
            return this._element;
        },
        setOptions: function(options) {
            this._options = $merge(options, this._options);
        },
        getOptions: function() {
            return this._options;
        },
        setOption: function(n, v) {
            this._options[n] = v;
        },
        getOption: function(n) {
            return this._options[n];
        }
    });


    /**
     * monogusa Opacity Rollover class Object
     *
     */
    var monogusaRollOpacity = new Class({
        Extends: monogusaAbstract,
        _options: {
            opacity: .7,
            duration: 300,
            onHover: $empty,
            onOut: $empty
        },
        initialize: function(e, o) {
            var t = this;
            this.parent(e, o);
            this.getElement().each(function(el, i){
                el.addEvent("mouseover", function(ev){
                    t.onHandler(ev);
                });
                el.addEvent("mouseout", function(ev){
                    t.outHandler(ev);
                });
            });
        },
        onHandler: function(ev) {
            ev.target.get("tween", {
                "property": "opacity",
                "duration": this.getOption("duration")
            }).start(this.getOption("opacity"));
            this.getOption("onHover").apply("",arguments);
        },
        outHandler: function(ev) {
            ev.target.get("tween", {
                "property": "opacity",
                "duration": this.getOption("duration")
            }).start(1);
            this.getOption("onOut").apply("",arguments);
        }
    });


    /**
     * monogusa Opacity Rollover class Object
     *
     */
    var monogusaRollImage = new Class({
        Extends: monogusaAbstract,
        _options: {
            suffix: "_on",
            onHover: $empty,
            onOut: $empty
        },
        initialize: function(e, o) {
            var t = this;
            this.parent(e, o);
            this.getElement().each(function(el, i){
                el.addEvent("mouseover", function(ev){
                    t.onHandler(ev);
                });
                el.addEvent("mouseout", function(ev){
                    t.outHandler(ev);
                });
            });
        },
        onHandler: function(ev) {
            var src = ev.target.getProperty("src"),
                tmp = src.split(".");
            var ext = tmp.pop();
            src = tmp.join(".") + this.getOption("suffix") + "." + ext;
            ev.target.setProperty("src", src);

        },
        outHandler: function(ev) {
            var el = ev.target;
            var src = el.getProperty("src");
            el.setProperty("src", src.replace(new RegExp(this.getOption("suffix")), ""));
            
        }
    });


    /**
     * monogusa Ticker class Object
     */
    var monogusaTicker = new Class({
        Extends: monogusaAbstract,
        _options: {
            speed: 2,
            pause: 2,
            onComplete: $empty,
            onNext: $empty
        },
        current_item: -1,
        items: [],
        morpth: null,
        initialize: function(e, o) {
            if($type(e) == "array")
                e = e[0];

            this.parent(e, o);
            this.getElement().getParent("div").setStyles({
                position: "relative"
            });
            this.getElement().setStyles({
                position: "absolute"
            });

            this.items = this.getElement().getElements("li");
            this.morph = new Fx.Morph(this.getElement(), {
                duration: this.getOption("speed") * 1000,
                onComplete: function() {
                    var i = (this.current_item === 0) ? this.items.length : this.current_item;
                    this.items[i - 1].injectInside(this.getElement());
                    this.getElement().setStyles({
                        top: 0,
                        left: 0
                    });
                    this.getOption("onComplete").apply("", arguments);
                }.bind(this)
            });
            this.next();
        },
        next: function() {
            ++this.current_item;
            this.getOption("onNext").call(this.current());
            this.rewind();
            var pos = this.items[this.current_item];
            this.morph.start({
                top: -pos.offsetTop,
                left: -pos.offsetLeft
            });
            this.next.bind(this).delay(this.getOption("pause") * 1000 + this.getOption("speed") * 1000);
        },
        rewind: function() {
            if(this.items.length <= this.current_item) {
                this.current_item = 0;
            }
        },
        current: function() {
            return this.items[this.current_item];
        }
    });


    /**
     * monogusa Blank class Object
     */
    var monogusaBlank = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Accordion class Object
     */
    var monogusaAccordion = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Tab class Object
     */
    var monogusaTab = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Stripe class Object
     */
    var monogusaStripe = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Highlight class Object
     */
    var monogusaHighlight = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa FontSize Switcher class Object
     */
    var monogusaFswitch = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Scroller class Object
     */
    var monogusaScroller = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Google Maps class Object
     */
    var monogusaGmap = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Konami command class Object
     */
    var monogusaKonami = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
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

