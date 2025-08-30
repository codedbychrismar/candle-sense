import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import Chart from "../models/chartModel"; // 👈 import model

export const uploadChart = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("charts")
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("charts")
      .getPublicUrl(fileName);

    // ✅ Save metadata in MongoDB
    const chart = new Chart({
      filename: fileName,
      url: publicUrlData.publicUrl,
      patternDetected: "N/A", // can replace with real detection later
      notes: "",
    });

    await chart.save();

    res.json({
      message: "File uploaded successfully",
      filePath: data.path,
      publicUrl: publicUrlData.publicUrl,
      savedToDB: chart,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
