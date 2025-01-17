import express from "express"
import {UserRegister,UserLogin, addToCart, getAllCartItems, removeCart, addToFavorites, getUserFavorites, removeFromFavorites, placeOrder, getAllOrders} from "../controllers/User.js"
import { verfiyToken } from "../middleware/verifyUser.js";



const router = express.Router();
//login
router.post("/signup", UserRegister);
router.post("/signin", UserLogin);

//cart
router.post("/cart",verfiyToken,addToCart)
router.get("/cart",verfiyToken,getAllCartItems)
router.patch("/cart",verfiyToken,removeCart)

//fav
router.post("/favorite",verfiyToken,addToFavorites)
router.get("/favorite",verfiyToken,getUserFavorites)
router.patch("/favorite",verfiyToken,removeFromFavorites)

//order
router.post("/order",verfiyToken,placeOrder)
router.get("/order",verfiyToken,getAllOrders)




export default router