"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let ramen = [
  { id: 1, name: "一蘭", location: "渋谷駅周辺", genre: "とんこつ" },
  { id: 2, name: "天下一品", location: "新宿駅周辺", genre: "こってり" },
  { id: 3, name: "吉村家", location: "横浜", genre: "家系" },
  // 他の店舗も追加可能
];


// 一覧
app.get("/ramen", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('ramen', {data: ramen} );
});

// Create
app.get("/ramen/create", (req, res) => {
  res.redirect('/public/ramen.html');
});

// Read
app.get("/ramen/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = ramen[ number ];
  res.render('ramen_detail', {id: number, data: detail} );
});

// Delete
app.get("/ramen/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  ramen.splice( req.params.number, 1 );
  res.redirect('/ramen' );
});

// Create
app.post("/ramen", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = ramen.length + 1;
  const name = req.body.name;
  const location = req.body.location;
  const genre = req.body.genre;
  ramen.push({ id, name, location, genre });
  console.log( ramen );
  res.render('ramen', {data: ramen} );
});

// Edit
app.get("/ramen/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = ramen[ number ];
  res.render('ramen_edit', {id: number, data: detail} );
});

// Update
app.post("/ramen/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  
  ramen[req.params.number].name = req.body.name;
  ramen[req.params.number].location = req.body.location;
  ramen[req.params.number].genre = req.body.genre;
  

  
  console.log( ramen );
  res.redirect('/ramen' );
});

app.listen(8080, () => console.log("Example app listening on port 8080!"));
