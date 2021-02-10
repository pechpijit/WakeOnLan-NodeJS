var wol = require('wake_on_lan');
const express = require('express')
var ping = require('ping');
const app = express()

app.get('/', (req, res) => {
	res.send('Wake on lan.')
})

app.get('/poweron/:name', (req, res) => {
  console.log(`route > /ping : ${req.params.name}`)
  if(req.params.name == "tong") {
    powerOnComputer("a8:a1:59:14:0e:1c",res);
  } else if(req.params.name == "pech") {
    powerOnComputer("b4:2e:99:1c:e0:f6",res);
  } else if(req.params.name == "jay") {
    powerOnComputer("b4:2e:99:1c:e0:f6",res);
  }
})

app.get('/ping/:name', (req, res) => {
  console.log(`route > /ping : ${req.params.name}`)
  if(req.params.name == "tong") {
    pingComputer("192.168.1.38",res);
  } else if(req.params.name == "pech") {
    pingComputer("192.168.1.58",res);
  } else if(req.params.name == "jay") {
    pingComputer("192.168.1.39",res);
  }
})

app.listen(5082, () => {
  console.log('Start server at port 5082.')
})

function powerOnComputer(mac,res){
  wol.wake(mac, function(error) {
    if (error) {
   console.log('Wake on lan Error')
     res.send('Wake on lan Error')
    } else {
   console.log('Wake on lan Success')
     res.send('Wake on lan Success')
    }
   });
}

function pingComputer(host,res){
  ping.sys.probe(host, function(isAlive){
    var msg = isAlive ? 'host ' + host + ' is alive' : 'host ' + host + ' is dead';
    console.log(msg);
    res.send(msg);
  });
}