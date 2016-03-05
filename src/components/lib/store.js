import { Promise } from 'es6-promise'
import Vue from 'vue'

const store = window.store;
const key = "shanbay_";

export default {
    name: "shanbay",
    auth: {
        name: key + 'auth',
        get: function(){
            return store.get(this.name)
        },
        set: function(r){
            return store.set(this.name, r)
        },
        del: function(){
            store.remove(this.name)
            return true
        }
    },
    userinfo: {
        name: key + 'userinfo',
        get: function(){
            return store.get(this.name)
        },
        set: function(r){
            return store.set(this.name, r)
        },
        del: function(){
            store.remove(this.name)
            return true
        }
    },
    levels: {
        name: key + 'levels',
        get: function(){
            return store.get(this.name)
        },
        set: function(r){
            store.set(this.name, r)
            return true
        },
        del: function(){
            store.remove(this.name)
            return true
        }
    },
    words: {
        name: key + 'words',
        get: function(){
            return store.get(this.name)
        },
        set: function(r){
            store.set(this.name, r)
            return true
        },
        del: function(){
            store.remove(this.name)
            return true
        }
    },
}