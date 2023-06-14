<template>
  <div>
    <TypeNav />
    <div class="main">
      <div class="py-container">
        <!--bread-->
        <div class="bread">
          <ul class="fl sui-breadcrumb">
            <li>
              <a href="#">全部结果</a>
            </li>
          </ul>
          <ul class="fl sui-tag" >
            <!-- 商品分类面包屑地方 -->
            <li v-show="searchParams.categoryName" class="with-x">{{searchParams.categoryName}}<i @click="cleanSign">×</i></li>
            <!-- 关键字面包屑 -->
            <li v-show="searchParams.keyword" class="with-x">{{searchParams.keyword}}<i @click="cleankeyword">×</i></li>
            <!-- 品牌的面包屑 -->
            <li v-show="searchParams.trademark" class="with-x">{{searchParams.trademark?searchParams.trademark.split(":")[1]:undefined}}<i @click="cleantrademark">×</i></li>
            <!-- 平台售卖属性面包屑 -->
            <li v-for="(item,index) in searchParams.props" :key="index" class="with-x">{{item.split(":")[1]}}<i @click="cleanattrInfo(index)">×</i></li>
          </ul>
        </div>

        <!--selector-->
        <SearchSelector @trademark = 'trademark'  @attrInfo="attrInfo"/>

        <!--details-->
        <div class="details clearfix">
          <div class="sui-navbar">
            <div class="navbar-inner filter">
              <ul class="sui-nav">
                <li :class="{active:searchParams.order.includes('1')}" @click="clickOrder(1)">
                  <a>综合<span v-show="searchParams.order.includes('1')" class="iconfont" :class="searchParams.order.includes('asc')?'icon-UP':'icon-DOWN'"></span></a>
                </li>
                <li :class="{active:searchParams.order.includes('2')}" @click="clickOrder(2)">
                  <a>价格<span v-show="searchParams.order.includes('2')" class="iconfont" :class="searchParams.order.includes('asc')?'icon-UP':'icon-DOWN'"></span></a>
                </li>
              </ul>
            </div>
          </div>
          <div class="goods-list">
            <ul class="yui3-g">
              <li class="yui3-u-1-5" v-for="item in goodsList" :key="item.id">
                <div class="list-wrap">
                  <div class="p-img">
                    <!-- <a href="item.html" target="_blank"><img :src="item.defaultImg" /></a> -->
                    <router-link :to="{name:'detail',query:{skuId:item.id}}" >
                      <img  v-lazy="item.defaultImg" />
                    </router-link>
                  </div>
                  <div class="price">
                    <strong>
                      <em>¥&nbsp;</em>
                      <i>{{item.price}}</i>
                    </strong>
                  </div>
                  <div class="attr">
                    <a target="_blank" href="item.html" title="促销信息，下单即赠送三个月CIBN视频会员卡！【小米电视新品4A 58 火爆预约中】">{{item.title}}</a>
                  </div>
                  <div class="commit">
                    <i class="command">已有<span>2000</span>人评价</i>
                  </div>
                  <div class="operate">
                    <a href="success-cart.html" target="_blank" class="sui-btn btn-bordered btn-danger">加入购物车</a>
                    <a href="javascript:void(0);" class="sui-btn btn-bordered">收藏</a>
                  </div>
                </div>
              </li>
            </ul>
          </div>
          <!-- 分页器 -->
          <!-- 
              pageNo:当前第几页
              pageSize:代表每一页展示多少条数据
              total:代表总条数
              continues:代表分页连续页码个数
           -->
          <Pagination  @updatePageNo="updatePageNo" :pageNo="Number(searchParams.pageNo)" :pageSize="Number(searchParams.pageSize)" :total ="Number(total)" :continues="Number(5)"></Pagination>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
  import SearchSelector from './SearchSelector/SearchSelector';
  import { mapState,mapGetters } from 'vuex';
  export default {
    name: 'Search',
    data(){
      return{
        //定义search的入参
        searchParams:{
          category1Id:'',//一级分类id
          category2Id:'',//二级分类id
          category3Id:'',//三级分类id
          categoryName:'',//分类名称
          keyword:'',//关键字
          props:[],//商品属性的数组
          trademark:'',//品牌
          order:'1:desc',//排序默认是综合降序
          pageNo:1, //页码
          pageSize:3 //每一页显示条数
        }
      }
    },
    components: {
      SearchSelector
    },
    // 分析一波，因为我们是在mounted时候开始从vueX仓库获取数据，所以在mounted之前需要对数据进行入参的修改
    beforeMount(){
      //修改入参的数据
/*     (1)第一种方式 
      this.searchParams.category1Id =this.$route.query.category1Id || '';
      this.searchParams.category2Id =this.$route.query.category2Id || '';
      this.searchParams.category3Id =this.$route.query.category3Id || '';
      this.searchParams.categoryName =this.$route.query.categoryName || '';
      this.searchParams.keyword =this.$route.params.keyWord || ''; 
*/
      // Object.assign(this.searchParams,this.$route.query,this.$route.params) 第二种写法，修改入参数据（Object.assign）
      //第3中写法：剩余/扩展操作符(合并对象)
      this.searchParams.keyword = this.$route.params.keyWord;
      this.searchParams = {...this.searchParams,...this.$route.query}
    },
    mounted(){
      this.getSearchList();
      this.searchParams.category1Id = undefined;
      this.searchParams.category2Id = undefined;
      this.searchParams.category3Id = undefined;
    },
    computed:{
        ...mapState({reqSearch:store =>store.search.reqSearch}),
        ...mapGetters({attrsList:'attrsList',goodsList:'goodsList',trademarkList:'trademarkList',total:'total'})
    },
    methods:{
        //获取search页面的属性
        getSearchList(){
          this.$store.dispatch('reqSearch',this.searchParams)
        },
        //清除分类面包屑
        cleanSign(){
            //清除分类名称
            this.searchParams.categoryName = undefined;
            // this.getSearchList(); 不重新发请求的原因是你的$route改变了
            this.$router.push({name:'search',params:this.$route.params})
        },
        //清除关键字面包屑
        cleankeyword(){
           this.searchParams.keyword = undefined;
           //清除搜索框的数据（兄弟组件的通信用$bus）
           this.$bus.$emit('cleanKeyWord')
           this.$router.push({name:'search',query:this.$route.query})
        },
        //获取从子组件传递过来的trademark数据（品牌数据）
        trademark(trademark){
          // console.log(trademark)
          this.searchParams.trademark = `${trademark.tmId}:${trademark.tmName}`
          this.getSearchList();
        },
        //清除品牌的面包屑（trademark）
        cleantrademark(){
          this.searchParams.trademark = undefined;
          this.getSearchList();
        },
        //获取从子组件传递过来的平台售卖属性（props）
        attrInfo(attr,attrValue){
            let props = `${attr.attrId}:${attrValue}:${attr.attrName}`
            //数组去重(indexof查找是否存在重复)
            if(this.searchParams.props.indexOf(props) == -1){
              this.searchParams.props.push(props)
            }
            this.getSearchList();
        },
        //清除平台售卖属性面包屑
        cleanattrInfo(index){
          //清除当前下标的数组
          this.searchParams.props.splice(index,1)
          this.getSearchList();
        },
        //排序
       clickOrder(flag){
        let newValue = ''  //新的order值
        //当前没切换flag
        if(flag == this.searchParams.order.split(':')[0]){
          let oldValue = this.searchParams.order.split(':')[1]
          newValue = `${flag}:${oldValue =="desc"?'asc':'desc'}`
        }else{
          //切换flag默认降序
          newValue = `${flag}:desc`
        }
        this.searchParams.order = newValue
        this.getSearchList()
       },
       //更新pageNo
       updatePageNo(pageNo){
        this.searchParams.pageNo = pageNo
        //重新发起请求
        this.getSearchList();
       }
    }, 
    watch:{
      $route:{
        handler(){
          //数据发生变化，重新修改入参的值
          this.searchParams.keyword = this.$route.params.keyWord;
          this.searchParams = {... this.searchParams,...this.$route.query}
          //获取数据
          this.getSearchList();
          //清空可能存在的缓存的一级分类，二级分类，三级分类
          this.searchParams.category1Id = undefined;
          this.searchParams.category2Id = undefined;
          this.searchParams.category3Id = undefined;
        }
      }
    }
  }
