/* ================================================================== */
/*  Calculators API                                                    */
/* ================================================================== */

import { supabase } from "./supabase";
import type {
  Calculator,
  CalculatorCategory,
  CalcCategoryWithCalculators,
} from "../types/db";

/** Fetch all enabled calculator categories, sorted by `sort_order`. */
export async function fetchCalculatorCategories(): Promise<CalculatorCategory[]> {
  const { data, error } = await supabase
    .from("calculator_categories")
    .select("*")
    .eq("enabled", true)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as CalculatorCategory[];
}

/** Fetch all enabled calculators, sorted by `sort_order`. */
export async function fetchCalculators(): Promise<Calculator[]> {
  const { data, error } = await supabase
    .from("calculators")
    .select("*")
    .eq("enabled", true)
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Calculator[];
}

/** Fetch a single calculator by slug. */
export async function fetchCalculatorBySlug(
  slug: string
): Promise<Calculator | null> {
  const { data, error } = await supabase
    .from("calculators")
    .select("*")
    .eq("slug", slug)
    .is("deleted_at", null)
    .maybeSingle();
  if (error) throw error;
  return (data as Calculator) ?? null;
}

/** Group calculators by their category — for the home screen. */
export function groupCalculatorsByCategory(
  categories: CalculatorCategory[],
  calculators: Calculator[]
): CalcCategoryWithCalculators[] {
  return categories
    .map((cat) => ({
      ...cat,
      calculators: calculators.filter((c) => c.category_id === cat.id),
    }))
    .filter((cat) => cat.calculators.length > 0);
}

/** Admin: list ALL calculators (including disabled). */
export async function adminFetchCalculators(): Promise<Calculator[]> {
  const { data, error } = await supabase
    .from("calculators")
    .select("*")
    .is("deleted_at", null)
    .order("sort_order", { ascending: true });
  if (error) throw error;
  return (data ?? []) as Calculator[];
}

/** Admin: create a calculator. */
export async function adminCreateCalculator(
  payload: Omit<Calculator, "id" | "created_at" | "updated_at" | "deleted_at">
): Promise<Calculator> {
  const { data, error } = await supabase
    .from("calculators")
    .insert(payload)
    .select()
    .single();
  if (error) throw error;
  return data as Calculator;
}

/** Admin: update a calculator. */
export async function adminUpdateCalculator(
  id: string,
  patch: Partial<Calculator>
): Promise<Calculator> {
  const { data, error } = await supabase
    .from("calculators")
    .update({ ...patch, updated_at: new Date().toISOString() })
    .eq("id", id)
    .select()
    .single();
  if (error) throw error;
  return data as Calculator;
}

/** Admin: soft-delete a calculator. */
export async function adminDeleteCalculator(id: string): Promise<void> {
  const { error } = await supabase
    .from("calculators")
    .update({
      deleted_at: new Date().toISOString(),
      enabled: false,
      updated_at: new Date().toISOString(),
    })
    .eq("id", id);
  if (error) throw error;
}
