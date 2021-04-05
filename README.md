# EasyBooker 介绍

`EasyBooker`  是基于` Vue3` + `TypeScript` + `Vuex`  +  `Vue-Router` 全家桶开发的前后端分离的`多人文档专栏平台`，

项目全部采用新版 `composition API` 编写，使用`Vue3` 热门的技术栈`Ref` 和 `Reactive` 、`watch` 和 `computed` 、`生命周期`、`自定义函数 Hooks`、`Teleport` 和 `Suspense` 、`全局 API 修改` 等等。



开发思路以`组件开发`为脉络，实现一系列由易到难的`通用组件`开发，`复杂组件设计`和实现。

目前已开发完成`DropDown下拉框`、`Table 表格`、`Loading 加载中`、`Message 消息提示`、`Modal 对话框`、`Input 输入框`、`Form 表单`、`Uploading 上传` 等通用组件。



## 为什么使用Vue3 

- `Vue3.0` 更快&更小

> 体积缩小了41%、渲染速度提升 33%、内存用量下降 54%。



- `composition API`

> 更好更灵活的解决
> 逻辑重用和组合



- 完美支持 `TypeScript`

> 帮你使用下一代编程语言
> 开发中大型项目 



## 前后端结合

- `Axios`

> Swagger 在线调试异步请求
> `JSON web token` 实现权限验证，权限管理
> Axios 拦截器实现全局处理
> 前后端缓存设计与实现
> 文件上传原理和组件实现



- `Vuex-router`

> 基本用法
> 动态路由匹配
> 导航守卫
> 路由元信息



- `Vuex`

> 基本概念
> `State/Getter`
> `Mutation/Action`
> 中大型Store 的结构设计与实现



## 变更记录

**V1.0.0:**

- `Home` 

> **首页**：显示专栏信息



- `Login`

> **登录：** 用户登录页面



- `Register`

> **注册：** 用户注册页面



- `ColumnDetail`

> **专栏详情：** 显示专栏详情和专栏的文章



- `PostDetail`

> **文章详情：** 显示文章的详情，如果有权限可进行`编辑`  和 `删除`



- `CreateDetail`

> **创建文章：** 文章`创建`、`更新`页面



- `EditProfile`

> **资料编辑：**  `更新用户信息`、`更新专栏信息` 页面



# EasyBooker 官网

- 官网

> http://pand.club/easybooker/

![](http://pand.club/upload/easybookerhome.png)



- 演示用户

> `aspire@qq.com` / `asp+888`

