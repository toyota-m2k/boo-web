# React.js / Vue.js / Svelte.js を比較してみた。

JavaScript用 Web アプリ開発フレームワークのうち、有名どころ３つを使って、ある程度実用的なアプリ - 動画プレーヤーアプリ（メディアサーバーから動画リストを取得して再生する）を実際に作ってみて、どのフレームワークが使いやすいかを比較してみました。

## メディアサーバー
拙作 [boo-server](https://github.com/toyota-m2k/boo-server) を使いました。
尚、boo-server の実行には、[ffmpeg](https://ffmpeg.org/) が必要です。

### メディアサーバのインストール
```
git clone https://github.com/toyota-m2k/boo-server.git
cd boo-server
yarn install
（private/config.json, private/targets.jsonを編集）
yarn start
```

### config.json
private/config.json.sample を参考にしてください。
- ffprobe: 
 ffmpeg の ffprove(.exe)のパスを指定
- port: boo-server のポート番号を指定
- player: 各プレーヤーをboo-server から起動する場合に、サーバールート（例えば、.../react/boo-player/dist などを）を指定します。プレーヤーをデバッグ実行(viteのサーバーを利用）する場合は設定不要です。

### targets.json
メディアファイル（*.mp4, *.mp3など）を保存しているフォルダのパスを指定します。
private/targets.json.sample を参考にしてください。

## フォルダ構成
```
./
  react       React.js で作成した動画プレーヤーアプリ
  vue         Vue.js で作成した動画プレーヤーアプリ
  svelte      Svelte.js で作成した動画プレーヤーアプリ
  README.md   このファイル
```

## デバッグ
各アプリのディレクトリ内で、次のコマンドで、初期化＋デバッグ用サーバー(vite)を起動します。
```
yarn install
yarn dev
```
続いて、vscodeやWebStormなどのデバッガで、http://localhost:ポート番号 を開きます。
ポート番号は、デフォルトで、
- svelte: 5500
- react: 5600
- vue: 5700

としています（vute.config.ts で変更可能です）。
尚、メディアサーバーのポート番号（デフォルト:3200）を変更した場合は、各アプリの `store/DebugConfig.ts" の BooServer を変更してください。

## ビルド + メディアサーバーへの統合
各アプリを、以下のコマンドでビルドします。
```
yarn install
yarn build
```

メディアサーバーの `private/config.json` の "player" フィールドに、ビルドした、index.htmlの入ったフォルダ(svelte\boo-player\distなど)へのフルパスを記述してサーバーを再起動します。

http://localhost:3200/ で、プレーヤーアプリを起動します。

## 結果と感想

### React
![react](https://user-images.githubusercontent.com/11642381/183824740-4e762e0b-4ea1-421c-8dc0-51e5bd363b44.png)

React用のメジャーっぽい、Materialデザインフレームワーク `mui/material` を使ってみたのだが、なんかUIがしょぼい。
リストビューの更新が、異常に遅い、など、ちょっと不具合っぽい挙動もみられ、少なくとも、デザインフレームワークは他のものを使ったほうがよさそう。
アニメーション(UI Effect）は、基本、自力でなんとかする必要があり、他のフレームワークに比べて、ちょっと手薄な印象。
3rdパーティ製ライブラリはとても充実しているが、逆に多すぎて、何を使えばよいのか悩む。
JSのコードの中に、JSXに慣れていないので、「HTMLをJSのコードの中に書く」のが気持ち悪かった。

### Vue
![vue](https://user-images.githubusercontent.com/11642381/183862811-7b8d8300-a24d-498b-a6a5-c2d91fdcca86.png)

３つのフレームワーク中、いちばんキツかった。
Vue2の書き方(Options API)とVue3の書き方(Component API)があり、公式ドキュメントが Vue2 のOptions API の説明から入っていたし、
それぞれ、単にオブジェクトを返す書き方と、defineComponent() を使う書き方があって、Component API の方には、さらに、script setup 記法もあり、慣れるまで、とても混乱した。
また、Vue3 になっても、一部Vue2の仕様を引きずっており、TypeScriptのメリットが十分生かせていない気がする。
さらに、v-model:で双方向バンディングができる、ということだが、カスタムコントロールにこれを実装しようとすると、イベントハンドリング＋プロパティ更新を自前で用意する必要があり、Reactで実装するのと大差ない。
むしろ、イベントハンドラなどが隠蔽される分、デバッグし辛かった。
Vue と React どっちを選ぶ？と聞かれたら、やっぱりReactかな。

### Svelte
![svelte](https://user-images.githubusercontent.com/11642381/183824886-12060ec3-5767-4071-8718-a32f2ee71112.png)

あまり期待していなかったのだけれど、思いがけず素敵なフレームワークだった。
まず、チュートリアルが非常によくできている。１項目ずつ独立していて、領域外タップの検出とか、PIN入力画面とか、かなり実用的なテーマも含まれており、
しょーもないアプリをステップワイズに作っていく系のチュートリアル（R*t)に比べて格段に楽しい。あ、それでも、Reactはチュートリアルがあるだけマシか。
コーディングに関しては、若干のルールはあるものの、概ね直感的でわかりやすい。ただ、１点だけ、HTMLテンプレート内に、イベントハンドラを書くとき、{}が、ラムダ式とかJSのブロックに見えて失敗しがち。
例えば、
```
    ng: on:click={dispatch("next")}         // dispatch("next")の戻り値が onclickハンドラにセットされる
    ok: on:click={()=>dispatch("next")}
    ok: on:click={onHandleNext}             // function onHandleNext() {...}

```
など。
プラットフォームとしては、非常に使いやすくて満足なのだが、周辺ライブラリに関しては、まだまだ、React/Vue に比べて少ない。まだ発展途上感がある点が不安材料。


## 勝手にランキング

1. 学習コスト
   Svelte < React < Vue
   
   Svelteの圧勝。Vue2 なら Reactに勝てたと思うけど。Vue3 になって、急激に難しくなってしまったように思う。

2. アプリの作りやすさ
   Svelte > React > Vue
   
   Svelteの双方向バンディングが、他のプラットフォームに比べて圧倒的に便利だし、Store (Readable/Writable) もGood。
   この観点では、慣れると、React と Vue に大差ない気もするが、Vueは、書き方がいろいろありすぎて、都度調べる必要があったり、型エラーが出たりして、辛かったので。

3. デバッグのしやすさ
   React > Svelte > Vue
   
   Reactは、基本がJavaScriptなので、だいたい、どこにでもブレークが張れて、比較的デバッグしやすい。一方、SvelteやVueは、テンプレートの中のコードにブレークが張れなかったり、コンパイルエラーの原因が探りにくかったりした。
   特に Vue は「バインドするオブジェクトが不正」のような状況で、
   ```
   Unhandled error during execution of scheduler flush. This is likely a Vue internals bug.
   ```
   のようなエラーが出て、絶望しかけたりもした。

4. ライブラリの充実度
   React > Vue > Svelte
   
   ライブラリの充実度は、フレームワークの歴史の長さに依存するので、新参のSvelteは不利。
   また、Vueのライブラリは（数はあるが）Vue3未対応のものも多く、Vue3用の使えるライブラリに限定すると案外少なくて、もしかすると、Svelteと大差ないのかもしれない。

5. 信頼性・安心感
   React > Vue > Svelte
   
   当然、これまでの歴史と実績に裏付けられた React や Vue の方が安心だとは思うし、Svelteの発展途上感は否めない。
   安心感を採るか、革新性を優先するか、がSvelteを採用するかどうかの分かれ道かと。

6. 柔軟性
   React > Svelte > Vue
   
   フレームワークに依存しないts/ktによる実装モジュール（ビューモデルなど）と、ビュー（フレームワークによる実装）から簡単に利用できるかどうか、を柔軟性として評価した。
   その点、もともと素のJavaScriptに近い React が、一番、抵抗がなかった。
   次にSvelteも、外部モジュールがフレームワークに依存してよいなら、普通に Writable などを定義できるし、RxJS の Observable をWritable/Readableとして参照することもできそうなので、特に問題はないと思われる。
   Vueについては、外部で定義したObservableな変数を直接リアクティブに扱うことができず、ローカルなステート(ref())を介してバインドする必要があり、かなり煩雑な実装となった。

7. 将来性
    Svelte > React > Vue
    
    完全に個人的趣味だが、Svelte が好きなので、これからも頑張ってほしい。
    もともと、Vue2 は好きだったので、頑張ってほしいが、今の路線（＝他のフレームワークの`OR`）では、将来にあまり期待が持てない。
    React は・・・私が応援しなくてもきっと大丈夫ｗ

