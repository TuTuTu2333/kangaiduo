$(() => {
    let username = Cookie.getItem("username");
    if (Cookie.hasItem("username")) {
        $(".YnewNoLogin").css("display", "none");
        $(".YnewYesLogin").css("display", "block");
        $(".YUserName").text(username);
    } else {
        $(".YnewNoLogin").css("display", "block");
        $(".YnewYesLogin").css("display", "none");
    }

    $(".Yout a").click(function () {
        Cookie.clear();
    })

    getCartGoodsNumber($(".tcart a span"));
    
    $.getJSON("../json/html-header.json",
        function (data) {
            new ManagerHeader(data).init();
        });
    $(".tlast").each(function () {
        $(this).mouseenter(function () {
            if (!$(this).hasClass("Yhover")) {
                $(this).parent().addClass("Yhover").children(".Ytopnavdiv,.Ycen").css(
                    "display", "block");
            }
            $(this).siblings(".Ytopnavdiv").css("display", "block");
        })
        $(".Yhover").mouseleave(function () {
            $(this).removeClass("Yhover").children(".Ytopnavdiv,.Ycen").css("display",
                "none");
        })
    })

    $(".stxt").focus(() => {
        $(".search_history").css("display", "block");
    }).blur(() => {
        $(".search_history").css("display", "none");
    })

    evenMouse(".kad-mc-ask:eq(0)", "#kad-mc-askBox1");
    evenMouse(".kad-mc-ask:eq(1)", "#kad-mc-askBox");

    function evenMouse(node1, node2) {
        $(node1).mouseenter(() => {
            $(node2).css("display", "block");
        }).mouseleave(() => {
            $(node2).css("display", "none");
        })
    }

    $(".friendLinks .linkBox").mouseenter(function () {
        $(".footer_list .aboutKadList").css("margin-top", "50px");
        $(this).parent(".friendLinks").css("overflow", "visible")
    })
    $(".friendLinks .linkBox").mouseleave(function () {
        $(".footer_list .aboutKadList").css("margin-top", "6px");
        $(this).parent(".friendLinks").css("overflow", "hidden")
    })

    $(".lNav").css("display", "block");

    //封装函数获取购物车中商品的数量
    function getCartGoodsNumber(node) {
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=getCount&user_name=${username}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    node.text(response.count);
                }
            }
        });
    }
})