/**
 * トーストプラグイン
 *
 * @オプション
 *   message: 表示するメッセージ
 *   showTime: Toastの表示時間
 *   fadeTime: フェードイン/アウトする時間
 */
(function($l){
    $l.Toast = {
        LENGTH_SHORT: 800,
        LENGTH_LONG: 1800,
        _defaults: {
            message: "AndroidOS風のToastメッセージ通知です。",
            showTime: 2000,
            fadeTime: 800,
            position: "center-center"
        },
        _queues: [],
        isToasted: false,
        show: function(options) {
            var o = $l.extend({}, this._defaults, options || {});
            if(this.isToasted === false) {
                this.isToasted = true;

                var toast = this._createToastContainer(o.message, o.position),
                    Toast = this;

                toast.fadeIn(o.fadeTime, function(){
                    var timer = setTimeout(function(){
                        toast.fadeOut(o.fadeTime, function(){
                            toast.remove();
                            Toast.isToasted = false;
                            clearTimeout(timer);
                            if(Toast.hasQueue()) {
                                Toast.show(Toast.getNextQueue());
                            }
                        });
                    }, o.showTime);
                });
            }
            else {
                this.pushQueue(o);
            }
        },
        /**
         * キューにメッセージを追加
         */
        pushQueue: function(options) {
            this._queues.push(options);
        },
        /**
         * 現在のキューから先頭を削除
         */
        dequeue: function() {
            if(this.hasQueue()) {
                this._queues.shift();
            }
        },
        /**
         * 全てのキューを削除
         */
        dequeueAll: function() {
            this._queues.length = 0;
        },
        /**
         * 次の再生スるキューを取得
         */
        getNextQueue: function() {
            return this._queues.shift();
        },
        /**
         * キューが有るか調べる
         */
        hasQueue: function() {
            return (this._queues.length > 0);
        },
        /**
         * トーストのコンテナーを生成
         */
        _createToastContainer: function(msg, position) {
            var toast = $l('<div class="laquu-toast-container"><p class="laquu-toast-message">'+ msg +'</p></div>').hide().appendTo("body");

            props = this._getToastPosition(position);
            props.position = "absolute";
            toast.css(props);

            return toast;
        },
        _getToastPosition: function(position) {
            // Objectならそのまま返却
            if(typeof position != "string") {
                return position;
            }

            // 文字列なら、画面のどこに配置するかを決定する
            var $w = $l(window),
                pos = {},
                toast = jQuery(".laquu-toast-container");
            switch(position) {
                case "top-left":
                    pos.top = (toast.outerHeight({ margin: true }) - toast.innerHeight()) / 2 + $w.scrollTop();
                    pos.left = (toast.outerWidth({ margin: true }) - toast.innerWidth()) / 2 + $w.scrollLeft();
                    break;
                case "top-center":
                    pos.top = (toast.outerHeight({ margin: true }) - toast.innerHeight()) / 2 + $w.scrollTop();
                    pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                    break;
                case "top-right":
                    pos.top = (toast.outerHeight({ margin: true }) - toast.innerHeight()) / 2+ $w.scrollTop();
                    pos.left = $w.width() - (toast.outerWidth({margin: true}) * 2) + toast.innerWidth() + $w.scrollLeft();
                    break;
                case "center-left":
                    pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                    pos.left = (toast.outerWidth({ margin: true }) - toast.innerWidth()) / 2 + $w.scrollLeft();
                    break;
                case "center-right":
                    pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                    pos.left = $w.width() - (toast.outerWidth({margin: true}) * 2) + toast.innerWidth() + $w.scrollLeft();
                    break;
                case "bottom-left":
                    pos.top = $w.height() - (toast.outerHeight({ margin: true }) * 2) + toast.innerHeight() + $w.scrollTop();
                    pos.left = (toast.outerWidth({ margin: true }) - toast.innerWidth()) / 2 + $w.scrollLeft();
                    break;
                case "bottom-center":
                    pos.top = $w.height() - (toast.outerHeight({ margin: true }) * 2) + toast.innerHeight() + $w.scrollTop();
                    pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                    break;
                case "bottom-right":
                    pos.top = $w.height() - (toast.outerHeight({ margin: true }) * 2) + toast.innerHeight() + $w.scrollTop();
                    pos.left = $w.width() - (toast.outerWidth({margin: true}) * 2) + toast.innerWidth() + $w.scrollLeft();
                    break;
                case "center-center":
                default:
                    pos.top = ($w.height() - toast.outerHeight()) / 2 + $w.scrollTop();
                    pos.left = ($w.width() - toast.outerWidth()) /2 + $w.scrollLeft();
                    break;
            }

            return pos;
        }
    };
})(laquu);