"use strict";
const express = require("express");
const app = express();

app.set('view engine', 'ejs');
app.use("/public", express.static(__dirname + "/public"));
app.use(express.urlencoded({ extended: true }));

let nbateam = [
  { id: 1, name: "Atlanta Hawks", conference: "East", year: 1946, championships: 1 },
  { id: 2, name: "Boston Celtics", conference: "East", year: 1946, championships: 17 },
  { id: 3, name: "Brooklyn Nets", conference: "East", year: 1967, championships: 0 },
  { id: 4, name: "Charlotte Hornets", conference: "East", year: 1988, championships: 0 },
  { id: 5, name: "Chicago Bulls", conference: "East", year: 1966, championships: 6 },
  { id: 6, name: "Cleveland Cavaliers", conference: "East", year: 1970, championships: 1 },
  { id: 7, name: "Dallas Mavericks", conference: "West", year: 1980, championships: 1 },
  { id: 8, name: "Denver Nuggets", conference: "West", year: 1967, championships: 0 },
  { id: 9, name: "Detroit Pistons", conference: "East", year: 1941, championships: 3 },
  { id: 10, name: "Golden State Warriors", conference: "West", year: 1946, championships: 7 },
  { id: 11, name: "Houston Rockets", conference: "West", year: 1967, championships: 2 },
  { id: 12, name: "Indiana Pacers", conference: "East", year: 1967, championships: 0 },
  { id: 13, name: "LA Clippers", conference: "West", year: 1970, championships: 0 },
  { id: 14, name: "Los Angeles Lakers", conference: "West", year: 1947, championships: 17 },
  { id: 15, name: "Memphis Grizzlies", conference: "West", year: 1995, championships: 0 },
  { id: 16, name: "Miami Heat", conference: "East", year: 1988, championships: 3 },
  { id: 17, name: "Milwaukee Bucks", conference: "East", year: 1968, championships: 2 },
  { id: 18, name: "Minnesota Timberwolves", conference: "West", year: 1989, championships: 0 },
  { id: 19, name: "New Orleans Pelicans", conference: "West", year: 2002, championships: 0 },
  { id: 20, name: "New York Knicks", conference: "East", year: 1946, championships: 2 },
  { id: 21, name: "Oklahoma City Thunder", conference: "West", year: 1967, championships: 1 },
  { id: 22, name: "Orlando Magic", conference: "East", year: 1989, championships: 0 },
  { id: 23, name: "Philadelphia 76ers", conference: "East", year: 1946, championships: 3 },
  { id: 24, name: "Phoenix Suns", conference: "West", year: 1968, championships: 0 },
  { id: 25, name: "Portland Trail Blazers", conference: "West", year: 1970, championships: 1 },
  { id: 26, name: "Sacramento Kings", conference: "West", year: 1945, championships: 1 },
  { id: 27, name: "San Antonio Spurs", conference: "West", year: 1967, championships: 5 },
  { id: 28, name: "Toronto Raptors", conference: "East", year: 1995, championships: 1 },
  { id: 29, name: "Utah Jazz", conference: "West", year: 1974, championships: 0 },
  { id: 30, name: "Washington Wizards", conference: "East", year: 1961, championships: 1 }
];



app.get("/nba", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  res.render('nba', {data: nbateam} );
});

// Create
app.get("/nba/create", (req, res) => {
  res.redirect('/public/nba.html');
});

// Read
app.get("/nba/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = nbateam[ number ];
  res.render('nba_detail', {id: number, data: detail} );
});

// Delete
app.get("/nba/delete/:number", (req, res) => {
  // 本来は削除の確認ページを表示する
  // 本来は削除する番号が存在するか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  nbateam.splice( req.params.number, 1 );
  res.redirect('/nba' );
});

// Create
app.post("/nba", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const id = nbateam.length + 1;
  const name = req.body.name;
  const conference = req.body.conference;
  const championships= req.body.championships;
  const year = req.body.year;
  nbateam.push( { id: id, name: name, conference: conference,championships: championships,year: year} );
  console.log( nbateam );
  res.render('nba', {data: nbateam} );
});

// Edit
app.get("/nba/edit/:number", (req, res) => {
  // 本来ならここにDBとのやり取りが入る
  const number = req.params.number;
  const detail = nbateam[ number ];
  res.render('nba_edit', {id: number, data: detail} );
});

app.post("/nba/update/:number", (req, res) => {
  // 本来は変更する番号が存在するか，各項目が正しいか厳重にチェックする
  // 本来ならここにDBとのやり取りが入る
  nbateam[req.params.number].name = req.body.name;
  nbateam[req.params.number].year = req.body.year;
  nbateam[req.params.number].conference = req.body.conference;
  nbateam[req.params.number].championships = req.body.championships
  console.log( nbateam );
  res.redirect('/nba' );
});



app.listen(8080, () => console.log("Example app listening on port 8080!"));
