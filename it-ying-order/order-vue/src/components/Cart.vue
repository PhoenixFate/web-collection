<template>
  <div id="cart">
    <div class="cart_content">
      <div class="cart_info">
        <h2>购物车</h2>
        <div class="p_number">
          <div class="p_number_left">
            <p>用餐人数:{{peopleList.p_num}}人</p>
            <p>备注:{{peopleList.p_mark?peopleList.p_mark:"无"}}</p>
          </div>
          <router-link to="/editPeopleInfo">
            <div class="p_number_right">
              <img src="../assets/images/cart/edit.png" />
              <p>修改</p>
            </div>
          </router-link>
        </div>
        <div class="cart_p_num">
          <p>购物车中总共有{{totalNumber}}个菜</p>
          <p>
            合计：
            <span class="price">¥{{totalPrice}}</span>
          </p>
        </div>
      </div>
      <div class="cart_list" v-if="totalNumber">
        <ul>
          <li class="item" v-for="(food,index) in cartList" :key="food._id">
            <div class="left_food">
              <img :src="api+food.img_url" />
              <div class="food_info">
                <p>{{food.title}}</p>
                <p class="price">¥{{food.price}}</p>
              </div>
            </div>
            <div class="right_cart">
              <div class="cart_num">
                <div class="input_left" @click="minusNumber(food,index)">-</div>
                <div class="input_center">
                  <input type="text" readonly="readonly" v-model="food.num" name="num" id="num" />
                </div>
                <div class="input_right" @click="addNumber(food)">+</div>
              </div>
            </div>
          </li>
        </ul>
      </div>

      <div v-if="!totalNumber" class="cart_empty">
        <h3>您的购物车空空如也</h3>
        <h3>请点击菜单进行点餐</h3>
      </div>

      <div class="hot_food">
        <h3>本店顾客最长点的菜</h3>
        <div class="item_list_outer">
          <ul class="item_list">
            <li>
              <div class="inner">
                <img src="../assets/images/food/1.jpeg" />
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/food/2.jpeg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/food/1.jpeg" />
                <p class="title">大蒜腊肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/food/2.jpeg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
            <li>
              <div class="inner">
                <img src="../assets/images/food/2.jpeg" />
                <p class="title">家乡扣肉</p>
                <p class="price">¥26</p>
              </div>
            </li>
          </ul>
        </div>
      </div>
    </div>
    <footer-Navigation></footer-Navigation>
    <router-link to="/home">
      <div id="footer_book" class="footer-book">
        <img src="../assets/images/nav/menu.png" />
        <p>菜单</p>
      </div>
    </router-link>

    <div id="footer_cart" class="footer-cart">
      <img src="../assets/images/nav/doorder.png" />
      <p>下单</p>
    </div>
  </div>
</template>

<script>
import footerNavigation from "./common/FooterNavigation";
import config from "../model/config";
export default {
  data() {
    return {
      api: config.api,
      cartList: [],
      totalPrice: 0,
      totalNumber: 0,
      peopleList: ""
    };
  },
  mounted() {
    this.requestCartList();
    this.getPeopleInfoList();
  },
  methods: {
    requestCartList() {
      let api = this.api + "api/cartList?uid=s001";
      this.$http.get(api).then(
        res => {
          console.log(res);
          this.cartList = res.body.result;
          this.getTotal();
        },
        error => {
          console.log(error);
        }
      );
    },
    getTotal() {
      let totalPrice = 0;
      let totalNumber = 0;
      this.cartList.forEach(element => {
        totalPrice += parseFloat(element.price) * parseInt(element.num);
        totalNumber += parseInt(element.num);
      });
      this.totalPrice = totalPrice;
      this.totalNumber = totalNumber;
    },
    addNumber(food) {
      console.log(food);
      // 更新服务器端端数据
      let product_id = food.product_id;
      let num = food.num;
      let api =
        this.api +
        "api/incCart?uid=s001&product_id=" +
        product_id +
        "&num=" +
        num;
      this.$http.get(api).then(
        res => {
          console.log(res);
        },
        error => {}
      );
      food.num++;
      this.getTotal();
    },
    minusNumber(food, index) {
      let product_id = food.product_id;
      let num = food.num;
      let api =
        this.api +
        "api/decCart?uid=s001&product_id=" +
        product_id +
        "&num=" +
        num;
      this.$http.get(api).then(
        res => {
          console.log(res);
        },
        error => {}
      );

      if (food.num <= 1) {
        this.cartList.splice(index, 1);
      } else {
        food.num--;
      }
      this.getTotal();
    },
    getPeopleInfoList() {
      let url = this.api + "api/peopleInfoList?uid=s001";
      this.$http.get(url, {}).then(
        res => {
          console.log(res);
          if (res.body.success == "true") {
            this.peopleList = res.body.result[0];
          }
        },
        error => {}
      );
    }
  },
  components: {
    footerNavigation
  }
};
</script>

