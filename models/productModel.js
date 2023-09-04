const mongoose = require("mongoose"); // Erase if already required
//********************trim option*********************************
// const title = "  Sample Product  ";
// const product = new Product({ title });
// await product.save();
//save in db with no space (leading-trailing) like that => "Sample Product"
var productSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: true,
      trim: true,
    },
    slug: {
      type: String,
      required: true,
      unique: true,
      lowercase: true,
    },
    description: {
      type: String,
      required: true,
    },
    price: {
      type: Number,
      required: true,
    },
    category: {
      type: String,
      required: true,
    },
    brand: {
      type: String,
      required: true,
    },
    quantity: {
      type: Number,
      required: true,
    },
    sold: {
      type: Number,
      default: 0,
    },
    images: [],
    color:[],
    tags:[],
    rating: [
      {
        star: Number,
        comment:String,
        postedby: { type: mongoose.Schema.Types.ObjectId, ref: "User" },
      },
    ],
    totalrating : {
      type:String,
      default : 0,
    }
  },
  {
    timestamps: true,
  }
);

//Export the model
module.exports = mongoose.model("Product", productSchema);
