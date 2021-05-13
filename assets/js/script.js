var socket = io()
const messageContainer= document.getElementById('message-container')
const messageForm= document.getElementById('send-container')
const messageInput = document.getElementById('message-input')
const roomID = document.getElementById('roomId')
const connectedUsers = document.getElementById('connectedUsers')
const hostGiver = document.getElementById('hostGiver')
const hostName = document.getElementById('hostname')
const kickName = document.getElementById('kick')
const hostOpt = document.getElementById('hostOpt')
const kickOpt = document.getElementById('kickOpt')
const vidsbtn = document.getElementById('vidsbtn')
const vidyt = document.getElementById('vids')
const dropdown = document.getElementById('dropas')
var currentplayer='youtube';

var path = window.location.pathname;
var page = path.split("/").pop();

if (messageForm != null){
    if (page=='room.html'){
        appendMessage('You have connected')
    }
    else if (page=="room_lithuanian.html"){
        appendMessage('Jūs prisijungėte')
    }
    
    setTimeout(  function(){
        setInterval(myTimer, 1000)
    },500)
    messageForm.addEventListener('submit', e =>{
        e.preventDefault()
        const message = messageInput.value
        if (page=='room.html'){
            appendMessage(`You: ${message}`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Jūs: ${message}`)
        }
       
        socket.emit('send-chat-message', message, room)
        messageInput.value = ''
    })
    var uList =[];
    var nList= [];
  
}

hostName.className = 'classname'

var host;
var roomCreator;
var firstjoin = 'true';
const { username, room } = Qs.parse(location.search, {
    ignoreQueryPrefix: true,
  });

  // room id element
  roomID.innerHTML= `ROOM ID: ${room}`;
  function copyid(){    
          var dummy = document.createElement("textarea");
          document.body.appendChild(dummy);
          dummy.value =  room;
          dummy.select();
          document.execCommand("copy");
          document.body.removeChild(dummy); 
  
  }
  
// hostas
const ashostas = window.sessionStorage.getItem('arhostas');
const defaultvideo = window.sessionStorage.getItem('youtubevideo');
if (ashostas == 1){
    socket.emit('Host', username, room)
    host = 'true'
    roomCreator= 'true'
   
}
else {
    host = 'false'
    roomCreator = 'false'
}
//
var pirmasHostas=0;
var player;
var ytid;
var time;
var userID;
var idlist=[];
var curtime;
var startas=0;
var vidytdefault='6SKMGkn2lMk';

if(defaultvideo!=null){
    vidytdefault = defaultvideo;
}
window.sessionStorage.clear()

// yt
setTimeout(  function onYouTubeIframeAPIReady() {
    player = new YT.Player('player', {
      // Set Player height and width
        height: '100%',
        width: '100%',
      // Set the id of the video to be played
      videoId: `${vidytdefault}`,
       playerVars: {
        
        'autoplay': 0,
        'controls': 1,
        'disablekb': 1,
        'fs': 1,
        'modestbranding': 1,
        'rel': 0,
        'showinfo': 1,
        'autohide': 1
        
      }
      
      
    });
  }, 500);


  function onPlayerReady(event) {
    event.target.playVideo();
    
  }
  var selectedPlayer="youtube";
 
   // player select
   document.getElementById("selectplayer1style").addEventListener("click", function(){
    if(document.getElementById("selectplayer1").className=="fa fa-twitch"){
      document.getElementById("selectplayer1style").style.backgroundColor='red';
      document.getElementById("selectedplayerstyle").style.backgroundColor='#9146ff';
      document.getElementById("selectedplayer").className="fa fa-twitch";
      document.getElementById("selectplayer1").className="fa fa-youtube";
      if (page=='room.html'){
        document.getElementById("vids").placeholder="Enter channel name";
      }
      else if (page=='room_lithuanian.html'){
        document.getElementById("vids").placeholder="Įveskite vartotojo vardą";
      }
      selectedPlayer="twitch";
    }
    else if (document.getElementById("selectplayer1").className=="fa fa-youtube"){
      document.getElementById("selectplayer1style").style.backgroundColor='#9146ff';
      document.getElementById("selectedplayerstyle").style.backgroundColor='red';
      document.getElementById("selectedplayer").className="fa fa-youtube";
      document.getElementById("selectplayer1").className="fa fa-twitch";
      if (page=='room.html'){
        document.getElementById("vids").placeholder="Paste a link to a YouTube video";
      }
      else if (page=='room_lithuanian.html'){
        document.getElementById("vids").placeholder="Įklijuok YouTube video nuorodą";
      }
      
      selectedPlayer="youtube";
    }
  })

  

socket.emit('joinRoom', {username, room})

socket.on('roomHost', username =>{
    host= 'false';
})
socket.on('changeChannel', data =>{
    if(data.playerid!=currentplayer){
        window.sessionStorage.setItem("twitchChannel", data.channel);
        if (page=="room.html"){
          window.location.replace(`room_twitch.html?username=${username}&room=${room}#`)
          }
        else if(page=="room_lithuanian.html"){
          window.location.replace(`room_twitch_lithuanian.html?username=${username}&room=${room}#`)
        }
    
      }
})

socket.on('player_Keitimas', (data) =>{
    if (data.playerid=='youtube'){
    setTimeout(function() {
        window.sessionStorage.setItem("youtubevideo", data.videoId);
        window.sessionStorage.setItem("arhostas", 0);
        if (page=="room_twitch.html"){
        window.location.replace(`room.html?username=${username}&room=${room}#`)
        }
        else if(page=="room_twitch_lithuanian.html"){
          window.location.replace(`room_lithuanian.html?username=${username}&room=${room}#`)
        }
        
    }, 1000);
    } 
    else if(data.playerid=='twitch'){
        setTimeout(function() {
          window.sessionStorage.setItem("twitchChannel", data.videoId);
          window.sessionStorage.setItem("arhostas", 0);
          if (page=="room.html"){
            window.location.replace(`room_twitch.html?username=${username}&room=${room}#`)
          }
          else if(page=="room_lithuanian.html"){
              window.location.replace(`room_twitch_lithuanian.html?username=${username}&room=${room}#`)
          }
        }, 1000);
    }
      
    
})
  

socket.on('chat-message', data =>{
    appendMessage(` ${data.name}: ${data.message}`  )
})
socket.on('ytpauze', () =>{
    player.pauseVideo();
})
socket.on('yttesti', () =>{
    player.playVideo();
    startas=1;
})
socket.on('ytskip5', data =>{
    player.seekTo(seconds = data.ytime)
})
socket.on('ytback5', data =>{
    player.seekTo(seconds = data.ytime)

})
socket.on('ytlygint', data =>{
    if(data.ytime-curtime > 1 || data.ytime-curtime < -1){
    player.seekTo(seconds = data.ytime+0.3)
    }
 
    

})
socket.on('c', data =>{
    appendMessage(` ${data.name}: ${data.message}`)
})
socket.on('ytikelimas', data =>{
    player.loadVideoById(videoId = data.yturl)
    player.pauseVideo();
    if (page=='room.html'){
        appendMessage(` ${data.name} changed video`)
    }
    else if (page=="room_lithuanian.html"){
        appendMessage(` ${data.name} pakeite video`)
    }
    
    ytid=data.yturl;
    startas=0

})
socket.on('autolinkas', data =>{
    if(data.autoytlink!=ytid){
        player.loadVideoById(videoId = data.autoytlink)
        ytid=data.autoytlink
        player.playVideo();
        startas=1
    }

})

socket.on('ytauto', () =>{
    player.seekTo(seconds = '0')
    player.playVideo();
    setTimeout(function() {
        player.pauseVideo();
    }, 300);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 5 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 5 s`)
        }
        
    }, 0);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 4 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 4 s`)
        }
    }, 1000);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 3 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 3 s`)
        }
    },1000);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 2 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 2 s`)
        }
    }, 3000)
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 1 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 1 s`)
        }
    }, 4000);
    
    setTimeout(function() {
        player.playVideo();
    }, 5000);
    startas=1

})


socket.on('user-connected', (name) =>{
    if (page=='room.html'){
        appendMessage(`${name} has connected`)
    }
    else if (page=="room_lithuanian.html"){
        appendMessage(`${name} prisijungė`)
    }
   

     
})
socket.on('user-disconnected', name =>{
    if (page=='room.html'){
        appendMessage(`${name} disconnected`)
    }
    else if (page=="room_lithuanian.html"){
        appendMessage(`${name} atsijungė`)
    }
    
    
})







function appendMessage(message){
    const messageElement = document.createElement('div')
    messageElement.style= "white-space: pre"
    messageElement.style= 'word-wrap:break-word;'
    messageElement.style.width='380px'

        
	messageElement.innerText = message
    
    if( autoscroll() == 'true'){
    messageContainer.append(messageElement)
    messageContainer.scrollTo(0, messageContainer.scrollHeight)
    }
    else {
      messageContainer.append(messageElement)
    }
}
// auto scroll sad me
function autoscroll(){
    
    if(messageContainer.scrollTop == messageContainer.scrollHeight-messageContainer.clientHeight  ||( messageContainer.scrollTop-(messageContainer.scrollHeight-messageContainer.clientHeight) <1200 && messageContainer.scrollTop-(messageContainer.scrollHeight-messageContainer.clientHeight)>-1200)){
        
      
    return 'true';
    }
    else{

    return 'false';
    }
  
};
function ytlink() {
    if (host == 'true'){
        if (selectedPlayer=="youtube"){
            var temp = vidyt.value;
            vidyt.value='';
            var res = temp.toString().split('=');
            var res2= res[1].split('&')
            
            ytid= res2[0]
            player.loadVideoById(videoId = res2[0])
            player.pauseVideo()
            startas=0
            socket.emit('ytlinkas',  ytid, room)
            if (page=='room_lithuanian.html'){
                appendMessage(`Galite pradėti`)
            }
            else if (page=="room.html"){
                appendMessage(` Start when ready`)
            }
            
        }
        else if(selectedPlayer=="twitch"){
            
            window.sessionStorage.setItem("twitchChannel", vidyt.value);
            window.sessionStorage.setItem("arhostas", 1);
            socket.emit('playerkeitimas',  selectedPlayer,vidyt.value ,room)
              
            if (page=="room.html"){
                window.location.replace(`room_twitch.html?username=${username}&room=${room}#`)
                }
            else if(page=="room_lithuanian.html"){
                window.location.replace(`room_twitch_lithuanian.html?username=${username}&room=${room}#`)
            }
            


        }
    }
    
    

  
  }
