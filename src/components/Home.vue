<template>
    <div class="home df jcsb"
        transition
        transition-mode="out-in">
        <template v-if="!$loadingAsyncData">
        <div class="o2 f10 ffrw df m1">
            <div class="bg28 f1a p1 bgf67 mb1 bsd1">
                <div class="df aic jcsa pb1">
                    <a class="f1d5r b1w pl1 pr1"
                    href="javascript:;"
                    @click="buttonOneClick()">{{ buttonOne }}</a>
                    <p>今日目标：{{ index+1 }}/{{ total }}</p>
                    <a class="f1d5r b1w pl1 pr1"
                    href="javascript:;"
                    @click="buttonTwoClick()">{{ buttonTwo }}</a>
                </div>
                <div class="lineslot">
                    <div class="bgf67 line" :style="'width:'+100*(index+1)/total+'%'"></div>
                </div>
                <p class="fb f2d5r tac pt1 pb1">{{ word.word }}</p>
                <ul class="prons df" v-if="word.pronuncation.length" :class="{'hide': step < 1}">
                    <li v-for="pron in word.pronuncation" class="">
                        <p class="cw p2px words"><span>{{ pron.type }}</span>[ {{ pron.pronuncation }} ]</p>
                    </li>
                </ul>
            </div>
            <div class=" bgf67 mb1 bsd1" v-if="word.definition.length" :class="{'hide': step < 2}">
                <div v-for="(lang, text) in langs" class="p1 bg28" :class="{'hide': step < 2 + $index}">
                    <div class="df">
                        <p class="lang-label w15">{{ text }}</p>
                        <ul class="df w85">
                            <li v-for="definition in word.definition | filterBy lang in 'language'" class="pr1">
                                <p><span class="index">{{ $index + 1 }}</span>{{ definition.definition }} <small>{{ definition.pos }}</small></p>
                            </li>
                        </ul>
                    </div>
                </div>
            </div>
            <sentence-list
                class="w100 bgf67 bsd1"
                :official="true" 
                :list-data="word.sentence" 
                :order-by="sid" 
                :class="{'hide': step<4}"></sentence-list>
        </div>
        <sentence-list 
            class="o1 ffrw f10 bgf67 m1 bsd1" 
            :list-data="word.sentence" 
            :order-by="sid" 
            :class="{'hide': step<4}"></sentence-list>
        <note-list 
            class="o3 ffrw f10 bgf67 m1 bsd1" 
            :list-data="word.note" 
            :order-by="nid" 
            :class="{'hide': step<4}"></note-list>
        </template>
    </div>
</template>

<script>
    import shanbay from './lib/store.js'
    import { Promise } from 'es6-promise'
    import api from './lib/data.js'
    import NoteList from './Common/NoteList.vue'
    import SentenceList from './Common/SentenceList.vue'
    export default {
        name: 'Home',
        data () {
            return {
                langs: {'us': 'EN', 'zh_cn': '简中'},
                type: 0,
                task: 20,
                step: 0,
                index: 0,
                now_page: 1,
                limit: 10,
                now_page_count: 0,
                word: {},
                userinfo: {},
                buttonOne: '不熟悉',
                buttonTwo: '认识'
            }
        },
        asyncData () {
            return api.getWord(this.index%this.limit, this.now_page, this.limit)
                .then(( data ) => {
                    return {word: data}
                })
        },
        watch: {
            index: 'reloadAsyncData',
            word: function(n, o){
                let _ = this.index % this.limit
                if(this.index!=0&&(_ == 0)){
                    this.now_page++
                }
            },
            now_page: function(n, o){
                api.getNewWords(n, this.limit)
            }
        },
        computed: {
            total () {
                return this.userinfo.task
            },
            buttonOne () {
                return this.index>=this.total-1&&this.step>=3?'重复今日':this.step>=4?'标为生词':'不熟悉'
            },
            buttonTwo () {
                return this.index>=this.total-1&&this.step>=3?'继续明天':this.step>=4?'下一个':'认识'
            }
        },
        components: {
            NoteList,
            SentenceList
        },
        methods: {
            buttonOneClick () {
                this.index>=this.total-1&&this.step>=3
                    ?eval('this.step=0;this.index=0')
                    :this.step>=4
                        ?eval('console.log("add unknow note")')
                        :this.step++
                /*if(this.step<4){
                    this.step++
                }else{
                    console.log('add unknow note')
                }*/
            },
            buttonTwoClick () {
                this.index>=this.total-1&&this.step>=3
                    ?console.log('next day')
                    :this.step>=4
                        ?eval('this.index++;this.step=0')
                        :this.step=4
                /*if(this.index<this.total-1){
                    if(this.step<3){
                        this.step = 4
                    }else{
                        this.step = 0
                        this.index++
                    }
                }else{
                    if(this.step<3){
                        this.step = 4
                    }else{
                        console.log('get new')
                        this.index = 0
                    }
                }*/
            }
        },
        route: {
            data ({ to }) {
                this.userinfo = shanbay.userinfo.get()
            }
        }
    }
</script>

<style lang="stylus">
*
    transition all .3s ease
.words
    font-family "Lucida Sans Unicode, Lucida Grande, sans-serif"
.prons
    justify-content center
    p
        span
            padding-left 2px
            padding-right 2px
            text-transform uppercase
.lang-label
    width 15%
small
    font-style italic
.lineslot
    height 10px
    border 1px solid #fff
    border-radius 10px
    background-color #fff
    .line
        border-radius 8px
        height 100%
        width 0
.index
    font-style italic
    font-weight bold
    padding-right 1rem
    &:after
        content '.'
.other
    justify-content space-between
.official
    background #28C383
    color #fff
    font-weight bold
    font-size 1rem
</style>