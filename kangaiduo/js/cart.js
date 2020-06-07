$(() => {
    let username = Cookie.getItem("username");
    $("#header").load("./index.html .header_top", function () {
        $.getScript("../js/header_footer.js");
        getCartGoodsNumber();
    });
    $("#footer").load("./index.html .wrap_footer,.footer_list", function () {
        $.getScript("../js/header_footer.js");
    });

    getCartData();

    function getCartGoodsNumber(node) {
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=getCount&user_name=${username}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $(".tcart a span").text(response.count);
                }
            }
        });
    }

    //渲染购物车
    function cartRenderUI(data) {
        let oLi = data.map(ele => {
            return `
            <li class="act" data-item-id="${ele[0].id}">
            <div class="disb item1">
                <label for="" class="single-chose">
                    <i class="on">
                        <input type="checkbox" id="product" class="check-box-input input1">
                    </i>
                </label>
            </div>
            <div class="disb item2">
                <img src="${ele[0].src}"
                    alt="">
            </div>
            <div class="disb item3">
                <p>
                    <i class="icon0 icon01"></i>
                    <span>${ele[0].name}</span>
                </p>
            </div>
            <div class="disb item4">￥${(ele[0].price).replace(/[^\d.]/g, "")}</div>
            <div class="disb item5">
                <span class="reduct-btn" id="res">-</span>
                <input type="text" id="product_num" class="num-txt" value="1">
                <span class="reduct-btn" id="add">+</span>
            </div>
            <div class="disb item6">
                省<span class="save-price"></span>元
                <span class="oldPrice" style="display:none;">${ele[0].oldPrice}</span>
            </div>
            <div class="disb item7">
                ￥<span></span>
            </div>
            <div class="disb item8">
                <span class="delte-btn">删除</span>
            </div>
        </li>`;
        }).join("");

        let html = `
        <p class="th-title">康爱多</p>
        <ul class="pro-list-box">${oLi}</ul>`;
        $(".cart-body").html(html);

        newCount();
        deleteCart();
        allDeleteCar();
        cartCount();
        checkedWithShop();
    }

    //封装函数来获取购物车中所有的商品信息
    function getCartData() {
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=get&user_name=${username}`,
            dataType: "json",
            success: function (response) {
                cartRenderUI(response);
            }
        });
    }

    //实现删除功能
    function deleteCart() {
        $(".pro-list-box .act").each(function () {
            $(this).find(".delte-btn").click(function () {
                let goods_id = $(this).parent().parent().data("item-id");
                getNetWeak(goods_id);
            })
        })
    }

    //实现批量删除
    function allDeleteCar() {
        $(".delte-full-btn").click(function () {
            $(".act").each(function () {
                let isCheck = $(this).find(".check-box-input").prop('checked');
                let goods_id = $(this).data("item-id");
                if (isCheck) {
                    getNetWeak(goods_id);
                }
            })

            $(".product-nums").text("0");
            $(".save").text("￥0");
            $(".product-total-price").text("￥0");
        })
    }

    function getNetWeak(goods_id) {
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=delete&user_name=${username}&goods_id=${goods_id}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    getCartData();
                    getCartGoodsNumber();
                }
            }
        });
    }

    function newCount() {
        $(".act").each(function () {
            let goods_id = $(this).data("item-id");
            let self = this;
            $.ajax({
                type: "post",
                url: "../php/cart.php",
                data: `type=newCount&user_name=${username}&goods_id=${goods_id}`,
                success: function (response) {
                    let num1 = ($(self).find(".item4").text().replace(/[^\d.]/g, "") * 1).toFixed(1);
                    let num2 = ($(self).find(".oldPrice").text().replace(/[^\d.]/g, "") * 1).toFixed(1);
                    $(self).find(".num-txt").val(response);
                    $(self).find(".item7 span").text((response * num1).toFixed(2));
                    $(self).find(".save-price").text(((num2 - num1) * response).toFixed(2));
                }
            });

        })
    }
    //更新数量
    function cartCount() {
        $(".act .item5").on("click", ".reduct-btn", function () {
            if ($(this).attr("id") == "res") {
                let num = $(this).next().prop("value") * 1;
                if (num <= 1) {
                    updateData(this, 1);
                } else {
                    updateData(this, num - 1);
                }

            } else if ($(this).attr("id") == "add") {
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
        let goods_id = $(ele).parent().parents(".act").data("item-id");
        $.ajax({
            type: "post",
            url: "../php/cart.php",
            data: `type=update&user_name=${username}&goods_id=${goods_id}&count=${count}`,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    $(ele).siblings("input").val(count);
                    getCartGoodsNumber();
                    totalPrice();
                }
            }
        });

        let node = $(ele).parent().parents(".act");
        let num1 = (node.find(".item4").text().replace(/[^\d.]/g, "") * 1).toFixed(1);
        let num2 = (node.find(".oldPrice").text().replace(/[^\d.]/g, "") * 1).toFixed(1);

        node.find(".num-txt").val(count);
        node.find(".item7 span").text((count * num1).toFixed(2));
        node.find(".save-price").text(((num2 - num1) * count).toFixed(2));
    }

    //全选与多选
    function checkedWithShop() {
        var allInput = $("#full-chose-input");
        allInput.click(function () {
            if (this.checked == true) {
                $(".check-box-input").prop('checked', true);
            } else {
                $(".check-box-input").prop('checked', false);
            }
            totalPrice();
        })

        $("#jie_num").click(function () {
            if (this.checked == true) {
                $(".check-box-input").prop('checked', true);
                allInput.prop('checked', true);
            } else {
                $(".check-box-input").prop('checked', false);
                allInput.prop('checked', false);
            }
            totalPrice();
        });

        $(".input1").click(function () {
            var s = $(".input1").length;
            var a = $(".input1:checked").length;
            if (s == a) {
                $(".check-box-input").prop('checked', true);
                allInput.prop('checked', true);
            } else {
                $("#jie_num").prop('checked', false);
                allInput.prop('checked', false);
            }

            totalPrice();
        });

    }

    //结算
    function totalPrice() {
        let totalCount = 0;
        let totslYouhui = 0;
        let totalPrice = 0;

        $(".act").each(function () {
            let isCheck = $(this).find(".check-box-input").prop('checked');
            if (isCheck) {
                let currentNum = $(this).find(".num-txt").val() * 1;
                let currentYouhui = $(this).find(".item6 .save-price").text() * 1;
                let currentPrice = $(this).find(".item7 span").text() * 1;

                totalCount += currentNum;
                totslYouhui += currentYouhui;
                totalPrice += currentPrice;
            }
        })

        $(".product-nums").text(totalCount);
        $(".save").text("￥" + totslYouhui.toFixed(2));
        $(".product-total-price").text("￥" + totalPrice.toFixed(2));
    }

})