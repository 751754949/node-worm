//获取整个页面；
var index = 0;
let fs = require('fs');
let url = require('url');
let gbk = require('gbk');

GetUrl('http://nodejs.cn/api/buffer.html#buffer_class_method_buffer_concat_list_totallength',(data)=>{
    
    var utf8String = gbk.toString('utf-8',data);  //解决乱码;
    console.log(utf8String)
    fs.writeFile("./html/test4-结果.html", utf8String, () => {
      console.log("终于出来了");
    });
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

