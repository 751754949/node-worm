
let fs = require('fs');
let url = require('url');
GetUrl('https://img.alicdn.com/tps/i4/TB14osdssdfdsdfdsggSuvBpVXa.jpg',data=>{
    fs.writeFile('aaa.jpg',data,()=>{
        console.log('抓取成功le');
    })
})
function GetUrl(oUrl,success){
    var mUrl = url.parse(oUrl);
    let http ="";
    if( mUrl.protocol == 'http'){
        http = require('http');
    }else{
        http = require('https');
    }

    let req = http.request({
        'hostname':mUrl.hostname,
        'path':mUrl.path
    },res=>{
        var arr = [];
        res.on('data',buffer=>{
            arr.push(buffer);
        })
        res.on('end',()=>{
            // console.log(arr);
            // console.log(str);
            let b = Buffer.concat(arr);
            success  && success(b)
        })
    })
    req.on('error',()=>{
        console.log('404,你获取的资源不存在');
    })
    req.end();
}

