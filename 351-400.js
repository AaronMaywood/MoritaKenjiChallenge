// 問351 #高度な話題
// 問352を参照にして、自身にyプロパティをもつFクラスのインスタンスfがFのprototypeオブジェクトを参照していることを証明してください。尚、Fはclass構文とする
 
// 模範解答
class F {
	constructor(){
		this.y = 'y'
	}
}
let f = new F()
// 1. 自身にyを持つか
console.log( f.hasOwnProperty('y') ) //true
// 2. F のプロトタイプオブジェクトを参照しているか
console.log( f.__proto__ === F.prototype ) //true

// 問352 #高度な話題
// こちら
// 	function a (name) {
// 		this.name = name;
// 	}
// 	let b = new a('JavaScript');
// 	a.prototype.car = 'BMW'
// 	console.log( b.car ) // 'BMW'
// が実行された際のJavaScriptの内部の動きをざっくり教えてください(問350で説明しているところです。復習)
 
// 模範解答
//4つのことが起こる
// 1. 新しい空のオブジェクト{}が生成される
// 2. b上に__proto__が作られ、それはa.prototypeを参照するようになる。なのでb.__proto__ === a.prototype
// 3. 上記1で生成されたオブジェクトをthisにもつa.prototype.constructorを実行します。
//   したがってnameプロパティは新しく作成されたオブジェクトに追加されます。
// 4. 作成されたオブジェクトを返します。let bは新しいオブジェクトが割り当てられます。
//もしa.prototype.car = 'BMW'として、b.carとすると" BMW"をアウトプットします
//JavaScriptはb上のプロパティcarを探し、見つからなければ上記2で作成されたb.__proto__(a.prototype)を参照し、a.prototypeにあるcarプロパティ値を返すためです。
// http://exploringjs.com/es6/ch_parameter-handling.html#sec_named-parameters

// 問353
// こちらはmaxからminまでのランダム値を返す関数です。
// 	function randam({max=180, min=1}){
// 		return Math.floor(Math.random() * (max - min) + min);
// 	}
// 	console.log( randam({max:20}) )	//20までの値を返す
// 	console.log( randam({}) )		//1~180の値を返す
// こちらの関数に{}を渡さないでも返してくれるようにしてください
// eg: randam();//1~180までを返す

// 模範解答
function randam({max=180, min=1} = {}){//defaultをもたせます
	return Math.floor(Math.random() * (max - min) + min);
}

console.log( randam() )//1~180までを返す

// 問354
// 下記のようなオブジェクト
// 	{ foo: { bar: 'baz' } }
// barの値をdeepとして割り当ててください

jonst {foo: {bar: deep}} = {foo: {bar: 'baz'}}
console.log(deep)	//'baz'

// 問355 #jQuery
// 下記
// 	[...$('div')]
// を実行すると例外が発生する(Symbol.iteratorがまだ実装されていないため)。任意の数のdivが持つid値を配列の要素になるような関数を定義してください

// →jQueryの使用をやめた場合：
// document.querySelectorAll('') を使用すれば（Symbol.iteratorが実装されているため）目的を達成することができる
// →このことを確認するコード P355/index.html をブラウザーで確認することができる


// 模範解答

Array.from($('div'), el => el.id)
//Array.from メソッドはiteratebleなオブジェクトもArraylikeなオブジェクトもサポートする
//Array.fromは3つの引数をとる
//・input -キャストしたいarraylike or iteratable object
//.map - 各inputのitemに対して実行されるmapping function
//.context - mapが呼ばれる際に使われるthis

// 問356
// 引数としてnull,[], NaN を渡した際にぞれぞれをtypeofで評価した配列['object', 'object', 'number']を返す関数を作ってください

function typeOf(){
	const args = [...arguments]
	return args.map(i => typeof i)
}
console.log(typeOf(null, [], NaN)) //['object', 'object', 'number']

// 模範解答
// →Array.from とその第二引数（マッピング関数）を利用する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/from

function typeOf(){
	return Array.from(arguments, val => typeof val);
}

