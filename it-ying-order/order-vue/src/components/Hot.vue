<template>
  <div id="hot">
      <header class="hot_header header">
		<div class="title">
			本店热销榜
		</div>
	</header>
	<div class="hot_content">
		<ul class="item_list clearfix">
			<li>
				<img class="item_img" src="../assets/images/food/1.jpeg" />
				<div class="inner">
					<h3 class="title">大蒜腊肉</h3>
					<p class="price">¥26</p>
					<span>已售:351份</span>
				</div>
			</li>
			<li>
				<img class="item_img" src="../assets/images/food/2.jpeg" />
				<div class="inner">
					<h3 class="title">大蒜腊肉</h3>
					<p class="price">¥26</p>
					<span>已售:351份</span>
				</div>
			</li>
			<li>
				<img class="item_img" src="../assets/images/food/3.jpeg" />
				<div class="inner">
					<h3 class="title">大蒜腊肉</h3>
					<p class="price">¥26</p>
					<span>已售:351份</span>
				</div>
			</li>
		</ul>
	</div>
	<div id="footer_nav" class="footer-nav">
		<img src="../assets/images/nav/navigation.png" />
		<p>导航</p>
	</div>
	<div id="footer_book" class="footer-book">
		<img src="../assets/images/nav/menu.png" />
		<p>菜单</p>
	</div>
	<div id="footer_cart" class="footer-cart">
		<img src="../assets/images/nav/cart.png" />
		<p>购物车</p>
	</div>
  </div>
</template>

<script>
export default {

}
</script>

<style lang="scss">
.hot_header {
    height: 5rem;
    line-height: 5rem;
    text-align: center;
    width: 100%;
}

.hot_content {
    background-color: #fff;
    .item_list {
        padding: 0 .5rem;
        li {
            display: flex;
            border-bottom: 1px solid #eee;
            padding-top: 1rem;
            padding-bottom: 1rem;
            img {
                width: 8rem;
                height: 8rem;
            }
            .inner {
                flex:1;
                padding-left: 1rem;
            }
        }
    }
}


</style>