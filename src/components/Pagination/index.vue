<template>
    <div class="pagination">
      <!-- 为第一页时无法点击 -->
      <button :disabled="pageNo == 1" @click="$emit('updatePageNo',pageNo-1)">上一页</button>
      <button v-show="totalStartEnd.start>1"  @click="$emit('updatePageNo',1)" :class="{'active':pageNo ==1}">1</button>
      <button v-show="totalStartEnd.start>1">···</button>
      <!-- 遍历出来数据totalStartEnd -->
      <button v-show="item>=totalStartEnd.start" v-for="(item,index) in totalStartEnd.end" :key="index"  @click="$emit('updatePageNo',item)" :class="{'active':pageNo ==item}">{{item}}</button>
      <button v-show="totalStartEnd.end<totalPage-1">···</button>
      <button v-show="totalStartEnd.end<totalPage"  @click="$emit('updatePageNo',totalPage)" :class="{'active':pageNo ==totalPage}">{{totalPage}}</button>
      <button  @click="$emit('updatePageNo',pageNo+1)" :disabled="pageNo == totalPage">下一页</button>
      
      <button style="margin-left: 30px">共{{total}}条</button>
      <!-- <div>{{totalStartEnd}}</div> -->
    </div>
  </template>
  
  <script>
    export default {
      name: "Pagination",
      props:['pageNo','pageSize','total','continues'],
      mounted(){
      },
      computed:{
        //总页数=总条数/每页显示数目+1
        totalPage(){
            return Math.ceil(this.total/this.pageSize)
        },
        totalStartEnd(){
            //解构
            // (1)情况1处在最中间，数据正常情况  例子：pageNo:8
            // (2)情况2处在开头 例子：pageNo:1,2,3
            const {pageNo,pageSize,total,continues,totalPage} = this
            // console.log(pageNo)
            // console.log(Math.floor(continues/2))
            let start = 0;//起始
            let end = 0 ; //结束
            //总页数小于连续页码数
            if(totalPage<continues){
                start = 1
                end = totalPage
            }else{
                start = parseInt(pageNo - Math.floor(continues/2));
                end = parseInt(pageNo + Math.floor(continues/2));
                if(start <1){
                  start = 1,
                  end = continues
                }
                if(end>totalPage){
                  start = totalPage-continues+1,
                  end = totalPage
                }
            }
            return {start,end}
        }
      },
      methods:{
      }
    }
  </script>
  
  <style lang="less" scoped>
    .pagination {
        text-align: center;
      button {
        margin: 0 5px;
        background-color: #f4f4f5;
        color: #606266;
        outline: none;
        border-radius: 2px;
        padding: 0 4px;
        vertical-align: top;
        display: inline-block;
        font-size: 13px;
        min-width: 35.5px;
        height: 28px;
        line-height: 28px;
        cursor: pointer;
        box-sizing: border-box;
        text-align: center;
        border: 0;
  
        &[disabled] {
          color: #c0c4cc;
          cursor: not-allowed;
        }
  
        &.active {
          cursor: not-allowed;
          background-color: #409eff;
          color: #fff;
        }
      }
      .active{
        background-color: #0ba5ef;
      }
    }
  </style>
  