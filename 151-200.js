// 問151
// 下記
// const key = 'greeting';
// var objA = {};
// objA[key] = 'おはよう';
// objA.greeting //'おはよう'
// をECMAScript2015を意識した省略記述してください

const key = 'greeting';
const objA = {
  [key] : 'おはよう'
};
console.log(objA.greeting)

// 問152
// こちらの記述
// var objA = {
//  add: function(a,b){
//   return a + b;
//  }
// }
// objA.add(2,5); //7
// を省略記述してください

const objA = {
 add(a,b){
  return a + b;
 }
}
console.log( objA.add(2,5) ); //7

// 問153
// 上記の問題のadd関数をobjA内でアロー関数で記述してください

const objA = {
 add: (a,b) => {
  return a + b;
 }
}
console.log( objA.add(2,5)) // 7

// 問154
// このような
// var array = ['shibuya','shinjuku','ebisu','shinagawa','tokyo','ueno','ikebukuro'];
// 配列がある。
// 変数aに'shinjuku'、bに'ikebukuro'が代入されるように簡潔に記述してください

const array = ['shibuya','shinjuku','ebisu','shinagawa','tokyo','ueno','ikebukuro'];
// これでも十分簡潔ではあるが
// const a = array[1]
// const b = array[6]
// 分割代入でもできる
const [,a,,,,,b] = array;
console.log(a) //"shinjuku"
console.log(b) //"ikebukuro"

// 問155
// このような
// var obj = {
//  name : 'kenji',
//  town: 'shibuya'
// }
// objを変数name、townに代入して出力してください

// 分割代入を使う話題
const obj = j
 name : 'kenji',
 town: 'shibuya'
}
const {name, town} = obj;
console.log(name) //"kenji"
console.log(town) //"shibuya"

// 問156
// var name = 'KenjiMorita'; のKとMだけをそれぞれ変数a,ｂに入れてください

// 分割代入では文字列もバラバラにできますよという話題
const name = 'KenjiMorita';
const [a,,,,,b] = name;

console.log(a,b)

// 問157
// 変数
// var a = 1;
// var b = 'goodby';
// のaを'goodby'、bを 1として出力されるようにしてください(変数のSwap)

// →分割代入を用いる
let a = 1
let b = 'goodby';
[b, a] = [a, b]
console.log(a,b)

// ※ let b = 'goodby' の後には ; が必須。そうしないと次の行の [b, a] = [a, b] までlet の範囲と思われてしまい、エラーになる

// 模範解答は↑に比べやや複雑（分割代入が存在しない時代のコーディング）。↑のやり方でよい
var a = 1
var b = 'goodby'
b = [a, a = b][0];
a //'goodby'
b //1

// 問158
// 上記(問157)と同じ事をECMAScript2015ライクに簡潔に記述してください

var a = 1;
var b = 'goodby';
[a,b] = [b, a]
["goodby", 1]

// 問159
// こちらconst input = [0,[1,2,3],4,5,[6]];を[0,1,2,3,4,5,6]となるようにしてください

// →入れ子を平にするには Array.prototype.flat() を使用する
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/flat
const input = [0,[1,2,3],4,5,[6]]
console.log(input.flat())

// 模範解答

//展開演算子(スプレッド演算子)
const input = [0,[1,2,3],4,5,[6]];
const inputB = [input[0],...input[1],input[2],input[3],...input[4]];
inputB //[0,1,2,3,4,5,6]

// 問160
// 下記のような
// 	<div id='outer'>
// 	  outer
// 	  <div id='inner'>inner</div>
// 	</div>
// に対してload時に#innerのtextを任意の文字列に変えるようにしください。なおwindow.onloadは使わないようにする。
 
document.addEventListener('DOMContentload',function(){
	var target = document.getElementById('inner');
	target.textContent('fafa');
},false)

//’load'はHTMLの全てのloadが終わったタイミングで発火。
//'DOMContentload'はDOM解析が終わってDOMに触れるようになったら発火。
//この場合'DOMContentload'を使用。画像が読み込まれる前に実行されて高速。だが画像幅に対してのレイアウト変更をするようであれば'load'
//[参照](http://qiita.com/gaogao_9/items/ec2b867d6941173fd0b1#_reference-1aa15cfa5c1cf1f77a86)

