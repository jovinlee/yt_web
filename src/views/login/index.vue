<template>
  <div>
    <el-card class="login-form-layout">
      <el-form
        autocomplete="on"
        :model="loginForm"
        :rules="loginRules"
        ref="loginForm"
        label-position="left"
      >
        <!--<div style="text-align: center">-->
          <!--<svg-icon icon-class="login-mall" style="width: 56px;height: 56px;color: #409EFF"></svg-icon>-->
        <!--</div>-->
        <h2 class="login-title color-main">沿途管理系统</h2>
        <el-form-item prop="name">
          <el-input
            name="name"
            type="text"
            v-model="loginForm.name"
            autocomplete="on"
            placeholder="请输入用户名"
          >
            <span slot="prefix">
              <svg-icon icon-class="user" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            name="password"
            :type="pwdType"
            @keyup.enter.native="handleLogin"
            v-model="loginForm.password"
            autocomplete="on"
            placeholder="请输入密码"
          >
            <span slot="prefix">
              <svg-icon icon-class="password" class="color-main"></svg-icon>
            </span>
            <span slot="suffix" @click="showPwd">
              <svg-icon icon-class="eye" class="color-main"></svg-icon>
            </span>
          </el-input>
        </el-form-item>
        <el-form-item style="margin-bottom: 60px">
          <el-button
            style="width: 100%"
            type="primary"
            :loading="loading"
            @click.native.prevent="handleLogin"
          >登录</el-button>
        </el-form-item>

        <!-- <el-form-item style="margin-bottom: 10px">
          <el-button style="width: 100%" type="primary" @click.native.prevent="handleStore">商家入驻</el-button>
        </el-form-item> -->
      </el-form>
    </el-card>
    <img :src="login_center_bg" class="login-center-layout">
  </div>
</template>

<script>
import { isvalidname } from "@/utils/validate";
import login_center_bg from "@/assets/images/login_center_bg.png";

export default {
  name: "login",
  data() {
    const validatename = (rule, value, callback) => {
      if (!isvalidname(value)) {
        callback(new Error("请输入正确的用户名"));
      } else {
        callback();
      }
    };
    const validatePass = (rule, value, callback) => {
      if (value.length < 3) {
        callback(new Error("密码不能小于3位"));
      } else {
        callback();
      }
    };
    return {
      loginForm: {
        name: "",
        password: ""
      },
      loginRules: {
        name: [
          { required: true, trigger: "blur", validator: validatename }
        ],
        password: [{ required: true, trigger: "blur", validator: validatePass }]
      },
      loading: false,
      pwdType: "password",
      login_center_bg
    };
  },
  methods: {
    showPwd() {
      if (this.pwdType === "password") {
        this.pwdType = "";
      } else {
        this.pwdType = "password";
      }
    },
    handleReg() {
      this.$router.push({ path: "/reg" });
    },
    handleStore() {
      this.$router.push({ path: "/acceptStore" });
    },
    handleLogin() {
      this.$refs.loginForm.validate(valid => {
        console.log(valid);
        if (valid) {
          this.loading = true;
          this.$store
            .dispatch("Login", this.loginForm)
            .then((res) => {
              this.loading = false;
              console.log(res);
              if(res.status==1){
                this.$router.push({ path: "/" });
              }
            })
            .catch(() => {
              this.loading = false;
            });
        } else {
          console.log("参数验证不合法！");
          return false;
        }
      });
    }
  }
};
</script>

<style scoped>
.login-form-layout {
  position: absolute;
  left: 0;
  right: 0;
  width: 360px;
  margin: 140px auto;
  border-top: 10px;
  /*border-top: 10px solid #409eff;*/
}

.login-title {
  text-align: center;
}

.login-center-layout {
  background: #409eff;
  width: auto;
  height: auto;
  max-width: 100%;
  max-height: 100%;
  margin-top: 200px;
}
</style>