<style lang="scss">
.cart_content {
  padding: 1rem;

  //   /*头部信息*/
  .cart_info {
    background: #fff;
    h2 {
      text-align: center;
      font-size: 1.8rem;
      padding: 0.8rem 0px;
      border-bottom: 1px solid #eee;
    }
    border-radius: 0.5rem;
    padding: 0.5rem;
    .p_number {
      display: flex;
      padding: 0.5rem 0;
      border-bottom: 1px solid #eee;
      .p_number_left {
        flex: 1;

        p {
          line-height: 2;

          &:first-child {
            color: red;
          }
        }
      }
      .p_number_right {
        width: 4rem;
        height: 4rem;
        text-align: center;
        img {
          width: 1.8rem;
          height: 1.8rem;
          margin: 0 auto;
        }
      }
    }
    // /*购物车总数量*/
    .cart_p_num {
      border-bottom: 1px solid #eee;
      p {
        line-height: 2;
        .price {
          font-size: 2.4rem;
          color: red;
        }
      }
    }
  }
  // /*购物车列表*/
  .cart_list {
    margin-top: 1rem;
    padding: 0.5rem;
    background: #fff;
    border-radius: 0.5rem;
    display: flex;
    ul {
      width: 100%;
      .item {
        display: flex;
        width: 100%;
        border-bottom: 1px solid #eee;
        padding: 1rem 0px;
        .left_food {
          flex: 1;
          display: flex;
          img {
            width: 4rem;
            height: 4rem;
            border-radius: 10%;
            margin-right: 0.8rem;
          }
          .food_info {
            flex: 1;
          }
        }
        .right_cart {
          width: 10rem;
        }
      }
    }
  }
  // 最常点的菜
  .hot_food {
    background: #fff;
    border-radius: 0.5rem;
    margin-top: 1rem;
    margin-bottom: 10rem;
    h3 {
      font-size: 1.8rem;
      padding: 0.5rem 0;
    }
    .item_list_outer {
      width: 100%;
      overflow-x: scroll;
      .item_list {
        padding: 0 0.5rem;
        width: 50rem;
        li {
          float: left;
          width: 10rem;
          padding: 0.5rem;
          box-sizing: border-box;
          .inner {
            background-color: #fff;
            width: 100%;
            border-radius: 0.5rem;
            overflow: hidden;
            img {
              width: 100%;
            }
          }
        }
      }
    }
  }
}
// /*购车加减*/
.cart_num {
  width: 10rem;
  display: flex;
  margin-top: 0.8rem;
  .input_left,
  .input_right {
    flex: 1;
    width: 2.8rem;
    height: 2.8rem;
    line-height: 2.8rem;
    text-align: center;
    color: red;
    border: 1px solid #eee;
    font-size: 2.4rem;
  }
  .input_center {
    flex: 1;
    input {
      width: 2rem;
      text-align: center;
      width: 100%;
      height: 2.8rem;
      border: none;
      border-top: 1px solid #eee;
      border-bottom: 1px solid #eee;
      float: left;
    }
  }
}

// /*购车空*/
.cart_empty {
  height: 11rem;
  text-align: center;
  line-height: 2;
  h3 {
    font-size: 1.6rem;
    &:nth-child(1){
      margin-top: 7rem;
    }
  }
}
</style>