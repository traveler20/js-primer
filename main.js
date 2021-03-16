// console.log("Hello World!");

// // # コマンドライン引数を処理する
// // コンソールにコマンドライン引数を出力
// console.log(process.argv);

// // my-module.jsモジュールをmyModuleオブジェクトとしてインポートする。
// const myModule = require("./my-module");
// console.log(myModule.foo); // => "foo"

// // commanderモジュールをprogramオブジェクトとしてインポートする
// const program = require("commander");
// // コマンドライン引数をパースする
// program.parse(process.argv);

// // ファイルパスをprogram.args配列から取り出す
// const filePath = program.args[0];
// console.log(filePath);

// # ファイルを読み込む
// const program = require("commander");
// // fsモジュールをfsオブジェクトとしてインポートする
// const fs = require("fs");
// // markedモジュールをmarkedオブジェクトとしてインポートする
// const marked = require("marked");

// // コマンドライン引数からファイルパスを取得する
// program.parse(process.argv);
// const filePath = program.args[0];

// // ファイルを非同期で読み込む
// fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
// 	if (err) {
// 		console.error(err.message);
// 		// 終了ステータス 1（一般的なエラー）としてプロセスを終了する
// 		process.exit(1);
// 		return;
// 	}
// 	console.log(file);
// });

// # MarkdowmをHTMLに変換する
const program = require("commander");
const fs = require("fs");
const marked = require("marked");

// gfmオプションを定義する
program.option("--gfm", "GFMを有効にする");
program.parse(process.argv);
const filePath = program.args[0];

// コマンドライン引数のオプションを取得し、デフォルトのオプションを上書きする
const cliOptions = {
	gfm: false,
	...program.opts(),
};

fs.readFile(filePath, { encoding: "utf8" }, (err, file) => {
	if (err) {
		console.error(err.message);
		process.exit(1);
		return;
	}
	const html = marked(file, {
		// オプションの値を使用する
		gfm: cliOptions.gfm,
	});
	console.log(html);
});
