/**
 * myapi.js
 * 
 * @version 1.1 - updated for Express 4.x : April 2015
 *
 * 
 * DESCRIPTION:
 * a "HELLO WORLD" server-side application to demonstrate running a node 
 * API Appserver on a Raspberry Pi to access IOs
 * Uses the Express node packages. 
 * 
 * 
 * @throws none
 * @see nodejs.org
 * @see express.org
 * 
 * @author Robert Drummond
 * (C) 2013 PINK PELICAN NZ LTD
 */

var http      = require('http');
var express   = require('express');
var router = express.Router();              // get an instance of the express Router
var app       = express();
var fs 		  = require('fs');
var bodyParser     =        require("body-parser");
app.use(bodyParser.urlencoded({ extended: false }));

app.use(bodyParser.json());


var Gpio = require('onoff').Gpio;
    


// dummy input port values for our example
var inputs = [    { pin: '32', gpio: '12', value: 0 },
                 // { pin: '12', gpio: '18', value: 1 },
				  
                ];
var led = new Gpio(12, 'out');
// ------------------------------------------------------------------------
// configure Express to serve index.html and any other static pages stored 
// in the home directory
app.use(express.static(__dirname));

// Express route for incoming requests for a single input
app.get('/inputs/:id', function (req, res) {
  // send an object as a JSON string
  console.log('id = ' + req.params.id);
  console.log('value is'+led.readSync());
  
  res.send(inputs[req.params.id]);
}); // apt.get()

// Express route for incoming requests for a list of all inputs
app.get('/inputs', function (req, res) {
  // send an object as a JSON string
  console.log('all inputs');
  res.status(200).send(inputs);
}); // apt.get()


// Express route for any other unrecognised incoming requests
app.get('*', function (req, res) {
  res.status(404).send('Unrecognised API call');
});

/*app.put('/inputs/:id', function (req, res) {
  console.log("write : "+res.value);
  res.send('Got a PUT request at /inputs/id');
});
*/
app.post('/inputs/0',function(req,res){ 
  var pin=req.body.pin;
  var gpio=req.body.gpio;
  var value=req.body.value;
  console.log(req.body);
  var obj = {pin: pin, gpio: gpio, value: value};
  var testObj = inputs.filter(function(el){
                  return obj.pin === el.pin
  })[0];
  if((typeof testObj !== 'undefined')) {
                  testObj.value = obj.value
  } else {
                  inputs.push(obj);
  }
  
  //console.log(req.body);
  
  res.end("yes");
});

// Express route to handle errors
app.use(function (err, req, res, next) {
  if (req.xhr) {
    res.status(500).send('Oops, Something went wrong!');
  } else {
    next(err);
  }
}); // apt.use()

// ------------------------------------------------------------------------
// Start Express App Server
//
app.listen(3000);
console.log('App Server is listening on port 3000');