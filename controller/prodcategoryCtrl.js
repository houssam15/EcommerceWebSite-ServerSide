const Category = require("../models/prodcategoryModel")
const asyncHandler  = require("express-async-handler")
const validateMongoDbId  = require("../utils/validateMongodbId")


const createCategory =  asyncHandler(async(req,res)=>{
    try{
        const newCategory = await Category.create(req.body);
        res.json(newCategory)
    }catch(err){
        throw new Error(err)
    }
})


const updateCategory =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const updatedCategory = await Category.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updatedCategory)
    }catch(err){
        throw new Error(err)
    }
})

const deleteCategory =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const deletedCategory = await Category.findByIdAndDelete(id);
        res.json(deletedCategory)
    }catch(err){
        throw new Error(err)
    }
})


const getCategory =  asyncHandler(async(req,res)=>{
    try{
        const {id}  = req.params
        validateMongoDbId(id)
        const category = await Category.findById(id);
        res.json(category)
    }catch(err){
        throw new Error(err)
    }
})
const getCategorys =  asyncHandler(async(req,res)=>{
    try{
        const categorys = await Category.find();
        res.json(categorys)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {createCategory,updateCategory,deleteCategory,getCategory,getCategorys}