</script>

<style lang="less" scoped>
  .main {
    margin: 10px 0;

    .py-container {
      width: 1200px;
      margin: 0 auto;

      .bread {
        margin-bottom: 5px;
        overflow: hidden;

        .sui-breadcrumb {
          padding: 3px 15px;
          margin: 0;
          font-weight: 400;
          border-radius: 3px;
          float: left;

          li {
            display: inline-block;
            line-height: 18px;

            a {
              color: #666;
              text-decoration: none;

              &:hover {
                color: #4cb9fc;
              }
            }
          }
        }

        .sui-tag {
          margin-top: -5px;
          list-style: none;
          font-size: 0;
          line-height: 0;
          padding: 5px 0 0;
          margin-bottom: 18px;
          float: left;

          .with-x {
            font-size: 12px;
            margin: 0 5px 5px 0;
            display: inline-block;
            overflow: hidden;
            color: #000;
            background: #f7f7f7;
            padding: 0 7px;
            height: 20px;
            line-height: 20px;
            border: 1px solid #dedede;
            white-space: nowrap;
            transition: color 400ms;
            cursor: pointer;

            i {
              margin-left: 10px;
              cursor: pointer;
              font: 400 14px tahoma;
              display: inline-block;
              height: 100%;
              vertical-align: middle;
            }

            &:hover {
              color: #28a3ef;
            }
          }
        }
      }

      .details {
        margin-bottom: 5px;

        .sui-navbar {
          overflow: visible;
          margin-bottom: 0;

          .filter {
            min-height: 40px;
            padding-right: 20px;
            background: #fbfbfb;
            border: 1px solid #e2e2e2;
            padding-left: 0;
            border-radius: 0;
            box-shadow: 0 1px 4px rgba(0, 0, 0, 0.065);

            .sui-nav {
              position: relative;
              left: 0;
              display: block;
              float: left;
              margin: 0 10px 0 0;

              li {
                float: left;
                line-height: 18px;

                a {
                  display: block;
                  cursor: pointer;
                  padding: 11px 15px;
                  color: #777;
                  text-decoration: none;
                }

                &.active {
                  a {
                    background: #e1251b;
                    color: #fff;
                  }
                }
              }
            }
          }
        }

        .goods-list {
          margin: 20px 0;

          ul {
            display: flex;
            flex-wrap: wrap;

            li {
              height: 100%;
              width: 20%;
              margin-top: 10px;
              line-height: 28px;

              .list-wrap {
                .p-img {
                  padding-left: 15px;
                  width: 215px;
                  height: 255px;

                  a {
                    color: #666;

                    img {
                      max-width: 100%;
                      height: auto;
                      vertical-align: middle;
                    }
                  }
                }

                .price {
                  padding-left: 15px;
                  font-size: 18px;
                  color: #c81623;

                  strong {
                    font-weight: 700;

                    i {
                      margin-left: -5px;
                    }
                  }
                }

                .attr {
                  padding-left: 15px;
                  width: 85%;
                  overflow: hidden;
                  margin-bottom: 8px;
                  min-height: 38px;
                  cursor: pointer;
                  line-height: 1.8;
                  display: -webkit-box;
                  -webkit-box-orient: vertical;
                  -webkit-line-clamp: 2;

                  a {
                    color: #333;
                    text-decoration: none;
                  }
                }

                .commit {
                  padding-left: 15px;
                  height: 22px;
                  font-size: 13px;
                  color: #a7a7a7;

                  span {
                    font-weight: 700;
                    color: #646fb0;
                  }
                }

                .operate {
                  padding: 12px 15px;

                  .sui-btn {
                    display: inline-block;
                    padding: 2px 14px;
                    box-sizing: border-box;
                    margin-bottom: 0;
                    font-size: 12px;
                    line-height: 18px;
                    text-align: center;
                    vertical-align: middle;
                    cursor: pointer;
                    border-radius: 0;
                    background-color: transparent;
                    margin-right: 15px;
                  }

                  .btn-bordered {
                    min-width: 85px;
                    background-color: transparent;
                    border: 1px solid #8c8c8c;
                    color: #8c8c8c;

                    &:hover {
                      border: 1px solid #666;
                      color: #fff !important;
                      background-color: #666;
                      text-decoration: none;
                    }
                  }

                  .btn-danger {
                    border: 1px solid #e1251b;
                    color: #e1251b;

                    &:hover {
                      border: 1px solid #e1251b;
                      background-color: #e1251b;
                      color: white !important;
                      text-decoration: none;
                    }
                  }
                }
              }
            }
          }
        }

        .page {
          width: 733px;
          height: 66px;
          overflow: hidden;
          float: right;

          .sui-pagination {
            margin: 18px 0;

            ul {
              margin-left: 0;
              margin-bottom: 0;
              vertical-align: middle;
              width: 490px;
              float: left;

              li {
                line-height: 18px;
                display: inline-block;

                a {
                  position: relative;
                  float: left;
                  line-height: 18px;
                  text-decoration: none;
                  background-color: #fff;
                  border: 1px solid #e0e9ee;
                  margin-left: -1px;
                  font-size: 14px;
                  padding: 9px 18px;
                  color: #333;
                }

                &.active {
                  a {
                    background-color: #fff;
                    color: #e1251b;
                    border-color: #fff;
                    cursor: default;
                  }
                }

                &.prev {
                  a {
                    background-color: #fafafa;
                  }
                }

                &.disabled {
                  a {
                    color: #999;
                    cursor: default;
                  }
                }

                &.dotted {
                  span {
                    margin-left: -1px;
                    position: relative;
                    float: left;
                    line-height: 18px;
                    text-decoration: none;
                    background-color: #fff;
                    font-size: 14px;
                    border: 0;
                    padding: 9px 18px;
                    color: #333;
                  }
                }

                &.next {
                  a {
                    background-color: #fafafa;
                  }
                }
              }
            }

            div {
              color: #333;
              font-size: 14px;
              float: right;
              width: 241px;
            }
          }
        }
      }
    }
  }
</style>