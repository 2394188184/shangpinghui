<template>
  <div class="swiper-container" ref="swiperContainer">
    <div class="swiper-wrapper">
      <div class="swiper-slide"  v-for="(item,index)  in skuImageList" :key="item.id">
        <img  @click="onAtive(index)" :class="{'active':currentIndex == index}" :src="skuImageList[index].imgUrl">
      </div>
    </div>
    <div class="swiper-button-next"></div>
    <div class="swiper-button-prev"></div>
  </div>
</template>
<script>
  import Swiper from 'swiper'
  export default {
    name: "ImageList",
    props:['skuImageList'],
    data(){
      return {
        currentIndex:0
      }
    },
    //监听list的数据变化，默认执行一次
    watch:{
      skuImageList:{
          //如果不默认执行一次，不会执行这个代码，因为数据是从父亲传过来的，一直是这个数据没改变
          immediate:true,
          handler(){
              this.$nextTick(()=>{
                  new Swiper(this.$refs.swiperContainer,{
                      slidesPerView :3,
                      loopedSlides: 1,
                      // loop: true,  //播放到最后一张，点击按钮后，会继续播放第一张
                      // speed: 50, // 滚动一张或者切换一张图片，需要的时间，单位ms，默认300ms */
                      // //自动播放
                      // autoplay: {
                      //     delay: 3000,//3秒切换
                      //     stopOnLastSlide: false,//当切换到最后一个slide时停止自动切换
                      //     disableOnInteraction: false,//，用户操作swiper之后自动切换不会停止
                      // }, 
                      // 如果需要前进后退按钮
                      navigation: {
                          nextEl: '.swiper-button-next', // 右按钮
                          prevEl: '.swiper-button-prev', // 左按钮
                      }
                  })
              })
          }
      }
    },
    methods:{
      onAtive(index){
        this.currentIndex = index;
        //将数据【索引值】传给兄弟组件展示一样的数据
        this.$bus.$emit('getIndex',index)
      }
    }
  }
</script>

<style lang="less" scoped>
  .swiper-container {
    height: 56px;
    width: 412px;
    box-sizing: border-box;
    padding: 0 12px;

    .swiper-slide {
      width: 56px;
      height: 56px;

      img {
        width: 100%;
        height: 100%;
        border: 1px solid #ccc;
        padding: 2px;
        width: 50px;
        height: 50px;
        display: block;

        &.active {
          border: 2px solid #f60;
          padding: 1px;
        }
      }
    }

    .swiper-button-next {
      left: auto;
      right: 0;
    }

    .swiper-button-prev {
      left: 0;
      right: auto;
    }

    .swiper-button-next,
    .swiper-button-prev {
      box-sizing: border-box;
      width: 12px;
      height: 56px;
      background: rgb(235, 235, 235);
      border: 1px solid rgb(204, 204, 204);
      top: 0;
      margin-top: 0;
      &::after {
        font-size: 12px;
      }
    }
  }
</style>