// express_cookie.js 文件
var express      = require('express')
var cookieParser = require('cookie-parser')
var util = require('util');
 
var app = express()
app.use(cookieParser())//Cookie: username=JohnDoe; theme=dark  => { username: 'JohnDoe', theme: 'dark' }
 
app.get('/', function(req, res) {
    // res.cookie('username','lijianwem',{maxAge:0.2*60*60*1000,httpOnly:true});

    //自定义cookie
    const preferences={language:'en',theme:'white',fontsize:'16px'};
    //进一步解析
    const userPreferences=req.cookies.userPreferences ? JSON.parse(req.cookies.userPreferences):{};
    if(userPreferences.theme=="white"){
        preferences.theme="dark";
    }

    res.cookie('userPreferences',JSON.stringify(preferences),{
        maxAge: 24 * 60 * 60 * 1000,  // 有效期为 1 天
        httpOnly: true,               // 禁止客户端 JavaScript 访问
        secure: true,                 // 仅在 HTTPS 传输
        sameSite: 'Lax'               // 跨站策略
    });

    res.send('Cookie has been set');
    console.log("Cookies: " + util.inspect(req.cookies,{colors:true}));
})
 
var server=app.listen(8080,()=>{
    var host=server.address().address;
    var port=server.address().port;
    console.log("应用实例，访问地址为 http://%s:%s", host, port)
})