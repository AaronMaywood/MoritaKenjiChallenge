// 問1
// const a = { a: 'a' }とconst b = { b: 'b' } をマージしたc を出力してください e.g{ a:'a', b:'b' }
const a = { a: 'a' }, b = { b: 'b' }
console.log({...a,...b})
console.log(a)

// 問2
// const arry = ['aa','bb','cc','dd','ee','ff','gg'];
// のdd,ee,ffを新たな配列として返してください
const arry = ['aa','bb','cc','dd','ee','ff','gg'];
arry.splice(3,5)	// arry.slice(3,6) の方がarryの内容を破壊しないのでよい

// 問3
// ['a','b’] の要素をconsole出力してください e.g 'a'と'b'
const a = ['a','b']
a.map(i=>console.log(i))

// 問4
// ['a', 'b']の各要素にindex値を足した文字列を出力してくださいe.g 'a0'と'b1'

const arry = ['a','b'];
// forEach でインデックス番号を取得できることを利用する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach
arry.forEach((elem,index) => {
	console.log(elem + index)
})

// 関係ないけどメモ
a = ["a","b",,"c"]	// 一つ飛ばすとインデックス番号も飛ぶ
a.forEach(console.log)	// forEachに関数を渡せばその関数に３つの引数が渡される！
			// a 0 [ 'a', 'b', <1 empty item>, 'c' ]
			// b 1 [ 'a', 'b', <1 empty item>, 'c' ]
			// c 3 [ 'a', 'b', <1 empty item>, 'c' ]

// 問5
// 任意の変数名で[1,2]を定義し、それが配列かどうかを評価してください e.g true

let a = [1,2], b = 1, c = "hello"

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/isArray
console.log(Array.isArray(a))
console.log(Array.isArray(b))
console.log(Array.isArray(c))

// 問6 
// //1
// if (typeof x === 'undefined') { ???  }
// //2
// if(x === undefined){ ???  }
// 変数xが定義されていない場合上の1、2は実行されますか?

↓以下を実行してみるとわかる
if (typeof x === 'undefined') { console.log('hello')  }
if(x === undefined){ console.log('javascript')  }

結果:
https://i.gyazo.com/f9e1c795a607d8c35140c0df351e88a3.png
	→ typeof演算子はエラーになることなく未定義の変数を判別できる

// 問7 #高度な話題
// こちら
// //1
// let x;
// if (x === void 0) {
// }
// //2
// // 直前まで y は宣言されていない
// if (y === void 0) {
// }
// 1,2はそれぞれ実行されますか


// //1
// let x;
// if (x === void 0) { console.log('x') }
// //2 直前まで y は宣言されていない
// if (y === void 0) { console.log('y') }
// 1,2はそれぞれ実行されますか
// 
// 実行してみた:
// https://i.gyazo.com/f2fd22e1d9c4796886d93ec557dbf406.png
// 後者はエラーになる
// 
// void:
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/void 
// https://techplay.jp/column/559
// > JavaScriptの「void(0)」は、常にUndefinedを返してくれるとても便利な演算子です。Undefinedと記述するよりも正確に、Undefinedをきちんと返してくれるという特徴があるのです。
// > ちょっとややこしいですが、Undefinedというのは単なる変数でしかありません。変数であるということは、Undefined以外の他の値を持たせることが可能なのでいつでもUndefinedであるという保証はないのです。

// 問8 #高度な話題
// const obj = { key: 'aa', key2: 'bb' } の中のkeyとvalueを自身のプロパティのみ全て出力しなさい
// 
// →forEachやmap、for..of は配列には使用できるが、オブジェクトには使用できない
// →for..inを使用する
// 
// for..inではkeyが取得できる
// for(const key in obj){
// 	console.log(key, obj[key])
// }
// 
// 「自身のプロパティのみ」であることを考慮するには更に hasOwnProperty で判別する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/hasOwnProperty
// ES2022からは、hasOwnProperty の改良版の Object.hasOwn が利用可能、こっちを使おう
// https://ics.media/entry/220610/
// 
// 完成
// const obj = { key: 'aa', key2: 'bb' }
// for(const key in obj){
// 	if(Object.hasOwn(obj,key)){
// 		console.log(key, obj[key])
// 	}
// }
// 
// https://i.gyazo.com/680bf60d603639d565e6abf617c5c875.png

