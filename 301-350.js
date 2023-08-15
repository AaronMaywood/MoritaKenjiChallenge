// 問301 #jQuery
// こちら
// $(el).toggleClass(className);
// と同じ処理をするようにJSで記述してください。

// 模範解答
// if節だけでいいと思う、else 節で何をやっているかは不明（おそらくclassList実装のない古いブラウザー用の記述だと思われる）

if (el.classList) {
	el.classList.toggle(className);
} else {
	var classes = el.className.split(' ');
	var existingIndex = classes.indexOf(className);

	if (existingIndex >= 0)
		classes.splice(existingIndex, 1);
	else
		classes.push(className);

	el.className = classes.join(' ');
}

// 問302 #jQuery
// こちら
// $.parseHTML(htmlString);
// と同じ処理をするようにJSで記述してください。

// 模範解答
var parseHTML = function(str) {
	var tmp = document.implementation.createHTMLDocument();
	tmp.body.innerHTML = str;
	return tmp.body.children;
};

parseHTML(htmlString);

// 問303 #jQuery
// こちら
// $(el).on(eventName, eventHandler);
// と同じ処理をするようにJSで記述してください。

// 模範解答
el.addEventListener(eventName, eventHandler);

// 問304 #高度な話題 #TaskQueue #Promise
// こちらはDOMの解析とロードの条件で渡されたコールバック、fncが同期的に呼ばれるか非同期に呼ばれるか変わるコードです。
function onReady(fnc) {
	var readyState = document.readyState;
	if (readyState === 'interactive' || readyState === 'complete') {
		fnc();
	} else {
		window.addEventListener('DOMContentLoaded', fnc);
	}
}
onReady(function () {
	console.log('DOMは解析とロード済み');
});
console.log('Start');

大雑把にいうと、body終了直前に書かれていた場合条件式trueの文が実行され同期的に、head内で書かれていた場合elseブロックが実行され非同期的に呼ばれます。
なので'Start'が出力される順番が変わるのですが、こちらを常に'Start'が先に出力されるようにしてください。

//onReadyが実行される際に渡しているコールバックはもしtrueなら同期的にfnc()が実行される。
//なので

//DOMは解析とロード済み
//Start
//と出力される。

//これを常に
//Start
//DOMは解析とロード済み

//とするにはfncを非同期で実行するようにするようにする

//ex1 setTimeout
function onReady(fnc) {
	const readyState = document.readyState;
	if (readyState === 'interactive' || readyState === 'complete') {
		setTimeout(fnc, 0);		// タスクキューに入れると、下のconsole.log('Start')終了後にfnc() が実行されるようになる
	} else {
		window.addEventListener('DOMContentLoaded', fnc);
	}
}
onReady(function () {
	console.log('DOMは解析とロード済み');
});

console.log('Start');
//Start
//DOMは解析とロード済み

//ex2 Promise
function onReady() {
  return new Promise(function(resolve, reject){
    const readyState = document.readyState;
    if (readyState === 'interactive' || readyState === 'complete') {
        resolve();
    } else {
        window.addEventListener('DOMContentLoaded', resolve);
    }
  })
}
onReady().then(function(){
   console.log('DOMは解析とロード済み')
})
console.log('Start');
//Start
//DOMは解析とロード済み

//Promiseは常に非同期で実行されることを保障されている（マイクロタスクキュー）

// 問305 #高度な話題
// 非同期コールバックを同期的に呼んではいけない理由を教えて下さい。

// 模範解答
// →以下の状況の具体例がわからない（安村）
・非同期コールバックを同期的に呼び出すと、処理の期待されたシーケンスが乱され、コードの実行順序に予期しない変動が生じるかもしれない。
・非同期コールバックを同期的に呼び出すと、スタックオーバーフローや例外処理の間違いが発生するかもしれない。

//非同期コールバックを次回に実行されるようスケジューリングするには、setTimeout のような非同期APIを使う。

// 問306 #高度な話題 #Promise
// 最初のPromiseオブジェクトがresolveされたら'私は'という文字列を返し、次のPromiseオブジェクトで文字列'今日、'を返し、次のPromiseオブジェクトで'運がいいです'を返し、 最後のPromiseオブジェクトでそれらが連結された文字列を出力してください。
 
// →プロミスチェーンを書く問題
// https://ja.javascript.info/promise-chaining

new Promise(resolve => {
	resolve('私は')
}).then(result => {
	return new Promise(resolve => {
		resolve(result + '今日、')
	})
}).then(result => {
	return new Promise(resolve => {
		resolve(result + '運がいいです')
	})
}).then(result => console.log(result)) //私は今日、運がいいです

// 模範解答↑より簡単になっている、これでもいい
const initPromise = new Promise(function(resolve){
	resolve('私は')
})
const lastName = function(sentence){
	return sentence + '今日、'
}
const firstName = function(sentence){
	return sentence + '運がいいです'
}
const comp = function(sentence){
	console.log(sentence)
}

console.log(initPromise.then(lastName).then(firstName).then(comp)) //私は今日、運がいいです

// 問307 #高度な話題 #Promise
// Promseオブジェクト作成時にresolveに数値1を渡すコールバックを呼び出し、console出力され、 続くthenメソッドで2を足した値を出力してください。