console.log(typeOf(null, [], NaN)) //['object', 'object', 'number']

// 問357
// 変数宣言無しで { a: "baz", b: 101 } のそれぞれの値をaとbに代入してください

// 模範解答
({ a, b } = { a: "baz", b: 101 });	// 前後の()を取るとSyntax Error（なぜだろう？）
console.log(a,b)	// baz 101

// ちなみに、普通は変数宣言を伴って以下のように書く. この書き方ができればOK.
const { a, b } = { a: "baz", b: 101 }
console.log(a,b)	// baz 101

// 問358 #高度な話題
// こちら
// 	let faf;
// 	let ee;
// 	if(true){
// 		ee = "true";
// 		faf = "true";
// 	} else {
// 		ee = "false";
// 		faf = "false";
// 	}
// をletを書かずにconstで代入できるようにしてください

// →かなりトリッキーなやり方、模範解答を見ること

// 模範解答
const {faf, ee } = (() => {
	if(true){
		return {ee:"true", faf:"true"}
	} else {
		return {ee: "false", faf:"false"}
	}
})()

// 問359
// 上記のような
// 	[1, 2, 3].map(e => e);
// いわゆるワンラインで書かれているFanctor内でconsole.logを出力してください
 
// 模範解答
[1, 2, 3].map(e => console.log(e) || e); //console.logはundefinedを返すのでfalse。処理が次に移り、e がmapの結果として採用される

// →カンマ演算子も似た動作をする. 最終的に一番右側に書いた e がmap の結果として採用される
[1, 2, 3].map(e => (console.log(e) , e))

// 問360 #高度な話題 #ビット操作
// 下記
// console.log(~1)
// console.log(~-1)
// console.log(~0)
// 3つはそれぞれは何を返すか

// 「~」はビット否定演算子（各ビットを反転する）
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Bitwise_NOT

// 模範解答
// 以下３つのケースについて符号を逆にして-1された値が返る
console.log(~1)		// -2
console.log(~-1)	// 0
console.log(~0)		// -1

// 問361
// 下記のように
// 	let a = false
// 	let b = false
// 	let variable;
// 	if(a){
// 		variable = a;
// 	} else if(b){
// 		variable = "b"
// 	} else {
// 		variable = "c"
// 	}
// 	console.log(variable)	 //"c"
// elseifを伴ったif文を一行で書いてください

// →三項演算子を使えという意味

// 模範解答（間違いを修正してある）
let a = false
let b = false
const variable = a ? a : b ? "b" : "c"
console.log(variable)	// "C"

// 問362 #高度な話題 #JSON
// JSON.stringifyについて、 以下
// 	let user = {
// 		sayHi() {
// 			alert("Hello");
// 		},
// 		[Symbol("id")]: 123,
// 		something: undefined
// 	};
// 	JSON.stringify(user)
// を実行した場合、返ってくる値を教えてください

// 模範解答
let user = {
	sayHi() {
		alert("Hello");
	},
	[Symbol("id")]: 123,
	something: undefined
};
console.log(JSON.stringify(user))	// {} ←空っぽのオブジェクト

// 解説
Function properties(method)、 Symbolic properties、 値がundefinedなpropertiesはskipされます

// 問363 #高度な話題 #JSON
// こちらは
// 	let meetup = {
// 		title: "conference",
// 		room: {number: 24, participants: ["johon", "ann"]}
// 	}
// 	JSON.stringify(meetup)
//	console.log(JSON.stringify(meetup)) // {"title":"conference","room":{"number":24,"participants":["johon","ann"]}}
//
// 期待した通りに返ります(深いkey-valueも返すことに注意)
//
// ではこちらを実行した結果は何ですか
// let room = {number: 23};
// let meetup = {title: "Conference", participants: ["john", "ann"]};
// meetup.place = room;
// console.log(JSON.stringify(meetup))

// 模範解答
let room = {number: 23};
let meetup = {title: "Conference", participants: ["john", "ann"]};
meetup.place = room;
console.log(JSON.stringify(meetup))	// {"title":"Conference","participants":["john","ann"],"place":{"number":23}}