// 問9
// const array = ['a', 'b', 'c'];
// 配列の中の全ての要素を結合し、1つの文字列として出力してください。

array.join('')

// 問10 #高度な話題
// x = 43
// let y = 3
// の2つの変数。deleteできるのはどちらですか？
// 
// delete x	// x はグローバルオブジェクトwindowのプロパティなので delete window.x でもOK
// delete y
// 
// 実行結果:
// https://i.gyazo.com/d553bfc439df42ac21f249f7c6b6c913.png
// delete x はtrue で delete y はfalse
// 
// https://i.gyazo.com/6012615716d3e471b224c43f4f43f98e.png
// 確かに x はdelete できている

// 問11
// let arry =[
//   {id:1,name:'morita'},
//   {id:2,name:'kenji'},
//   {id:4,name:'uro'},
//   {id:3,name:'ken'}
//   ];
// をid番号が若い順にソートしたオブジェクトを含む配列を出力してください

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/sort

arry.sort((a,b) => a.id < b.id)				// NG 間違えやすい. 比較の返り値は論理値ではなく、-1,1とする必要がある
arry.sort((a,b) => a.id < b.id ? -1 : 1)	// OK, -1 はa,bの順に、1 はb,aの順に並べるという意味

// 問12
// a, bの変数はデフォルトとしてaは5、bは7を持ち、aに1を代入してconsole出力してください。

// →関数定義と変数宣言の両方でやってみる

// 関数宣言
function test(a=5,b=7){
	console.log(a,b)
}
console.log(test(1))	// 1 7

// 変数宣言

let a = 5, b = 7
a = 1
console.log(a,b)		// 1 7

// https://i.gyazo.com/e19dd12c9e6bf4f184d8924b4cb28d6f.png

// 問13
// next()を実行しただけ返り値が1増える関数を定義してください
// →返り値が1増えるようなクロージャー関数next() を返す関数を定義してください

function nextGen(){
	let counter = 0
	return function next(){
		return ++counter	// counter++ にすると0始まり
	}
}

const next = nextGen()
console.log(next())	// 1
console.log(next())	// 2
console.log(next())	// 3

// 問14
// fun(1,2,3)を実行したら引数が全て配列で返る関数funを定義しなさい

function fun(a,b,c){
	return [a,b,c]
}
fun(1,2,3)

// 問15
// const array = ['a1','a2','a3','a4','a5']
// の0〜2番目の要素をそれぞれ
// red, green, yellow
// に置き換えて配列にしてください。また実行した際の返り値を教えてください
// 
// → 問題の意味がわからないので答えをチラ見、
// 	なるほど、splice を使用して、という意味か。
// 
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
// splice(start, deleteCount, item1, item2, itemN) のパターンを使用する

const array = ['a1','a2','a3','a4','a5']
console.log(array.splice(0,2,'red','green','yellow'))	// 置き換え時の返り値の確認
console.log(array)	// 置き換わっている

// https://i.gyazo.com/54ab67109813845f363e827666879206.png

// 問16
// const array = ['a1','a2','a3','a4','a5']
// のインデックス2〜4の要素を取り出し、 配列として出力しなさい。 実行された後のarrayの要素を教えてください

const array = ['a1','a2','a3','a4','a5']
console.log(array.splice(2,4))
console.log(array)

// https://i.gyazo.com/b33c6137036c95f2c427304cf1ad6172.png

// 問17
// const array = ['a1','a2','a3','a4','a5']
// の全ての要素を"/"で結合した文字列を出力し、さらにその文字列を'/'区切りで配列に直してください
// 
// →joinとsplitを思い出せれば勝ち. これらはたまに使う

const array = ['a1','a2','a3','a4','a5']
const str = array.join('/')
console.log(str)
const array2 = str.split('/')
console.log(array2)
// https://i.gyazo.com/6bf52026587eed8c9ddf4a9aa81a231c.png

// 問18
// ['おはよう','こんにちは','おやすみなさい']の要素がランダムに出力される関数を書いてください。(配列に要素が追加される事を仮定してたものにしてください)
// 
// →ランダムに全要素を出力するという意味と解釈して回答←実際はもっと単純な意味だった、単純な回答は公式の答えを参照
// 
// const array = ['おはよう','こんにちは','おやすみなさい'];
// 
// // シャッフル関数を用意する
// function shuffle(a){
// 	for(let i=0; i<a.length; i++){
// 		const random_index = Math.floor(Math.random()*a.length)
// 		// 値を入れ替える
// 		const tmp = a[i]
// 		a[i] = a[random_index]
// 		a[random_index] = tmp
// 	}
// 	return a
// }
// 
// // シャッフル後に全要素を出力する
// shuffle(array).map(i=>console.log(i))

