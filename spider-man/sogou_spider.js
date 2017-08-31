/**
 * author: suncan
 * date: 2016/10/21
 * description: 爬取大搜检索结果页面
 */

const https = require("https");
const fs = require("fs");
const path = require("path");
//const SOGOU_URL = "https://www.sogou.com/web?query=jd&_asf=www.sogou.com&_ast=&w=01019900&p=40040100&ie=utf8&from=index-nologin&sut=929&sst0=1481180260668&lkt=0%2C0%2C0";

var req = https.get({
        host: 'www.sogou.com',
        path: '/web?query=jd&_asf=www.sogou.com&_ast=&w=01019900&p=40040100&ie=utf8&from=index-nologin&sut=929&sst0=1481180260668&lkt=0%2C0%2C0',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Windows NT 6.1; WOW64) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/54.0.2840.99 Safari/537.36'
        }
    }, (response) => {
        var body = [];

if(response.statusCode == 200){
    console.log('===开始爬取搜狗PC搜索结果页环境===');
}else{
    return;
}

response.on('data', (chunk) => {
    body.push(chunk);
});

response.on('end', () => {
    body = Buffer.concat(body);
//console.log(body.toString());
var regExp1 = /url\((\/|\.{1,2}\/)(.+?)\)/g;
console.log( "替换搜索结果页css 中背景图资源：");
console.log( body.toString().match(regExp1) );
var result = body.toString().replace( regExp1, "url('https://www.sogou.com/$2')");
console.log( "替换背景图url完成！");

var regExp2 = /href=["'][\/\.](\w.+?)["']/g;
console.log( "替换搜索结果页链接中的本地资源：")
console.log( result.match(regExp2) );
result = result.replace( regExp2, "href=\"https://www.sogou.com/$1\"");
console.log( "替换链接本地资源完成！");

var regExp3 = /src=["'](\/|\.{1,2}\/)(\w.+?)["']/g;
console.log( "替换搜索结果页中的src本地资源：")
console.log( result.match(regExp3) );
result = result.replace( regExp3, "src=\"https://www.sogou.com/$2\"");
console.log( "替换src本地资源完成！");

//var regExp4 = /<script[^>]*>(.*?)<\/script>/ig;
//result = result.replace( regExp4, "\r\n");
var regExp4 = /<!--Right BRAND start-->(.*?)<!--Right BRAND end-->/ig;
console.log( "开始替换右侧品专广告样式：");
//console.log( result.match(regExp4) );
result = result.replace( regExp4, "<!--Right BRAND start--><%-rightMaterial%><!--Right BRAND end-->");
console.log( "替换右侧广告样式完成！");

var regExp5 = /<!--Left BRAND start-->(.*?)<!--Left BRAND end-->/ig;
console.log( "开始替换左侧品专广告样式：");
//console.log( result.match(regExp5) );
result = result.replace( regExp5, "<!--Left BRAND start--><%-leftMaterial%><!--Left BRAND end-->");
console.log( "替换左侧广告样式完成！");

fs.writeFile(path.join(__dirname, "sogou_pc.html"), result, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("===成功爬取搜狗PC搜索结果页面线上环境！===");
});

});
});
req = https.get({
        host: 'm.sogou.com',
        path: '/web/searchList.jsp?uID=F11Yh1c3YllmdA2M&v=5&from=index&w=1274&t=1479374331713&s_t=1479374336985&s_from=index&keyword=jd&pg=webSearchList&sourceid=sugg&sugoq=&sugn=0',
        headers: {
            'User-Agent': 'Mozilla/5.0 (Linux; Android 6.0; Nexus 5 Build/MRA58N) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/46.0.2490.76 Mobile Safari/537.36'
        }
    }, (response) => {
        var body = [];

if(response.statusCode == 200){
    console.log('===开始爬取搜狗移动搜索结果页环境===');
}else{
    return;
}

response.on('data', (chunk) => {
    body.push(chunk);
});

response.on('end', () => {
    body = Buffer.concat(body);
//console.log(body.toString());
var regExp1 = /url\((\/|\.{1,2}\/)(.+?)\)/g;
console.log( "替换搜索结果页css 中背景图资源：");
console.log( body.toString().match(regExp1) );
var result = body.toString().replace( regExp1, "url('https://m.sogou.com/$2')");
console.log( "替换背景图url完成！");

var regExp2 = /href=["'][\/\.](\w.+?)["']/g;
console.log( "替换搜索结果页链接中的本地资源：");
console.log( result.match(regExp2) );
result = result.replace( regExp2, "href=\"https://m.sogou.com/$1\"");
console.log( "替换链接本地资源完成！");

var regExp3 = /src=["'](\/|\.{1,2}\/)(\w.+?)["']/g;
console.log( "替换搜索结果页中的src本地资源：");
console.log( result.match(regExp3) );
result = result.replace( regExp3, "src=\"https://m.sogou.com/$2\"");
console.log( "替换src本地资源完成！");

//var regExp4 = /<script[^>]*>(.*?)<\/script>/ig;
//result = result.replace( regExp4, "\r\n");
var regExp4 = /<!--顶部广告-->(.*?)<!--顶部广告 end-->/ig;
console.log( "开始替换移动品专广告样式：");
//console.log( result.match(regExp4) );
result = result.replace( regExp4, "<!--顶部广告--><div class=\"ec_ad_results js-ec-ad-results\"><div class=\"ad_result js-brand-ad-result\"><%-mobileMaterial%></div></div><!--顶部广告 end-->");
console.log( "替换移动广告样式完成！");

fs.writeFile(path.join(__dirname, "sogou_mobile.html"), result, (err) => {
    if (err) {
        return console.error(err);
    }
    console.log("===成功爬取搜狗移动搜索结果页面线上环境！===");
});

});
});
req.on('error', (e) => {
    console.log("Error: " + e.message);
});



