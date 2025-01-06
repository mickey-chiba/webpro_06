"use strict";
const express = require("express");
const app = express();

let bbs = [];  // 本来はDBMSを使用するが，今回はこの変数にデータを蓄える

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

app.get("/hello1", (req, res) => {
  const message1 = "Hello world";
  const message2 = "Bon jour";
  res.render('show', { greet1:message1, greet2:message2});
});

app.get("/hello2", (req, res) => {
  res.render('show', { greet1:"Hello world", greet2:"Bon jour"});
});

app.get("/icon", (req, res) => {
  res.render('icon', { filename:"./public/Apple_logo_black.svg", alt:"Apple Logo"});
});

app.get("/luck", (req, res) => {
  const num = Math.floor( Math.random() * 6 + 1 );
  let luck = '';
  if( num==1 ) luck = '大吉';
  else if( num==2 ) luck = '中吉';
  console.log( 'あなたの運勢は' + luck + 'です' );
  res.render( 'luck', {number:num, luck:luck} );
});

app.get("/janken", (req, res) => {
  let hand = req.query.hand;
  let win = Number( req.query.win );
  let total = Number( req.query.total );
  console.log( {hand, win, total});
  const num = Math.floor( Math.random() * 3 + 1 );
  let cpu = '';
  if( num==1 ) cpu = 'グー';
  else if( num==2 ) cpu = 'チョキ';
  else cpu = 'パー';
  // ここに勝敗の判定を入れる
  // 今はダミーで人間の勝ちにしておく
  let judgement = '勝ち';
  win += 1;
  total += 1;
  const display = {
    your: hand,
    cpu: cpu,
    judgement: judgement,
    win: win,
    total: total
  }
  res.render( 'janken', display );
});

app.get("/get_test", (req, res) => {
  res.json({
    answer: 0
  })
});

app.get("/add", (req, res) => {
  console.log("GET");
  console.log( req.query );
  const num1 = Number( req.query.num1 );
  const num2 = Number( req.query.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

app.post("/add", (req, res) => {
  console.log("POST");
  console.log( req.body );
  const num1 = Number( req.body.num1 );
  const num2 = Number( req.body.num2 );
  console.log( num1 );
  console.log( num2 );
  res.json( {answer: num1+num2} );
});

// これより下はBBS関係
app.post("/check", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  res.json( {number: bbs.length });
});

app.post("/read", (req, res) => {
  // 本来はここでDBMSに問い合わせる
  const start = Number( req.body.start );
  console.log( "read -> " + start );
  if( start==0 ) res.json( {messages: bbs });
  else res.json( {messages: bbs.slice( start )});
});

app.post("/post", (req, res) => {
  const name = req.body.name;
  const message = req.body.message;
  console.log( [name, message] );
  // 本来はここでDBMSに保存する
  bbs.push( { name: name, message: message } );
  res.json( {number: bbs.length } );
});

//投稿削除
app.post("/delete", (req, res) => {
  const index = Number(req.body.index);  
  console.log("delete -> " + index);
  
  if (index >= 0 && index < bbs.length) {
    bbs.splice(index, 1);  
    res.json({ success: true, number: bbs.length });
  } else {
    res.json({ success: false, message: "Invalid index" });
  }
});
// メッセージ表示と削除ボタンの生成
async function loadMessages() {
  const response = await fetch('http://localhost:8080/read', {
    method: 'POST',
    body: JSON.stringify({ start: 0 }),
    headers: {
      'Content-Type': 'application/json'
    }
  });

  const data = await response.json();
  const bbsDiv = document.getElementById('bbs');
  bbsDiv.innerHTML = ''; // 既存のメッセージをクリア

  data.messages.forEach((message, index) => {
    // メッセージと削除ボタンを表示
    const messageDiv = document.createElement('div');
    messageDiv.innerHTML = `
      <strong>${message.name}</strong>: ${message.message} 
      <button onclick="deletePost(${index})">削除</button>
    `;
    bbsDiv.appendChild(messageDiv);
  });
}

// 投稿削除処理
async function deletePost(index) {
  const response = await fetch('http://localhost:8080/delete', {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json'
    },
    body: JSON.stringify({ index: index })
  });

  const data = await response.json();

  if (data.success) {
    alert("投稿が削除されました！");
    loadMessages();  // 削除後にメッセージを再読み込み
  } else {
    alert("削除に失敗しました: " + data.message);
  }
}


app.listen(8080, () => console.log("Example app listening on port 8080!"));
