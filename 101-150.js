// 問101
// var string = '-9';を数値に変換してください

const string = '-9'
console.log(Number(string))

// 模範解答↓よりも↑の方が素直なやり方
string - 0
//-9

//別解
//+string
//-9

// 問102
// sliceとsubstringの違いを教えてください

// 模範解答
//
// 1. マイナスをサポートしているかどうか
var str = 'あいうえお'j
str.length
console.log(str.slice(0,-1)) // 'あいうえ' // -1は後ろから数える
var str = 'あいうえお';
console.log(str.substring(0, -1))	// ''
							//負の数字は0とみなす。
							//0から0を取得するので空文字を返す

// 2. sliceは開始位置が終了位置以上だと空文字を返す
var str = 'あいうえお';
console.log(str.slice(1,1)) // ''

//「い」を取得したい場合
var str = 'あいうえお';
console.log(str.slice(1,2))	// 'い'

//substringの場合
//開始位置が終了位置より大きいと交換されて解釈される
var str = 'あいうえお';
console.log(str.substring(1,-3))	// 'あ'
							//substring(-3,1)と解釈され負の数は0と見なされ
							//substring(0,1)と同等の処理をする

// 問103 #正規表現
// 次のような文字列abcdefgのcとeそれぞれを大文字にしてください

// 模範解答
var str = 'abcdefg';
var replaced = str.replace(/[ce]/g,function(str){
 return str.toUpperCase();
});
console.log(replaced)	// 'abCdEfg'

// 問104
// 次のような文字列をvar str = 'こんにちは'; var name = 'もりたさん'; 連結し'いい天気ですね'を付け足した新しい文字列を生成してください
// 期待する結果'こんにちはもりたさんいい天気ですね'

const str = 'こんにちはj
const name = 'もりたさん'
console.log( str + name + 'いい天気ですね')

console.log( `${str}${name}いい天気ですね`)

// 模範解答では String.prototype.concat() を使用し、concat() の特徴を説明している

連結してもstrは元の文字列のママなことを確認 str //こんにちは

var str = 'こんにちは';
var name = 'もりたさん';
var newstr = str.concat(name, 'いい天気ですね');
console.log(newstr)	//  'こんにちはもりたさんいい天気ですね'
console.log(str) //こんにちは

// String.concatのパフォーマンスについて
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/concat
// > concat() メソッドの代わりに 代入演算子 (+ または +=) を使用する事を強くお勧めします。 この性能試験によれば、代入演算子のほうが数倍高速です。

// 問105
// targetがnullかundefinedのときのみの判定がtrueになる条件式を書いてください

target == null

// 確認
null == null			// true
undefined == null		// true
0 == null				// false
true == null			// false
false == null			// false
"" == null				// false

// 問106
// こちら
// 	var value = 0;
// 	var target = value || 10
// 	target //10
// はvalueが0の時falseになり10が返る。
// 0の際も代入されるようにしてください

const value = 0;
const target = value == 0 ? value : value || 10
console.log(target)	// 0

// 模範解答↓のほうがわかりやすい
var value = 0;
var target = (value !== undefined) ? value : 10;
console.log(value) //0

// 問107
// 配列arrayが空ならfalseが返るようにしてください

var array = [];
array.length !== 0 //false

// 問108 こちらは自身のプロパティが定義されていない場合falseが返ることを期待しているがtrueが返る
// 	var obj = {};
// 	obj ? true : false;
// 自身のプロパティを持っていない場合falseが返るようにしてください

var obj = {};
Object.keys(obj).length != 0 ? true : false; //false

// 問109
// forでループさせるのとforEachで処理する際の違いを教えてください

// 答え：途中でreturn やbreak ができるかどうか
//forは return や break が使える
for(let i =0;i<100;i++){
	console.log(i)
	return;
}	// 0
for(let i =0;i<100;i++){
	console.log(i)
	break;
}	// 0

//forEachはreturnは無視され、breakは文法エラー
const a = [1,2,3]
a.forEach(i => {
	console.log(i)
	return i
})	// 1 2 3

a.forEach(i => {
	console.log(i)
	break				// 文法エラー
})

