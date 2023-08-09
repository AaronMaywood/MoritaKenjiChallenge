// 問251 #高度な話題
// var arr = ['one', 'two', 'three']においてarrを不変オブジェクトに変更してください。

// 模範解答
var arr = ['one', 'two', 'three']
Object.freeze(arr);
arr.sort(); //Uncaught TypeError: Cannot assign to read only property '1' of object '[object Array]'

//ex
const obj = Object.freeze({a: 1});
obj.x = 4;
//strict-modeだとエラーになるが、そうではない場合、代入はなかったものとされる
console.log(obj) //{a: 1}

//ex2
//「子供」までは面倒みない
var obj2 = Object.freeze({a: 1, b : {a: 2}})
obj2.b.a = 4
console.log(obj2.b.a); //4

//ex3
//子供も凍結させる
var obj3 = Object.freeze({a: 1, b: Object.freeze({a: 2})})
obj3.b.a = 4
console.log(obj3.b.a) //2

// 問252 #高度な話題
// このようなobjがあります。
// 	var obj = {
// 	 'prop1': 'value1',
// 	 'prop2': 'value2',
// 	 'prop3': 'value3'
// 	}
// JSON.stringifyを使って
// 	"{
// 		"prop1": "value1",
// 		"prop2": "value2"
// 	}"
// ように出力されるようにしてください(prop3が出力されていない。1タブ分インデントされていることに注意)

// JSON.stringify の第二引数では出力するプロパティを示すことができる
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify

// 模範解答
var obj = {
 'prop1': 'value1',
 'prop2': 'value2',
 'prop3': 'value3'
}
var str = JSON.stringify(obj, ['prop1', 'prop2'], '\t');
console.log(str)
//
"{
	"prop1": "value1",
	"prop2": "value2"
}"


//ex
// 関数で出力をカスタマイズすることもできる
function selectedProperties(key, val) {
    // the first val will be the entire object, key is empty string
    if (!key) {
        return val;
    }
    if (key === 'prop1' || key === 'prop2') {
        return val;
    }
    return;
}
var str = JSON.stringify(obj, selectedProperties, '\t');
str
//
{
    "prop1": "value1",
    "prop2": "value2"
}

// 問253
// this呼び出しを4つとそれぞれのthis参照の参照先オブジェクトを答えてください

// →高度な話題ではあるが、thisの振る舞いはよく理解しておきたい、模範解答を読むこと

// 模範解答

・コンストラクタ呼び出し・・・コンストラクタが生成したオブジェクト
・メソッド呼び出し・・・レシーバオブジェクト(ドット演算子、ブラケット演算子でオブジェクトのメソッドを読んだとき、演算子の左辺に指定したオブジェクト)
	e.g  const obj = {add : function(){some}};
	メソッドの呼び出し対象のオブジェクトがレシーバオブジェクト、この場合obj、addがメソッド
・apply,call呼び出し・・・apply、callの引数で指定したオブジェクト
    ※呼び出されたメソッドがnon strict modeの場合fn.apply(obj,[1,3])のobjがnullもしくはundefinedの場合グローバルオブジェクトに置き換えられプリミティブ型の変数はボックス化されます。

・それ以外の呼び出し ・・・グローバルオブジェクト

// MEMO アロー関数の変数スコープはレキシカルであるため、以下の例ではグローバル環境であるwindows.a を参照している
a = 'hello'
const b = () => console.log(this.a)
b()	// hello


// 問254 var obj = { foo: 'bar', baz: 42 }; をMapオブジェクトに変換してください

// 模範解答
// →new Map には配列（などのiterable）を渡す必要がある.
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Map/Map
// objはiterableではないため、Object.entriesを使用しては配列を生成している
var obj = { foo: 'bar', baz: 42 }; 
var map = new Map(Object.entries(obj));
console.log(map); // Map { foo: 'bar', baz: 42 }

// 問255
// →問題文がない
// →ソースコードも完成していない
var Emiiter = {
	callbacks : [],
	register : function(fn){
		this.callbacks.push(fn);
	},
	onOpen : function(){
		this.callbacks.forEach(function(fn){
			fn();
		})
	},
}
Emiiter.register(function(){console.log('1')});
Emiiter.register(function(){console.log('2')});

