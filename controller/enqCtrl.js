const Enquiry = require("../models/enqModel")
const asyncHandler  = require("express-async-handler")
const validateMongoDbId  = require("../utils/validateMongodbId")


const createEnquiry =  asyncHandler(async(req,res)=>{
    try{
        const newEnquiry = await Enquiry.create(req.body);
        res.json(newEnquiry)
    }catch(err){
        throw new Error(err)
    }
})


const updateEnquiry =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const updatedEnquiry = await Enquiry.findByIdAndUpdate(id,req.body,{new:true});
        res.json(updatedEnquiry)
    }catch(err){
        throw new Error(err)
    }
})

const deleteEnquiry =  asyncHandler(async(req,res)=>{
    try{
        const {id} = req.params
        validateMongoDbId(id)
        const deletedEnquiry = await Enquiry.findByIdAndDelete(id);
        res.json(deletedEnquiry)
    }catch(err){
        throw new Error(err)
    }
})


const getEnquiry =  asyncHandler(async(req,res)=>{
    try{
        const {id}  = req.params
        validateMongoDbId(id)
        const Enquiry = await Enquiry.findById(id);
        res.json(Enquiry)
    }catch(err){
        throw new Error(err)
    }
})
const getEnquirys =  asyncHandler(async(req,res)=>{
    try{
        const Enquirys = await Enquiry.find();
        res.json(Enquirys)
    }catch(err){
        throw new Error(err)
    }
})

module.exports = {createEnquiry,updateEnquiry,deleteEnquiry,getEnquiry,getEnquirys}

