<template>
  <div class="spec-preview" ref="specpreview"  @mousemove="handle" >
    <img :src="skuObject.imgUrl" />
    <div class="event"></div>
    <div class="big">
      <img :src="skuObject.imgUrl"  ref="img"/>
    </div>
    <div class="mask" ref="mask"></div>
  </div>
</template>

<script>
  export default {
    name: "Zoom",
    props:['skuImageList'],
    data(){
      return {
        currentIndex:0
      }
    },
    computed:{
      skuObject(){
        return this.skuImageList[this.currentIndex] || {}
      }
    },
    mounted(){
      //获取从兄弟组件（imageList传过来的index）
      this.$bus.$on('getIndex',(index)=>{this.currentIndex = index})
    },
    methods:{
      handle(event){
        //获取元素
        let box1 = this.$refs.specpreview
        let mask = this.$refs.mask
        let img = this.$refs.img
        //正常情况下的算法
        let left = event.offsetX - mask.offsetWidth/2
        let top = event.offsetY - mask.offsetHeight/2
        //获取父级元素本身的宽度和高度
        let box1Width = box1.offsetWidth;
        let box1Height = box1.offsetHeight;
        //限制范围
        if(left<0){left = 0}
        if(left>(box1Width-mask.offsetWidth)){left = (box1Width-mask.offsetWidth)}
        if(top<0){ top = 0}
        if(top>box1Height-mask.offsetHeight){top = box1Height-mask.offsetHeight}
        //遮罩层的显示
        mask.style.left = left + "px"
        mask.style.top = top + "px"
        //放大图的显示
        img.style.left = -2 * left + "px"
        img.style.top = -2*top + "px"
      }
    }
  }
</script>

<style lang="less">
  .spec-preview {
    position: relative;
    width: 400px;
    height: 400px;
    border: 1px solid #ccc;

    img {
      width: 100%;
      height: 100%;
    }

    .event {
      width: 100%;
      height: 100%;
      position: absolute;
      top: 0;
      left: 0;
      z-index: 998;
    }

    .mask {
      width: 50%;
      height: 50%;
      background-color: rgba(0, 255, 0, 0.3);
      position: absolute;
      left: 0;
      top: 0;
      display: none;
    }

    .big {
      width: 100%;
      height: 100%;
      position: absolute;
      top: -1px;
      left: 100%;
      border: 1px solid #aaa;
      overflow: hidden;
      z-index: 998;
      display: none;
      background: white;

      img {
        width: 200%;
        max-width: 200%;
        height: 200%;
        position: absolute;
        left: 0;
        top: 0;
      }
    }

    .event:hover~.mask,
    .event:hover~.big {
      display: block;
    }
  }
</style>