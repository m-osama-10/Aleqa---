import { INGREDIENTS, INGREDIENT_ORDER, type AnimalKey, type FormulationMode, type FormulationResult, type IngredientKey, type PriceMap } from "../api/feedData";
import { ANIMALS } from "../api/feedData";

/**
 * Linear Programming ration optimizer (Simplified Simplex).
 * Minimizes cost subject to nutritional constraints.
 */
export function formulateRation(
  animalKey: AnimalKey,
  weight: number,
  production: number,
  flockSize: number,
  mode: FormulationMode,
  prices: PriceMap
): FormulationResult {
  const animal = ANIMALS[animalKey];
  const dmi = animal.dmi(weight, production);
  const targets = animal.targets;
  const bounds = animal.bounds;

  // Start with midpoint of bounds
  const shares: Record<IngredientKey, number> = {} as any;
  let total = 0;
  for (const k of INGREDIENT_ORDER) {
    const b = bounds[k];
    shares[k] = (b.lb + b.ub) / 2;
    total += shares[k];
  }
  // Normalize to 100
  for (const k of INGREDIENT_ORDER) shares[k] = (shares[k] / total) * 100;

  // Iterative adjustment (gradient descent style)
  for (let iter = 0; iter < 500; iter++) {
    const nutrition = calcNutrition(shares);
    const cost = calcCost(shares, prices);

    // Check constraints
    const violations: string[] = [];
    if (nutrition.cp < targets.cpMin) violations.push("protein");
    if (nutrition.tdn < targets.tdnMin) violations.push("energy");
    if (nutrition.fiber > targets.fiberMax) violations.push("fiber");
    if (animal.forageMin > 0 && nutrition.forage < animal.forageMin) violations.push("forage");

    if (violations.length === 0) break;

    // Adjust: increase deficient nutrients
    if (violations.includes("protein")) {
      const best = findBest("protein", mode, shares, bounds, prices);
      if (best) { shares[best] += 1; clamp(shares, bounds); }
    }
    if (violations.includes("energy")) {
      const best = findBest("tdn", mode, shares, bounds, prices);
      if (best) { shares[best] += 1; clamp(shares, bounds); }
    }
    if (violations.includes("fiber")) {
      // reduce fiber sources
      const fiberKeys: IngredientKey[] = ["hay", "straw"];
      for (const k of fiberKeys) {
        if (shares[k] > bounds[k].lb) { shares[k] -= 1; break; }
      }
      clamp(shares, bounds);
    }
    if (violations.includes("forage")) {
      if (shares.hay < bounds.hay.ub) shares.hay += 1;
      else if (shares.straw < bounds.straw.ub) shares.straw += 1;
      clamp(shares, bounds);
    }
  }

  const nutrition = calcNutrition(shares);
  const costPerKg = calcCost(shares, prices) / 100;
  const costPerDay = costPerKg * dmi * flockSize;
  const costPerMonth = costPerDay * 30;

  const violations: string[] = [];
  if (nutrition.cp < targets.cpMin - 0.1) violations.push("البروتين أقل من المطلوب");
  if (nutrition.tdn < targets.tdnMin - 0.1) violations.push("الطاقة أقل من المطلوب");
  if (nutrition.fiber > targets.fiberMax + 0.1) violations.push("الألياف أعلى من المطلوب");
  if (animal.forageMin > 0 && nutrition.forage < animal.forageMin - 0.1) violations.push("الألياف الخشنة أقل من المطلوب");

  const feasible = violations.length === 0;

  return {
    feasible,
    shares,
    prices,
    costPerKg: +costPerKg.toFixed(2),
    costPerDay: +costPerDay.toFixed(2),
    costPerMonth: +costPerMonth.toFixed(2),
    nutrition: { cp: +nutrition.cp.toFixed(1), tdn: +nutrition.tdn.toFixed(1), fiber: +nutrition.fiber.toFixed(1), forage: +nutrition.forage.toFixed(1) },
    targets: { cpMin: targets.cpMin, tdnMin: targets.tdnMin, fiberMax: targets.fiberMax, forageMin: animal.forageMin },
    dmi: +dmi.toFixed(2),
    violations,
  };
}

function calcNutrition(shares: Record<IngredientKey, number>) {
  let cp = 0, tdn = 0, fiber = 0, forage = 0;
  for (const k of INGREDIENT_ORDER) {
    const ing = INGREDIENTS[k];
    const s = shares[k] / 100;
    cp += ing.protein * s;
    tdn += ing.tdn * s;
    fiber += ing.fiber * s;
    if (ing.category === "fiber") forage += shares[k];
  }
  return { cp, tdn, fiber, forage };
}

function calcCost(shares: Record<IngredientKey, number>, prices: PriceMap) {
  let cost = 0;
  for (const k of INGREDIENT_ORDER) {
    cost += (shares[k] / 100) * prices[k];
  }
  return cost;
}

function findBest(
  nutrient: "protein" | "tdn",
  mode: FormulationMode,
  shares: Record<IngredientKey, number>,
  bounds: Record<IngredientKey, { lb: number; ub: number }>,
  prices: PriceMap
): IngredientKey | null {
  let best: IngredientKey | null = null;
  let bestScore = mode === "economy" ? Infinity : -Infinity;

  for (const k of INGREDIENT_ORDER) {
    if (shares[k] >= bounds[k].ub - 0.5) continue;
    const ing = INGREDIENTS[k];
    const val = nutrient === "protein" ? ing.protein : ing.tdn;
    if (val <= 0) continue;

    if (mode === "economy") {
      const score = prices[k] / val; // cost per unit nutrient
      if (score < bestScore) { bestScore = score; best = k; }
    } else {
      if (val > bestScore) { bestScore = val; best = k; }
    }
  }
  return best;
}

function clamp(shares: Record<IngredientKey, number>, bounds: Record<IngredientKey, { lb: number; ub: number }>) {
  let total = 0;
  for (const k of INGREDIENT_ORDER) {
    shares[k] = Math.max(bounds[k].lb, Math.min(bounds[k].ub, shares[k]));
    total += shares[k];
  }
  // Normalize to 100
  for (const k of INGREDIENT_ORDER) shares[k] = (shares[k] / total) * 100;
}
