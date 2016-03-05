<template>
    <header>
       <div class="df bgf67 aic pt2 pb2 w100 df jcsa">
           <h2 class="f2r"><a v-link="'/'">扇贝记单词</a></h2>
           <ul class="df">
                <template v-if="userinfo">
                  <li class="ml1 mr1"><a v-link="'/user'">{{ userinfo.name }}</a></li>
                  <li class="ml1 mr1"><a v-link="'/setences/mine'">我的造句</a></li>
                  <li class="ml1 mr1"><a v-link="'/notes/mine'">我的笔记</a></li>
                </template>
                <li class="ml1 mr1" v-if="userinfo"><a href="javascript:;" @click="loginOut">退出</a></li>
                <template v-else="userinfo">
                  <li class="ml1 mr1"><a v-link="'/login-register/register'">注册</a></li>
                  <li class="ml1 mr1"><a v-link="'/login-register/login'">登陆</a></li>
                </template>
               <li class="ml1 mr1">
                   <a v-link="'/about'">关于</a>
               </li>
           </ul>
       </div>
    </header>
</template>

<script>
import shanbay from './lib/store.js'
import Router from 'vue-router'
import Vue from 'vue'
Vue.use(Router)
let router = new Router
export default {
    name: 'SiteHeader',
    data () {
        return {
            userinfo: shanbay.userinfo.get()
        }
    },
    components: {
        
    },
    methods: {
      loginOut: function(){
        shanbay.userinfo.del()
        shanbay.auth.del()
        router.go('/')
        window.location.reload()
      }
    }
}

</script>

<style lang="stylus">
a
    &:visited
        color #fff
</style>