// 問19 #高度な話題
// Object.createで空のオブジェクトを作成し、値が1のプロパティpを出力してください
// 
// → 空のオブジェクトを作るところまではわかるが、そのあとの指示の意味がわからない
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
// →Object.create の引数 protoとpropertiesObject をうまく利用して、{p:1} を作れという意味だった
// 
// propertiesObject引数に与えることの可能な記述子は
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// にある configurable, enumerable, value, writable, get, set だが、値を与えるには value のみを指定すればよい
// また、propertiesObjects の書き方は
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperties
// を参考にして、以下のように書く。
// 	{
// 		propertyName: {
// 			value: 1
// 		}
// 	}
// 
// 
// 
// const o = Object.create({}, {p: {value: 1}})
// console.log(o)
// 
// https://i.gyazo.com/ca4ce05d322cc16f16ea97df76badd0f.png

// 問20 #高度な話題 #class
// コンストラクタWhoの初期化時に'morita'(String)を渡しインスタンスプロパティnameに代入、インスタンスメソッドgetNameの返り値がWho.prototype.name値になるいわゆる「classのようなもの」を作成してください
// ※インスタンスメソッドはprototypeに代入してください

→class構文を使用しないで書いてみる

function Who(name){
	this.name = name
}

// getName メソッドを作るのに、this の扱いのないアロー関数を使うことはできない. 普通のfunction式を使用する
Who.prototype.getNameNg = () => this.name	// NG
Who.prototype.getName = function(){			// OK
	return this.name
}

const p = new Who('morita')
console.log(p.getName())	// OK
console.log(p.getNameNg())	// NG

https://i.gyazo.com/785c9b227662dff326ad79e1b42fa408.png

→class構文を使用して書くと楽

class Who{
	#name	// ES2022でサポートされたプライベートフィールドを使用すると外部からは直接アクセス不能になるので良い
			// See: https://ics.media/entry/220610/
	constructor(name){
		this.#name = name
	}
	getName(){
		return this.#name
	}
}

const a = new Who('morita')
console.log(a.getName())

https://i.gyazo.com/9c6d552d6126647624d50ad4bbc10749.png

// 問21 #高度な話題
// 浅いコピー(shallow copy)と深いコピー(deep copy)の違いを説明してください
// 
// →オブジェクトの階層深くまでコピーするかどうか。deep copy といってもその方法によってコピーしきらない制限事項もある
// https://ja.javascript.info/object-copy シャローコピーの解説がある
// > “本当のコピー” (クローン) を作るには、Object.assign を使った “shallow copy”（浅いコピー、ネストされたオブジェクトは参照がコピーされる）を行うか、Lodashの _.cloneDeep(obj) のような “deep cloning” 関数を使います
// https://developer.mozilla.org/ja/docs/Glossary/Deep_copy
// →deep copy を実現するには、2022年ごろからサポートされたstructuredClone を使用するとよい(ESではなくHTML仕様)
// https://zenn.dev/akkie1030/articles/js-structured-clone	// structuredClone でも関数はコピーできないとある
// https://developer.mozilla.org/ja/docs/Web/API/structuredClone
// https://zenn.dev/uhyo/articles/what-is-structuredclone

// 問21
// let array = ['e','a','k','B','c'];
// array.sort();
// を実行した結果を答えてください
//
// →要点1: array.sort() は自身を書き換える 要点2: デフォルトでは文字コード順（UTF-16, https://ja.wikipedia.org/wiki/Unicode%E4%B8%80%E8%A6%A7_0000-0FFF の一覧を参照）に昇順（低い→高い）となる
// →['B','a','c','e','k'] となるはず
/
// 問22
// 上記の配列を大文字小文字区別なく順番通りにしてください。期待する値['a','B','c', 'e','k']
// 
// →大文字をすべて小文字にした上で比較すればよい
// https://www.javadrive.jp/javascript/string/index17.html の方法を使用する

