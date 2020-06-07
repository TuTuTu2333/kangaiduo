$(() => {
    $("#foot").load("login-register_footer.html .footer");

    $("#phone").blur(function (e) {
        let val = $.trim($(this).val());
        if (/^1[3-9]\d{9}$/.test(val)) {

            $(".yes-icon1").css("display", "none");
            $(".prompt-size:eq(0)").text("");
        } else {
            $(".prompt-size:eq(0)").text("!请输入正确的手机号或邮箱")
        }
        e.stopPropagation();
    });

    $("#pwd").blur(function (e) {
        let val = $.trim($(this).val());
        if (!/^\w{6,}$/.test(val)) {
            $(".prompt-size:eq(1)").text("!请输入至少6位数的密码")
        } else {
            $(".prompt-size:eq(1)").text("");
        }
        e.stopPropagation();
    });

    let count = 0;
    $(".open").click(function () {
        count++;
        if (count % 2 != 0) {
            $(this).css("background", "url(../img/iconPng8.png) no-repeat -168px 0");
            $("#pwd").attr("type","text");
        } else {
            $(this).css("background", "url(../img/iconPng8.png) no-repeat -130px 0");
            $("#pwd").attr("type","password");
        }
    })

    let imgCodeTarget;
    let captcha = new Captcha({
        lineNum: 7,
        dotNum: 30,
        fontSize: 30
    });
    captcha.draw(document.querySelector('#captcha'), r => {
        imgCodeTarget = r;
        // console.log(r, '验证码1');
        //当用户点击图像变化验证码的时候需要重新校验
        $("#imageCode").trigger("blur");
    });

    $("#imageCode").blur(function () {
        let val = $.trim($(this).val());
        if (imgCodeTarget == val) {
            $(".prompt-size:eq(2)").text("");
        } else {
            $(".prompt-size:eq(2)").text("!验证码不正确");
        }
    })

    $(".login-btn").click(function () {
        /* 检查用户是否输入了正确的信息并且通过验证，如果没有通过那么就返回 */
        $("#phone", "#pwd", "#imageCode").trigger("blur");
        if ($(".prompt-size").text() != "") {
            return;
        }

        // 发送网络请求把注册相关的信息提交给服务器 
        let data = {
            username: $.trim($("#phone").val()),
            password: md5($.trim($("#pwd").val())).substr(0, 10)
        }
        $.ajax({
            type: "post",
            url: "../php/register.php",
            data: data,
            dataType: "json",
            success: function (response) {
                if (response.status == "success") {
                    alert(response.msg);
                    window.location.href = "http://127.0.0.1/H51913/myProject1/kangaiduo/html/register.html";
                } else {
                    alert(response.msg);
                }
            }
        });
    })
})