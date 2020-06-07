class ManagerHeader {
  constructor(data) {
    this.data = data;
  }
  init() {
    this.renderUI();
  }
  renderUI() {
    let oLi = this.data.map(item => {
      let dl = item.tcon.map(ele => {
        let dd = ele.dd.map(e => {
          return `|<a href="#">${e}</a>`
        }).join("");
        return `
                  <dl>
                    <dt><a href="#">${ele.dt}</a></dt>
                    <dd>${dd}</dd>
                  </dl>
             `
      }).join("");
      return `<li>
             <div class="list_t">
                <div class="bor">
                 <a href="#">
                   <b>${item.title[0]}</b>
                 </a>|
                 <a href="#">${item.title[1]}</a>&nbsp;
                 <a href="#">${item.title[2]}</a>
                </div>
             </div>
             <div class="lNav_pop">${dl}</div>
          </li>`
    }).join("");
    let html = `<ul class="lNav_lists">${oLi}</ul>`
    $(".lNav").append(html);
    $(".lNav_lists li").each(function () {
      $(this).mouseenter(function () {
        $(this).children(".lNav_pop").css("display", "block");
      }).mouseleave(function () {
        $(this).children(".lNav_pop").css("display", "none");
      })
    });
  }
}

class ManagerIndex {
  constructor(data) {
    this.data = data;
    this.timer1 = null;
    this.index = 0;
    this.len = $(".scroll_container ul li").length;
  }
  init() {
    this.renderUI()
    this.evenHandler();
    this.autoPlay();
    this.mainSliderHandler();
    this.particulars();
  }
  renderUI() {
    let html = this.data.map((ele, index) => {
      let dd = ele.keys.map(e => {
        return `
            <dd><a href="#">${e}</a></dd>
          `
      }).join("");

      let links = ele.links.map(e => {
        return `
            <li><a href="#">${e}</a></li>
          `
      }).join("");

      let logo = ele.logoSrc.map(e => {
        return `
             <li>
               <a href="#"><img src="${e}"/></a>  
             </li>
          `
      }).join("");

      let slider = ele.sliderSrc.map(e => {
        return `
             <li>
               <a href="#"><img src="${e}"></a>  
             </li>
          `
      }).join("");

      let point = ele.sliderSrc.map((e, i) => {
        return `<dd class=${i==0?"actv":""}></dd>`
      }).join("");

      let product = ele.product.map(e => {
        return `
             <li>
               <p class="pic">
                 <a href="#"><img src="${e.picSrc}"></a>
               </p>
               <p class="proName">
                 <a href="#">${e.proName}</a>
               </p>
               <p class="proNumber">
                 <a href="#">${e.proNumber}</a>
               </p>
               <p class="proPrice">${e.proPrice}</p>
             </li>
          `
      }).join("");

      return `
          <div class="floor">
            <div class="louHeader">
              <span class="louN color${index+1}">${ele.title}</span>
              <div class="louR">
                <dl>
                  <dt>热门关键字：</dt>
                  ${dd}
                </dl>
              </div>
            </div>
            <div class="contextLou" id="contextLou${index+1}">
              <div class="contextL">
                <div class="louLink"><ul>${links}</ul></div>
                <div class="louLogo"><ul>${logo}</ul></div>
              </div>
              <div class="contextM">
                <div class="pinter">
                  <dl>${point}</dl>
                </div>
                <div class="switchB">
                  <ul>${slider}</ul>
                </div>
              </div>
              <div class="contextR">
                <ul>
                  <li class="floor_m">
                    <a href="#">
                      <img src="${ele.rSrc}">
                    </a>
                  </li>
                  ${product}
                </ul>
              </div>
            </div>
          </div>
        `
    }).join("");
    $(".floorBox").html(html);
  }
  //点击随机更换商品(健康推荐块)
  getRandomData() {
    //发送请求，求出有多少个页
    $.ajax({
      type: "get",
      url: "../php/getPage.php",
      data: "type=index",
      dataType: "json",
      success: function (response) {
        //成功再次发送请求，拿到随机的一个页
        let num = parseInt(Math.random() * (response - 1 + 1)) + 1
        $.ajax({
          type: "get",
          url: "../php/drugListPage.php",
          data: `page=${num}&type=index`,
          dataType: "json",
          success: function (data) {
            //成功渲染页面
            let oLi = data.map(item => {
              return `
                                 <li>
                                   <a hraf="#" class="imgpro">
                                     <img src="${item.src}">
                                   </a>
                                   <div class="hotPadding">
                                     <p class="nameC">
                                      <a href="#">${item.name}</a>
                                     </p>
                                     <p class="priceC">${item.oldPrice}</p>
                                   </div>
                                 </li>
                                `
            }).join("");
            $(".changeP").find("ul").html(oLi);
          }
        });
      }
    });
  }

  autoPlay() {
    this.timer1 = setInterval(() => {
      this.next();
    }, 3000)

    //楼层轮播自动播放
    let self = this;
    $(".floor").each(function () {
      if ($(this).index() == 0 || $(this).index() == 2 || $(this).index() == 4) {
        self.floorSliderHandler($(this), 2500);
      } else {
        self.floorSliderHandler($(this), 3800);
      }
    })
  }
  mainSliderHandler() {
    let self = this;
    $(".scroll_container").mouseenter(function () {
      clearInterval(self.timer1);
      $(".btn .clickBtn").css("display", "block");
    }).mouseleave(function () {
      self.autoPlay();
      $(".btn .clickBtn").css("display", "none");
    })

    $(".btn").on("click", ".clickBtn", function () {
      if ($(this).attr("class") == "clickBtn prevBtn") {
        self.prev();
      } else if ($(this).attr("class") == "clickBtn nextBtn") {
        self.next();
      }
    });

    $("#scroll_num").on("click", "span", function () {
      self.index = $(this).index();
      $(".scroll_container ul li").eq(self.index).addClass("current").siblings().removeClass("current");
      $("#scroll_num span").eq(self.index).addClass("act").siblings().removeClass("act");
    })
  }

