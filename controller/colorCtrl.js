const Color = require("../models/colorModel")
const asyncHandler  = require("express-async-handler")
const validateMongoDbId  = require("../utils/validateMongodbId")


const createColor =  asyncHandler(async(req,res)=>{
    try{
        const newColor = await Color.create(req.body);
        res.json(newColor)
    }catch(err){
        throw new Error(err)
    }
})


const updateColor =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const updatedColor = await Color.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updatedColor)
    }catch(err){
        throw new Error(err)
    }
})

const deleteColor =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const deletedColor = await Color.findByIdAndDelete(id);
        res.json(deletedColor)
    }catch(err){
        throw new Error(err)
    }
})


const getColor =  asyncHandler(async(req,res)=>{
    try{
        const {id}  = req.params
        validateMongoDbId(id)
        const color = await Color.findById(id);
        res.json(color)
    }catch(err){
        throw new Error(err)
    }
})
const getColors =  asyncHandler(async(req,res)=>{
    try{
        const Colors = await Color.find();
        res.json(Colors)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {createColor,updateColor,deleteColor,getColor,getColors}

