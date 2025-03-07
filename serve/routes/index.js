const controller = require('../controller/dbServe')
const upload=require('../config/upload')

module.exports = (app) => {
    app.get('/', (req, res) => {
        res.send("hello world");
    })


    //POST:用户注册
    app.post('/api/register', controller.insertUser);

    //POST:用户登录
    app.post('/api/login', controller.selectUser);


    // 设置上传文件的路由
    app.post('/api/items', upload.single('image'), controller.insertItem);

    //client的物品展示
    app.get("/api/items",controller.selectItems);
}