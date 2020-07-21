import { login, logout, getInfo } from '@/api/login'
import {getLastMsg} from "@/api/message"
import { getToken, setToken, removeToken } from '@/utils/auth'

const user = {
  state: {
    user:{},
    lastMsg:""
  },

  mutations: {
    SET_USER_INFO: (state, user) => {
      state.user = user
    },
    SET_LAST_MSG:(state , lastMsg)=>{
      state.lastMsg = lastMsg
    }
  },

  actions: {
    // 登录
    Login({ commit }, userInfo) {
      const name = userInfo.name.trim()
      return new Promise((resolve, reject) => {
        login(name, userInfo.password).then(res => {
          if(res.status==1){
            const {data} = res;
            commit('SET_USER_INFO', data);
            sessionStorage.setItem("user",JSON.stringify(data));
            var params={
              userId:data.rowId
            }
            getLastMsg(params).then(res1=>{
              if(res1.data){
                commit("SET_LAST_MSG",res1.data.info);
                sessionStorage.setItem("lastMsg",res1.data.info);
              }
            })
            resolve(res)
          }else{
            reject(res);
          }
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 获取用户信息
    GetInfo({ commit, state }) {
      return new Promise((resolve, reject) => {
        getInfo().then(response => {
          const data = response.data
          commit('SET_USER_INFO', data)
          if (data.roles && data.roles.length > 0) { // 验证返回的roles是否是一个非空数组
            commit('SET_ROLES', data.roles)
          } else {
            reject('getInfo: roles must be a non-null array !')
          }
          commit('SET_NAME', data.name)
          commit('SET_AVATAR', data.icon)
          resolve(response)
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 登出
    LogOut({ commit, state }) {
      return new Promise((resolve, reject) => {
        logout(state.token).then(() => {
          commit('SET_TOKEN', '')
          commit('SET_ROLES', [])
          commit('SET_MENUS', [])
          removeToken()
          resolve()
        }).catch(error => {
          reject(error)
        })
      })
    },

    // 前端 登出
    FedLogOut({ commit }) {
      return new Promise(resolve => {
        commit('SET_TOKEN', '')
        removeToken()
        resolve()
      })
    }
  }
}

export default user