function autodelayed() {
    if (host == 'true'){
    player.seekTo(seconds = '0')
    socket.emit('ytdelay', room)
    player.playVideo();
    setTimeout(function() {
        player.pauseVideo();
    }, 300);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 5 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 5 s`)
        }
    }, 0);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 4 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 4 s`)
        }
    }, 1000);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 3 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 3 s`)
        }
    },2000);
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 2 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 2 s`)
        }
    }, 3000)
    setTimeout(function() {
        if (page=='room.html'){
            appendMessage(`Video will start in 1 sec`)
        }
        else if (page=="room_lithuanian.html"){
            appendMessage(`Video prasidės už 1 s`)
        }
    }, 4000);
    
    setTimeout(function() {
        player.playVideo();
        startas =1;
    }, 5000);

    }
}

function pauze(){
    if ( startas == 1){
    socket.emit('ytpause', room)
    player.pauseVideo();}
        
}
function resume(){
    if ( startas == 1){
    socket.emit('ytresume', room)
    player.playVideo();}
   
}
function skip5(){
    if (host == 'true' && startas == 1){
        time = player.getCurrentTime() + 5;
        socket.emit('ytskip',  time, room)
        player.seekTo(seconds = time)}

}
function back5(){
    if (host =='true' && startas == 1){
        time = player.getCurrentTime() - 5;
        socket.emit('ytback', time, room)
        player.seekTo(seconds = time)}
  
}




