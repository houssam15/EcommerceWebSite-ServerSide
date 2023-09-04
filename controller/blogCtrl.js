const Blog = require("../models/blogModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const validateMongoDbId = require("../utils/validateMongodbId");
const cloudinaryUploadImg = require('../utils/cloudinary')
const fs = require("fs")


const createBlog = asyncHandler(async (req, res) => {
  try {
    const newBlog = await Blog.create(req.body);
    res.json(newBlog);
  } catch (err) {
    throw new Error(err);
  }
});


const updateBlog = asyncHandler(async (req, res) => {
    try {
    const {id} = req.params;
    validateMongoDbId(id)

      const blog = await Blog.findByIdAndUpdate(id,req.body,{new:true})
      res.json(blog);
    } catch (err) {
      throw new Error(err);
    }
  });

  const getBlog = asyncHandler(async (req, res) => {
    try {
    const {id} = req.params;
    validateMongoDbId(id)
      const getBlog = await Blog.findById(id).populate("likes").populate("dislikes");
      await Blog.findByIdAndUpdate(id,{
        $inc:{numViews:1}
      },
      {
        new : true
      })
      res.json(getBlog);
    } catch (err) {
      throw new Error(err);
    }
  });

  const getAllBlogs = asyncHandler(async (req, res) => {
    try {
      const getBlogs = await Blog.find()
      
      res.json(getBlogs);
    } catch (err) {
      throw new Error(err);
    }
  });

  const deleteBlog = asyncHandler(async (req, res) => {
    try {
      const {id} = req.params;
validateMongoDbId(id)
      const deleted = await Blog.findByIdAndDelete(id)
      
      res.json(deleted);
    } catch (err) {
      throw new Error(err);
    }
  });

const likeBlog =  asyncHandler(async (req,res)=>{
  try{
    const {blogId} = req.body
    validateMongoDbId(blogId)
    const blog = await Blog.findById(blogId)
    //find the login user
    const loginUser = req?.user?._id
    //find if the user has liked the blog
    const isliked = blog?.isLiked;
    //find if the user has disliked the blog 
    const alreadyDisliked = blog?.dislikes?.find(userId => userId?.toString()  ===  loginUser?.toString());

    if(alreadyDisliked){
      const blog  =  await Blog.findByIdAndUpdate(blogId,{
        $pull : {dislikes : loginUser},
        isDisliked : false
      },
      {new : true})
      res.json(blog)
    }
    if(isliked){
      const blog = await Blog.findByIdAndUpdate(blogId,{
        $pull : {likes:loginUser},
        isLiked : false
      },
      {new : true})
      res.json(blog)

    }else{
      const blog = await Blog.findByIdAndUpdate(blogId,{
        $push : {likes:loginUser},
        isLiked : true
      },
      {new : true})
      res.json(blog)

    }

  }catch(err){
    throw new Error(err)
  }
})


const dislikeBlog =  asyncHandler(async (req,res)=>{
  try{
    const {blogId} = req.body
    validateMongoDbId(blogId)
    const blog = await Blog.findById(blogId)
    //find the login user
    const loginUser = req?.user?._id
    //find if the user has disliked the blog
    const isdisliked = blog?.isDisliked;
    //find if the user has like the blog 
    const alreadyliked = blog?.likes?.find(userId => userId?.toString()  ===  loginUser?.toString());

    if(alreadyliked){
      const blog  =  await Blog.findByIdAndUpdate(blogId,
      {
        $pull : {likes : loginUser},
        isLiked : false
      },
      {new : true}
      )
      res.json(blog)
    }
    if(isdisliked){
      const blog = await Blog.findByIdAndUpdate(blogId,{
        $pull : {dislikes:loginUser},
        isDisliked : false
      },
      {new : true})
      res.json(blog)

    }else{
      const blog = await Blog.findByIdAndUpdate(blogId,{
        $push : {dislikes:loginUser},
        isDisliked : true
      },
      {new : true})
      res.json(blog)

    }

  }catch(err){
    throw new Error(err)
  }
})

const uploadImages = asyncHandler(async (req, res) => {
  const { id } = req.params;
  validateMongoDbId(id);
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path);//to delete files 
    }

    const findBlog = await Blog.findByIdAndUpdate(
      id,
      {
        images: urls.map((file) => {
          return file;
        }),
      },
      {
        new: true,
      }
    );
    res.json(findBlog);

  } catch (err) {
    throw new Error(err);
  }
});
module.exports = { createBlog,updateBlog ,getBlog, getAllBlogs,deleteBlog,likeBlog ,dislikeBlog,uploadImages};
