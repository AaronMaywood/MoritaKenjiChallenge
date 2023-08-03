// 問51
// 問50の変数fafa内にある要素を出力してください //期待する出力 //['one','info@fa'] //['two', 'send@fafa'] //['three', 'hoso@fafa']

const fafa = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']];
fafa.forEach(i => console.log(i))
	// [ 'one', 'info@fa' ]
	// [ 'two', 'send@fafa' ]
	// [ 'three', 'hoso@fafa' ]

// →模範解答ではMap を使用している
// Mapでの繰り返しループ
// https://ja.javascript.info/map-set#ref-1063
var fafa = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']];
const m = new Map(fafa)
for (var entry of m.entries()){
 console.log(entry);
}
	// [ 'one', 'info@fa' ]
	// [ 'two', 'send@fafa' ]
	// [ 'three', 'hoso@fafa' ]

問52 #正規表現
'morita kenji'のような1つ以上の小英字、半角スペース、1つ以上の小英字にマッチした場合、配列['morita kenji']が返るようにしてください。

const s = 'morita kenji'
const r = /[a-z]+ [a-z]+/
console.log(s.match(r)) // [ 'morita kenji', index: 0, input: 'morita kenji', groups: undefined ]

//正解例
// regexp.exec を使用している
// https://ja.javascript.info/regexp-methods
// console.log( /\w+\s\w+/.exec('morita kenji') )

問53 #正規表現
このような 'It is an important problem'と'The import duty is not cheap'の文字列内importにマッチするとbooleanを返す記述をしてください

const str = 'Itjis an jmportant problem';
const str2 = 'The import duty is not cheap';
const str3 = 'この文にはインポートという単語はありません';
const r = /import/
console.log(str.search(r) > 0)	// true
console.log(str2.search(r) > 0)	// true
console.log(str3.search(r) > 0)	// false

// true/false を直接返す regexp.test() がある
// https://ja.javascript.info/regexp-methods#ref-538
console.log(r.test(str))	// true
console.log(r.test(str2))	// true
console.log(r.test(str3))	// false

// 模範解答では単語として調査するように
// 単語の境界線を示す \b を使っている
// （この場合、str はtrue だが str2 はfalseになる）

const str = 'It is an important problem';
const str2 = 'The import duty is not cheap';
let isImport = /.*\bimport\b.*/.test(str);
isImport	//false
let isImport = /.*\bimport\b.*/.test(str2);
isImport	//true


// 問54 #正規表現
// ひらがな全てにマッチ、半角カタカナ全てにマッチ、カタカナ全てにマッチする正規表現を記述してください
//
// →ひらがな全てにマッチとは、ひらがな全体の範囲内に文字が収まっているかということで、正規表現で文字の範囲を表記する文字クラスを使用して考える
// https://ja.javascript.info/regexp-character-classes
// →文字の範囲を指定するには、JavaScript が使用している文字コードであるUnicodeを確認する
// ひらがなが含まれているのはこちら
// https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_3000-3FFF
// 「あ」の小さな文字「ぁ」から「け」の小さな文字「ゖ」までを範囲指定すれば全てのひらがなを選ぶことになる（「ゖ」のかわりに「ん」で止めても良い）
// カタカナも同様に考える
// 
[ぁ-ん] //ひらがな
[ァ-ヶ] //カタカナ
// 半角カタカナはUnicode の別ページにある（探すのが一苦労だ）
// https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_F000-FFFF
// 「ｦ」から「ﾟ」を範囲指定すれば良い
console.log(/[ｦ-ﾟ]+/.test("ｦｧｨｩｪｫｬ"))	// true
// 模範解答では、Unicode エスケープシーケンス を使用して同様のことを書いている
// Unicode エスケープシーケンスはキーボードから入力しにくい文字を16進数で表記することができる
/^[\uFF65-\uFF9F]+$/ //半角カタカナ

// 問55 #正規表現
// 「」の中に「ヤッホー!」の文字列が1回以上続く場合にのみマッチする正規表現を書いてください。(！が英単語を構成する文字以外の場合はどうか、また「ヤッホー！」が2回以上3回以下にマッチにはどう書きますか)
 
// →問題の意味がわかりにくいので回答を見て進める
const str = '「ヤッホー！ヤッホー！」';
console.log(/「(ヤッホー！)+」/.exec(str)); //['「ヤッホー！ヤッホー！」', 'ヤッホー！']

