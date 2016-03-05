<template>
  <div class="user-view w100" v-show="true">
      <div class="page-title w100 pt1  bgf67 pb1">
        <h4 class="tac f1d5r">个人中心</h4>
      </div>
      <div v-if="userinfo" class="page-form bgf67 p2">
        <ul>
          <li>
            <label for="uname">用户名</label>
            <input id="uname" name="uname" type="text" v-model="userinfo.name" placeholder="用户名">
          </li>
          <li>
            <label for="level">单词本</label>
            <select name="level" id="level" v-model="userinfo.level">
              <template  v-for="level in levels">
                <option v-if="level.id==userinfo.level" :value="level.lid" selected>{{ level.name }}</option>
                <option v-else="level.id==userinfo.level" :value="level.lid">{{ level.name }}</option>
              </template>
            </select>
          </li>
          <li>
            <label for="task">每日量</label>
            <input name="task" v-model="userinfo.task" id="task" type="number" min="10" value="10">
          </li>
          <li>
            <label for="">性别是</label>
            <input type="radio" id="male" value="1" v-model="userinfo.ismale">
            <label for="male">男</label>
            <input type="radio" id="female" value="0" v-model="userinfo.ismale">
            <label for="female">女</label>
          </li>
          <li>
            <button class="p1 pl2 pr2 f1r bgf67 b1w cw" v-text="saveButton" @click="saveProfile"></button>
          </li>
        </ul>
      </div>
      <div v-else class="pt1 pb1 tac f1d5r bgf67">
        <p><a v-link="'login-register/login'">请登陆</a></p>
      </div>
      <div class="pt1 pb1 tac f1d5r bgf67">
        <p><a v-link="'/'">返回首页</a></p>
      </div>

  </div>
</template>

<script>
import api from './lib/data.js'
import shanbay from './lib/store.js'

export default {

  name: 'UserView',

  data () {
    return {
      saveButton: "保存",
      userinfo: {},
      levels: api.getLevels(),
      saveTimes: 0
    }
  },
  computed: {

  },
  watch: {

  },
  methods: {
    saveProfile () {
      this.saveButton = "正在保存..."
      let _d = {
        name: this.userinfo.name,
        level: this.userinfo.level,
        task: this.userinfo.task,
        ismale: this.userinfo.ismale
      }
      if (api.saveProfile(_d, this.userinfo.uid)){
        this.saveButton = "保存成功"
        let _v = this
        window._f = function(d){_v.saveButton="保存"}
        setTimeout('_f()',1000)
      }else{
        this.saveButton = "保存失败"
        window._f = function(d){_v.saveButton="保存"}
        setTimeout('_f()',1000)
      }
    }
  },
  route: {
    data ({ to }) {
      return {
        userinfo: shanbay.userinfo.get()
      }
    }
  }
}
</script>

<style lang="stylus">
button
  border none
.page-title
  margin-bottom 1rem
.page-form
  ul
    li
      padding 1rem 0
      label
        padding-right 2rem
</style>
