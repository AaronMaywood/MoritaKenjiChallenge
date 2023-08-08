// 問201 #ローカルストレージ
// ローカルストレージの値を存在するだけ列挙してください

// 模範解答
for (var i = 0; i < localStorage.length; i++){
  console.log(localStorage.key(i))
}

// 問202 #ローカルストレージ
// ローカルストレージに次のようなオブジェクト
// 	const dataObj = {
// 	 'id': 0010,
// 	 'isFavorite': true
// 	}
// を保存して、取り出してください。

// 模範解答
// →ローカルストレージにはオブジェクトをそのまま格納できないのでJSONを使用して文字列化（シリアライズ）して格納している

//set
const dataObj = {
    'id' : 0010,
    'isFavorite' : true
}
if (!window.localStorage) {return false};
//safariのプライベートモードでWebStorageが使えない対応
try {
    localStorage.setItem('dataObj', JSON.stringify(dataObj));
} catch(e){
    console.log(e)
}

//get
const getData = JSON.parse(localStorage.getItem('dataObj'));

// 問203 #高度な話題
// こちらのsetTimeoutは実行されない。
// 	function CreateId(id){
// 		this.id = id;
// 	}
// 	CreateId.prototype.get = function(){
// 		console.log(this.id);
// 	}
// 	var create = new CreateId(10);
// 	create.get()//10
// 	setTimeout(create.get, 1000);
// 修正してください

// 模範解答
// →this の扱いの問題

//setTimeoutはthisがwindow設定なのでうまくいかない
//オブジェクトのメソッドはオブジェクトに束縛されているものではなく、その時々の実行コンテキスト(呼び出し部分)において実行される
//Fix

//1 bind
setTimeout(create.get.bind(create), 1000);

//2 Arrow Function
setTimeout(()=> {create.get()}, 1000);	// 動作するように修正
										// アロー関数だから動作するのではなく、
										// アロー関数のbody で普通に create.get()
										// を呼び出しているから動作する
										// したがって、アロー関数を普通の関数に書き換えても動作する
										// setTimeout(function(){create.get()},1000)

// 問204 こちらの
// 	function Person() {
// 		var self = this;
// 		self.age = 0;
// 
// 		setInterval(function() {
// 			// コールバックは変数self を参照し、
// 			// その値は期待されるオブジェクトである
// 			self.age++;
// 		}, 1000);
// 	}
// 	var p = new Person();
// 	p //{age: 1} //1秒ごとに1足される
// setInterval内のコールバックをアロー関数で記述してください

// 模範解答
function Person() {
    this.age = 0;

    setInterval(() => {
        this.age++; // `this` プロパティはオブジェクトPersonを参照している
					// アロー関数は this を追加で束縛しないので、
					// オリジナルのthis を参照し続ける
					// （わざわざselfを作る必要がない）
    }, 1000);
}
var p = new Person();

// 問205
// こちら
// 	function foo(a, b, c, d){
// 		console.log([a, b, c, d]) //or console.log(arguments);
// 	}
// 	foo(1,2,3,4,5) //[1, 2, 3, 4]
// のような記述ではなく、RestOperatorを使って渡した実引数を要素にする1つの配列で出力してください。

// 模範解答
function foo(...args) {
    console.log(args);
}
foo(1, 2, 3, 4, 5); // [1, 2, 3, 4, 5]

// 問206 #高度な話題
// こちらはSomeClassコンストラクタにインスタンスメソッドをもたせています。
// 	SomeClass.prototype.someMethod = function (arg1, arg2) {
// 		···
// 	};
// 	SomeClass.prototype.anotherMethod = function () {
// 		···
// 	};
// こちらとは違う方法(Object.assignを使った方法)でインスタンスメソッドを定義してください

// 模範解答
// →SomeClass.prototype をコピー先にし、someMethod()とanotherMethod()を足すにはこう書く
Object.assign(SomeClass.prototype, {
    someMethod(arg1, arg2) {
        ···
    },
    anotherMethod() {
        ···
    }
});

// 問207 #高度な話題
// こちらは値を割り当てられません。
//		const proto = Object.defineProperty({}, 'prop', {
// 		    writable: false,
// 		    configurable: true,
// 		    value: 123,
// 		});
// 		const obj = Object.create(proto);
// 		obj.prop = 456;	// TypeError: Cannot assign to read-only property
// 		obj.prop		//123
// valueを書き換えてください

