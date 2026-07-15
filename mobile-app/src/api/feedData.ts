export type IngredientKey = "corn" | "soybean" | "bran" | "hay" | "straw" | "premix";

export interface Ingredient {
  key: IngredientKey;
  name: string;
  nameEn: string;
  emoji: string;
  category: "energy" | "protein" | "fiber" | "additive";
  categoryLabel: string;
  defaultPrice: number;
  protein: number;
  tdn: number;
  fiber: number;
}

export const INGREDIENTS: Record<IngredientKey, Ingredient> = {
  corn: { key: "corn", name: "الذرة الصفراء", nameEn: "Yellow Corn", emoji: "🌽", category: "energy", categoryLabel: "طاقة", defaultPrice: 12, protein: 8.5, tdn: 88, fiber: 2.5 },
  soybean: { key: "soybean", name: "كسب فول الصويا", nameEn: "Soybean Meal", emoji: "🫘", category: "protein", categoryLabel: "بروتين", defaultPrice: 28, protein: 44, tdn: 77, fiber: 7 },
  bran: { key: "bran", name: "الردة (نخالة القمح)", nameEn: "Wheat Bran", emoji: "🌾", category: "energy", categoryLabel: "طاقة/ألياف", defaultPrice: 8, protein: 15, tdn: 70, fiber: 10 },
  hay: { key: "hay", name: "الدريس (برسيم جاف)", nameEn: "Hay", emoji: "🌿", category: "fiber", categoryLabel: "ألياف خشنة", defaultPrice: 9, protein: 12, tdn: 55, fiber: 28 },
  straw: { key: "straw", name: "التبن (قش القمح)", nameEn: "Wheat Straw", emoji: "🎑", category: "fiber", categoryLabel: "ألياف خشنة", defaultPrice: 4, protein: 3, tdn: 40, fiber: 40 },
  premix: { key: "premix", name: "الإضافات (فيتامينات + أملاح)", nameEn: "Additives", emoji: "💊", category: "additive", categoryLabel: "إضافات", defaultPrice: 45, protein: 0, tdn: 0, fiber: 0 },
};

export const INGREDIENT_ORDER: IngredientKey[] = ["corn", "soybean", "bran", "hay", "straw", "premix"];

export type AnimalKey =
  | "dairy_cow" | "dairy_buffalo" | "buffalo" | "calf" | "sheep"
  | "layer" | "layer_breeder" | "broiler" | "broiler_starter";

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
  hasProduction: boolean;
  productionLabel: string;
  productionDefault: number;
  productionMin: number;
  productionMax: number;
  productionStep: number;
  defaultFlock: number;
  flockMin: number;
  flockMax: number;
  flockStep: number;
  flockUnit: string;
  dmi: (weight: number, production: number) => number;
  targets: { cpMin: number; tdnMin: number; fiberMax: number };
  bounds: Record<IngredientKey, { lb: number; ub: number }>;
  forageMin: number;
}