// 更に次のようにした場合:
room.occupiedBy = meetup
console.log(JSON.stringify(meetup)) // ここを実行した場合は?
	実行するとエラーになる
	VM2804:1 Uncaught TypeError: Converting circular structure to JSON
		at JSON.stringify (<anonymous>)
		at <anonymous>:1:6

理由：
循環オブジェクト参照構造体は文字列に変換できません。

簡単に言うと、

参照がその参照を参照してその参照がさらにその参照をしてと繰り返されることです

let a = {};
let b = {};
a.child = b;
b.child = a;
を実行した場合
//b
{child: {…}}
child:child:child:child: {child: {…}}
__proto__: Object
__proto__: Object
__proto__: Object
__proto__: Object
//a
{child: {…}}
child:child:child: {child: {…}}
__proto__: Object
__proto__: Object
__proto__: Object
childがchildを持ち続ける

a.child = bの時
a.childは {}がかえりますが
b.child = aにすると
a.childは参照先bの構造も変わるので
a.child.childになります
さらにb.childはaを参照するので.childがあり、と延々続くのですね


このようなケースを文字列にする場合失敗します
回避するには

JSON.stringify(value[, replacer, space])

//[replacer](https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)を設定します

let obj = {
  a: "foo",
  b: obj
}
let replacement = {"b":undefined}; //undefinedをいれてskipさせる
JSON.stringify(obj,replacement));
or json-stringify-safeを使ってそれがcircularか確認します

// 問364 #高度な話題 #JSON
// こちらの値
// let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
// をJSだけで(moment.jsを使わず) dateの日付(この場合30)を返す関数を作ってください
//
const str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
const meetup = JSON.parse(str)
const date = new Date(meetup.date)
console.log(date.getDate())	// 30
 
// 模範解答
// →JSON.parseの中でDateに変換することもできる

let str = '{"title":"Conference","date":"2017-11-30T12:00:00.000Z"}';
let meetup = JSON.parse(str, function(key, value) {
	if (key == 'date') return new Date(value);
	return value;
});
console.log( meetup.date.getDate() )
//30

// より高度な例：日付が入れ子になっている場合でも、同じ処理でいける
let schedule = `{
  "meetups": [
	{"title":"Conference","date":"2017-11-30T12:00:00.000Z"},
	{"title":"Birthday","date":"2017-04-18T12:00:00.000Z"}
  ]
}`;
schedule = JSON.parse(schedule, function(key, value) {
	if (key == 'date') return new Date(value);
	return value;
});
console.log(schedule.meetups[1].date.getDate()) //18

// 問365 #高度な話題 #JSON
// こちらのオブジェクト
// 	let user = {
// 		name: "John Smith",
// 		age: 35
// 	};
// と同じkey-valueをもつオブジェクトになるようにして（中身は同じでもオブジェクトとしては）同じものではない（つまりコピーである）ことを確認してください

// →問題文の意味は模範解答を見て確認すること

// 模範解答（少々加筆してある）
let user = {
	name: "John Smith",
	age: 35
};
let user2 = JSON.parse(JSON.stringify(user))	// JSONを経由することによってコピーが作られる
console.log(user === user2)	// false 異なるオブジェクトです

console.log(user2)	//{name: "John Smith", age: 35}
user2.name = "morita"
console.log(user2)	//{name: "morita", age: 35}
console.log(user)	//{name: "John Smith", age: 35}

// 問366
// こちら
// alert( undefined || null || 0 );
// を実行すると何がalertとして表示されますか？

// 模範解答
0 が表示されます

// 解説
ORは左から右にかけて走査し、truthy valueが見つかればそれを、そのような値が見つからない場合最後の値を返します
alert( 1 || 0 ); // 1 (1 is truthy)
alert( true || 'no matter what' ); // (true is truthy)
alert( null || 1 ); // 1 (1 is the first truthy value)
alert( null || 0 || 1 ); // 1 (the first truthy value)
alert( undefined || null || 0 ); // 0 (all falsy, returns the last value)

