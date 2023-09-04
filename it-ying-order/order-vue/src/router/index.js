import Vue from 'vue'
import Router from 'vue-router'
import Start from "../components/Start"
import Cart from "../components/Cart"
import Food from "../components/Food"
import Home from "../components/Home"
import Hot from "../components/Hot"
import Order from "../components/Order"
import Search from "../components/Search"
import EditPeopleInfo from "../components/EditPeopleInfo"

Vue.use(Router)

export default new Router({
  routes: [{
      path: '/start',
      name: 'Start',
      title: "",
      component: Start
    },
    {
      path: "/cart",
      name: "Cart",
      component: Cart
    },
    {
      path: "/hot",
      name: "Hot",
      component: Hot
    },
    // 动态路由
    {
      path: "/food/:id",
      name: "Food",
      component: Food
    },
    {
      path: "/home",
      name: "Home",
      component: Home
    },
    {
      path: "/order",
      name: "/Order",
      component: Order
    },
    {
      path: "/search",
      name: "/Search",
      component: Search
    },
    {
      path: "/editPeopleInfo",
      name: "/EditPeopleInfo",
      component: EditPeopleInfo
    },
    {
      path:"*",
      redirect:'/start',
    }

  ]
})
