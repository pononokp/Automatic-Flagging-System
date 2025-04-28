import { Router } from "express";
import {
    submitApplication,
    getApplications,
    reviewApplication,
} from "../controllers/index.js";

const router = Router();

// Create API endpoints for controller methods
router.post("/evaluate", submitApplication);
router.get("/getApplications", getApplications);
router.post("/review", reviewApplication);

export default router;
