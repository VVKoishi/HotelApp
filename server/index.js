// node 后端服务器

const userApi = require('./api/userApi');
const hotelApi = require('./api/hotelApi');
const roomApi = require('./api/roomApi');
const orderApi = require('./api/orderApi');
const fs = require('fs');
const path = require('path');
const bodyParser = require('body-parser');
const express = require('express');
const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: false}));

//dist
app.use(express.static('../dist'));
app.use('/', express.static('../dist/index.html'));

// 后端api路由
app.use('/api/user', userApi);
app.use('/api/hotel', hotelApi);
app.use('/api/room', roomApi);
app.use('/api/order', orderApi);

// 监听端口
app.listen(3000);
console.log('success listen at port:3000......');