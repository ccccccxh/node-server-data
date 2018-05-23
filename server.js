var express = require('express');
var http = require('http');
var path = require('path');
var app = express();

app.get('/', function (req, res) {
    res.sendFile(__dirname + "\\public\\index.html");
});
app.use(express.static(path.join(__dirname, 'public')));

// 已知开发者信息 token已获取
var data = {
    access_token: "e75447e2-d61b-4f3f-9d59-0ef6d1b1b185",
    appId: "MRJ_81a4798aacf14f41b1ca087f6c6be69e",
    start: '2018-05-01',
    end: '2018-05-23'
};
data = require('querystring').stringify(data);

var opt = {
    hostname: 'dev.meirenji.cn',
    port: 80,
    method: 'POST',
    path: '/api/v2/multipleInstance/traffic/day',
    headers: {
        'Content-Type': 'application/x-www-form-urlencoded',
    }
};

app.get("/getData", function (req, response) {
    var body = '';
    var req = http.request(opt, function (res) {
        console.log("response:" + res.statusCode);
        if (res.statusCode == 200) {
            res.on('data', function (data) {
                // console.log(data);
                body += data;
            }).on('end', function () { //请求结束时触发
                console.log(typeof body);
                ans = JSON.parse(body);
                console.log(ans.content.length);
                response.end(body);
            });
        }
    }).on('error', function (e) { //发生错误时触发
        console.log("error:" + e.message);
    });

    //write data to request body
    req.write(data);
    req.end();
});


var server = app.listen(8888, function () {

    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port);

});