// 模範解答
// →writable:false なプロパティprop に値を格納するために、新たにdefineProperty しなおしている。この方法なら変更できる。
const proto = Object.defineProperty({}, 'prop', {
    writable: false,
    configurable: true,
    value: 123,
});
const obj = Object.create(proto);
Object.defineProperty(obj, 'prop', {value: 456});
console.log(obj.prop); // 456

// 問208
// 下のようなlocation.searchの返り値を想定した文字列がある。
// '?id=12345&category=script&isname=true’
// こちらのkeyとvalueをオブジェクトにそれぞれ割り当ててください。
// 期待する結果 {id: "12345", category: "script", isname: "true"}

// →location.searchの返り値であるということは忘れて、単に文字列を分解できればよい

// 模範解答
var locationsearch = '?id=12345&category=script&isname=true';
var result = {};
locationsearch.substring(1).split("&").forEach(function(ele, i){
	var key =  ele.split("=");
	result[key[0]] = decodeURIComponent(key[1]);
})
console.log(result)	// { id: '12345', category: 'script', isname: 'true' }

// 問209
// このような[1,1,'a','a']配列がある。 重複している要素をぬいた配列にしてください。
// 期待する結果 [1,'a']

// 模範解答

var deduped = [1,1,'a','a'].filter(function(x, i, arr){
	// 初出の要素だけを収集
	// それぞれの要素のインデックス番号i の位置に検索文字x が含まれているときは初出だと判断できる（なかなか技巧的な技）
	return arr.indexOf(x) === i;
})
deduped //[1,'a']

問210 このような
<div id="box"></div>
DOMの中に2016年8月27日00時00分00秒から9月11日00時00分00秒までセール中が表示されるようにしてください。

// 模範解答

const today = new Date();
const myD   = today.getTime();
const start = new Date(2016,7,27,0,0,0);//設定月 -1
const myS   = start.getTime();
const end   = new Date(2016,8,11,0,0,0);//設定月 -1
const myE   = end.getTime();

const campaignDOM = document.querySelector('#box');
myS <= myD && myE >= myD && campaignDOM.innerHTML += '<span>セール中</span>';

// 問211
// こちら[[1,2],[],[3]]をフラットにしてください 期待する結果 //[1, 2, 3]

const myArray = [[1,2],[],[3]];
console.log(myArray.flat())	// [1,2,3]

// 模範解答

const myArray = [[1,2],[],[3]];
const flatArray = Array.prototype.concat.apply([],myArray);
flatArray //[1, 2, 3]

//ex
[...myArray[0],...myArray[1],...myArray[2]]

// 問212 #古い話題
// これは期待する値が出力されない。
// 	const arr = [];
// 	for (var i=0; i < 3; i++) {
// 		arr.push(() => i);
// 	}
// 	arr.map(x => x()); // [3,3,3]
// 期待する結果[0, 1, 2]にしてください

// var変数の問題。letを使えばこの問題はない。

const arr = [];
for (let i=0; i < 3; i++) {
    arr.push(() => i);
}
arr.map(x => x()); // [0,1,2]

// 問213
// 下のような
// 	const entries = [
// 		['yes', 'ja'],
// 		['no', 'nein'],
// 		['perhaps', 'vielleicht'],
// 	];
// entriesを
// この中でaタグを作りentries[0]をidとtextContent、 さらにそのaタグにaddEventListenerを使いclickイベントを登録してentriesの[1]が出力されるようにしてください

// →問題文が壊れているが、以下のようなコードの動きを説明できればOK
// →P213/index.html をブラウザーで開いて確認できる

<!doctype html>
<html>
<head>
    <meta charset='UTF-8'>
</head>
<body>
    <div id='content'></div>
    <script>
        const entries = [
            ['yes', 'ja'],
            ['no', 'nein'],
            ['perhaps', 'vielleicht'],
        ];
        const content = document.querySelector('#content');
        for (let [source, target] of entries) { // (A)
            content.insertAdjacentHTML('beforeend',
                `<div><a id='${source}' href=''>${source}</a></div>`);
            document.getElementById(source).addEventListener(
                'click', (event) => {
                    event.preventDefault();
                    alert(target); // (B)
                });
        }
    </script>
</body>
</html>