// ヤッホー！が２回以上３回以下（つまり２回か３回続く場合）
// パターンの回数を指定するには、量指定子を使用する
// https://ja.javascript.info/regexp-quantifiers
const str1 = '「ヤッホー」';
const str2 = '「ヤッホー！ヤッホー！」';
const str3 = '「ヤッホー！ヤッホー！ヤッホー！」';
const str4 = '「ヤッホー！ヤッホー！ヤッホー！ヤッホー！」';
const r = /「(ヤッホー！){2,3}」/
console.log(r.test(str1))	// false
console.log(r.test(str2))	// true
console.log(r.test(str3))	// true
console.log(r.test(str4))	// false

// 「！が英単語を構成する文字以外の場合」の意味がわからなかったが、模範解答を見て「？」や「＠」の文字にした場合だとわかった
const str = '「ヤッホー?ヤッホー@」';
console.log(/「(ヤッホー\W)+」/.exec(str)) //  ['「ヤッホー?ヤッホー@」', 'ヤッホー@']

// 問56 #正規表現
// 正規表現の
// /(ありがとう|こんにちは｜さようなら)/
// と
// /ありがとう|こんにちは｜さようなら/
// の違いを教えてください。
// それぞれexecメソッドを使用した際の返り値を教えてください
//
// →答えを見て答えから学ぶ
//
// 文中に使えるかどうか
const str = '彼はありがとうと言った';
/彼は(ありがとう|こんにちは｜さようなら)と言った/.exec(str); //['彼はありがとうと言った', 'ありがとう']
const str = '彼はありがとうと言った';
/彼はありがとう|こんにちは｜さようならと言った/.exec(str);	//['彼はありがとう']

// 問57 #正規表現
// 「When」、「Where」、「Who」、「What」、「Why」、「How」の単語のみにマッチする正規表現を書きなさい

const r = /When|Where|Who|What|Why|How/

// 模範解答
const str = 'How';
/Wh(en|ere|o|at|y|)|How/.exec(str);

// 問58 #高度な話題
// こちらが
// x = new Boolean(false)
// if文の式として渡すと実行されるか答えなさい
// (参照 https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Boolean、オブジェクトはtrueとみなされる)
// 
x = new Boolean(false);
if (x) {
	console.log('hello') //実行される
}

//see: 開眼!Javascirpt(O'REILLY)

// 問59 #高度な話題
// 
// myFalse = new Boolean(false);
// g = new Boolean(myFalse);
// 上記のコードはtrueかfalseか
// 
// →問58がわかればこちらは簡単
// 答え: true
// 

// 問60
// undefined == null
// の真偽値は何か

console.log(undefined == null)	// true

// 問61 #高度な話題 - クロージャーとしては簡単、これくらいはわかってもいいかもしれない
// 関数iiを実行すると返り値で関数を受け取り、その関数に引数'home'を渡し実行すると'my home'と返ってくるクロージャーを作ってください
//
// クロージャーを学ぶ
// https://ja.javascript.info/closure

function ii(){
	return function(name){
		return `my ${name}`
	}
}

const c = ii()
console.log(c('home'))

// 問62 今の時間、何時何分何秒を表してください
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date
// 1. Date() を呼び出す
console.log(Date())	// 'Thu Aug 03 2023 11:33:22 GMT+0900 (日本標準時)'
// 2. Dateオブジェクトを作り、そのオブジェクトに聞く
const d = new Date()
console.log(d.getHours())		// 時
console.log(d.getMinutes())		// 分
console.log(d.getSeconds())		// 秒

// 問63 こちら
// function getSomething(){
//   return {
//     first: 1,
//     second: 2,
//     third: 3
//   }
// }
// の関数で返しているオブジェクトのfirst,second,thirdのvalue値をそれぞれ first,second,thirdに代入してください
 

// →分割代入が使える
function getSomething(){
  return {
    first: 1,
    second: 2,
    third: 3
  }
}
const { first,second,third } = getSomething()
console.log(first,second,third)

// 問64
// →問題なし、飛ばす

// 問65
// 文字列'fafafakenjifafafa'に'kenji'が含まれているかどうかの真偽値を出力してください
// 
// 1. String.prototype.includes()
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/includes
console.log('fafaeeekenjifa'.includes('kenji'))	// true

