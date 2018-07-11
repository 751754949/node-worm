var index = 0;
//获取京东页面内容；

let fs = require("fs");
let url = require("url");

const { encodeGBK, decodeGBK } = require("gbk-string"); // let gbk = require('gbk');  //无法使用
// let JSDOM = require('jsdom').JSDOM;
// console.log(decodeGBK("%B2%E2%CA%D4%CE%C4%B1%BE"));
GetUrl(
  "https://item.jd.com/1020565583.html?jd_pop=bf2e28c2-5970-49fa-8293-66769a291243&abt=0",
  data => {
    let utf8String = data.toString(); // var utf8String = gbk.toString('utf-8',data);
    console.log(utf8String)
    // var DOM = new JSDOM(utf8String);
    // let document = DOM.window.document;
    // console.log(document.querySelector('.tm-count').innerHTML)

    // fs.writeFile('jd.html',utf8String);
  }
);
function GetUrl(oUrl, success) {
  index++;
  var mUrl = url.parse(oUrl);
  let http = "";
  if (mUrl.protocol == "http") {
    http = require("http");
  } else {
    http = require("https");
  }

  let req = http.request(
    {
      hostname: mUrl.hostname,
      path: mUrl.path
    },
    res => {
      // console.log(res.statusCode,res.headers.location);
      if (res.statusCode == 200) {
        var arr = [];
        var str = "";
        res.on("data", buffer => {
          arr.push(buffer);
          // str = buffer.toString();
        });
        res.on("end", () => {
          // console.log(arr);
          // console.log(str);
          // console.log(res.statusCode,res.headers.location);
          let b = Buffer.concat(arr);
          success && success(b);
        });
      } else if (res.statusCode == 302 || res.statusCode == 301) {
        console.log(`这是第${index}重定向`);
        GetUrl(res.headers.location, success);
      }
    }
  );
  req.end();
}
// https://github.com/751754949/node-worm.git