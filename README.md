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

## Todo
- 根据设计稿设计Redux数据结构……
- 根据设计稿开发UI……

## 代码规范
项目代码规范严格遵守 [Google JavaScript Style Guide](https://google.github.io/styleguide/jsguide.html)

## 打包
为了便于部分页面可能使用在APP上和小程序上
- 按照路由组件进行代码分割打包
- 引用包打包成public chrunk

## 运行
node v8.4.0

## 发布
打包发布静态项目，启动脚本在根目录下执行
- 生产环境运行：npm run build 
- 预发布环境运行：npm run build:pre 
- 测试环境运行：npm run build:dev <br>

打包好的代码在build目录下


