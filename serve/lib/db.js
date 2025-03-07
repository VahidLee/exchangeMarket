const mysql = require('mysql');
const config = require('../config/default.js');
// const { insertUser } = require('../controller/dbServe.js');依赖循环了


// 创建没有指定数据库的连接
const db = mysql.createConnection({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
});

//链接指定数据库 
const pool = mysql.createPool({
    host: config.database.HOST,
    user: config.database.USER,
    password: config.database.PASSWORD,
    database: config.database.MARKET
}); 


//直接使用qurey
let bdbs = (sql, values) => {
    return new Promise((reslove, reject) => {
        db.query(sql, values, (err, result) => {
            if (err) {
                reject(err);
            } else {
                reslove(result);
            }
        })
    })
}


//通过pool.getConnection() 获取链接
let query=(sql,values)=>{
    return new Promise((resolve,reject)=>{
        pool.getConnection((err,connection)=>{
            if(err){
                reject(err);
            }else{
                connection.query(sql,values,(err,result)=>{
                    if(err){
                        reject(err);
                    }else{
                        resolve(result);
                    }
                    connection.release();
                })
            }
        })
    })
}

//创建数据库
let MARKET='CREATE DATABASE IF NOT EXISTS MARKET DEFAULT CHARSET utf8 COLLATE utf8_general_ci;'

const createDatabase= ()=>{
    return bdbs(MARKET,[]);
}

//创建数据表
let USERS = `CREATE TABLE IF NOT EXISTS users (
    user_id INT AUTO_INCREMENT PRIMARY KEY,
    username VARCHAR(50) UNIQUE NOT NULL,
    password VARCHAR(255) NOT NULL,        -- 加密存储密码，长度为 255 适合存储哈希后的密码
    email VARCHAR(100) UNIQUE NOT NULL,    -- 邮箱字段，设置为唯一值
    phone VARCHAR(20),
    identity ENUM('client', 'admin') DEFAULT 'client' -- 身份字段，默认值为 'client'
);`

//创建商品表
let ITEMS=`CREATE TABLE IF NOT EXISTS items (
    item_id INT AUTO_INCREMENT PRIMARY KEY,  -- 商品 ID 主键
    user_id INT,                             -- 用户 ID 外键指向 users 表
    title VARCHAR(100) NOT NULL,              -- 商品标题
    picture_url VARCHAR(255),                 -- 存储图片的 URL
    description TEXT,                         -- 商品描述
    address VARCHAR(40) NOT NULL,             -- 商品地址
    price DECIMAL(10, 2) NOT NULL,            -- 商品价格
    category_id INT,                          -- 商品分类，外键，指向 categories 表
    status ENUM('available', 'sold') DEFAULT 'available', -- 商品状态
    canview ENUM('able','disable') DEFAULT 'disable',  -- 是否上架

    created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,  -- 创建时间
    updated_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP ON UPDATE CURRENT_TIMESTAMP, -- 更新时间

    FOREIGN KEY (user_id) REFERENCES users(user_id), -- 外键约束，指向 users 表
    FOREIGN KEY (category_id) REFERENCES categories(category_id) -- 外键约束，指向 categories 表
);`


//创建订单表
let ORDERS=`CREATE TABLE IF NOT EXISTS orders (
    order_id INT AUTO_INCREMENT PRIMARY KEY,  -- 订单 ID 主键
    user_id INT,                             -- 用户 ID 外键 指向 users 表
    item_id INT,                             -- 商品 ID 外键 指向 items 表
    order_date TIMESTAMP DEFAULT CURRENT_TIMESTAMP, -- 订单日期
    status ENUM('pending', 'completed', 'canceled') DEFAULT 'pending', -- 订单状态

    FOREIGN KEY (user_id) REFERENCES users(user_id), -- 外键约束，指向 users 表
    FOREIGN KEY (item_id) REFERENCES items(item_id)  -- 外键约束，指向 items 表
);`



//创建分类表
let CATEGORIES = `CREATE TABLE IF NOT EXISTS categories (
    category_id INT AUTO_INCREMENT PRIMARY KEY,   -- 分类 ID 主键
    name VARCHAR(50) NOT NULL,                    -- 分类名称
    description TEXT                              -- 分类描述
);`

const createTable=(sql)=>{
    return query(sql,[])
}

//先创数据库，后创表
async function create(){
    await createDatabase();
    createTable(USERS);
    createTable(CATEGORIES);
    createTable(ITEMS);
    createTable(ORDERS);


    console.log("Database and table created successfully.");
}

create();

//插入users
exports.insertUser=(values)=>{
    let sql='INSERT INTO users (username, password, email, phone, identity) VALUES (?, ?, ?, ?, ?)';
    return query(sql,values);
}

exports.insertCategories=(values)=>{
    let sql='INSERT INTO CATEGORIES (name, description) VALUES (?, ?)';
    return query(sql,values);
}

exports.insertItem=(values)=>{
    let sql='INSERT INTO ITEMS (user_id, title,picture_url,description,address,price,category_id,canview) VALUES (?, ?, ?, ?, ?, ?, ?, ?)';
    return query(sql,values);
}

exports.insertOrders=(values)=>{
    let sql='INSERT INTO ORDERS (user_id, item_id, status) VALUES (?, ?, ?)';
    return query(sql,values);
}


//查找
exports.selectUser=(values)=>{
    let sql=`select * from users where username = ?`;
    return query(sql,values);
}

exports.selectItems=(values)=>{
    let sql=`select * from items where canview = ?`;
    return query(sql,values);
}