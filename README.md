# 秋实链项目前端设计初稿


## 说明
***本项目是主要是负责秋实链项目的前端在微信公众号、主流手机浏览器和微信浏览器中展现。项目需要展示的业务包括新的需求、原有秋实链、易楼项目可复用的功能。***

## 功能描述
- [x] 交易频道
- [x] 资讯频道
- [x] 榜单频道
- [x] 个人中心

## 技术栈
- [x] react
- [x] react-router-dom
- [x] react-redux
- [x] redux-saga
- [x] fetch
- [x] webpack

## 项目目录结构说明
- [x] build -- 存放编译后的静态文件
- [x] config -- webpack相关的配置
- [x] public -- 存放模板文件
- [x] script  -- node 执行脚本
- [x] src -- 项目相关的文件
  - [x] components -- 共用子组件
  - [x] containers -- 组件
  - [x] fetch -- 网络请求
  - [x] reducers -- reducers模块
  - [x] sagas -- reducers异步数据模块
  - [x] scss -- 共用样式
- [x] package.json -- 项目配置文件
- [x] README.md -- 项目说明

## Todo
- 根据设计稿设计和api定Redux数据结构……
- 根据设计稿开发UI……

## 代码规范
- 项目代码语法采用ES6+ES7标准；
- 项目代码风格规范严格遵守 [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

## 打包
为了便于部分页面可能使用在APP上和小程序上
- 按照路由层级进行代码分割打包
- 引用包打包成public chrunk

## 运行环境
node v8.4.0

## 发布
打包发布静态项目，启动脚本在根目录下执行
- 生产环境运行：npm run build 
- 预发布环境运行：npm run build:pre 
- 测试环境运行：npm run build:dev <br>

打包好的代码在build目录下


