//导入express模块，创建实例化
const bodyParser = require('body-parser');
var express=require('express');
var multer=require('multer')
var fs=require('fs');
var app=express();
var PORT=8081;

var urlencodedParser=bodyParser.urlencoded({extended:true});
app.use(urlencodedParser);//全局的请求都由bodyParser.urlencoded解析
app.use(multer({dest:'/tmp/'}).array('image'));

//简单的 GET 请求路由 //'/' 表示当客户端访问服务器的根 URL（例如 http://localhost:3000/）时，这个路由会被触发。
app.get('/',function(req,res){
    res.send('hello world');
})

//POST 请求
app.post('/',function(req,res){
    console.log("主页POST请求");
    res.send("hello GET");
})

// /del_user 页面响应
app.get('/del_user',(req,res)=>{
    console.log("/del_user 响应 GET 请求");
    res.send("删除页面")
})

//  /list_user 页面 GET 请求
app.get('/list_user', function (req, res) {
    console.log("/list_user GET 请求");
    res.send('用户列表页面');
})

// 对页面 abcd, abxcd, ab123cd, 等响应 GET 请求   //例如：http://localhost:8081/abccd
app.get('/ab*cd', function(req, res) {   
    console.log("/ab*cd GET 请求");
    res.send('正则匹配');
})

//静态文件
app.use('/resources',express.static('../resources'));


app.get('/upload.html',function(req,res){
    //__dirname：这是 Node.js 中的一个全局变量，表示当前执行文件所在的目录。
    res.sendFile(__dirname+"/"+"upload.html");
    // res.send("hello GET");

})

//GET方法 ==========================
// app.get('/process_get',function(req,res){
//     //设置为utf-8
//     res.setHeader('Content-Type', 'text/html; charset=utf-8');
//     var response={
//         "first_name":req.query.first_name,
//         "last_name":req.query.last_name
//     };
//     console.log(response);
//     //res.end() 是 Express 中 response 对象的方法之一，它用于结束请求的响应。
//     res.end(JSON.stringify(response));
// })

//POST方法 ==========================
// app.post("/process_post",urlencodedParser,function(req,res){
//     var response={
//         "first_name":req.body.first_name,
//         "last_name":req.body.last_name
//     }
//     console.log(response);
//     res.json(response);
// })

//上传文件
app.post('/file_upload', function (req, res) {
    //避免空文件
    if (!req.files || req.files.length === 0) {
        return res.status(400).send("No files were uploaded.");
    }

    // 获取上传文件信息
    var uploadedFile = req.files[0];
    console.log(uploadedFile);  // 打印文件信息

    var des_file = __dirname + "/upload/" + req.files[0].originalname;
    fs.readFile(req.files[0].path, function (err, data) {
        //readFile错误
        if (err) {
            console.log(err);
            return res.status(500).send("Error reading file.");
        }

        fs.writeFile(des_file, data, function (err) {
            if (err) {
                console.log(err);
                return res.status(500).send("Error writing file.");
            } else {
                var response = {
                    message: 'File uploaded successfully',
                    filename: req.files[0].originalname
                };
            }
            console.log(response);
            res.end(JSON.stringify(response));
        });
    });
})

//使用 Express.js 启动一个服务器
var server=app.listen(PORT,function(){
    var host =server.address().address;
    var port =server.address().port;

    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})