// 問256
// こちらはcolorの条件でそれぞれの関数を実行する記述です。
// 
// var color = "black";
// function printBlack(){
// 	console.log('black')
// }
// function printRec(){
// 	console.log('red')
// }
// function printBlue(){
// 	console.log('blue')
// }
// function printYellow(){
//	console.log('yellow')
// }
// 
// if(color){
// 	if (color === 'black') {
// 		printBlack();
// 	} else if (color === 'red'){
// 		printRed();
// 	} else if (color === 'blue'){
// 		printBlue();
// 	} else if (color === 'yellow'){
// 		printYellow()
// 	}
// }
// これをswitch文に変えたのがこちらですが、
// 
// switch (color){
// 	case 'black':
// 		printBlack();
// 		break;
// 	case 'red':
// 		printRed();
// 		break;
// 	case 'blue':
// 		printBlue();
// 		break;
// 	case: 'yellow'
// 		printYello();
// }
// デバッグしづらいのといくつかの評価をしなくてはならなくなった際につらくなります。 see: https://toddmotto.com/deprecating-the-switch-statement-for-object-literals/
// 
// switch(true) {
// 	case (typeof color === 'string' && color === 'black'):
// 		printBlack();
// 		break
// 		・
// 		・
// 		・
// }
// 可能な限りswitch文を使用しないようにするためオブジェクトを介して上記のようにcolorに合った関数を実行してください

// →問題文がわかりにくいが↓が理解できればOK

var color = "black";

function printBlack(){
	console.log('black')
}
function printRed(){
	console.log('red')
}
function printBlue(){
	console.log('blue')
}
function printYellow(){
	console.log('yellow')
}
// キーとそれに対応する関数のデータを作って
var colorObj = {
	'black': printBlack,
	'red': printRed,
	'blue': printBlue,
	'yellow': printYellow
};
if (color in colorObj) {
	colorObj[color]();	// それを呼び出す
} //black

// 問257 こちら['a','b','c']をこちら{0: 'a’, 1: 'b’, 2: 'c'}のようにしてください

let o = {};
['a','b','c'].forEach((i,v) => o[i] = v)
console.log(o)	// { a: 0, b: 1, c: 2 }

// 模範解答
const arry = ['a','b','c']
function toObject(arry){
	var obj = {};
	for(var i = 0; i < arry.length; i++){
		obj[i] = arry[i];
	}
	return obj
}
console.log(toObject(arry)) //{0: 'a', 1: 'b', 2: 'c'}

// 問258 #高度な話題
// こちら
// let html = '';
// const count = 10;
// for(var i = 0;i < count; i++){
// 	html += 'hai!!';
// }
// document.querySelector('#mngb').innerHtml = html;
// 'hai!!hai!!hai!!hai!!hai!!hai!!hai!!hai!!hai!!hai!!'
// をより高速な書き方をしてください

// 模範解答
var html = [];
var count = 10;
for(var i = 0; i < count; i++){
	html.push('hei!!');
}
document.querySelector('#mngb').innerHtml = html.join('');
'hei!!hei!!hei!!hei!!hei!!hei!!hei!!hei!!hei!!hei!!'
//+=より、配列に追加してjoinを使った方が高速	// 知らなかった→どこでこの情報が見つかる？

// 問259 #高度な話題
// このような関数があります
// function iterateTimerOver(){
// 	const length = 100;
// 	for (let i = 0; i < length; i++){
// 		Timer();
// 	}
// }
// Timerはグローバル関数です。より高速にしてください。

// 模範解答

// Timerの参照をローカル変数にポイントさせて、スコープがループの数だけグローバルまで辿らないようにしています。
function iterateTimerOver(){
	const funcTimer = Timer;//参照を代入
	const length = 100;
	for (let i = 0; i < length; i++){
		funcTimer();
	}
}

//他にも
//forループの改善
for (i = 0; i < elements.length; i++) {
}
↓
const length = elements.length;
for (i = 0; i < length; i++) {
}

