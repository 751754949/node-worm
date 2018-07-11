let http = require('http');
let fs = require('fs');

let req = http.request({
    'hostname':'static.699pic.com',
    'path':'/images/activeimg/5a94c0b6df57b.jpg!/both/314x186'
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
        
        let b = Buffer.concat(arr);

        fs.writeFile('111111.jpg',b,()=>{
            console.log('抓取成功');
        })
        
    })
})
req.end();