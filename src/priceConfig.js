export const priceConfig = {
  sizes: {
    A4: 1,
    B5: 0.85,
    A5: 0.6,
    A6: 0.35,
  },
  innerPapers: {
    "道林紙70g": 1,
    "道林紙100g": 1.2,
    "銅版/雪銅紙100g": 1.5,
    "銅版/雪銅紙150g": 1.8,
  },
  colors: {
    黑白: 0.8,
    彩色: 6,
  },
  coverPapers: {
    "銅版紙180g": 20,
    "銅版紙200g": 25,
    "單銅紙180g": 22,
    "單銅紙200g": 27,
    "雪銅紙180g": 25,
    "雪銅紙200g": 30,
    "特殊美術紙180g": 45,
    "特殊美術紙200g": 55,
  },
  coverFinishes: {
    上亮膜: { base: 0, perCopy: 10 },
    上霧膜: { base: 0, perCopy: 15 },
    局部上光: { base: 1500, perCopy: 5 },
    燙金: { base: 2000, perCopy: 8 },
    壓紋: { base: 2500, perCopy: 8 },
  },
  bindings: {
    騎馬釘: 8,
    膠裝: 25,
    平裝: 30,
    線裝: 45,
    精裝: 120,
  },
  paperColors: {
    白色: 0,
    米色: 0.05,
  },
};

export const defaultQuoteInput = {
  size: "A4",
  innerPaper: "道林紙70g",
  coverPaper: "銅版紙180g",
  pageCount: 64,
  quantity: 100,
  innerColor: "黑白",
  coverFinishes: [],
  paperColor: "白色",
  binding: "膠裝",
};
