const express = require('express')
const port = process.env.PORT || 8080;
const app = express()
const server = require('http').Server(app)
const io = require('socket.io')(server, {
    cors: {
      origin: '*',
    }
  });

server.listen(port);
const path = require('path')

const users ={};
var players = {};
var unmatched;
var hoststatus=[];
var roomsize= []
var roomcounter = 0;
app.use(express.static(path.join(__dirname, 'assets')));
app.get('/', function(req, res){
  res.render('index')
  })


io.on('connection', socket =>{
  
  
  
  socket.on('joinRoom', ({ username, room }) => {
  socket.roomid=room
  users[socket.id]=username;
  socket.join(room)
  
  
  socket.to(room).broadcast.emit('user-connected', users[socket.id])
  socket.emit('giveID', socket.id);
  io.to(room).emit('roomUsersConnect', username,  socket.id);
  // xo
  
//
 })
  socket.on('send-chat-message', (message, room) =>{
    socket.to(room).broadcast.emit('chat-message', {message: message, name : users[socket.id]})
  })
  socket.on('disconnect', () =>{ 
    
    var roomnumber = hoststatus.indexOf(socket.roomid);
    
    
    io.to(socket.roomid).emit('roomUsersDisconnect', users[socket.id], socket.id);
    if (players[socket.id]!=null) {
      if(getOpponent(socket)!=null){
      getOpponent(socket).emit("opponent.left");
      } else{
        unmatched = null
      }
    }
    if(roomnumber >=0){
      roomsize[roomnumber]--
      if(roomsize[roomnumber] < 1 && roomsize.length >1){         
        roomsize.splice(roomnumber,1)
    
        hoststatus.splice( roomnumber, 1)
      
        roomcounter--
        

      }
      else if (roomsize[roomnumber] < 1 && roomsize.length == 1 && roomnumber==0){
        delete hoststatus[0]
        delete roomsize[0]
        roomcounter--
      }
    }
    socket.to(socket.roomid).broadcast.emit('user-disconnected',  users[socket.id])

    delete users[socket.id]
     
  });

  socket.on('ytlinkas', (ytid, room) =>{
    socket.to(room).broadcast.emit('ytikelimas', {yturl: ytid, name : users[socket.id]})
  })
  socket.on('ytdelay', (room) =>{
    socket.to(room).broadcast.emit('ytauto')
  })
  socket.on('ytpause', (room) =>{
    socket.to(room).broadcast.emit('ytpauze')
  })
  socket.on('ytresume', (room) =>{
    socket.to(room).broadcast.emit('yttesti')
  })
  socket.on('ytskip', ( time, room) =>{
    socket.to(room).broadcast.emit('ytskip5', {ytime: time})
  })
  socket.on('ytback', ( time, room) =>{
    socket.to(room).broadcast.emit('ytback5', {ytime: time})
  })
  socket.on('yttimer', (time, room) =>{
    socket.to(room).broadcast.emit('ytlygint', {ytime: time})
  })
  socket.on('yttimer', (time, room) =>{
    socket.to(room).broadcast.emit('ytlygint', {ytime: time})
  })
  socket.on('autolink', ( ytid, room) =>{
    socket.to(room).broadcast.emit('autolinkas', {autoytlink: ytid})
  })
  socket.on('Host', (username, room) =>{
    socket.to(room).broadcast.emit('roomHost', username)
  })
  socket.on('userList', (uList,idlist, room ) =>{
    socket.to(room).broadcast.emit('user-List', uList,idlist)
  })
  socket.on('giveHostas', (list,idlist, room) =>{
    socket.to(room).broadcast.emit('givehost', list, idlist)
  })
  socket.on('dcgiveHostas', (uList,idlist, room) =>{
   io.to(room).emit('dcgivehost', uList,idlist)
  })
  socket.on('userKick', (uList,idlist, room) =>{
    io.to(room).emit('user-kick', uList,idlist)
   })
   socket.on('playerkeitimas', (playerid, videoId, room) =>{
    socket.to(room).broadcast.emit('player_Keitimas', {playerid: playerid, videoId: videoId})
  })
  socket.on('twitchcheck', (channel, playerid, room) =>{
    socket.to(room).broadcast.emit('changeChannel', {playerid: playerid, channel: channel})
  })
  // room patikra 
  socket.on('arHostasYra', (room, host) =>{
    

    if(host=='true'){
      hoststatus[roomcounter]= room;
      roomsize[roomcounter]=1;
      roomcounter++
    }
    else{ 
      if(hoststatus.indexOf(room) < 0){
      io.to(room).emit('redirectToMain')
     } 
     else {
      roomsize[hoststatus.indexOf(room)]++
     }
    }
    
    
   })
  // Xo
  socket.on('JoinXO', () =>{
  joinGame(socket);
  if (getOpponent(socket)) {
    socket.emit("game.begin", {
      symbol: players[socket.id].symbol,
    });
    getOpponent(socket).emit("game.begin", {
      symbol: players[getOpponent(socket).id].symbol,
    });
  }
});

  socket.on("make.move", function (data) {
    if (!getOpponent(socket)) {
      return;
    }
    socket.emit("move.made", data);
    getOpponent(socket).emit("move.made", data);
  });
  socket.on("gameended", () => {
    delete players[socket.id]
  });
  
  
  
})
function joinGame(socket) {
  players[socket.id] = {
    opponent: unmatched,

    symbol: "X",
    // The socket that is associated with this player
    socket: socket,
  };
  if (unmatched) {
    players[socket.id].symbol = "O";
    players[unmatched].opponent = socket.id;
    unmatched = null;
  } else {
    unmatched = socket.id;
  }
}

function getOpponent(socket) {
  if (!players[socket.id].opponent) {
    return;
  }
  return players[players[socket.id].opponent].socket;
}
