/* ================================================================== */
/*  FEED INGREDIENT DATABASE — Egyptian market                         */
/*  Adapted from /home/z/my-project/src/lib/feed-data.ts for RN.       */
/*  Lucide icons replaced with emoji/strings.                          */
/* ================================================================== */

export type IngredientKey =
  | "corn"
  | "soybean"
  | "bran"
  | "hay"
  | "straw"
  | "premix";

export type IngredientCategory = "energy" | "protein" | "fiber" | "additive";

export interface Ingredient {
  key: IngredientKey;
  name: string;
  nameEn: string;
  short: string;
  shortEn: string;
  category: IngredientCategory;
  categoryLabel: string;
  defaultPrice: number; // EGP / kg (as-fed)
  protein: number; // crude protein %
  tdn: number; // total digestible nutrients % (energy proxy)
  fiber: number; // crude fiber %
  color: string; // hex
  emoji: string;
}

export const INGREDIENTS: Record<IngredientKey, Ingredient> = {
  corn: {
    key: "corn",
    name: "الذرة الصفراء",
    nameEn: "Yellow corn",
    short: "ذرة",
    shortEn: "Corn",
    category: "energy",
    categoryLabel: "طاقة",
    defaultPrice: 12,
    protein: 8.5,
    tdn: 88,
    fiber: 2.5,
    color: "#d9b54a",
    emoji: "🌽",
  },
  soybean: {
    key: "soybean",
    name: "كسب فول الصويا",
    nameEn: "Soybean meal",
    short: "صويا",
    shortEn: "Soybean",
    category: "protein",
    categoryLabel: "بروتين",
    defaultPrice: 28,
    protein: 44,
    tdn: 77,
    fiber: 7,
    color: "#5a9a52",
    emoji: "🫘",
  },
  bran: {
    key: "bran",
    name: "الردة (نخالة القمح)",
    nameEn: "Wheat bran",
    short: "ردة",
    shortEn: "Bran",
    category: "energy",
    categoryLabel: "طاقة/ألياف",
    defaultPrice: 8,
    protein: 15,
    tdn: 70,
    fiber: 10,
    color: "#c79a4a",
    emoji: "🌾",
  },
  hay: {
    key: "hay",
    name: "الدريس (برسيم جاف)",
    nameEn: "Hay (dried clover)",
    short: "دريس",
    shortEn: "Hay",
    category: "fiber",
    categoryLabel: "ألياف خشنة",
    defaultPrice: 9,
    protein: 12,
    tdn: 55,
    fiber: 28,
    color: "#4d9a4a",
    emoji: "🌿",
  },
  straw: {
    key: "straw",
    name: "التبن (قش القمح)",
    nameEn: "Wheat straw",
    short: "تبن",
    shortEn: "Straw",
    category: "fiber",
    categoryLabel: "ألياف خشنة",
    defaultPrice: 4,
    protein: 3,
    tdn: 40,
    fiber: 40,
    color: "#d2b96a",
    emoji: "🎋",
  },
  premix: {
    key: "premix",
    name: "الإضافات (فيتامينات + أملاح + مضادات سموم)",
    nameEn: "Additives (vitamins + minerals + toxin binders)",
    short: "إضافات",
    shortEn: "Additives",
    category: "additive",
    categoryLabel: "إضافات",
    defaultPrice: 45,
    protein: 0,
    tdn: 0,
    fiber: 0,
    color: "#4a73b5",
    emoji: "💊",
  },
};

export const INGREDIENT_ORDER: IngredientKey[] = [
  "corn",
  "soybean",
  "bran",
  "hay",
  "straw",
  "premix",
];

export const CATEGORY_COLORS: Record<IngredientCategory, string> = {
  energy: "#d9b54a",
  protein: "#5a9a52",
  fiber: "#4d9a4a",
  additive: "#4a73b5",
};

/* ================================================================== */
/*  ANIMAL PROFILES + NUTRITIONAL REQUIREMENTS                         */
/* ================================================================== */