//以後、何度も参照するObjectへポイント変数
this.propsはこのようなオブジェクトだとします
{name: 'ken', sex: 'man', 'age': 19, 'live': 'shibuya'}
const {name, sex, age, live} = this.props;
console.log(name) //ken

// 問260
// こちら
// const myObject  = {1: ['e', 'ee', 'eee'], 2: ['f', 'ff','fff']};
// を 多次元配列にしてください 期待する結果:[[‘e’,’ee’,’eee’],[‘f’,’ff’, ‘fff’]];

// 模範解答

const myObject  = {1: ['e', 'ee', 'eee'], 2: ['f', 'ff','fff']};
const newArr = Object.keys(myObject).map(function(elem){
   return myObject[elem]
})
console.log(newArr) //[[‘e’,’ee’,’eee’],[‘f’,’ff’, ‘fff’]]

//other
const myObject  = {1: ['ee', 'eee', 'efe'], 2: ['faf', 'fafa','fa']};
const arr = Object.values(myObject);
console.log(arr)	// [ [ 'ee', 'eee', 'efe' ], [ 'faf', 'fafa', 'fa' ] ]

// 問260
// こちら
// ['a','b','c'] →　{0: 'a’, 1: 'b', 2: 'c'} のように、インデックスをキーにして、配列要素をそれぞれの値となるようにしてください

// →問257 と同じ

//1
const arry = ['a', 'b', 'c'];
function toObject(arry){
	const obj = {};
	const len =  arry.length;
	for(let i=0; i < len; i++){
		obj[i] = arry[i]
	}
	return obj
}
console.log(toObject(arry)) //{0: 'a', 1: 'b', 2: 'c'}

//2
const arry = ['a', 'b', 'c'];
const obj = arry.reduce(function(o, v, i){
	o[i] = v;
	return o;
},{})
console.log(obj) //{0: 'a', 1: 'b', 2: 'c'}

//3
[{a: 1},{b: 3}].reduce(function(result, item){
	var key = Object.keys(item)[0]
	result[key] = item[key];
	return result;
},{}) //{a: 1, b: 3}

// 問261
// こちら
// const arr = [
//     { key: 'foo', val: 'bar' },
//     { key: 'hello', val: 'world' }
// ];
// をMapオブジェクトにしてください 期待する結果:{'foo' => 'bar', 'hello' => 'world'}

// 模範解答
const arr = [
    { key: 'foo', val: 'bar' },
    { key: 'hello', val: 'world' }
];
const result = new Map(arr.map((i) => [i.key, i.val]));
console.log(result); // Map {'foo' => 'bar', 'hello' => 'world'}

問262
こちら
const characters = ['b', 'd', 'a', 'c'];
const sortedCharacters = characters.sort()
console.log(sortedCharacters) //['a', 'b', 'c', 'd']
console.log(sortedCharacters === characters) //true
配列をsortした返り値は同じオブジェクトを参照します。
sortをした上で新しい配列を返すようにしてください。

// →シャローコピーをしたものをsortするようにすればよい

// 模範解答
const characters = ['b', 'd', 'a', 'c'];
const sortedCharacters = characters.slice().sort();
console.log(sortedCharacters === characters) //false

// →ES2023 からコピーしたものをsortする toSorted() を使える
const characters = ['b', 'd', 'a', 'c'];
const sortedCharacters = characters.toSorted();
console.log(sortedCharacters === characters) //false

// 問263 #高度な話題
// ジェネレーター関数を使って１ずつ値を出力してください。

// 模範解答
var generatorFunction = function* (){
	var i = 0;
	while (true) {
		yield i ++;
	}
}
var iterator = generatorFunction();
console.log(iterator.next().value) //0
console.log(iterator.next().value) //1

// 問264 #高度な話題
// generator関数がyieldの完了まで前進したら'finish'という文字列を返してください

var gen = function* (){
	yield 'foo';
	return 'finish';
}
var iterator = gen();
console.log(iterator.next()) //'foo'
console.log(iterator.next()) //'finish'

// 問265 数値1から3までの値を返すgenarator関数で生成されたiteratableをfor-of文に使い値を出力してください。(その際for-of文での戻り値を捨てていることを確認してください。)
 
