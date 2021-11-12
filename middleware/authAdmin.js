const Users = require('../models/userModel')

//auth sẽ xác nhận có tồn tại user bằng việc xác nhận xử lí chuỗi token 
//Sau khi xác thực tồn tại sẽ kiểm tra ở đây nếu là admin thì được phép đăng nhập 
//next là để ở nơi gọi phương thức này sau khi xác thực thành công có thể xử lí tiếp không bị treo
const authAdmin = async (req ,res ,next ) =>{
    try {
        //Get user information by id
        const user = await Users.findOne({
            _id: req.user.id
        })

        if(user.role ==0)
              return res.status(400).json({msg: "Admin resources access denied"})

        next()
    } catch (err) {
        return res.status(500).json({msg: err.message})
    }
}

module.exports = authAdmin