// 2. もちろん、正規表現でもいける
console.log(/kenji/.test('fafaeeekenjifa'))	// true

// 問66
// 文字列'repeat'を2回繰り返した結果を出力してください

console.log('repeat'.repeat(2));

// 問67
// 文字列fooをイテレーターを使い['f','o','o']となるようにしてください。

// →イテレーターの基礎知識: https://ja.javascript.info/iterable
// →イテレーターを使っているのは for...of
const s = "foo"
let a = []
for(c of s){
	a.push(c)
}
console.log(a)	// [ 'f', 'o', 'o' ]


// 問68 #高度な話題
// IteratableからIteratorを取得、要素を出力していきして「要素がもうない意」の{value: undefined, done: true}を出力してください

// →Iteratorを取得するには Symbol.iterator を使用する
var arr = ['ooo', 'eee'];

var Iterator = arr[Symbol.iterator]();
console.log(Iterator.next()); // { done: false, value: 'ooo'}
console.log(Iterator.next()); // { done: false, value: 'eee' }
console.log(Iterator.next()); //{ done: true, value: undefined }

// 問69
// 文字列'foo'を['f','o','o']と出力してください
//
// →スプレッドオペレータが使用できる
var arr = [...'foo'];
console.log(arr);
// →考察：スプレッドオペレータも内部ではイテレーターを使用している、したがってこの回答は問67の別解

// 問70
// 文字列moritaの1文字目mを変数index0に代入、2文字目oをindex1に代入、残りを配列restの各要素として出力してください
// 
// →この話題は分割代入の話題そのものだ
var [index0, index1, ...rest] = 'morita';
console.log(index0,index1, rest);
	//'m'
	//'o'
	//['r', 'i', 't', 'a']

// 問71
// foo(1, 2, 3, 4, 5, 6)を実行したら1がfirst、2がsecond、残りが配列の要素になるような fooを定義してください

// →レストパラメーターの話題
function foo(first,second,...rest){
	console.log(first,second,rest)
}
foo(1,2,3)	// 1 2 [ 3 ]

// 問72
// 配列 arr = [1, 2, 3] に Array#concat を使わずに arr2 = [4, 5, 6] を結合させ[1, 2, 3, 4, 5, 6]となるようにしてください
 
// →スプレッドオペレータを使用する
let arr2 = [4, 5, 6];
let arr = [1, 2, 3, ...arr2];
console.log(arr);//[1, 2, 3, 4, 5, 6]

// 問73 #モジュール
// 下記のようなあるファイル(module.js)で記述した
// 	var foo = 'foo';
// 	function bar(){};
// 	class Baz{
// 	  baz(){}
// 	}
// を別のファイル(import.js)にexport、個別のメンバとして読み込む記述を示してください。
// また「module」という別名で全てのメンバを取得する記述も示してください
// ※module.jsとimport.jsは同階層にあるものとする

// →Q74フォルダの中に回答を作成したのでそこを見ること
// Q74/import.js
// 1. import.mjs メンバ毎にインポート
import {foo, bar, Baz} from './module.mjs';
// 2. import2.mjs モジュールまとめてインポート
import * as from './module.mjs';

// 問74
// var obj = {foo: foo, bar: bar} オブジェクトのkeyとvalueが等しい場合の記述 をせよ
//
// →問題が不明、回答を見ても何のことかわからなかった
// 
// 模範解答
// var obj = {foo: foo, bar: bar};
// var obj = {foo, bar};

// 問75
// 下のように
// 	var key = 'foo';
// 	var obj = {};
// 	obj[key] = 0;
// 	obj[key + '_bar'] = 1;
// 書いていた記述をECMAScript2015の記述で書いてください
// 
// →古い書き方を改める問題だが、古い記述はともかくとして以下のように書けることを学んでおくのがよい
//  （なお、var宣言をconstに置き換えてある）
const key = 'foo';
const obj = {
  [key] : 0,
  [key + '_bar'] : 1
}
console.log(obj)	// { foo: 0, foo_bar: 1 }

// 問76
// 下記
// 	function ff(){
// 	  return 'kenji';
// 	}
// のような関数をconsole.log内からテンプレートリテラルを使って出力してください
// 期待する出力 my name is kenji 参照
//
// →問題文の意味がわからないので答えから学ぶ
// →テンプレートリテラルの中に関数呼び出しを埋め込むという話題だった