// 模範解答
var fun = function * (){
	yield 1;
	yield 2;
	yield 3;
	return 4;//for-of文では捨てられる
}

var iterator = fun();
for(index of iterator){
	console.log(index)
}
//1
//2
//3

// 問266 #高度な話題
// 3つのgenerator関数、foo,bar,bazはそれぞれ関数名の文字列をyield operatorに持ち、fooは次の処理をbarに代理させて、barは次の処理をbaz、それぞれyield値で実行するように定義してください。さらにfor-of文で'foo','bar','baz'と連続で出力してください。
 
// →問題文がわかりにくい、以下のコードが理解できればOK

// 模範解答
let index;
const foo = function * (){
	yield 'foo';
	//Delegating yield
	yield * bar();
}
const bar = function * (){
	yield 'bar';
	yield * baz();
}
const baz = function * (){
	yield 'baz';
}

for (index of foo()){
	console.log(index);
};
//'foo'
//'bar'
//'baz'

// 問267 #高度な話題
// 値が'a'ならgenerator関数内のtry-catch内で値をバックアップ、'b'なら呼び出し元で例外を発生させるgenerator関数を定義してください。
 
// 模範解答
var generatorFunction = function* (){
	while (true){
		try {
			console.log('hello')
			yield;
		} catch (e){
			if(e != 'a') {
				throw e;
			}
			console.log('generator caught', e);
		}
	}
};
var iterator = generatorFunction();
iterator.next();			// hello
try {
	iterator.throw('a');	// generator caught a
							// hello
	iterator.throw('b');	// Uncaught b
} catch (e) {
	console.log('Uncaught', e);
}

// 問268 #高度な話題
// こちらの
// const foo = (name, callback) => {
//     setTimeout(() => {
//         callback(name);
//     }, 100);
// };
// foo('a', (a) => {
//     foo('b', (b) => {
//         foo('c', (c) => {
//             console.log(a, b, c);
//         });
//     });
// });
// // a
// // b
// // c
// ネストされた読みにくい処理記述をgenerator関数を使って記述し直してください。

// →↓の模範解答では高度なプログラミングが行われている。（理解できていない）
// 模範解答

const foo = (name, callback) => {
	setTimeout(() => {
		callback(name);
	}, 100);
};

const curry = (method, ...args) => {
	return (callback) => {
		args.push(callback);
		return method.apply({}, args);
	};
};

const controller = (generator) => {
	const iterator = generator();
	const advancer = (response) => {
		var state;
		state = iterator.next(response);
		if (!state.done) {
			state.value(advancer);
		}
	}
	advancer();
};
controller(function* () {
	const a = yield curry(foo, 'a');
	const b = yield curry(foo, 'b');
	const c = yield curry(foo, 'c');
	console.log(a, b, c);
});
// a
// b
// c

// 問269 #高度な話題
// ジェネレーター関数barを実行して、返り値のiteratorが持つnext()すると、 1,2回目はvalue値がそれぞれ1,2。 3,4回目はfooが実行してそれぞれ3,4とするようにして、 4回目はさらに'z: Z, w: W'をコンソール出力。 5回目はbarが5。 6回目はvalueはundefined。文字列で'x: X, y: Y, v: V'を出力してください。

// →問題文がわかりにくい、↓のソースが理解できれば良い
// 模範解答
 
function *foo() {
	const z = yield 3;
	const w = yield 4;
	console.log( 'z: ' + z + ', w: ' + w );
}

function *bar() {
	const x = yield 1;
	const y = yield 2;
	yield *foo(); // `yield*` delegates iteration control to `foo()`
	const v = yield 5;
	console.log( 'x: ' + x + ', y: ' + y + ', v: ' + v );
}

const it = bar();

console.log(it.next())      // { value:1, done:false }
console.log(it.next( 'X' )) // { value:2, done:false }
console.log(it.next( 'Y' )) // { value:3, done:false }
console.log(it.next( 'Z' )) // { value:4, done:false }
console.log(it.next( 'W' )) // z: Z, w: W
							// { value:5, done:false }
