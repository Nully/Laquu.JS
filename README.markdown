# Laquu.JS

## Laquu.JSって？

Laquu.JSは普段からのHTMLコーディング作業量を極力減らすためのjQueryプラグインです。

プラグインが散乱することを防ぎ、1ファイルで完結することで、後の管理を極力低減させます。

Laquu.JSを使う事で、きっと「楽に作業を軽減」することができるはずです。

## 使い方

使い方は、scriptタグで読み込むだけで使う準備が整います。

>     <script type="text/javascript" src="/path/to/jquery.Laquu.JS"></script>

## 機能一覧

Laquu.JSでサポートしている機能は次の23機能です。

+ [ver1.0.0] シンプルなアコーディオンパネル（accordion）
+ [ver1.0.0] ブラックアウトスクロール（blackoutscroll）
+ [ver1.0.0] ブランク（blank）
+ [ver1.0.0] パンくず（breadcrumb）
+ [ver1.0.0] バブルポップアップ（bubblepopup）
+ [ver1.0.0] ドロップダウン（dropdown）
+ [ver1.0.0] フォントサイズ（fontsize）
+ [ver1.0.0] インナースライド（innerslide）
+ [ver1.0.0] コナミ（konami）
+ [ver1.0.0] オパシティオーバー（opacityOver）
+ [ver1.0.0] オーバー（over）
+ [ver1.0.0] ピックメニュー（picMenu）
+ [ver1.0.0] スクローラー（scroller）
+ [ver1.0.0] ストライプ（stripe）
+ [ver1.0.0] タブ（tab）
+ [ver1.0.0] ティッカー（ticker）
+ [ver1.0.0] ツールチップ（tooltip）
+ [ver1.1.0] 拡張子アイコン（exticon）
+ [ver1.1.0] イメージオーバー（imageOver）
+ [ver1.1.0] スクロールtoビュー（s2v）
+ [ver1.2.0] ブリンク（blink）
+ [ver1.2.0] イーキューヘイト（eqheight）
+ [ver1.2.0] ポスフィックス（posfix）

今後も独断と偏見で色々な機能が追加される予定です。

## 各機能の使い方

このファイルでは収まり切らないので、Laquu.JSの公式サイトを御覧ください。

## 各プラグインのminファイルの作り方

Laquu.JSはver1.2.0から、Google ClosureCompilerを利用し、min構成を作っています。

build.sh（bash）を実行することで自動的に最小構成ファイルの全入りと、各プラグインの最小構成ファイルを書き出します。

>     $ cd Laquu.JS
>     $ chmod 0755 build.sh
>     $ ./build.sh
>     :
>     : いっぱいログが出ます
>     :
>     $ // 書き出し完了のメッセージが表示されれば完了です。

## ライセンスについて

MITライセンスで配布させていただいています。

商用利用もご自由に行ってください。

お気に召しましたら、開発者に1杯のビールかハイボールを下さい！XD

## プラグインを利用して発生した障害などについて

当プラグインはMITラインセンスとして配布している為、これら全ての障害などについては一切の責任を負いません。

全て自己責任で利用してください。