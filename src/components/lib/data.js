import { Promise } from 'es6-promise'
import shanbay from './store.js'
import Vue from 'vue'
import cookie from 'cookie_js'


const store = window.store;
const key = "shanbay_";

const api = {}
const csrftoken = cookie.get('csrftoken')

const apiUrl = {
    base: "http://localhost:8000/api/",
    register: "register/",
    login: "login/",
    user: "user/",
    levels: "levels/",
    words: "words/",
    end: "?format=json"
}

export default api

api.register = (data) => {
    return Vue.http.post(apiUrl.base + apiUrl.register + apiUrl.end, data)
        .then((response)=>{
            shanbay.auth.set(response.data.code)
            return response.data.code
        },(response)=>{
            return response.data
        })
}

api.login = (data) => {
    if(shanbay.auth.get()===data.code&&shanbay.userinfo.get()){
        return Promise.resolve(true)
    }else{  
        return Vue.http.post(apiUrl.base + apiUrl.login + apiUrl.end, data)
            .then((response)=>{
                if(response.data.data&&response.data.data.uid){
                    Vue.http.headers.common['Authorization'] = response.data.code;
                    shanbay.userinfo.set(response.data.data)
                    shanbay.auth.set(data.code)
                    return true
                }else{
                    return false
                }
            },(response)=>{
                return false
            })
    }
}

api.saveProfile = (data, uid) => {

    Vue.http.headers.common['Authorization'] = shanbay.auth.get()
    
    return Vue.http.get(apiUrl.base + apiUrl.user + uid + '/' + apiUrl.end, data)
        .then((response)=>{
            shanbay.userinfo.set(response.data.data)
            return true
        },(response)=>{
            return false
        })
}

api.getUser = (uid) => {
    return new Promise((resolve, reject) => resolve({
        data: {
            id: uid,
            name: 'John[' + uid + ']',
            last: '2016年2月29日',
            task: 20 + parseInt(Math.random()*10),
            level: {
                id: 1,
                name: '四级'
            },
            history: {
                total: 100,
                unknow: 1
            }
        }
    }))
}

api.getLevels = () => {
    let _l = shanbay.levels.get()
    if(_l){
        return _l
    }else{
        return Vue.http.get(apiUrl.base + apiUrl.levels + apiUrl.end)
            .then((response)=>{
                shanbay.levels.set(response.data)
                return true
            },(response)=>{
                return false
            })
    }
}

api.getWord = (index, page, limit) => {
    return api.getWords(page, limit)
        .then(( data ) => {
            return data[index]
        })
}

api.getWords = ( page, limit ) => {
    let _ = shanbay.words.get()
    if (_!=undefined&&_!={}) {
        return Promise.resolve(_[page])
    }else{
        return api.getNewWords(1, limit)
            .then((data)=>{
                return data
            })
    }
}

api.getNewWords = (page, limit) => {
    return Vue.http.get(apiUrl.base + apiUrl.words + 'limit/' + limit + '/page/' + page + '/' + apiUrl.end)
        .then(( { data } )=>{
            let _ = shanbay.words.get()
            let _s = _?_:{}
            _s[page] = data.data
            shanbay.words.set(_s)
            return data.data
        })
}