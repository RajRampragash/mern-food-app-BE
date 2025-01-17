import Food from "../models/Food.js";
import { createError } from "../error.js";
import mongoose from "mongoose";

export const addProducts = async (req, res, next) => {
  try {
    const foodData = req.body;

    // Validate the incoming request
    if (!Array.isArray(foodData)) {
      return next(createError(400, "Invalid request. Expected an array of foods."));
    }

    const createFoods = [];
    for (const foodInfo of foodData) {
      const { name, desc, img, price, ingredient, category } = foodInfo;

      // Validate required fields for each food item
      if (!name || !desc || !Array.isArray(ingredient)) {
        return next(createError(400, "Missing required fields in food item."));
      }

      // Create a new food document
      const product = new Food({
        name,
        desc,
        img,
        price,
        ingredient,
        category,
      });

      // Save the food item to the database
      const savedFood = await product.save();
      createFoods.push(savedFood);
    }

    // Send success response
    return res
      .status(201)
      .json({ message: "Products added successfully", createdFoods: createFoods });
  } catch (error) {
    next(error);
  }
};
 
export const getFoodItems =  async (req,res,next)=>{
  try {
    let {categories,minPrice,maxPrice,ingredients,search}=req.query
    ingredients = ingredients?.split(",")
    categories = categories?.split(",")

    const filter ={}
    if(categories && Array.isArray(categories) ){
      filter.category = {$in:categories}
    }
    if(ingredients && Array.isArray(ingredients) ){
      filter.ingredients = {$in:ingredients}
    }
    if(maxPrice||minPrice){
      filter["price.org"]={};
      if(minPrice){
        filter["price.org"]["$gte"]=minPrice
      }
    }if(maxPrice){
      filter["price.org"]["$lte"]=maxPrice
    }
    if(search){
      filter.$or=[
        {title:{$regex:new RegExp(search,"i")}},
        {desc:{$regex:new RegExp(search,"i")}},
      ]
    }
    const foodList = await Food.find(filter)
    return res.status(200).json(foodList)


    
  } catch (error) {
    next(error);
    
  }
}
export const getFoodById = async (req, res, next) => {
  try {
    const { id } = req.params; // Corrected 'params'
    if (!mongoose.isValidObjectId(id)) {
      return next(createError(400, "Invalid product ID"));
    }
    const food = await Food.findById(id);
    if (!food) {
      return next(createError(404, "food not found"));
    }
    return res.status(200).json(food);
  } catch (error) {
    next(error);
  }
};


