var irobot = require('./index');
var robot = new irobot.Robot('/dev/ttyUSB0');
//var robot = new irobot.Robot('/dev/ttyO0');
var io = require('socket.io').listen(3001);
io.set('log level', 1);
io.set('transports', [
    'websocket'
]);

robot.on('sensordata', function (data) {

        if(io.countup == null) io.countup= 0;
        if (io.countup++ % 10 == 0) { //only send every n times
                //console.log(io.countup);
                data['countup'] = io.countup;
                io.sockets.volatile.emit('sensordata', data);
        };
});


io.sockets.on('connection', function (socket) {

        socket.on('drive', function (data) {
                console.log("drive",data);
                robot.drive(data);
        });

        socket.on('sing', function (data) {
                console.log("sing",data);
                robot.sing(data);
        });

        socket.on('safeMode', function () {
                console.log("safeMode");
                robot.safeMode();
        });

        socket.on('fullMode', function () {
                console.log("fullMode");
                robot.fullMode();
        });
        socket.on('passiveMode', function () {
                console.log("passiveMode");
                robot.passiveMode();
        });

});