// ちなみに、配列のどれか一つが条件を満たす評価をしたい場合Array.someがある
function isBigEnough(element, index, array) {
  return (element >= 10);
}
var passed = [2, 5, 8, 1, 4].some(isBigEnough); // passed は false
passed = [12, 5, 8, 1, 4].some(isBigEnough); // passed は true

// 問110
// このconst arry = ['a','b','c']; の列挙可能なプロパティと不可能なプロパティを出力してください
// 
// 期待する結果 ['0','1','2','length']

答え
const arr = ['a','b','c'];
console.log(Object.getOwnPropertyNames(arr)); //['0','1','2','length']

// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/getOwnPropertyNames
// > 与えられたオブジェクトで発見されたすべての直接のプロパティを含む配列を (シンボルを使用したものを除き、列挙不可能なプロパティを含んで) 返します。
// →この記事の中で、Object.keys との違いが説明されています。実際に使用するときはObject.keys との違いを検討してください

// 問111 #高度な話題
// オブジェクトoに対してaという値が'morita'、列挙可能、削除可能、書き換え可能（代入可能）なプロパティを作成してください
// 
let o = {};
Object.definedProperty(o,'a',{
  value: 'morita',
  enumerable: true,
  writable: true,
  configurable: true,
});
// value, enumerable, writable, configurable については↓
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Object/defineProperty

// 問112
// 下のlib/math.jsに入っている1と2を別のファイルで使えるようにして 受け取る方app.jsも記述してください

//lib/math.js
//1
function sum(x, y) {
  return x + y;
}
//2
var pi = 3.141593;

→Q112/ フォルダーに回答を格納した

// 問113
// ['morita','kenji','fafafa']の要素 'fafafa'のインデックスを返してください。
// 期待する値 2

['morita','kenji','fafafa'].findIndex(x => x == 'fafafa') //2

// 問114
// 配列['A','B','C']を配列の0番目のインデックス値になるようにしてください
// 期待される結果 [['A'],['B'],['C']]

// →模範解答はbestの解のほうがわかりやすく感じる

//better
// Array.of は値から配列を作る
['A','B','C'].map(x => Array.of(x));

//best
['A','B','C'].map(x => [x])

// 問115
// 配列['a', 'b', 'c']のインデックス1番だけを文字列'kenji'に変えてください

let a = ['a', 'b', 'c']
a.splice(0,1,'kenji')
console.log(a)

// 模範解答
// Array.prototype.fill() を使用している
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Array/fill
['a', 'b', 'c'].fill('kenji', 1, 2); //['a','kenji','c']

// 問116
// 配列 [6, -5, 8]を0未満の要素だけ出力してください

const a = [6, -5, 8, -1] // 配列に複数の0未満の値を含むように-1を追加した
console.log(a.filter(i => i < 0))	// [ -5, -1 ]

// 模範解答では Array.prototype.find() を使用している
const i = [6, -5, 8, -1].find(x=> x < 0);
console.log(i)	// -5
				// この場合、最初に該当した-5 にしか反応しないので、
				// 模範解答よりも filter() を使用した最初の例がいいと思う

// 問117
// gen.next().valueを実行すると値が1づつ返ってくるようなGenerator関数を作り、1,2,3と出力してください
// 
// ジェネレータのおさらい
// https://ja.javascript.info/generators

function* genGenerator(){
	yield 1
	yield 2
	yield 3
}

const gen = genGenerator()
console.log(gen.next().value)	// 1
console.log(gen.next().value)	// 2
console.log(gen.next().value)	// 3
console.log(gen.next().value)	// undefined

// 模範解答
function* idMaker(){
    var index = 0;
    while(true)
        yield index++;
}

var gen = idMaker();

console.log(gen.next().value); // 0
console.log(gen.next().value); // 1
console.log(gen.next().value); // 2

// 問118
// ラッパーオブジェクトとは何ですか？教えてください。
// 解答は理解していてある程度どういうものか答えられればいいものとします

//回答例