// 問367
// こちらを実行したら
// 	alert( alert(1) || 2 || alert(3) );
// どうなりますか

// 模範解答

`1、2とアラートされます`

// 理由
alertはundefinedを返します
最初のOR評価でalertとして実行し1のメッセージ
undefineを返すので、ORはtruthyを探しに次のオペランドへ2が返るのでORはそこで終わり、
外側のアラートがそれを実行します

// 問368 #高度な話題 #正規表現
// こちら
// 	/hoge.fefe/.test(`hoge
// 	fefe`);
// は正規表現内で全ての文字にマッチ「.」を使用しています。test引数内で改行を含める文字列にマッチさせるためです。
// が、こちらはfalseが返ります。
// trueになるようにしてください。

// →「.」は全ての文字にマッチするが、改行文字にはマッチしないことを思い出すこと. 改行文字にマッチするようにすればよい

// 模範解答

console.log( /hoge.fefe/s.test(`hoge
fefe`))	// true

// 解説
今まで.は改行文字に対応できていなかったのですがES2018ではsフラグを付けることで可能になります

// 問369 #高度な話題
// Numberオブジェクトに引数をとって加算できるplusメソッドを追加してください
 
// 模範解答
// →以下のようにすることで既存のオブジェクトNumberを機能拡張することができる

Object.defineProperty(
	Number.prototype,
	"plus", {
		value: function (b) {
			return this + b;
		}
	}
);

console.log(Number(4).plus(3))	// 7

// 問370
// aという変数に{}か（オブジェクトであるかどうか）keyがあるかどうか評価してください

// 模範解答：以下のように調査することが可能

const a = {}
console.log(Object.keys(a).length === 0)	// true、このオブジェクトにはキーが存在しない

const c = {a: 'hello'}
console.log(Object.keys(c).length === 0)	// false、キーが存在するオブジェクトである

const b = 123
console.log(Object.keys(b).length === 0)	// true、b はオブジェクトではない


// 問371 #高度な話題
// このような {foo: "hogehoge", bar: "fafa"} 、 {bar: "fafa"} 、 {foo: "hogehoge"}、 null が渡って来る可能性がある関数がある。
// 	const buildAnObjectFromAQuery = (query) => {
// 		const object = {};
// 		if (query.foo) {
// 			object.foo = query.foo;
// 		}
// 		if (query.bar) {
// 			object.bar = query.bar;
// 		}
// 		return object;
// 	}
// 上記の関数と同じ仕事をする関数をより端的に書いてください。

// 模範解答
const buildAnObjectFromAQuery = query => ({
	...query.foo && { foo: query.foo },
	...query.bar && { bar: query.bar },
});

// 問372 #高度な話題 #Set
// このような [1,2,3,3] 配列がある。 [1,2,3] とユニークな要素だけを取得するようにしてください
 
// 模範解答
// Set は一意な値を扱うのでこのような場合に便利に利用できる
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Set
let un = [...new Set([1, 2, 3, 3])]
console.log(un); //[1, 2, 3]

// 問373
// このようなfalsyな値を含む配列がある。
// 	let e = [0, undefined, null, "", 21, "fafa", false]
// それらを除外した [21, "fafa"]を取得してください

// 模範解答

let e = [0, undefined, null, "", 21, "fafa", false]
let trusy = e.filter(Boolean);
console.log(trusy);	// [21, "fafa"]

// 問374 #高度な話題
// 引数が渡って来ない、undefined なら Errorをthrowする関数を書いてください

// 模範解答
// 引数param のデフォルト値に式を指定することができる

const required = ()=> { throw new Error("ooops") }
const fn = (param = required()) => { console.log("ok") }
fn(null) // ok
fn("") //ok
fn()	// Error
fn(undefined) //Error

// 問題375
// 文字列 "hello"を逆の文字列にしてください
// 期待値 "olleh"

// 模範解答
const str = "hello"
console.log( str.split('').reverse().join('') )
//other（高度なやりかた）
console.log( [...str].reduce(( prev, next ) => next + prev) )

