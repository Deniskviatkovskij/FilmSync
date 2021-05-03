
var roomSelection = document.getElementById('room')


function createRoom(){
    
    var option = document.createElement("option");
    option.text = makeid(10);
    roomSelection.add(option);
    window.sessionStorage.setItem("arhostas", 1);
    
    
}
function makeid(length) {
    var result           = '';
    var characters       = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < length; i++ ) {
       result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
 }
function joinRoom(){
    
    window.sessionStorage.setItem("arhostas", 0);
    
}