// 問161 このような
// addeventListener('DOMcontentLoad',function(){something},[true,false])
// イベントリスナーの第三引数のフラグは何か説明してください

// useCapture はイベントフェーズのうち、（バブリングフェーズや、デフォルトのターゲットフェーズではなく）キャプチャリングフェーズを使用するというもの
// こちらの記事がわかりやすい
// https://note.affi-sapo-sv.com/js-addeventlistener-usecapture.php

// 問162 このような
// 	<div class='classA'>
// 		<div>some1</div>
// 		<p><div>some2</div></p>
// 		<div>some3</div>
// 	</div>
// DOMがある。classAより子供のdiv要素のみ取得してください

// P.162/index.html に以下の回答を格納したhtml がある。ブラウザーで開いて確認できる。
const divs = document.querySelectorAll('.classA div')
console.log(divs)


// 模範解答は、querySelectorAll() がない時代のものになっている
// （バグがあったので修正しておいた）
//
// Function.prototype.call() を使用した
// Array.prototype.filter.call() は、配列ではないが、iterable な要素にfilter() を実施するときの書き方
// 今回は NodeList 型である classA[0].childNodes を指定している
var classA = document.getElementsByClassName('classA');
var result = Array.prototype.filter.call(classA[0].childNodes,function(classA){
 return classA.nodeName === 'DIV'
});
console.log(result) // 3つのdivが取得できている

// 問163 このような
// <div class="fafa"><span></span></div>
// <div class="fafa"><span></span></div>
// <div class="fafa"><span></span></div>
// <div class="fafa"><span></span></div>
// for文でNodeListを使うのを避けるため、 DOMのspanタグの分だけ取得してNodeListをArrayに変えてください。
//
// →全てのspanを配列にして、という意味
 
// P.163/index.html に以下の回答を格納したhtml がある。ブラウザーで開いて確認できる。
const s = document.querySelectorAll('span');
const s2 = [...s]					// シャローコピー＆配列に変換
console.log(s2)						// [span,span,span,span]
console.log(typeof s2)				// Oject
console.log(s2 instanceof Array)	// true

// 模範解答ではquerySelectorAll()の無い時代のものになっている
// シャローコピーすることでHTMLCollection から配列に変換している
// シャローコピーには slice() を用いている
var tag = document.getElementsByTagName('span');
var array = Array.prototype.slice.call(tag);
console.log(array instanceof Array );

// 問164
// このようなODMがある
// <div id="main">
//   <p class="content">
//     <a class="link" href="http://kenjimorita.jp">
//     1st Link
//   </a>
//     <p class="dummy"></p>
//     <p class="content">
//       <a href="http://example.com/">2link</a>
//     </p>
//     <p class="content">
//       <a href="http://example.com/">3link</a>
//     </p>
//     <a href="http://example.com/">5th</a>
// </div>
// XPathを使ってidがmainのdiv、classにcontentを含むp要素の3番目hrefがhttp://example.comから始まるa要素を辿り 「3link」を出力してください
// 
// →P164/index.html に回答を用意した
const elem = document.querySelector('.content:nth-child(4) a')
console.log(elem.innerText)
// 以下の２点を改善している
// →↑のHTMLは構造が少々壊れている(p の中にpを入れ子にできないのにそうしている）
// →業務ではXPath よりもCSSセレクタ―を使う方が多いので、querySelector() を使用して回答する

// XPath を使用した模範解答の引用は省略する

// 問165
// こちら
// <div id="target" class="foo-after" onClick="toggleStyle()">
//   click here!
// </div>
// clickをしたらclass名がfoo-beforeに変わるtoggleStyleを実装をしてください
//
// →P165/index.html に回答を用意した
function toggleStyle(){
	const elem = document.querySelector('.foo-after')
	elem.className = 'foo-before'
	console.log(elem)
}

// 模範解答
var target = document.getElementById('target');
target.onclick = function toggleStyle() {
  this.classList.toggle('foo-after');
  this.classList.toggle('foo-before');
}

