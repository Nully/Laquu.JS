#!/bin/bash

echo "Laquu.JSのコンパイル準備をしています..."

# 吐き出すファイル名
LAQUU=laquu.js
LAQUU_MIN=laquu.min.js

# ソースディレクトリ
SRC_DIR=src

# 書き出しディレクトリ
COMPILED_DIR=compiled

# テンポラリディレクトリ
MIN_DIR=min

# ビルドディレクトリ
BUILD_DIR=build


# プラグインの配列
PLUGINS=`ls ${SRC_DIR} | grep -v 'laquu.js'`


#Google Closure Compiler
G_COMPILER_NAME=google-javascript-compiler_20110921.jar
G_COMPILER=${BUILD_DIR}/$G_COMPILER_NAME
G_COMPILER_URL="http://code.google.com/intl/ja/closure/compiler/"



# 書き出しディレクトリの作成
if [ ! -d $COMPILED_DIR ]
then
    echo 'コンパイルディレクトリを作成します...'
    mkdir $COMPILED_DIR
fi


# テンポラリディレクトリの作成
if [ ! -d $MIN_DIR ]
then
    echo '最小構成保存ディレクトリを作成します...'
    mkdir $MIN_DIR
fi


# ClosureCompilerが存在するかチェック
if [ ! -d $BUILD_DIR ] || [ ! -f $G_COMPILER ]; then
    echo 'Closure Compilerが見つかりません'
    echo "${G_COMPILER_URL}\
からClosure Compilerをダウンロードして\
ファイル名を${G_COMPILER_NAME}として${BUILD_DIR}に置いてください..."
    exit
fi


# 書き出し済みかチェック
if [ -f $COMPILED_DIR/$LAQUU ] && [ -f $COMPILED_DIR/$LAQUU_MIN ]
then
    echo "${LAQUU}及び${LAQUU_MIN}はすでに存在しています。"
    echo 'コンパイル作業を中断します...'
    exit
fi



# コンパイル関数
# 第1引数は圧縮対象のファイル名
function compile
{
    echo "${1}を${LAQUU_MIN}に書きだしています。"
    java -jar $G_COMPILER --js $SRC_DIR/${1} --js_output_file $MIN_DIR/${1}
    echo "// ${1}" >> $COMPILED_DIR/$LAQUU_MIN
    cat $MIN_DIR/${1} >> $COMPILED_DIR/$LAQUU_MIN
    echo "" >> $COMPILED_DIR/$LAQUU_MIN
}



# コンパイル開始
echo "Laquu.JSのコンパイルを開始します。
"

echo '標準ファイルを書き出します。'

# プラグインの書き出し
if [ ! -f $COMPILED_DIR/$LAQUU ]; then
cat $SRC_DIR/laquu.js >> $COMPILED_DIR/$LAQUU
for p in $PLUGINS
do
    cat $SRC_DIR/$p >> $COMPILED_DIR/$LAQUU
done
fi

echo "標準ファイルの書き出しが完了しました。
"


echo "最小化ファイルを書き出します。"
if [ ! -f $COMPILED_DIR/$LAQUU_MIN ]; then
compile "laquu.js"
for pm in $PLUGINS
do
    compile $pm
done
fi

echo "最小化ファイルの書き出しが完了しました。
"
# プラグインの書き出し終わり


echo "Laquu.JSのコンパイルが完了しました。"
