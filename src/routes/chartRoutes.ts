import express from "express";
import { upload } from "../middleware/uploadMiddleware";
import { uploadChart } from "../controllers/chartController";

const router = express.Router();

router.post("/upload", upload.single("file"), uploadChart);

export default router;
