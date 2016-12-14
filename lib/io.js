var io = require('socket.io')();
/*
var onlineUsers = 0;

io.sockets.on('connection', function(socket){
    onlineUsers++;
    io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    socket.on('disconnect', function(){
        onlineUsers--;
        io.sockets.emit('onlineUsers', { onlineUsers: onlineUsers });
    });
});
*/

io.sockets.on('connection', function(socket){
	return;
});

module.exports = io;
