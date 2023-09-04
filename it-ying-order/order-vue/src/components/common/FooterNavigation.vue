<template>
  <div>
    <div id="footer_nav" class="footer-nav" @click="navigationShow=!navigationShow">
      <img src="../../assets/images/nav/navigation.png" />
      <p>导航</p>
    </div>
    <div class="footer-nav-show" id="footer_nav_show" v-show="navigationShow">
      <ul class="list">
        <li>
          <img src="../../assets/images/nav/menu.png" />
          <p>菜单</p>
        </li>
        <li>
          <img src="../../assets/images/nav/cart.png" />
          <p>购物车</p>
        </li>
        <li>
          <img src="../../assets/images/nav/order.png" />
          <p>订单</p>
        </li>
        <li>
          <img src="../../assets/images/nav/wallet.png" />
          <p>结账</p>
        </li>
        <li id="nav_back" @click="navigationShow=!navigationShow">
          <img src="../../assets/images/nav/close.png" />
          <p>返回</p>
        </li>
      </ul>
    </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      navigationShow: false
    };
  }
};
</script>
<style lang="scss">
</style>