export type AnimalKey =
  | "dairy_cow"
  | "dairy_buffalo"
  | "buffalo"
  | "calf"
  | "sheep"
  | "layer"
  | "layer_breeder"
  | "broiler"
  | "broiler_starter";

export interface AnimalProfile {
  key: AnimalKey;
  name: string;
  nameEn: string;
  emoji: string;
  species: "ruminant" | "poultry";
  defaultWeight: number;
  weightMin: number;
  weightMax: number;
  weightStep: number;
  weightUnit: string;
  weightUnitEn: string;
  hasProductionInput: boolean;
  productionLabel: string;
  productionLabelEn: string;
  productionUnit: string;
  productionUnitEn: string;
  productionDefault: number;
  productionMin: number;
  productionMax: number;
  productionStep: number;
  hasFlockInput: boolean;
  defaultFlockSize: number;
  flockMin: number;
  flockMax: number;
  flockStep: number;
  flockUnit: string;
  flockUnitEn: string;
  flockLabel: string;
  flockLabelEn: string;
  description: string;
  descriptionEn: string;
  dmi: (weight: number, production: number) => number;
  targets: {
    cpMin: number;
    tdnMin: number;
    fiberMax: number;
  };
  bounds: Record<IngredientKey, { lb: number; ub: number }>;
  forageMin: number;
}