let array = ['e','a','k','B','c'];
array.sort((a,b) => a.toLowerCase(a) < b.toLowerCase() ? -1 : 1)

// https://i.gyazo.com/097a7053bdb947fbde52dd53033a9179.png

// 問23
// let array = [20,100,3,35,0]
// 比較する配列の要素が数値の場合、「降順」にsortしてください 期待する結果[100, 35, 20, 3, 0]

let array = [20,100,3,35,0]
array.sort((a,b)=> a<b?1:-1)
https://i.gyazo.com/c50d22e49018589ab6c8a0008dc70b3d.png

// 問24
// 文字列 '10'をNumber型にし、型判定し、数値かどうか評価後、文字列に変換してください

https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Number/toString

let a = Number('10')		// new Number('10') ではない
if(typeof a === 'number'){
	a.toString(10)			// 10進数を表す文字列とする
}

https://i.gyazo.com/72ded48c46289acd7c422cf435d0daa5.png

// 問25 #高度な話題
// カーリー化されたadd(1)(2)もしくはadd(1,2) を実行した際両方とも返り値3になる関数を定義しなさい。p85
// 
// →高度すぎる話題なので飛ばします

// 問26 #高度な話題
// クロージャーを使ったファクトリー関数。
// var fafa = Factory('morita');
// fafa.introduce() //'morita'
// 上記のような実行をしたら渡したname(ここではmorita)が表示されるメソッドintroduceを持つファクトリー関数を定義しなさい。
// 
// →高度すぎる話題なので飛ばします
// 
// function Factory(name){
// 	return {
// 		introduce (){
// 			return name
// 		}
// 	}
// }
// let f = Factory('morita')
// console.log(f.introduce())

// 問27 #高度な話題
// 関数sayHiに自分の名前を引数で渡した際にhello!yourname、何も渡さない場合hello! と返す関数を作成し、それをapplyで実行してください。また applyの第一引数にnullを渡す場合とオブジェクトを渡す場合のそれぞれのthisは何を指しますか答えてください p83
// 
// →高度すぎる話題なので飛ばします
// 
// →質問はわかりにくい。以下のソースを見せ、どのような結果になるかを問うほうが具体的でよい
// let sayHi = function(name){
//  return 'hello!' + (name ? name : '');
// };
// sayHi('kenji');
// sayHi();
// sayHi.apply(null,['kenji']);//関数呼び出し
// let greeting = {
//   sayHi: function(name){
//     return 'hello!' + (name ? name : '');
//   }
// };
// //メソッド呼び出し
// greeting.sayHi.apply(greeting,['kenji']);//渡す
// greeting.sayHi.apply(greeting);//渡さない
// 

// 問28 #高度な話題
// let obj = {x : 2, y: 3};
// このobjをプロパティ追加不可、削除変更は可能にし、プロパティ追加不可か否かの判定メソッドでtrueが返る事を確認した後、objのkeyを列挙してください。
// 
// →高度な話題なので飛ばします
// →回答を見て学んでおく（回答には誤りがあった、以下に正しい回答を示す）
// 
// let obj = {x : 2, y: 3};
// Object.preventExtensions(obj);
// Object.isExtensible(obj);	// false
// Object.keys(obj);			// ['x', 'y']
// 
// preventExtentions は新しいプロパティの追加を抑制する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/preventExtensions
// Object.keys はキーを一覧で返す
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/keys

// 問29 #高度な話題
// let obj = {} と等価なオブジェクトをObjctメソッドで生成してください
// 
// →高度な話題なので飛ばします
// 
// →等価という意味には複数ある. 内容が同じオブジェクトでも、オブジェクトが異なれば同じではない。ただし等価（等しいとみなされる）であれば、オブジェクトのコピーをすればよい
// →シャローコピーでよい
// →回答を見た、コピーではなく、プログラムで let obj = {} と同等のことができればよいという意味だった（コードと等価の内容を作れば良い）
// 
// Object.create(Object.prototype)
// https://i.gyazo.com/18642efe6179d17651279385bb86e668.png
// 
// ↓以下の点を踏まえて改良する
// https://developer.mozilla.org/ja/docs/Learn/JavaScript/Objects/Object_prototypes
// > オブジェクトのプロトタイプを指し示すプロパティは prototype という名前ではありません。
// > オブジェクトのプロトタイプにアクセスする標準的な方法は Object.getPrototypeOf() メソッドです。
// 
// 
// Object.create(Object.getPrototypeOf(Object.prototype))
// https://i.gyazo.com/1b1432364f063951ac1ae1c202380486.png
// →ざんねながら、グローバルオブジェクトのgetPrototypeOf はうまく動作していない
// 	Object.create(Object.prototype)
// 	もしくは
// 	Object.create(Object.__proto__)
// 	の方法で良しとする
// 
// https://i.gyazo.com/a5d7d21f690ac1b704eaef2f24ed38ff.png
// →Object.create(Object.__proto__) はうまく行かない
// 	Object.create(Object.prototype)
// 	こうするしかない
// 
// なお、グローバルオブジェクトではない場合では .getPrototypeOf() で以下のように書ける
// 
// let o = {}
// Object.create(Object.getPrototypeOf(o))
// https://i.gyazo.com/1fc78677d22218f7529ccd64ec30467a.png

