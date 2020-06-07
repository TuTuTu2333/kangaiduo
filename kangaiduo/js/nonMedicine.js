$(() => {
    $.ajax({
        type: "get",
        url: "../php/getPage.php",
        data: "type=nonMedicine",
        dataType: "json",
        success: function (response) {
            let count = response;
            $(".page").pageList({
                num: 7, //页码个数
                count: count, //总数
                size: 20, //每页展示条数
                page: 1, //当前页
                clickEvent: function (page, callback) {
                    callback();
                    getDataWhthPage(page)
                }
            });
            getDataWhthPage(1);
        }
    });

    function getDataWhthPage(index) {
        $.ajax({
            type: "get",
            url: "../php/drugListPage.php",
            data: `page=${index}&type=nonMedicine`,
            dataType: "json",
            success: function (response) {
                renderUI(response, index)
            }
        });
    }

    function renderUI(data, index) {
        let oLi = data.map(item => {
            return ` 
            <li data-goods-id=${item.id}>
                <div>
                    <p class="Ypic">
                        <a href="#">
                            <img src="${item.src}" alt="">
                        </a>
                        <img src="https://res.360kad.com/theme/default/img/search/yin_ico.gif" alt="" class="yin_ico">
                    </p>
                    <p class="Yname">
                        <span class="ico_otc"></span>
                        <a href="#">${item.name}
                            <span class="Yspec "></span>
                        </a>
                    </p>
                    <p class="Yadv">${item.adv}</p>
                    <p class="Ypribox">
                        <span class="RMB">${item.price}</span>
                        <i class="RMB">${item.oldPrice}</i>
                    </p>
                </div>
            </li>
        
            `
        }).join("");
        let html = `
             <div class="YproList2 clearfix">
             <ul>${oLi}</ul>
             </div>
             `
        $(".Yright").html(html);

        $(".YproList2 ul li div").each(function () {
            $(this).click(function () {
                let id = $(this).parent().data("goods-id");
                window.location.href = `http://127.0.0.1/H51913/myProject1/kangaiduo/html/shopParticulars.html?id=${id}&table=nonmedicine`;
            })
        })
    }

    $("#header").load("./index.html .header_top,.header-center,.nav", function () {
        $.getScript("../js/header_footer.js");
        $(".categorys h2").mouseenter(function () {
            $(".lNav").css("display", "block");
        });
        $(".lNav").mouseleave(function () {
            $(this).css("display", "none");
        })
    });

    $("#fixeNav").load("./index.html .fixed_navigation", function () {
        $.getScript("../js/fixed_navigation.js");
        $(".online_kefu_container").css("display", "none");
        $(".online_kefu").css("background", "url(https://res.360kad.com/theme/default/img/rightbar/online_hidden.gif?v2016) no-repeat center center")
    })

    $("#foot").load("../index.html .wrap_footer,.footer_list")
})