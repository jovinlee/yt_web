import Vue from 'vue'
import Router from 'vue-router'

Vue.use(Router)

/* Layout */
import Layout from '../views/layout/Layout'

/**
 * hidden: true                   if `hidden:true` will not show in the sidebar(default is false)
 * alwaysShow: true               if set true, will always show the root menu, whatever its child routes length
 *                                if not set alwaysShow, only more than one route under the children
 *                                it will becomes nested mode, otherwise not show the root menu
 * redirect: noredirect           if `redirect:noredirect` will no redirct in the breadcrumb
 * name:'router-name'             the name is used by <keep-alive> (must set!!!)
 * meta : {
    title: 'title'               the name show in submenu and breadcrumb (recommend set)
    icon: 'svg-name'             the icon show in the sidebar,
  }
 **/
export const constantRouterMap = [
  { path: '/acceptStore', component: () => import('@/views/login/acceptStore'), hidden: true },
  { path: '/login', component: () => import('@/views/login/index'), hidden: true },
  { path: '/404', component: () => import('@/views/404'), hidden: true },
  {
    path: '/',
    component: Layout,
    redirect: '/home',
    children: [{
      path: 'home',
      name: 'home',
      component: () => import('@/views/home/index'),
      meta: { title: '首页', icon: 'home' }
    }]
  },
  {
    path: '/tz_manage',
    component: Layout,
    redirect: '/tz_manage/data_report',
    name: 'data',
    meta: { title: '投放管理', icon: 'product' },
    children: [
      {
        path: 'data_report',
        name: '/data_report',
        component: () => import('@/views/tz_manage/data_report'),
        meta: { title: '数据报告', icon: 'product-add' }
      }
    ]
  },
  {
    path: '/cw_manage',
    component: Layout,
    name: 'cw_manage',
    redirect: '/cw_manage/recharge_record',
    meta: { title: '财务管理', icon: 'product' },
    children: [
      {
        path: 'recharge_record',
        name: 'recharge_record',
        component: () => import('@/views/cw_manage/recharge_record'),
        meta: { title: '充值记录', icon: 'product-add' },
        hidden: true
      },
      {
        path: 'consume_record',
        name: 'consume_record',
        component: () => import('@/views/cw_manage/consume_record'),
        meta: { title: '消耗记录', icon: 'product-add' },
        hidden: true
      }
    ]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: 'user_manage',
      name: 'user_manage',
      component: () => import('@/views/user_manage/index'),
      meta: { title: '用户管理', icon: 'home' }
    }]
  },
  {
    path: '/',
    component: Layout,
    children: [{
      path: '/msg_list',
      name: 'msg_list',
      component: () => import('@/views/message/msg_list'),
      meta: { title: '用户管理', icon: 'home' }
    }]
  },
  { path: '*', redirect: '/404', hidden: true }
]

export default new Router({
  // mode: 'history', //后端支持可开
  scrollBehavior: () => ({ y: 0 }),
  routes: constantRouterMap
})