function ff(){
  return 'kenji';
}
console.log(`my name is ${ff()}`); //my name is kenji

// 問77
// 変数a,bにそれぞれ1,2を代入してください
//

// 1. 安易な方法
let a = 1
let b = 2
もしくは
let a = 1, b = 2
// 2. 分割代入を使う方法
// https://ja.javascript.info/destructuring-assignment
let [a, b] = [1, 2]
console.log(a,b)	// 1 2

// 問78
// 文字列 line1とline2を改行してconsole.log出力してください
// 
// →テンプレート文字列をつかってやってみようという問題だった

console.log(`line1
line2
`);

// 改行のエスケープ文字'\n' でもいけます
console.log('line1\nline2')

// 問79
// 問題文がない
// → タグ付きテンプレート文字列の例となっているので、模範解答を見て学んでおくこと
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Template_literals
var long = '30px';
var weight = '40px';

function tag(strings, ...values){
  console.log('in tag', strings)	//  in tag [ '身長', 'で、体重は', 'です' ]
  return `m:${values[0]}、p:${values[1]}`;
};

var str1 = tag`身長${long}で、体重は${weight}です`;
console.log(str1); // m:30px、p:40px

// 問80
// ユーザー定義関数funを作り、実行時の引数として、オブジェクトkeyにa,b。値をそれぞれ1,4として加算して返してください
// 
// →分割代入は関数の引数でも使えるよという話題 
// https://ja.javascript.info/destructuring-assignment
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Destructuring_assignment

function fun({a, b}){
  return a + b;
}
console.log( fun({a: 1, b: 4})) //5

// 問81
// var aa = [['morita', 'kenji', 'keiko'],['morita', 'kenji', 'keiko']]
// 全てのaaにある多次元配列の全ての要素に文字列'san'を付け加えて一つの配列として出力してください

const aa = [['morita', 'kenji', 'keiko'],['morita', 'kenji', 'keiko']]
let a = []
aa.forEach( row => {
	row.forEach(i => a.push(i + 'san'))
})
console.log(a) // [ 'moritasan', 'kenjisan', 'keikosan', 'moritasan', 'kenjisan', 'keikosan' ]

// 高度な話題
// map() と flat() を使用した例
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
const aa = [['morita', 'kenji', 'keiko'],['mojita', 'kenji', 'keiko']]
const a = (
			aa.map( i =>
				i.map( e=>e+'san' )
			)
           ).flat() )

console.log(a)	//  [ 'moritasan', 'kenjisan', 'keikosan', 'mojitasan', 'kenjisan', 'keikosan' ]

// 問82
// mapとforEachの違いは何か答えてください
//
// 1. 元の配列を変更するかどうか
// - forEachは元の配列を変更できる
// - mapは元の配列を変更せず変換やcopyをしたいとき
// 2. map は各要素をコピーすることが目的であるが、forEach の各要素はどう扱うかは自由（扱わないこともできる）
// →forEach で要素の数だけ console.log('hello') するなど、汎用的なことができる

// 問83
// [{name: 'kenji'},{name: 'morita'}]の要素のvalueを次のように書き出してください(文字列'san'を付けています)
// e.g ['kenjisan', 'moritasan']

const a = [{name: 'kenji'},{name: 'morita'}]
const b = a.map(i => i['name'] = i['name'] + 'san')
console.log(b)	// [ 'kenjisan', 'moritasan' ]

// 問84
// 問83と同じ事をforEachでしてください

const a = [{name: 'kenji'},{name: 'morita'}]
let b = []
a.forEach(i=> b.push(i['name'] + 'san'))
console.log(b)

// 問85
// const atom = {
//   value: 1,
//   addValue: function (value) {
//     return atom.value + value;
//   },
// };
// 上記object-shorthandを使って書き換えてください
//
// →オブジェクトショートハンドとは簡略記法のこと
// →答えを見て学ぶでOK、以下のように若干短縮できる

const atom = {
  value: 1,
  addValue(value) {
    return atom.value + value;
  },
}

// 問86 #高度な話題
// こちらのobjをkey内でメソッド呼び出しされているのをコンピューティッドプロパティを使って書き換えてください
// 
// function getKey(k) {
//   return `a key named ${k}`;
// }
// 
// const obj = {
//   id: 5,
//   name: 'San Francisco',
// }
// obj[getKey('enabled')] = true;

