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
var currentplayer='twitch';
var path = window.location.pathname;
var page = path.split("/").pop();


if (messageForm != null){
  setTimeout(  function(){
    setInterval(checker, 3000)
  },500)
  if (page=='room_twitch.html'){
    appendMessage('You have connected')
  }
  else if (page=="room_twitch_lithuanian.html"){
      appendMessage('Jūs prisijungėte')
  }
    messageForm.addEventListener('submit', e =>{
        e.preventDefault()
        const message = messageInput.value
        if (page=='room_twitch.html'){
          appendMessage(`You: ${message}`)
        }
        else if (page=="room_twitch_lithuanian.html"){
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
var defchannel = "monstercat";
const ashostas = window.sessionStorage.getItem('arhostas');
const twitchChannel = window.sessionStorage.getItem('twitchChannel');
if(twitchChannel!=null){
  defchannel=twitchChannel;
  
}
window.sessionStorage.clear()

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

var time;
var userID;
var idlist=[];
var curtime;
var startas=1;
// twitch 
var player;
var embed = new Twitch.Embed("twitch-embed", {
    width: '100%',
    height: '100%',
    channel: `${defchannel}`,
    layout: "video",
    autoplay: false,
    parent: ["filmsync-env.eba-bgarfwfj.eu-west-3.elasticbeanstalk.com"]
  });
var readyplayer;
  embed.addEventListener(Twitch.Embed.VIDEO_READY, () => {
    player = embed.getPlayer();
    player.play();
    readyplayer='true';
  });
  
var selectedPlayer="twitch";
document.getElementById("selectplayer1style").style.backgroundColor='red';
    document.getElementById("selectedplayerstyle").style.backgroundColor='#9146ff';
    document.getElementById("selectedplayer").className="fa fa-twitch";
    document.getElementById("selectplayer1").className="fa fa-youtube";
    if (page=='room_twitch.html'){
      document.getElementById("vids").placeholder="Enter channel name";
    }
    else if (page=='room_twitch_lithuanian.html'){
      document.getElementById("vids").placeholder="Įveskite vartotojo vardą";
    }
    
    
    
 // player select
 document.getElementById("selectplayer1style").addEventListener("click", function(){
  if(document.getElementById("selectplayer1").className=="fa fa-twitch"){
    document.getElementById("selectplayer1style").style.backgroundColor='red';
    document.getElementById("selectedplayerstyle").style.backgroundColor='#9146ff';
    document.getElementById("selectedplayer").className="fa fa-twitch";
    document.getElementById("selectplayer1").className="fa fa-youtube";
    if (page=='room_twitch.html'){
      document.getElementById("vids").placeholder="Enter channel name";
    }
    else if (page=='room_twitch_lithuanian.html'){
      document.getElementById("vids").placeholder="Įveskite vartotojo vardą";
    }
    selectedPlayer="twitch";
  }
  else if (document.getElementById("selectplayer1").className=="fa fa-youtube"){
    document.getElementById("selectplayer1style").style.backgroundColor='#9146ff';
    document.getElementById("selectedplayerstyle").style.backgroundColor='red';
    document.getElementById("selectedplayer").className="fa fa-youtube";
    document.getElementById("selectplayer1").className="fa fa-twitch";
    selectedPlayer="youtube";
    if (page=='room_twitch.html'){
      document.getElementById("vids").placeholder="Paste a link to a YouTube video";
    }
    else if (page=='room_twitch_lithuanian.html'){
      document.getElementById("vids").placeholder="Įklijuok YouTube video nuorodą";
    }
  }
})
//

socket.emit('joinRoom', {username, room})

socket.on('roomHost', username =>{
    host= 'false';
})
socket.on('changeChannel', data =>{
  if(data.channel!=player.getChannel() && readyplayer=='true'){
    player.setChannel(data.channel)
  }
})
socket.on('autolinkas', data =>{
  if(data.playerid!=currentplayer){
    window.sessionStorage.setItem("youtubevideo", data.autoytlink);
    if (page=="room_twitch.html"){
      window.location.replace(`room.html?username=${username}&room=${room}#`)
      }
    else if(page=="room_twitch_lithuanian.html"){
      window.location.replace(`room_lithuanian.html?username=${username}&room=${room}#`)
    }

  }
})

socket.on('chat-message', data =>{
    appendMessage(` ${data.name}: ${data.message}`  )
})

socket.on('ytpauze', () =>{
    player.pause();
})
socket.on('yttesti', () =>{
    player.play();
    startas=1;
})

socket.on('c', data =>{
    appendMessage(` ${data.name}: ${data.message}`)
})
socket.on('ytikelimas', data =>{
    player.setChannel(data.yturl)
    player.pause();
    if (page=='room_twitch.html'){
      appendMessage(` ${data.name} changed channel`)
    }
    else if (page=="room_twitch_lithuanian.html"){
      appendMessage(` ${data.name} pakeitė kanalą`)
    }
    startas=1

})
//socket.on('autolinkas', data =>{
  //  if(data.autoytlink!=ytid){
    //    player.setChannel(data.yturl)
        //chann=data.autoytlink
      //  player.play();
        //startas=1
    //}

//})

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
    
  



socket.on('user-connected', (name) =>{
  if (page=='room_twitch.html'){
    appendMessage(`${name} has connected`)
  }
  else if (page=="room_twitch_lithuanian.html"){
    appendMessage(`${name} prisijungė`)
  }
    

     
})
socket.on('user-disconnected', name =>{
  if (page=='room_twitch.html'){
    appendMessage(`${name} disconnected`)
  }
  else if (page=="room_twitch_lithuanian.html"){
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
function channelName() {
  if(selectedPlayer=="twitch"){
    if (host == 'true'){
      player.setChannel(vidyt.value)
      defchannel=vidyt.value;
      player.pause()
      socket.emit('ytlinkas',  vidyt.value, room)
    }
  }
  else if(selectedPlayer=="youtube"){
    if (host == 'true'){
    var temp = vidyt.value;
    vidyt.value='';
    var res = temp.toString().split('=');
    var res2= res[1].split('&')
    window.sessionStorage.setItem("youtubevideo", res2);
    window.sessionStorage.setItem("arhostas", 1);
    socket.emit('playerkeitimas',  selectedPlayer, res2,room)
    window.location.replace(`room.html?username=${username}&room=${room}#`)
    

    
    }
  }
}

    

function pauze(){
    if ( startas == 1){
    socket.emit('ytpause', room)
    player.pause();}
        
}
function resume(){
    if ( startas == 1){
    socket.emit('ytresume', room)
    player.play();}
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
      if (twitchChannel==null){
        window.location.replace('index.html');
      }
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
function checker(){
  if(host=='true'){
    
    socket.emit('twitchcheck', defchannel,currentplayer, room )
  }
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
    document.getElementById('messages').innerHTML= 'Laukiama kito žaidėjo...';
    
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
              if (page=='room_twitch.html'){
                $("#messages").text("Game is over. You lost.");
              }
              else if (page=="room_twitch_lithuanian.html"){
                $("#messages").text("Žaidimo pabaiga. Jūs pralaimėjote.");
              }
               
                // Show the message for the winner
                
              } else {
                if (page=='room_twitch.html'){
                  $("#messages").text("Game is over. You won.");
                }
                else if (page=="room_twitch_lithuanian.html"){
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
        if (page=='room_twitch.html'){
          $("#messages").text("Draw!");
        }
        else if (page=="room_twitch_lithuanian.html"){
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
        if (page=='room_twitch.html'){
          $("#messages").text("Game is over. You lost.");
        }
        else if (page=="room_twitch_lithuanian.html"){
          $("#messages").text("Žaidimo pabaiga. Jūs pralaimėjote.");
        }
        // Show the message for the winner
        
      } else {
          if (page=='room_twitch.html'){
            $("#messages").text("Game is over. You won.");
          }
          else if (page=="room_twitch_lithuanian.html"){
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
    if (page=='room_twitch.html'){
        $("#messages").text("Your opponent left.");
    }
    else if (page=="room_twitch_lithuanian.html"){
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
    if (page=='room_twitch.html'){
      $("#messages").text("Your opponent's turn.");
    }
    else if (page=="room_twitch_lithuanian.html"){
        $("#messages").text("Jūsų priešininko eilė");
    }

    $(".board button").attr("disabled", true);
    // Enable the board if it is your turn
  } else {
      if (page=='room_twitch.html'){
        $("#messages").text("Your turn.");
      }
      else if (page=="room_twitch_lithuanian.html"){
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
//

//reactions on-click
document.getElementById("angry-1").addEventListener("click", displayReaction1);
function displayReaction1() {
    document.getElementById("face").src = "assets/images/reactions/angry-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}

function resetFace(){
    document.getElementById("face").src="assets/images/reactions/tuscias.png";
}

document.getElementById("angry").addEventListener("click", displayReaction2);
function displayReaction2() {
    document.getElementById("face").src = "assets/images/reactions/angry.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("bored-1").addEventListener("click", displayReaction3);
function displayReaction3() {
    document.getElementById("face").src = "assets/images/reactions/bored-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("bored-2").addEventListener("click", displayReaction4);
function displayReaction4() {
    document.getElementById("face").src = "assets/images/reactions/bored-2.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("confused").addEventListener("click", displayReaction5);
function displayReaction5() {
    document.getElementById("face").src = "assets/images/reactions/confused.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("confused-1").addEventListener("click", displayReaction6);
function displayReaction6() {
    document.getElementById("face").src = "assets/images/reactions/confused-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("crying").addEventListener("click", displayReaction7);
function displayReaction7() {
    document.getElementById("face").src = "assets/images/reactions/crying.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("embarrassed").addEventListener("click", displayReaction8);
function displayReaction8() {
    document.getElementById("face").src = "assets/images/reactions/embarrassed.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("emoticons").addEventListener("click", displayReaction9);
function displayReaction9() {
    document.getElementById("face").src = "assets/images/reactions/emoticons.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("happy").addEventListener("click", displayReaction10);
function displayReaction10() {
    document.getElementById("face").src = "assets/images/reactions/happy.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("happy-1").addEventListener("click", displayReaction11);
function displayReaction11() {
    document.getElementById("face").src = "assets/images/reactions/happy-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("happy-2").addEventListener("click", displayReaction12);
function displayReaction12() {
    document.getElementById("face").src = "assets/images/reactions/happy-2.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("happy-3").addEventListener("click", displayReaction13);
function displayReaction13() {
    document.getElementById("face").src = "assets/images/reactions/happy-3.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("ill").addEventListener("click", displayReaction14);
function displayReaction14() {
    document.getElementById("face").src = "assets/images/reactions/ill.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("in-love").addEventListener("click", displayReaction15);
function displayReaction15() {
    document.getElementById("face").src = "assets/images/reactions/in-love.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("kissing").addEventListener("click", displayReaction16);
function displayReaction16() {
    document.getElementById("face").src = "assets/images/reactions/kissing.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("mad").addEventListener("click", displayReaction17);
function displayReaction17() {
    document.getElementById("face").src = "assets/images/reactions/mad.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("nerd").addEventListener("click", displayReaction18);
function displayReaction18() {
    document.getElementById("face").src = "assets/images/reactions/nerd.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("ninja").addEventListener("click", displayReaction19);
function displayReaction19() {
    document.getElementById("face").src = "assets/images/reactions/ninja.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("quiet").addEventListener("click", displayReaction20);
function displayReaction20() {
    document.getElementById("face").src = "assets/images/reactions/quiet.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("sad").addEventListener("click", displayReaction21);
function displayReaction21() {
    document.getElementById("face").src = "assets/images/reactions/sad.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("smart").addEventListener("click", displayReaction22);
function displayReaction22() {
    document.getElementById("face").src = "assets/images/reactions/smart.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("smiling").addEventListener("click", displayReaction23);
function displayReaction23() {
    document.getElementById("face").src = "assets/images/reactions/smiling.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("surprised").addEventListener("click", displayReaction24);
function displayReaction24() {
    document.getElementById("face").src = "assets/images/reactions/surprised.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("surprised-1").addEventListener("click", displayReaction25);
function displayReaction25() {
    document.getElementById("face").src = "assets/images/reactions/surprised-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("suspicious").addEventListener("click", displayReaction26);
function displayReaction26() {
    document.getElementById("face").src = "assets/images/reactions/suspicious.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("suspicious-1").addEventListener("click", displayReaction27);
function displayReaction27() {
    document.getElementById("face").src = "assets/images/reactions/suspicious-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("tongue-out").addEventListener("click", displayReaction28);
function displayReaction28() {
    document.getElementById("face").src = "assets/images/reactions/tongue-out.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("tongue-out-1").addEventListener("click", displayReaction29);
function displayReaction29() {
    document.getElementById("face").src = "assets/images/reactions/tongue-out-1.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("unhappy").addEventListener("click", displayReaction30);
function displayReaction30() {
    document.getElementById("face").src = "assets/images/reactions/unhappy.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}


document.getElementById("wink").addEventListener("click", displayReaction31);
function displayReaction31() {
    document.getElementById("face").src = "assets/images/reactions/wink.png";
    setTimeout('resetFace()',3000) //<-- ČIA KEIST SEKUNDES
}
//reactions on-click pabaiga