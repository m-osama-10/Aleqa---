/* ================================================================== */
/*  LINEAR PROGRAMMING SOLVER — Big-M Simplex Method                   */
/*                                                                     */
/*  Solves: minimize  c · x                                            */
/*          subject to A x {<=, =, >=} b                               */
/*                     0 <= x <= ub                                    */
/*                                                                     */
/*  Used by the feed formulation engine to find the cheapest balanced  */
/*  ration. Runs entirely client-side (offline-first, APK-ready).      */
/* ================================================================== */

type Rel = "<=" | ">=" | "=";

interface Constraint {
  coeff: number[];
  op: Rel;
  rhs: number;
}

interface LPResult {
  x: number[];
  obj: number;
  feasible: boolean;
}

const EPS = 1e-9;
const BIG_M = 1e7;
const MAX_ITER = 2000;

/**
 * Minimize c·x subject to constraints and variable upper bounds.
 * Returns null-equivalent (feasible=false) when infeasible.
 */
export function solveLP(
  cost: number[],
  constraints: Constraint[],
  upperBounds: number[]
): LPResult {
  const nVars = cost.length;

  // Fold upper bounds into constraint set (x_i <= ub_i).
  const allCons: Constraint[] = [...constraints];
  for (let i = 0; i < nVars; i++) {
    if (isFinite(upperBounds[i]) && upperBounds[i] < 1e9) {
      const coeff = new Array(nVars).fill(0);
      coeff[i] = 1;
      allCons.push({ coeff, op: "<=", rhs: upperBounds[i] });
    }
  }

  const nCon = allCons.length;
  let nSlack = 0;
  let nSurplus = 0;
  let nArt = 0;
  for (const c of allCons) {
    if (c.op === "<=") nSlack++;
    else if (c.op === ">=") {
      nSurplus++;
      nArt++;
    } else nArt++;
  }

  const totalVars = nVars + nSlack + nSurplus + nArt;

  // Build tableau A (nCon x totalVars), b (nCon), objective row (totalVars).
  const A: number[][] = Array.from({ length: nCon }, () =>
    new Array(totalVars).fill(0)
  );
  const b: number[] = new Array(nCon).fill(0);
  const obj: number[] = new Array(totalVars).fill(0);
  for (let i = 0; i < nVars; i++) obj[i] = cost[i];

  const basis: number[] = new Array(nCon).fill(-1);
  let slackIdx = nVars;
  let surpIdx = nVars + nSlack;
  let artIdx = nVars + nSlack + nSurplus;

  for (let i = 0; i < nCon; i++) {
    const c = allCons[i];
    for (let j = 0; j < nVars; j++) A[i][j] = c.coeff[j];
    b[i] = c.rhs;
    // Normalize negative rhs by flipping the row.
    if (b[i] < 0) {
      for (let j = 0; j < totalVars; j++) A[i][j] = -A[i][j];
      b[i] = -b[i];
      // Flip operator semantics for variable allocation.
      if (c.op === "<=") {
        // became >=
        A[i][surpIdx] = -1;
        A[i][artIdx] = 1;
        basis[i] = artIdx;
        obj[artIdx] = BIG_M;
        surpIdx++;
        artIdx++;
      } else if (c.op === ">=") {
        A[i][slackIdx] = 1;
        basis[i] = slackIdx;
        slackIdx++;
      } else {
        A[i][artIdx] = 1;
        basis[i] = artIdx;
        obj[artIdx] = BIG_M;
        artIdx++;
      }
      continue;
    }
    if (c.op === "<=") {
      A[i][slackIdx] = 1;
      basis[i] = slackIdx;
      slackIdx++;
    } else if (c.op === ">=") {
      A[i][surpIdx] = -1;
      A[i][artIdx] = 1;
      basis[i] = artIdx;
      obj[artIdx] = BIG_M;
      surpIdx++;
      artIdx++;
    } else {
      A[i][artIdx] = 1;
      basis[i] = artIdx;
      obj[artIdx] = BIG_M;
      artIdx++;
    }
  }

  // Simplex iterations (minimization): reduced cost = c_j - z_j.
  // Entering variable: most negative reduced cost.
  for (let iter = 0; iter < MAX_ITER; iter++) {
    // Compute reduced costs.
    let enter = -1;
    let best = -EPS;
    for (let j = 0; j < totalVars; j++) {
      let zj = 0;
      for (let i = 0; i < nCon; i++) zj += obj[basis[i]] * A[i][j];
      const reduced = obj[j] - zj;
      if (reduced < best) {
        best = reduced;
        enter = j;
      }
    }
    if (enter === -1) break; // optimal

    // Ratio test.
    let leave = -1;
    let minRatio = Infinity;
    for (let i = 0; i < nCon; i++) {
      if (A[i][enter] > EPS) {
        const ratio = b[i] / A[i][enter];
        if (ratio < minRatio - EPS) {
          minRatio = ratio;
          leave = i;
        }
      }
    }
    if (leave === -1) {
      // Unbounded — shouldn't happen for bounded feed LP.
      return { x: new Array(nVars).fill(0), obj: 0, feasible: false };
    }

    // Pivot.
    const piv = A[leave][enter];
    for (let j = 0; j < totalVars; j++) A[leave][j] /= piv;
    b[leave] /= piv;
    for (let i = 0; i < nCon; i++) {
      if (i !== leave && Math.abs(A[i][enter]) > EPS) {
        const factor = A[i][enter];
        for (let j = 0; j < totalVars; j++) A[i][j] -= factor * A[leave][j];
        b[i] -= factor * b[leave];
      }
    }
    basis[leave] = enter;
  }

  // Extract solution.
  const x = new Array(nVars).fill(0);
  for (let i = 0; i < nCon; i++) {
    if (basis[i] < nVars) x[basis[i]] = b[i];
  }

  // Feasibility: all artificial variables must be zero.
  let feasible = true;
  for (let i = 0; i < nCon; i++) {
    if (basis[i] >= nVars + nSlack + nSurplus) {
      if (b[i] > 1e-5) {
        feasible = false;
        break;
      }
    }
  }

  const objVal = cost.reduce((s, c, i) => s + c * x[i], 0);
  return { x, obj: objVal, feasible };
}

