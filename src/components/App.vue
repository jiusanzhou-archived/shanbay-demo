<template class="df">

   <!-- Main View -->
   <div id="wrapper" class="df">
      <site-header class="f1a"></site-header>
      <router-view
         class="f2a view pt1 pb1 pl2 pr2"
         keep-alive
         transition
         transition-mode="out-in">
      </router-view>
      <site-footer class="f1a"></site-footer>
   </div>
   <!-- Main View Over -->

</template>

<script>
   import SiteHeader from './SiteHeader.vue'
   import SiteFooter from './SiteFooter.vue'

   export default {
      name: 'App',
      components: {
         SiteHeader,
         SiteFooter
      }
   }

</script>

<style lang="stylus">
.view
   transition opacity .2s ease
   box-sizing border-box
   &.v-enter, &.v-leave
      opacity 0
a
p
h1
h2
h3
h4
h5
ul
li
label
span
div
code
header
footer
blockquote
input
textarea
body
   padding 0
   margin 0
   color #fff
/* Scoll Bar */
::-webkit-scrollbar
   width 2px
   height:2px
   border-radius 10px
   background-color #fff
::-webkit-scrollbar-thumb
   -webkit-border-radius 10px
   border-radius 0px
   background-color #ed2d2d
/* Selection */
::selection
   color #ed2d2d
   background #000
html, body
   font-family "Microsoft Jhenghei", Georgia,Cambria,"Times New Roman",Times,"Hiragino Sans GB", "Microsoft YaHei", sans-serif
   font-size 1rem
   height 100%
ul
   list-style-type none
a
   cursor pointer
   text-decoration none
.df
   display flex
   flex-flow row wrap
.fdc
   flex-direction column
.jcfs
   align-content: flex-start
.jcse
   align-content: flex-end
.jcc
   justify-content center
.jcsb
   justify-content space-between
.jcsa
   justify-content space-around
.aic
   align-items center
.ffcw
   flex-flow column wrap
.ffrw
   flex-flow row wrap
.f1a
   flex 1 auto
.f10
   flex 1 0
.f1100
   flex 1 100%
.f2a
   flex 2 auto
.o1
   order 1
.o2
   order 2
.o3
   order 3
.o4
   order 4
.o5
   order 5
.o6
   order 6
.o7
   order 7
.o8
   order 8

.fb
   font-weight bold
.f1r
   font-size 1rem
.f1d5r
   font-size 1.5rem
.f2r
   font-size 2rem
.f2d5r
   font-size 2.5rem
.tac
   text-align center

.bg1
   background-color #6BCA99

.w100
   width 100%
.w70
   width 70%
.h100
   height 100%

.lh1d5r
   line-height 1.5rem
.lh2r
   line-height 2rem

.tac
   text-align center

.p1
   padding 1rem
.p2
   padding 2rem
.pt1
   padding-top 1rem
.pb1
   padding-bottom 1rem
.pr1
   padding-right 1rem
.pl1
   padding-left 1rem
.pt2
   padding-top 2rem
.pb2
   padding-bottom 2rem
.pr2
   padding-right 2rem
.pl2
   padding-left 2rem
.m1
   margin 1rem
.m2
   margin 2rem
.mt1
   margin-top 1rem
.mb1
   margin-bottom 1rem
.mr1
   margin-right 1rem
.ml1
   margin-left 1rem
.mt2
   margin-top 2rem
.mb2
   margin-bottom 2rem
.mr2
   margin-right 2rem
.ml2
   margin-left 2rem

.b1w
   border 1px solid #fff
.b1tw
   border-top 1px solid #fff
.b1bw
   border-bottom 1px solid #fff

.bsd1
   box-shadow 2px 2px 4px rgb(255, 103, 102);

/* Show or Hide */
.show
   opacity 1
   visibility visible
.hide
   opacity 0
   visibility hidden

.bgf67
   background-color #ff6766

</style>