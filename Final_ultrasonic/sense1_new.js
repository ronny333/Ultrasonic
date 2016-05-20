var statistics = require('math-statistics');
var usonic = require('r-pi-usonic');
var gpio = require('pi-gpio');

var init = function(config) {
    var sensor = usonic.createSensor(config.echoPin, config.triggerPin, config.timeout);
    //console.log(config);
    var distances;
 
    (function measure() {
        if (!distances || distances.length === config.rate) {
            if (distances) {
                print(distances);
            }
 
            distances = [];
        }
 
        setTimeout(function() {
            distances.push(sensor());
 
            measure();
        }, config.delay);
    }());
};
 
var print = function(distances) {
    var distance = statistics.median(distances);
//gpio.setup(12, gpio.DIR_OUT, write);
gpio.open(12, "output", function(err) {// Open pin 12 for output 
	if(err)
	{
		console.log('Error in opening pin..\n');
	}
	gpio.write(12, 1, function() {			// Set pin 12 high (1) 
		console.log('Written to pin');
		//gpio.close(12);						// Close pin 12 
	});
});
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
 
    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
	if(distance < 20){
		gpio.read(12, function(err, value){
			if(err) throw err;
			console.log('sooooo value :'+value);	// The current state of the pin 
			gpio.close(12);		
		});
	process.stdout.write('Distance < 20.\n');
	}
	else{
		process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm'+'\n');
		gpio.close(12);
}    
	
}
};
usonic.init(function (error) {
                        if (error) {
                            console.log(error);
                        } else {
                            init({
                                echoPin: 24,
                                triggerPin: 23,
                                timeout: 1000,
                                delay: 60,
                                rate: 5
                            });
                        }
                    }); 

