//writefile機能でデータの書き込み
const fs = require('fs');

const express = require("express");

const app = express();

//<form>から投稿されたデータの中身を解析するための必要なコード
app.use(express.urlencoded({extended:true}));

const activities = require("./activities.json");

//GETリクエストのひな型コード
app.get("/",function(reqest,response){

  response.sendFile(__dirname + "/index.html");

});

app.post("/autumn",function(request,response){

  fs.writeFile(__dirname + "/data.txt",request.body.activity,function(){
    response.send("投稿完了");
  });

});

app.post("/update",function(request,response){

  activities[0].activity = request.body.updatedActivity;
  response.send(activities);
  
})

app.post("/delete",function(request,response){
  activities.splice(request.body.number,1);
  response.send(activities);
});

const port = process.env.PORT || 5000;

//バックエンドサーバーとブラウザとをつなぐ働きをするコード
app.listen(port,function(){
  console.log('Listening on ${port}');
});