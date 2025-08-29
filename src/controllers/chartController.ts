import { Request, Response } from "express";
import { supabase } from "../config/supabase";

export const uploadChart = async (req: Request, res: Response) => {
  try {
    if (!req.file) {
      return res.status(400).json({ error: "No file uploaded" });
    }

    const file = req.file;
    const fileName = `${Date.now()}-${file.originalname}`;

    const { data, error } = await supabase.storage
      .from("charts") // 👈 your bucket name
      .upload(fileName, file.buffer, {
        contentType: file.mimetype,
        upsert: false,
      });

    if (error) throw error;

    // Get public URL
    const { data: publicUrlData } = supabase.storage
      .from("charts")
      .getPublicUrl(fileName);

    res.json({
      message: "File uploaded successfully",
      filePath: data.path,
      publicUrl: publicUrlData.publicUrl,
    });
  } catch (err: any) {
    res.status(500).json({ error: err.message });
  }
};
