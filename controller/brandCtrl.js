const Brand = require("../models/brandModel")
const asyncHandler  = require("express-async-handler")
const validateMongoDbId  = require("../utils/validateMongodbId")


const createBrand =  asyncHandler(async(req,res)=>{
    try{
        const newBrand = await Brand.create(req.body);
        res.json(newBrand)
    }catch(err){
        throw new Error(err)
    }
})


const updateBrand =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const updatedBrand = await Brand.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updatedBrand)
    }catch(err){
        throw new Error(err)
    }
})

const deleteBrand =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const deletedBrand = await Brand.findByIdAndDelete(id);
        res.json(deletedBrand)
    }catch(err){
        throw new Error(err)
    }
})


const getBrand =  asyncHandler(async(req,res)=>{
    try{
        const {id}  = req.params
        validateMongoDbId(id)
        const brand = await Brand.findById(id);
        res.json(brand)
    }catch(err){
        throw new Error(err)
    }
})
const getBrands =  asyncHandler(async(req,res)=>{
    try{
        const Brands = await Brand.find();
        res.json(Brands)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {createBrand,updateBrand,deleteBrand,getBrand,getBrands}