//trueなどのプリミティブ値のプロパティにアクセスするとjavascirptはプリミティブ値に対応するコンストラクタからラッパーオブジェクトを作り、そのラッパーオブジェクトのプロパティやメソッドにアクセスできるようになる。
//(「プリミティブ値をオブジェクトのように」あつかうことができる。)
//作られたラッパーオブジェクトはオブジェクトへのアクセスが終わると破棄されて元のプリミティブ値に戻します。
例えば下記は文字列オブジェクトから文字列を生成しています。
var string = new String('foo');
string.length;//3 オブジェクトがもつプロパティにアクセスできます。
var string = 'foo'//プリミティブ値として代入
string.length //3 文字列プリミティブをオブジェクトとしてアクセス。同じ3を出力していますが内部的に一時的にラッパーオブジェクトを呼び、オブジェクトにアクセス。その後破棄しています

よく「javascriptは全てがObjectである」と言われるのはこのため

//プリミティブ値・・・文字列,数値,真偽値などtypeofの評価でObjectを返さないそれら

// 問119
// nullとundefinedの違いを教えてください

//nullはプロパティは設定しているものの、値の初期値としてなんらかの理由で値が入っていないことを明示する際にnullを入れる。変数やプロパティにがその時点で利用不可能にするためにnullを明示的に入れる

//undefinedは変数はあるものの、まだその値がないことを示す

問120
変数fafaの値がnullかどうかを確認してください

var fafa = null;
console.log(typeof fafa)		// typeof ではObjectと返ってくるから typeofは使えない
console.log(fafa == undefined)	// 等値演算子==ではtrueになってしまう
console.log(fafa === null);		//true //同値演算子===を使う

// 問121
// プリミティブ型と参照型の同値比較の違いを教えてください。

//プリミティブ型の同値比較は文字通り同じ値かどうかが評価される。

//参照型同士の同値比較は同じオブジェクトを参照しているかどうかが評価される。オブジェクトの代入は参照先の代入であることが理解できればok(参照渡し)

// 問122
// div要素を10個作ってidがparentの子要素として追加してください
//
// →つまり、これの中に
//
// <div id="parent">
// </div>
//
// divを10個入れる
//
// <div id="parent">
//     <div></div>
//     <div></div>
//     ...(10個連続)
// </div>

var parent = document.getElementById('parent');
for(var i = 0; i < 10; i++){
  var child = document.createElement('div');
  parent.appendChild(child);;
}

// より良い回答
// フラグメントを使用したほうが高速
// https://developer.mozilla.org/ja/docs/Web/API/Document/createDocumentFragment
var fragment = document.createDocumentFragment();
for(var i = 0; i < 10; i++){
  var child = document.createElement('div');
  fragment.appendChild(child);
}
document.getElementById('parent').appendChild(fragment);

// 問123 #高度な話題(XHTMLは基本使用しないのでこの話題は飛ばして良い）
// XHTMLにscriptタグで記述する際のCDATAタグをどのように書くか教えてください。またもしそれを書かない場合の実体参照、 > と < をどのように書くか教えてください。また、&と'、'はそれぞれエスケープ文字でどのように書きますか？

問124
実体参照に直すscriptを書いてください

→<, > の２文字を実態参照に置換することを考える
< ... &lt;
> ... &gt;
にそれぞれ置き換える

// 1. String.prototype.replaceAll() を使用する
let str = "<h2>hello</h2>"
str = str.replaceAll('<','&lt;')
console.log(str)	// &lt;h2>hello&lt;/h2>
str = str.replaceAll('>','&gt;')
console.log(str)	// &lt;h2&gt;hello&lt;/h2&gt;

// 2. String.prototype.replace() と正規表現を使用する
let str = "<h2>hello</h2>"
str = str.replace(/</g,'&lt;')
console.log(str)	// &lt;h2>hello&lt;/h2>
str = str.replace(/>/g,'&gt;')
console.log(str)	// &lt;h2&gt;hello&lt;/h2&gt;

問125 #正規表現
次の文章中の
 My name is Taro Suzuki and I am a researcher at ABC.
小文字のaで始まる英単語にのみマッチする正規表現を書いてください。1文字の場合もマッチの対象で

// 正規表現構文早見表
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
// \w ... アンダースコアを含むあらゆる半角英数字（基本ラテンアルファベット）に一致します。
// \b ... 単語の区切りに一致します。
const str7 = 'My name is Taro Suzuki and I am a researcher at ABC.';
const regex = /\ba\w*\b/g
console.log(str7.match(regex))	// [ 'and', 'am', 'a', 'at' ]

