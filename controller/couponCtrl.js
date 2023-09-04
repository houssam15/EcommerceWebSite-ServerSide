const Coupon = require("../models/couponModel");
const validateMongoDbId = require("../utils/validateMongodbId")
const asyncHandler = require("express-async-handler")

const createCoupon = asyncHandler(async (req,res)=>{
    try{
        const newCoupon = await Coupon.create(req.body)
        res.json(newCoupon)
    }catch(err){

    }
})


const getAllCoupons = asyncHandler(async (req,res)=>{
    try{
        const coupons = await Coupon.find();
        res.json(coupons);
    }catch(err){
        throw new Error(err)
    }
})

const updateCoupon = asyncHandler(async (req,res)=>{
    
        const {id} = req.params;
        validateMongoDbId(id)
        try{
        const updatecoupon = await Coupon.findByIdAndUpdate(id,req.body,{new:true})
        res.json(updatecoupon);
    }catch(err){
        throw new Error(err)
    }
})

const deleteCoupon  = asyncHandler(async (req,res)=>{
    
    const {id} = req.params;
    validateMongoDbId(id)
    try{
    const deletecoupon = await Coupon.findByIdAndDelete(id);
    res.json(deletecoupon);
}catch(err){
    throw new Error(err)
}
})
module.exports = {createCoupon,getAllCoupons,updateCoupon,deleteCoupon}