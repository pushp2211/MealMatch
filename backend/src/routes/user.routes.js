import { Router } from "express";
import { protect } from "../middlewares/auth.middleware.js";
import { 
    changePassword,
    deleteMyAccount,
    getMyProfile, 
    getMySessions, 
    updateMyProfile, 
    updateMySettings 
} from "../controllers/index.js";
import { upload } from "../middlewares/upload.middleware.js";

const router = Router();

router.get("/me", protect, getMyProfile);
router.patch("/me/profile", protect, upload.single("avatar"), updateMyProfile);
router.patch("/me/settings", protect, updateMySettings);
router.get("/me/sessions", protect, getMySessions);

router.post("/me/change-password", protect, changePassword);
router.post("/me/delete", protect, deleteMyAccount);

export default router;
