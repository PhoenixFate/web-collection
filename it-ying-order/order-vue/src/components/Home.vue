<template>
  <div id="home">
    <header class="index-header">
      <div class="hlist">
        <img src="../assets/images/index/hot.png" />
        <p>热销榜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/index/ever.png" />
        <p>点过的菜</p>
      </div>
      <div class="hlist">
        <img src="../assets/images/index/search.png" />
        <p>搜你喜欢</p>
      </div>
    </header>
    <aside class="left-cate" id="left_cate" :class="{'left-cate-show': asideShow}">
      <ul>
        <li
          v-for="(category,index) in foodList"
          :key="category._id"
          @click="changeList(index)"
        >{{category.title}}</li>
      </ul>
      <div id="nav_cate" class="nav-cate" @click="changeAside()">
        <img src="../assets/images/index/nav.png" />
        <p>菜单</p>
      </div>
    </aside>
    <div class="content">
      <div class="item" v-for="category in foodList" :key="category._id">
        <h3 class="item-cate">{{category.title}}</h3>
        <ul class="item-list">
          <li v-for="food in category.list" :key="food._id">
            <router-link :to="'/food/'+food._id">
              <div class="inner">
                <img :src="api+food.img_url" />
                <p class="title">{{food.title}}</p>
                <p class="price">¥{{food.price}}</p>
              </div>
            </router-link>
          </li>
        </ul>
      </div>
    </div>
    <!-- 背景也可以通过body的after伪类来实现 -->
    <div class="bg" id="bg" :class="{'bg-show': asideShow}" @click="changeAside()">
      <!-- 点击菜单之后出现的透明背景 -->
    </div>
    <footer-Navigation></footer-Navigation>
    <router-link to="/cart">
      <div id="footer_cart" class="footer-cart">
        <img src="../assets/images/nav/cart.png" />
        <p>购物车</p>
        <span class="num" v-if="cartNum!=0">{{cartNum}}</span>
      </div>
    </router-link>
  </div>
</template>

<script>
import footerNavigation from "./common/FooterNavigation";
// 引入配置文件
import config from "../model/config";
export default {
  data() {
    return {
      asideShow: false,
      foodList: [],
      api: config.api,
      cartNum:0,
    };
  },
  mounted() {
    this.requestData();
    this.getCartCount()
  },
  methods: {
    changeAside() {
      this.asideShow = !this.asideShow;
    },
    requestData() {
      let url = this.api + "api/productList";
      this.$http.get(url, { params: {} }).then(
        function(res) {
          console.log(res);
          // 响应成功回调
          this.foodList = res.body.result;
        },
        function(res) {
          console.log(res);
          // 响应错误回调
        }
      );
    },
    getCartCount() {
      //uid 桌子id，是扫描二维码之后从url获取的
      let url = this.api + "api/cartCount?uid=s001";
      this.$http.get(url, { params: {} }).then(
        function(res) {
          console.log(res);
          // 响应成功回调
          this.cartNum=res.body.result
        },
        function(res) {
          console.log(res);
          // 响应错误回调
        }
      );
    },
    changeList(index) {
      var itemCateDom = document.querySelectorAll(".item-cate");
      document.documentElement.scrollTop = itemCateDom[index].offsetTop;
      this.asideShow = !this.asideShow;
    }
  },
  components: {
    footerNavigation
  }
};
</script>

<style lang="scss">
.index-header {
  width: 96%;
  margin: 0 auto;
  height: 5.4rem;
  background-color: #fff;
  margin-top: 1rem;
  display: flex;
  border-radius: 0.6rem;
  .hlist {
    flex: 1;
    text-align: center;
    padding-top: 0.6rem;
    border-right: 1px solid #eee;
    img {
      width: 2rem;
      height: 2rem;
      margin: 0 auto;
    }
    &:last-child {
      border: none;
    }
  }
}
// 列表
.item {
  .item-cate {
    text-align: center;
  }
  .item-list {
    padding: 0 0.5rem;
    display: flex;
    flex-wrap: wrap;
    li {
      width: 33.33%;
      padding: 0.5rem;
      box-sizing: border-box;
      .inner {
        background: #fff;
        width: 100%;
        border-radius: 0.5rem;
        overflow: hidden;
        img {
          width: 100%;
          height: 10rem;
        }
        p {
          padding: 0.2rem 0.5rem;
        }
        .title {
          font-weight: bold;
        }
      }
    }
  }
}
// 侧边栏
.left-cate {
  // css3 运动添加过渡效果
  transition: all 0.8s;
  transform: translate(-100%, 0);
  width: 10rem;
  height: 100%;
  position: fixed;
  background-color: #eee;
  top: 0;
  left: 0;
  z-index: 2;
  ul {
    position: absolute;
    width: 100%;
    height: 100%;
    box-sizing: border-box;
    padding: 0.8rem;
    z-index: 3;
    background-color: #eee;
    li {
      line-height: 4.4rem;
      text-align: center;
    }
  }
  .nav-cate {
    position: absolute;
    right: -4.5rem;
    background-color: rgba(132, 128, 128, 0.9);
    top: 42%;
    width: 5rem;
    height: 4rem;
    text-align: center;
    border-radius: 0 40% 40% 0;
    z-index: 2;
    img {
      width: 1.8rem;
      height: 1.8rem;
      margin-left: 0.8rem;
      margin-top: 0.5rem;
    }
    p {
      color: #fff;
      margin-top: -0.5rem;
      font-size: 1rem;
      margin-left: 0.7rem;
    }
  }
}
.left-cate-show {
  transform: translate(0, 0) !important;
}
.bg {
  position: fixed;
  width: 100%;
  height: 100%;
  background-color: rgba(132, 128, 128, 0.4);
  left: 0;
  top: 0;
  z-index: 1;
  display: none;
}
.bg-show {
  display: block !important;
}
</style>