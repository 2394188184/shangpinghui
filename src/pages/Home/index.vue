<template>
  <div>
    <!-- <h4>我是首页</h4> -->
    <TypeNav></TypeNav>
    <!-- 列表，轮播图 -->
    <ListContainer></ListContainer>
    <!-- 今日推荐 -->
    <Recommend></Recommend>
    <!-- 商品排行 -->
    <Rank></Rank>
    <!-- 猜你喜欢 -->
    <like></like>
    <!-- 楼层 -->
    <Floor v-for="item in reqFloorList" :key="item.id" :floor="item"></Floor>
    <!--商标-->
    <Brand></Brand>
  </div>
</template>

<script type="text/javascript">
//引入其他组件
import ListContainer from '@/pages/Home/ListContainer/index.vue';
import Recommend from '@/pages/Home/Recommend/index.vue';
import Rank from '@/pages/Home/Rank/index.vue';
import Like from '@/pages/Home/Like/index.vue';
import Floor from '@/pages/Home/Floor/index.vue';
import Brand from '@/pages/Home/Brand/index.vue';
import { mapState } from 'vuex';
export default {
  components:{ListContainer,Recommend,Rank,Like,Floor,Brand},
 mounted(){
    //获取floor的数据
    this.$store.dispatch('getFloorList')
  },
  computed:{
      ...mapState({reqFloorList:store => store.home.reqFloorList})
  }
}
</script>

<style>

</style>