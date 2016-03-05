<template>

    <div class="note-list-item p1 bg28 mb1">
        <p>{{ noteitem.note }}</p>
        <p class="tar">
            <span v-if="noteitem.user==undifined">我自己</span>
            <span v-else="noteitem.user==undifined"><a href="javascript:;">{{noteitem.user.name}}</a></span>
            ，{{ noteitem.created }}
        </p>
        <template v-if="noteitem.shared">
            <a href="javascript:;" class="pr1">赞</a>
            <a href="javascript:;">评论</a>
            <a href="javascript:;">取消分享</a>
        </template>
        <a href="javascript:;" v-else="noteitem.shared">点击分享</a>
    </div>

</template>

<script>
    export default {
        name: 'NoteListItem',
        props: {
            noteitem: Object
        },
        data () {
            return {
               
            }
        }
    }
</script>

<style lang="stylus">

</style>