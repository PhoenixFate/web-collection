<template>
  <div id="food">
    <router-link to="/home">
      <div class="back">返回</div>
    </router-link>
    <div class="p_content" v-if="food.img_url">
      <div class="p_info">
        <img :src="api+food.img_url" />
        <h2>{{food.title}}</h2>
        <p class="price">¥ {{food.price}}/份</p>
      </div>
      <div class="p_detail">
        <h3>商品详情</h3>
        <div class="p_content">
          <img :src="api+food.img_url" />
          <br />
          <p>{{food.description}}</p>
          <br />
          <div v-html="food.content">
          </div>
        </div>
      </div>
    </div>

    <footer class="pfooter">
      <div class="cart">
        <strong>数量:</strong>
        <div class="cart_num">
          <div class="input_left" @click="minusNum()">-</div>
          <div class="input_center">
            <input type="text" readonly="readonly" v-model="num" name="num" id="num" />
          </div>
          <div class="input_right" @click="addNum()">+</div>
        </div>
      </div>
      <button class="addcart" @click="addCart()">加入购物车</button>
    </footer>
  </div>
</template>

<script>
import config from "../model/config";
export default {
  data() {
    return {
      id: this.$route.params.id,
      api: config.api,
      food:{},
      num:1,
    };
  },
  mounted() {
    //获取动态路由传值
    console.log(this.$route.params);
    //获取get传值 url?abc=xx
    // console.log(this.$route.query)
    this.requestData()
  },
  methods: {
    requestData() {
      let url = this.api + "api/productcontent?id=" + this.id;
      this.$http.get(url, { params: {} }).then(
        function(res) {
          console.log(res);
          // 响应成功回调
          this.food=res.body.result[0]
        },
        function(err) {
          console.log(err);
          // 响应错误回调
        }
      );
    },
    minusNum(){
      if(this.num<=1){
        return;
      }else {
        this.num--;
      }
    },
    addNum(){
      this.num++;
    },
    addCart(){
      let api=this.api+"api/addCart"
      this.$http.post(api,{
        uid:"s001",
        title:this.food.title,
        price:this.food.price,
        num:this.num,
        product_id:this.food._id,
        img_url:this.food.img_url
      }).then((response)=>{
        console.log(response)
        if(response.body.success==="true"){
          console.log(response.body.success)
          this.$router.push(
            {path:"/home"}
          )
        }
      },(error)=>{
        console.log(error)
      })
    }
  },
  
};
</script>

<style lang="scss">
.back {
  width: 4.8rem;
  height: 4.8rem;
  line-height: 4.8rem;
  border-radius: 50%;
  background-color: #000;
  position: fixed;
  top: 0.5rem;
  left: 0.5rem;
  color: #fff;
  &::before {
    // before伪类默认是行内元素 需要转换成块元素
    display: block;
    content: "";
    width: 0.8rem;
    height: 0.8rem;
    border-left: 0.2rem solid #fff;
    border-bottom: 0.2rem solid #fff;
    float: left;
    position: relative;
    top: 2rem;
    left: 0.6rem;
    transform: rotate(45deg);
    margin-right: 0.6rem;
  }
}

.p_content {
  .p_info {
    background: #fff;
    img {
      width: 100%;
      height: 24rem;
    }

    h2 {
      padding: 0.2rem 0.5rem;
    }
    .price {
      padding: 0.2rem 0.5rem;
      color: red;
      font-size: 2rem;
    }
  }
  .p_detail {
    background: #fff;
    margin-top: 1rem;
    h3 {
      padding: 0.5rem;
    }
    .p_content {
      padding: 1rem;
      padding-bottom: 8rem;
      img {
        width: 100%;
        display: block;
        margin: 0 auto;
      }
      * {
        line-height: 1.5;
        color: #666;
      }
    }
  }
}

/*底部*/
.pfooter {
  position: fixed;
  bottom: 0;
  height: 6rem;
  line-height: 6rem;
  background: #fff;
  left: 0px;
  width: 100%;
  border-top: 1px solid #eee;
  .cart {
    float: left;
    display: flex;
    strong {
      flex: 1;
      font-size: 1.6rem;
      padding: 0rem 1rem;
    }
    .cart_num {
      width: 12rem;
      display: flex;
      margin-top: 1rem;
      margin-left: 1rem;
      .input_left,
      .input_right {
        flex: 1;
        width: 4rem;
        height: 4rem;
        line-height: 4rem;
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
          height: 4rem;
          border: none;
          border-top: 1px solid #eee;
          border-bottom: 1px solid #eee;
          float: left;
        }
      }
    }
  }
  .addcart {
    float: right;
    background: red;
    color: #fff;
    height: 3rem;
    border: none;
    padding: 0 0.5rem;
    border-radius: 0.5rem;
    margin-top: 1.6rem;
    margin-right: 0.8rem;
  }
}
</style>