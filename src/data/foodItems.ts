import { CategoryId, FoodItem } from '../types';
import { CATEGORIES } from './categories';
import { FISH_SEAFOOD_ITEMS } from './fishSeafood';
import { MEAT_POULTRY_ITEMS } from './meatPoultry';
import { DAIRY_ITEMS } from './dairy';
import { VEGETABLE_ITEMS } from './vegetables';

export { CATEGORIES } from './categories';
export { FISH_SEAFOOD_ITEMS } from './fishSeafood';
export { MEAT_POULTRY_ITEMS } from './meatPoultry';
export { DAIRY_ITEMS } from './dairy';
export { VEGETABLE_ITEMS } from './vegetables';

export const ALL_FOOD_ITEMS: FoodItem[] = [
  ...FISH_SEAFOOD_ITEMS,
  ...MEAT_POULTRY_ITEMS,
  ...DAIRY_ITEMS,
  ...VEGETABLE_ITEMS,
];

export const FOOD_ITEMS_BY_CATEGORY: Record<CategoryId, FoodItem[]> = {
  fish_seafood: FISH_SEAFOOD_ITEMS,
  meat_poultry: MEAT_POULTRY_ITEMS,
  dairy: DAIRY_ITEMS,
  vegetables: VEGETABLE_ITEMS,
};

export function getFoodItemById(id: string): FoodItem | undefined {
  return ALL_FOOD_ITEMS.find((item) => item.id === id);
}

export function getFoodItemsByCategory(categoryId: CategoryId): FoodItem[] {
  return FOOD_ITEMS_BY_CATEGORY[categoryId] || [];
}

export function searchFoodItems(query: string): FoodItem[] {
  const q = query.trim().toLowerCase();
  if (!q) return ALL_FOOD_ITEMS;

  return ALL_FOOD_ITEMS.filter((item) => {
    return (
      item.nameEn.toLowerCase().includes(q) ||
      item.nameBn.includes(q) ||
      item.recipe.titleEn.toLowerCase().includes(q) ||
      item.recipe.titleBn.includes(q) ||
      item.commonAliases?.some((alias) => alias.toLowerCase().includes(q))
    );
  });
}
