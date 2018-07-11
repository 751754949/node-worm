
let fs = require('fs');
let url = require('url');
GetUrl("http://qkhtml.com/index.html", data => {
  fs.writeFile("./html/切客网.html", data, () => {
      /**
       * 抓取的页面需更新接口;
       */
    console.log("抓取成功le");
  });
});
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
        console.log(res.statusCode,res.headers.location);
        var arr = [];
        res.on('data',buffer=>{
            arr.push(buffer);
        })
        res.on('end',()=>{
            // console.log(arr);
            // console.log(str);
            let b = Buffer.concat(arr);
            success  && success(b);
        })
    })
    req.end();
}