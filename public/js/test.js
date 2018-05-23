var http = require("http");

// 开发者信息 appID appSecret
var data = {
    access_token:"e75447e2-d61b-4f3f-9d59-0ef6d1b1b185",
    // openId:"mrje4957b02e3e742d9aa5d9a5fac10734f",
    appId:"MRJ_81a4798aacf14f41b1ca087f6c6be69e",
    start:"2018-05-01",
    end:"2018-05-23"   
    // grant_type:"client_credentials",
    // client_id:"MRJ_8cb3ff97135c4fe49040088cec790d69",
    // client_secret:"02560ffcf7a5416e84189a657360525c"
};
data = require('querystring').stringify(data);  

var opt = {
    hostname:'dev.meirenji.cn',
    port:80,
    method:'POST',
    path:'/api/v2/multipleInstance/traffic/day',
    // path:'oauth/token',
    // path:'/api/v2',
    headers:{
        'Content-Type':'application/x-www-form-urlencoded',
        'Access-Control-Allow-origin':'*'
    }
};

var token_opt = opt;
token_opt.path = "/api/v2/multipleInstance/traffic/day";

var body = '';
var req = http.request(token_opt,function(res){
    console.log("response:" + res.statusCode);
    if(res.statusCode == 200){
        res.on('data',function(data){
            body += data;
        }).on('end',function(){//请求结束时触发
            // console.log(body);
            var todayNum,
                allNum,
                obj = eval ("(" + body + ")");

            //获取今日的客流量
            todayNum = obj.content[obj.content.length-1].in;
            document.getElementById("today_num").innerHTML("今日进馆："+todayNum+"/人次");

            //获取该段时间内的客流量总数
            for(let i=0;i<obj.content.length;i++){
                allNum += obj.content[i].in;
            }
            document.getElementById("all_num").innerHTML("累计总数："+allNum+"/人次");
        });
    }
}).on('error',function(e){//发生错误时触发
    console.log("error:" + e.message);
});

//write data to request body
req.write(data);
req.end();
    


