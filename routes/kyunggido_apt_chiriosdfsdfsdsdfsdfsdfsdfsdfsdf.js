var request = require("request");
var cheerio = require("cheerio");
/*var url = "http://www.roadrunnersports.com/rrs/products/16161";*/
var requestPromise = require('request-promise')
var syncRequest = require('sync-request');
var fetch = require("node-fetch");
var mergeJSON = require("merge-json");


var api_url = 'http://www.gico.or.kr/supply/parcels/parcels_list.do?bcIdx=87&searchCategory=143&pageNo=1';

var fianlresultJson = new Array()

var request = require('request');
var options = {
    url: api_url
};
request.post(options, function (error, res, body) {


    //console.log('##############'+ body);


    var $ = cheerio.load(body);


    var count = '';
    $('.t_list > tbody > tr').each(function () {

        var no = $(this).find('td:nth-child(1)').text();
        var sort = $(this).find('td:nth-child(2)').text();
        var title = $(this).find('.t_subject').children().text();
        var index = $(this).find('.t_subject').children().attr('onclick');
        var date = $(this).find('td:nth-child(6)').text();

        var doc_ref = $(this).find('.pop-alllist').children().attr('href');

        //doc_ref = 'http://www.gico.or.kr'+ doc_ref;


        let _tempArr = index.split(',');

        let _tempIndex = _tempArr[0].replace('goView(', '');

        _tempIndex = _tempIndex.substring(1, _tempIndex.length - 1)


        var pop_list = [];
        //pop-list
        $('#layer' + _tempIndex + ' >  div > div > ul > li ').each(function () {

            var doc = $(this).children().attr('href');
            pop_list.push(doc);


        });

        if (doc_ref != '#') {

            if (doc_ref != undefined) {
                pop_list.push(doc_ref);
            }

        }


        var result = {
            no: no,//번호
            sort: sort,//구분
            date: date, //등록일
            index: _tempIndex, //index
            pop_list: pop_list,
            title: title //제목
        }


        fianlresultJson.push(result);
        /!*console.log('################' + title);*!/

    });


    console.log(fianlresultJson);
    console.log("###" + fianlresultJson.length);


});

/*


request({
    url: api_url,
    method: 'GET'
}, function (err, _response, body) {

    var $ = cheerio.load(body);


    var count = '';
    $('.t_list > tbody > tr').each(function () {

        var no = $(this).find('td:nth-child(1)').text();
        var sort = $(this).find('td:nth-child(2)').text();
        var title = $(this).find('.t_subject').children().text();
        var index = $(this).find('.t_subject').children().attr('onclick');
        var date = $(this).find('td:nth-child(6)').text();

        var doc_ref = $(this).find('.pop-alllist').children().attr('href');

        //doc_ref = 'http://www.gico.or.kr'+ doc_ref;


        let _tempArr = index.split(',');

        let _tempIndex = _tempArr[0].replace('goView(', '');

        _tempIndex = _tempIndex.substring(1, _tempIndex.length - 1)


        var pop_list = [];
        //pop-list
        $('#layer' + _tempIndex + ' >  div > div > ul > li ').each(function () {

            var doc = $(this).children().attr('href');
            pop_list.push(doc);


        });

        if (doc_ref != '#') {

            if (doc_ref != undefined) {
                pop_list.push(doc_ref);
            }

        }


        var result = {
            no: no,//번호
            sort: sort,//구분
            date: date, //등록일
            index: _tempIndex, //index
            /!*doc_ref: doc_ref,*!/
            pop_list: pop_list,
            title: title //제목
        }


        fianlresultJson.push(result);
        /!*console.log('################' + title);*!/

    });


    console.log(fianlresultJson);
    console.log("###" + fianlresultJson.length);

});



*/


/*title_num*/