// 問166 " fafa fafa eee "のような最初と最後に空白があるような文字列に対して、それらを含めない配列を返してください
// 
// String.prototype.trim() を使えば前後の空白を除去できる
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/trim
const str = " fafa fafa eee "
console.log(str.trim().split(" "))

// 問167 "abcdefg"のような文字列をインデックスと値が取れるオブジェクトに変更してください 期待する結果。 {0:a,1:b,2:c,3:d,4:e,5:f,6:g}
// 
const str = "abcdefg";
const arr = str.split('')
const obj = {}
arr.forEach((v,i) => obj[i] = v)
console.log(obj)	//  { '0': 'a', '1': 'b', '2': 'c', '3': 'd', '4': 'e', '5': 'f', '6': 'g' }

// →模範解答は間違い
const str = "abcdefg";
const obj = Object.prototype.valueOf.call(str)
console.log(obj) // [String: 'abcdefg']	←これにしかならないので間違い

// 問168 "abcdefg"のような文1文字づつの要素となる配列に変更してください 期待する結果 ["a", "b", "c", "d", "e", "f", "g"]

const str = "abcdefg";
const arr = str.split('')
console.log(arr)	// [ 'a', 'b', 'c', 'd', 'e', 'f', 'g' ]

// 模範解答
const str2 = "abcdefg";
const arry = Array.prototype.slice.call(str2);
arry //["a", "b", "c", "d", "e", "f", "g"]

// 問169 "apple banana orenge"のような文字列を空白で区切り、それそれの「単語」をObjectのkey値として取得できるようにしてください。 期待する結果。 {0: "apple", 1: "banana", 2: "orenge"}
 
// 模範解答
var string = "apple banana orenge";
var arrayed = string.split(" ");
var obj ={};
arrayed.forEach(function(elem,i){
     obj[i] = elem;
});
console.log(obj) //{0: "apple", 1: "banana", 2: "orenge"}


//Map を使用した例
var string = "apple banana orenge";
var arrayed = string.split(" ");
var map = new Map();
arrayed.forEach(function(elem,i){
     map.set(i,elem);
})
console.log(map) //{0: "apple", 1: "banana", 2: "orenge"}

//entriesを使用した例
var string = "apple banana orenge";
var arrayed = string.split(" ");
var newarray =[];
for(value of arrayed.entries()){
     newarray.push(value)
}
var map = new Map(newarray)
map //{0: "apple", 1: "banana", 2: "orenge"}

// 問170 add()を実行した際 3 、add(2)としたら 4 add(2,3)を実行したら 5 が返ってくる関数addを定義してください

// 模範解答
//デフォルトパラメータ
function add(a = 1, b = 2){
 return a + b;
}
console.log(add());// 3
console.log(add(2));//4
console.log(add(2,3))//5

// 問171
// こちらのような
// if(condition){
//     dosomething();
// }
// conditionがtrueの時に実行したい関数があった場合、端的に記述してください

// &&演算子は左側がtrueなら右側を評価する
// この性質を短絡評価という
// 論理演算子を読むこと
// https://ja.javascript.info/logical-operators#ref-660
condition && dosomething();

// 問172
// こちらは
// for (var i=0; i<5; i++) {
//     setTimeout(function(){
//         console.log(i);
//     }, 1000 * (i+1));
// }
// 1秒ごとに1からインクリメントされた値が出力されることを期待していますが、実際は5が5回出力されます。 理由を教えて下さい。

// →古いvar変数の動作を問う問題（varのスコープの問題で、最初のsetTimeout が実行されるときには i はすでに5になっているため）
// →let 変数を用いればこの問題はない
// var 変数は使わないので、let 変数の↓の例が理解できれば次の問題に移って良い
for (let i=0; i<5; i++) {
    setTimeout(function(){
        console.log(i+1);
    }, 1000 * (i+1));
}	// 1 2 3 4 5

// 模範解答はvarでなぜだめか、改善する方法を説明している（そして最後にlet変数を使う例が載っている）
// 模範解答の引用は省略する

// 問173
// 右の様な{name: 'hogehoge',age: 80}を別の変数「obj2」に代入したい。 Objectを参照渡しすると代入先の値が変わるとオリジンの値も変わります。
// originに影響のない新しいオブジェクトとしてオリジンと同じ値をもつインスタンスを生成してください。
// またorigin.name='oo'としても「obj2.nameが'hogehoge'」で変わらないことを確認してください
 