export const ANIMALS: Record<AnimalKey, AnimalProfile> = {
  dairy_cow: {
    key: "dairy_cow", name: "بقرة حلوب", nameEn: "Dairy Cow", emoji: "🐄", species: "ruminant",
    defaultWeight: 500, weightMin: 300, weightMax: 700, weightStep: 10,
    hasProduction: true, productionLabel: "إنتاج اللبن (لتر/يوم)", productionDefault: 20, productionMin: 0, productionMax: 45, productionStep: 1,
    defaultFlock: 10, flockMin: 1, flockMax: 5000, flockStep: 1, flockUnit: "رأس",
    dmi: (w, p) => +(0.025 * w + 0.35 * p).toFixed(2),
    targets: { cpMin: 14, tdnMin: 63, fiberMax: 26 },
    bounds: { corn: { lb: 15, ub: 50 }, soybean: { lb: 0, ub: 28 }, bran: { lb: 0, ub: 22 }, hay: { lb: 0, ub: 45 }, straw: { lb: 0, ub: 18 }, premix: { lb: 2, ub: 5 } },
    forageMin: 40,
  },
  dairy_buffalo: {
    key: "dairy_buffalo", name: "جاموس حلوب", nameEn: "Dairy Buffalo", emoji: "🐃", species: "ruminant",
    defaultWeight: 450, weightMin: 300, weightMax: 650, weightStep: 10,
    hasProduction: true, productionLabel: "إنتاج اللبن (لتر/يوم)", productionDefault: 15, productionMin: 0, productionMax: 35, productionStep: 1,
    defaultFlock: 10, flockMin: 1, flockMax: 5000, flockStep: 1, flockUnit: "رأس",
    dmi: (w, p) => +(0.026 * w + 0.32 * p).toFixed(2),
    targets: { cpMin: 13, tdnMin: 62, fiberMax: 26 },
    bounds: { corn: { lb: 15, ub: 50 }, soybean: { lb: 0, ub: 26 }, bran: { lb: 0, ub: 24 }, hay: { lb: 0, ub: 45 }, straw: { lb: 0, ub: 18 }, premix: { lb: 2, ub: 5 } },
    forageMin: 40,
  },
  buffalo: {
    key: "buffalo", name: "جاموس تسمين", nameEn: "Fattening Buffalo", emoji: "🐃", species: "ruminant",
    defaultWeight: 400, weightMin: 250, weightMax: 600, weightStep: 10,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 10, flockMin: 1, flockMax: 5000, flockStep: 1, flockUnit: "رأس",
    dmi: (w) => +(0.028 * w).toFixed(2),
    targets: { cpMin: 12, tdnMin: 66, fiberMax: 22 },
    bounds: { corn: { lb: 20, ub: 55 }, soybean: { lb: 0, ub: 22 }, bran: { lb: 0, ub: 25 }, hay: { lb: 0, ub: 40 }, straw: { lb: 0, ub: 20 }, premix: { lb: 2, ub: 5 } },
    forageMin: 30,
  },
  calf: {
    key: "calf", name: "عجل تسمين", nameEn: "Fattening Calf", emoji: "🐂", species: "ruminant",
    defaultWeight: 200, weightMin: 100, weightMax: 400, weightStep: 10,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 10, flockMin: 1, flockMax: 5000, flockStep: 1, flockUnit: "رأس",
    dmi: (w) => +(0.03 * w).toFixed(2),
    targets: { cpMin: 14, tdnMin: 68, fiberMax: 20 },
    bounds: { corn: { lb: 25, ub: 55 }, soybean: { lb: 5, ub: 25 }, bran: { lb: 0, ub: 20 }, hay: { lb: 5, ub: 30 }, straw: { lb: 0, ub: 15 }, premix: { lb: 2, ub: 5 } },
    forageMin: 25,
  },
  sheep: {
    key: "sheep", name: "خروف تسمين", nameEn: "Fattening Sheep", emoji: "🐑", species: "ruminant",
    defaultWeight: 50, weightMin: 25, weightMax: 90, weightStep: 1,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 20, flockMin: 1, flockMax: 10000, flockStep: 1, flockUnit: "رأس",
    dmi: (w) => +(0.04 * w).toFixed(2),
    targets: { cpMin: 13, tdnMin: 65, fiberMax: 22 },
    bounds: { corn: { lb: 25, ub: 58 }, soybean: { lb: 0, ub: 25 }, bran: { lb: 0, ub: 22 }, hay: { lb: 0, ub: 30 }, straw: { lb: 0, ub: 15 }, premix: { lb: 2, ub: 5 } },
    forageMin: 25,
  },
  layer: {
    key: "layer", name: "دجاج بياض", nameEn: "Layer Chicken", emoji: "🐔", species: "poultry",
    defaultWeight: 2, weightMin: 1.5, weightMax: 3, weightStep: 0.1,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 1000, flockMin: 1, flockMax: 50000, flockStep: 50, flockUnit: "طائر",
    dmi: () => 0.115,
    targets: { cpMin: 16.5, tdnMin: 66, fiberMax: 6 },
    bounds: { corn: { lb: 50, ub: 65 }, soybean: { lb: 18, ub: 30 }, bran: { lb: 4, ub: 12 }, hay: { lb: 0, ub: 0 }, straw: { lb: 0, ub: 0 }, premix: { lb: 3, ub: 7 } },
    forageMin: 0,
  },
  layer_breeder: {
    key: "layer_breeder", name: "أمهات بياض", nameEn: "Layer Breeder", emoji: "🐓", species: "poultry",
    defaultWeight: 2.5, weightMin: 2, weightMax: 3.5, weightStep: 0.1,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 1000, flockMin: 1, flockMax: 50000, flockStep: 50, flockUnit: "طائر",
    dmi: () => 0.125,
    targets: { cpMin: 16, tdnMin: 67, fiberMax: 6 },
    bounds: { corn: { lb: 52, ub: 66 }, soybean: { lb: 16, ub: 28 }, bran: { lb: 4, ub: 12 }, hay: { lb: 0, ub: 0 }, straw: { lb: 0, ub: 0 }, premix: { lb: 3, ub: 7 } },
    forageMin: 0,
  },
  broiler: {
    key: "broiler", name: "دجاج تسمين", nameEn: "Broiler", emoji: "🐤", species: "poultry",
    defaultWeight: 1.5, weightMin: 0.4, weightMax: 3, weightStep: 0.1,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 5000, flockMin: 1, flockMax: 100000, flockStep: 100, flockUnit: "طائر",
    dmi: (w) => +(0.05 * w).toFixed(3),
    targets: { cpMin: 21, tdnMin: 70, fiberMax: 5 },
    bounds: { corn: { lb: 50, ub: 62 }, soybean: { lb: 22, ub: 35 }, bran: { lb: 0, ub: 8 }, hay: { lb: 0, ub: 0 }, straw: { lb: 0, ub: 0 }, premix: { lb: 3, ub: 6 } },
    forageMin: 0,
  },
  broiler_starter: {
    key: "broiler_starter", name: "كتاكيت بادي", nameEn: "Broiler Starter", emoji: "🐣", species: "poultry",
    defaultWeight: 0.5, weightMin: 0.1, weightMax: 1.5, weightStep: 0.05,
    hasProduction: false, productionLabel: "", productionDefault: 0, productionMin: 0, productionMax: 0, productionStep: 0,
    defaultFlock: 5000, flockMin: 1, flockMax: 100000, flockStep: 100, flockUnit: "طائر",
    dmi: (w) => +(0.055 * w).toFixed(3),
    targets: { cpMin: 23, tdnMin: 71, fiberMax: 4 },
    bounds: { corn: { lb: 45, ub: 58 }, soybean: { lb: 25, ub: 38 }, bran: { lb: 0, ub: 6 }, hay: { lb: 0, ub: 0 }, straw: { lb: 0, ub: 0 }, premix: { lb: 3, ub: 6 } },
    forageMin: 0,
  },
};

export const ANIMAL_ORDER: AnimalKey[] = [
  "dairy_cow", "dairy_buffalo", "buffalo", "calf", "sheep",
  "layer", "layer_breeder", "broiler", "broiler_starter",
];

export type FormulationMode = "balanced" | "economy";

export interface FormulationResult {
  feasible: boolean;
  shares: Record<IngredientKey, number>;
  prices: Record<IngredientKey, number>;
  costPerKg: number;
  costPerDay: number;
  costPerMonth: number;
  nutrition: { cp: number; tdn: number; fiber: number; forage: number };
  targets: { cpMin: number; tdnMin: number; fiberMax: number; forageMin: number };
  dmi: number;
  violations: string[];
}

export type PriceMap = Record<IngredientKey, number>;
export interface SavedRation {
  id: string;
  name: string;
  animalKey: AnimalKey;
  weight: number;
  production: number;
  flockSize: number;
  mode: FormulationMode;
  result: FormulationResult;
  createdAt: string;
}
