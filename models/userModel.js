const mongoose = require('mongoose'); // Erase if already required
const bcrypt = require("bcrypt");
const crypto = require("crypto");
const { log } = require('console');
//!mdbgum
// Declare the Schema of the Mongo model
var userSchema = new mongoose.Schema({
    firstname:{
        type:String,
        required:true,
        
    },
    lastname:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobile:{
        type:String,
        required:true,
        unique:true,
    },
    password:{
        type:String,
        required:true,
    },
    role:{
        type:String,
        default:"user"
    },
    isBlocked:{
        type: Boolean,
        default:false
    },
    cart:{
        type:Array,
        default:[],
    },
    address:{
       type : String 
    },
    wishlist:[{type:mongoose.Schema.Types.ObjectId, ref: "Product"}],
    refreshToken:{
        type:String,
    },
    passwordChangeAt:Date,
    passwordResetToken:String,
    passwordResetExpires:Date,
},
{
    timestamps:true,
});

//crypte password
userSchema.pre("save", async function(next) {
    // Check if the password field is NOT modified, and if so, move to the next middleware
    if (!this.isModified("password")) {
        return next();
    }
    
    // Generate a salt for bcrypt
    const salt = bcrypt.genSaltSync(10);

    // Hash the password using the generated salt
    this.password = await bcrypt.hash(this.password, salt);
    
    // Call next to continue with the save operation
    next();
});

//password crypted return true else false
userSchema.methods.isPasswordMatched = async function (entredPassword){
    return await bcrypt.compare(entredPassword,this.password);
};
userSchema.methods.createPasswordResetToken = async function (){
    const resetToken = crypto.randomBytes(32).toString("hex");
    this.passwordResetToken = crypto.createHash('sha256').update(resetToken).digest("hex")
    this.passwordResetExpires =Date.now()+30*60*1000;//10 minutes
    return resetToken;
}

//Export the model
module.exports = mongoose.model('User', userSchema);