// →オブジェクトのコピーを行うときには、単に代入ではだめで、シャローコピーかディープコピーを使いますよという問題
const origin = {name: 'hogehoge',age: 80};
const o = {...origin}	// シャローコピー
origin.name='oo'
console.log(origin)		// { name: 'oo', age: 80 }
console.log(o)			//  { name: 'hogehoge', age: 80 }

// 模範解答（シャローコピーやディープコピーを行う方法にはいろいろあるので一例となっている）
//一例
var origin = {name: 'hogehoge',age: 80};
var obj2 = JSON.parse(JSON.stringify(origin));
obj2 //Object {name: "hogehoge", age: 80}
origin.name = "oo" //"oo"
obj2.name //"hogehoge"

// 問174
// こちらを使って、
// function getKey(k) {
//   return `a key named ${k}`;
// }
// オブジェクトobjのプロパティkeyから上記getKey関数に'enabled'文字列を渡してcallし、objのキーがa keynamed enabled、値がtrueになるようなobjの作りにしてくだささい
// 期待する結果: {id: 5, name: "San Francisco", a key named enabled: true}

// →オブジェクトリテラルのキーに式を使えるという問題↓のgood を参照すること
// なお、このキーに式が使える機能のことを Computed property names という
// https://jsprimer.net/basic/object/

// 模範解答
//
// bad
function getKey(k) {
  return `a key named ${k}`;
}
const obj = {
  id: 5,
  name: 'San Francisco',
};
obj[getKey('enabled')] = true;
console.log(obj)	// { id: 5, name: 'San Francisco', 'a key named enabled': true }
					// →ちゃんとできているのでなぜこれがbad かわからない

// good
const obj = {
  id: 5,
  name: 'San Francisco',
  [getKey('enabled')]: true,
};

// 問175
// 以下の様な
// const name = 'kenji morita';
// const address = 'shibuya';
// const obj = {
//  name : name,
//  morita: morita,		// この行は消し忘れ、この行が無いものとして回答すること
//  episodeTheree: 3,
//  mayTheForth: 4,
//  address: address,
// }
// objの宣言をショートハンドを使ってなおしてください

const name = 'kenji morita';
const address = 'shibuya';
const obj = {
 name,
 episodeTheree: 3,
 mayTheForth: 4,
 address,
}
console.log(obj) // {name: "kenji morita", episodeTheree: 3, mayTheForth: 4, address: "shibuya"}

// 問176
// →問題文が壊れている、次に行くこと

// 問177
// [[0, 1], [2, 3], [4,5]]
// をフラットにしてください 期待する値:[0, 1, 2, 3, 4, 5]

// →そのものずばりのArray.prototype.flat() を使えば一発
console.log([[0, 1], [2, 3], [4,5]].flat()) // [ 0, 1, 2, 3, 4, 5 ]

// 模範解答では Array.prototype.reduce() を用いた高度な回答となっている
let flat = {};
[[0, 1], [2, 3], [4,5]].reduce((pre, current, index, arry) => {
 let flatten = pre.concat(current);
 flat[index] = flatten;
 return flatten
})
flat //[0, 1, 2, 3, 4, 5]

//other
[...[0, 1], ...[2, 3], ...[4,5]] //[0, 1, 2, 3, 4, 5]

// 問178
// 下記の関数式としての宣言は
// // bad
// const foo = function () {
// };
// なぜ好ましくないとされているか答えてください

// 模範解答
//- コールスタックに識別しやすくされている	// 安村：？？？よくわかっていない
//- アロー関数が使える						// 安村：？？？アロー関数が使える事の何が問題かがわかっていない

// good
function foo() {
}

// 問179
// こちらの
// const currentUser = true
// if (currentUser) {
//   function test() {
//     console.log('Nope.');
//   }
// }
// は何が悪いか答えてください。また修正してください

// 模範解答
//A function declaration is not a statement
//関数宣言はステートメントではありません	// 安村：？？？なぜこれが悪いのか？