function myTimer(){
    curtime = player.getCurrentTime()
    if (host == 'true' && startas == 1){
        socket.emit('autolink', ytid, room)
        socket.emit('yttimer', curtime, room)
        if(player.getPlayerState()==1){
            socket.emit('ytresume', room)
        }
        else if(player.getPlayerState()==2){
            socket.emit('ytpause', room)
        }
    }
}
socket.on('giveID', socketid  => {
    userID=socketid;
})


socket.on('roomUsersConnect', (  list, socketid ) => {
    var hList;
    if (host == 'true' && list == username){
        hList= list + '%true'
        hostList(hList, socketid, 1);
        if (pirmasHostas==0){
            hostName.innerHTML = ''
            var newelement = document.createElement('p')
            newelement.innerHTML= 'Host: '+ hList.split('%')[0]
            hostName.append(newelement)
            pirmasHostas=pirmasHostas+1;
            
        }
        
        
        
    }
    else{
        hList= list + '%false'
        hostList(hList,socketid, 1);
    }
    if(firstjoin == 'true'){
    socket.emit('arHostasYra', room, roomCreator)
    firstjoin = 'false'
   
    }
    roomCreator= 'false'
   
   
    
  });
  
  socket.on('test', (a) => {
    alert(a)
  });
  
    socket.on('redirectToMain', (a) => {
   window.location.replace('index.html');
      });
  socket.on('roomUsersDisconnect', (  list,socketid ) => {
    var temp
    for (var i = 0; i < uList.length; i++){
        if (socketid == idlist[i] && list == uList[i].split('%')[0]){
        temp = i
     }
    }
  
    if (uList[temp].split('%')[1] == 'true'){
      
        
        dcGiveHost(temp)
       
        
    }
    hostList(list,socketid, 0);
    
  });

  

  socket.on('user-List', (  list ,listid) => {
    if (pirmasHostas==0){
        hostName.innerHTML = ''
        var newelement = document.createElement('p')
        newelement.innerHTML= 'Host: '+ list[0].split('%')[0]
        hostName.append(newelement)
        pirmasHostas=pirmasHostas+1;
    }
    uList= list;
    idlist=listid;
    userList()
  });
  
