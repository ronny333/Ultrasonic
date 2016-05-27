var express = require("express");
var bodyParser = require("body-parser");
var app = express();

var MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',function(req,res){
res.sendfile("jqeurylogin.html");
});

app.post('/login',function(req,res){
var user_name=req.body.user;
var password1=req.body.password;
console.log(user_name);
MongoClient.connect('mongodb://10.66.30.78:27017/parking',
function(err,db){
if (err) throw err;
var cursor=db.collection('users').find({Name:user_name,password:password1});
cursor.limit(1);
var rc=0
cursor.each(function(err,doc) {
if(err) throw err;
if(doc !=null) {
rc=rc+1
console.log(user_name+" logged successfully");
}
else {
db.close();
if(rc==0)
{console.log(user_name+" Invalid user");}
}
});
});
//console.log("values posted")
res.end("yes");
});

app.listen(3000,function(){
console.log("started on port 3000")
});

