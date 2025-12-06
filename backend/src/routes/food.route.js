import express from 'express';
import {createFood,getAllFoods,getFoodById,getMyFoods,updateFood,deleteFood} from "../controllers/food.controller.js"
import { verifyJwt } from "../middlewares/verifyJwt.middleware.js";
const foodRouter = express.Router();
foodRouter.get("/", getAllFoods);
foodRouter.post("/create", verifyJwt, createFood); 
foodRouter.get("/me/myposts", verifyJwt, getMyFoods); 
foodRouter.get("/:id", getFoodById);    
foodRouter.put("/update/:id", verifyJwt, updateFood); 
foodRouter.delete("/delete/:id", verifyJwt, deleteFood); 

export default foodRouter;