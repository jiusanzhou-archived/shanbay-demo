<template>
    <div class="note-list">
        <div class="title f1d5r p1">
            <h3 class="tac">笔记</h3>
        </div>
        <div class="notes-footer pb1 df jcsa">
            <a href="javascript:;" class="p1 b1w">查看广场笔记</a>
            <a @click="toggleWrite(writting)"  class="p1 b1w" :class="{'actived': writting}">写笔记</a>
        </div>
        <div class="notes-view">
            <ul>
                <li v-show="writting">
                    <textarea autofocus class="mt1 w100" type="text" v-model="writedNote.note" rows="5" placeholder="写下笔记..."></textarea>
                </li>
                <li v-show="!writting" v-for="noteitem in listData">
                    <note-list-item :noteitem="noteitem"></note-list-item>
                </li>
                <li v-show="writting">
                    <note-list-item :noteitem="writedNote"></note-list-item>
                </li>
            </ul>
        </div>
    </div>
</template>

<script>
    import NoteListItem from './NoteListItem.vue'
    export default {
        name: 'NoteList',
        data () {
            return {
                writting: false,
                writedNote: {
                    note: "",
                    shared: false,
                    created: "未发表"
                }
            }
        },
        props: [
            'listData'
        ],
        components: {
             NoteListItem
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
textarea
    border none
    color #ff6766
    font-size 1.5rem
    padding-left 1rem
.note-list
    .notes-view
        max-height 25rem
        overflow-y auto
.actived
    color #ff6766
    background-color #fff
</style>