// もし、大文字'A' も対象にするなら大文字小文字の区別を無視する i フラグを追加する
const regex = /\ba\w*\b/gi
console.log(str7.match(regex))	// [ 'and', 'am', 'a', 'at', 'ABC' ]

// 模範解答
const str7 = 'My name is Taro Suzuki and I am a researcher at ABC.';
//str.match(/\ba.*\b/); これだと大文字と次の単語にmatchしてしまう
console.log(str7.match(/\ba\w*\b/g)); //['and','am','a','at']
//\sa\w*\sだと\sは文字の先頭や末尾にはマッチしないので、文章の先頭や末尾にある英単語が対象から外れてしまうことに注意してください。

// 問126 #正規表現
// <p>や<img src="fafafa">などタグにマッチする正規表現を作ってください。またタグ名だけを抜き取ったものも教えてください。
// 期待する値"" ※</ではじまる閉じタグは除外


// 模範解答
タグ名のみ p や img ※ いろいろあると思うので答えは一例とさせていただきます
const str3 = '<img src="fafa.com">'
const str4 = '<p>'
const reg2 = /<(\S+)(\s+.+)?>/;//キャプチャあり
const reg3 = /<(?:\S+)(?:\s+.+)?>/;//キャプチャさせない
const re2 = str3.match(reg2);
console.log(re2); //['<img src="fafa.com">','img','src="fafa.com"']
console.log(re2[0]); //<img src="fafa.com">

const re3 = str3.match(reg3);
console.log(re3); //['<img src="fafa.com">']
console.log(re3[0]); //<img src="fafa.com">

const re4 = str4.match(reg2);
console.log(re4); //['<p>','p',null]
console.log(re4[0]); //<p>

// 問127 #正規表現
// 下のこちらを使い
// var myRe=/ken*/g; var str2 = 'fafakenfafkenji';
// 文字列の中のkenだけをexecメソッドを使いマッチした文字を全て出力、マッチした文字列の後のインデックスを同時に出力してください

// →この問題は RegExp.prototype.exec() の返り値を表示せよというもの
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/RegExp/exec

const myRe = /ken*/g;
const str2 = 'fafakenfafkenji';
let array;
while ((array = myRe.exec(str2)) !== null) {
	console.log( array[0] + ' を見つけました。' + '次のマッチは ' + myRe.lastIndex + ' からです。')
}

// 問128 #正規表現
// 次のconst string3 = 'washable reasonable accessible assemble answerable';
// こちらの文字列, 「able」で終わる英単語の前の部分([able]を除いた部分)にマッチする正規表現を書きなさい。
// 期待する結果 ['wash','reason','answer']

const string3 = 'washable reasonable accessible assemble answerable';
const reg5 = /\w+(?=able)/g;	// 模範回答から \b を削ったもの、これでもいい
console.log(string3.match(reg5)); //['wash','reason','answer']

// ?= について
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
// > x(?=y)
// > 先読みアサーション: "x" の後に "y" が続く場合のみ "x" に一致します。例えば、/Jack(?=Sprat)/ は "Jack" の後に "Sprat" が続く場合のみ一致します。
// > Jack(?=Sprat|Frost)/ は "Jack" の後に "Sprat" または "Frost" が続く場合のみ一致します。しかし、"Sprat" も "Frost" も一致した結果には含まれません。


// 問129
// こちらの文字列
// const nen1 = 'ケンジは昭和55年生まれの35歳であり、ケンジの母は昭和22年生まれの64歳である'
// を使い、後ろに「年」および数字以外の文字が続く1桁以上の数字にマッチする正規表現を書いてください
// 期待する結果
// ['35','64']	// （35歳と64歳だけを拾えば良い）
const nen1 = 'ケンジは昭和55年生まれの35歳であり、ケンジの母は昭和22年生まれの64歳である'
const reg6 = /\d+(?![年\d])/g;
console.log(nen1.match(reg6)); //['35','64']

// ?! について
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
// > x(?!y)
// > 否定先読みアサーション: "x" の後に "y" が続いていない場合のみ "x" に一致します。
// > 例えば、 /\d+(?!\.)/ は数字の後に小数点が続かない場合のみ一致します。
// > /\d+(?!\.)/.exec('3.141')は "141" には一致しますが、 "3" には一致しません。