function hostList(users, usersid ,x) {


    if (host=='true'){
    document.getElementById('kickAndHost').style.display='inline-flex';
    hostGiver.innerHTML='';
    connectedUsers.innerHTML = '';
    kickName.innerHTML='';
    hostOpt.hidden=false;
    kickOpt.hidden=false;
    vidyt.hidden=false;
    dropdown.hidden=false;
    vidsbtn.hidden=false;
    document.getElementById('logoCenter').style.display='none';
    document.getElementById('logoLeft').style.display='flex';
    document.getElementById('skip_five').hidden=false;
    document.getElementById('start').hidden=false;
    document.getElementById('back_five').hidden=false;
    
    
    if(x==1){
    uList.push(users)
    idlist.push(usersid)
    }
    else{
          
        var index = idlist.indexOf(usersid);
        if (index >= 0) {
        uList.splice( index, 1);
        idlist.splice( index, 1)
        }
    }
    for (var i =0; i < uList.length; i++){
    const opt = document.createElement('option')
    const opt1 = document.createElement('option')
    const li = document.createElement('li');
    nList[i]= uList[i].split('%')[0];

    var res = uList[i].split('%');

    opt.innerText= res[0]
    opt.value= res[0]+'%'+idlist[i]
    opt1.innerText= res[0]
    opt1.value= res[0]+'%'+idlist[i]
    
    li.innerText = res[0]
    connectedUsers.appendChild(li);
    if(idlist[i] != userID){
        hostGiver.appendChild(opt);
        kickName.appendChild(opt1)
        
    }
    
    
     }
    socket.emit('userList', uList, idlist, room)
    newHostList()
    } 
    
}
function userList() {
    hostGiver.innerHTML='';
    connectedUsers.innerHTML = '';
    kickName.innerHTML=''
    hostOpt.hidden=true;
    kickOpt.hidden=true;
    vidyt.hidden=true;
    dropdown.hidden=true;
    vidsbtn.hidden=true;
    document.getElementById('dropas').style.display='none';
    document.getElementById('kickAndHost').style.display='none';
    document.getElementById('logoCenter').style.display='flex';
    document.getElementById('logoLeft').style.display='none';
    document.getElementById('skip_five').hidden=true;
    document.getElementById('start').hidden=true;
    document.getElementById('back_five').hidden=true;
    for (var i =0; i < uList.length; i++){
    const li = document.createElement('li');
    var res = uList[i].split('%');

  
    li.innerText = res[0]

    connectedUsers.appendChild(li);
     }
     
}
    
