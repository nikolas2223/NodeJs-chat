
var sendButton = document.querySelector("#sendButton");
var textField = document.querySelector("#txt");
var messages = document.querySelector("#mgs");
var name = prompt("Имя пользователя:","Name");
var color = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
console.log("color: ",color);

var webSocket;
changeRoom('');
function changeRoom(roomUri){

    try {
        webSocket.close(1000, 'changing a room...');
        messages.insertAdjacentHTML('beforeend','\n'+' ***YOU CHANGED ROOM TO: '+roomUri);
      } catch (err) {
          console.log('OOPS, SMTH IS WRONG');
          messages.insertAdjacentHTML('beforeend','\n ***HELLO THERE***');
      }
    
    webSocket = new WebSocket('ws://localhost:3000/'+roomUri);

    webSocket.onopen = function () {
        console.log('Connected...');
    }
    webSocket.onclose = function () {
        alert('Connection closed!');
    }
    webSocket.onmessage = function (message) {
        console.log('сервер: ', message);
        assocMassive = JSON.parse(message['data']);
        console.log(assocMassive);
        printMessage(assocMassive);
        window.scrollBy(0,80);
    }
}

function printMessage(msg){
    messages.insertAdjacentHTML('beforeend', '<div><span style="color: rgb('+msg["color"][0]+','+msg["color"][1]+','+msg["color"][2]+'); margin-left:4px;">' + msg["user"] + ": </span><span>" + msg["text"] + "</span></div>");
}

function sendMsg() {
    message = textField.value;
    if(message!=""){
        webSocket.send(JSON.stringify({
            user: name,
            color: color,
            text: message
        }));
        textField.value = '';
    }
}

sendButton.onclick = sendMsg;
textField.onkeypress = function (e) {
    if (e.keyCode==13){
        sendMsg ();
        window.scrollBy(0,80);
    }
}
/*
function scrollToEndPage(pix) {
    console.log( " scrollHeight:" + document.body.scrollHeight);
    for (var i = 0; i < pix; i++) {
        window.scrollBy(0,i);
        console.log(i);
    }
}
*/