export const ANIMALS: Record<AnimalKey, AnimalProfile> = {
  dairy_cow: {
    key: "dairy_cow",
    name: "بقرة حلوب",
    nameEn: "Dairy cow",
    emoji: "🐄",
    species: "ruminant",
    defaultWeight: 500,
    weightMin: 300,
    weightMax: 700,
    weightStep: 10,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: true,
    productionLabel: "إنتاج اللبن اليومي",
    productionLabelEn: "Daily milk production",
    productionUnit: "لتر/يوم",
    productionUnitEn: "L/day",
    productionDefault: 20,
    productionMin: 0,
    productionMax: 45,
    productionStep: 1,
    hasFlockInput: true,
    defaultFlockSize: 10,
    flockMin: 1,
    flockMax: 5000,
    flockStep: 1,
    flockUnit: "رأس",
    flockUnitEn: "head",
    flockLabel: "عدد رؤوس القطيع",
    flockLabelEn: "Herd size",
    dmi: (w, p) => +(0.025 * w + 0.35 * p).toFixed(2),
    targets: { cpMin: 14, tdnMin: 63, fiberMax: 26 },
    bounds: {
      corn: { lb: 15, ub: 50 },
      soybean: { lb: 0, ub: 28 },
      bran: { lb: 0, ub: 22 },
      hay: { lb: 0, ub: 45 },
      straw: { lb: 0, ub: 18 },
      premix: { lb: 2, ub: 5 },
    },
    forageMin: 40,
    description:
      "بقرة حلوب وزن ٥٠٠ كجم تنتج حوالي ٢٠ لتر لبن يومياً. تحتاج عاليقة عالية الطاقة والبروتين مع نسبة ألياف كافية للحاظنة.",
    descriptionEn:
      "A 500 kg dairy cow producing about 20 L of milk per day. Needs a high-energy, high-protein ration with adequate fiber for the rumen.",
  },
  buffalo: {
    key: "buffalo",
    name: "جاموس تسمين",
    nameEn: "Fattening buffalo",
    emoji: "🐃",
    species: "ruminant",
    defaultWeight: 400,
    weightMin: 250,
    weightMax: 600,
    weightStep: 10,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 10,
    flockMin: 1,
    flockMax: 5000,
    flockStep: 1,
    flockUnit: "رأس",
    flockUnitEn: "head",
    flockLabel: "عدد رؤوس القطيع",
    flockLabelEn: "Herd size",
    dmi: (w) => +(0.028 * w).toFixed(2),
    targets: { cpMin: 12, tdnMin: 66, fiberMax: 22 },
    bounds: {
      corn: { lb: 20, ub: 55 },
      soybean: { lb: 0, ub: 22 },
      bran: { lb: 0, ub: 25 },
      hay: { lb: 0, ub: 40 },
      straw: { lb: 0, ub: 20 },
      premix: { lb: 2, ub: 5 },
    },
    forageMin: 30,
    description:
      "جاموس تسمين وزن ٤٠٠ كجم بمعدل نمو حوالي ١ كجم/يوم. يحتاج عاليقة عالية الطاقة لدعم النمو.",
    descriptionEn:
      "A 400 kg fattening buffalo with about 1 kg/day growth. Needs a high-energy ration to support growth.",
  },
  sheep: {
    key: "sheep",
    name: "خروف تسمين",
    nameEn: "Fattening sheep",
    emoji: "🐑",
    species: "ruminant",
    defaultWeight: 50,
    weightMin: 25,
    weightMax: 90,
    weightStep: 1,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 20,
    flockMin: 1,
    flockMax: 10000,
    flockStep: 1,
    flockUnit: "رأس",
    flockUnitEn: "head",
    flockLabel: "عدد رؤوس القطيع",
    flockLabelEn: "Flock size",
    dmi: (w) => +(0.04 * w).toFixed(2),
    targets: { cpMin: 13, tdnMin: 65, fiberMax: 22 },
    bounds: {
      corn: { lb: 25, ub: 58 },
      soybean: { lb: 0, ub: 25 },
      bran: { lb: 0, ub: 22 },
      hay: { lb: 0, ub: 30 },
      straw: { lb: 0, ub: 15 },
      premix: { lb: 2, ub: 5 },
    },
    forageMin: 25,
    description:
      "خروف تسمين وزن ٥٠ كجم بمعدل نمو ٢٥٠ جم/يوم. عاليقة مركزة عالية الطاقة.",
    descriptionEn:
      "A 50 kg fattening sheep with 250 g/day growth. A concentrated, high-energy ration.",
  },
  layer: {
    key: "layer",
    name: "دجاج بياض",
    nameEn: "Layer chicken",
    emoji: "🐔",
    species: "poultry",
    defaultWeight: 2,
    weightMin: 1.5,
    weightMax: 3,
    weightStep: 0.1,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 1000,
    flockMin: 1,
    flockMax: 50000,
    flockStep: 50,
    flockUnit: "طائر",
    flockUnitEn: "bird",
    flockLabel: "عدد الطيور في القطيع",
    flockLabelEn: "Flock size",
    dmi: () => 0.115,
    targets: { cpMin: 16.5, tdnMin: 66, fiberMax: 6 },
    bounds: {
      corn: { lb: 50, ub: 65 },
      soybean: { lb: 18, ub: 30 },
      bran: { lb: 4, ub: 12 },
      hay: { lb: 0, ub: 0 },
      straw: { lb: 0, ub: 0 },
      premix: { lb: 3, ub: 7 },
    },
    forageMin: 0,
    description:
      "دجاج بياض وزن ٢ كجم بمعدل إنتاج ٩٠٪. عاليقة مركزة منخفضة الألياف عالية البروتين. حدّد عدد الطيور لحساب تكلفة القطيع كاملاً.",
    descriptionEn:
      "A 2 kg layer chicken at 90% production. A concentrated, low-fiber, high-protein ration. Set the flock size to compute total flock cost.",
  },
  broiler: {
    key: "broiler",
    name: "دجاج تسمين",
    nameEn: "Broiler chicken",
    emoji: "🐤",
    species: "poultry",
    defaultWeight: 1.5,
    weightMin: 0.4,
    weightMax: 3,
    weightStep: 0.1,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 1000,
    flockMin: 1,
    flockMax: 50000,
    flockStep: 50,
    flockUnit: "طائر",
    flockUnitEn: "bird",
    flockLabel: "عدد الطيور في القطيع",
    flockLabelEn: "Flock size",
    dmi: (w) =>
      +Math.max(0.025, 0.05 * w - 0.01 * Math.max(0, w - 1) ** 2).toFixed(3),
    targets: { cpMin: 21, tdnMin: 70, fiberMax: 5 },
    bounds: {
      corn: { lb: 50, ub: 62 },
      soybean: { lb: 25, ub: 38 },
      bran: { lb: 0, ub: 8 },
      hay: { lb: 0, ub: 0 },
      straw: { lb: 0, ub: 0 },
      premix: { lb: 3, ub: 7 },
    },
    forageMin: 0,
    description:
      "دجاج تسمين وزن ١.٥ كجم. عاليقة عالية البروتين والطاقة للنمو السريع. حدّد عدد الكتاكيت لحساب تكلفة القطيع كاملاً.",
    descriptionEn:
      "A 1.5 kg broiler chicken. A high-protein, high-energy ration for rapid growth. Set the flock size to compute total flock cost.",
  },
  dairy_buffalo: {
    key: "dairy_buffalo",
    name: "جاموس حلوب",
    nameEn: "Dairy buffalo",
    emoji: "🐃",
    species: "ruminant",
    defaultWeight: 450,
    weightMin: 350,
    weightMax: 650,
    weightStep: 10,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: true,
    productionLabel: "إنتاج اللبن اليومي",
    productionLabelEn: "Daily milk production",
    productionUnit: "لتر/يوم",
    productionUnitEn: "L/day",
    productionDefault: 12,
    productionMin: 0,
    productionMax: 25,
    productionStep: 1,
    hasFlockInput: true,
    defaultFlockSize: 10,
    flockMin: 1,
    flockMax: 5000,
    flockStep: 1,
    flockUnit: "رأس",
    flockUnitEn: "head",
    flockLabel: "عدد رؤوس القطيع",
    flockLabelEn: "Herd size",
    dmi: (w, p) => +(0.028 * w + 0.3 * p).toFixed(2),
    targets: { cpMin: 13, tdnMin: 64, fiberMax: 25 },
    bounds: {
      corn: { lb: 15, ub: 50 },
      soybean: { lb: 0, ub: 25 },
      bran: { lb: 0, ub: 22 },
      hay: { lb: 0, ub: 45 },
      straw: { lb: 0, ub: 18 },
      premix: { lb: 2, ub: 5 },
    },
    forageMin: 40,
    description:
      "جاموس حلوب وزن ٤٥٠ كجم ينتج حوالي ١٢ لتر لبن يومياً. يحتاج عاليقة عالية الطاقة والبروتين.",
    descriptionEn:
      "A 450 kg dairy buffalo producing about 12 L of milk per day. Needs a high-energy, high-protein ration.",
  },
  calf: {
    key: "calf",
    name: "عجول تسمين",
    nameEn: "Fattening calf",
    emoji: "🐂",
    species: "ruminant",
    defaultWeight: 200,
    weightMin: 80,
    weightMax: 400,
    weightStep: 5,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 15,
    flockMin: 1,
    flockMax: 5000,
    flockStep: 1,
    flockUnit: "رأس",
    flockUnitEn: "head",
    flockLabel: "عدد رؤوس القطيع",
    flockLabelEn: "Herd size",
    dmi: (w) => +(0.032 * w).toFixed(2),
    targets: { cpMin: 16, tdnMin: 68, fiberMax: 18 },
    bounds: {
      corn: { lb: 30, ub: 60 },
      soybean: { lb: 10, ub: 30 },
      bran: { lb: 0, ub: 15 },
      hay: { lb: 0, ub: 25 },
      straw: { lb: 0, ub: 12 },
      premix: { lb: 2, ub: 5 },
    },
    forageMin: 20,
    description:
      "عجل تسمين وزن ٢٠٠ كجم في مرحلة النمو. يحتاج عاليقة عالية البروتين لبناء العضلات.",
    descriptionEn:
      "A 200 kg fattening calf in the growth phase. Needs a high-protein ration for muscle building.",
  },
  layer_breeder: {
    key: "layer_breeder",
    name: "أمهات دجاج بياض",
    nameEn: "Layer breeder",
    emoji: "🐓",
    species: "poultry",
    defaultWeight: 2.5,
    weightMin: 1.8,
    weightMax: 3.5,
    weightStep: 0.1,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 1000,
    flockMin: 1,
    flockMax: 50000,
    flockStep: 50,
    flockUnit: "طائر",
    flockUnitEn: "bird",
    flockLabel: "عدد الطيور في القطيع",
    flockLabelEn: "Flock size",
    dmi: () => 0.13,
    targets: { cpMin: 17, tdnMin: 68, fiberMax: 6 },
    bounds: {
      corn: { lb: 55, ub: 68 },
      soybean: { lb: 16, ub: 28 },
      bran: { lb: 3, ub: 10 },
      hay: { lb: 0, ub: 0 },
      straw: { lb: 0, ub: 0 },
      premix: { lb: 3, ub: 7 },
    },
    forageMin: 0,
    description:
      "أمهات دجاج بياض وزن ٢.٥ كجم لإنتاج بيض التفقيس. عاليقة عالية البروتين والكالسيوم.",
    descriptionEn:
      "Layer breeder hens, 2.5 kg, producing hatching eggs. A high-protein, high-calcium ration.",
  },
  broiler_starter: {
    key: "broiler_starter",
    name: "كتاكيت بادي",
    nameEn: "Broiler starter chicks",
    emoji: "🐣",
    species: "poultry",
    defaultWeight: 0.5,
    weightMin: 0.2,
    weightMax: 1.2,
    weightStep: 0.05,
    weightUnit: "كجم",
    weightUnitEn: "kg",
    hasProductionInput: false,
    productionLabel: "",
    productionLabelEn: "",
    productionUnit: "",
    productionUnitEn: "",
    productionDefault: 0,
    productionMin: 0,
    productionMax: 0,
    productionStep: 0,
    hasFlockInput: true,
    defaultFlockSize: 1000,
    flockMin: 1,
    flockMax: 50000,
    flockStep: 50,
    flockUnit: "طائر",
    flockUnitEn: "bird",
    flockLabel: "عدد الطيور في القطيع",
    flockLabelEn: "Flock size",
    dmi: (w) => +(0.06 * w).toFixed(2),
    targets: { cpMin: 23, tdnMin: 72, fiberMax: 4 },
    bounds: {
      corn: { lb: 50, ub: 60 },
      soybean: { lb: 30, ub: 40 },
      bran: { lb: 0, ub: 5 },
      hay: { lb: 0, ub: 0 },
      straw: { lb: 0, ub: 0 },
      premix: { lb: 3, ub: 7 },
    },
    forageMin: 0,
    description:
      "كتاكيت تسمين في مرحلة البادي (الأسبوع الأول) وزن ٠.٥ كجم. عاليقة عالية البروتين جداً للنمو المبكر.",
    descriptionEn:
      "Broiler starter chicks in the first week, 0.5 kg. A very high-protein ration for early growth.",
  },
};

export const ANIMAL_ORDER: AnimalKey[] = [
  "dairy_cow",
  "dairy_buffalo",
  "buffalo",
  "calf",
  "sheep",
  "layer",
  "layer_breeder",
  "broiler",
  "broiler_starter",
];

/* ================================================================== */
/*  MODELS                                                             */
/* ================================================================== */

export type FormulationMode = "balanced" | "economy";

export interface FormulationResult {
  dmi: number;
  perAnimalDmi: number;
  flockSize: number;
  components: Array<{
    ingredient: Ingredient;
    percent: number;
    kg: number;
    cost: number;
  }>;
  totalCost: number;
  costPerKg: number;
  costPerMonth: number;
  costPerAnimal: number;
  achieved: { cp: number; tdn: number; fiber: number };
  targets: { cpMin: number; tdnMin: number; fiberMax: number };
  feasible: boolean;
  warnings: string[];
}

export type PriceMap = Record<IngredientKey, number>;