function giveHost(x){
    
    for(var i = 0; i< uList.length;i++){
        if (uList[i].split('%')[0] == username && uList[i].split('%')[1] == 'true'){
            uList[i]= uList[i].split('%')[0]+'%false'
            break;
        }
    }
    
    uList[x]= uList[x].split('%')[0]+'%true'
    newHostList()
    host='false';
    socket.emit('giveHostas', uList[x], idlist[x], room)
    hostName.innerHTML = ''
    var newelement = document.createElement('p')
    newelement.innerHTML='Host: '+ uList[x].split('%')[0]
    hostName.append(newelement)
    
}
socket.on('givehost', (  list, listid ) => {
    
    if (list.split('%')[0] == username && list.split('%')[1] == 'true' && listid == userID){
        host='true'
        newHostList()
    
    }
    hostName.innerHTML = ''
    var newelement = document.createElement('p')
    newelement.innerHTML='Host: '+ list.split('%')[0]
    hostName.append(newelement)
  });

function dcGiveHost(x){
    
    for (var i = 0; i< uList.length; i++){
        if(uList[x]!= uList[i] && idlist[i]!=idlist[x]){
            
            uList[i] = uList[i].split('%')[0] + '%true'
            socket.emit('dcgiveHostas', uList[i], idlist[i], room)
            uList.splice(x,1)
            idlist.splice(x,1)
            
            break;
        }
    }
    
    


}

socket.on('dcgivehost', (  list ,listid) => {
    

    if (list.split('%')[0] == username && userID==listid){
        host='true'  
        newHostList()


    }
    hostName.innerHTML=''
    var newelement = document.createElement('p')
    newelement.innerHTML= 'Host: '+list.split('%')[0]
    hostName.append(newelement)
  });
function newHostList() {

    if (host=='true'){
    document.getElementById('kickAndHost').style.display='flex';
    connectedUsers.innerHTML = '';
    hostGiver.innerHTML='';
    kickName.innerHTML='';
    hostOpt.hidden=false;
    kickOpt.hidden=false;
    vidyt.hidden=false;
    dropdown.hidden=false;
    vidsbtn.hidden=false;
    document.getElementById('dropas').style.display='block';
    document.getElementById('logoCenter').style.display='none';
    document.getElementById('logoLeft').style.display='flex';
    document.getElementById('skip_five').hidden= false;
    document.getElementById('start').hidden= false;
    document.getElementById('back_five').hidden= false;
    
    
    for (var i =0; i < uList.length; i++){
        
        const opt = document.createElement('option')
        const opt1 = document.createElement('option')
        const li = document.createElement('li');
        var res = uList[i].split('%');

        opt.innerText= res[0]
        opt.value= res[0]+'%'+idlist[i]
        opt1.innerText= res[0]
        opt1.value= res[0]+'%'+idlist[i]
        li.innerText = res[0]
        connectedUsers.appendChild(li);
        if(idlist[i]!=userID){
            hostGiver.appendChild(opt);
            kickName.appendChild(opt1)
        }
    
    
     }
    socket.emit('userList', uList, idlist, room)
    } 
}
function newHost(){
    if (host=='true'){
        for (var i = 0; i< uList.length; i++){
            if (uList[i].split('%')[0]==hostGiver.value.split('%')[0] && idlist[i]==hostGiver.value.split('%')[1]){
                giveHost(i)

            }
        }
    
    }   
}
// kick 
function kickUser(){
    if (host=='true'){
        for (var i = 0; i< uList.length; i++){
            if (uList[i].split('%')[0]==kickName.value.split('%')[0] && idlist[i]==kickName.value.split('%')[1]){
                socket.emit('userKick', uList[i].split('%')[0], idlist[i], room)
            }
        }
    
    }
    
}
socket.on('user-kick', (uname, id)=>{
    if(uname == username && id ==userID){
        alert('Bye')
        window.location.replace('index.html')
    }
})

