var index = 0;
let fs = require('fs');
let url = require('url');
GetUrl('https://detail.tmall.com/item.htm?spm=a220m.1000858.1000725.6.718072deYGmWGf&id=538218798736&skuId=3488521996132&areaId=110100&user_id=2616970884&cat_id=54288003&is_b=1&rn=68e441889ab48501841fbc3338fa5356',data=>{
    fs.writeFile('./html/淘宝重定向后的页面.html',data,()=>{
        console.log('终于出来了');
    })
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
            res.on('data',buffer=>{
                arr.push(buffer);
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

