let http = require('http');
let fs = require('fs');

let req = http.request({
    'hostname':'nodejs.cn',
    'path':'/download/'
},res=>{
    var arr = [];
    var str = "";
    res.on('data',buffer=>{
        arr.push(buffer);
        // str += buffer
        str = buffer.toString();
    })
    res.on('end',()=>{
        // console.log(arr);
        // console.log(str);
        fs.writeFile('download.html',arr,'utf8')
        
    })
})
req.end();