// src/services/patternService.ts

export interface Candle {
  open: number;
  high: number;
  low: number;
  close: number;
}

// This function decides if a candle is bullish or bearish
export function detectPattern(candle: Candle): string {
  if (candle.close > candle.open) {
    return "Bullish Candle";
  } else if (candle.close < candle.open) {
    return "Bearish Candle";
  } else {
    return "Doji (Indecision)";
  }
}
