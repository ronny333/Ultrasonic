/*var gpio = require('rpi-gpio');
 
gpio.setup(32, gpio.DIR_IN, read);

function read() {
    //gpio.write(12, false, function(err) {
      //  if (err) throw err;
     //   console.log('Written to pin');
    //});
	
	//gpio.setup(12, gpio.DIR_IN, readInput);
gpio.read(32, function(err, value) {
        console.log('The value is ' + value);
});
}
*/

var Gpio = require('onoff').Gpio,
    led = new Gpio(12, 'out');
 
var iv = setInterval(function(){
	console.log('value is'+led.readSync())
	
}, 500);
 


 