console.log(it.next( 'V' )) // x: X, y: Y, v: V
							// { value:undefined, done:true }

// 問270 #高度な話題
// generatorを作成してimgタグのsrc属性が1~7.pngを参照するようにしてそれぞれ格納した配列を作ってください。

// 模範解答

function* ge (from, to){
	while(from <= to) yield from++
}
const create = function(i){
	return `<img src='${i}.png'>`;
}
const arry = [];
for(var i of ge(1,7)){
	arry.push(create(i))
}
console.log(arry)	// [ "<img src='1.png'>", "<img src='2.png'>", "<img src='3.png'>", "<img src='4.png'>", "<img src='5.png'>", "<img src='6.png'>", "<img src='7.png'>" ]

// 問271 #高度な話題
// for-ofに渡すと1~10までの数値を返すitarableなオブジェクトを自作してください。

// 模範解答
// https://ja.javascript.info/iterable に同様のソースがある

var obj = {}; // イテラブルなオブジェクト
obj[Symbol.iterator] = function(){//イテレータを返す関数を代入
	var iterator = {}; // イテレータ
	var num = 1;
	iterator.next = function(){//next実行してリザルトを返す関数を代入
		var iteratorResult = (num <= 10)
			? { value: num++,   done: false }
			: { value: undefined, done: true };
		return iteratorResult; // イテレータリザルトを返す
	};
	return iterator;//イテレータを返す
};

for(i of obj){
	console.log(i)	// 1 2 3 4 5 6 7 8 9 10
}

// 問272 #高度な話題
// こちらの
// function* g(){
// 	const num =  yield 30
// 	const num2 = yield 1 + num
// 	yield 2 + num2
// 	yield num + num2
// }
// iteratorのnextメソッドに1を渡してdoneがtrueになるまでiterator.next(1).valueのように実行していくとそれぞれ何を返すか答えてください。

// 模範解答↓が説明できればよい

function* g(){
	const num =  yield 30
	const num2 = yield (1 + num)	// （）を明示した、デフォルトでこのように解釈される
	yield 2 + num2
	yield num + num2
}
const iterator = g();
console.log(iterator.next(1).value) //30
console.log(iterator.next(1).value) //2
console.log(iterator.next(1).value) //3
console.log(iterator.next(1).value) //2
console.log(iterator.next(1).value) //undefined

// 問273 #高度な話題
// こちらのfooを
// function* foo(x) {
//     var y = 2 * (yield (x + 1));
//     var z = yield (y / 3);
//     return (x + y + z);
// }
// var it = foo(5);
// it.next();	//(1)
// it.next(12);	//(2)
// it.next(13);	//(3)
// 上の(1),(2),(3)の箇所のように実行したら出力される値をそれぞれ教えてください

// 模範解答

function* foo(x) {				// x は5
    var y = 2 * (yield (x + 1))	// y は2*12=24
    var z = yield (y / 3);		// z は13
    return (x + y + z);			// 42
}

var it = foo(5);
console.log(it.next())		//{value: 6, done: false}
console.log(it.next(12))	//{value: 8, done: false}
console.log(it.next(13))	//{value: 42, done: true}

// 問274 #高度な話題
// 1秒毎に1加算した値をコンソール出力してください。

// ↓で簡単にできるのだが、これをジェネレーターを使って書けということらしい
let counter = 0
setInterval(()=>{
	console.log(++counter)
},1000)

// 模範解答

function* countUp(start = 0){
	while(true){
		start++;
		yield* display(start)
	}
}

function* display(start){
	console.log(+start);
	yield;
}

function run(generatorObject){
	if(!generatorObject.next().done){
		setTimeout(()=>{
			run(generatorObject)	// 再帰呼出し
		}, 1000)
	}
}

run(countUp());

// 問275
// location.href'で返す文字列先頭が'http'から始まる場合trueを返す関数を定義してください。

// 模範解答
location.href.startsWith('http');

// 問276 location.href'で返す文字の最後が'/'かどうかを判定する関数を定義してください。

// 模範解答

location.href.endsWith('/');

