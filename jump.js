"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));



let jump = [
  { id:1, title:"ワンピース", start_year:1997, author:"尾田栄一郎", status:"連載中", genre:"冒険" },
  { id:2, title:"僕のヒーローアカデミア", start_year:2014, author:"堀越耕平", status:"連載中", genre:"バトル" },
  { id:3, title:"呪術廻戦", start_year:2018, author:"芥見下々", status:"連載中", genre:"ダークファンタジー" },
  { id:4, title:"チェンソーマン", start_year:2018, author:"藤本タツキ", status:"連載終了", genre:"アクション" },
  { id:5, title:"ワールドトリガー", start_year:2013, author:"葦原大介", status:"連載中", genre:"SF" },
  { id:6, title:"ブラッククローバー", start_year:2015, author:"田畠裕基", status:"連載終了", genre:"ファンタジー" },

];

// 一覧
app.get("/jump", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('jump', {data: jump} );
});

// Create
app.get("/jump/create", (req, res) => {
  res.redirect('/public/jump.html');
});

// Read
app.get("/jump/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = jump[ number ];
  res.render('jump_detail', {id: number, data: detail} );
});

// Delete
app.get("/jump/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  jump.splice( req.params.number, 1 );
  res.redirect('/jump' );
});

// Create
app.post("/jump", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = jump.length + 1;
  const title = req.body.title;
  const start_year = req.body.start_year;
  const author = req.body.author;
  const status = req.body.status;
  const genre = req.body.genre;
  jump.push({ id, title, start_year, author, status, genre });
  console.log( jump );
  res.render('jump', {data: jump} );
});

// Edit
app.get("/jump/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = jump[ number ];
  res.render('jump_edit', {id: number, data: detail} );
});

// Update
app.post("/jump/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  
  jump[req.params.number].title = req.body.title;
  jump[req.params.number].start_year = req.body.start_year;
  jump[req.params.number].author = req.body.author;
  jump[req.params.number].status = req.body.status;
  jump[req.params.number].genre = req.body.genre;

  
  console.log( jump );
  res.redirect('/jump' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));


