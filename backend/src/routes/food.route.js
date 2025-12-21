import express from 'express';
const router = express.Router();

import {
    createFood,
    getAllFoods,
    getFoodById,
    getMyFoods,
    updateFood,
    deleteFood
} from "../controllers/index.js"

import { 
    verifyJwt 
} from "../middlewares/verifyJwt.middleware.js";

router.get("/", getAllFoods);
router.post("/create", verifyJwt, createFood); 
router.get("/me/myposts", verifyJwt, getMyFoods); 
router.get("/:id", getFoodById);    
router.put("/update/:id", verifyJwt, updateFood); 
router.delete("/delete/:id", verifyJwt, deleteFood); 

export default router;