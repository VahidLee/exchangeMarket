const multer=require('multer')
const path=require('path')

// 设置存储配置和文件类型过滤
const storage = multer.diskStorage({
    destination: (req, file, cb) => {
        cb(null, 'resources/public/');//保存路径
    },
    filename: (req, file, cb) => {
        cb(null, Date.now() + path.extname(file.originalname)); // 使用时间戳+扩展文件名 作为 文件名,避免同名冲突
    }
});
// 过滤文件类型（仅允许图片上传）
const fileFilter = (req, file, cb) => {
    const filetypes = /jpeg|jpg|png|gif/;
    const extname = filetypes.test(path.extname(file.originalname).toLowerCase());
    const mimetype = filetypes.test(file.mimetype);

    if (extname && mimetype) {
        return cb(null, true);
    } else {
        cb('Error: File type not allowed!');
    }
};
const upload = multer({ storage: storage, fileFilter: fileFilter });

module.exports = upload;