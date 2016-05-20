var gpio = require("pi-gpio");

var intervalId;
var durationId;
var gpioPin = 12;

gpio.open(gpioPin, "output", function (err) {

if(err)
{
//console.log(err);
}
    var on =1 ;
    console.log("GPIO pin "+gpioPin+" is open toggling LED every 100mS for 10s");

    intervalId = setInterval( function () {
        gpio.write(gpioPin, on, function () {
            on = (on  + 1)% 2;
        }); 
    }, 100);
});

    durationId = setTimeout (function () {
        clearInterval(intervalId);
        clearTimeout(durationId);
        console.log('10 seconds blinking completed');
        gpio.write(gpioPin, 0, function () {
            gpio.close(gpioPin);
        //process.exit(0);  
    }); 
}, 10000);
