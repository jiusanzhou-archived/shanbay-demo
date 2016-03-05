<template>
  <div class="bgf67 w100 df fdc mt1 mb1"
        transition
        transition-mode="out-in">
    <template v-if="action==='register'">
      <p class="f1d5r w100 tac">注册</p>
      <div class="tac">
        <input id="email" name="email" class="p1 mt1 mb1" type="Email" v-model="email" placeholder="请输入您的邮箱地址"> 
      </div>
      <button class="p1 f1r" :disabled="isChecked?false:true" v-text="buttonValue" @click="register()"></button>
    </template>
    <template v-if="action==='login'">
      <template v-if="!loginSuccess">
      <p class="f1d5r w100 tac">登陆</p>
      <input id="email" name="email" required class="p1 mt1 mb1" type="Email" v-model="email" placeholder="请输入您的邮箱地址">
      <input id="code" name="code" required class="p1 mt1 mb1" type="text" v-model="code" placeholder="请输入密钥">
      <button class="p1 f1r" :disabled="(isChecked&&code!='')?false:true" @click="login()">登陆</button>
      </template>
      <template v-else>
        <div class="tac f1d5r bgf67">
          <p class="pt1 pb1"> 登陆成功 </p>
          <p class="pt1 pb1"><a v-link="'/'">去首页</a></p>
          <p class="pt1 pb1"><a v-link="'/user'">我的中心</a></p>
        </div>
      </template>
    </template>
    <p v-show="error" class="pt1 pb1 tac">{{ error }}<a v-link="'login'">点我登陆</a></p>
    <p v-show="code && action=='register'" class="pt1 pb1 tac">注册成功 {{ code }}<a v-link="'login'">点我登陆</a></p>
  </div>
</template>

<script>
import api from './lib/data.js'
import shanbay from './lib/store.js'
import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
let router = new Router
export default {

  name: 'Register',

  components: {},

  data () {
    return {
      isChecked: false,
      email: '',
      buttonValue: '',
      registerSuccess: false,
      loginSuccess: false,
      error: '',
      auth: '',
      action: '',
      code: ''
    }
  },

  watch: {
    email: function(){
      this.error=''
    }
  },

  computed: {
    isChecked () {
      let _r = /^([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+@([a-zA-Z0-9]+[_|\_|\.]?)*[a-zA-Z0-9]+\.[a-zA-Z]{2,5}$/
      return _r.test(this.email)?true:false
    },
    buttonValue () {
      return this.isChecked?"确认向  " + this.email + "发送激活邮件？":"无效邮箱"
    }
  },

  route: {
    data ({ to }) {
      return {
        action: to.params.action,
        loginSuccess: shanbay.userinfo.get()&&shanbay.auth.get()?true:false
      }
    }
  },

  created () {
    
  },

  destroyed () {
    
  },

  methods: {
    register () {
      let _d = ''
      api.register({content: this.email, rgtype: "m"})
        .then((a)=>{
          if(typeof a == "string"){
            this.code = a
            this.registerSuccess = true
          }else{
            this.error = "帐号已存在！"
          }
        })
    },
    login () {
      api.login({content: this.email, code: this.code})
        .then((d)=>{
          this.loginSuccess = d
          if(d){
            router.go('/user')
            setTimeout('window.location.reload()', 1000)
          }else{
            this.error = "登陆错误！"
          }
        })
    }
  },

  filters: {
    formatItemIndex (index) {
      return 1
    }
  }
}
</script>

<style lang="stylus">
input
    border none
    font-size 1.5rem
    font-family cursive
    font-weight bold
</style>
