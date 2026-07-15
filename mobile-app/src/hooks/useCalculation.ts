/* ================================================================== */
/*  useCalculation — wraps the LP solver + manual editor               */
/* ================================================================== */

import { useCallback, useEffect, useMemo, useState } from "react";
import {
  ANIMALS,
  type AnimalKey,
  type FormulationMode,
  type FormulationResult,
  type IngredientKey,
  type PriceMap,
} from "../api/feedData";
import {
  formulateRation,
  computeManualResult,
} from "../services/rationOptimizer";
import {
  getActivePrices,
  updatePrice as persistPrice,
  resetActivePrices,
} from "../services/storage";

export interface CalcInput {
  animalKey: AnimalKey;
  weight: number;
  production: number;
  flockSize: number;
  mode: FormulationMode;
}

export interface UseCalculation {
  prices: PriceMap;
  balanced: FormulationResult;
  result: FormulationResult; // either balanced, economy, or manual
  mode: FormulationMode;
  manual: Partial<Record<IngredientKey, number>>;
  isManual: boolean;
  savings: { amount: number; pct: number } | null;

  setMode: (m: FormulationMode) => void;
  setManual: (m: Partial<Record<IngredientKey, number>>) => void;
  toggleManual: () => void;
  resetToAuto: () => void;
  setPrice: (k: IngredientKey, v: number) => Promise<void>;
  resetPrices: () => Promise<void>;
  recompute: (input: CalcInput) => void;
}

export function useCalculation(initial: CalcInput): UseCalculation {
  const [prices, setPrices] = useState<PriceMap>(() => {
    // Will be hydrated from storage on mount.
    const animal = ANIMALS[initial.animalKey];
    const p: PriceMap = {} as PriceMap;
    for (const k of Object.keys(animal.bounds) as IngredientKey[]) {
      p[k] = animal.bounds[k].lb + animal.bounds[k].ub ? 0 : 0;
    }
    return p;
  });
  const [balanced, setBalanced] = useState<FormulationResult>(() =>
    formulateRation({
      ...initial,
      prices: prices,
      mode: "balanced",
    })
  );
  const [mode, setModeState] = useState<FormulationMode>(initial.mode);
  const [manual, setManualState] = useState<Partial<Record<IngredientKey, number>>>({});
  const [isManual, setIsManual] = useState(false);

  // Hydrate prices from storage.
  useEffect(() => {
    void (async () => {
      const stored = await getActivePrices();
      setPrices(stored);
    })();
  }, []);

  // Recompute balanced whenever inputs change.
  const recompute = useCallback(
    (input: CalcInput) => {
      const balancedResult = formulateRation({
        ...input,
        prices,
        mode: "balanced",
      });
      setBalanced(balancedResult);
      // If not in manual mode, seed manual from the balanced solution.
      if (!isManual) {
        const seed: Partial<Record<IngredientKey, number>> = {};
        for (const c of balancedResult.components) {
          seed[c.ingredient.key] = c.percent;
        }
        setManualState(seed);
      }
    },
    [prices, isManual]
  );

  // Recompute when prices or input change.
  useEffect(() => {
    recompute(initial);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [prices, initial.animalKey, initial.weight, initial.production, initial.flockSize]);

  const setPrice = useCallback(async (k: IngredientKey, v: number) => {
    const next = await persistPrice(k, v);
    setPrices(next);
  }, []);

  const resetPrices = useCallback(async () => {
    const def = await resetActivePrices();
    setPrices(def);
  }, []);

  const setMode = useCallback((m: FormulationMode) => {
    setModeState(m);
    setIsManual(false);
  }, []);

  const setManual = useCallback((m: Partial<Record<IngredientKey, number>>) => {
    setManualState(m);
    setIsManual(true);
  }, []);

  const toggleManual = useCallback(() => setIsManual((v) => !v), []);
  const resetToAuto = useCallback(() => {
    setIsManual(false);
    const seed: Partial<Record<IngredientKey, number>> = {};
    for (const c of balanced.components) {
      seed[c.ingredient.key] = c.percent;
    }
    setManualState(seed);
  }, [balanced]);

  const result: FormulationResult = useMemo(() => {
    if (isManual) {
      return computeManualResult(
        manual,
        balanced.perAnimalDmi,
        prices,
        balanced.targets,
        balanced.flockSize
      );
    }
    if (mode === "economy") {
      return formulateRation({
        animalKey: initial.animalKey,
        weight: initial.weight,
        production: initial.production,
        flockSize: initial.flockSize,
        prices,
        mode: "economy",
      });
    }
    return balanced;
  }, [isManual, manual, balanced, mode, prices, initial]);

  const savings = useMemo(() => {
    if (isManual || mode === "balanced" || !result.feasible || !balanced.feasible) {
      return null;
    }
    if (balanced.totalCost <= 0) return null;
    const diff = balanced.totalCost - result.totalCost;
    if (diff <= 0) return null;
    return {
      amount: +diff.toFixed(2),
      pct: +((diff / balanced.totalCost) * 100).toFixed(1),
    };
  }, [isManual, mode, result, balanced]);

  return {
    prices,
    balanced,
    result,
    mode,
    manual,
    isManual,
    savings,
    setMode,
    setManual,
    toggleManual,
    resetToAuto,
    setPrice,
    resetPrices,
    recompute,
  };
}