let test;
if (currentUser) {
  test = () => {
    console.log('Yup.');
  };
}
see http://www.ecma-international.org/publications/files/ECMA-ST/Ecma-262.pdf#page=97 // 閲覧できない

// 問180
// こちらの
// function concatenateAll() {
//   const args = Array.prototype.slice.call(arguments);
//   return args.join('');
// }
// 渡ってきたすべての引数を結合して文字列として返す上記を端的に書き換えてください

// 模範解答
function concatenateAll(...args) {
  return args.join('');
}

// 問181
// こちらはアンチパターンです。
// function f1(obj) {
//   obj.key = 1;
// };
// なぜだかお答えください

// 模範解答
//Why? Manipulating objects passed in as parameters can cause unwanted variable side effects in the original caller.
パラメータとして渡されたオブジェクトを操作すると、元の呼び出し側で不要な変数副作用を引き起こす可能性があります。

function f2(obj) {
	// Objのprototype に代入をしてしまわないように配慮するとより良い
	const key = Object.prototype.hasOwnProperty.call(obj, 'key') ? obj.key : 1;
};

https://github.com/airbnb/javascript

// 問182
// 下記のような
// const foo = a ? a : b;
// const bar = c ? true : false;
// const baz = c ? false : true;
// 不必要な3項演算子を避けて同じ意味を簡潔に書いてください

// 模範解答	// 安村：↓は確かに簡潔ではあるが、↑のほうがわかりやすくて良い
const foo = a || b;
const bar = !!c;
const baz = !c;

// 問183 #高度な話題
// こちらの記述
// const foo = {clark: 'kent'};
// spaceをeslintのobject-curly-spacing や jscsのrequireSpacesInsideObjectBracketsで良いとされている書き方に変更してください
 
// →ESLintと呼ばれるJavaScriptのソースコードの妥当性をチェックするプログラムにおいて、良いとされる書式に書き換えてくださいという話
// →ESLintについての質問であり、ESLintを使っていないと答えられない

// 模範解答
const foo = { clark: 'kent' };

// 問184
// 第一引数にaddress,第二引数にtyoume、第三引数にbanchをとりそれらの渡ってきた値をそれぞれ要素とする1つの配列として返すだけの関数createAddressに defaultPrameterとして第二引数に「address + -1」、第三引数に「tyoume + '-10'」として設定してください。
// 
// →問題分が分かりづらい、↓の模範解答を見て理解すること
function createAddress(address, tyoume = address +  '-1', banch = tyoume + '-10'){
 return [address, tyoume , banch];
}
console.log(createAddress('meguro')) //['meguro', 'meguro-1', 'meguro-1-10']

// 問185
// f()を実行すると6が返ってくる関数を実装してください。
// 但しfは引数にx,y,zを持ち、xはデフォルトで1、yは2で、zはObjectDestructuringとしてkeyとvalueにzにを持ちデフォルトでzの値は3とする

// 模範解答
function f([x, y] = [1,2], {z: z} = {z: 3}){
	return x + y + z;
}
console.log(f()) //6

// 問186
// こちらを使って
// 	var people = [
// 	{ name: "ken",
// 	  family: {
// 	   mother: "jone Smith"
// 	  },
// 	 age: 24
// 	},
// 	{ name: "jun",
// 	  family: {
// 	   mother: "jone jun"
// 	  },
// 	 age: 27
// 	}];
// 下記のような 。
// //Name ken, Mother: jone Smith
// //Name jun, Mother: jone jun
// 出力になるように実装してください。

const people = [
	{ name: "ken",
		family: {
			mother: "jone Smith"
		},
		age: 24
	},
	{ name: "jun",
		family: {
			mother: "jone jun"
		},
		age: 27
	}
];
for (let v of people){
	// これで十分わかりやすい
	console.log(`Name ${v.name}, Mother: ${v.family.mother}`);
}

// 模範解答（分割代入を酷使するとこんなことができる）
for (var {name: n, family: {mother : f}} of people){
	console.log("Name " + n + ", Mother: " + f);
}
//Name ken, Mother: jone Smith
//Name jun, Mother: jone jun

