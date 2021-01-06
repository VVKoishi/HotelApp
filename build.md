# 民宿预定管理系统安装部署说明



## 1. 下载源码到本地

```git
git clone https://gitee.com/smallan13/team-4.git
```

## 2. 配置开发环境

### 安装Node.js

[Node.js官网下载安装](https://nodejs.org/zh-cn/)

### 安装项目所需包文件

进入项目目录，通过npm安装

```bash
cd ~team-4
npm i
```

### 配置数据库

- 安装MySQL

- 配置初始数据库数据

```bash
# 登录MySQL
mysql -u root -p

# 创建数据库
create database hotel_data;

# 导入数据
mysql -u root -p hotel_data < {path to server/hotel_data.sql}
```

### 配置后端

设置`team-4/server/db.js`

```js
// 数据库连接配置
module.exports = {
    mysql: {
        host: 'localhost',
        user: [MySQL user],
        password: [MySQL password],
        database: 'hotel_data_vue',
        port: '3306'
    }
}
```

## 3. 启动系统

在目录`team-4`下：

```bash
# 启动后端
node server/index.js

# 启动前端
npm run serve
```

前端也可以通过Vue-Cli启动

```bash
npm install -g @vue/cli

vue ui
```

进入Vue管理页面，选择任务-serve即可。