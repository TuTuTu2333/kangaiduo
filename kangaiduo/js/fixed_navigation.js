$(() => {
    //滑动显示
    $(".my_mr:eq(1)").mouseenter(() => {
        $(".my_mr_container").css("opacity", "0");
        $(".my_mr .pointer").css("opacity", "0");
        $(".online_code").css("display", "block");
        $(".online_pointer").css("display", "block");
    }).mouseleave(() => {
        $(".my_mr_container").css("opacity", "1");
        $(".my_mr .pointer").css("opacity", "2");
        $(".online_code").css("display", "none");
        $(".online_pointer").css("display", "none");
    })

    $(".sm_two_order").mouseenter(() => {
        $(".sm_two_order_container").css("display", "block");
        $(".sm_two_order .pointer").css("display", "block");
    }).mouseleave(() => {
        $(".sm_two_order_container").css("display", "none");
        $(".sm_two_order .pointer").css("display", "none");
    })

    //滑动显示动画
    leftAnimate(".my_Info", ".my_Info .my_Info_container", ".my_Info .pointer");
    leftAnimate(".Favorites", ".Favorites .Favorites_container", ".Favorites .pointer");
    leftAnimate(".view_soon", ".view_soon .view_soon_container", ".view_soon .pointer");
    leftAnimate(".order_current", ".order_current .order_current_container", ".order_current .pointer");
    leftAnimate(".my-tsBox", ".my-tsBox .order_current_container", ".my-tsBox .pointer");

    //点击展开
    let name = Cookie.getItem("username");
    if (Cookie.hasItem("username")) {
        showNaviRight(".my_Info", ".my_Info_isLogin", ".cart", ".collect");
        showNaviRight(".cart_box", ".cart", ".my_Info_isLogin", ".collect");
        $(".my_Info_nihao").text(name)
        $(".my_Info_login_red").text(",您好").css("color", "#000");
        showNaviRight(".Favorites", ".collect", ".my_Info_isLogin", ".cart");
    } else {
        showNaviRight(".my_Info", ".my_Info_isLogin", ".cart", ".login_boxs");
        showNaviRight(".cart_box", ".cart", ".my_Info_isLogin", ".login_boxs");
        showNaviRight(".Favorites", ".login_boxs", ".my_Info_isLogin", ".cart");
    }


    $(".backUp_top").click(function () {
        $(".top_img").scrollTop(0, 0);
    })
    $(".in-close-right").click(function () {
        $(".fixed_navigation").css("right", "-264px");
        $(".my_Info,.cart_box,.Favorites").removeClass("reveal");
    })

    function showNaviRight(node1, node2, node3, node4) {
        $(node1).click(function () {
            if (!$(this).hasClass("reveal")) {
                $(".fixed_navigation").css("right", "0");
                $(node2).css("display", "block");
                $(this).addClass("reveal").siblings().removeClass("reveal");
                $(node3).css("display", "none");
                $(node4).css("display", "none");
            } else {
                $(".fixed_navigation").css("right", "-264px");
                $(node2).css("display", "none");
                $(node3).css("display", "none");
                $(node4).css("display", "none");
                $(this).removeClass("reveal");
            }
        })
    }

    function leftAnimate(node1, node2, node3) {
        $(node1).mouseenter(() => {
            $(node2)
                .animate({

                    "right": "36px",
                    "opacity": "1",
                }, 500)

            $(node3)
                .animate({
                    "right": "30px",
                    "opacity": "1",
                }, 500)
        }).mouseleave(() => {
            $(node2).stop();
            $(node3).stop();
            $(node2)
                .css({
                    "right": "66px",
                    "opacity": "0",
                })

            $(node3)
                .css({
                    "right": "60px",
                    "opacity": "0",
                })
        })
    }

    $(".my_Info_login_red").click(function () {
        $(".my_Info_isLogin").css("display", "none");
        $(".login_boxs").css("display", "block");
    })

    //登录
    let username, password;
    $("#login_user").blur(function () {
        username = $("#login_user").val();
        if (username.length == 0) {
            $(".errorTxt:eq(0)").css("display", "block").text("用户名不能为空");
            $(this).css("border", "1px solid #fba2a2")
        }
    }).focus(function () {
        $(".errorTxt:eq(0)").css("display", "none");
        $(this).css("border", "1px solid #ccc")
    })

    $("#login_pwd").blur(function () {
        password = $("#login_pwd").val();
        if (password.length == 0) {
            $(".errorTxt:eq(1)").css("display", "block").text("密码不能为空");
            $(this).css("border", "1px solid #fba2a2")
        }
    }).focus(function () {
        $(".errorTxt:eq(1)").css("display", "none");
        $(this).css("border", "1px solid #ccc")
    })

    $("#btn").click(function () {
        username = $("#login_user").val();
        password = $("#login_pwd").val();
        if (username.length == 0) {
            $(".errorTxt:eq(0)").css("display", "block").text("用户名不能为空");
            $(this).css("border", "1px solid #fba2a2")
        }
        if (password.length == 0) {
            $(".errorTxt:eq(1)").css("display", "block").text("密码不能为空");
            $(this).css("border", "1px solid #fba2a2")
        } else if (password.length < 6 && password > 20) {
            $(".errorTxt:eq(1)").css("display", "block").text("密码长度应在6-20位之间！");
            $(this).css("border", "1px solid #fba2a2")
        }

        password = md5(password).substr(0, 10);
        let data = {
            username,
            password
        }
        $.ajax({
            type: "post",
            url: "../php/login.php",
            data,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    Cookie.setItem("username", username, '/', 3);
                    window.location.href = "http://127.0.0.1/H51913/myProject1/kangaiduo/html";
                } else {
                    if (response.status == "error1") {
                        $(".errorTxt:eq(0)").css("display", "block").text(response.msg);
                        $(this).css("border", "1px solid #fba2a2")
                        $("#login_pwd").val("");
                    } else if (response.status == "error2") {
                        $(".errorTxt:eq(1)").css("display", "block").text(response.msg);
                        $(this).css("border", "1px solid #fba2a2")
                        $("#login_pwd").val("");
                    }
                }
            }
        });
    })

    getCartData();
    getCartGoodsNumber($(".kad-cartNums"));
    getCartGoodsNumber($("#myCartNum"));

    function getCartGoodsNumber(node) {
        let user = Cookie.getItem("username");
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=getCount&user_name=${user}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    node.text(response.count);
                }
            }
        });
    }

    function cartRenderUI(data) {
        let oLi = data.map(ele => {
            return `
            <li class="oli" data-item-id=${ele[0].id}>
              <i class="delet_btns"></i>
                <p class="pro_t">
                  <span>${ele[0].name}</span>
                </p>
                <div class="pro_box">
                 <div class="pic_show">
                   <img src="${ele[0].src}" alt="">
                 </div>
                 <div class="changeNum">
                    <p class="pro_price">单价：${(ele[0].price).replace(/[^\d.]/g, "")}元</p>
                    <p class="pb4">小计：</p>
                    <span class="clickBtns red_btn" id="red_btn"></span>
                    <input type="text"  id="carts_num" value="1">
                    <span class="clickBtns add_btn" id="add_btn"></span>
                 </div>
                </div>
             </li>`;
        }).join("");

        let html = `<ul id="ul1">${oLi}</ul>`;
        $(".pc_proLists").html(html);

        newCount();
        deleteCart();
        cartCount();
    }


    function getCartData() {
        let user = Cookie.getItem("username");
        $.ajax({
            type: "get",
            url: "../php/cart.php",
            data: `type=get&user_name=${user}`,
            dataType: "json",
            success: function (response) {
                cartRenderUI(response)
            }
        });
    }

    //实现删除功能
    function deleteCart() {
        let user = Cookie.getItem("username");
        $(".oli").each(function () {
            $(this).find(".delet_btns").click(function () {
                let goods_id = $(this).parent().data("item-id");
                $.ajax({
                    type: "post",
                    url: "../php/cart.php",
                    data: `type=delete&user_name=${user}&goods_id=${goods_id}`,
                    dataType: "json",
                    success: function (response) {
                        if (response.status == "success") {
                            getCartData();
                            getCartGoodsNumber($(".kad-cartNums"));
                            getCartGoodsNumber($("#myCartNum"));
                        }
                    }
                });
            })
        })
    }

    function newCount() {
        let user = Cookie.getItem("username");
        $(".oli").each(function () {
            let goods_id = $(this).data("item-id");
            let self = this;
            $.ajax({
                type: "post",
                url: "../php/cart.php",
                data: `type=newCount&user_name=${user}&goods_id=${goods_id}`,
                success: function (response) {
                    let num1 = ($(self).find(".pro_price").text().replace(/[^\d.]/g, "") * 1).toFixed(1);
                    let num2 = ($(self).find(".oldPrice").text().replace(/[^\d.]/g, "") * 1).toFixed(1);
                    $(self).find("#carts_num").val(response);
                    $(self).find(".pb4").text("小计:" + (response * num1).toFixed(2) + "元");
                    totalPrice();
                }
            });
        })
    }

    //更新数量
    function cartCount() {
        $(".oli").on("click", ".clickBtns", function () {
            if ($(this).attr("id") == "red_btn") {
                let num = $(this).next().prop("value") * 1;
                if (num <= 1) {
                    updateData(this, 1);
                } else {
                    updateData(this, num - 1);
                }

            } else if ($(this).attr("id") == "add_btn") {
                let num = $(this).prev().prop("value") * 1;
                if (num >= 9) {
                    updateData(this, 9);
                } else {
                    updateData(this, num + 1);
                }
            }
        })
    }

    function updateData(ele, count) {
        let user = Cookie.getItem("username");
        let goods_id = $(ele).parent().parent().parents(".oli").data("item-id");
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=update&user_name=${user}&goods_id=${goods_id}&count=${count}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $(ele).siblings("input").val(count);
                    getCartGoodsNumber($(".kad-cartNums"));
                    getCartGoodsNumber($("#myCartNum"));
                    totalPrice();
                }
            }
        });

        let node = $(ele).parent().parent().parents(".oli");
        let num1 = (node.find(".pro_price").text().replace(/[^\d.]/g, "") * 1).toFixed(1);

        node.find(".carts_num").val(count);
        node.find(".pb4").text("小计:" + (count * num1).toFixed(2) + "元");
    }

    //结算
    function totalPrice() {
        let totalCount = 0;
        let totalPrice = 0;

        $(".oli").each(function () {
            let currentNum = $(this).find("#carts_num").val() * 1;
            let currentPrice = $(this).find(".pb4").text().replace(/[^\d.]/g, "") * 1;
            totalCount += currentNum;
            totalPrice += currentPrice;
        })
        $(".pro_num").text(totalCount);
        $(".cart_totalPrices").text("￥" + totalPrice.toFixed(2));
    }
})