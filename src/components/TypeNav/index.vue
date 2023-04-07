<template>
    <div class="type-nav">
        <!-- 事件委派 -->
       <div @mouseleave="mousecurleave">
            <div class="container" >
                <h2 class="all" @mouseenter="serachshow">全部商品分类</h2>
                <nav class="nav">
                    <a href="###">服装城</a>
                    <a href="###">美妆馆</a>
                    <a href="###">尚品汇超市</a>
                    <a href="###">全球购</a>
                    <a href="###">闪购</a>
                    <a href="###">团购</a>
                    <a href="###">有趣</a>
                    <a href="###">秒杀</a>
                </nav>
                <div class="sort" v-show="isshow" >
                    <div class="all-sort-list2" @click="toSearch($event)">
                        <div class="item bo" :class="{cur:cuurentIndex == index}" v-for="(item1,index) in reqCategoryList" :key="item1.categoryId" @mouseenter="museCurto(index)">
                            <h3 :data-categoryname = "item1.categoryName" :data-category1id ="item1.categoryId">
                                <a :data-categoryname = "item1.categoryName" :data-category1id ="item1.categoryId">{{item1.categoryName}}</a>
                            </h3>
                            <!-- 二级联动 -->
                            <div class="item-list clearfix" :style="{display:cuurentIndex ==index?'block':'none'}">
                                <div class="subitem" v-for="item2 in item1.categoryChild" :key="item2.categoryId">
                                    <dl class="fore" >
                                        <dt >
                                            <a :data-categoryname = "item2.categoryName" :data-category2id ="item2.categoryId" >{{item2.categoryName}}</a>
                                        </dt>
                                        <dd>
                                            <em v-for="item3 in (item2.categoryChild)" :key="item3.categoryId">
                                                <a :data-categoryname = "item3.categoryName" :data-category3id ="item3.categoryId">{{item3.categoryName}}</a>
                                            </em>
                                        </dd>
                                    </dl>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script type="text/javascript">
import {mapState} from 'vuex'
import 'animate.css'
import _ from 'lodash'
export default {
    data(){
        return{
            cuurentIndex:-1,
            isshow:true ,//用于控制显示与隐藏
        }
    },
    computed:{
        ...mapState({reqCategoryList:state=>state.home.reqCategoryList})
    },
    mounted(){
        if(this.$route.path !='/home'){
            this.isshow = false
        }
    },
    methods:{
        //鼠标移动
        //引入防抖：(回城)：用户频繁操作数据的话，只会执行在最后一次()
        museCurto:_.debounce(function(index){
            this.cuurentIndex = index
        },150),
        //鼠标移出【全部商品分类隐藏3级联动】
        mousecurleave(){
            this.cuurentIndex = -1
            if(this.$route.path !='/home'){
                this.isshow = false
            }
        },
        //跳转到Search页面
        toSearch(){
            //获取元素的节点
            let element = event.target;
            //获取自定义元素：categoryname(es6)
            let {categoryname} = element.dataset;
            let category1Id = element.dataset.category1id;
            let category2Id = element.dataset.category2id;
            let category3Id = element.dataset.category3id;
            //定义传参(query)：
            let location ={categoryName:categoryname};
            //定义传参(prams)
            let params = {};
            if(categoryname){
                if(category1Id){
                    location.category1Id = category1Id
                }else if(category2Id){
                    location.category2Id = category2Id
                }else{
                    location.category3Id = category3Id
                }
                if(this.$route.params){
                    params = this.$route.params;   
                }
                // console.log(params)  
                // console.log(location)
                this.$router.push({name:'search',query:location,params:params || undefined})
            }
        },
        //鼠标移入【全部商品分类展示3级联动】
        serachshow(){
            if(this.$route.path !='/home'){
                this.isshow = true
            }
        }  
    }
}
</script>

<style scoped lang="less">
    .type-nav {
        border-bottom: 2px solid #e1251b;

        .container {
            width: 1200px;
            margin: 0 auto;
            display: flex;
            position: relative;

            .all {
                width: 210px;
                height: 45px;
                background-color: #e1251b;
                line-height: 45px;
                text-align: center;
                color: #fff;
                font-size: 14px;
                font-weight: bold;
            }

            .nav {
                a {
                    height: 45px;
                    margin: 0 22px;
                    line-height: 45px;
                    font-size: 16px;
                    color: #333;
                }
            }

            .sort {
                position: absolute;
                left: 0;
                top: 45px;
                width: 210px;
                height: 461px;
                position: absolute;
                background: #fafafa;
                z-index: 999;

                .all-sort-list2 {
                    .cur{
                            background-color: skyblue;
                        }
                    .item {
                        h3 {
                            line-height: 30px;
                            font-size: 14px;
                            font-weight: 400;
                            overflow: hidden;
                            padding: 0 20px;
                            margin: 0;

                            a {
                                color: #333;
                            }
                        }

                        .item-list {
                            display: none;
                            position: absolute;
                            width: 734px;
                            min-height: 460px;
                            background: #f7f7f7;
                            left: 210px;
                            border: 1px solid #ddd;
                            top: 0;
                            z-index: 9999 !important;

                            .subitem {
                                float: left;
                                width: 650px;
                                padding: 0 4px 0 8px;

                                dl {
                                    border-top: 1px solid #eee;
                                    padding: 6px 0;
                                    overflow: hidden;
                                    zoom: 1;

                                    &.fore {
                                        border-top: 0;
                                    }

                                    dt {
                                        float: left;
                                        width: 54px;
                                        line-height: 22px;
                                        text-align: right;
                                        padding: 3px 6px 0 0;
                                        font-weight: 700;
                                    }

                                    dd {
                                        float: left;
                                        width: 415px;
                                        padding: 3px 0 0;
                                        overflow: hidden;

                                        em {
                                            float: left;
                                            height: 14px;
                                            line-height: 14px;
                                            padding: 0 8px;
                                            margin-top: 5px;
                                            border-left: 1px solid #ccc;
                                        }
                                    }
                                }
                            }
                        }

/*   
                    
                      &:hover {
                            .item-list {
                                display: block;
                            }
                        } */
                    }
                }
            }
        }
    }
</style>