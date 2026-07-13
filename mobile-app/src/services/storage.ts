import AsyncStorage from "@react-native-async-storage/async-storage";
import { STORAGE } from "../utils/constants";
import type { PriceMap, SavedRation, IngredientKey } from "../api/feedData";
import { INGREDIENT_ORDER, INGREDIENTS } from "../api/feedData";

export const defaultPrices = (): PriceMap => {
  const p = {} as PriceMap;
  for (const k of INGREDIENT_ORDER) p[k] = INGREDIENTS[k].defaultPrice;
  return p;
};

export async function loadPrices(): Promise<PriceMap> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE.PRICES);
    return raw ? { ...defaultPrices(), ...JSON.parse(raw) } : defaultPrices();
  } catch {
    return defaultPrices();
  }
}

export async function savePrices(prices: PriceMap): Promise<void> {
  await AsyncStorage.setItem(STORAGE.PRICES, JSON.stringify(prices));
}

export async function loadRations(): Promise<SavedRation[]> {
  try {
    const raw = await AsyncStorage.getItem(STORAGE.RATIONS);
    return raw ? JSON.parse(raw) : [];
  } catch {
    return [];
  }
}

export async function saveRation(ration: SavedRation): Promise<void> {
  const list = await loadRations();
  list.unshift(ration);
  await AsyncStorage.setItem(STORAGE.RATIONS, JSON.stringify(list.slice(0, 50)));
}

export async function deleteRation(id: string): Promise<void> {
  const list = await loadRations();
  await AsyncStorage.setItem(STORAGE.RATIONS, JSON.stringify(list.filter((r) => r.id !== id)));
}
