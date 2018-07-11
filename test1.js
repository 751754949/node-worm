let http = require('http');

let req = http.request({   //默认是post访问；
    'hostname':'nodejs.cn',   //域名：
    'path':'/download/'
},res=>{
    // console.log(res);
})
req.end();