// 問30 #高度な話題
// let obj = {x : 2, y: 3}
// のコードと等価なコードをObjectメソッドで生成してください
// 
// →高度な話題なので飛ばします
// 
// Object.create(Object.prototype,{
// 	x: {
// 		value: 2
// 	},
// 	y: {
// 		value: 3
// 	}
// })
// 
// https://i.gyazo.com/1246ceac62a40a7a09fd87aab7adbda5.png

// 問31 #高度な話題
// const obj = { x : 2 }
// の属性を出力してください
//
// →属性とはプロパティの属性のことでプロパティ記述子として定義される
// https://qiita.com/hikotaro_san/items/a6680fd4fecb3ebb1088
// > プロパティ属性は、プロパティ記述子というオブジェクトのプロパティとして保持されています。
// > プロパティ記述子は、データ記述子とアクセサー記述子があります。
// →それぞれの属性の意味
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty
// 
// →高度な話題なので飛ばします
// 
// プロパティの属性
// https://javascript.keicode.com/lang/object-object-property-attributes.php
// 
// プロパティの属性に含まれる各記述子は getOwnPropertyDescriptor で列挙可能
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyDescriptor
// 
// const obj = { x:2, y:3}
// Object.getOwnPropertyDescriptor(obj,'x')	// プロパティ`x`に関するプロパティ記述子を見る
// Object.getOwnPropertyDescriptors(obj)		// こうすればすべてのプロパティのプロパティ記述子を見ることができる
// https://i.gyazo.com/e492136ca33ba733c0a3b7f69623d102.png

// 問31 #高度な話題
// こちら var obj2 = {x : 2}; にObjectメソッドを用いてプロパティy、値2、プロパティ追加可能を定義して、Objectメソッドで情報(値と属性)を返してください P149
// →「プロパティ追加可能」は「プロパティ列挙可能(enumerable)」の間違い

let obj2 = {x : 2};
Object.defineProperty(obj2, 'y', {
	value: 2,
	enumerable: true,
})
console.log(obj2) // { x: 2, y: 2 }

// 問32 #高度な話題
// 実引数の数を出力、第一引数を出力する関数fを実行してください
// 
// argumentsオブジェクトを使用する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Functions/arguments 
// （function.lengthというものもある）
// https://developer.mozilla.org/en-US/docs/Web/JavaScript/Reference/Global_Objects/Function/length

function foo(){
	console.log(arguments.length)
	console.log(arguments[0])
}

foo()
	// 0
	// undefined
foo(1)
	// 1
	// 1
foo(1,2)
	// 2
	// 1

// 問33 #高度な話題
// let arr = ['2','23','0','16'];
// を小さい順にソートしてください。その後ソートをできないようにread-onlyにしてください

let arr = ['2','23','0','16'];
arr.sort()
console.log(arr)	// [ '0', '16', '2', '23' ]
Object.freeze(arr)	// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/freeze
arr.sort()
	// arr.sort()
	//     ^
	// TypeError: Cannot assign to read only property '0' of object '[object Array]'

// 問34
// var arr = [3,4,5]; をconcat以外で新たな配列としてarr2にコピーしてください。その後arr2[0]= 123を代入するとarrは何を出力するか答えなさい
//
// シャローコピー
// https://developer.mozilla.org/ja/docs/Glossary/Shallow_copy

let arr = [3,4,5]
let arr2 = Array.from(arr)
console.log(arr2)	// [ 3, 4, 5 ]
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// [ 123, 4, 5 ]