//see:正規表現書き方ドリル(技術評論社)
//※ 一番最初に見つけたマッチだけが欲しい場合、execの方がいいかもしれません
//see: https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/String/match

// 問130 #正規表現
// 下のような文字列const str222 = 'わたしの名前は「もりた」です。あだなは「もりけん」です'; のカギ括弧内とその文字列にマッチするような正規表現を書いてください
// ['「もりた」','「もりけん」']

const str = 'わたしの名前は「もりた」です。あだなは「もりけん」です';
const re = /「(.+?)」/ig;
const result = str.match(re);
console.log(result); //['「もりた」','「もりけん」']

// +のあとに? をつけると貪欲でなくなる（最小一致）
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Guide/Regular_expressions/Cheatsheet
// > x? の ? について
// > *、+、?、{} といった数量詞の直後に使用した場合、既定とは逆に、その数量詞を非貪欲（出現回数が最小のものに一致）とします。
// 既定は貪欲（出現回数が最大のものに一致）です。

// 問131 #正規表現
// 上記の文字列を使ってexecメソッドを使い文字列とし2つともconsole に出力してください
// 期待する結果 //「もりた」「もりけん」

const str222 = 'わたしの名前は「もりた」です。あだなは「もりけん」です';
const re222 = /「(.+?)」/ig;
let result;
while ((result = re222.exec(str222)) !== null){
  console.log(result[0])
}

// 問132 #正規表現
// 下記の文字列の「客」という文字の部分ともうひとつある同じ文字である場合のみマッチする正規表現を作成してください
// 	○あの客はよく柿食う客だ
// 	×あの客はよく柿食う人だ
// 	○あの友達はよく柿食う友達だ
// 	×あの親友はよく柿食う友達だ

//解答例
const str5 = 'あの客はよく柿食う客だ';
const res5 =str5.match(/あの(.+)はよく柿食う\1だ/);
console.log(res5[0]); //あの客はよく柿食う客だ

// \1 とは、その前にある() でマッチした文字列になる

// 問133 #正規表現
// 次のタグ
// // <1><2>kenjimorita.jp</3></4>
// の1と4、2と3が同じ場合にtrue、違う場合はfalseを返す正規表現を書いてそれぞれ出力し確認してください

const tag = '<div><h1>kenjimorita.jp</h1></div>';
console.log(/<(\w+)><(\w+)>kenjimorita.jp<\/\2><\/\1>/.test(tag)) //true

const tag2 = '<div><h1>kenjimorita.jp</h1></div>';
console.log(/<(\w+)><(\w+)>kenjimorita.jp<\/\2><\/\1>/.test(tag2)) //false

// 問134
// こちらの
// [2, 3,-1, -6, 0, -108, 42, 10].sort();
// sortは正しくsortされない。
// コンパレータ関数を渡して正しい順序として出力してください。

まず正しくsortされないというのを観察する
console.log([2, 3,-1, -6, 0, -108, 42, 10].sort())	//  [ -1, -108, -6,  0, 10,    2,  3, 42 ]
													// → マイナス値がだめだね


[2, 3,-1, -6, 0, -108, 42, 10].sort(function(x, y){
	if(x < y) return -1;
	if(y < x) return 1;
	return 0;
}); //[-108, -6, -1, 0, 2, 3, 10, 42]

// 問135
// 
// →問題文がない、この問題は無視でOK

var i = document.getElementById();
i.parentNode.tagName

nodeType[1] = ElementNode;
nodeType[2] = AttributeNode;
nodeType[3] = TextNode;
i.childNodes; //子要素を返す
i.firstChild //最初の子要素


// 問136
// 下のような
// 	<div id='top' align='center'>
// 	  <div id='nested'>
// 		<div><p><a></a></p></div>
// 	  </div>
// 	</div>
// DOMがある。#nested 要素を削除してください

var i = document.getElementById('top');
var f = document.getElementById('nested');
i.removeChild(f);

// https://developer.mozilla.org/ja/docs/Web/API/Node/removeChild

// 問137
// nestedの親要素が不明の場合の時nestedを削除してください

