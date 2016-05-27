var express = require("express");
var bodyParser = require("body-parser");
var dialog = require('dialog');
var app = express();

var MongoClient = require('mongodb').MongoClient;


app.use(bodyParser.urlencoded({extended: false}));
app.use(bodyParser.json());


app.get('/',function(req,res){
res.sendFile(__dirname +"/temp.html");
});

app.post('/login',function(req,res){
var user_name=req.body.user;
var password1=req.body.password;
console.log(user_name);
console.log(password1);
MongoClient.connect('mongodb://localhost:27017/parking',
function(err,db){
if (err) throw err;
console.log("Connected to Database");
var cursor=db.collection('parking').find({Name:user_name,Password:password1});

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
app.post('/register',function(req,res){
	var user_name=req.body.user;
var password1=req.body.password;
console.log(user_name);
console.log(password1);
MongoClient.connect('mongodb://localhost:27017/parking',function(err,db){
if (err) throw err;
console.log("Connected to Database");
var cursor=db.collection('parking').find({Name:user_name}).count();
if(cursor==0)
{


	var document = {Name:user_name, Password:password1};
  
	//insert record
	db.collection('parking').insert(document, function(err, records) {
		if (err) throw err;
		console.log("Record added as ");
		//res.send(500,'showAlert'); 
		dialog.info('Record added');
	});
	}
	else
	{
	console.log("User already registerd");
	dialog.info('User already there');
	}
	});
	
	
});


app.listen(3000,function(){
console.log("started on port 3000")
});