function simpleInput(){
    document.getElementById('basic_input').style.display='none';
}





//var input = document.getElementById("username");
//input.addEventListener("keyup", function(event) {
   // if (event.keyCode === 13) {
    // event.preventDefault();
   //     document.getElementById("room").click();
   // }
//});
// Xo kodas
var symbol;

const xojoin = document.getElementById('xojoin')


function joinXO(){
    
    socket.emit('JoinXO')
    document.getElementById('xojoin').hidden = true
    startgame()
    if (page=='room.html'){
        document.getElementById('messages').innerHTML= 'Waiting for opponent...';
    }
    else if (page=="room_lithuanian.html"){
        document.getElementById('messages').innerHTML= 'Laukiama kito žaidėjo...';
    }
    
    
}
function startgame(){
$(function () {
    var xotimer=30;
    var xostart;

    var xotime = setInterval(function(){
        if(xostart==true){
        document.getElementById('xotimer').innerHTML=xotimer
        xotimer--
        }
        if(xotimer==0){
            clearInterval(xotime);
            if (myTurn) {
                if (page=='room.html'){
                    $("#messages").text("Game is over. You lost.");
                }
                else if (page=="room_lithuanian.html"){
                    $("#messages").text("Žaidimo pabaiga. Jūs pralaimėjote.");
                }
               
                // Show the message for the winner
                
              } else {
                if (page=='room.html'){
                    $("#messages").text("Game is over. You won.");
                }
                else if (page=="room_lithuanian.html"){
                    $("#messages").text("Žaidimo pabaiga. Jūs laimėjote!");
                }
               
              }
              // Disable the board
              $(".board button").attr("disabled", true);
              clearInterval(xotime);
              setTimeout(function() {
                    socket.emit("gameended")
                    $("#xoboard").load(location.href + " #xoboard");
                }, 5000);
        }
    }, 1000)
    
    
  $(".board button").attr("disabled", true);
  $(".board> button").on("click", makeMove);
  // Event is called when either player makes a move
  socket.on("move.made", function (data) {
    // Render the move
    xotimer=30;
    $("#" + data.position).text(data.symbol);
    // If the symbol is the same as the player's symbol,
    // we can assume it is their turn

    myTurn = data.symbol !== symbol;

    // If the game is still going, show who's turn it is
    if (!isGameOver()) {
      if (gameTied()) {
        if (page=='room.html'){
            $("#messages").text("Draw!");
        }
        else if (page=="room_lithuanian.html"){
            $("#messages").text("Lygiosios!");
        }
        
        $(".board button").attr("disabled", true);
        clearInterval(xotime);
        setTimeout(function() {
            socket.emit("gameended")
            $("#xoboard").load(location.href + " #xoboard");
        }, 5000);
      } else {
        renderTurnMessage();
      }
      // If the game is over
    } else {
      // Show the message for the loser
      if (myTurn) {
        if (page=='room.html'){
            $("#messages").text("Game is over. You lost.");
        }
        else if (page=="room_lithuanian.html"){
            $("#messages").text("Žaidimo pabaiga. Jūs pralaimėjote.");
        }
        // Show the message for the winner
        
      } else {
        if (page=='room.html'){
            $("#messages").text("Game is over. You won.");
        }
        else if (page=="room_lithuanian.html"){
            $("#messages").text("Žaidimo pabaiga. Jūs laimėjote.");
        }
      }
      // Disable the board
      $(".board button").attr("disabled", true);
      clearInterval(xotime);
      setTimeout(function() {
            socket.emit("gameended")
            $("#xoboard").load(location.href + " #xoboard");
        }, 5000);
      
      
    }
  });

  // Set up the initial state when the game begins
  socket.on("game.begin", function (data) {
    // The server will asign X or O to the player
    symbol = data.symbol;
    // Give X the first turn
    myTurn = symbol === "X";
    renderTurnMessage();
    xostart=true;
  });

  // Disable the board if the opponent leaves
  socket.on("opponent.left", function () {
    if (page=='room.html'){
        $("#messages").text("Your opponent left.");
    }
    else if (page=="room_lithuanian.html"){
        $("#messages").text("Jūsų priešininkas išėjo.");
    }
    $(".board button").attr("disabled", true);
      clearInterval(xotime);
      setTimeout(function() {
            socket.emit("gameended")
            $("#xoboard").load(location.href + " #xoboard");
        }, 5000);
  });
});
}
function getBoardState() {
  var obj = {};
  // We will compose an object of all of the Xs and Ox
  // that are on the board
  $(".board button").each(function () {
    obj[$(this).attr("id")] = $(this).text() || "";
  });
  return obj;
}

