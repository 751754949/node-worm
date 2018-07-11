var index = 0;
//获取页面内部的一些 dom 元素；


let fs = require('fs');
let url = require('url');
let gbk = require('gbk');
let JSDOM = require('jsdom').JSDOM;
console.log(gbk);
// GetUrl('https://detail.tmall.com/item.htm?spm=a1z10.3-b-s.w4011-14758655684.97.3abd2c5aFpmK35&id=554919155557&rn=5d591f32e22189cb03ab021d7d2bb7f9&abbucket=1&sku_properties=10004:900640275;5919063:6536025',(data)=>{
    
//     var utf8String = gbk.toString('utf-8',data);
//     // console.log(utf8String)
//     var DOM = new JSDOM(utf8String);
//     let document = DOM.window.document;
//     console.log(document.querySelector('.tm-count').innerHTML)
    
// })
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

