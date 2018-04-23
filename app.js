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

/*app.ws('/echo', function(ws, req) {
    ws.on('message', function(msg) {
      ws.send(msg);
    });                             echo
  });*/
  app.ws('/echo', function(ws, req) {
      echoRoom.push(ws);
      ws.on('message',function(msg){
        console.log(msg+' '+echoRoom.length);
        echoRoom.forEach(clientEcho=>clientEcho.send(msg+' '+echoRoom.length));
        //expressWs.getWss().clients.forEach(client => client.send(msg));
    });
    ws.on('close', function() {
        console.log('The connection in echoRoom was closed!');
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
  // p.currentTarget.url

app.ws('/',function(ws,req){
    //console.log(ws);
    //connectionTest = ws;
    mainRoom.push(ws);
    ws.on('message',function(msg){
        console.log(msg+' '+mainRoom.length);
        mainRoom.forEach(clientMain=>clientMain.send(msg+' '+mainRoom.length));
        //expressWs.getWss().clients.forEach(client => client.send(msg));
    });
    ws.on('close', function() {
        console.log('The connection in mainRoom was closed!');
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