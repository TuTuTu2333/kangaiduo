$(() => {
    let username;
    let password;

    $("#login_user").blur(function () {
        username = $("#login_user").val();
        if (username.length == 0) {
            $(".input-prompt:eq(0)").css("display", "block").children(".prompt-size").text("用户名不能为空");
        }
    }).focus(function () {
        $(".input-prompt:eq(0)").css("display", "none");
    })

    $("#login_pwd").blur(function () {
        password = $("#login_pwd").val();
        if (password.length == 0) {
            $(".input-prompt:eq(1)").css("display", "block").children(".prompt-size").text("密码不能为空");
        }
    }).focus(function () {
        $(".input-prompt:eq(1)").css("display", "none");
    })

    $("#btn").click(function () {
        username = $("#login_user").val();
        password = $("#login_pwd").val();
        if (username.length == 0) {
            $(".input-prompt:eq(0)").css("display", "block").children(".prompt-size").text("用户名不能为空");
        }
        if (password.length == 0) {
            $(".input-prompt:eq(1)").css("display", "block").children(".prompt-size").text("密码不能为空");
        } else if (password.length < 6 && password > 20) {
            $(".input-prompt:eq(1)").css("display", "block").children(".prompt-size").text("密码长度应在6-20位之间！");
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
                    if ($(".Cinput").is(":checked")) {
                        Cookie.setItem("username", username, '/', 3);
                    } else {
                        Cookie.setItem("username", username, '/');
                    }

                    window.location.href = "http://127.0.0.1/H51913/myProject1/kangaiduo/html/index.html#";
                } else {
                    if (response.status == "error1") {
                        $(".input-prompt:eq(0)").css("display", "block").children(".prompt-size").text(response.msg);
                        $("#login_pwd").val("");
                    } else if (response.status == "error2") {
                        $(".input-prompt:eq(1)").css("display", "block").children(".prompt-size").text(response.msg);
                        $("#login_pwd").val("");
                    }
                }
            }
        });
    })
})