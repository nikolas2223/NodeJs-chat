
const sendButton = document.querySelector("#sendButton");
const textField = document.querySelector("#txt");
const messages = document.querySelector("#mgs");
var name = prompt("Имя пользователя:","Name");
const color = [Math.floor(Math.random()*255),Math.floor(Math.random()*255),Math.floor(Math.random()*255)];
console.log("color: ",color);

var webSocket;
changeRoom('');
function changeRoom(roomUri)
{
    
    try 
    {
        webSocket.close(1000, 'changing a room...');
        messages.insertAdjacentHTML('beforeend','\n'+' ***YOU CHANGED ROOM TO: '+roomUri);
    } 
    catch (err) 
    {
          console.log('OOPS, SMTH IS WRONG');
          messages.insertAdjacentHTML('beforeend','\n ***HELLO THERE***');
    }
    messages.scrollBy(0,1000);
    webSocket = new WebSocket(location.href.replace(/^http/,'ws')+roomUri);

    webSocket.onopen = function () 
    {
        console.log('Connected... ('+roomUri+')');
    }
    webSocket.onclose = function () 
    {
        console.log('Connection closed!');
       /* messages.insertAdjacentHTML('beforeend',
                                 '<div><span style="color: red; margin-left:4px;">***CONNECTION CLOSED*** </span></div>');*/

    }
    webSocket.onmessage = function (message)
    {
        console.log('сервер: ', message);
        let assocMassive = JSON.parse(message['data']);
        console.log(assocMassive);
        printMessage(assocMassive);
        messages.scrollBy(0,100);
    }
}

function printMessage(msg)
{
    messages.insertAdjacentHTML('beforeend',
                                 '<div><span style="color: rgb('
                                 +msg["color"][0]+','
                                 +msg["color"][1]+','
                                 +msg["color"][2]+'); margin-left:4px;">'
                                 +msg["user"] + ": </span><span>"
                                 +msg["text"] + "</span></div>");
}

function sendMsg() 
{
    let message = textField.value;
    if(message!="")
    {
        webSocket.send(JSON.stringify({
            user: name,
            color: color,
            text: message
        }));
        textField.value = '';
    }
}

sendButton.onclick = sendMsg;
textField.onkeypress = function (e) 
{
    if (e.keyCode==13)
    {
        sendMsg ();
        messages.scrollBy(0,100);
    }
}