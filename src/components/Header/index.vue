<template>
    <div>
        <!-- 头部 -->
        <header class="header">
            <!-- 头部的第一行 -->
            <div class="top">
                <div class="container">
                    <div class="loginList">
                        <p>尚品汇欢迎您！</p>
                        <p v-if="!name">
                            <span>请</span>
                            <router-link to="/login">登录&nbsp;|&nbsp;</router-link>
                            <router-link to="/register">免费注册</router-link>
                        </p>
                        <p v-else>
                            {{name}}&nbsp;|&nbsp;
                            <span @click="loginOut">退出登录</span>
                        </p>
                    </div>
                    <div class="typeList">
                        <router-link to="/center/myorder">我的订单</router-link>
                        <router-link to="/shopcart">我的购物车</router-link>
                        <router-link to="/home">我的尚品汇</router-link>
                        <a href="###">尚品汇会员</a>
                        <a href="###">企业采购</a>
                        <a href="###">关注尚品汇</a>
                        <a href="###">合作招商</a>
                        <a href="###">商家后台</a>
                    </div>
                </div>
            </div>
            <!--头部第二行 搜索区域-->
            <div class="bottom">
                <h1 class="logoArea">
                    <!-- target="_blank" -->
                    <router-link class="logo" title="尚品汇" to="/home" >
                        <img src="./images/logo.png" alt="">
                    </router-link>
                </h1>
                <div class="searchArea">
                    <form action="###" class="searchForm">
                        <input type="text" id="autocomplete" class="input-error input-xxlarge"  v-model="keyWord"/>
                        <button @click="searhButton" class="sui-btn btn-xlarge btn-danger" type="button">搜索</button>
                    </form>
                </div>
            </div>
        </header>
    </div>
</template>

<script type="text/javascript">
import { mapGetters } from 'vuex'
export default {
    data(){
        return{
            keyWord:'',//搜索框的值
        }
    },
    methods:{
        //点击"搜索"按钮定向到搜索页面
        searhButton(){
            let query = {}
            if(this.$route.query){
                query = this.$route.query
            }
           this.$router.push({name:'search',query,params:{keyWord:this.keyWord}})
        },
        //
        async loginOut(){
            //退出登录
            try{
                await this.$store.dispatch('loginOut')
                this.$router.push('/login')
            }catch(e){
                alert(e)
            }
        }
    },
    mounted(){
        //将搜索框赋值为空
        this.$bus.$on("cleanKeyWord",()=>{this.keyWord = ''})
    },
    computed:{
        ...mapGetters({name:'name'}),
    }
}
</script>

<style lang="less" scoped>
    .header {
        &>.top {
            background-color: #eaeaea;
            height: 30px;
            line-height: 30px;

            .container {
                width: 1200px;
                margin: 0 auto;
                overflow: hidden;

                .loginList {
                    float: left;

                    p {
                        float: left;
                        margin-right: 10px;

                        .register {
                            border-left: 1px solid #b3aeae;
                            padding: 0 5px;
                            margin-left: 5px;
                        }
                    }
                }

                .typeList {
                    float: right;

                    a {
                        padding: 0 10px;

                        &+a {
                            border-left: 1px solid #b3aeae;
                        }
                    }

                }

            }
        }

        &>.bottom {
            width: 1200px;
            margin: 0 auto;
            overflow: hidden;

            .logoArea {
                float: left;

                .logo {
                    img {
                        width: 175px;
                        margin: 25px 45px;
                    }
                }
            }

            .searchArea {
                float: right;
                margin-top: 35px;

                .searchForm {
                    overflow: hidden;

                    input {
                        box-sizing: border-box;
                        width: 490px;
                        height: 32px;
                        padding: 0px 4px;
                        border: 2px solid #ea4a36;
                        float: left;

                        &:focus {
                            outline: none;
                        }
                    }

                    button {
                        height: 32px;
                        width: 68px;
                        background-color: #ea4a36;
                        border: none;
                        color: #fff;
                        float: left;
                        cursor: pointer;

                        &:focus {
                            outline: none;
                        }
                    }
                }
            }
        }
    }
</style>