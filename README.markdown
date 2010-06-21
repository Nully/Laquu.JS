# laquu.js


## laquu.jsって？

laquu.jsは普段からのHTMLコーディング作業量を極力減らすためのjQueryプラグインです。

プラグインが散乱することを防ぎ、1ファイルで完結することで、後の管理を極力低減挿せます。

laquu.jsを使う事で、きっと「楽に作業を軽減」することができるはずです。


### 使い方

使い方は、scriptタグで読み込むだけで使う準備が整います。

<script type="text/javascript" src="/path/to/jquery.laquu.js"></script>


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


### 各機能の使い方

それぞれの機能の使い方は以下のとおりです。


#### _透明度によるロールオーバー opacityOver_

##### 機能

透明度を変更することで、ロールオーバーを実装することが出来ます。

##### 使い方

opacityOverは次のように呼び出して使います。
> $.laquu.opacityOver($("jQuery selector")[,{options}]);

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
> $.laquu.imageOver($("jQuery selector")[,{options}]);

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
> $.laquu.ticker($("jQuery selector")[,{options}]);

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
> $.laquu.blank($("jQuery selector")[,{options}]);

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
> $.laquu.accordioin($("jQuery selector")[,{options}]);

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
> $.laquu.tab($("jQuery selector")[,{options}]);

"jQuery Selector"はaccordionを適用したい要素のセレクタを記述します。

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
> $.laquu.stripe($("jQuery selector")[,{options}]);

"jQuery Selector"はaccordionを適用したい要素のセレクタを記述します。

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


#### _フォントサイズスウィッチャ fss_

##### 機能

フォントサイズを切り替えるためのボタンを実装します。
フォントサイズはユーザー定義CSSで変更がかのう。

##### 使い方

fssは次のように呼び出して使います。
> $.laquu.fss($("jQuery selector")[,{options}]);

"jQuery Selector"はaccordionを適用したい要素のセレクタを記述します。

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






