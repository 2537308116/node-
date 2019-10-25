const express = require('express');
const superagent = require('superagent');
require('superagent-charset')(superagent)
const cheerio = require('cheerio');
const fs = require("fs");

// 文件流

var server=express();

//3.创建一个路由对象
let router = express.Router();

//4.设置路由
router.get('/',(req,res)=>{
    superagent.get('https://www.50zw.co/book_72631/')
    .charset('gbk')
    .end((err, sres) => {
      // 常规的错误处理
      if (err) {
        return next(err);
      }
      // sres.text 里面存储着网页的 html 内容，将它传给 cheerio.load 之后
      // 就可以得到一个实现了 jquery 接口的变量，我们习惯性地将它命名为 `$`
      // 剩下就都是 jquery 的内容了
      let $ = cheerio.load(sres.text);
      let items = [];
      $('.chapterlist li  a').each((idx, element) => {
        let $element = $(element);
        items.push({
          title: $element.text(),
          href: `https://www.50zw.co/book_72631/${$element.attr('href')}`
        });
      });
      items.forEach(element => {

      });
    //    fs.writeFile('./output.text','element.href','utf8',function(err){
    //         if(err)
    //             console.log('写文件出错了，错误是：'+err);
    //         else
    //             console.log('ok');
    //     }) 
      res.send('items');
    });
})
server.use(router);
//5.监听端口
server.listen(8888,(req,res)=>{
    console.log('Server running at http://127.0.0.1:8888/')
});