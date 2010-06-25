>     
>      __ _____ _____ __   __ __   __    _______ _____
>     |  |  _   |     |  | |  |  | |  |  |__   __| ___/
>     |  | / \  |  [] |  | |  |  | |  |     | |  \____\
>     |  |/__ \ |`--  |  |_|  |  |_|  |    _| |  /    /
>     |_____/\__|  |__|_______|_______|[] |__/  /____/
>


## laquu.jsって？

laquu.jsは普段からのHTMLコーディング作業量を極力減らすためのjQueryプラグインです。

プラグインが散乱することを防ぎ、1ファイルで完結することで、後の管理を極力低減させます。

laquu.jsを使う事で、きっと「楽に作業を軽減」することができるはずです。


### 使い方

使い方は、scriptタグで読み込むだけで使う準備が整います。

>     <script type="text/javascript" src="/path/to/jquery.laquu.js"></script>


### 機能一覧

laquu.jsでサポートしている機能は次の14機能です。

+ 透明度によるロールオーバー
+ 画像によるロールオーバー
+ シンプルなニュースティッカー
+ 新規ウィンドウ
+ シンプルなアコーディオンパネル
+ シンプルなタブパネル
+ ストライプテーブル
+ ホバー（IE6以下の対策用）
+ フォントサイズチェンジャー
+ リストを使ったドロップダウンメニュー
+ シンプルなツールチップ
+ バブルポップアップ
+ シンプルなイメージメニュー
+ スムーススクローラ
+ シンプルなlightbox simplebox


### 各機能の使い方

それぞれの機能の使い方は以下のとおりです。


#### _透明度によるロールオーバー opacityOver_

##### 機能

透明度を変更することで、ロールオーバーを実装することが出来ます。

##### 使い方

opacityOverは次のように呼び出して使います。
>     $.laquu.opacityOver($("jQuery selector")[,{options}]);

"jQuery Selector"は透明度を変更したい要素のセレクタを記述します。

##### 指定可能なオプション
_opacity_
ロールオーバー時の透明度を指定します。透明度は0〜1の間で指定します。

_duration_
指定された透明度になるまでの時間を指定します。ミリ秒単位または、"fast", "normal", "slow"のいずれかで指定します。

_onComplete_
フェードアウトが完了した際のコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onHover_
要素にホバーした際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onOut_
要素から外れた際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。



#### _画像によるロールオーバー imageOver_

##### 機能

画像を一定の規則で保存しておくことで、ロールオーバーを実装します。

##### 使い方

画像を2枚用意し、名前を「image.gif」と「image_on.gif」のような形で用意します。

imageOverは次のように呼び出して使います。
>     $.laquu.imageOver($("jQuery selector")[,{options}]);

"jQuery Selector"は画像を変更したい要素のセレクタを記述します。


タグは以下のような形になります。
>
>     <img src="/path/to/image.gif" />
>

##### 指定可能なオプション
_suffix_
ロールオーバーした画像のサフィックスを指定します。初期値は「_on」です。

_onComplete_
ロールオーバー完了後に予備さられるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onHover_
要素にホバーした際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onOut_
要素から外れた際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _シンプルなティッカー ticker_

##### 機能

よくあるニュースティッカーを実装します。

ヘッドラインのような扱い方ができるプラグインです。

##### 使い方

tickerは次のように呼び出して使います。
>     $.laquu.ticker($("jQuery selector")[,{options}]);

"jQuery Selector"はtickerを適用したい要素のセレクタを記述します。


タグは以下のような形になります。
>     <div class="ticker">
>         <ul>
>             <li>好きなタグを記述出来ます。</li>
>         </ul>
>     </div>


##### 指定可能なオプション
_speed_
ティッカーのスライドスピードです。ミリ秒単位で指定します。初期値は「1000ミリ秒」です。

_duration_
ティッカーがスライドするまでのスピードです。ミリ秒単位で指定します。初期値は「2000ミリ秒」です。

_onComplete_
ティッカーのスライド完了後に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onStep_
ティッカーのアニメーションが実行されている間に呼び出されるコールバック関数です。
これは、jQueryに存在するanimate()メソッドの引数を受け取ります。


#### _新規ウィンドウ blank_

##### 機能

(X)HTMLでは非推奨となった「target="_blank"」の代替となるプラグインです。

##### 使い方

blankは次のように呼び出して使います。
>     $.laquu.blank($("jQuery selector")[,{options}]);

"jQuery Selector"はtickerを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <a href="http://example.com/" class="blank">Goto Example.com !</a>

また、リンクに以下のように指定することで、ウィンドウのサイズを指定することが出来ます。
>     <a href="http://example.com/?width=800&amp;height=600" class="blank">Goto Example.com !</a>


##### 指定可能なオプション

オプションはすべて'yes'か'no'で指定します。

_toolbar_
ツールバーの可否

_location_
アドレスバーの可否

_directories_
ユーザー設定のツールバーの可否

_status_
ステータスバーの可否

_menubar_
メニューバーの可否

_scrollbar_
スクロールバーの可否

_resizable_
リサイズの可否

_close_
閉じるボタンの可否


#### _シンプルなアコーディオン accordion_

##### 機能

シンプルなアコーディオンを提供します。

##### 使い方

accrodionは次のように呼び出して使います。
>     $.laquu.accordioin($("jQuery selector")[,{options}]);

"jQuery Selector"はaccordionを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <div id="laquuAccordion" class="example">
>         <h4 class="laquu_accordion_header">コンテンツ1</h4>
>         <div class="laquu_accordion_content">
>             コンテンツ1
>         </div>
>         <h4 class="laquu_accordion_header">コンテンツ2</h4>
>         <div class="laquu_accordion_content">
>             コンテンツ2
>         </div>
>     </div>


##### 指定可能なオプション

_speed_
アコーディオンの開閉スピードを指定します。デフォルトは「600」ミリ秒です。

_header_class_
アコーディオンのトリガとなる、ヘッダーのクラス名を指定します。デフォルトは「laquu_accordion_header」です。

_content_class_
アコーディオンのトリガとなる、ヘッダーのクラス名を指定します。デフォルトは「laquu_accordion_header」です。

_status_
アコーディオンタブがアクティブ時に付加されるクラス名を指定します。デフォルトは「active」です。

_onHide_
アコーディオンパネルが非表示になった際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onShow_
アコーディオンパネルが表示にされた際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _シンプルなタブパネル tab_

##### 機能

シンプルなタブパネルを実装します。

##### 使い方

tabは次のように呼び出して使います。
>     $.laquu.tab($("jQuery selector")[,{options}]);

"jQuery Selector"はtabを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <div id="laquuTab">
>         <ul>
>             <li><a href="#panel1">show panel 1</a></li>
>             <li><a href="#panel2">show panel 2</a></li>
>             <li><a href="#panel3">show panel 3</a></li>
>         </ul>
>         <div id="panel1">panel1</div>
>         <div id="panel2">panel2</div>
>         <div id="panel3">panel3</div>
>     </div>

##### 指定可能なオプション

_active_class_
アクティブなタブに付加されるクラス名です。デフォルトは「active」です。


#### _ストライプテーブル stripe_

##### 機能

よくあるストライプテーブルを複雑なコードを書かずに実装します。

##### 使い方

stripeは次のように呼び出して使います。
>     $.laquu.stripe($("jQuery selector")[,{options}]);

"jQuery Selector"はstripeを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <table border="0" cellpadding="0" cellspacing="0">
>         <tr>
>             <th>テーブルヘッダ</th>
>             <td>定義済み内容</td>
>         </tr>
>         <tr>
>             <th>テーブルヘッダ</th>
>             <td>定義済み内容</td>
>         </tr>
>         <tr>
>             <th>テーブルヘッダ</th>
>             <td>定義済み内容</td>
>         </tr>
>     </table>


##### 指定可能なオプション

_even_class_
偶数行に付加されるクラス名を指定します。デフォルトは「even」

_odd_class_
奇数行に付加されるクラス名を指定します。デフォルトは「odd」

_onHover_
行にマウスがホバーした際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onOut_
行からマウスが外れた際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _ホバー hover_

##### 機能

IE6以下のブラウザでは「:hover」擬似クラスが特定要素以外では使えない為、
このプラグインで擬似的なホバー擬似クラスを実装します。

また、「IE6のタメだけ」でなくとも使えます。

##### 使い方

hoverは次のように呼び出して使います。
>     $.laquu.hover($("jQuery selector")[,{options}]);

"jQuery Selector"はhoverを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
サンプルは、「input要素」です。
>     <input type="submit" value="Submit" name="submit" />


##### 指定可能なオプション

_hover_class_
対象の要素にマウスがホバーした際に付加されるクラス名です。デフォルトは「hover」です。

_onHover_
対象の要素にマウスがホバーした際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onOut_
対象の要素からマウスがはずれた際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _フォントサイズスウィッチャ fss_

##### 機能

フォントサイズを切り替えるためのボタンを実装します。
フォントサイズはユーザー定義CSSで変更がかのう。

##### 使い方

fssは次のように呼び出して使います。
>     $.laquu.fss($("jQuery selector")[,{options}]);

"jQuery Selector"はfssを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <div id="font-switch">
>         <dl>
>             <dt>フォントサイズ</dt>
>             <dd><a href="#small">小</a></dd>
>             <dd><a href="#middle">中</a></dd>
>             <dd><a href="#large">大</a></dd>
>         </dl>
>     </div>

* 注意 * リンク属性はフォントサイズを切り替える際に、bodyへと追加されるクラス名です。
ユーザー定義CSSでサイズを定義する時は、「.リンク属性値」という形でサイズを定義してください。

##### 指定可能なオプション

_css_file_
ユーザーが定義したCSSファイル名を指定します。デフォルトは「/css/fss.css」です。

_onChange_
フォントサイズが切り替わった際に呼び出されるコールバック関数です。
引数は、jQueryHTMLCollection、jQueryEventです。

_cookie_
jQuery.cookieプラグインが必須です。
クッキーを利用することで、以前閲覧したフォントサイズを保存します。


#### _シンプルなドロップダウンメニュー dropdown_

##### 機能

シンプルなドロップダウンメニューを実装します。
階層はほぼ無限にいける（はず）ので、階層の深いメニューでも利用出来ます。

##### 使い方

dropdownは次のように呼び出して使います。
>     $.laquu.dropdown($("jQuery selector")[,{options}]);

"jQuery Selector"はdropdownを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <ul id="dropdown">
>         <li>Menu1
>             <ul class="submenu">
>                 <li>SubMenu1</li>
>                 <li>SubMenu1</li>
>                 <li>SubMenu1</li>
>                 <li>SubMenu1</li>
>             </ul>
>         </li>
>         <li>Menu2</li>
>         <li>Menu3</li>
>         <li>Menu4</li>
>     </ul>

##### 指定可能なオプション

_hover_class_
メニューに付加するクラス名です。
付加されるタイミングはマウスがメニューに「ホバー」した時です。

_show_speed_
タブメニューを表示するまでの時間です。ミリ秒で指定します。デフォルトは「200」

_hide_speed_
タブメニューが非表示になるまでの時間です。ミリ秒で指定します。デフォルトは「300」

_onShow_
ドロップダウンが表示された際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onHide_
ドロップダウンが非表示になった際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _シンプルなツールチップ tooltip_

##### 機能

シンプルなツールチップを実装します。

##### 使い方

tooltipは次のように呼び出して使います。
>     $.laquu.tooltip($("jQuery selector")[,{options}]);

"jQuery Selector"はtooltipを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <p><span class="tooltip" title="laquu.js Tooltip !">ツールチップを表示します</span></p>

##### 指定可能なオプション

_dist_x_
マウスからツールチップまでの調整位置を数値で指定します。マイナスで指定すれば、マウスより上に、プラスで指定すればマウスより下に表示されます。

_dist_y_
マウスからツールチップまでの縦軸調整位置を数値で指定します。マイナスで指定すれば、マウスより左に、プラスで指定すればマウスより右に表示されます。

_show_speed_
ツールチップを表示するまでの時間をミリ秒で指定します。デフォルトは「200」

_onShow_
ツールチップが表示された際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onHide_
ツールチップが非表示になった際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onMove_
マウスが動くたびに呼び出されるコールバック関数です。
引数は、現在の横軸位置、現在の縦軸位置です。
また、「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _バブルポップアップ bubblepop_

##### 機能

素敵なバブルポップアップを実装します。

##### 使い方

bubblepopは次のように呼び出して使います。
>     $.laquu.bubblepop($("jQuery selector")[,{options}]);

"jQuery Selector"はbubblepopを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <div class="bubble">
>         <div class="popup">バブルポップアップの内容です。</div>
>         <p><a href="#" class="trigger">バブルポップアップ</a></p>
>     </div>

##### 指定可能なオプション

_dist_
バブルポップアップさせるトリガまでの距離を数値で指定します。初期値は「15」です。

_hide_delay_
バブルポップアップを非表示にするまでの時間をミリ秒で指定します。初期値は「2000」です。

_popup_class_
バブルポップアップさせる内容に指定するクラスです。初期値は「popup」です。

_trigger_class_
バブルポップアップを起動するためのトリガに指定するクラス名です。初期値は「trigger」です。

_easing_
バブルポップアップを表示するタメのイージングを文字列で指定します。初期値は「swing」です。
カスタムイージングを使いたい場合は、自作するか、jQuery.easingプラグインを導入する必要が有ります。

_onStep_
バブルポップアップが目標に向かう度に呼び出されるコールバック関数です。
引数は現在の「ステップ数」、「指定した要素オブジェクト」です。
詳しくは、jQuery.animate()メソッドの「step」引数を参照してください。

_onShowComplete_
バブルポップアップの表示が完了した際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onHideComplete_
バブルポップアップが非表示になった際に呼び出されるコールバック関数です。
「this」キーワードを利用することで、指定した要素へのアクセスが可能です。


#### _イメージメニュー imgmenu_

##### 機能

画像で構成されたスライドメニューを実装します。
自動スクロールも有り、Flashを使うほど大きく無い画像スライダを作成する際に便利です。

##### 使い方

imgmenuは次のように呼び出して使います。
>     $.laquu.imgmenu($("jQuery selector")[,{options}]);

"jQuery Selector"imgmenuを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
また、縦バージョンも同等の形で記述出来ます。
>     <div class="imageMenuWrap">
>         <ul class="imageMenu">
>             <li><img src="/path/to/img01.jpg" /></li>
>             <li><img src="/path/to/img02.jpg" /></li>
>             <li><img src="/path/to/img03.jpg" /></li>
>             <li><img src="/path/to/img04.jpg" /></li>
>             <li><img src="/path/to/img05.jpg" /></li>
>         </ul>
>     </div>

##### 指定可能なオプション

_easing_
画像をスライドする際に利用するイージングです。デフォルトは「swing」です。
* 注意 * イージングを利用するには、自作するか、jQuery.easingなどのプラグインを利用する必要があります。

_duration_
画像のスライド速度を指定します。デフォルトは「2500」です。

_show_size_
画像にホバーした際に、表示するサイズを指定します。デフォルトは「200px」です。

_hide_size_
ホバーしていない他の画像のサイズを指定します。デフォルトは「160px」です。

_is_vertical_
縦にスライドを行う場合はtrueを指定します。デフォルトは「false」です。

_auto_
trueを指定する事で、自動スクロールします。

_auto_duration_
autoがtrueの場合に指定します。
自動スクロールするまでの時間をミリ秒で指定します。デフォルトは「2500」です。


#### _スムーススクローラー scroller_

##### 機能

スムースに動作するスクローラを実装します。
イージングを導入することで様々なスクロールが行えます。

##### 使い方

scrollerは次のように呼び出して使います。
>     $.laquu.scroller($("jQuery selector")[,{options}]);

"jQuery Selector"はscrollerを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <p><a href="#container" class="scroller">ページトップへ</a></p>

##### 指定可能なオプション

_easing_
スクロールする際のイージングを指定します。デフォルトは「swing」です。
* 注意 * イージングを利用するには、自作するか、jQuery.easingなどのプラグインを利用する必要があります。

_speed_
スクロールが完了するまでの時間をミリ秒で指定します。デフォルトは「1500」です。

_onScrollEnd_
スクロールが完了した際に呼び出されるコールバック関数です。
引数は「ターゲットとなった要素」です。
また、「this」キーワードを利用することで、指定した要素へのアクセスが可能です。

_onStep_
スクロールが行われるたびに呼び出されるコールバック関数です。
引数は「現在までに完了したstep数」と「対象となった要素を含んだオブジェクト」です。
また、「this」キーワードを利用することで、指定した要素へのアクセスが可能です。



#### _シンプルなlightbox simplebox_

##### 機能

jQuery Lightboxでもすでに実装されている、画像表示エフェクトを実装します。
極めてシンプル（ほとんど装飾は無し）なsimpleboxですが、CSSでの後日装飾が可能です。
また、画像ページャもついていて、キーボードによるページ遷移も可能です。


##### 使い方

simpleboxは次のように呼び出して使います。
>     $.laquu.simplebox($("jQuery selector")[,{options}]);

"jQuery Selector"はsimpleboxを適用したい要素のセレクタを記述します。

タグは以下のような形になります。
>     <ul>
>         <li><a href="path/to/img01.jpg" class="simplebox"><img src="path/to/img01.jpg" /></a></li>
>         <li><a href="path/to/img02.jpg" class="simplebox"><img src="path/to/img02.jpg" /></a></li>
>         <li><a href="path/to/img03.jpg" class="simplebox"><img src="path/to/img03.jpg" /></a></li>
>     </ul>

また、グルーピングを行うことも可能です。
>     <ul>
>         <li><a href="path/to/img01.jpg" rel="group1"><img src="path/to/img01.jpg" /></a></li>
>         <li><a href="path/to/img02.jpg" rel="group2"><img src="path/to/img02.jpg" /></a></li>
>         <li><a href="path/to/img03.jpg" rel="group1"><img src="path/to/img03.jpg" /></a></li>
>         <li><a href="path/to/img04.jpg" rel="group2"><img src="path/to/img04.jpg" /></a></li>
>     </ul>

また、グルーピングを行う際は、以下のように指定して抽出する必要があります。
>     jQuery("a[rel='gropu1']")


##### 指定可能なオプション

_loader_img_
画像を読み込んでいる最中のローディングアイコンを指定します。デフォルトは「img/ajax-loader.gif」です。

_prev_text_
画像ページャの次へ進むためのリンクテキストを指定します。デフォルトは「next&laquo;」です。

_next_text_: 
画像ページャの前へ進むためのリンクテキストを指定します。デフォルトは「next &raquo;」です。


