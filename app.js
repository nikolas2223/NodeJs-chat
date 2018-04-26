var express = require('express');
var bodyParser = require('body-parser');
var app = express();
var expressWs = require('express-ws')(app);

app.use(bodyParser.json());
app.use(express.static('public'));

var webSockets = {}; //billet for personal delivery
var connections = 0

var mainRoom = [];
var echoRoom = [];

app.get('/', function (req, res) {
    res.sendfile('public/index.html');
});

app.ws('/echo', function(ws, req) {
    echoRoom.push(ws);
    ws.on('message',function(msg){
    console.log(msg+' '+echoRoom.length+' in ECHO');
    echoRoom.forEach(clientEcho=>clientEcho.send(msg));
    //expressWs.getWss().clients.forEach(client => client.send(msg));
});

ws.on('close', function(statusCode,reason) {
    console.log('The connection in echoRoom was closed!'+' REASON: '+reason);
    for (var i = 0; i < echoRoom.length; i++) {
        console.log(i);
        if(echoRoom[i] == ws) 
        {
            echoRoom[i] = '.';
            echoRoom.sort();
            if(echoRoom[0] == '.')
                echoRoom.shift();
        }
    }
});
});

app.ws('/',function(ws,req){
    mainRoom.push(ws);
    ws.on('message',function(msg){
        console.log(msg+' '+mainRoom.length+' in main');
        mainRoom.forEach(clientMain=>clientMain.send(msg));
    });
    ws.on('close', function(statusCode,reason) {
        console.log('The connection in mainRoom was closed!'+' REASON: '+reason);
        for (var i = 0; i < mainRoom.length; i++) {
            console.log(i);
            if(mainRoom[i] == ws) 
            {
                mainRoom[i] = '.';
                mainRoom.sort();
                if(mainRoom[0] == '.')
                    mainRoom.shift();
            }
        }
    });
});

app.listen(3000,function(){
    console.log('App started...');
})