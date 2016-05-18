var usonic = require('r-pi-usonic');
var sensor = usonic.createSensor(23, 24, 1000);
setTimeout(function() {
    console.log('Distance: ' + sensor().toFixed(2) + ' cm');
}, 60);
