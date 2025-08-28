import { Request, Response } from "express";

export const uploadChart = (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ message: "No file uploaded" });
    }

    return res.status(200).json({
      message: "Chart uploaded successfully",
      file: req.file,
    });
  } catch (error) {
    return res.status(500).json({ message: "Error uploading chart", error });
  }
};
