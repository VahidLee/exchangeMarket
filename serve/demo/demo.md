### 参考资料
https://www.runoob.com/nodejs/nodejs-express-framework.html

========================
app.get('/')：app.get 是 Express.js 中用于定义 HTTP GET 请求的函数。
'/' 表示当客户端访问服务器的根 URL（例如 http://localhost:3000/）时，这个路由会被触发。
req（request）：请求对象，包含了请求的详细信息，比如请求的 URL、查询参数、请求体等。
res（response）：响应对象，用于向客户端发送响应。

===============================
var server = app.listen(8081, function () {...})：这一行启动了一个服务器实例。
  app.listen(8081, function () {...})：调用 Express 的 listen 方法，在指定的端口（这里是 8081）上启动服务器。
  function () {...} 是一个回调函数，会在服务器启动成功后执行。
server.address()：server.address() 方法返回一个对象，包含服务器的地址信息，包括：  
  address：服务器绑定的 IP 地址（通常在本地会显示为 :: 或 127.0.0.1）。
  port：服务器监听的端口（这里是 8081）。

=================================
app.post('/')：app.post 是 Express 用于定义 HTTP POST 请求的函数。
'/' 表示这个路由会在客户端向服务器的根路径（例如 http://localhost:3000/）发送 POST 请求时被触发。
使用场景:
这个 POST 路由可以用于处理客户端发送的 POST 请求，通常用于数据提交或表单提交。
例如，当客户端发送一个表单时，服务器可以通过这个 POST 路由接收和处理表单数据。


==========================================
app.get('/del_user', function (req, res) {...}) 
这一段代码定义了一个路由处理程序，用于在访问 /del_user 路径时响应 GET 请求。通常，我们可能会以 DELETE 请求来表示删除操作，但在这个例子中，它使用了 GET 请求来模拟删除操作。

app.get('/del_user')：app.get 是 Express 用于定义 GET 请求的函数。
在这里，路径 '/del_user' 表示当客户端访问 http://localhost:3000/del_user 时，这个路由会被触发。



### 静态文件
app.use('/public', express.static('public')); 
这行代码使用 Express 设置一个静态文件服务器，允许客户端访问项目中的静态资源（如 HTML、CSS、JavaScript 文件、图片等）。

app.use()：Express 的 app.use 方法用于将中间件（middleware）挂载到应用程序上。
中间件是一个可以处理请求的函数，通常用于处理静态文件、设置 CORS、解析请求体等。

'/public'：这是一个虚拟路径前缀（也称为路由前缀）。
客户端请求的 URL 中，如果路径以 /public 开头，Express 将会将请求映射到项目中的 public 文件夹。
例如，http://localhost:3000/public/image.png 将会对应项目中的 public/image.png 文件。

express.static('public')：express.static 是 Express 提供的一个中间件函数，用于指定静态文件的目录。
在此例中，public 目录中的所有文件都可以通过 /public 前缀访问。


### 响应头格式    res.setHeader('Content-Type', 'text/html; charset=utf-8');
Content-Type 是 HTTP 响应头之一，它告诉客户端（如浏览器或其他 HTTP 客户端）响应体的类型。不同的 Content-Type 值用于指示不同类型的数据格式：
application/json：表示响应内容是 JSON 格式的数据。这是 API 返回数据时常见的 MIME 类型，尤其是 RESTful API 返回 JSON 数据时。
text/html：表示响应内容是 HTML 格式的数据。
text/plain：表示响应内容是纯文本格式。
application/xml：表示响应内容是 XML 格式的数据。

### res.json() && res.end(JSON.stringify(response))

#### 简洁性
res.json(response)：是一个更简洁的方式。它不仅将对象转换为 JSON 字符串，还自动处理响应头和结束响应。你只需传递一个对象，它会做所有事情。
res.end(JSON.stringify(response))：这种方式稍显繁琐。你需要手动序列化对象为 JSON 字符串，并且在有需要时手动设置 Content-Type 响应头。此外，你还需要显式调用 res.end() 来结束响应。
  响应结束：
res.json(response)：这个方法会自动结束响应，不需要你调用 res.end()。它会将对象转换为 JSON，并结束请求处理。
res.end(JSON.stringify(response))：你需要显式调用 res.end() 来结束响应。如果你没有调用 res.end()，响应将不会被发送到客户端。
  错误处理
res.json(response)：Express 内部有错误处理机制，如果你传递一个无法序列化为 JSON 的对象，它会抛出一个错误。
res.end(JSON.stringify(response))：如果你传递的对象包含无法被 JSON 序列化的内容（例如循环引用），JSON.stringify() 会抛出一个 错误。
  ### 总结
简洁性：res.json(response) 更简洁，自动设置响应头和结束响应。
功能：res.json(response) 更智能，自动处理很多细节。
手动控制：res.end(JSON.stringify(response)) 提供更多控制（例如手动设置响应头），但需要更多代码。

### bodyParser实例
var urlencodedParser = bodyParser.urlencoded({ extended: false });
  参数：
extended: false：表示使用 querystring 库来解析 URL 编码的数据。它只能处理简单的键值对数据。
extended: true：表示使用 qs 库解析 URL 编码的数据。这个配置允许解析更复杂的对象，比如嵌套的对象和数组。

用于创建一个中间件，用于解析 application/x-www-form-urlencoded 编码的请求体数据：
key=value&key2=value2  => {key:req.body.value , key2:req.body.value2}

### multer的配置:  app.use(multer({ dest: '/tmp/' }).array('image'))
1、配置 multer 中间件，用于处理 multipart/form-data 编码的表单数据，通常用于文件上传。
2、dest: '/tmp/' 指定文件的临时存储位置，上传的文件会暂时存储在服务器的 /tmp/ 目录中。稍后可以移动、处理或删除这些文件。
3、array('image')：处理名为 image 的多个文件上传，将文件信息存储在 req.files 数组中。使用时，需要前端表单的 <input type="file" name="image" multiple> 匹配这个 name 值。

### var urlencodedParser=bodyParser.urlencoded({extended:true})；与app.use(bodyParser.urlencoded({ extended: true }));
区别：
var urlencodedParser=bodyParser.urlencoded({extended:true})这里 urlencodedParser 是一个特定的中间件函数，可以在特定路由中使用。
app.use() 会将 body-parser 中间件应用到应用的每一个路由上，所有的请求都会经过 bodyParser.urlencoded 解析。


### Promise()
在这段代码中，Promise 用于将异步的数据库查询操作转换为一个可以在代码中顺序处理的流程。通过使用 Promise，你可以在 db.query 完成后，使用 resolve 和 reject 来分别处理查询成功和失败的情况。以下是对代码中 Promise 使用的解释.
1\数据库查询是一个异步操作，意味着代码不会等待 db.query 完成后再执行后续代码。
2\通过使用 Promise，你可以让查询操作变得“可等待”，这样后续代码可以在查询成功或失败后执行特定逻辑。

let bdbs = (sql, values) => {
    return new Promise((resolve, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);     // 查询失败时调用 reject，传递错误信息
            } else {
                resolve(result); // 查询成功时调用 resolve，传递结果
            }
        });
    });
};

resolve(result)：当查询成功时，将查询结果 result 作为参数传给 resolve，意味着此 Promise 完成并返回数据。
reject(err)：如果查询失败，将错误 err 作为参数传给 reject，表明操作出错，便于捕获错误。

bdbs('SELECT * FROM users WHERE id = ?', [1])
    .then(result => {
        console.log('Query Result:', result); // 查询成功，处理数据
    })
    .catch(error => {
        console.error('Query Error:', error); // 查询失败，处理错误
    });