// 問214 #高度な話題
// 下記consoleは
// 	const foo = 'outer';
// 	function bar(func = x => foo) {
// 		const foo = 'inner';
// 		console.log(func());
// 	}
// 	bar();
// 何を出力するか。またその理由を答えてください。

// outer が出力される
// 引数のデフォルト値のスコープは、関数本体のスコープとは隔てられているため

// 問215 #高度な話題
// スーパークラスのメソッドspeakをサブクラスgetSpeakからcallしてください

// →問題文が尻切れだが、要は以下のコードのgetSpeak() に書いてあることが理解できればよい

// 模範解答

class Faa {
	constructor(name){
		this.name = name;
	}
	speak(){
		console.log(this.name);
	}
}

class Faaaa extends Faa {
	constructor(name){
		super();
		this.name = name;
	}
	getSpeak(){
		super.speak();
	}
}

var eee = new Faa('kenji');
eee.speak();	// kenji
var iii = new Faaaa('morita');
iii.getSpeak();	// morita
eee.speak();	// kenji

// 問216 #高度な話題
// こ方法はorigのプロパティ属性を守らない
// 	function clone(orig) {
// 		return Object.assign({}, orig);
// 	}
// propety descriptorsを使ってorig属性をもつ「クローンを作る関数」にしてください

// →「プロパティ属性を守らない」の意味がよくわからない
// →回答を見るとorigのprototypeを元にコピーしろということらしい

// 模範解答
function clone(orig) {
    const origProto = Object.getPrototypeOf(orig);
    return Object.assign(Object.create(origProto), orig);
}

// 問217 #高度な話題
// Generator methodsをつくってください(仮)

// → function* を使ってジェネレーターを書いてという話題

// 模範解答
// 同様の話題が
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Statements/function*#%E8%A8%88%E7%AE%97%E3%83%97%E3%83%AD%E3%83%91%E3%83%86%E3%82%A3%E3%81%A8%E3%81%97%E3%81%A6%E3%81%AE%E3%82%B8%E3%82%A7%E3%83%8D%E3%83%AC%E3%83%BC%E3%82%BF%E3%83%BC
// にある

class IterableArguments {
    constructor(...args) {
        this.args = args;
    }
    * [Symbol.iterator]() {
        for (const arg of this.args) {
            yield arg;
        }
    }
}

for (const x of new IterableArguments('hello', 'world')) {
    console.log(x);
}

// Output:
// hello
// world

// 問218 #高度な話題
// 定義と同時に実行する関数を作ってください

// →即時実行関数式(IIFE) を作れというもの
// https://developer.mozilla.org/ja/docs/Glossary/IIFE

// IIFEの典型例

(function foo(){
	console.log('hello')
})()	// hello

// 模範解答

var dimension = function(radius, height){
	var dimension = radius * radius * Math.PI;
	return dimension * height / 3;
}(10,20);
console.log(dimension);	// 2094.3951023931954

問219 オブジェクトのプロパティが存在するかどうか

// →問題文が完成していないが、「!!obj.height」という表現でプロパティの存在をチェックできる
// この他に https://note.affi-sapo-sv.com/js-object-property-check.php ではhasOwnPropertyやin演算子でチェックする方法が載っている

var obj = {
	width: 20
}
if(!!obj.height){
	console.log(obj.height)
} else {
	console.log("heightが定義されていません")
}
console.log(!!obj.height)
//false
//"heightが定義されていません"

// 問220
// 
// WIP(工事中）

// →問題文が完成していない
// →ソースコードは通常の関数実行時にログメッセージを追加する仕組みを提供するもの

function add(x, y){
	return x + y;
}
function multiply(x, y){
	return x * y;
}
function withLogging(wrappedFunction){
	return function(x, y){
		var result = wrappedFunction(x, y);
		console.log('result', result);
		return result;
	};
}
 
var addAndLog = withLogging(add);
addAndLog(1, 2)
//result 3
//3

var multiplyAndLog = withLogging(multiply)
multiplyAndLog(40,4)
//result 160

// 問221
// document内のh1を全て取得し、インデックス1番目のh1を削った残りを返してください

// 模範解答
var hoge = document.querySelectorAll('h1');
var newHoge = Array.prototype.slice.call(hoge, 1);

// 問222 #正規表現
// var a = 'aabbccdde1e23ffgg'; とvar b = 'aabbccdde1e23ffgg';がある。 aとbを比較してaの方が先に数値が現れる場合trueを返してください

