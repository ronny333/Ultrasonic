var statistics = require('math-statistics');
var usonic = require('r-pi-usonic');
 
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
 
    process.stdout.clearLine();
    process.stdout.cursorTo(0);
 
    if (distance < 0) {
        process.stdout.write('Error: Measurement timeout.\n');
    } else {
	if(distance < 20){
	process.stdout.write('Distance > 20.\n');
	}
	else{
	 process.stdout.write('Distance: ' + distance.toFixed(2) + ' cm'+'\n');

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
//init({
  //  echoPin: 24, //Echo pin
   // triggerPin: 23, //Trigger pin
    //timeout: 1000, //Measurement timeout in µs
    //delay: 60, //Measurement delay in ms
    //rate: 5 //Measurements per sample
//});
