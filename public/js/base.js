$(document).ready(function(){

    //获取当前时间
    function setTime(){
        var today = new Date();
        var year = today.getFullYear();
        var month = today.getMonth() + 1;
        var day = today.getDate();
        var week = today.getDay();
        var hours = today.getHours();
        var minutes = today.getMinutes();
        var w = ['星期一','星期二','星期三','星期四','星期五','星期六','星期日'];
        hours = checkTime(hours);
        minutes = checkTime(minutes);
        var date = year + '年' + month + '月' + day + '日' +  ' ' + w[week] + ' ' + hours + ':' + minutes;
        $("p").html(date);
        setTimeout(setTime,1000);
        function checkTime(time){
            if(time<10){
                time = '0' + time;
            }
            return time;
        }
    }
    setTime();

    //获取当天客量数据
    $.ajax({
        url:'/getData',
        dataType: "json",
        success:function(data){
            // console.log(data);
            var todayNum,
                allNum = 0;

            //获取今日的客流量
            todayNum = data.content[data.content.length-1].in;
            $("#today_num").html("今日进馆："+todayNum+"/人次");

            //获取该段时间内的客流量总数
            for(let i=0;i<data.content.length;i++){
                allNum =allNum + data.content[i].in;
            }
            $("#all_num").html("累计总数："+allNum+"/人次");
        },
        error:function (xhr, status, error) {
            console.log('Error: ' + error.message);
        }

    });
});