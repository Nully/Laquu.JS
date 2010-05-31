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
     * monogusa Rollover class Object
     */
    var monogusaRollover = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
        }
    });


    /**
     * monogusa Ticker class Object
     */
    var monogusaTicker = new Class({
        Extends: monogusaAbstract,
        initialize: function(e, o) {
            this.parent(e, o);
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
        "rollover": monogusaRollover,
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
            if($type(monogusaFn[m]) != "function")
                throw "Mehtod "+ m +" is not defined !";
        },
        /**
         * check for allowed HTMLElement ?
         *
         * @throw
         */
        _isAllowedElement: function(e) {
            if($type(el) == undefined)
                throw "HTML Element required !";
        }
    });
})();

