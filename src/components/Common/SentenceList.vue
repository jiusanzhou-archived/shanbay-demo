<template>
    <div class="sentence-list sentences">
        <template v-if="!official">
            <h3 class="tac f1d5r p1">例句</h3>
            <div class="sentences-footer pb1 df jcsa">
                <a href="javascript:;" class="p1 b1w">查看广场造句</a>
                <a @click="toggleWrite(writting)" class="p1 b1w" :class="{'actived': writting}">我来造句</a>
            </div>
            <div class="sentences-view">
                <ul>
                    <li v-show="writting">
                        <textarea autofocus class="mt1 w100" type="text" v-model="writedSentence.sentence" rows="5" placeholder="造句子..."></textarea>
                    </li>
                    <li v-show="!writting" v-for="sentenceitem in listData">
                        <sentence-list-item :sentenceitem="sentenceitem"></sentence-list-item>
                    </li>
                    <li v-show="writting">
                        <sentence-list-item :sentenceitem="writedSentence"></sentence-list-item>
                    </li>
                </ul>
            </div>
        </template>
        <template v-else="!official">
                <h3 class="tac f1d5r p1">官方例句</h3>
            <div class="sentences-view bg28 mt1">
                <ul>
                    <li v-for="sentenceitem in listData">
                        <sentence-list-item :sentenceitem="sentenceitem"></sentence-list-item>
                    </li>
                </ul>
            </div>
        </template>
    </div>
</template>

<script>
    import SentenceListItem from './SentenceListItem.vue'
    export default {
        name: 'SentenceList',
        data () {
            return {
                writting: false,
                writedSentence: {
                    sentence: "",
                    shared: false,
                    created: "未发表"
                }
            }
        },
        props: [
            'listData',
            'official'
        ],
        components: {
             SentenceListItem
        },
        methods: {
            toggleWrite (w) {
                this.$set('writting', !w);
            }
        }
    }
</script>

<style lang="stylus">
input,
select,
textarea
    border none
    color #ff6766
    font-size 1.5rem
    padding-left 1rem
.sentence-list
    .sentences-view
        max-height 25rem
        overflow-y auto
.actived
    color #ff6766
    background-color #fff
</style>