// 問題376 #高度な話題 #メモ化
// addという関数
// 	add(a){
// 		return a + a
// 	}
// 	add(2) //4
// はaを引数に取りa + aの値を返す関数です。
// これを改善して、a関数に同じ値a(上記の場合2)が渡ったら以前と同じ値なら以前に計算された結果である(上記の場合4)のcacheを返すようにしてください

// →前回の値を覚えておいて再利用するメモ化と呼ばれる技法

// 模範解答（加筆している）
function add (a){
	if(!add.cache){
		add.cache = {}
		console.log("メモのためにキャッシュを作りました")
	}
	if(!add.cache[a]){
		add.cache[a] = a + a;
		console.log("メモされた値を使いました")
	}
	return add.cache[a]
}

console.log(add(2))	// メモのためにキャッシュを作りました
					// 4
console.log(add(2))	// メモされた値を使いました
					// 4

// 問題377
// 数値 -6.133、6.133 を正数値だけ取得してください。
// →正数値は「整数部」の誤り

// 模範解答
// Math.trunc() を使用して整数部だけを取得する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Math/trunc
let num = -6.133
Math.trunc(num) // -6

let num = 6.133
Math.trunc(num) // 6

// 問題378
// こちら2の4乗
// Math.pow(2, 4) // 16
// と同じことをしてください

console.log( 2 * 2 * 2 * 2)

// 模範解答

//ECMAScript216の べき乗演算子**（Exponentiation Operator)
console.log( 2 ** 4  )// 16

// 問題379 #高度な話題 #Unicode
// こちらの文字列
// 	"パスワードは😄😄😄😄です".length // 16
// は16文字として処理されます 絵文字1つを2とカウントしないようにしてください

// →文字数をカウントするのは難しい場合がある。どういうケースで難しいか、対策方法は何かについては以下の記事を参考にするとよい
// https://qiita.com/suin/items/3da4fb016728c024eaca

// 模範解答

[..."パスワードは😄😄😄😄です"].length // 12

// 問題380 #高度な話題 #reduce
// reducerを使って、 [{id: 1, name: 'kenji'}] を {1: {name: 'kenji'}} にしてください

// 模範解答
const a = [{id: 1, name: 'kenji'}].reduce((a,c) => (a[c.id] = c) && a, {})
console.log(a)	// { '1': { id: 1, name: 'kenji' } }

// 問題381 #高度な話題 #reduce
// [{1: {name: "kenji"}}, {2: {name: "rika"}}] を reduceを使って [{name: "kenji"},{name: "rika"}] にしてください

// 一例)
const a = [{1: {name: "kenji"}}, {2: {name: "rika"}}].reduce((a, c) => {
 return [...a, ...Object.values(c)]
}, [])
console.log(a)	// [ { name: 'kenji' }, { name: 'rika' } ]

// 問題382
// const res = {user: {name: 'kenji'}}の res.user は nullになりうることがある({user: null})。
// nameの値が欲しい時、 nullの場合はundefined、nameがある場合はその値を下記のように const name = res.user && res.user.name ではなく、 端的に(optional chain。オプショナルチェーンで)書いてください

// →オプショナルチェーンとは、?. 演算子のこと
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Optional_chaining

// 模範解答
const a = res.user?.name // undefined or "kenji"。 エラーにはならない

// optional chain
// ?の左がnullになり得る場合、もしnull or undefinedだったら.(ドットアクセス)でエラーにせず、undefinedを返し、そうでない場合はその先を返すというものです
// つまり res.user == null ? undefined : res.user.name と res.user?.nameは同じです。端的に書けることがわかります

// 問題383
// 下記
// 	const a = 0
// 	const b = false
// 	const c = undefined
// 	const  d = null
// のような変数がある null と undefined の場合は文字列 "null or undefined"を返し、そうでない場合はその値を返す 関数isNullishを実装してください
// また、Nullish coalescing Operator(ヌリッシュコアレスオペレーター)とはどんなものですか?