// 問187
// こちら
// var metadata = {
// 	title: 'Scratchpad',
// 	translations: [
// 		{
// 			locale: 'de',
// 			localization_tags: [],
// 			last_edit: '2016-07-18',
// 			url: 'kenjimorita.jp',
// 			title: 'JavaScript'
// 		}
// 	],
// 	url: 'kenjimorita.jp/JavaScript'
// };
// のtitleをenglishTitleとして、translationsの中のtitleをlocalTitleとしてそれぞれ変数に代入してconsole.log出力してください

// 模範解答
var metadata = {
	title: 'Scratchpad',
	translations: [
		{
			locale: 'de',
			localization_tags: [],
			last_edit: '2016-07-18',
			url: 'kenjimorita.jp',
			title: 'JavaScript'
		}
	],
	url: 'kenjimorita.jp/JavaScript'
};
var {title: englishTitle, translations: [{title: localeTitle}]} = metadata;
console.log(englishTitle, localeTitle);
	//'Scratchpad'
	//'JavaScript'

// 問188
// こちらの渡ってきたoptionの値をデフォルト設定している書き方
// function drawES5Chart(options) {
//   options = options === undefined ? {} : options;
//   var size = options.size === undefined ? 'big' : options.size;
//   var cords = options.cords === undefined ? { x: 0, y: 0 } : options.cords;
//   var radius = options.radius === undefined ? 25 : options.radius;
//   console.log(size, cords, radius);
// }
// drawES5Chart({
//   cords: { x: 18, y: 30 },
//   radius: 30
// });
// をECMAScript2015の書き方に修正してください

// 模範解答
function drawES6Chart({size = 'big', cords = { x: 0, y: 0 }, radius = 25} = {}) {
	console.log(size, cords, radius);
}
drawES6Chart({
	cords: { x: 18, y: 30 },
	radius: 30
});

// 問189 querySelectorAll('.child')やdocument.getElementsByTagName('div')で取得したNodeListからArrayにする場合の方法を4つ答えてください。
 
// 模範解答
//common
const nodeList = document.querySelectorAll('.child');
//1
Array.from(nodeList);
//2
Array.prototype.slice.call(nodeList);
//3
[...nodeList];
//4
Object.keys(nodeList).forEach(function(key){
  console.log(nodeList[key])//出力
})

// 問190 このようなfunction add (){console.log(this.x) };関数ある。新たに変数名objのプロパティとしてx、値5で定義した後、addが参照するthisがobjにbindするように呼び出してください。
 
// →add()内部のthis にobj を割り当てる方法を質問している
// →apply() やcall()、はたまたbind() （どちらでもよい）を使う
// https://jsprimer.net/basic/function-this/#call-apply-bind
// > Function（関数オブジェクト）にはcall、apply、bindといった明示的にthisを指定して関数を実行するメソッドが用意されています。
// > callメソッドとapplyメソッドの違いは、関数の引数への値の渡し方が異なるだけです。 
// > bindメソッドは名前のとおりthisの値を束縛（bind）した新しい関数を作成します。

// 模範解答
function add (){console.log(this.x) };
var obj = {x: 5};
add.apply(obj)			// 5
add.call(obj)			// 5
const b = add.bind(obj)
b()						// 5

// 問191 このようなfunction add (y, z){console.log(this.x, y + z ) };関数がある。この関数に{x:3}にbindさせて、yは5,zは6となるように実行してください。

// 模範解答
// 
//apply
function add (y, z){console.log(this.x, y + z ) };
add.apply({x: 3}, [5, 6])

//call
function add (y, z){console.log(this.x, y + z ) };
add.call({x: 3}, 5, 6)

// 問192
// 下のような記述がある。
// 	var int = 8;
// 	var module = {
// 		int: 4,
// 		fn : function(){return this.int;}
// 	}
// module.fnを別の変数にbindして呼び出し、4を出力してください。

// →質問の意味が分からない

var int = 8;
var module = {
 int: 4,
 fn : function(){return this.int;}
}
console.log(module.fn()) // 4
var fnn = module.fn
console.log(fnn()) // 8 (window.int が表示される)

