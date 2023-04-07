<template>
  <div id="app">
    <Header></Header>
    <router-view></router-view>
    <!-- Footer组件的隐藏(login,register) -->
    <Footer v-show="$route.meta.isShow"></Footer>
  </div>
</template>

<script>  
import Header from './components/Header/index.vue'
import Footer from './components/Footer/index.vue'
export default {
  name: 'App',
  components: {
    Header,Footer
  },
  mounted(){
    this.$store.dispatch('reqCategoryList')

  }
}
</script>

<style>
</style>