var node = document.getElementById('nested');
if (node.parentNode) {
  node.parentNode.removeChild(node);
}

// 問138
// id=topの子要素全て削除してください

var element = document.getElementById('top');

while (element.firstChild) {
    element.removeChild(element.firstChild);
}

// 問139
// 下のfooオブジェクトが自身のプロパティとしてbarを持っていないことを示してください
// 
// // Object.prototype汚染
// Object.prototype.bar = 1;
// var foo = {goo: undefined};
// 
// foo.bar; // 1
// 'bar' in foo; // true

答え
Object.prototype.bar = 1;
var foo = {goo: undefined};
console.log(foo.hasOwnProperty('bar')) // false
console.log(foo.hasOwnProperty('goo')) // true

// ES2022 から、hasOwnProperty() の代わりに Object.hasOwn() が追加され推奨されるようになりました
// https://ics.media/entry/220610/#object.hasown()%E3%83%A1%E3%82%BD%E3%83%83%E3%83%89
console.log(Object.hasOwn(foo,'bar')) // false
console.log(Object.hasOwn(foo,'goo')) // true

// 問140
// こちらのfor inループでも汚染された継承されたプロパティ（bar）も列挙される
// 
// →これは問題ではなく、読み物になっています

// Object.prototype汚染
Object.prototype.bar = 1;

var foo = {moo: 2};
for(var i in foo) {
	console.log(i); // barとmooが両方とも表示される
}

// これを防ぐには問139 の知識を使う

//good
// 継承されているfoo
for(var i in foo) {
    if (foo.hasOwnProperty(i)) {
        console.log(i);
    }
}

問141 #高度な話題
new Mapとnew WeakMapの違いを教えていください

// http://uhyohyo.net/javascript/16_1.html ←大変よい記事なので読むと良い
// > Map やオブジェクトはキーに文字列かシンボルしか使えない
// > WeakMap を使うとオブジェクトをキーにできる
// > ```
// > var wm = new WeakMap();
// > //キーにはオブジェクトを使用する
// > var key1={};
// > wm.set(key1, 100); //key1に100を関連付ける
// > console.log(wm.get(key1));  //100が表示される
// > ```
// > なお、WeakMapでkeyにできるのはオブジェクトのみです。プリミティブをkeyにしようとするとエラーになります。
// > いったい何が弱くてWeakMapなのかというと、実は参照が弱いのです。
// > WeakMap内部にまだオブジェクトへの参照が存在していても、他のところに全くない場合はガベージコレクションの対象になります。
// > 言い方を変えると、WeakMap内部からオブジェクトへの参照はガベージコレクションを妨げないのです。このような参照を弱い参照といいます。
// > ちなみに、Weakではない普通のMapは後々紹介しますが、これはWeakMapとは異なり参照は弱くありません。つまり、同じ状況になった場合でもMap内部にオブジェクトへの参照が残っている限りガベージコレクションの対象とはなりません。これは、Mapが「キーとなっているオブジェクトの一覧」を返すメソッドなどを持っているため、Map内部にしかオブジェクトへの参照が無くなってもそれを外部から取得する手段があるからです。
// > 逆に言えば、参照を弱くするという目的のためにこれらのメソッドをMapから削ったのがWeakMapであるということです。

// 問142
// [0,0,0]の配列をインデックス1と2を（つまり、インデックス1以降を)7にした配列にしてください expect : [0, 7, 7]

var ary = [0,0,0];
console.log(ary.fill(7,1)) //[0, 7, 7]

// 問143
// このような
// <style>
// h3:after {
//   content:'hello';
// }
// </style>
// スタイル定義されている h3:after(擬似要素)のcontentプロパティにアクセスしてください

// Window.getComputedStyle() を使用する
// ↓「疑似要素の使用」を読むこと
// https://developer.mozilla.org/ja/docs/Web/API/Window/getComputedStyle#%E6%93%AC%E4%BC%BC%E8%A6%81%E7%B4%A0%E3%81%AE%E4%BD%BF%E7%94%A8

var h3 = document.querySelector('h3');
var result = getComputedStyle(h3, ':after').content;
console.log(result)	// 'hello'

// 問144
// 少なくとも400pxあるビューポートに対してスタイルを制御したい際のif文を書いてください

