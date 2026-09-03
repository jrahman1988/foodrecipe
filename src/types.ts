export type CategoryId = 'fish_seafood' | 'meat_poultry' | 'dairy' | 'vegetables';

export interface CategoryInfo {
  id: CategoryId;
  nameEn: string;
  nameBn: string;
  iconName: string;
  description: string;
  count: number;
}

export interface MacroNutrients {
  calories: number; // kcal
  protein: number; // g
  carbohydrates: number; // g
  fat: number; // g
  fiber?: number; // g
}

export interface FoodValue {
  servingSize: string; // e.g., "100g raw edible portion"
  macros: MacroNutrients;
  keyVitamins: string[];
  keyMinerals: string[];
  healthBenefits: string[];
  glycemicIndex?: string;
  cholesterol?: string;
  omega3?: string;
}

export interface RecipeIngredient {
  itemEn: string;
  itemBn?: string;
  amount: number;
  unit: string;
  notes?: string;
}

export interface CookingInstruction {
  step: number;
  title?: string;
  titleBn?: string;
  instruction: string;
  instructionBn?: string;
  tip?: string;
  durationMinutes?: number;
}

export interface Recipe {
  titleEn: string;
  titleBn: string;
  description: string;
  prepTimeMinutes: number;
  cookTimeMinutes: number;
  totalTimeMinutes: number;
  servings: number;
  difficulty: 'Easy' | 'Medium' | 'Advanced';
  cuisineType: string;
  ingredients: RecipeIngredient[];
  instructions: CookingInstruction[];
  chefTips: string[];
}

export interface FoodItem {
  id: string;
  categoryId: CategoryId;
  nameEn: string;
  nameBn: string;
  commonAliases?: string[];
  foodValue: FoodValue;
  recipe: Recipe;
}
