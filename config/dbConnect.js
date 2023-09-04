const {default : mongoose}  = require("mongoose")//to import the default export of mongoose Module , it's neccecary in the new versions of mongoose
const dbConnect = ()=> {
    try{
        const conn = mongoose.connect(process.env.MONGODB_URL);
        console.log("Database Connected Succesfully");
    }catch(err){
        console.log("Database error")
    }
   
}


module.exports = dbConnect;