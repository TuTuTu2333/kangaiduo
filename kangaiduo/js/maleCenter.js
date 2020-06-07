class ManagerMaleCenter {
    constructor(data) {
        this.data = data;
    }
    init() {
        this.renderUI();
        this.evenHandler();
    }
    renderUI() {
        let oLi = this.data.slider.map(ele => {
            return `<li style="background:${ele.color}">
              <a href="#">
                <img src="${ele.img}">
              </a>
           </li>`
        }).join("");
        let ol = this.data.slider.map(e => {
            return `<li></li>`
        }).join("");
        let slider = `
             <ul>${oLi}</ul>
             <ol class="dot">${ol}</ol>
           `
        $(".banner_c").html(slider);

        let tabTitle = this.data.tab.tabTitle.map((ele, index) => {
            return `<span class=${index==0?"active":""}>${ele}</span>`
        }).join("");

        let tabCon = this.data.tab.tabCon.map((ele, index) => {
            let tabImg = ele.map(e => {
                return `<li>
             <a href="#">
               <img src="${e}">
             </a> 
           </li>`
            }).join("");
            return `<ul class="clearfix ${index==0?"show":""}">${tabImg}</ul>`
        }).join("");
        let tabNav = `
         <div class="conkadtab">
            <div class="tabNav clearfix">${tabTitle}</div>
            <div class="tabCon">${tabCon}</div>
         </div>
      `

        let floor = this.data.floor.map(ele => {
            let headList = ele.headList.map(e => {
                return `<a href="#">${e}</a>`
            }).join("");

            let leftList = ele.leftList.map(e => {
                return `<li>
                <a href="#">${e}</a>
             </li>`
            }).join("");

            let con = ele.con.map(e => {
                return `<li>
              <p class="pic">
                <a href="#">
                 <img src="${e.src}">
                </a>
              </p>
              <p class="title">
                <a href="#">${e.name}</a>
              </p>
              <p class="price">
                <span class="salesPrice">${e.salesPrice}</span>
                <span class="originalPrice">${e.originalPrice}</span>
              </p>
          </li>`
            }).join("");
            return `
           <div class="mt20 floor_ad">
            <a href="#"><img src="${ele.floor_ad}"></a>
           </div>
           <div class="floor mt20">
            <div class="f_head clearfix">
              <i></i>
              <span>${ele.title}</span>
              <div class="f_keywords">热门关键字：${headList}</div>
            </div>
            <div class="f_con clearfix">
              <div class="f_con_l">
                <div class="img">
                 <a href="#">
                   <img src="${ele.img}">
                 </a>
                </div>
                <div class="f_nav">
                  <ul>${leftList}</ul>
                  <p class="more">
                    <a href="#">更多>></a>
                  </p>
                </div>
              </div>
              <div class="f_con_r">
                <ul class="clearfix">${con}</ul>
              </div>
            </div>
           </div>
         `
        }).join("");

        $(".main").html(tabNav + floor);
    }

    evenHandler() {
        $("#header").load("./index.html .header_top,.header-center", function () {
            $.getScript("../js/header_footer.js");
            $(".header_logo a img").attr("src", "http://tstres.360kad.com/theme/default/img/men/logo1.jpg")
            $(".header_logo p").css("display", "none");

            $(".header_logo a img").mouseenter(function () {
                $(this).attr("src", "http://tstres.360kad.com/theme/default/img/men/logo2.jpg");
            }).mouseleave(function () {
                $(this).attr("src", "http://tstres.360kad.com/theme/default/img/men/logo1.jpg");
            });
        });

        $("#right_nav").load("./fixed_navigation.html .fixed_navigation", function () {
            $.getScript("../js/fixed_navigation.js");
            $(".online_kefu_container").css("display", "none");
            $(".online_kefu").css("background", "url(https://res.360kad.com/theme/default/img/rightbar/online_hidden.gif?v2016) no-repeat center center");
        })

        $("#foot").load("./index.html .wrap_footer,.footer_list", function () {
            $.getScript("../js/header_footer.js");
        })
    }

}