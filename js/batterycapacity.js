function batterycapacity(socket) {

    divId = "#batterycapacity";

    var i = 0;
    var readings = [];
    for (var i = 0; i < 5000; i++) {
        readings.push(null);
    }
    var samples = []
    for (var i = 0; i < readings.length; ++i) {
        samples.push([i, readings[i]])
    }
    var plot = $.plot(divId, [samples], {
        yaxis: {
            min: 0,
            max: 1.2
        },
        xaxis: {
            show: false
        }
    });



    socket.on('sensordata', function(data) {
        readings.shift();
        readings.push(data.battery.capacity.percent);
        samples = [];
        for (var i = 0; i < readings.length; ++i) {
            samples.push([i, readings[i]]);
        }
        plot.setData([samples]);
        plot.draw();
    });




}