//bindして呼び出し
var fnn = module.fn.bind(module)
console.log(fnn())	// 4
console.log(fnn.call(module))	// 4 bind を使わずにこうでもよい
//生成する関数にもともとのthis参照しているオブジェクトを束縛させる必要がある
// →関数だけ取り出してfnn に束縛した時点で this 参照が途切れるため、fnn() を実行するときには改めて this を明示する

// 問193 したのような記述がある
// function list (){
// 	return Array.prototype.slice.call(arguments);
// }
// list(2,3,4);
// このままだと返り値が[2,3,4]になるが、インデックス0番目はかならず数値1がsetされ、その後は呼び出し元の値が続く配列を返す関数にしてください。

function list(){
	return [1,...arguments]
}
console.log(list(2,3,4))	// [ 1, 2, 3, 4 ]

// 模範解答
function list (){
 return Array.prototype.slice.call(arguments);
}
var bindedList = list.bind(null, 1);	// bind で引数を先行して渡しておくことができる
console.log(bindedList(3,4,5)) //[1, 3, 4, 5]

// 問194 <ul id="list"></ul>がある。 document.createFragmentをつかってvar array = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"]; がliのtextContentとなるようなDOMを作成してください。

// 模範解答（不要なコードを削除してある）

var list = document.getElementById('list');
var fragment = document.createDocumentFragment();
var array = ["Internet Explorer", "Mozilla Firefox", "Safari", "Chrome", "Opera"];
array.forEach(function(elem){
    var li = document.createElement("li");
    li.textContent = elem;
    fragment.appendChild(li);
})
list.appendChild(fragment);

//全てのブラウザで利用可能
//返り値はDocumentFragmentへの参照。メモリ上に存在
//（フラグメントへのappendChild()は）DOMツリーに追加するのではないのでリフローが行われない
//（最後のlist.appendChild でDOMツリーに追加し、リフローが行われる）

問195 #正規表現
文字列の中で\nがあったら全てを<br>に置き換える正規表現を表してreplaceしてください

// 単純に \n だけを対象にするにはこう
const str = "hello\nworld"
console.log(str.replace(/\n/g, '<br>'))	// hello<br>world

// より一般的には、改行コードは以下の３種類
// 1. \r\n
// 1. \r
// 3. \n
// この３つを対象にするには以下のようにする
const str = "hello\r\nworld\rhello\njavascript!"
console.log(str.replace(/(\r\n|\r|\n)/g, '<br>')) // hello<br>world<br>hello<br>javascript!

// 模範解答
const str = "hello\r\nworld\rhello\njavascript!"
console.log(str.replace(/(?:\r\n|\r|\n)/g, '<br>')) // hello<br>world<br>hello<br>javascript!

// ?:
// > https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
// >	(?:x)	非キャプチャグループ: "x" に一致しますが、一致した内容は記憶しません。
// →今回は一致した内容は使われないため、記憶していてもしていなくてもよい. つまり ?: を使わなくともよい

// 問196 こちらを{g:3, h:4}それぞれg,hにわりあててください

// 模範解答
const {g,h} = {g:3, h:4};
console.log(g,h) //3, 4

// 問197 #ローカルストレージ
// ローカルストレージとセッションストレージの違いを教えてください.

// 模範解答
データの保存のされ方が違う
ローカルストレージ
- 同じオリジン間で共有されるストレージ。
- ブラウザに保存される
- localstrageは他のタブ間でもデータが共有される
- あるタブで保存されたデータは即座に違うタブで参照できる
- ページを更新して残っている

セッションストレージ
- ブラウジングコンテキスト(タブ)に保存される
- 異なるタブなら異なるsessionストレージ
- 同一タブ内なら保存は維持される

ストレージ内のデータは文字列
ストレージにオブジェクトは渡せない(JSONを使ってください)

// 問198 #ローカルストレージ
// ローカルストレージのkeyとしてfooを値を"fafa"と設定、取得、削除、全てをクリアーにしてください

// 模範解答
localStrage.foo = 'fafa';
localStrage.setItem('foo','fafa');
localStrage.getItem('foo');
localStorage.removeItem('foo')
localStorage.clear();
var key = localStorage.key(0)
console.log(key + 'のストレージは' + localStorage[key]);

// 問199
// 問題文なし、スキップ

// 問200
// 問題文なし、スキップ