// 問277 #高度な話題 #シンボル
// Symbolをプロパティキーとして認識する操作と無視する操作を教えて下さい。

// 模範解答

//認識
Reflect.ownKeys()
Property access via []
Object.assign()

//無視
Object.keys()
Object.getOwnPropertyNames()
for-in loop

// Reflect.ownKeys() とObject.keys() を例に違いを確認してみる

let a = Symbol()
let obj = {
    [a]: 'hello',
    mes: 'world',
}
console.log(obj)					// {mes: 'world', Symbol(): 'hello'}
console.log(Reflect.ownKeys(obj))	// (2) ['mes', Symbol()]
console.log(Object.keys(obj))		//  ['mes']

// 問278 #高度な話題 #シンボル
// こちらを実行すると
// const sym = Symbol('desc');
// const str1 = '' + sym;
// str1 //???
// どうなりますか？

// 模範解答
const sym = Symbol('desc');
const str1 = '' + sym; //TypeError
const str2 = `${sym}`; //TypeError
//Symbolに対して強制的な型変換をするとTypeErrorがスローされます。

// 問279 #高度な話題 #シンボル
// シンボルのユースケースをざっくり2つほど教えて下さい。

// 模範解答

//1
//unique property keys (ユニークなプロパティkey)
//for-ofを通して使えるobject iterableを作ることができる
const iterableObject = {
	[Symbol.iterator]() { // メソッドのキーとしてSymbolを使う
		const data = ['hello', 'world'];
		let index = 0;
		return {
			next() {
				if (index < data.length) {
					return { value: data[index++] };
				} else {
					return { done: true };
				}
			}
		};
	}
}
for (const x of iterableObject) {
	console.log(x);
}
//hello
//world

上記の"unique maker"はオブジェクトリテラブルを作り、for-ofループで使うことができる

//2
//constants representing concepts (概念を表す定数)
//ES5では定数を文字列として表現していたが
//シンボルを使うことでそれらは常にユニークになる。

const COLOR_RED    = Symbol('Red');
const COLOR_ORANGE = Symbol('Orange');
const COLOR_YELLOW = Symbol('Yellow');
const COLOR_GREEN  = Symbol('Green');
const COLOR_BLUE   = Symbol('Blue');
const COLOR_VIOLET = Symbol('Violet');

// 補色をもとめる
function getComplement(color) {
	switch (color) {
		case COLOR_RED:
			return COLOR_GREEN;
		case COLOR_ORANGE:
			return COLOR_BLUE;
		case COLOR_YELLOW:
			return COLOR_VIOLET;
		case COLOR_GREEN:
			return COLOR_RED;
		case COLOR_BLUE:
			return COLOR_ORANGE;
		case COLOR_VIOLET:
			return COLOR_YELLOW;
		default:
			throw new Exception('Unknown color: '+color);
	}
}

console.log(getComplement(COLOR_RED))	// Symbol(Green)

// 問280 #高度な話題 #ProxyとReflection
// こちらは
// let target = {name: 'ken'}
// try {
// 	Object.defineProperty(target, 'name', {value: 'fe'})
// 	//do something
// } catch(e){}
// targetが再定義できる場合name値を変更して「何か」をしようとしている。
// これはObject.definePropertyが成功した際はObjectを返し、失敗したときは TypeErrorをthrowするので、try/catchしているのだが、
// if...elseブロックを使える、Reflectを用いて同じ実装になるように修正してください

// 模範解答
let target = {name: 'ken'}
const isAble = Reflect.defineProperty(target, 'name', {value: 'fe'})
console.log(target)	// 'fe'
console.log(isAble)	// true
if(isAble){
 //do something
} else {}

// 問281 #高度な話題 #ProxyとReflection
// こちらの delete target['key'] と同じことをReflectのAPIを使って行ってください。

Reflect.deletePropery(target, 'key')

// 問282 #高度な話題 #ProxyとReflection
// こちらはReflect.getを使って
// var obj = {a : 1}
// Reflct.get(obj, "a") //1
// 値を取得している。
// 
// obj["a"] //1
// との違いを教えてください

// 模範解答