// → Nullish coalescing Operator(ヌリッシュコアレスオペレーター)とは、??演算子のこと
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Nullish_coalescing

// 模範解答
const a = 0
const b = false
const c = undefined
const  d = null
const isNullish = (value) => value ?? "null or undefined"
console.log(isNullish(a)) // 0
console.log(isNullish(b)) // false
console.log(isNullish(c)) // "null or undefined"
console.log(isNullish(d)) // "null or undefined"

// また、Nullish coalescing Operator(ヌリッシュコアレシングオペレーター)とはどんなものですか?
// nullish coalescing opearator は もし左がnull か undefinedなら 右 を返す || の代替です

// 問題384 #高度な話題 #Node.js
// ECMASCript2020で追加されたglobalThisとはなんですか？

// 模範解答
// ブラウザがもつグローバルオブジェクトである`window`とNode.jsのグローバルオブジェクト`global`はJavaScript実行環境が違うため分けられていた。
// `globalThis`はブラウザ、Node.jsがもつ共通のグローバルオブジェクトです

// use browser
// open console.log and then
// globalThis

// use node with lts version
// node -v
// v12.16.2
// > node
// Welcome to Node.js v12.16.2.
// Type ".help" for more information.
// > globalThis
// Object [global] {
//   global: [Circular],
//   clearInterval: [Function: clearInterval],
//   clearTimeout: [Function: clearTimeout],
//   setInterval: [Function: setInterval],
//   setTimeout: [Function: setTimeout] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   },
//   queueMicrotask: [Function: queueMicrotask],
//   clearImmediate: [Function: clearImmediate],
//   setImmediate: [Function: setImmediate] {
//     [Symbol(nodejs.util.promisify.custom)]: [Function]
//   }
// }

// 問題385
// こちらの関数
// function dosomthing(name){
// 	console.log("Hello " + name)
// }
// に dosomthing("kenji")実行すると "Hello kenji"と出力されます。
// 
// これをdosomthingの関数の中身を変えずに
//  start
//  Hello kenji
//  finish
// とHello kenjiの前と後にstart, finishと出力されるようにしてください

// →dosomething() のラッパーを作れということ

// 模範解答
function dosomthing(name){
	console.log("Hello " + name)
}

function loggingDecorator(callback){
	return function(){
		console.log("starting");
		// ここでのthis はwindow(globalThis).
		// callback であるdosomething ではthis を使用していないため、this がなんであってもよく、
		// また、this を渡さずにnull としても動作する
		const result = callback.apply(this, arguments);
		console.log("Finished");
		return result
	}
}

var wrapped = loggingDecorator(dosomthing)
wrapped("kenji")

// 問題386 #高度な話題 #オブジェクト指向 #デコレーター
// 下記のように
// 	class Example {
// 		@log
// 		sum(a, b){
// 			return a + b
// 		}
// 	}
// 	const e = new Example();
// 	e.sum(1, 2)
// でsumに対するlog(subに渡された引数)出力される@log(Decorators)を作ってください

// →デコレーターに関する問題
// デコレーターはまだ正式な仕様となっていないので後回し
// 正式な仕様でないため、以下のコードは動作せずにエラーとなる。
// また、MDN上に記事がない
// こちらの記事が参考になる
// https://qiita.com/kerupani129/items/2b3f2cba195c0705b2e5

// 模範解答
function log(_target, _name, descriptor) {
	const original = descriptor.value; // decorateしている関数
	if (typeof original === "function") {
		descriptor.value = function(...arg) {
			console.log("arguments:", `${arg}`);
			try {
				const result = original.apply(this, arg);
				return result;
			} catch (e) {
				console.log(`Error:${e}`);
				throw e;
			}
		};
	}
	return descriptor;
}
class Example {
	@log
	sum(a, b) {
		return a + b;
	}
}
const ins = new Example();
ins.sum(1, 2);
codeSandbox

以下工事中

// //問題文をわかりやすくする fun()を実行し、もしキャッシュがあればその値を返し、もしキャッシュがなければその引数をキャッシュのkeyとして値を返す関数を実装してください。
// （以下略）

