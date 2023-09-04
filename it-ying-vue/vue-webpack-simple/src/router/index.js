import Vue from 'vue'
import Router from 'vue-router'
import Base from '../components/base'
import Index from '../components/index'
import DoubleBind from '../components/doubleBind'
import Event from '../components/event'
import ToDoList from '../components/toDoList'

Vue.use(Router)

export default new Router({
  routes: [
    {
      path: '/',
      name: 'Index',
      component: Index
    },
    {
      path: '/base',
      name: 'Base',
      component: Base
    },
    {
      path: '/doubleBind',
      name: 'Dboule',
      component: DoubleBind
    },
    {
      path: '/event',
      name: 'Event',
      component: Event
    },
    {
      path: '/toDoList',
      name: 'ToDoList',
      component: ToDoList
    }
  ]
})
