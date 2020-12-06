// webserver
const express = require('express');
const server = express();
const moment = require("moment");
const timestamp = `[${moment().format("YYYY-MM-DD HH:mm:ss")}]:`;

server.all('/', (req, res)=>{
    res.send('Nekomimi is now Online')
})
function keepAlive(){
    server.listen(3000, ()=>{console.log(`${timestamp} Webserver Status : 200 OK`)});
}
module.exports = keepAlive;