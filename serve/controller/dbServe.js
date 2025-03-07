const dbModel = require('../lib/db.js')

// //测试
// dbModel.insertUser(["123","123456","125sdfawfd6","125f6","client"]);

//新建user
exports.insertUser = async (req, res) => {
    let data = req.body;
    try {
        //
        let result = await dbModel.insertUser([data.username, data.password, data.email, data.phone, "client"]);
        res.send({
            code: 200,
            message: 'User registered successfully:' + result
        });
    } catch (error) {
        console.error('Error during user registration:', error);  // 打印错误
        res.status(500).send({
            code: 500,
            message: "Internal Server Error!!!",
            error: error.message || error,
        });
    }
};


// dbModel.insertItem(["1","resources/public/2.jpg","iphone","iphone","iphone","5000","1","able"])

//上传物品
exports.insertItem = async (req, res) => {
    let data = req.body;

    //检查req.file是否存在
    let imageUrl = req.file ? req.file.path : null;  // 如果没有文件，imageUrl 设置为 null
    if (!imageUrl) {
        return res.status(400).send({
            code: 400,
            message: 'No image uploaded.'
        });
    }

    try {
        // console.log("===================================",[data.user_id, data.title, imageUrl, data.description, data.address, data.price, data.category_id, 'able']);
        //user_id, title,picture_url,description,address,price,category_id,status
        let result = await dbModel.insertItem([data.user_id, data.title, imageUrl, data.description, data.address, data.price, data.category_id, 'able']);
        res.status(200).send({
            code: 200,
            message: 'Upload successfully!!' + result
        })
    } catch (error) {
        console.error('Error during upload:', error);  // 打印错误
        res.status(500).send({
            code: 500,
            message: "Internal Server Error!!!",
            error: error.message || error,
        })
    }
}

//登录
exports.selectUser = async (req, res) => {
    let data = req.body;
    try {
        //result:[{},{}]
        let result = await dbModel.selectUser([data.username]);
        //判断user是否存在
        console.log(result);
        if (!result || result.length === 0) {
            return res.status(404).send({
                code: 404,
                message: 'User not found!',
            });
        }
        //判断密码是否正确
        if (data.password != result[0].password) {
            return res.status(401).send({
                code: 401,
                message: 'Invalid password!'
            });
        }
        //正确
        res.send({
            code: 200,
            message: 'User login successfully:' + result,
            user:result[0]
        })
    } catch (error) {
        console.error('Error during user login:', error);  // 打印错误
        res.status(500).send({
            code: 500,
            message: "Internal Server Error!!!",
            error: error.message || error,
        });
    }
}



//给前端传递物品数据
exports.selectItems = async (req, res) => {
    let data = req.body;
    try {
        let result = await dbModel.selectItems(["able"]);

        //把图片路径由'resources\\public\\1731590768154.png' =>'resources/public/1731590768154.png'
        result.forEach(item => {
            item.picture_url=item.picture_url.replace(/\\/g, '/');
        });
        // console.log(result);
        
        res.send({
            code: 200,
            message: 'Select items successfully:' + result,
            items:result //items数据
        });
    } catch (error) {
        console.error('Error during select items:', error);  // 打印错误
        res.status(500).send({
            code: 500,
            message: "Internal Server Error!!!",
            error: error.message || error,
        });
    }
};

// dbModel.insertCategories(["其他","其他是指除电子产品，家具，服装，书籍等其他一般物品。"])