// →問題文が難しい、↓が理解できればよい

// 模範解答
var promise1 = new Promise(function(resolve, reject){
	resolve(1);
})
promise1.then(function(val){
	console.log(val);
	return val + 2;
}).then(function(val){
	console.log(val);
});

// 問308 #高度な話題 #Promise
// Promiseオブジェクトを使ってGETメソッドリクエスト，list.jsonを取得してください。urlはhttp://kenmori.jp/list.jsonとする

// →fetchAPI （内部でプロミスを使う）を使えば簡単
// https://ja.javascript.info/promise-chaining#ref-208
fetch('list.json')
    .then(res => res.json())
    .then(data => console.log("Success!", data))
    .catch(err => console.log("Failed", err)

// 模範解答（fetchAPI を使用していない古い書き方なので複雑になっている）
function get(url) {
  return new Promise(function(resolve, reject) {
    var req = new XMLHttpRequest();
    req.open('GET', url);
    req.onload = function() {
      if (req.status == 200) {
	    resolve(req.response);
      } else {
        reject(Error(req.statusText));
      }
    };
    req.onerror = function() {
    	 reject(Error("Network Error"));
    };
    req.send();
  });
};

get('list.json').then(function(res){
	console.log("Success!", res);
}, function(error){
  console.log("Failed", error);
})

// 問309 #高度な話題 #Promise
// Promiseオブジェクトを使ってこちら
// 	function say(callback, msg) {
// 		setTimeout(callback, msg);
// 	}
// 	say(function(){
// 		console.log('ken!!')
// 	}, 1000);
// と同じことをしてください

// 模範解答
function say(msg){
	return new Promise(function(resolve, reject){
		setTimeout(resolve, msg);
	});
}

say(1000).then(function(){
	console.log('ken!');
})

// 問310 #高度な話題 #Promise
// Promiseを使って0.5秒後毎に文字列の出力がされる非同期処理を実装をしてください

// 模範解答
function f (name, time){
	var done = new Promise(function(resolve){
		setTimeout(function(){
			console.log(name)
			resolve();
		}, time)
	});
	return done
}

f('kenji', 500)
	.then(()=> f('morita', 500))
	.then(()=> f('kkk', 500))
	.then(()=> f('jji', 500))

// 問311 #高度な話題 #Promise
// 複数の非同期処理の完了を待って'done'を出力する実装をしてください

// →Promise.all() を使ったサンプルを作れという問題↓がわかれば良い

// 模範解答
function f (name, time){
	var done =  new Promise(function(resolve){
		setTimeout(function(){
			console.log(name)
			resolve();
		}, time)
	});
	return done
};
var i = Promise.all([f('morita', 500),f('kkk', 500),f('jji', 500)])
i.then(()=> console.log("done"))

// 問312 #高度な話題 #Promise
// 'http://localhost:3000/comments', 'http://localhost:3000/posts', 'http://localhost:3000/profile', 'http://localhost:3000/state', の順にGETリクエスト、それぞれresponseが返って来るまで、処理を止めて、返ってきたら次のリクエストをする実装をしてください。

// FetchAPI を使う
// NOTE: AaronMaywood のところには実在のアカウント名を入れる
fetch(`https://api.github.com/users/AaronMaywood`)
	.then(r => fetch(`https://api.github.com/users/AaronMaywood`))	// フェッチするURLは便宜的に全部同じにしているが、本来は別々のURLとする
	.then(r => fetch(`https://api.github.com/users/AaronMaywood`))
	.then(r => r.json())
	.then(json => console.log(json.login))	// AaronMaywood
	.catch(err => console.log(err))

// Async/Await を使って書き直すとこうなる
r = await fetch(`https://api.github.com/users/AaronMaywood`)
r = await fetch(`https://api.github.com/users/AaronMaywood`)
r = await fetch(`https://api.github.com/users/AaronMaywood`)
r = await r.json()
console.log(r.login)

// 模範解答（FetchAPI を使用していないぶん、複雑になっている）
function hidouki(url, num){
	return new Promise(function(resolve, reject){
		var req = new XMLHttpRequest();
		req.open('GET', url);
		req.onload = function () {
			console.log(num)
			if(req.status == 200){
				resolve(req.response);
			} else {
				reject(Error(req.statusText));
			}
		}
		req.onerror = function(){
			reject(Error("Network Error"))
		}
		req.send();
	})
}
async function asyncFunction (url, num){
	var result = await hidouki(url , num);
	console.log(result);
	return result;
}
asyncFunction('http://localhost:3000/comments', 1)
	.then((res)=> asyncFunction('http://localhost:3000/posts', 2))
	.then((res)=> asyncFunction('http://localhost:3000/profile', 3))
	.then((res)=> asyncFunction('http://localhost:3000/state', 4))
	.then(() => console.log('done!'))

// 問313 #高度な話題 #Promise
// 上記（問312）の記述はthenの第一引数にresolve処理を渡しています。 逐次処理のような記述に修正してください。

// →問312の模範解答の後半をAsync/Await を使って書き直してという話題

// 模範解答
function hidouki(url, num){
	// 問312と同じ
}

async function asyncFunction (){
	const result = await hidouki('http://localhost:3000/posts', 1);
	console.log(result);
	const result2 = await hidouki('http://localhost:3000/comments', 2);
	console.log(result2);
	const result3 = await hidouki('http://localhost:3000/profile', 3);
	console.log(result3);
	const result4 = await hidouki('http://localhost:3000/state', 4);
	console.log(result4);
	console.log('done!');
}
asyncFunction();

// 問314 #高度な話題 #co
// coを使って、 'http://localhost:3000/comments', 'http://localhost:3000/posts', 'http://localhost:3000/profile', 'http://localhost:3000/state', を並列でリクエストしてください。

// →coは習得していないので飛ばします、もし必要になったらやります（安村）

// 模範解答
const promiseFun = co.wrap( function* (url){
	return new Promise(function(resolve, reject){
		var req = new XMLHttpRequest();
		req.open('GET', url, true);
		req.onload = function(){
			if(req.status == 200){
				setTimeout(()=>{
					//note:5秒後にdoneするようにしています
					resolve(req.response);
				}, 5000)
			} else {
				reject(Error("error"));
			}
		}
		req.onerror = function(){
			console.log("error");
		}
		req.send(null);
	});
})
co(function* (){
	var res = yield [
		promiseFun('http://localhost:3000/posts'),
		promiseFun('http://localhost:3000/profile'),
		promiseFun('http://localhost:3000/state'),
	];
	console.log(res[0], res[1], res[2]);
}).catch(onerror);

// 問315 #高度な話題 #co
// coを使ってgeneratorをラップしたfnを実行して、Promiseがresolveするまで処理を止める記述をしてください。※Promise.resolveで任意の値をすぐ返してok

// →coは習得していないので飛ばします、もし必要になったらやります（安村）

// 模範解答
var fn = co.wrap(function* (fa){
	return yield Promise.resolve(fa);
});
fn(true).then(function(val){console.log(val)})

// 問316 #高度な話題 #co
// coを使って、1から始まり1秒ごとにインクルメントされた値からパラメーターに渡した数値まで出力される関数を実装、呼び出し元にresolveのpromiseオブジェクトが返ってきたら'done'を出力してください。

// →coは習得していないので飛ばします、もし必要になったらやります（安村）

// 模範解答
function sleep(i){
	return new Promise(function(resolve){
		setTimeout(resolve,1000);
	})
};

var num = co.wrap(function* (num){
	for(var i = 1; i <= num; i++) {
		yield sleep(i);
		console.log(i)
	}
	yield sleep(1)
})

num(5).then(function(num){
	console.log('done')
});

// 問317 こちら #高度な話題 #Promise
// function asyncFunc() {
//     return otherAsyncFunc()
//                .then(result => {
//                    console.log(result);
//                });
// }
// は非同期の結果をハンドリングしています。この処理と同等になるようにasync/awaitで記述してください

// 模範解答
async function asyncFunc() {
    const result = await otherAsyncFunc();
    console.log(result);
}

// 問318 #高度な話題 #Promise
// こちら
// function asyncFunc() {
//     return otherAsyncFunc1()
//                .then(result1 => {
//                    console.log(result1);
//                    return otherAsyncFunc2();
//                })
//                .then(result2 => {
//                    console.log(result2);
//                });
// }
// は非同期の結果が返ってきたら次の非同期処理をしています(逐次処理)。 この処理と同等になるようにasync/awaitで記述してください

// 模範解答

async function asyncFunc() {
    const result1 = await otherAsyncFunc1();
    console.log(result1);
    const result2 = await otherAsyncFunc2();
    console.log(result2);
}

// 問319 #高度な話題 #Promise
// こちら
// function asyncFunc() {
//     return Promise.all([
//         otherAsyncFunc1(),
//         otherAsyncFunc2(),
//     ])
//     .then([result1, result2] => {
//         console.log(result1, result2);
//     });
// }
// は非同期処理を並列でしています。この処理と同等になるようにasync/awaitで記述してください

async function asyncFunc() {
    const [result1, result2] = await Promise.all([
        otherAsyncFunc1(),
        otherAsyncFunc2(),
    ]);
    console.log(result1, result2);
}
// 問320 #高度な話題 #Promise
// こちらは
// function asyncFunc() {
//     return otherAsyncFunc()
//     .catch(err => {
//         console.error(err);
//     });
// }
// 非同期処理を移譲した先で起きたエラーをハンドリングしています この処理と同等になるようにasync/awaitで記述してください

// 模範解答
async function asyncFunc() {
    try {
        const result = await otherAsyncFunc();
    } catch (err) {
        console.error(err);
    }
}

// 問321 #高度な話題
// イベントデリゲーションに関して。 こちらのDOMの
//	<ul id="todo-app">
// 		<li class="item">Walk the dog</li>
// 		<li class="item">Pay bills</li>
// 		<li class="item">Make dinner</li>
// 		<li class="item">Code for one hour</li>
// 	</ul>
// li要素のそれぞれにイベントリスナーをアタッチしたもが下記です。
//	document.addEventListener('DOMContentLoaded', function() {
// 		let app = document.getElementById('todo-app');
// 		let items = app.getElementsByClassName('item');
// 	
// 		// それぞれにイベントリスナーをアタッチする
// 		for (let item of items) {
// 			item.addEventListener('click', function() {
// 				alert('you clicked on item: ' + item.innerHTML);
// 			});
// 		}
// 	});
// この問題はもしli要素が1000個あった場合1000個のリスナーを作るところにあります。
// これは効率的ではありません。
// 全体のコンテナーに対し1つのイベントリスナーをアタッチして上記と同じ動作をするようなイベントデリゲーションを実装してください

document.addEventListener('DOMContentLoaded', function() {
	let app = document.getElementById('todo-app');

	// 全体のコンテナーに対してイベントリスナーをアタッチする
	app.addEventListener('click', function(e) {
		// そして、リスナーの内部で自分がだれかを確認し、
		if (e.target && e.target.nodeName === 'LI') {
			// 'LI'であれば処理をする
			let item = e.target;
			alert('you clicked on item: ' + item.innerHTML);
		}
	});
});

// 問322 #古い話題
// こちらの実装は配列のインデックスを3000ms後に出力することを期待しています。
// const arr = [10, 12, 15, 21];
// for (var i = 0; i < arr.length; i++) {
// 	setTimeout(function() {
// 		console.log('The index of this number is: ' + i);
// 	}, 3000);
// }
//"The index of this number is: 4"
//"The index of this number is: 4"
//"The index of this number is: 4"
//"The index of this number is: 4"
// 理由はsetTimeout関数はクロージャーを作り、それはスコープ外への参照を持ちます。 3秒後には関数は実行されその時ループはすでに終わっていてその際参照するiは4となっているためです。
// これを期待する通り
//"The index of this number is: 0"
//"The index of this number is: 1"
//"The index of this number is: 2"
//"The index of this number is: 3"
// を出力するように実装をしてください。

// →古いvar変数の話題、最後のlet変数を使う方法が理解できればよし

//変数iをそれぞれのfunctionに渡す
const arr = [10, 12, 15, 21];
for (var i = 0; i < arr.length; i++) {
	// pass in the variable i so that each function
	// has access to the correct index
	setTimeout(function(i_local) {
		return function() {
			console.log('The index of this number is: ' + i_local);
		}
	}(i), 3000);
}

//let構文を使う。それぞれのfunctionが呼ばれるたびにletは新しいバインディングを作る
const arr = [10, 12, 15, 21];
for (let i = 0; i < arr.length; i++) {
	setTimeout(function() {
		console.log('The index of this number is: ' + i);
	}, 3000);
}

// 問323 #高度な話題
// こちらのhtmlでcontainer内をscrollした際にイベントを発火させたい。
// <div id="container" style="overflow:scroll;height: 100px;width:200px;background:#e2e2e2">
// 	<div style="height:1000px;width:100px;">
// 	</div>
// </div>
// ただ、window.scrollのイベント毎に発火するとパフォーマンスに深刻な問題を起こす。
// inputにkeypressする際にも起こるようなこのような問題はdebouncingとthrottlingを実装することで解決できる。
// //https://css-tricks.com/debouncing-throttling-explained-examples/
// scroll後、2秒後にイベントが発火するdebouncingを実装してください。

// →スクロールイベントをリッスンしたときに速度低下することを「Scroll Jack」と呼ぶ
//	https://qiita.com/hiro0218/items/7ac41f58891d96951fa1
// →立て続けに発火したイベントを１回の発火だけにする（間引く）ための「debounce」と呼ばれる仕組みの実装の問題
// →自作せずに lodash ライブラリーの debounce を使うという付き合い方が普通
//    lodash のdebounceについては https://qiita.com/waterada/items/986660d31bc107dbd91c を参照のこと
// しくみの理解には↓模範解答を参照
// →「Scroll Jack」への対策には、他に Intersection Observer API がある https://ics.media/entry/190902/

// 模範解答

// debounce function that will wrap our event
function debounce(fn, delay) {
	// maintain a timer
	let timer = null;
	// closure function that has access to timer
	return function() {
		// get the scope and parameters of the function
		// via 'this' and 'arguments'
		let context = this;
		let args = arguments;
		// if event is called, clear the timer and start over
		clearTimeout(timer);
		timer = setTimeout(function() {
			fn.apply(context, args);
		}, delay);
	}
}

// function to be called when user scrolls
function foo() {
	alert('You are scrolling!');
}

// wrap our function in a debounce to fire once 2 seconds have gone by
let elem = document.getElementById('container');
elem.addEventListener('scroll', debounce(foo, 2000));

//https://jsfiddle.net/kenjimorita/2pmpvnqw/1/

// 問323
// 変数aに2を代入してをaを4乗してください。 さらにaが16になることを確認してください

// 模範解答
let a = 2;
a **=4;
console.log(a === Math.pow(2, 4)) //true

// 問324
// let obj = {a: 1, b:2, c:3}
// Object.values(obj).forEach(value=> console.log(value))
// //1
// //2
// //3
// こちらをfor-ofで同じ実装にしてください

// 模範解答
let obj = {a:1, b:2, c:3}
for(let value of Object.values(obj)){
	console.log(value)
}
//1
//2
//3

// for...of ではIterable を使用する必要があるため、 Object.values() を使用している

// なお、for...in で書くとこう
let obj = {a:1, b:2, c:3}
for(const key in obj){
	console.log(obj[key])
}

// 問325
// こちらはentriesで返されるkeyとvalueのペアー配列を要素とした配列をdestructuringしてそれぞれのkeyとvalueを出力しています。
// 	let obj = {a:1,b:2,c:3};
// 	Object.entries(obj).forEach( ([key, value]) => {
// 		console.log(`${key} is ${value}`)
// 	})
// この実装をfor-ofで記述してください

// 模範解答
let obj = {a: 1, b: 2, c: 3}
for (let [key, value] of Object.entries(obj)) {
	console.log(`${key} is ${value}`)
}
// a is 1, b is 2, c is 3

// 問326
// こちらは副作用がない関数です
// 	function add(x, y){
// 		return x + y;
// 	}
// こちらの関数の中身を編集せずにx + yの結果、例えばadd(2, 3)を実行したら値をreturnする前にconsoleで'Result:5'を出力する記述をしてください。
 
function add (x, y){
	return x + y;
}
function addAndLog(x, y){
	var result = add(x, y);
	console.log(`Result:${result}`);
	return result;
}
addAndLog(2, 3) //Result:5

// 問327 #高度な話題 #高階関数
// 下記のような減算する関数subtractと加算する関数addがあります。
// 	function add (x, y){
// 		return x + y;
// 	}
// 	function subtract(x, y){
// 		return x - y;
// 	}
// subtractかaddを渡すと実行結果をreturnする前にそれぞれの関数結果をconsole出力する汎用的な関数logAndReturnを実装してください

function add (x, y){
	return x + y;
}
function subtract(x, y){
	return x - y;
}

//HigherOrderFunction（少々書き換えて整理した（安村））
function logAndReturn(func) {
	return function(){
		var result = func.apply(null, arguments);//渡された関数に引数を渡し実行する
		console.log(`Result:${result}`);
		return result;
	}
}

var addAndLog = logAndReturn(add);
addAndLog(4, 4); //'Result:8'
var subtractAndLog = logAndReturn(subtract);
subtractAndLog(4, 3); //'Result:1'

// 問328
// こちらの配列、[1, 2, 3, 3]で、 要素が重複しない形で返す記述をしてください 期待する値 [1, 2, 3]

// 模範解答
const arr = [1, 2, 3, 3];
const a = [...new Set(arr)];
console.log(a) //[1, 2, 3]

//spread operatorが使えない環境下で
var unique = Array.from(new Set([1,2,2,3,3,3,4,5])); // [1,2,3,4,5]

// 問329 #高度な話題
// applyのユースケースについて。このような関数があります
// //1
// function log(){
//     console.log.apply(console, arguments)
// }
// log('foo');
// と
// 
// //2
// function log(){
//     console.log(arguments);
// }
// log('foo');
// の違いを教えてください

// 模範解答

//applyを使うと適応された関数に引数として配列を渡すことができます。

//1の場合
console.log.apply(console, ['foo'])と評価され
下記が実行されます
console.log('foo')
//'foo'

//2の場合
Arguments objectをそのまま出力することになります
console.log(['foo'])を実行し、
//['foo']

//more

//e.g
var array = [10, 20, 30];
function average(){
    console.log.apply(console, arguments)
}
average(array[0], array[1], array[2]);	// 10 20 30
//↓
average.apply(null, array);//簡潔に
//or
Function.prototype.apply.call(average, null, array);//上記より安全に // （安村）安全とは？
//or
Reflect.apply(average, null, array);//上記より簡潔に
//or
average(...array);//違う方法で

// 問330
// こちらの関数
// 	function foo(x) {
// 		if (x > 10) return x + 1;
// 		var y = x / 2;
// 		if (y > 3) {
// 			if (x % 2 == 0) return x;
// 		}
// 		if (y > 1) return y;
// 		return x;
// 	}
// 	console.log(foo(2))
// 	console.log(foo(4))
// 	console.log(foo(8))
// 	console.log(foo(12))
// を実行したらそれぞれ何が返るかお答えください

// 模範解答
//2
//2
//8
//13

// 問331
// 以下の関数を実行すると
// 	function foo(a, b) {
// 		arguments[1] = 2;
// 		console.log(b);
// 	}
// 	foo(1);
// bとして出力するのは何ですか?

// 模範解答
undefined

// 問332
// 以下
// 	NaN === NaN
// 出力するのは何ですか?

// 模範解答
false

// 問333
// 
// こちらを順にお答えください。
// 
// | y                 | x                 | == | === | Object.is() |
// |-------------------|-------------------|----|-----|-------------|
// | undefined         | undefined         |    |     |             |
// | null              | null              |    |     |             |
// | true              | true              |    |     |             |
// | false             | false             |    |     |             |
// | 'foo'             | 'foo'             |    |     |             |
// | 0                 | 0                 |    |     |             |
// | +0                | -0                |    |     |             |
// | 0                 | false             |    |     |             |
// | ""                | false             |    |     |             |
// | ""                | 0                 |    |     |             |
// | '0'               | 0                 |    |     |             |
// | '17'              | 17                |    |     |             |
// | [1, 2]            | '1,2'             |    |     |             |
// | new String('foo') | 'foo'             |    |     |             |
// | null              | undefined         |    |     |             |
// | null              | false             |    |     |             |
// | undefined         | false             |    |     |             |
// | {foo: 'bar'}      | {foo: 'bar'}      |    |     |             |
// | new String('foo') | new String('foo') |    |     |             |
// | 0                 | null              |    |     |             |
// | 0                 | NaN               |    |     |             |
// | 'foo'             | NaN               |    |     |             |
// | NaN               | NaN               |    |     |             |

// →これらは覚える必要はなく、都度調べるということでOK

// 模範解答
答え

| y                 | x                 | ==    | ===   | Object.is() |
|-------------------|-------------------|-------|-------|-------------|
| undefined         | undefined         | true  | true  | true        |
| null              | null              | true  | true  | true        |
| true              | true              | true  | true  | true        |
| false             | false             | true  | true  | true        |
| 'foo'             | 'foo'             | true  | true  | true        |
| 0                 | 0                 | true  | true  | true        |
| +0                | -0                | true  | true  | false       |
| 0                 | false             | true  | false | false       |
| ""                | false             | true  | false | false       |
| ""                | 0                 | true  | false | false       |
| '0'               | 0                 | true  | false | false       |
| '17'              | 17                | true  | false | false       |
| [1, 2]            | '1,2'             | true  | false | false       |
| new String('foo') | 'foo'             | true  | false | false       |
| null              | undefined         | true  | false | false       |
| null              | false             | false | false | false       |
| undefined         | false             | false | false | false       |
| {foo: 'bar'}      | {foo: 'bar'}      | false | false | false       |
| new String('foo') | new String('foo') | false | false | false       |
| 0                 | null              | false | false | false       |
| 0                 | NaN               | false | false | false       |
| 'foo'             | NaN               | false | false | false       |
| NaN               | NaN               | false | false | true        |

// 問334
// こちら
// 	(function(){
// 	  return typeof arguments;
// 	})();
// を実行した際の返値を教えてください

// →覚える必要はなく、都度調べることができれば良い
// 調べ方: arguments が何かを調べる
(function(){
	console.log(arguments)	// Arguments [callee: ƒ, Symbol(Symbol.iterator): ƒ]	←配列ではなく、配列風オブジェクトになっている
	return typeof arguments;
})();

// 模範解答
//"object"

// 問335
// こちら
//	const arr = ["a", , "c"];
// 	const sparseKeys = Object.keys(arr);
// 	const denseKeys = [...arr.keys()];
// のsparseKeysとdenseKeysを出力した際の違いを教えてください

// →覚える必要はない、模範解答が理解できればよい

// 模範解答
const arr = ["a", , "c"];
const sparseKeys = Object.keys(arr);
const denseKeys = [...arr.keys()];
console.log(sparseKeys); // ['0', '2'] //要素はstring
console.log(denseKeys);  // [0, 1, 2]//抜けを無視しない //要素は数値

// 問336
// こちら
// 	(function() {
// 	   var a = b = 5;
// 	})();
// 	console.log(b);
// bは何を出力しますか？

// varは古いので let 変数として考える
(function() {
   let a = b = 5;
})();
console.log(b); //5

「let a = b = 5」と書いたとき、let変数として宣言しているのはa のみで、b は既存の変数を指す。
このコードでは既存の変数b は存在しないので、グローバル変数のb（window.b）とみなされる
let変数a のスコープは関数内なので関数の外から見ることはできないが、
window.b はどこからでも参照できるので、console.log(b) の結果は5 になる

次に、strictモードを使用すると変数宣言が行われていない変数へのアクセスでエラーになる。
つまり b へ代入することができなくなる

(function() {
	'use strict'
	let a = b = 5;	// ReferenceError: b is not defined
})();

strictモードで window.b へ代入したければ、以下の用に明示する必要がある

(function() {
	'use strict'
	let a = window.b = 5;
})();
console.log(b)	// 5

// 模範解答は同様なので省略

// 問337 #高度な話題
// こちら
// var f = function g(){ return 23; };
// typeof g();
// は何を返しますか？？

// 模範解答
var f = function g(){ return 23; };
typeof g(); //Uncaught ReferenceError: g is not defined

//エラーが起こります。function g(){ return 23; }は関数式で関数宣言ではありません。
この関数は実際にはfにバインドされていてgではありません。
//関数式に識別子を指定するとそれ自体使うことをスルーされます

// 問338 #高度な話題
// 下のように
// console.log('hello'.repeatify(3)); //hellohellohello.
// Stringオブジェクト上に整数値を受け取ってその数だけrepeatするrepeatify関数を定義してください。

// →模範解答のようにすることで、String を拡張することができる

// 模範解答
String.prototype.repeatify = String.prototype.repeatify || function(times) {
   let str = '';
   for (let i = 0; i < times; i++) {
      str += this;
   }
   return str;
};
console.log('hello'.repeatify(3)); //hellohellohello.

// 一行目の || の意味は、もしすでに String.prototype.repeatify が存在すればそれを使用し、無いときに限って自作の function(times){} を採用するという意味
// String.prototype.repeatify = String.prototype.repeatify || function(times) {

// 問339 #古い話題
// 下のコードは
//	function test() {
// 		console.log(a);
// 		console.log(foo());
// 		var a = 1;
// 		function foo() {
// 			return 2;
// 		}
// 	}
// test();
// 何を出力しますか。またどうしてですか？

// 模範解答

//undefined
//2

//変数と関数は巻き上げられます(関数の上部に移動します。hoisted)
//ただ変数はどんな割り当ても保持しません。
//function内には存在するが状態はundefinedです。

//問題のコードは下記と同じです
function test() {
   var a;
   function foo() {
      return 2;
   }

   console.log(a);//undefined
   console.log(foo());//2

   a = 1;
}
test();

// 問340
// 下記コードは
// ※ var変数をlet変数に入れ替えている（安村）
// window.fullname = 'John Doe';
// let obj = {
// 	fullname: 'Colin Ihrig',
// 	prop: {
// 		fullname: 'Aurelio De Rosa',
// 		getFullname: function() {
// 			return this.fullname;
// 		}
// 	}
// };
// console.log(obj.prop.getFullname());
// let test = obj.prop.getFullname;
// console.log(test());
// // 何を出力しますか

// →this が何に束縛されるかを問う問題

// 模範解答
//Aurelio De Rosa
//John Doe

// 問341 #高度な話題 #高階感数
// 第一引数で受け取った数値に3を足して返す関数add3を第一引数に渡すとfを2回繰り返す関数twice。
// twice(add3, 7);
// 初期値として7をtwiceの第二引数に渡し、13を出力してください。

// →問題文がややこしいが、模範回答が理解できればOK

// 模範解答
function add3(v){
	return v + 3
}
function twice(f, v){
	return f(f(v))
}
console.log(twice(add3, 7)) //13

// 問342
// こちらの
// logStuff({name: 'morita', job: engineer}, log);
// を実行したら
// //name morita
// //job engineer
// と出力する関数logStuffを実装してください。
// また、第二引数として渡すlogはlogStuffの第一引数のkey,valueを出力するコールバック関数です。
// objはlogStuffの中でString型かObject型かチェックしてください。

function logStuff(obj, log){
	if(typeof obj === "string"){
		log(obj)
	}else{
		for(const key in obj){
			log(key, obj[key])
		}
	}
}
logStuff({ name: 'morita', job: 'engineer' }, console.log)
	// name morita
	// job engineer
logStuff("hello", console.log)
	// hello

// 模範解答 問題文の解釈が異なり、少々異なるコードだ	// 個人的には↑のコードの仕様でいいと思う

// var arr = [];		// 使用していないようなのでコメントアウト
function log(obj){
	if (typeof obj === 'string'){
		console.log(obj);
	} else if (typeof obj === 'object'){
		Object.keys(obj).map(function(el, i){
			console.log(`${el} ${obj[el]}`)
		})
	}
}
function logStuff(obj, callback){
	// arr.push(obj);		// 使用していないようなのでコメントアウト
	callback(obj);
}
logStuff({name: 'morita', job: 'engineer'}, log);
logStuff({name: 'morita', job: 'engineer'}, log);

// 問343
// 問342のlogStuffについて、第二引数で渡したcallbackの型をチェックしてFunctionだったら実行するようにしてください

// 問342の安村の回答をもとにしている
function logStuff(obj, log){
	log = typeof log === "function" ? log : console.log	// 追加
	if(typeof obj === "string"){
		log(obj)
	}else{
		for(const key in obj){
			log(key, obj[key])
		}
	}
}
logStuff({ name: 'morita', job: 'engineer' }, console.log)
	// name morita
	// job engineer
logStuff({ name: 'morita', job: 'engineer' })
	// name morita
	// job engineer

// 模範回答はなし

// 問344 #高度な話題
// こちらの
// var clientData = {
// 	id: 094545,
// 	fullName: "Not Set",
// 	setUserName: function (firstName, lastName)  {
// 		this.fullName = firstName + " " + lastName;
// 	}
// }
// function getUserInput(firstName, lastName, callback)  {
// 	callback (firstName, lastName);
// }
// getUserInput('kenji', 'morita', clientData.setUserName);
// console.log(clientData.fullName) //"Not Set"
// 渡した値がfullNameにセットされて出力するようにしてください。

// →callback 呼び出し時に適切なオブジェクトが this に束縛されていない
//   したがって関数呼び出しとともに this を束縛することのできる apply を使用する

// 模範解答
var clientData = {
	id: 094545,
	fullName: "Not Set",
	setUserName: function (firstName, lastName)  {
		this.fullName = firstName + " " + lastName;
	}
}
function getUserInput(firstName, lastName, callback, callbackObj)  {
	callback.apply(callbackObj, [firstName, lastName]);
}
getUserInput('kenji', 'morita', clientData.setUserName, clientData);
console.log(clientData.fullName) //kenji morita

// 問345 #高度な話題
// こちら
// 	var greet = function(greeting, name){
// 		console.log(greeting, name);
// 	}
// 	greet('Hello', 'kenji')	//  Hello kenji
// greetをCurry化してgreetHello('kenji')を実行すると 同じ出力になるようにしてください

// カリー化とは、２引数を必要とする関数の第一引数を先に束縛しておいて、残りの第二引数をひとつだけとる関数にすることを指す

// 模範解答
var greetCurried = function(greeting){
	return function(name){
		console.log(`${greeting} ${name}`)
	}
}
var greetHello = greetCurried('Hello')
greetHello('kenji') //Hello kenji

// 問346 #高度な話題
// こちら
// var greetAwkwardly = greetDeeplyCurried("Hello")("...")("?");
// greetAwkwardly("kenji");
// を実行した際に
// //Hello...kenji?
// が出力されるようにgreetDeeplyCurriedを実装してください

// 模範解答
var greetDeeplyCurried = function(greeting){
	return function(spread){
		return function(empasis){
			return function(name){
				console.log(`${greeting}${spread}${name}${empasis}`);
			}
		}
	}
}
var greetAwkwardly = greetDeeplyCurried('Hello')('...')('?');
greetAwkwardly('kenji') //Hello...kenji?

// 問347
// 文字列が'He'から始まる場合trueになる評価をしてください
// ex
// 'Hello World' //true
// 'Goodby World' //false

// 模範解答
console.log('Hello World'.startsWith('He'))
console.log('Goodby World'.startsWith('He'))

//other
console.log(/^He/.test('Hello world')) //true

// 問348
// 'mystring#' という文字列があります。最後の文字が#の場合trueになる評価をしてください

// 模範解答
let str = "mystring#";
console.log(str.endsWith("#")) //true

//other
let str = "mystring#";
console.log(/#$/.test(str)) //true

// 問349
// 引数に文字列を渡すとその最初の文字を大文字にして返す関数を実装してください

// 模範解答
function capitalizeFirstLetter(string) {
	return string.charAt(0).toUpperCase() + string.slice(1);
}

console.log( capitalizeFirstLetter("morita") ) //"Morita"

// 問350 #高度な話題
// prototype と __proto__ の違いを説明してください

// 模範解答

・prototype・・・Functionオブジェクトだけがもつプロパティ。参照先はオブジェクト。
・__proto__・・・全てのオブジェクトが持つ内部プロパティ。プロトタイプチェーン。暗黙の参照(自身のプロパティになければこの__proto__先を辿ること)を実現する内部で実装されているプロパティ。

newして生成されたインスタンスの__proto__にコンストラクタのprototypeオブジェクトが代入される

function F(){
	this.name = '';//1
}
F.prototype.y = function(){} //2

let f = new F(); //f.__proto__ = F.prototype //

console.log(f.__proto__ === F.prototype) //true

F自体の__proto__には空の関数が入っている
console.log(F.__proto__) //function () { [native code] }

//yが自身のpropertyかどうかチェック
console.log( F.hasOwnProperty('y') ) //false
console.log( F.prototype.hasOwnProperty('y') ) //2でprototypeに代入しているため //true

//newした結果、インスタンスfは自身の参照リンクを辿った先のprototypeオブジェクトが持つyを見ることができる
console.log( f.y === f.__proto__.y ) //true

console.log( f.hasOwnProperty('y') ) //f自身はyを持たない //false
console.log( f.hasOwnProperty('name') ) //自身にnameをもつ //2 //true

//Arrayの場合
var arry = [];
console.log( arry.__proto__ === Array.prototype ) //true
console.log( arry.__proto__ === [].__proto__ ) //true
console.log( arry.hasOwnProperty('pop') ) //参照リンク先のオブジェクトprototypeが持つメソッド //false

//more
//こちらのコンストラクタが実行された際に何が起きているか
function A (name){
	this.name = name;
}

//Aのプロパティにprototypeが追加される
//prototypeプロパティはオブジェクトで、以下の2つのプロパティをもつ
//- constructor
//- __proto__

console.log( A.prototype )
//constructor:function a(name)
//__proto__:Object

constructorは何もないがそれ自体内部に__proto__を持ち、その参照先はJavaScriptのルートオブジェクトであるObject。

//Aをnewした時に何が起きるか

let b = new A('JavaScript');
//4つのことが起こる
// 1. 新しい空のオブジェクト{}が生成される
// 2. b上に__proto__が作られ、それはA.prototypeを参照するようになる。なのでb.__proto__ === A.prototype
// 3. 上記1で生成されたオブジェクトをthisコンテキストとして、A.prototype.constructorを実行します。したがってnameプロパティは新しく作成されたオブジェクトに追加されます。
// 4. 作成されたオブジェクトを返します。let bは新しいオブジェクトが割り当てられます。

//もしA.prototype.car = 'BMW'として、b.carとすると" BMW"をアウトプットします
//JavaScriptはb上のプロパティcarを探し、見つからなければ上記2で作成されたb.__proto__(A.prototype)を参照し、A.prototypeにあるcarプロパティ値を返すためです。

