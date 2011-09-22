#!/bin/sh

echo "Laquu.JSのコンパイル準備をしています"

# 吐き出すファイル名
LAQUU=laquu.js
LAQUU_MIN=laquu.min.js

# ソースディレクトリ
SRC_DIR=src

# 書き出しディレクトリ
COMPILED_DIR=compiled

# テンポラリディレクトリ
MIN_DIR=min

# プラグインの配列
PLUGINS=`ls ${SRC_DIR} | grep -v 'core.js'`

#Google Closure Compiler
G_COMPILER=build/google-javascript-compiler_20110921.jar


# 書き出しディレクトリの作成
if [ ! -d $COMPILED_DIR ]
then
    echo 'コンパイルディレクトリを作成します'
    mkdir $COMPILED_DIR
fi


# テンポラリディレクトリの作成
if [ ! -d $MIN_DIR ]
then
    echo '最小構成保存ディレクトリを作成します'
    mkdir $MIN_DIR
fi


# 書き出し済みかチェック
if [ -f $COMPILED_DIR/$LAQUU ] && [ -f $COMPILED_DIR/$LAQUU_MIN ]
then
    echo $LAQUU 'はすでに存在しています。'
    echo 'コンパイル作業を中断します。'
    exit
fi


# コンパイル開始
echo "Laquu.JSのコンパイルを開始します"
echo ""


# プラグインの書き出し
if [ ! -f $COMPILED_DIR/$LAQUU ]; then
cat $SRC_DIR/laquu.js >> $COMPILED_DIR/$LAQUU
for p in $PLUGINS
do
    echo "${p}を${LAQUU}に書きだしています。"
    cat $SRC_DIR/$p >> $COMPILED_DIR/$LAQUU
done
fi


if [ ! -f $COMPILED_DIR/$LAQUU_MIN ]; then
cat $SRC_DIR/laquu.js >> $COMPILED_DIR/$LAQUU_MIN
for pm in $PLUGINS
do
    echo "${pm}を${LAQUU_MIN}に書きだしています。"
    java -jar $G_COMPILER --js $SRC_DIR/${pm} --js_output_file $MIN_DIR/$pm
    echo "\\n // $pm" >> $COMPILED_DIR/$LAQUU_MIN
    cat $MIN_DIR/$pm >> $COMPILED_DIR/$LAQUU_MIN
done
fi
# プラグインの書き出し終わり


echo "Laquu.JSのコンパイルが完了しました"
