<template>
  <div class="app-wrapper" :class="classObj">
    <div class="top-header">
      <div class="left">
        <!--<img src="../../assets/images/logo.png"></img>-->
        <div class="logo">沿途客户管理系统</div>
      </div>
      <div class="right">
        <div class="msg" v-if="lastMsg" style="padding-right:20px;">
          <i class="el-icon-message-solid"></i>
          <font>{{lastMsg}}</font>
          <a href="#/message/msg_list">查看详情</a>
        </div>
        <el-button @click="login_out">退出登录</el-button>
      </div>
    </div>
    <sidebar class="sidebar-container"></sidebar>
    <div class="main-container">
      <navbar></navbar>
      <app-main></app-main>
    </div>
  </div>
</template>

<script>
import { Navbar, Sidebar, AppMain } from './components'
import ResizeMixin from './mixin/ResizeHandler'
import logo from '@/assets/images/logo.png';
export default {
  name: 'layout',
  data:function(){
    return{
      logo
    }
  },
  components: {
    Navbar,
    Sidebar,
    AppMain
  },
  mixins: [ResizeMixin],
  computed: {
    lastMsg(){return this.$store.state.user.lastMsg},
    sidebar() {
      return this.$store.state.app.sidebar
    },
    device() {
      return this.$store.state.app.device
    },
    classObj() {
      return {
        hideSidebar: !this.sidebar.opened,
        withoutAnimation: this.sidebar.withoutAnimation,
        mobile: this.device === 'mobile'
      }
    }
  },
  methods:{
    login_out(){
      window.sessionStorage.removeItem("user");
      window.sessionStorage.removeItem("lastMsg");
      window.location.href="/"
    }
  }
}
</script>

<style rel="stylesheet/scss" lang="scss" scoped>
  @import "src/styles/mixin.scss";
  .app-wrapper {
    @include clearfix;
    position: relative;
    height: 100%;
    width: 100%;
    .top-header{
      position: fixed;
      z-index: 100;
      top:0;
      height: 70px;
      width: 100%;
      background-color: #fff;
      box-sizing: border-box;
      border-bottom: 1px solid #ededed;
      display: flex;
      justify-content:space-between;
      align-items: center;
      .left,.right{
        display: flex;
        justify-content:space-between;
        align-items: center;
      }
      .left{
        padding-left: 10px;
        .logo{
          padding-left: 50px;
          font-size: 30px;
          font-weight: 500;
        }
      }
      .right{
        display: flex;
        justify-content:space-between;
        align-items: center;
        .msg{
          display: flex;
          justify-content:space-between;
          align-items: center;
          padding-right: 20px;
          a{color:blue;font-size: 12px;}
          font{
            display: block;
            max-width: 300px;
            overflow: hidden;
            white-space: nowrap;
            text-overflow: ellipsis;
            font-size: 12px;
          }
        }
      }
    }
  }
</style>
