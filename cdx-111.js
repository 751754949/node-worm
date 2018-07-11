
let fs = require('fs');
let url = require('url');
GetUrl('https://img.alicdn.com/tps/i4/TB14s82X9CWBuNjy0FhSuv6EVXa.jpg_290x290Q75s0.jpg_.webp',data=>{
    fs.writeFile('cdx111.jpg',data,()=>{
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
    req.end();
}

