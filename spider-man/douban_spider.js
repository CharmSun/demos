// 引入 superagent、cheerio
const superagent = require("superagent");
const cheerio = require("cheerio");

// 登陆 url 、目标 url
const urls = {
    login_url: "https://accounts.douban.com/login",
    target_url: "https://www.douban.com/people/141019920/"
};

// post 参数信息，其中，还差先前分析的 _xsrf 信息
const formData = {
    source: 'index_nav',
    form_email: 'scott0812@126.com',
    form_password: 'xxxxxxx'
};


// 发送登陆请求，获取 cookie 信息
function getLoginInfo() {
    //  首先，需在 set 方法中设置请求报文中参数，以性器官免服务器端有针对非浏览器请求做相关处理
    //  send 方法中设置 post 请求中需提交的参数
    //  redirects 方法调用，其中参数为 0 ，为了避免在用户登陆成功后，引起的页面重新刷新，从而无法获取 cookie
    superagent
        .post(urls.login_url)
        .set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
        .set("Content-Type", "application/x-www-form-urlencoded")
        .send(formData)
        .redirects(0)
        .end(function (err, response) {
            if (!err) {
                cookie = response.headers["set-cookie"];
                console.log(cookie);
                console.log(response.text);
                var $ = cheerio.load(response.text);
                var name = $('.nav-user-account').find('span').first().text();
                console.log(name);
            } else {
                console.log(err.message);
            }
        });
}

// 根据 cookie ，获取页面信息
function getUserInfo() {
    var cookie = ['bid=GXAiMDrkJ-w; __yadk_uid=YrtMCi0tZg4aMjd50sxV1PBWH0aCULUr; ll="108288"; ps=y; _vwo_uuid_v2=5DD83EC9526C6CA0D3E4B1AFD30D7A5C|25e8bfe25efd33be69ebbd9dc2b9fd53; ct=y; _pk_ref.100001.8cb4=%5B%22%22%2C%22%22%2C1497596821%2C%22https%3A%2F%2Fwww.baidu.com%2Flink%3Furl%3DUwVswsw5adQU_P5MzUoYZ1KkNcg-6wj3zxHNZrJ9XVe%26wd%3D%26eqid%3D9ecbfa9a0001d4f2000000035942c40c%22%5D; __utmt=1; _ga=GA1.2.1776850086.1464441924; _gid=GA1.2.1121033765.1497548646; ck=K9nr; push_noty_num=0; push_doumail_num=0; _pk_id.100001.8cb4=476a9535a1171e50.1464441919.10.1497597334.1497552386.; _pk_ses.100001.8cb4=*; __utma=30149280.1776850086.1464441924.1497547795.1497596826.10; __utmb=30149280.35.5.1497597333995; __utmc=30149280; __utmz=30149280.1497547795.9.4.utmcsr=baidu|utmccn=(organic)|utmcmd=organic; __utmv=30149280.14101; ap=1; ue="scott0812@126.com"; dbcl2="141019920:q+AOlNvz/eY"'];
    superagent
        .get(urls.target_url)
        .set("Cookie", cookie)
        .set("User-Agent", "Mozilla/5.0 (Macintosh; Intel Mac OS X 10_12_5) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/58.0.3029.110 Safari/537.36")
        .end(function (err, response) {
            if (err) {
                console.log(err);
            } else {
                //console.log(response.text);
                var $ = cheerio.load(response.text);
                var name = $('#db-usr-profile .pic img').attr('alt');
                var pic =  $('#db-usr-profile .pic img').attr('src');
                console.log('ID: '+ name);
                console.log('头像：'+ pic);
            }
        });
}


getUserInfo();