//objが非オブジェクトの際、ReflectはTypeErrorをthrowしますが、obj["a"]は
//undefinedになります。実行時objの型が適切か気づくことができます。

e.g
var obj = 1;//オブジェクトが入ってくる想定のobjにプリミティブ型を代入
Reflect.get(obj, 1) //Uncaught TypeError: Reflect.get called on non-object

obj[1] //undefined

// 問283 #高度な話題 #ProxyとReflection
// Reflect.applyとはどのようなものですか。

// 模範解答

//このようにthis.を参照するfun関数を引数を伴って使う必要がある場合、
var ctx  = {
	num : 5
}
function fun (a, b, c){
	return a + b + c + this.num
}
fun.apply(ctx, [1,2,3]) //11

//これだとfunがapplyをプロパティとして持っているかわからない場合怖い。

//例
function fn (a, b, c) {
	return a + b + c + this.num
}
fn.__proto__ = null;	//意図しない代入でapplyまで辿れなくなった
fn.apply(ctx, [1,2,3])	//Uncaught TypeError: fn.apply is not a function(…)

//より安全に呼ぶ
//関数が Function.prototype を継承していなくとも TypeError を発生させない

Function.prototype.apply.call(fun, ctx, [1,2,3]) //11

//ただ上記は安全だが冗長な書き方になる。
//もしthisコンテキストを通して定義する必要があり、書き方をスッキリしたいなら

Reflect.apply(fun, ctx, [1,2,3]) //11

// 問284 #高度な話題 #ProxyとReflection
// こちら
// String.fromCharCode(104,101,108,108,111)	// "hello"
// String型の静的メソッドであるfromCharCodeは常にStringを伴って呼ぶ必要がある。
// また返り値はString型ではなく文字列です。
// Number型を渡さなくてはいけない引数に配列を渡し、 同じ出力になるようにしてください

console.log(Reflect.apply(String.fromCharCode, undefined, [104, 101, 108, 108, 111])) //"hello"

// 問284 #高度な話題 #ProxyとReflection
// p.aにアクセスしたら1を返し、存在しないプロパティにアクセスしたら37を 返すオブジェクトを作成してください 期待する結果 p.a //1 p.c(cは設定されていない任意のプロパティ) //37
 
// 模範解答

var handler = {
	get: function(target, name){
		return name in target ? target[name] : 37
	}
}

var p = new Proxy({}, handler);
p.a = 1
console.log(p.a) //1
console.log(p.c) //37

// 問285 #高度な話題 #ProxyとReflection
// {a: 1}がprototype上に'toString'持っているかBoolean値を出力してください

// リフレクションを使わずに普通に書いたらこう
const a = {a:1}
console.log('toString' in a)	// true

// 模範解答
console.log(Reflect.has({a: 1}, 'toString')) //true

// 問286
// Errorオブジェクトのインスタンスにmessageとして"エラーが発生しました"を代入エラーをthrowしてください

// 模範解答
var err = new Error();
err.message = "エラーが発生しました"
throw err

//other
throw new Error("エラーが発生しました。");

// 問287
// obj.aに数値以外のものが代入されるとsetterでErrorを投げ、number型ならaに代入。getterはaを返すobjを作ってください。
 
// 模範解答
var obj = {
	_a : 0,
	get a(){return this._a; },
	set a(n){
		if(typeof n === "number"){
			this._a = n;
		} else {
			throw new Error("代入できません")
		}
	}
};

// 問288
// このようながDOMがあります。
// 	<span id='foo' class='bar baz'>foo</span>
// 付与されたclass名が存在するだけ出力してください。
// 期待する出力 //'bar' //'baz'

// 模範解答
var foo = document.getElementById('foo');
for(var i = 0; i < foo.classList.length; i++) {
	console.log(foo.classList[i]);
}

// 問289
// こちら
// <span id='foo' class='bar baz'>foo</span>
// の中にbazがあることを真偽値で出力してください

// 模範解答
var foo = document.getElementById('foo');
foo.classList.contains('foo');

// 問290
// こちら
// 	<span id='foo' class='bar baz'>foo</span>
// にfafaというclass名を追加してbarを削除してください