// ↓以下のような書き方ができるということを押さえればよい
//

//ok
function getKey(k) {
  return `a key named ${k}`;
}
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
}

// 以下に紹介がある
// https://jsprimer.net/basic/object/
// > オブジェクトリテラル内でのブラケット記法を使ったプロパティ名はComputed property namesと呼ばれます。
// 「コンピューテッド」とは「算出」という意味で、式getKey()によって評価された（つまり、算出された）値であるという意味

// 問87
// 下記のようなURLのファイルパスごとに配列に格納してください
//
// →質問の意味がわからないので答えを見て理解する
// URL:
// https://github.com/kenmori/Angular2_TypeScript/tree/master/angular2-quickstart
// ファイルパス毎にと言うのは「/」で区切って切り取った文字列を配列に格納するという意味
//

// 1. URLが文字列で与えられている場合
const url = 'https://github.com/kenmori/Angular2_TypeScript/tree/master/angular2-quickstart'
console.log( url.split('/') )	// [ 'https:', '', 'github.com', 'kenmori', 'Angular2_TypeScript', 'tree', 'master', 'angular2-quickstart' ]

// 2. ブラウザで現在表示しているURLを元にする場合
// → location オブジェクトを使用する
// https://developer.mozilla.org/ja/docs/Web/API/Window/location

> location.pathname
'/kenmori/Angular2_TypeScript/tree/master/angular2-quickstart'
> location.pathname.split('/')
['', 'kenmori', 'Angular2_TypeScript', 'tree', 'master', 'angular2-quickstart']
> location.pathname.substring(1).split('/')
['kenmori', 'Angular2_TypeScript', 'tree', 'master', 'angular2-quickstart']

// 問88
// 下記のようなobj内のkeyと値が一緒の際できるshorthandで記述してください

// ↓を見てショートハンドが使えることが理解できればOK
const lukeSkywalker = 'Luke Skywalker';

const obj = {
  lukeSkywalker: lukeSkywalker,	// キー文字列と値の変数の名が同じとき、
};
// ↓
const obj = {
  lukeSkywalker,	// こう書ける
};

// 問89
// 下記のようなある配列itemsの要素をコピーしている記述をspreadArrayを使って簡潔に記述してください
// 
// コピーしている記述：
// const len = items.length;
// const itemsCopy = [];
// let i;
// 
// for (i = 0; i < len; i++) {
//   itemsCopy[i] = items[i];
// }
//

// ↑と等しいことをスプレッド構文を用いで行う
const itemCopy = [...items];

// 問90
// windowオブジェクトを7つ答えてください
//
// ↓以下を調べて内容を確認しておく
// 
// navigator ... https://developer.mozilla.org/ja/docs/Web/API/Navigator、ブラウザの状態や身元情報を知る
// location ... https://developer.mozilla.org/ja/docs/Web/API/Location、閲覧中のURLに関する情報
// history ... https://developer.mozilla.org/ja/docs/Web/API/History ブラウザの履歴
// screen ... https://developer.mozilla.org/ja/docs/Web/API/Screen ブラウザの画面に関する情報（幅や高さなど）
// document ... https://developer.mozilla.org/ja/docs/Web/API/Document 現在表示中のページについての情報
// ---- 以下はあとまわしでもよい
// frames ... https://developer.mozilla.org/ja/docs/Web/API/Window/frames 画面の中にあるサブフレームに関する情報
//            なお、サブフレームとは https://developer.mozilla.org/ja/docs/Web/HTML/Element/iframe のこと
// parent, top, self ... サブフレームが存在するとき、フレームの関係を示すキーワード

// 問90
// 下のようにuserというnameとidをプロパティで持ったオブジェクトを再割り当てやマルチプルなobjectを扱う際に簡潔な書き方にしてください
// function add (user){
//   const name = user.name;
//   const id = user.id;
//   return `${name} ${id}`;
// }
//
// →質問の意味がわかららないが、分割代入に関する話題だった。以下理解できればよい

// 答え
//ベター
function add (user) {
  const { name, id } = user;
  return `${name} ${id}`;
}
//best
function add ({name, id}){
  return `${name} ${id}`;
}

// 問91
// var aaa = [['oo','oo1'], ['ll','ll2']] ;このような多次元配列のインデックス0番目だけを出力してください

// →つまり 'oo' と 'll' だけを出力するだけでよい