function gameTied() {
  var state = getBoardState();

  if (
    state.a0 !== "" &&
    state.a1 !== "" &&
    state.a2 !== "" &&
    state.b0 !== "" &&
    state.b1 !== "" &&
    state.b2 !== "" &&
    state.b3 !== "" &&
    state.c0 !== "" &&
    state.c1 !== "" &&
    state.c2 !== ""
  ) {
    return true;
  }
}

function isGameOver() {
  var state = getBoardState(),
    // One of the rows must be equal to either of these
    // value for
    // the game to be over
    matches = ["XXX", "OOO"],
    // These are all of the possible combinations
    // that would win the game
    rows = [
      state.a0 + state.a1 + state.a2,
      state.b0 + state.b1 + state.b2,
      state.c0 + state.c1 + state.c2,
      state.a0 + state.b1 + state.c2,
      state.a2 + state.b1 + state.c0,
      state.a0 + state.b0 + state.c0,
      state.a1 + state.b1 + state.c1,
      state.a2 + state.b2 + state.c2,
    ];

  // to either 'XXX' or 'OOO'
  for (var i = 0; i < rows.length; i++) {
    if (rows[i] === matches[0] || rows[i] === matches[1]) {
      return true;
    }
  }
}

function renderTurnMessage() {
  // Disable the board if it is the opponents turn
  if (!myTurn) {
    if (page=='room.html'){
        $("#messages").text("Your opponent's turn.");
    }
    else if (page=="room_lithuanian.html"){
        $("#messages").text("Jūsų priešininko eilė");
    } 
    
    $(".board button").attr("disabled", true);
    // Enable the board if it is your turn
  } else {
    if (page=='room.html'){
        $("#messages").text("Your turn.");
    }
    else if (page=="room_lithuanian.html"){
        $("#messages").text("Jūsų eilė.");
    } 
    
    $(".board button").removeAttr("disabled");
  }
}

function makeMove(e) {
  e.preventDefault();
  // It's not your turn
  if (!myTurn) {
    return;
  }
  // The space is already checked
  if ($(this).text().length) {
    return;
  }

  // Emit the move to the server
  socket.emit("make.move", {
    symbol: symbol,
    position: $(this).attr("id"),
  });
}

//rections meniu
function myFunction() {
  document.getElementById("myDropdown").classList.toggle("show");
}
window.onclick = function(event) {
  if (!event.target.matches('.dropbtn')) {
    var dropdowns = document.getElementsByClassName("dropdown-content");
    var i;
    for (i = 0; i < dropdowns.length; i++) {
      var openDropdown = dropdowns[i];
      if (openDropdown.classList.contains('show')) {
        openDropdown.classList.remove('show');
      }
    }
  }
}
