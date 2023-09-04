const express  =require("express");
const { createEnquiry, updateEnquiry,deleteEnquiry, getEnquiry,getEnquirys } = require("../controller/enqCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");
const  router = express.Router();

router.post("/",authMiddleware,isAdmin, createEnquiry)
router.put("/:id",authMiddleware,isAdmin, updateEnquiry)
router.delete("/:id",authMiddleware,isAdmin, deleteEnquiry)
router.get("/:id",getEnquiry)
router.get("/",getEnquirys)


module.exports = router     