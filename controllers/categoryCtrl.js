const Category = require('../models/categoryModel')

const categoryCtrl = {
    getCategories: async(req, res) =>{
        try {
            const categories = await Category.find()
            res.json(categories)
        } catch (err) {
            return res.status(500).json({msg: err.message})
        }
    },
    CreateCategory: async(req, res) =>{
        try {
            //chỉ amdin mới có quyền thêm ,sửa ,xóa sản phẩm 
            //user có role =1 là admin
            const {name} = req.body
            const category = await Category.findOne({name})
            if(category == 1) return res.status(400).json({msg: "This category already exists"})
            
            const Newcategory = new Category({name})

            await Newcategory.save()
            res.json("Created a Category")
            
        } catch (err) {
            return req.status(500).json({msg: err.message})
        }
    },
    deleteCategory: async(req, res) => {
        try {
            //chỉ amdin mới có quyền thêm ,sửa ,xóa sản phẩm 
            //user có role =1 là admin
            await Category.findByIdAndDelete(req.params.id)

            res.json({msg: "Delete a Category"})    
        } catch (err) {
            return req.status(500).json({msg: err.message})
        }
    },
    updateCategory: async(req, res) => {
        try {
            const {name} = req.body
            await Category.findOneAndUpdate({_id: req.params.id}, {name})

            res.json({msg: "Update a Category"})    
        } catch (err) {
            return req.status(500).json({msg: err.message})
        }
    }
}

module.exports = categoryCtrl 
