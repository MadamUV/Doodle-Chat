var app = require('express')();
//initialize app to be function handler that can be supplied to an HTTP server
var http = require('http').Server(app); 
//initialize new instance of socket.io by passing the http object
var io = require('socket.io')(http);

app.get('/', function (req, res){
	res.sendFile(__dirname + '/index.html');
});

io.on('connection', function(socket){
  socket.on('chat message', function(msg){
    io.emit('chat message', msg);
  });
});

io.emit('some event', { for: 'everyone' });



http.listen(3000, function(){
	console.log('listening on *:3000');
})