/* ================================================================== */
/*  FEED FORMULATION ENGINE                                            */
/* ================================================================== */

import {
  ANIMALS,
  INGREDIENTS,
  INGREDIENT_ORDER,
  type AnimalKey,
  type AnimalProfile,
  type FormulationMode,
  type FormulationResult,
  type IngredientKey,
} from "./feed-data";

interface FormulateParams {
  animalKey: AnimalKey;
  weight: number;
  production: number;
  prices: Record<IngredientKey, number>;
  mode: FormulationMode;
  flockSize?: number; // for poultry; defaults to 1
}

/**
 * Build & solve the feed-formulation LP for the given animal, weight,
 * production level, market prices, and objective mode.
 *
 * Objective: minimize cost per kg of ration (as-fed).
 * Constraints:
 *   - sum of fractions = 1
 *   - crude protein >= target (relaxed in economy mode)
 *   - TDN (energy) >= target (relaxed in economy mode)
 *   - crude fiber <= max
 *   - roughage (hay + straw) >= forageMin (ruminants)
 *   - per-ingredient lower & upper bounds
 *
 * For poultry, kg/cost values are scaled by flockSize so the result shows
 * the whole-flock totals.
 */
export function formulateRation(params: FormulateParams): FormulationResult {
  const animal: AnimalProfile = ANIMALS[params.animalKey];
  const perAnimalDmi = animal.dmi(params.weight, params.production);
  const flockSize = Math.max(1, Math.round(params.flockSize ?? 1));
  const dmi = +(perAnimalDmi * flockSize).toFixed(3);

  // Apply mode relaxation to targets and bounds.
  // Economy mode relaxes protein/energy floors AND the forage minimum so the
  // optimizer can actually swap expensive ingredients for cheaper ones — this
  // makes the cost saving and the quantity changes clearly visible.
  const relax = params.mode === "economy" ? 2.5 : 0;
  const relaxTdn = params.mode === "economy" ? 5 : 0;
  const relaxForage = params.mode === "economy" ? 8 : 0;
  const cpMin = Math.max(0, animal.targets.cpMin - relax);
  const tdnMin = Math.max(0, animal.targets.tdnMin - relaxTdn);
  const fiberMax = animal.targets.fiberMax;
  const forageMin = Math.max(0, animal.forageMin - relaxForage);

  // Variables order = INGREDIENT_ORDER.
  const nVars = INGREDIENT_ORDER.length;
  const cost = INGREDIENT_ORDER.map((k) => params.prices[k] ?? INGREDIENTS[k].defaultPrice);

  const constraints: Constraint[] = [];

  // 1) Sum = 1 (100%)
  constraints.push({ coeff: new Array(nVars).fill(1), op: "=", rhs: 1 });

  // 2) Crude protein >= cpMin/100
  constraints.push({
    coeff: INGREDIENT_ORDER.map((k) => INGREDIENTS[k].protein / 100),
    op: ">=",
    rhs: cpMin / 100,
  });

  // 3) TDN >= tdnMin/100
  constraints.push({
    coeff: INGREDIENT_ORDER.map((k) => INGREDIENTS[k].tdn / 100),
    op: ">=",
    rhs: tdnMin / 100,
  });

  // 4) Crude fiber <= fiberMax/100
  constraints.push({
    coeff: INGREDIENT_ORDER.map((k) => INGREDIENTS[k].fiber / 100),
    op: "<=",
    rhs: fiberMax / 100,
  });

  // 5) Roughage (hay + straw) >= forageMin (ruminants only).
  if (animal.species === "ruminant" && forageMin > 0) {
    const coeff = INGREDIENT_ORDER.map((k) =>
      k === "hay" || k === "straw" ? 1 : 0
    );
    constraints.push({ coeff, op: ">=", rhs: forageMin / 100 });
  }

  // 6) Per-ingredient lower bounds.
  const upperBounds: number[] = new Array(nVars).fill(1);
  INGREDIENT_ORDER.forEach((k, i) => {
    const b = animal.bounds[k];
    if (b.lb > 0) {
      const coeff = new Array(nVars).fill(0);
      coeff[i] = 1;
      constraints.push({ coeff, op: ">=", rhs: b.lb / 100 });
    }
    upperBounds[i] = b.ub / 100;
  });

  const result = solveLP(cost, constraints, upperBounds);

  const warnings: string[] = [];
  if (!result.feasible) {
    return {
      dmi,
      perAnimalDmi,
      flockSize,
      components: [],
      totalCost: 0,
      costPerKg: 0,
      costPerMonth: 0,
      costPerAnimal: 0,
      achieved: { cp: 0, tdn: 0, fiber: 0 },
      targets: { cpMin, tdnMin, fiberMax },
      feasible: false,
      warnings: [
        "لا يوجد حل ممكن بهذه القيود. جرّب توسيع الحدود المتاحة أو راجع الأسعار.",
      ],
    };
  }

  // Build components.
  const components = INGREDIENT_ORDER.map((k, i) => {
    const percent = result.x[i] * 100;
    const kg = +(result.x[i] * dmi).toFixed(3);
    const c = +(result.x[i] * dmi * (params.prices[k] ?? INGREDIENTS[k].defaultPrice)).toFixed(2);
    return { ingredient: INGREDIENTS[k], percent, kg, cost: c };
  }).filter((c) => c.percent > 0.05);

  // Achieved nutrition.
  const achieved = {
    cp: INGREDIENT_ORDER.reduce((s, k, i) => s + result.x[i] * INGREDIENTS[k].protein, 0),
    tdn: INGREDIENT_ORDER.reduce((s, k, i) => s + result.x[i] * INGREDIENTS[k].tdn, 0),
    fiber: INGREDIENT_ORDER.reduce((s, k, i) => s + result.x[i] * INGREDIENTS[k].fiber, 0),
  };

  const totalCost = +components.reduce((s, c) => s + c.cost, 0).toFixed(2);
  const costPerKg = +(totalCost / dmi).toFixed(2);
  const costPerMonth = +(totalCost * 30).toFixed(2);
  const costPerAnimal = +(totalCost / flockSize).toFixed(2);

  // Warnings.
  if (achieved.cp < cpMin - 0.3) warnings.push("البروتين أقل قليلاً من الهدف — راجع حدود الصويا.");
  if (achieved.tdn < tdnMin - 0.5) warnings.push("الطاقة أقل من الهدف — اسمح بمزيد من الذرة.");
  if (achieved.fiber > fiberMax + 0.5) warnings.push("الألياف أعلى من الموصى — قلّل التبن/الدريس.");

  return {
    dmi,
    perAnimalDmi,
    flockSize,
    components,
    totalCost,
    costPerKg,
    costPerMonth,
    costPerAnimal,
    achieved,
    targets: { cpMin, tdnMin, fiberMax },
    feasible: true,
    warnings,
  };
}