// Object.assign() を使用した方法
let arr = [3,4,5]
let arr2 = Object.assign(arr)
console.log(arr2)	// [ 3, 4, 5 ]
arr2[0] = 123
console.log(arr)	// [ 123, 4, 5 ]	// 変わる
console.log(arr2)	// [ 123, 4, 5 ]

// Object.create() を使用した方法
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/create
let arr = [3,4,5]
let arr2 = Object.create(arr)
console.log(arr2)	// Array {}		// この方法ではObjectの設計だけコピーされて値はコピーされない
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// Array { '0': 123 }

// スプレッド構文を使用した方法
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Operators/Spread_syntax
let arr = [3,4,5]
let arr2 = {...arr}
console.log(arr2)	// { '0': 3, '1': 4, '2': 5 }	もとは配列だが、オブジェクトになる
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// { '0': 123, '1': 4, '2': 5 }

// Array.prototype.concat を使用した方法
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/concat
// > このメソッドは既存の配列を変更せず、新しい配列を返します。
let arr = [3,4,5]
let arr2 = arr.concat()
console.log(arr2)	// [ 3, 4, 5 ]
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// [ 123, 4, 5 ]

// ディープコピー
// https://developer.mozilla.org/ja/docs/Glossary/Deep_copy
// 1. JSONを経由する
let arr = [3,4,5]
let arr2 = JSON.parse(JSON.stringify(arr))
console.log(arr2)	// [ 3, 4, 5 ]
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// [ 123, 4, 5 ]
// 2. 構造化複製を行う
// https://developer.mozilla.org/ja/docs/Web/API/structuredClone
let arr = [3,4,5]
let arr2 = structuredClone(arr)
console.log(arr2)	// [ 3, 4, 5 ]
arr2[0] = 123
console.log(arr)	// [ 3, 4, 5 ]
console.log(arr2)	// [ 123, 4, 5 ]

// 問35 #高度な話題
// こちらは2つのパラメーターを足して返すgetSum関数です。
// const getSum = (a, b) => a + b
// このパラメーターに何もわたってこなかった場合Errorをスローすようにしてください 期待する結果
// getSum(10) //throws b is not defined
// getSum(undefined, 10) //throws a is not defined
 
const getSum = (a, b) => {
	if( typeof a === "undefined" ){
		throw new Error('a is not defined')
	}
	if( typeof b === "undefined" ){
		throw new Error('b is not defined')
	}
	return a + b
}
console.log(getSum(1,2))	// 3
console.log(getSum(1))		// Error: b is not defined
console.log(getSum())		// Error: a is not defined

// もりた氏の回答
// 引数が無い場合にはデフォルト値（式）を見に行くことを応用している
// const _err = function(message) {
//     throw new Error(message);
// }
// const getSum = (a = _err('a is not defined'), b = _err('b is not defined'))=> a + b


// 問36
// strict modeの代表的な制約を挙げて説明してください。
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Strict_mode
// →模範回答は細かすぎる、
// https://ja.javascript.info/strict-mode
// にある理解で十分

// 問37 #高度な話題
// for in文に関する注意点を3つ挙げてください
// for...in はオブジェクトのプロパティ巡回用
// https://ja.javascript.info/object#ref-66
// for...of は配列をはじめとしたiterable な値を巡回する用、この２つを混ぜないこと
// https://ja.javascript.info/array#ref-980
// > 配列はオブジェクトなので for..in を利用することもできますが、これはよくないアイディアです

// 問38
// DOM上にあるdivをnodeListに変換して配列に格納してください

let a = document.querySelectorAll('div')

// 問39
// 配列var arr = ['f','o','x','k'];をインデックス順に出力させてください

var arr = ['f','o','x','k']
arr.forEach(i => console.log(i))	// あるいは単に arr.forEach(console.log)

// 問40 #高度な話題
// またイテレーターを使い順番に出力してください

// 1. Symbol.iterator を使用する
https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Symbol/iterator
var arr = ['f', 'o', 'x', 'k'];
let i = arr[Symbol.iterator]()
console.log(i.next())
console.log(i.next())
console.log(i.next())
console.log(i.next())
console.log(i.next())

// 2. また、Symbol.iterator は for...of で使用されるので、以下でもよい
var arr = ['f', 'o', 'x', 'k'];
for(a of arr){
	console.log(a)
}