// 模範解答
var a = 'aabbccdde1e23ffgg';
var b = 'aabbccddee123ffgg';

a.search(/\d/) < b.search(/\d/); //true

// 問223 #正規表現
// <div>abuout me</div>
// divタグに囲まれた文字列を配列divArrayに格納しなさい

// 模範解答
var div = '<div>about me</div>';
var divarray=[];
divarray.push(/\<div\>(.+)\<\/div\>/.exec(div)[1])
divarray //['about me']

// 問224
// WIP（工事中）
// 
// →問題文が完成していない

var i = 0;
var array = [];
do {
	array.push(Math.pow(2,i));
	i += 1;
} while(i < 10);
console.log(array) // [ 1,  2,   4,   8,  16, 32, 64, 128, 256, 512 ]

// 問225
// 1980年8月1日5時55分を表すDateオブジェクトを生成してください

// 模範解答
var d = new Date('1980/8/1 5:55');
console.log(d)	//Fri Aug 01 1980 05:55:00 GMT+0900 (JST)

// 問226
// 上で作成した日時を現地フォーマットで出力してください

// 模範解答
var d = new Date('1980/8/1 5:55');
//標準フォーマット
d.toString(); //'Tue Jul 01 2008 05:55:00 GMT+0900 (JST)'
// 現地フォーマット
d.toLocaleString(); //'1980/7/1 5:55:00'

// 問227
// WIP
// →問題文が完成していない

// 問228
// var ary = ['aaa', 'bbb', 'ccc'];に文字列'eee'を先頭に追加してください

// 模範解答
var ary = ['aaa', 'bbb', 'ccc'];
ary.unshift('eee')
console.log(ary) //['eee', 'aaa', 'bbb', 'ccc']

// 問229
// こちらの変数を使って var ary = [0, 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10]; 2でも3でも割り切れない数を抽出した配列を生成してください

// 模範解答
var ary = [0, 1, 2, 3 , 4, 5, 6, 7, 8, 9, 10];
var newAry = ary.filter(function(elem){
    if (elem % 3 !== 0 && elem % 2 !== 0){
         return elem
     }
});
console.log(newAry) //[1, 5, 7]

// 問230 #高度な話題
// ビルドインプロパティを3つ答えなさい

// 模範解答
Infinity
NaN
undefined

//グローバルオブジェクトに定義されているプロパティ
//ビルドインオブジェクトとは異なり、参照する際にオブジェクトを指定せずにプロパティ名を記述するだけ

// 問231 #高度な話題
// ビルドイン関数を9つ挙げてください

// 模範解答
decodeURL(str)
decodeURIComponent(str)
encodeURI(str)
encodeURIComponent(str)
eval(codeStr)
isFinite(num)
isNaN(value)
parseFloat(str)
parseInt(str,[radix])

// 問232
// こちら encodeURIComponentとencodeURIの違いを教えてください

// →いずれもURL中のURLに含めてはいけない文字をエスケープシーケンスに置き換えるもの
// →どこまでエスケープするかで違いがある

// 模範解答

const url = 'https://tools.ietf.org/html/rfc2822#page-14';
console.log(encodeURIComponent(url)) //'https%3A%2F%2Ftools.ietf.org%2Fhtml%2Frfc2822%23page-14'