// JavaScriptからメディアクエリーの機能を使うには Window.matchMedia() を使用する
// https://developer.mozilla.org/ja/docs/Web/API/Window/matchMedia

if(window.matchMedia('(min-width:400)').matches){
	/* 少なくとも400ピクセル幅のあるビューポート */
}else {
	/* 400ピクセル幅に満たないビューポート       */
}

// 問145
// こちらのvar numObj = 12345.6789; を小数点以下を丸めてください
// 期待する結果 //12346

// 幾通りかの丸め方をしてみる
var numObj = 12345.6789;
console.log(Math.floor(numObj))	// 12345 （切り捨て）
console.log(Math.ceil(numObj))	// 12346 （切り上げ）
console.log(Math.round(numObj))	// 12346 （四捨五入）
console.log(numObj.toFixed())	// 12346 （四捨五入を行う別の方法）

// 問146 #古い話題
// こちらの
// var thing = 'global';
// function foo(){
//   console.log(thing);
//   if(true){
//     var thing = 'local';
//     console.log(thing);
//   }
// }
// foo();
// のconsole.logはそれぞれ何を出力するか答えなさい。またそうなる理由を説明してください

var thing = 'global';
function foo(){
  console.log(thing);
  if(true){
    var thing = 'local';
    console.log(thing);
  }
}
foo();
//undefined
//local

//この記述をすると関数内宣言内での変数宣言は巻き上げられてjavascriptは下のように解釈をするから
var thing = 'global';
function foo(){
  var thing;//巻き上げ
  console.log(thing);
  if(true){
    thing = 'local';
    console.log(thing);
  }
}
foo();

// 問147 #古い話題 を知っていないとわからない問題→以下のソースコードでconsole.log()が出力する値を理解できればよし
// 先程のfoo()を実行した際に期待する値が出力されるようにしてください

const thing = 'global';
function foo(){
  console.log(thing);
  if(true){
    const thing = 'local';
    console.log(thing);
  }
}
foo();

// 問148
// 全てのdiv要素をnodeListとして取得し、Arrayのメソッドで「配列の様なオブジェクト」から配列に変換してください

// →模範解答は難しいことをやっている、もっと簡単な方法がある

// 1. Array.from() を使用する
const likeArray = document.querySelectorAll('div');
const array = Array.from(likeArray)

// 2. スプレッド演算子を使用する
const likeArray = document.querySelectorAll('div');
const array = [...likeArray]

// 模範解答（こんな複雑なやり方をしなくていい）
const likeArray = document.querySelector('div');	// ここはquerySelectorAll() の間違い
const turnArrayFun = function(obj){
    return [].map.call(obj, function(obj){
          return obj;
    })
}
const array = turnArrayFun(likeArray);
console.log(array)

// 問149
// 下記のようなDOMがある
// 	<div id="target">
// 	  (1)
// 	  <span>既存の内容</span>
// 	</div>
// この「既存の内容」より前(1)に<p>子要素</p>を挿入してください。
// 但しdocument.writeやinnerHTMLは使わないものとする。

// insertAdjacentHTML() を使う
// (adjacentとは隣という意味）
// https://developer.mozilla.org/ja/docs/Web/API/Element/insertAdjacentHTML

var target = document.querySelector('div#target');
var html = '<p>子要素</p>';
target.insertAdjacentHTML('afterbegin',html);

// 問150 こちら
// 	(1)
// 	<div id="target">
// 	  <span>既存の内容</span>
// 	  (2)
// 	</div>
// 	(3)
// 上記問題と同じDOM構造でそれぞれtargetより前に挿入(1)、「既存の内容より弟」位置に挿入(2)、targetより後に挿入(3)する記述をしてください
//
// →問149と同様 insertAdjacentHTML() を使う問題
// →Q150/index.html をブラウザーで開いて見てください

Q150/index.htmlより:
	const target = document.querySelector('div#target')
	const html = '<p>子要素</p>'
	target.insertAdjacentHTML('beforebegin',html)	// (1)の場所に挿入
	target.insertAdjacentHTML('beforeend',html)		// (2)の場所に挿入
	target.insertAdjacentHTML('afterend',html)		// (2)の場所に挿入
