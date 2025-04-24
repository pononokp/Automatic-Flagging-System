import { Router } from "express";
import {
    submitApplication,
    getApplication,
    reviewApplication,
} from "../controllers/index.js";

const router = Router();

router.post("/submit", submitApplication);
router.get("/get", getApplication);
router.post("/review", reviewApplication);

export default router;
