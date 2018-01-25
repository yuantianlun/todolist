window.onload=function() {
// 轮播图插件开始
    var swiper = new Swiper('.swiper-container', {
        pagination: {
            el: '.swiper-pagination',
        },
        autoplay: {
            delay: 2500,
            disableOnInteraction: false,
        },
    });
//轮播图插件结束
//两个按钮开始
    $(".wei").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
    $(".yi").click(function () {
        $(this).addClass("active").siblings().removeClass("active");
    });
//两个按钮结束
    //
    $(".add").click(function () {
        $(".zhe").show().children().addClass("show");
    });
    $(".submit").click(function () {
        $(".zhe").hide().children().removeClass("show");
    });
    $(".submit").click(function () {
        if ($("#text").val() === "") {
            $(".tips").html("请输入文字").addClass("tipsShow");
            return;
            render();
        }
        var val = $("#text").val();
        var data = getData();
        var date = new Date();
        let year = date.getFullYear();
        let month = date.getMonth() + 1;
        let days = date.getDate();
        let time = `${year}-${month}-${days}`;
        data.push({text: val, isDone: false, isStar: false, time:time});
        saveData(data);
        render();
    });

    $(".close").click(function () {
        $(".zhe").hide().children().removeClass("show");
    });

    function getData() {
        return localStorage.todo ? JSON.parse(localStorage.todo) : [];
    }

    function saveData(data) {
        localStorage.todo = JSON.stringify(data);
    }

    function render() {
        var data = getData();
        var str = "";
        $.each(data, function (index, ele) {
            str += `
        <li>
            <p>${ele.text}</p>   
            <time>${ele.time}</time>
            <i>0</i>
            <div>完成</div>
        </li>
        `;
        });
        $(".content ul").html(str);
    }

    render();
    function getDate(time) {
        var date = new Date();
        date.setTime(time);
        var year = date.getFullYear();
        var month = setZero(date.getMonth() + 1);
        var day = setZero(date.getDate());
        var days = date.getDate();
        var hours = date.getHours();
        var minutes = date.getMinutes();
        var time = `${year}-${month}-${days} ${hours}:${minutes}`;

    }

    function setZero() {
        return n < 10 ? "0" + n : n;
    }

    (function addEvent() {
        var max = $(".content ul li div").width();
        $(".content ul li").each(function (index, ele) {
            var sx, mx, pos = "start", movex;
            var hammer = new Hammer(ele);
            hammer.on("panstart", function (e) {
                $(ele).css("transition", "none");
                sx = e.center.x;
                $(ele).siblings().css("x", 0)
            });
            hammer.on("panmove", function (e) {
                var cx = e.center.x;
                mx = cx - sx;
                if (pos === "start" && mx > 0) {
                    return;
                }
                if (pos === "end" && mx < 0) {
                    return;
                }
                if (Math.abs(mx) > max) {
                    return;
                }
                if (pos === "start") {
                    movex = mx;
                } else if (pos === "end") {
                    movex = mx - max;
                }
                $(ele).css({x: movex});
            });
            hammer.on("panend", function () {
                $(ele).css("transition", "all .5s");
                if (Math.abs(movex) > max / 2) {
                    $(ele).css({x: -max});
                    pos = "end";
                } else {
                    $(ele).css({x: 0});
                    pos = "start"
                }
            });
        })
    })()


};