(;、 :、 /、 @、？、 &、 %、 $、 #、 =、 + 、 ,)はエンコードしない
console.log(encodeURI(url)) //'https://tools.ietf.org/html/rfc2822#page-14'

// 問233
// var s = 'aaa,bbb,ccc,ddd'; を使って、,を/に置換した文字列aaa/bbb/ccc/dddを出力してください。ただしreplaceメソッドは使用しないこととする

// 模範解答
var s = 'aaa,bbb,ccc,ddd';
while (s.indexOf(',') >= 0){
	s = s.replace(',','/');		// ん？replaceは使わないんじゃなかったっけ？
}
console.log(s) //'aaa/bbb/ccc/ddd'

※splitとjoinを使って生成する方法もあります
var s = 'aaa,bbb,ccc,ddd';
console.log(s.split(',').join('/'))	// aaa/bbb/ccc/ddd

replaceAll もあるよ
var s = 'aaa,bbb,ccc,ddd';
console.log(s.replaceAll(',','/'))	// aaa/bbb/ccc/ddd

正規表現のgフラグを使うこともできます
// gフラグを使用しない場合
var s = 'aaa,bbb,ccc,ddd';
console.log(s.replace(/,/,'/'))		// aaa/bbb,ccc,ddd
// gフラグを使用した場合
var s = 'aaa,bbb,ccc,ddd';
console.log(s.replace(/,/g,'/'))	// aaa/bbb/ccc/ddd

// 問234 #正規表現
// 下の変数sにある var s = 'aaa<div>bbb</div>ccc<div>ddd</div>eee'; divの中にあるtextを全て出力してください

// - 最小一致 .*? を使い、
//	<div>bbb</div>ccc<div>ddd</div> という大きな範囲でなく
// 	<div>bbb</div> という地位さな範囲を取得
// - gフラグを使い、divの２つ全てを取得
const s = 'aaa<div>bbb</div>ccc<div>ddd</div>eee';
const ret = s.match(/<div>.*?<\/div>/g)
ret.forEach(i => {
	const r = s.match(/<div>(.*?)<\/div>/)
	console.log(r[1])
})

// 模範解答
// →ソースコードを追えていない、↑のシンプルな回答でいいと思う
var s = 'aaa<div>bbb</div>ccc<div>ddd</div>eee';
var divStringAry = [];
var regexp = /<div>.*?<\/div>/g;
var result = regexp.exec(s);
while(result != null){
	var divStr = result[0]
	divStr = divStr.substring('<div>'.length,
	         divStr.length - '</div>'.length);
	divStringAry.push(divStr);
	result = regexp.exec(s);
}
console.log(divStringAry) //['bbb', 'ddd']

// 問235
// 2の0乗〜10乗までを格納した配列を作成してください。インデックスはそれぞれ指数(0〜10)となるようにしてください

// →テクニカルな方法でエレガントに書いてみる
// https://qiita.com/suin/items/1b39ce57dd660f12f34b の方法を使う
const r = [...Array(10)].map((_,i) => i)	// [0,1,2,...10] を作成
const r2 = r.map(i => Math.pow(2, i))		// それぞれ指数を計算
console.log(r2)	// [ 1,  2,   4,   8,  16, 32, 64, 128, 256, 512 ]

// ↑は一行で書いてもいい
const r = [...Array(10)].map((_,i) => Math.pow(2,i))
console.log(r)	// [ 1,  2,   4,   8,  16, 32, 64, 128, 256, 512 ]

// 模範解答
var ary = [];
var i = 0;
do {
   ary[i] = Math.pow(2, i);
   i += 1;
} while(i <= 10);
console.log(ary) //[1, 2, 4, 8, 16, 32, 64, 128, 256, 512, 1024]

//別解
var ary = [];
for(var n = 0; n <= 10; n++){
 ary[n] = Math.pow(2, n);
}

// 問236
// 今年の各月の最終日を配列に格納してください。インデックスは各月と一致する数値とする。

// Date.prototype.setMonth() の第二引数に日付を与えることができ、その値を0 とすると月の末尾となる
// https://zenn.dev/miya_akari/articles/8f702e8c8a3094
// https://developer.mozilla.org/ja/docs/Web/JavaScript/Reference/Global_Objects/Date/setMonth
// →MDNの記事にはこの振る舞いについて書いていないな、けどできる

const date = new Date();	// 今年を指すdateオブジェクトを用意
for(let i=0;i<12;i++){
	date.setMonth(i,0)	// i+1月の末尾(iは0から始まる)
	console.log(date.getDate())
}

// 模範解答
var ary = [];
var temp = new Date();
for (var i = 1; i <= 12; i++){
	var d = 28;
	temp.setMonth(i - 1, d);
	while(temp.getMonth() == i - 1){//次の月になるまでroop
		d++;
		temp.setDate(d);
	}
	ary[i] = d -1; //次の月になる直前の日付を配列に設定
}
console.log(ary) //[undefined × 1, 31, 29, 31, 30, 31, 30, 31, 31, 30, 31, 30, 31]

//DateオブジェクトのsetDate()に日付を設定したさい、実際の日付より大きい数値を設定した場合は自動的に繰り上げられる
// 例えば1月のDateオブジェクトに対してsetDate(32)とすると自動的に2月1になる。その性質を利用している

// 問237 #高度な話題
// 同一制限ポリシー(Same-Origin-Policy)の制限を受けるものを4つ答え、またオリジンを参照してください
 
// 模範解答
see : https://tools.ietf.org/html/rfc6454

・XMLHttpRequest
・Canvas
・WebStorage
・X-Frame-Options

location.origin
document.origin

//制限を受けないものには
//Cookie
//HTTP認証
//document.domainを書き換えてのinnerHTMLの読み書き

//以下はlocationプロパティ
//例: http://www.google.com:80/search?q=devmo#test
host - www.google.com:80
hostname - www.google.com
href - http://www.google.com:80/search?q=devmo#test
pathname - /search (ホストからの相対)
protocol - http:
search = ?q=devmo
hash - #test

//用語
スキーム : http,https
同一オリジン : スキーム,ホスト,ポートが同じこと
クロスオリジン : 上記がいずれか一つでも違うこと
セッションハイジャック : サーバーから渡されるセッションIDを盗み正規ユーザーになりすますこと
 
// 問238
// location.assignとlocation.replaceの違いを教えてください

// 模範解答
//replaceは画面遷移をWebブラウザの履歴に残さず遷移する

// 問239 #高度な話題
// Object.creteを使ってPersonのにthis.nameとthis.jobを参照して「'my name is' + this.name + '。' + '職業は' + this.job + 'です'」を出力するインスタンスメソッド「say」のみを持ち、それを継承してnameを自身のプロパティとして持つkenjiと、 kenjiを継承しjobを自身のプロパティとしてもつcompKenjiを作成して ```my name is morita。JavascriptEngneer``を出力してください、
//
// →問題文が難しい、以下のソースが理解できればよい
// （ソースの間違いを修正してある）

// 模範解答
var Person = {
	say: function(){
		console.log('my name is' + this.name + '。' + '職業は' + this.job + 'です');
	}
}

var kenji = Object.create(Person, {name :{value: 'kenji' }});
var compKenji  = Object.create(kenji, {job: {value: 'JavascriptEngneer'}});
compKenji.say() 'my name is kenji。JavascriptEngneer'

// 問240 #高度な話題
// Object.createメソッドで以下と同じ記述をしてください。

// →問題文が完成していない

function Constructor(){}
o = new Constructor();
o = Object.create(Constructor.prototype);

// 問241 #高度な話題
// var o = Object.create({},{p: {value: 32}}); を書き換えtrue、列挙true、変更trueとして新たにオブジェクトを生成してください。

// 模範解答
o2 = Object.create({},{p: {value: 32, writable: true, enumerable: true, configurable: true}});

// 書き換え可能であることを確認するには
o2.p = 54;
console.log(o2.p) //54

// 列挙可能であることを確認するには
for (var prop in o2){
 console.log(prop)	// p が表示されること
}

// 変更可能であることを確認するには
console.log(delete o2.p) //true

// 問242 #高度な話題
// Object.createとObject.definePropertyesとObject.definePropertyの引数、返り値を教えてください。

// 模範解答

//Object.create
//第一引数に任意のオブジェクトのprototypeを渡し、第二引数に自身がもつプロパティディスクリプタを定義し、それを継承したインスタンスを返す.

//Object.defineProperty
Object.defineProperty(プロパティをsetする対象オブジェクト, プロパティ/関数名, {パラメータ, ...});
「一度作ったオブジェクト」に特別な内部属性をもったプロパティを1つ定義する//返り値は第一引数で渡ってきて再定義されたオブ稀有と
第二引数はpropety名、第三引数は定義したいディスクリプタをハッシュオブジェクトとして渡す
既存のプロパティは上書き
各種設定のdefaultはfalse

//Object.definePropertes
Object.defineProperty(プロパティをsetする対象オブジェクト,{プロパティ/関数名{パラメータ, ...}});
「一度作ったオブジェクト」に新たなプロパティを複数の定義できる
第二引数はpropertyeのキーとしてディスクリプタを持つオブジェクト
既存のプロパティは上書き

※プロパティの内容＝デスクリプタ

// 問243 let n = '124';を数値に変換してください。

// 模範解答
let n = '124';
console.log(+n) //124

// 以下は正しく動作するように修正してある
let n = '';
console.log(+n) //0
				//parseInt(n, 10)はから文字だとNaNが返るがこちらの方法は必ず数値が返る
console.log(parseInt(n,10))	// NaN

// 問244
// こちらの評価は
// 	var n = {value: 0};
// 	if(n.value){
// 		//something
// 	}
// value値が0にもかかわらず（条件式の値は）falseになります。(valueが空文字の場合でもfalse)
// nullやundefinedの場合のみ（条件式の値が）falseになるような条件式にしてください

// 模範解答
if(n.value != null){//something}

// 問245 オブジェクトの存在チェックをしてあったら実行する次のコード
// 	var o = {f: function(){console.log('JS')}};
// 	if(o){
// 		if(o.f){
// 			o.f();
// 		}
// 	}
// より端的な記述をしてください。

// 模範解答
var o = {f: function(){console.log('JS')}};
o && o.f && o.f();

//同じ様なイデオムで代入の際に括弧でくくらないとエラーが起きることに注意してください
//o && o.options && o.options.players > 50 && (flag = true);

// 問246 var vの値を確実に数値にしたい。 'a'が入ってきた場合NaNではなく0を代入するようにしてください。

// 模範解答
var n = +v || 0;

// メモ
console.log(+'a')		// NaN（数値に変換できない）
console.log(NaN || 0)	// 0

// 問247 var v を整数化してください

// 模範解答

v = 1.3
var i = v | 0;
console.log(i)	// 1	// えー？なんでこれで整数になるんだろう！？
				// 通常はこんな分かりづらいテクニックではなく、切り捨てや四捨五入を使った方がコードが明確になり、よい

// 問248 #高度な話題
// 下の様な場合、
// 	function Emp(){};
// 	var insEmp1 = new Emp();
// 	var insEmp2= new Emp();
// 	insEmp2.name = "kenji";
// 	console.log(insEmp2.name); //"kenji"
// 	console.log(insEmp1.name); //undefined; //更新されていない
// Empがnameを持っていない場合Emp1は即座に更新されない。
// プロトタイプからプロパティを継承する全オブジェクトにそのプロパティ(name)を値("kenji")を追加してください。

// 模範解答
function Emp(){};
var insEmp1 = new Emp();
var insEmp2 = new Emp();
Emp.prototype.name = "kenji";	// 共通の親にプロパティを追加する

console.log(insEmp1.name) //"kenji";
console.log(insEmp2.name) //"kenji"

// 問249 ObjectとMapの違いを教えてください

// 模範解答

・Objectのkeyはstring型、Mapは任意の型を指定できる
・Objectのsizeは手動で調べる必要がある、MapはMap.size()
・Objectの反復は順番を保証しない,Mapの反復は要素の挿入順
・Objectはデフォルトでプロパティを持つ(var map = Object.create(null)で回避できる)

//ObjectかMapか、使うべきところ
//Mapを使う
・実行時までキーが不明な時、全てのkeyが同じ型の時、全ての値が同じ型の時、

//Objectを使う
・個々の要素に操作できるロジックがある時、

参照
http://programmers.stackexchange.com/questions/285881/any-point-in-using-es6-map-when-keys-are-all-strings
http://stackoverflow.com/questions/18541940/map-vs-object-in-javascript

    Object:
        var o = {};
        var o = Object.create(null);
        o.key = 1;
        o.key += 10;
        for(let k in o) o[k]++;
        var sum = 0;
        if('key' in o);
        if(o.hasOwnProperty('key'));
        delete(o.key);
        Object.keys(o).length
    Map:
        var m = new Map();
        m.set('key', 1);
        m.set('key', m.get('key') + 10);
        m.foreach((k, v) => m.set(k, m.get(k) + 1));
        for(let k of m.keys()) m.set(k, m.get(k) + 1);
        var sum = 0;
        for(let v of m.values()) sum += v;
        if(m.has('key'));
        m.delete('key');
        m.size();

// 問250 破壊的なメソッドをあげてください

// →破壊的とは実行後にオリジナルのデータを改変してしまうこと
let a = [1,3,2]
a.sort()
console.log(a)	// [1,2,3] ←書き換わっている

// 模範解答
pop、push、reverse、shift、sort、splice、unshilft

// ES2023から非破壊版がサポートされた
// https://ics.media/entry/220610/
toSorted()
toReversed()
toSpliced()

let a = [1,3,2]
console.log( a.toSorted())	// [1,2,3]
console.log(a)	// [1,3,2] ←書き換わっていない
