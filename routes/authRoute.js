const express = require("express");
const router = express.Router();
const {
  createUser,
  loginUserCtrl,
  getAllUser,
  getUser,
  deleteUser,
  updateUser,
  blockUser,
  unblockUser,
  handleRefreshToken,
  logout,
  updatePassword,
  forgotPasswordToken,
  resetPassword,
  loginAdmin,
  getWishlist,
  saveAddress,
  userCart,
  getUserCart,
  emptyCart,
  applyCoupon,
  createOrder,
  getOrders,
  updateOrderStatus
} = require("../controller/userCtrl");
const { authMiddleware, isAdmin } = require("../middlewares/authMiddleware");

router.post("/register", createUser);
router.post("/forgot-password-token", forgotPasswordToken);
router.post("/login", loginUserCtrl);
router.post("/login-admin", loginAdmin);
router.post("/cart", authMiddleware,userCart);
router.post("/cart/applycoupon",authMiddleware,applyCoupon )
router.post("/cart/cash-order",authMiddleware,createOrder)

router.get("/all-users", getAllUser);
router.get("/get-user", authMiddleware, isAdmin, getUser);
router.get("/wishlist", authMiddleware, getWishlist);
router.get("/cart",authMiddleware,getUserCart)
router.get("/refresh", handleRefreshToken);
router.get("/logout", logout);
router.get("/get-orders",authMiddleware,getOrders)

router.put("/password", authMiddleware, updatePassword);
router.put("/reset-password/:token",resetPassword)
router.put("/edit-user", authMiddleware, isAdmin, updateUser);
router.put("/save-address", authMiddleware, saveAddress);
router.put("/block-user/:id", authMiddleware, isAdmin, blockUser);
router.put("/unblock-user/:id", authMiddleware, isAdmin, unblockUser);
router.put("/order/update-order/:id",authMiddleware,isAdmin,updateOrderStatus)

router.delete("/empty-cart",authMiddleware,emptyCart )
router.delete("/:id", deleteUser);

module.exports = router;
