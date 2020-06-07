class ManagerchronicDisease {
  constructor(data) {
    this.data = data;
    this.index = 0;
  }
  init() {
    this.renderUI();
    this.evenHandler();
  }
  renderUI() {
    let one = this.data.one.map(ele => {
      let dd = ele.em.map(e => {
        return `
                 <span>
                   <a href="#">${e}</a>
                 </span>
               `
      }).join("");
      return `
                <li><dl>
                   <dt>${ele.dt}</dt>
                   <dd>${dd}</dd>
                 </dl></li>
           `;
    }).join("")
    $(".nav_box").html(`<ul class="clearfix">${one}</ul>`);

    let two = this.data.two.map(ele => {
      return `
               <li class="zt1">
                  <img src="${ele}">
                  <a href="#" class="zt2">
                    <img src="https://res.360kad.com/theme/default/img/promotions/2016manxingjb/zt_bg.png">
                  </a>
               </li>`
    }).join("");
    $(".jx_zt ul").html(two);

    let three = this.data.three.map(ele => {
      let con = ele.con.map(e => {
        return `
                    <li>
                      <p class="pro_img">
                       <a href="#">
                         <img src="${e.src}">
                       </a>
                      </p>
                      <div class="pro_info">
                        <p class="pro_name">
                          <a href="#">${e.name}</a>
                        </p>
                        <p class="pro_ad">${e.ad}</p>
                        <p class="pro_vip_pri">${e.price}</p>
                      </div>
                    </li>
                  `
      }).join("");
      return `
                 <div class="pro_box">
                   <p class="nav_01">${ele.title}</p>
                   <p class="nav_03">${ele.slogan}
                     <span>
                       <a href="#">更多></a>
                     </span>
                   </p>
                   <ul class="clearfix">${con}</ul>
                 </div>
              `
    }).join("");
    $(".floorbox").html(three);
  }

  autoplay() {
    let timer = setInterval(() => {
      this.index++;
      if (this.index > 4) this.index = 0;
      $("#focus ul").css("left", -this.index * 1200 + "px");
      // 
      $(".dotlist ul li").eq(this.index).css("background", "#0066d4").siblings().css("background", "rgba(6, 6, 6, 0.4)");
    }, 2000);
    $("#focus ul").mouseenter(() => clearInterval(timer))
  }

  evenHandler() {
    $("#header").load("./index.html .header_top,.header-center,.nav", function () {
      $.getScript("../js/header_footer.js");
      $(".categorys h2").mouseenter(function () {
        $(".lNav").css("display", "block");
      });
      $(".lNav").mouseleave(function () {
        $(this).css("display", "none");
      });

      $(".li2,.li3").css("display", "none");
      $(".li6,.li7 span").css("display", "block")
    });
    $("#right_nav").load("./fixed_navigation.html .fixed_navigation", function () {
      $.getScript("../js/fixed_navigation.js");
      $(".online_kefu_container").css("display", "none");
      $(".online_kefu").css("background", "url(https://res.360kad.com/theme/default/img/rightbar/online_hidden.gif?v2016) no-repeat center center")
    });

    this.autoplay();
    $("#focus ul").mouseleave(() => this.autoplay());

    $("#foot").load("./index.html .wrap_footer,.footer_list")
  }

}