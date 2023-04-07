//引入mockjs模块
import Mock from 'mockjs';
//图片和json是不用暴露的(webpack)
import banner from './banner.json';
import floor from './floor.json';
Mock.mock("/mock/banner",{code:200,Issuccess:true,data:banner})
Mock.mock("/mock/floor",{code:200,Issuccess:true,data:floor})