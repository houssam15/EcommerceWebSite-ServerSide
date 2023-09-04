const express = require("express");
const dbConnect = require("./config/dbConnect")
const app = express();
const dotenv = require("dotenv").config();//config() load the env variables stored in .env to dotenv variable
const PORT  = process.env.PORT || 4000;
const authRouter = require("./routes/authRoute");
const productRouter = require("./routes/productRoute")
const blogRouter = require("./routes/blogRoute")
const categoryRoute = require("./routes/prodcategoryRoute")
const blogCatRoute = require("./routes/blogCatRoute")
const brandRoute = require("./routes/brandRoute")
const couponRoute = require("./routes/couponRoute")
const colorRoute = require("./routes/colorRoute")
const enqRoute = require("./routes/enqRoute")

const bodyParser = require("body-parser");
const cookieParser = require("cookie-parser");
const morgan = require("morgan")
const { notFound, errorHandler } = require("./middlewares/errorHandler");
//contain database configuration
dbConnect();

app.use(morgan('dev'))
// Parse incoming JSON requests
app.use(bodyParser.json());

// Parse incoming URL-encoded form data (usually from HTML forms)
app.use(bodyParser.urlencoded({ extended: false }));

app.use(cookieParser())

app.use("/api/user",authRouter);
app.use("/api/product",productRouter);
app.use("/api/blog",blogRouter)
app.use("/api/category",categoryRoute)
app.use("/api/blogcategory",blogCatRoute)
app.use("/api/brand",brandRoute)
app.use("/api/coupon",couponRoute)
app.use("/api/color",colorRoute)
app.use("/api/enquiry",enqRoute)





app.use(notFound);
app.use(errorHandler);


app.listen(PORT,()=> {
    console.log(`server is running at PORT ${PORT}`);
});

