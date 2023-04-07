<template>
    <div class="swiper-container" id="floor1Swiper" ref="swiperContainer">
        <div class="swiper-wrapper">
            <div  class="swiper-slide" v-for="item in list" :key="item.id">
                <img :src="item.imgUrl">
            </div>
        </div>
        <!-- 如果需要分页器 -->
        <div class="swiper-pagination"></div>

        <!-- 如果需要导航按钮 -->
        <div class="swiper-button-prev"></div>
        <div class="swiper-button-next"></div>
    </div>
</template>

<script type="text/javascript">
import Swiper from 'swiper';
export default {
    name:'Carousel',
    props:['list'],
    data() {
        return {
        }
    },
    //监听list的数据变化，默认执行一次
    watch:{
       list:{
            //如果不默认执行一次，不会执行这个代码，因为数据是从父亲传过来的，一直是这个数据没改变
            immediate:true,
            handler(){
                this.$nextTick(()=>{
                    new Swiper(this.$refs.swiperContainer,{
                        loop: true,  //播放到最后一张，点击按钮后，会继续播放第一张
                        speed: 50, // 滚动一张或者切换一张图片，需要的时间，单位ms，默认300ms
                        pagination: {
                            el: '.swiper-pagination', //设置小圆点
                            clickable :true,
                        },
                        // 如果需要前进后退按钮
                        navigation: {
                            nextEl: '.swiper-button-next', // 右按钮
                            prevEl: '.swiper-button-prev', // 左按钮
                        },
                        //自动播放
                        autoplay: {
                            delay: 3000,//3秒切换
                            stopOnLastSlide: false,//当切换到最后一个slide时停止自动切换
                            disableOnInteraction: false,//，用户操作swiper之后自动切换不会停止
                        },
                    })
                })
            }
        }
    }
}
</script>

<style>

</style>