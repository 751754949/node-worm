var index = 0;
//获取京东页面内容；

let fs = require('fs');
let url = require('url');
let gbk = require('gbk');
// let JSDOM = require('jsdom').JSDOM;

GetUrl('http://www.kanunu8.com/files/yuanchuang/201102/1416/22254.html',(data)=>{
    
    var utf8String = gbk.toString('utf-8',data);
    // console.log(utf8String)
    // var DOM = new JSDOM(utf8String);
    // let document = DOM.window.document;
    // console.log(document.querySelector('.tm-count').innerHTML)

    // console.log(data);
    console.log(utf8String);
    fs.writeFile('xiaoshuo.html',utf8String);
    
})
function GetUrl(oUrl,success){
    index++;
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
        // console.log(res.statusCode,res.headers.location);
        if(res.statusCode == 200){
            var arr = [];
            var str = "";
            res.on('data',buffer=>{
                arr.push(buffer);
                // str = buffer.toString();
            })
            res.on('end',()=>{
                // console.log(arr);
                // console.log(str);
                // console.log(res.statusCode,res.headers.location);
                let b = Buffer.concat(arr);
                success  && success(b)
            })
        }else if(res.statusCode == 302 || res.statusCode == 301){
            console.log(`这是第${index}重定向`);
            GetUrl(res.headers.location,success);
        }

    })
    req.end();
}

