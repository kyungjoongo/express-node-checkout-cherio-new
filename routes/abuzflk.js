var request = require('request');
var cheerio = require("cheerio");
var syncRequest = require('sync-request');
request = request.defaults({jar: true});

var options = {
    headers: {
        'User-Agent': 'Mozilla/5.0 (Macintosh; U; Intel Mac OS X 10.6; rv:1.9.2.16) Gecko/20110319 Firefox/3.6.16'
    },
    proxy: '171.101.236.116:3128'

};

request(options, function () {


    var str = '집밥 백선생 레시피 모음34234234234'
    var qs = require('querystring');

    var encodedStr = qs.escape(str);


    var res = syncRequest('get', 'https://search.naver.com/search.naver?date_from=&date_option=0&date_to=&dup_remove=1&nso=&post_blogurl=&post_blogurl_without=' +
        '&sm=tab_pge&srchby=all&st=sim&where=post&query='+ encodedStr+
        '&start='+ 11);



    var $ = cheerio.load(res.getBody());
    var blogListJson = new Array()

    var count= '';
    $('.title_num').each(function () {

        var title= $(this).text();

        var _titles= title.split('/');

        count = _titles[1].replace('건', '')

        console.log('################' + count);


        console.log('################' + title);

    });

    $('.sh_blog_top').each(function () {


        var image = $(this).find('.thumb').children().children('img').attr('src');
        var title = $(this).find('._sp_each_title').attr('title');
        var href = $(this).find('._sp_each_title').attr('href');

        //inline
        var blog_href = $(this).find('.inline').children().attr('href');

        //sh_blog_title _sp_each_url _sp_each_title

        blogListJson.push({
            image: image,
            title: title,
            href:href,
            blog_href : blog_href

        })

    });

    var finalListJson = {
        count : count,
        blog_list : blogListJson
    }


    console.log(finalListJson);
    console.log("###" + finalListJson.length);



});