const express = require('express');
const path = require('path')
const bodyParser = require('body-parser');
const multer = require('multer')
const fs = require('fs');
const ejs = require('ejs');
const cors = require('cors');//解决跨域

const config = require('./config/default.js');
const app = express();

//获取静态路径
app.use('/resources/public',express.static(path.join(__dirname,'resources/public')));

//使用CORS 中间件来解决跨域问题
app.use(cors({
    origin: '*',  // 允许特定的前端地址（例如 Vue 或 React 前端）
    methods: ['GET', 'POST', 'DELETE', 'PUT'],  // 允许的请求方法
    allowedHeaders: ['Content-Type', 'Authorization'],  // 允许的请求头
}));

//加入html视图
// app.engine('html',ejs__express);
// app.set('view engine','html');

//解析前端数据
app.use(express.json());  // 解析 JSON 格式的请求体
app.use(bodyParser.urlencoded({ extended: true }));

//multer

//引用路由
require('./routes/index.js')(app);


//启动一个服务器
var server = app.listen(config.PORT, function () {
    var host = server.address().address;
    var port = server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})

