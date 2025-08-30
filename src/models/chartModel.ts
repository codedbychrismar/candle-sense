// src/models/chartModel.ts
import mongoose, { Schema, Document } from "mongoose";

export interface IChart extends Document {
  filename: string;
  url: string;
  patternDetected?: string;
  notes?: string;
  createdAt: Date;
}

const ChartSchema: Schema = new Schema({
  filename: { type: String, required: true },
  url: { type: String, required: true },
  patternDetected: { type: String },
  notes: { type: String },
  createdAt: { type: Date, default: Date.now },
});

export default mongoose.model<IChart>("Chart", ChartSchema);
