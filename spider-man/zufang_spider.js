// 引入 superagent、cheerio
const superagent = require("superagent");
const cheerio = require("cheerio");

// 登陆 url 、目标 url
const url = 'https://www.douban.com/group/beijingzufang/?from=tag';
const keywords = ['8号线', '15号线', '回龙观', '中关村'];

superagent
    .get(url)
    .set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
    .end(function (err, response) {
        if (err) {
            console.log(err.message);
        } else {
            //console.log(response.text);
            var $ = cheerio.load(response.text);
            var links = $('table.olt').find('tr>td.title>a');
            links.each(function(index){
                var title = $(this).attr('title');
                var href = $(this).attr('href');
                keywords.forEach(function(key, idx){
                    if(title.indexOf(key) != -1){
                        console.log(title);
                        console.log(href);
                    }
                });
            });
        }
    });