// 問41
// 配列['a', 'b', 'c', 'd', 'e'] のインデックス2番目に'morita'という要素を加えなさい。期待する結果['a', 'b','morita', 'c', 'd', 'e']
//
// →spliceを使用しよう
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/splice
let a = ['a', 'b', 'c', 'd', 'e']
a.splice(2,0,'morita')
console.log(a)

// 問42 #高度な話題
// これ var o = {}; と同じ意味を持つコードをObjectのAPIを使って生成してください

let o = Object.create({})
console.log(o)

// 問43 #高度な話題
// {p: 42} となるようなオブジェクトをObjectメンバを使って生成してください
// →オブジェクトメンバを使ってというのは Object.create を使ってということだった

let o = Object.create(Object.prototype)
Object.defineProperty(o,'p',{
	value: 42
})
console.log(o.p)	// 42

// 問44
// 1234という数字を文字列に変更後、配列の要素としてインデックス順に格納してください
// →各文字に分解して格納せよということだった

let str = Number(1234).toString()
let a = str.split('')
console.log(a)

// 問45
// こちらは要素が2だったらループを抜けたいのだが期待どうり動かない
// 期待する出力 //0, 1
// [0, 1, 2, 3, 4].forEach(function(val, i) {
//   if (val === 2) {
//     // how do we stop?
//     return true;
//   }
//   console.log(val);
// }); // 0, 1, 3, 4
// 期待通りになるようにしてください
//
// →forEach() は止まらない
// https://note.affi-sapo-sv.com/js-foreach-interruption.php
// したがって、forEach を使わないで書く必要がある

// 1. 普通にforループにする
let a = [0, 1, 2, 3, 4]
for(let i=0; i<a.length; i++){
  if (a[i] === 2) break;
  console.log(a[i])
}

// 2. for...ofでも中断できる
let a = [0, 1, 2, 3, 4]
for(i of a){
  if (i === 2) break;
  console.log(i)
}

// 問46
// 問題文がないのでスキップ

// 問47
// 下記のような
// array = [
// {name: 'kenji', mail:'fafa@eee.com'},
// {name: 'morita', mail: 'kkk@faf.com'}
// ]
// 配列内にある連想配列のkeyとmail値を配列に格納して出力してください
// →この問題の意味は、 ['fafa@eee.com', 'kkk@faf.com'] を作ってくださいということだった

let array = [
	{name: 'kenji', mail:'fafa@eee.com'},
	{name: 'morita', mail: 'kkk@faf.com'}
]

let a = []
array.map(i=>a.push(i.mail))
console.log(a)	// [ 'fafa@eee.com', 'kkk@faf.com' ]


// 問48
// 配列var passed = [12, 5, 8, 130, 44]
// の要素全てが10以上かどうかを評価してtrueかfalseを返してください。
// また10以上のものが一つでもあった場合trueを返してください。

// →some とevery を使う問題
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/some

let passed = [12, 5, 8, 130, 44]
// 全ての要素が10を超えるか？
console.log( passed.every(i => i > 10) )	// false
// どれか一つでも10を超えるか？
console.log( passed.some(i => i > 10) )		// true


// 問49
// 二次元配列
// [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']];
// の'two'の値を取得してください
// →'send@fafa' を取り出すということ

let a = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']];
let two = a[1][1]
console.log(two) //'send@fafa'

// 模範解答ではMap に変換し、キーを指定してその値を取り出している
const fafa = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']]
];
const map = new Map(fafa);
map.get('two'); //'send@fafa'

// それなら、オブジェクトにしてもOKだ
const fafa = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']]
let o = {}
fafa.forEach(i=>{
	const key = i[0]
	const value = i[1]
	o[key] = value
})

console.log(o.two) //'send@fafa'

// 問50
// 問49の変数fafaにインデックス3番目の要素として['four',fafa@eee]の配列を追加してください

const fafa = [['one', 'info@fa'],['two', 'send@fafa'],['three', 'hoso@fafa']]

fafa.splice(2,0,['four','fafa@eee'])
console.log(fafa) // [ [ 'one', 'info@fa' ], [ 'two', 'send@fafa' ], [ 'four', 'fafa@eee' ], [ 'three', 'hoso@fafa' ] ]

// →模範解答ではMap を使用している

