const { findByIdAndUpdate } = require("../models/brandModel");
const Product = require("../models/productModel");
const User = require("../models/userModel");
const asyncHandler = require("express-async-handler");
const slugify = require("slugify");
const validateMongoDbId = require("../utils/validateMongodbId");
const {cloudinaryUploadImg,cloudinaryDeleteImg} = require("../utils/cloudinary");
const fs = require("fs")
const createProduct = asyncHandler(async (req, res) => {
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }
    const newProduct = await Product.create(req.body);
    res.json(newProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const updateProduct = asyncHandler(async (req, res) => {
  const { id } = req.params;
  try {
    if (req.body.title) {
      req.body.slug = slugify(req.body.title);
    }

    const updatedProduct = await Product.findOneAndUpdate(
      { _id: id },
      req.body,
      {
        new: true,
      }
    );
    console.log(updatedProduct);

    res.json(updatedProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const deleteProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProduct = await Product.findByIdAndDelete(id);
    res.json(deletedProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getaProduct = asyncHandler(async (req, res) => {
  try {
    const { id } = req.params;
    const findProduct = await Product.findById(id);
    res.json(findProduct);
  } catch (err) {
    throw new Error(err);
  }
});

const getAllProduct = asyncHandler(async (req, res) => {
  try {
    //Filtring
    const queryObj = { ...req.query };
    const exludeFields = ["page", "sort", "limit", "fields"];
    exludeFields.forEach((el) => {
      delete queryObj[el];
    });
    let queryString = JSON.stringify(queryObj);
    queryString = queryString.replace(
      /\b(gte|gt|lte|lt)\b/g,
      (match) => `$${match}`
    );

    let query = Product.find(JSON.parse(queryString));
    //Sorting
    if (req.query.sort) {
      const sortBy = req.query.sort.split(",").join(" ");
      query = query.sort(sortBy);
    } else {
      query = query.sort("-createdAt");
    }

    //limiting the fields

    if (req.query.fields) {
      const fields = req.query.fields.split(",").join(" ");
      query = query.select(fields);
    } else {
      query = query.select("-__v");
    }

    //pagination

    const page = req.query.page;
    const limit = req.query.limit;
    const skip = (page - 1) * limit;
    query = query.skip(skip).limit(limit);
    if (req.query.page) {
      const productCount = await Product.countDocuments();
      if (skip >= productCount) {
        throw new Error("this page does not exists ");
      }
    }

    const product = await query;
    res.json(product);
  } catch (err) {
    throw new Error(err);
  }
});

const addToWishlist = asyncHandler(async (req, res) => {
  try {
    const { prodId } = req.body;
    const { _id } = req.user;
    const user = await User.findById(_id);

    const alreadyAdded = user.wishlist.find((id) => id.toString() === prodId);

    if (alreadyAdded) {
      let updatedwishlist = await User.findByIdAndUpdate(
        _id,
        {
          $pull: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(updatedwishlist);
    } else {
      let updatedwishlist = await User.findByIdAndUpdate(
        _id,
        {
          $push: { wishlist: prodId },
        },
        {
          new: true,
        }
      );
      res.json(updatedwishlist);
    }
  } catch (err) {
    throw new Error(err);
  }
});

const rating = asyncHandler(async (req, res) => {
  const { _id } = req.user;
  const { star, prodId, comment } = req.body;
  try {
    const product = await Product.findById(prodId);
    let alreadyRated = product.rating.find(
      (userId) => userId.postedby.toString() === _id.toString()
    );
    if (alreadyRated) {
      const updateRating = await Product.updateOne(
        {
          rating: { $elemMatch: alreadyRated },
        },
        {
          $set: { "rating.$.star": star, "rating.$.comment": comment },
        },
        {
          new: true,
        }
      );
    } else {
      const ratedProduct = await Product.findByIdAndUpdate(
        prodId,
        {
          $push: {
            rating: {
              star,
              postedby: _id,
            },
          },
        },
        {
          new: true,
        }
      );
    }
    const getallratings = await Product.findById(prodId);
    let totalRating = getallratings.rating.length;
    let ratingsum = getallratings.rating
      .map((item) => item.star)
      .reduce((prev, curr) => prev + curr, 0);
    let actualRating = Math.round(ratingsum / totalRating);
    let finalproduct = await Product.findByIdAndUpdate(
      prodId,
      {
        totalrating: actualRating,
      },
      {
        new: true,
      }
    );
    res.json(finalproduct);
  } catch (err) {
    throw new Error(err);
  }
});

const uploadImages = asyncHandler(async (req, res) => {
  
  try {
    const uploader = (path) => cloudinaryUploadImg(path, "images");
    const urls = [];
    const files = req.files;
    for (const file of files) {
      const { path } = file;
      const newpath = await uploader(path);
      urls.push(newpath);
      fs.unlinkSync(path)
    }

    const images = urls.map((file)=> {
      return file;
    })
    res.json(images)
    
  } catch (err) {
    throw new Error(err);
  }
});

const deleteImages = asyncHandler(async (req, res) => {
  const {id} = req.params;
  try {
    const deleted =  cloudinaryDeleteImg(id, "images");
     res.json({message:"Deleted"})
  } catch (err) {
    throw new Error(err);
  }
});

module.exports = {
  createProduct,
  getaProduct,
  getAllProduct,
  updateProduct,
  deleteProduct,
  addToWishlist,
  rating,
  uploadImages,
  deleteImages
};