const aaa = [['oo','oo1'], ['ll','ll2']]
aaa.forEach(i => console.log(i[0]))

// 模範解答ではfilter() を使用している（filter() を使用せよという意図だったのかもしれない）
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/filter
// ただし、以下ではfilter() で抽出するというより、単に各要素を巡回するためだけに用いており、filter() らしい使われ方にはなっていない

var aaa = [['oo','oo1'], ['ll','ll2']];
aaa.forEach(function(ee){
  ee.filter(function(eee, i){
  if(i == 0){
      console.log(eee);
    }
  });
});

// 問92
// Array destructuring（配列の分割代入）として簡潔に記述してください。
// シャローコピーとディープコピーの違いを教えてください。→問21
// また var aa = ['oo', 'll']; を bb にシャローコピーしてbb[0]に任意の文字列を代入し、aa[0]の参照する値が変わらないことを確認してください

// ↓を簡潔に記述する
var aa = ['oo', 'll'];
var arry = [];
var bb = arry.concat(aa);//shallow copy
bb[0] = 'kk';
aa//['oo', 'll']
bb//['kk', 'll']

// 簡潔にした
const aa = ['oo','ll']
const b = [...aa]	// シャローコピーが起こる
console.log(b)	// [ 'oo', 'll' ]
b[0] = 'kk'
console.log(b)	// [ 'kk', 'll' ]
console.log(aa)	// [ 'oo', 'll' ]

問93
var aa = ['oo', 'll'];をbbにコピーしてaaは['kk', 'jj'];が挿入されるようにしてください。
期待する結果
	bb //['oo', 'll']
    aa //['kk', 'jj'];

var aa = ['oo', 'll'];
var bb = aa.splice(0, aa.length, ['kk','jj'])
bb//['oo', 'll'];
aa//['kk', 'jj'];
問94

このような配列 var aa = ['ii', 'jj', 'kk'];がある。'jj'要素を削除するために deleteを使った場合とspliceを使った場合の違いは何か。それがわかるコードを書いてください

deleteは削除されたインデックスを残す。spliseは間を詰める。
var aa = ['ii', 'jj', 'kk'];
delete aa[1];
aa//['ii', undefined, 'kk']
var aa = ['ii', 'jj', 'kk'];
aa.splice(1,1);
aa//['ii', 'kk']
問95

var text = 'key and value';このような文字列を単語毎に配列の要素として格納してください //期待する結果 //['key','and','value']

var text = 'key and value';
var arraytext = ii.match(/\w+/g);
arraytext
['text', 'and', 'value']
問96

var text = 'abc def ghi jkl';の空白の直前の文字をグループ化してカンマ文字の後ろに移動させなさい。

期待する文字列 'ab,cde,fgh,ijkl'

var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,',$1');
'ab,cde,fgh,ijkl'

//or

var text = 'abc def ghi jkl';
text.replace(/(.)\s/g,function(m0, m1){
   return ',' + m1
});
'ab,cde,fgh,ijkl'
問97

 var array = ['aa','bb','cc','dd','ff']; このような配列の要素'bb'の前に'ff'を移動させて ['aa','ff','bb','cc','dd']このような配列を完成させてください

array.splice(1,0,array.splice(4,1)[0])
//array
//['aa','ff','bb','cc','dd']
問98

nullの比較についてそれぞれtureかfalseか答えてください

null < 1
null > 1
null < -1
null > -1

null < 0
null <= 0
null >= 0
null > 0
null == 0
null === 0

//Anser
null < 1 //ture
null > 1 //false
null < -1 //false
null > -1 //true
//数値コンテキストではnullは0と解釈されるため、1より小さく、-1より大きい。
null < 0 //false
null <= 0 //true
null >= 0 //true
null > 0 //false
null == 0 //false
null === 0 //false
//0以下であるが0より小さくはない。
//0以上であっても0より大きくはない。
問99

こちらの2つのif分の条件式の違いを教えてください

if('a' in obj)
if(obj.a)


**in演算子の場合**
objにキーaが存在する場合(undefinedでも)trueを返す
if('a' in obj)は実行される

**obj.aの場合**
undefinedの場合falseを返す
if(obj.a)が存在しても未定義だと実行されない
問100

var arr = [ 10, 20 ];においてarr[2]が存在しないことを確認してください

2 in arry;
