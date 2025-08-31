import { Request, Response } from "express";
import { supabase } from "../config/supabase";
import Chart from "../models/chartModel";
import { detectPattern } from "../services/patternService"; // 👈 import service

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

    const { data: publicUrlData } = supabase.storage
      .from("charts")
      .getPublicUrl(fileName);

    // 👇 For now, fake a candle OHLC
    const candle = { open: 100, high: 110, low: 95, close: 105 };
    const pattern = detectPattern(candle);

    // ✅ Save in DB
    const chart = new Chart({
      filename: fileName,
      url: publicUrlData.publicUrl,
      patternDetected: pattern,
      notes: "",
    });

    await chart.save();

    res.json({
      message: "File uploaded successfully",
      filePath: data.path,
      publicUrl: publicUrlData.publicUrl,
      patternDetected: pattern,
      savedToDB: chart,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
