(function ($) {
    var defaults = {
        num: 10, //页码个数
        count: 102, //总数
        size: 10, //每页展示条数
        //hiddenPosition:7,
        page: 1, //当前页
        clickEvent: function (page) {

        }
    };
    //重置html
    function resetHtml(opts, obj, pageCount) {
        var middlePage = Math.ceil(pageCount / 2); //中间页
        //var currentPos=0;//当前位置()
        var i = 1,
            j = 0;
        var n = 0; //另一端的页码数
        var z = 0; //当前页的前一页或后一页
        var maxPage = 0;
        var getPageHtml = function (type, page) {
            var currentPage = "";
            if (type == 1) { //省略号
                return "<span class='pageList_Hidden'>...</span>";
            } else if (type == 2) {
                if (page == opts.page) {
                    currentPage = "pageList_Current";
                }
                return "<a class='pageList_Num " + currentPage + "'>" + page + "</a>";
            }
        };
        var html = "<a class='pageList_FirstPage'><label>首页</label></a>";
        html += "<a class='pageList_PrevPage'>上页</a>";
        if (pageCount <= opts.num) { //没有省略号
            for (; i < pageCount; i++) {
                html += getPageHtml(2, i);
            }
        } else { //有省略号
            n = opts.num - 4; //剩余页码的坑
            if (opts.page <= middlePage) { // x+1+3  1是省略号 3是后面几个页码
                z = opts.page + 1; //当前页的后一页,省略号的前一格
                if (z <= n) { //
                    for (i = 1; i <= n; i++) {
                        html += getPageHtml(2, i);
                    }
                } else {
                    for (i = (z - n + 1); i <= z; i++) {
                        html += getPageHtml(2, i);
                    }
                }
                html += getPageHtml(1);

                for (i = pageCount - 2; i <= pageCount; i++) {
                    html += getPageHtml(2, i);
                }

            } else { // 3+1+x 1是省略号 3是前面几个页码
                for (i = 1; i <= 3; i++) {
                    html += getPageHtml(2, i);
                }
                html += getPageHtml(1);
                //debugger
                z = opts.page - 1; //当前页的前一页,省略号的后一格
                maxPage = z + n - 1;
                //maxPage=maxPage>pageCount?pageCount:maxPage;
                if (maxPage > pageCount) {
                    maxPage = pageCount;
                    z = pageCount - n + 1;
                }
                for (i = z; i <= maxPage; i++) {
                    html += getPageHtml(2, i);
                }
            }
        }
        html += "<a class='pageList_NextPage'>下页</a>";
        html += "<a class='pageList_LastPage'>末页</a>";
        html += "<input class='jumpNum' type='text' value='' />";
        html += "<a class='jumpText' href='javascript:void(0)'>跳转</a>";
        obj.html(html);
        //return html;
    }
    $.fn.pageList = function (opts) {
        opts = $.extend({}, defaults, opts);
        this.each(function () {
            var obj = $(this).addClass("pageList");
            var pageCount = Math.ceil(opts.count / opts.size); //总页数
            resetHtml(opts, obj, pageCount);
            obj.on("click", "a.pageList_Num", function () {
                var page = parseInt($(this).html());
                if (page == opts.page) {
                    return;
                }
                opts.page = page;
                opts.clickEvent(page, function () {
                    resetHtml(opts, obj, pageCount);
                });
            });
            //首页
            obj.on("click", ".pageList_FirstPage", function () {
                var page = parseInt($(".pageList_Current", obj).html());
                if (page == 1) {
                    return;
                }
                opts.page = 1;
                opts.clickEvent(opts.page, function () {
                    resetHtml(opts, obj, pageCount);
                });
            });
            //上页
            obj.on("click", ".pageList_PrevPage", function () {
                var page = parseInt($(".pageList_Current", obj).html()) - 1;
                if (page <= 0) {
                    return;
                }
                opts.page = page;
                opts.clickEvent(page, function () {
                    resetHtml(opts, obj, pageCount);
                });
            });
            //下一页
            obj.on("click", ".pageList_NextPage", function () {
                var page = parseInt($(".pageList_Current", obj).html()) + 1;
                if (page > pageCount) {
                    return;
                }
                opts.page = page;
                opts.clickEvent(page, function () {
                    resetHtml(opts, obj, pageCount);
                });
            });
            //末页
            obj.on("click", ".pageList_LastPage", function () {
                var page = parseInt($(".pageList_Current", obj).html());
                if (page == pageCount) {
                    return;
                }
                opts.page = pageCount;
                // console.log(opts.page);

                opts.clickEvent(opts.page, function () {
                    resetHtml(opts, obj, pageCount);
                });
            });
            //文本框enter
            obj.on("keyup", ".jumpNum", function (e) {
                if (e.which != 13) {
                    return;
                }
                var textPage = $(this).val();
                if (isNaN(textPage)) {
                    alert("输入的页码必须是数值型");
                    return;
                }
                textPage = parseInt(textPage);
                var page = parseInt($(".pageList_Current", obj).html());
                if (textPage > pageCount || textPage <= 0) {
                    alert("您输入的页码超出范围");
                    return;
                }
                if (page == textPage) {
                    return;
                }
                opts.page = textPage;
                opts.clickEvent(opts.page, function () {
                    resetHtml(opts, obj, pageCount);
                    $(".jumpNum", obj).focus();
                });
            });

            //单击跳转
            obj.on("click", ".jumpText", function (e) {
                var textPage = $(".jumpNum", obj).val();
                if (isNaN(textPage)) {
                    alert("输入的页码必须是数值型");
                    return;
                }
                textPage = parseInt(textPage);
                var page = parseInt($(".pageList_Current", obj).html());
                if (textPage > pageCount || textPage <= 0) {
                    alert("您输入的页码超出范围");
                    return;
                }
                if (page == textPage) {
                    return;
                }
                opts.page = textPage;
                opts.clickEvent(opts.page, function () {
                    resetHtml(opts, obj, pageCount);
                    $(".jumpNum", obj).focus();
                });
            });


        });
    }
})(jQuery);

//调用
// $(function () {
//     $(".a").pageList({
//         num: 7, //页码个数
//         count: 295, //总数
//         size: 20, //每页展示条数
//         page: 1, //当前页
//         clickEvent: function (page, callback) {
//             //alert(page);
//             callback();
//         }
//     });
// });

//css
// .pageList {
//     clear: both;
//     overflow: hidden;
// }

// .pageList a,
// .pageList span {
//     border: 1px solid #ccc;
//     margin-left: 10px;
//     float: left;
//     display: block;
//     overflow: hidden;
//     padding: 3px;
//     font-family: 微软雅黑;
//     font-size: 12px;
//     min-width: 15px;
//     text-align: center;
//     height: 20px;
//     line-height: 20px;
//     cursor: pointer;
// }

// .pageList a:hover,
// .pageList_Current {
//     background-color: #278DE1;
//     color: white;
// }

// .pageList .pageList_Hidden {
//     border: none;
//     cursor: default;
// }

// .pageList .pageList_Hidden:hover {
//     background-color: transparent;
// }

// .pageList input.jumpNum {
//     width: 30px;
//     border: 1px solid #8c8c8c;
//     float: left;
//     width: 20px;
//     height: 20px;
//     margin-left: 5px;
//     line-height: 20px;
//     padding: 3px;
//     text-align: center;
// }

// .pageList a.jumpText {
//     border: none;
//     background: none;
//     outline: none;
//     margin-left: 0;
//     text-decoration: none;
//     color: #333;
// }

// .pageList a.jumpText:hover {
//     color: #960;
// }