let chatcount = 0;
let userNum;
let nameList;

var PORT = process.env.PORT || 3000;
let express = require('express');
let app = express();
let server = app.listen(PORT)

app.use(express.static('public'));

console.log("Socket server is running. localhost:" + PORT)

let socket = require('socket.io');
let io = socket(server);

io.sockets.on('connection', newConnection)

function newConnection(socket) {
    console.log('connection:', socket.id);
    socket.on('chatdata', mouseMsg);

    function mouseMsg(data) {
        socket.broadcast.emit('message', data)
        console.log(data)
    }
}