// 模範解答
var foo = document.getElementById('foo');
foo.classList.add('fafa');
foo.classList.remove('bar');

// 問291 #jQuery
// こちら
// $.getJSON('/my/url', function(data) { });
// Jqueryでgetしているが、ライブラリを使用しないのでJS記述してください。

// →jQuery は置いといて、WebAPIである'/my/url/ からJSONを取得するコードが書ければよい
//  fetch API を使うのが楽
fetch('/my/url')
    .then(response => response.json())
    .then(data => console.log(data))
    .catch(error => console.error(`Error: ${error}`)

// 模範解答はfetchAPI を使用していないので複雑. ↑の答えでよい

//一例
const request = new XMLHttpRequest();
request.open('GET', '/my/url', true);

request.onload = function() {
  if (request.status >= 200 && request.status < 400) {
    // Success!
    const data = JSON.parse(request.responseText);
  } else {
    // We reached our target server, but it returned an error
  }
};
request.onerror = function() {
  // There was a connection error of some sort
};

request.send();

// 問292
// var data = { foo: 'abc', bar: 100 }
// このようなdataをPOSTで送れるようにしてください
// 期待する結果 'foo=abc&bar=100'

// →POSTで送るためには 'foo=abc&bar=100' という文字列に変換する必要がある、変換してくださいという問題（したがって文字列操作の問題）

// 模範解答
let arr = [];
Object.keys(data).forEach(function(el, ind){
    arr.push(encodeURIComponent(el) + "=" + encodeURIComponent(data[el]))
})
const str = arr.join("&")
console.log(str) //'foo=abc&bar=100'

// 問293 #jQuery
// こちら
// $(selector).each(function(i, el){
// 	something...
// });
// と同じ処理をJSで記述してください

// →querySelectorAll() で取得したNodeList の全ての要素に something... の内容を実行できればよい

// 模範解答

var elements = document.querySelectorAll(selector);
Array.prototype.forEach.call(elements, function(el, i){
    something...
});

// 問294 #jQuery
// こちら
// $(el).after(htmlString);//1
// $(el).before(htmlString);//2
// $(el).children(); //3
// $(el).next();//4
// $(el).parent();//5
// と同じ動きをJSで記述してください

// 模範解答
//1
parent.appendChild(el);
//2
el.insertAdjacentHTML('beforebegin', htmlString);
//3
el.children
//4
el.nextElementSibling
//5
el.parentNode

// 問295 #jQuery
// こちら
// $(el).hasClass(className);
// と同じ処理をJSで記述してください

// 模範解答
var el = document.getElementById('container')
if (el.classList){
	el.classList.contains(className);
} else {
	new RegExp('(^| )' + className + '( |$)', 'gi').test(el.className);
}

// 問296 #jQuery
// こちらの2つの処理
// $(el).next();
// $(el).parent();
// と同じことをJSで記述してください

// 模範解答
var el = document.getElementById('container')
el.nextElementSibling
el.parentNode

// 問297 #jQuery
// こちら
// $(el).offset(); //{top: 11, left:11}
// と同じ値を含むオブジェクトを取得できるようにJSで記述してください。

// 模範解答
var rect = el.getBoundingClientRect();
console.log(rect) //{top:11, height:11, left:11, right:11, bottom:11, width:11}

// 問298 #jQuery
// こちら
// $(el).remove();
// と同じ処理をするようにJSで記述してください。

// 模範解答
el.parentNode.removeChild(el);

// 問299 #jQuery
// こちら
// $(el).removeClass(className);
// と同じ処理をするようにJSで記述してください。

// 模範解答
// el.classList.remove(className) だけでいいと思う、else 節で何をやっているかは不明（おそらくclassList実装のない古いブラウザー用の記述だと思われる）
if (el.classList) {
	el.classList.remove(className);
} else {
	el.className = el.className.replace(new RegExp('(^|\\b)' + className.split(' ').join('|') + '(\\b|$)', 'gi'), ' ');
}

// 問300 #jQuery
// こちら
// $(el).attr('tabindex', 3);
// と同じ処理をするようにJSで記述してください。

// 模範解答

el.setAttribute('tabindex', 3);
