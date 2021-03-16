// console.log("index.js:loaded");

// // CSSセレクタを使ってDOMツリー中のh2要素を取得する
// const heading = document.querySelector("h2");
// // h2要素に含まれるテキストコンテンツを取得する
// const headingText = heading.textContent;

// // button要素を作成する
// const button = document.createElement("button");
// button.textContent = "Push Me";
// // body要素の子要素としてbuttonを挿入する
// document.body.appendChild(button);

// #HTTP通信
// FetchAPI
// const userId = "任意のGitHubユーザーID";
// fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`);

// レスポンスの受け取り
// const userId = "js-primer-example";

// function fetchUserInfo(userId) {
// 	fetch(`https://api.github.com/users/${encodeURIComponent(userId)}`)
// 		.then((response) => {
// 			console.log(response.status); // => 200
// 			// エラーレスポンスが返されたことを検知する
// 			if (!response.ok) {
// 				console.error("エラーレスポンス", response);
// 			} else {
// 				return response.json().then((userInfo) => {
// 					// #データを表示する
// 					const view = `
//                     <h4>${userInfo.name} (@${userInfo.login})</h4>
//                     <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
//                     <dl>
//                         <dt>Location</dt>
//                         <dd>${userInfo.location}</dd>
//                         <dt>Repositories</dt>
//                         <dd>${userInfo.public_repos}</dd>
//                     </dl>
//                     `;
// 					// html 挿入
// 					const result = document.getElementById("result");
// 					result.innerHTML = view;
// 				});
// 			}
// 		})
// 		.catch((error) => {
// 			console.error(error);
// 		});
// }
// // HTML escape
// function escapeSpecialChars(str) {
// 	return str
// 		.replace(/&/g, "&amp;")
// 		.replace(/</g, "&lt;")
// 		.replace(/>/g, "&gt;")
// 		.replace(/"/g, "&quot;")
// 		.replace(/'/g, "&#039;");
// }
// function escapeHTML(strings, ...values) {
// 	return strings.reduce((result, str, i) => {
// 		const value = values[i - 1];
// 		if (typeof value === "string") {
// 			return result + escapeSpecialChars(value) + str;
// 		} else {
// 			return result + String(value) + str;
// 		}
// 	});
// }

// #promiseを活用する
// function main() {
// 	fetchUserInfo("js-primer-example").catch((error) => {
// 		// promiseチェーンの中で発生したエラーを受け取る
// 		console.error("error is occured (${error})");
// 	});
// }
// function fetchUserInfo(userId) {
// 	// fetchの返り値のPromiseをreturnする
// 	return fetch(
// 		`https://api.github.com/users/${encodeURIComponent(userId)}`
// 	).then((response) => {
// 		if (!response.ok) {
// 			// エラーレスポンスからRejectedなPromiseを作成して返す
// 			return Promise.reject(
// 				new Error(`${response.status}: ${response.statusText}`)
// 			);
// 		} else {
// 			return response.json().then((userInfo) => {
// 				// HTMLの組み立て
// 				const view = createView(userInfo);
// 				// HTMLの挿入
// 				displayView(view);
// 			});
// 		}
// 	});
// }

//Promise refucturing
// function main() {
// 	fetchUserInfo("js-primer-example")
// 		// ここではJSONオブジェクトで解決されるPromise
// 		.then((userInfo) => createView(userInfo))
// 		// ここではHTML文字列で解決されるPromise
// 		.then((view) => displayView(view))
// 		// Promiseチェーンでエラーがあった場合はキャッチされる
// 		.catch((error) => {
// 			console.error(`エラーが発生しました (${error})`);
// 		});
// }
// function fetchUserInfo(userId) {
// 	return fetch(
// 		`https://api.github.com/users/${encodeURIComponent(userId)}`
// 	).then((response) => {
// 		if (!response.ok) {
// 			return Promise.reject(
// 				new Error(`${response.status}: ${response.statusText}`)
// 			);
// 		} else {
// 			// JSONオブジェクトで解決されるPromiseを返す
// 			return response.json();
// 		}
// 	});
// }

// UserID can changed
async function main() {
	try {
		const userId = getUserId();
		const userInfo = await fetchUserInfo(userId);
		const view = createView(userInfo);
		displayView(view);
	} catch (error) {
		console.error(`エラーが発生しました (${error})`);
	}
}

function fetchUserInfo(userId) {
	return fetch(
		`https://api.github.com/users/${encodeURIComponent(userId)}`
	).then((response) => {
		if (!response.ok) {
			return Promise.reject(
				new Error(`${response.status}: ${response.statusText}`)
			);
		} else {
			return response.json();
		}
	});
}

function getUserId() {
	return document.getElementById("userId").value;
}

function createView(userInfo) {
	return escapeHTML`
    <h4>${userInfo.name} (@${userInfo.login})</h4>
    <img src="${userInfo.avatar_url}" alt="${userInfo.login}" height="100">
    <dl>
        <dt>Location</dt>
        <dd>${userInfo.location}</dd>
        <dt>Repositories</dt>
        <dd>${userInfo.public_repos}</dd>
    </dl>
    `;
}

function displayView(view) {
	const result = document.getElementById("result");
	result.innerHTML = view;
}

function escapeSpecialChars(str) {
	return str
		.replace(/&/g, "&amp;")
		.replace(/</g, "&lt;")
		.replace(/>/g, "&gt;")
		.replace(/"/g, "&quot;")
		.replace(/'/g, "&#039;");
}

function escapeHTML(strings, ...values) {
	return strings.reduce((result, str, i) => {
		const value = values[i - 1];
		if (typeof value === "string") {
			return result + escapeSpecialChars(value) + str;
		} else {
			return result + String(value) + str;
		}
	});
}
