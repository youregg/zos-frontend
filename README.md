# zos-frontend
> A Vue.js project

## 项目描述

该系统基于主机上收取的目录等数据，分析并记录目录及别名信息，并在WEB界面中做相应展示，具体功能描述如下：
1. 展示主目录
2. 展示用户目录
3. 展示别名
4. 查找功能
5. 报表功能


## 环境搭建
 
### 在第一个terminal中输入以下指令：

    # install dependencies
    npm install
    
    # serve with hot reload at localhost:8080
    npm run dev

### 打开另一个terminal输入：

    node server.js

第二个terminal保证了我们从服务端获取作业输出内容。

项目设置运行后自动打开默认浏览器


## 技术实现

### 实现http请求，跨域处理

    `vue.jx+node server.js+axios`

前端整体框架使用了vue.js,不同的展示内容放在不同的组件中。在axios中设置了代理跨域信息，包括目标服务器以及是否可以进行跨域。

处理跨域问题我们同时还用到了node.js，采用了中间层转发的方式，获取返回的作业内容。

### 实现数据存储

    `vuex+store.js`

在项目中报表功能中用到了其他组件获取的数据，因此我们使用了vuex存放某个组件中获得的数据信息，在其他组件中可以直接调用。

## 界面展示 
 见PDF附件


