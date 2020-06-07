$(() => {
    $("#header").load("./index.html .top_img,.header_top,.header-center,.nav");

    $("#fixed").load("./fixed_navigation.html .fixed_navigation", function () {
        $.getScript("../js/fixed_navigation.js");
        $(".online_kefu_container").css("display", "none");
        $(".online_kefu").css("background", "url(https://res.360kad.com/theme/default/img/rightbar/online_hidden.gif?v2016) no-repeat center center")
    })

    $("#footer").load("./index.html .wrap_footer,.footer_list")

    let queryString = decodeURI(window.location.search.slice(1));
    let obj = queryStringToObj(queryString);
    let len = (Object.keys(obj)).length;

    if (len == 3) {
        $("#main").find(".w-dtl-mag-lar img").attr("src", obj.src);
        $("#main").find(".minPicScroll img").attr("src", obj.src);
        $("#main").find(".max_img img").attr("src", obj.src);
        $("#main").find(".prem-proname h1").text(obj.name);
        $("#main").find(".nophone-rspan2").text(obj.price);
        $("#main").find(".nophone-rspan5").css("display", "none");
    }

    if (len == 2) {
        $.ajax({
            type: "post",
            url: "../php/shopParticulars.php",
            data: `id=${obj.id}&table=${obj.table}`,
            dataType: "json",
            success: function (response) {
                $("#main").find(".w-dtl-mag-lar img").attr("src", response[0].src);
                $("#main").find(".minPicScroll img").attr("src", response[0].src);
                $("#main").find(".max_img img").attr("src", response[0].src);
                $("#main").find(".prem-proname h1").text(response[0].name);
                $("#main").find(".prem-prodesc").text(response[0].adv);
                $("#main").find(".nophone-rspan2").text(response.price);

                let disCounts = (response[0].oldPrice.slice(1)) - (response[0].price.substr(0, response[0].price.length - 1).slice(1));
                $("#main").find(".nophone-rspan5 i").text(disCounts);

                let str = response[0].name.split(" ");
                $("#main").find(".dtl-inf-rur").text(str[str.length - 1]);
                $("#main").find(".shopName").text(str[1]);
            }
        });

    }

    function queryStringToObj(str) {
        let obj = {};
        let arr1 = str.split("&");
        arr1.forEach(element => {
            let arr2 = element.split("=");
            obj[arr2[0]] = arr2[1];
        });
        return obj;
    }

    //放大镜
    $(".w-dtl-mag-lar").mouseenter(function () {
        $(".min_box").addClass("current");
        $(".max_box").addClass("current");
    }).mouseleave(function () {
        $(".min_box").removeClass("current");
        $(".max_box").removeClass("current");
    })
    $(".w-dtl-mag-lar").mousemove(function (e) {
        /* 得到遮罩物自身宽和高 */
        let centerX = $(".min_box").width();
        let centerY = $(".min_box").height();

        /* 得到距离浏览器的距离 */
        let x = $(this).offset().left;
        let y = $(this).offset().top;

        /* 得到遮罩物距左边盒子的距离 */
        let left = e.pageX - x - centerX / 2;
        let top = e.pageY - y - centerY / 2;

        /* 遮罩物向x轴移动的最大距离 */
        let minPicX = $(this).width() - centerX;
        /* 遮罩物向Y轴移动的最大距离 */
        let minPicY = $(this).height() - centerY;

        /* 设置临界值 */
        if (left <= 0) {
            left = 0
        } else if (left > minPicX) { //向左运动的最大距离
            left = minPicX;
        }
        if (top <= 0) {
            top = 0;
        } else if (top >= minPicY) { //向下运动的最大距离
            top = minPicY;
        }

        $(".min_box").css("left", left).css("top", top);
        // console.log(left, top);

        /* 等比例缩放：遮罩物移动的距离/小盒子移动的巨大距离 = 显示区移动的距离/大盒子移动的最大距离 */
        /* 显示区移动的图片 = 遮罩物移动的距离/小盒子移动的巨大距离 *大盒子移动的最大距离  */

        /* 得到大图片移动的最大距离 */
        maxPicX = $(".max_img").width() - $(".max_box").width();
        maxPicY = $(".max_img").height() - $(".max_box").height();

        /* 得到显示区域的的移动的图片 */
        let leftImg = -left / minPicX * maxPicX;
        let topImg = -top / minPicY * maxPicY;
        // console.log(leftImg, topImg);
        $(".max_img").css("left", leftImg).css("top", topImg);
    });

    //商品数量按钮
    $("#main").find(".inf-r-numjs").on("click", ".numjs-com", function () {
        let val = $("#main").find(".inf-r-numjs .numjs-m").val();
        if ($(this).text() == "-") {
            val--;
            if (val <= 1) {
                $("#main").find(".inf-r-numjs .numjs-m").val("1");
            } else {
                $("#main").find(".inf-r-numjs .numjs-m").val(val);
            }
        } else if ($(this).text() == "+") {
            val++;
            if (val >= 999) {
                $("#main").find(".inf-r-numjs .numjs-m").val("999");
            } else {
                $("#main").find(".inf-r-numjs .numjs-m").val(val);
            }
        }
    })

    //加入购物车
    let username = Cookie.getItem("username");

    $(".buystyle-pre").click(function () {
        if (!Cookie.hasItem("username")) {
            window.location.href = ("http://127.0.0.1/H51913/myProject1/kangaiduo/html/login.html")
        } else {
            let shopNum = $("#main").find(".inf-r-numjs .numjs-m").val();
            let data = {
                type: "add",
                table: obj.table,
                goods_id: obj.id,
                user_name: username,
                product_num: shopNum
            }
            // console.log(obj.table, obj.id, username, shopNum);
            $.ajax({
                type: "post",
                url: "../php/cart.php",
                data,
                dataType: "json",
                success: function (response) {
                    if (response.status = "success") {
                        alert("加入成功");
                    };
                }
            });
        }
    })

})