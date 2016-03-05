<template>

    <div class="sentence-list-item p1 bg28 mb1 b1bw">
        <p>{{ sentenceitem.sentence }}</p>
        <p v-for="t in sentenceitem.translation">{{ t.translation }}</p>
        <p class="tar"><span v-if="sentenceitem.user!=undifined">{{ sentenceitem.user.name }}</span>{{ sentenceitem.created }}</p>
        <a href="javascript:;" class="pr1">赞</a><a href="javascript:;">评论</a>
    </div>

</template>

<script>
    export default {
        name: 'SentenceListItem',
        props: {
            sentenceitem: Object
        },
        data () {
            return {
               
            }
        }
    }
</script>

<style lang="stylus">

</style>