/* ================================================================== */
/*  MANUAL RATION (user-edited percentages)                            */
/* ================================================================== */

import type { PriceMap } from "./storage";

/**
 * Build a FormulationResult from user-supplied percentages (manual override
 * of the LP solution). Recomputes kg, cost, and achieved nutrition so the
 * UI can live-update as the farmer drags the percentages.
 */
export function computeManualResult(
  percents: Partial<Record<IngredientKey, number>>,
  perAnimalDmi: number,
  prices: PriceMap,
  targets: { cpMin: number; tdnMin: number; fiberMax: number },
  flockSize: number = 1
): FormulationResult {
  const flock = Math.max(1, Math.round(flockSize));
  const dmi = +(perAnimalDmi * flock).toFixed(3);

  const components = INGREDIENT_ORDER.filter((k) => (percents[k] ?? 0) > 0.05).map(
    (k) => {
      const pct = percents[k] ?? 0;
      const ing = INGREDIENTS[k];
      const kg = +((pct / 100) * dmi).toFixed(3);
      const cost = +(kg * (prices[k] ?? ing.defaultPrice)).toFixed(2);
      return { ingredient: ing, percent: pct, kg, cost };
    }
  );

  const achieved = {
    cp: INGREDIENT_ORDER.reduce(
      (s, k) => s + ((percents[k] ?? 0) / 100) * INGREDIENTS[k].protein,
      0
    ),
    tdn: INGREDIENT_ORDER.reduce(
      (s, k) => s + ((percents[k] ?? 0) / 100) * INGREDIENTS[k].tdn,
      0
    ),
    fiber: INGREDIENT_ORDER.reduce(
      (s, k) => s + ((percents[k] ?? 0) / 100) * INGREDIENTS[k].fiber,
      0
    ),
  };

  const totalCost = +components.reduce((s, c) => s + c.cost, 0).toFixed(2);
  const costPerKg = dmi > 0 ? +(totalCost / dmi).toFixed(2) : 0;
  const costPerMonth = +(totalCost * 30).toFixed(2);
  const costPerAnimal = +(totalCost / flock).toFixed(2);

  const warnings: string[] = [];
  if (achieved.cp < targets.cpMin - 0.3)
    warnings.push("البروتين أقل من الهدف الموصى به.");
  if (achieved.tdn < targets.tdnMin - 0.5)
    warnings.push("الطاقة أقل من الهدف الموصى به.");
  if (achieved.fiber > targets.fiberMax + 0.5)
    warnings.push("الألياف أعلى من الموصى به.");

  const sumPct = INGREDIENT_ORDER.reduce((s, k) => s + (percents[k] ?? 0), 0);
  if (Math.abs(sumPct - 100) > 0.1) {
    warnings.push(`مجموع النسب ${sumPct.toFixed(1)}% — يجب أن يساوي 100%.`);
  }

  return {
    dmi,
    perAnimalDmi,
    flockSize: flock,
    components,
    totalCost,
    costPerKg,
    costPerMonth,
    costPerAnimal,
    achieved,
    targets,
    feasible: true,
    warnings,
  };
}