  floorSliderHandler(node, time) {
    let self = this;
    let timer2 = null;
    let len = node.find(".pinter dd").length;
    let index = 0;
    timer2 = setInterval(floorSetInterval, time);
    node.find(".contextM").mouseenter(function () {
      clearInterval(timer2);
      let than = $(this).find(".switchB ul");
      $(this).find(".pinter dl").on("click", "dd", function () {
        index = $(this).index();
        than.animate({
          "left": -index * 380 + "px"
        }, 500);
        $(this).addClass("actv").siblings().removeClass("actv");
      });
    }).mouseleave(() => {
      timer2 = setInterval(floorSetInterval, time);
    })

    function floorSetInterval() {
      index++;
      if (index >= len) {
        index = 0;
      }
      node.find(".switchB ul").animate({
        "left": -index * 380 + "px"
      }, 500);
      node.find(".pinter dd").eq(index).addClass("actv").siblings().removeClass("actv");
    }
  }

  prev() {
    this.index--;
    if (this.index <= -1) {
      this.index = this.len - 1;
    }
    $(".scroll_container ul li").eq(this.index).addClass("current").siblings().removeClass("current");
    $("#scroll_num span").eq(this.index).addClass("act").siblings().removeClass("act");
  }
  next() {
    this.index++;
    if (this.index >= this.len) {
      this.index = 0;
    }
    $(".scroll_container ul li").eq(this.index).addClass("current").siblings().removeClass("current");
    $("#scroll_num span").eq(this.index).addClass("act").siblings().removeClass("act");
  }

  evenHandler() {
    this.getRandomData();
    $(".changeBtn").click(() => {
      this.getRandomData()
    });
  }

  particulars() {
    $(".floor").each(function () {
      $(this).find(".contextR ul li").each(function () {
        if ($(this).index() != 0) {
          $(this).click(function () {
            let src = $(this).find(".pic img").attr("src");
            let name = $(this).find(".proNumber a").text();
            let price = $(this).find(".proPrice").text();

            window.location.href = `http://127.0.0.1/H51913/myProject1/kangaiduo/html/shopParticulars.html?src=${src}&name=${name}&price=${price}`;
          })
        }
      })
    })
  }
}

class ManagerMiao {
  constructor(data) {
    this.data = data;
  }
  init() {
    this.renderUI();
    this.time();
  }
  renderUI() {
    let oLi = this.data.map(ele => {
      return `
      <li>
       <div class="zhe">
          <span class="zheS">${ele.zhe}</span> 折
          <p class="zheP" style="text-align:center">
            <img src="${ele.src}" alt="" style="width:150px;height:150px;">
          </p>
          <div class="clum">
            <dl>
              <dd class="secentLi">
                <span>${ele.name}</span>
              </dd>
              <dd class="thirdLi">
                <span class="newPrice">${ele.newPrice}</span>
                <span class="oldPrice">${ele.oldPrice}</span>
              </dd>
            </dl>
          </div>
        </div>
      </li>`
    }).join("");
    let html = `<ul>${oLi}</ul>`;
    $("#hotProC").html(html);

    $(".direction").on("click", "span", function () {
      let num = $(".hotPage b:eq(0)").text() * 1;
      if ($(this).attr("class") == "s") {
        if (num <= 1) {
          $(".hotPage b:eq(0)").text("1");
        } else {
          $(".hotPage b:eq(0)").text(num - 1);
          $("#hotProC ul").animate({
            "left": "0"
          }, 1000);
        }

      } else if ($(this).attr("class") == "r") {
        if (num >= 2) {
          $(".hotPage b:eq(0)").text("2");
        } else {
          $(".hotPage b:eq(0)").text(num + 1);
          $("#hotProC ul").animate({
            "left": "-1198px"
          }, 1000);
        }
      }
    })
  }
  time() {
    const fourthOfJuly = new Date("July 4, 2020 12:00:00").getTime();
    let timer = setInterval(function () {
      const today = new Date().getTime();
      const diff = fourthOfJuly - today;

      let days = Math.floor(diff / (1000 * 60 * 60 * 24));
      let hours = Math.floor((diff % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
      let minutes = Math.floor((diff % (1000 * 60 * 60)) / (1000 * 60));
      let seconds = Math.floor((diff % (1000 * 60)) / 1000);
      
      $(".seckill_p2").html(`
            <i></i>剩余
            <span>${days}</span>天
            <span>${hours}</span>时
            <span>${minutes}</span>分
            <span>${seconds}</span>秒`)
    }, 1000);
  }
}
$(() => {
  $(".fixed").load("./fixed_navigation.html .fixed_navigation", function () {
    $.getScript("../js/fixed_navigation.js");
  });
 ;
  $.getJSON("../json/index.json",
    function (data) {
      new ManagerIndex(data).init();
    });

  $.getJSON("../json/miao.json",
    function (data) {
      new ManagerMiao(data).init();
    });

})