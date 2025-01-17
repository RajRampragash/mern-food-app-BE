import express from "express";
import { addProducts, getFoodById, getFoodItems } from "../controllers/Food.js"; // Ensure the correct path and .js extension if using ES Modules.

const router = express.Router();

// Route to add new food products
router.post("/add", addProducts);
router.get("/", getFoodItems);
router.get("/:id", getFoodById);

export default router;
