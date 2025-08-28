import { Router } from "express";
import { upload } from "../middleware/uploadMiddleware";
import { uploadChart } from "../controllers/chartController";

const router = Router();

// POST /api/charts/upload
router.post("/upload", upload.single("chart"), uploadChart);

export default router;
