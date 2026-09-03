import React from 'react';
import {
  Clock,
  Flame,
  ChefHat,
  HeartPulse,
  Scale,
  Sparkles,
  CheckCircle2,
  Copy,
  Check,
  Printer,
  ShieldCheck,
  Activity,
  Plus,
  Minus,
} from 'lucide-react';
import { FoodItem, CategoryId } from '../types';
import { getStepTranslation } from '../data/stepTranslations';
import { getChefTipTranslation } from '../data/chefTipTranslations';

const CATEGORY_INDEX_CODE: Record<CategoryId, string> = {
  fish_seafood: '01',
  meat_poultry: '02',
  dairy: '03',
  vegetables: '04',
};

interface FoodDetailViewProps {
  foodItem: FoodItem;
}

export const FoodDetailView: React.FC<FoodDetailViewProps> = ({ foodItem }) => {
  const { recipe, foodValue } = foodItem;

  // Servings state (scaled from default recipe.servings)
  const [servings, setServings] = React.useState(recipe.servings);
  const [completedSteps, setCompletedSteps] = React.useState<Record<number, boolean>>({});
  const [copied, setCopied] = React.useState(false);

  // Reset checked items when foodItem changes
  React.useEffect(() => {
    setServings(recipe.servings);
    setCompletedSteps({});
  }, [foodItem.id, recipe.servings]);

  const scaleFactor = servings / recipe.servings;

  const toggleStep = (idx: number) => {
    setCompletedSteps((prev) => ({ ...prev, [idx]: !prev[idx] }));
  };

  const handleCopyRecipe = () => {
    const text = `
Recipe: ${recipe.titleEn} (${recipe.titleBn})
Principal Ingredient: ${foodItem.nameEn} (${foodItem.nameBn})
Prep Time: ${recipe.prepTimeMinutes} mins | Cook Time: ${recipe.cookTimeMinutes} mins | Total: ${recipe.totalTimeMinutes} mins
Servings: ${servings}

INGREDIENTS:
${recipe.ingredients
  .map(
    (ing) =>
      `- ${(ing.amount * scaleFactor).toFixed(ing.amount % 1 === 0 && scaleFactor === 1 ? 0 : 1)} ${ing.unit} ${ing.itemEn} ${
        ing.itemBn ? `(${ing.itemBn})` : ''
      }`
  )
  .join('\n')}

INSTRUCTIONS:
${recipe.instructions
  .map((st, idx) => {
    const stepTrans = getStepTranslation(foodItem.id, idx, st.instruction, st.title);
    const bnInst = st.instructionBn || stepTrans.instructionBn;
    return `Step ${st.step}: ${st.title ? `${st.title} - ` : ''}${st.instruction}${bnInst ? `\n   (${bnInst})` : ''}`;
  })
  .join('\n\n')}
${recipe.chefTips && recipe.chefTips.length > 0 ? `\nCHEF'S AUTHENTIC SECRETS:\n${recipe.chefTips.map((tip, i) => {
  const tipBn = getChefTipTranslation(foodItem.id, i);
  return `- ${tip}${tipBn ? `\n   (${tipBn})` : ''}`;
}).join('\n')}\n` : ''}
ESSENTIAL FOOD VALUE (per ${foodValue.servingSize}):
Calories: ${foodValue.macros.calories} kcal | Protein: ${foodValue.macros.protein}g | Carbs: ${foodValue.macros.carbohydrates}g | Fat: ${foodValue.macros.fat}g
Key Vitamins: ${foodValue.keyVitamins.join(', ')}
Key Minerals: ${foodValue.keyMinerals.join(', ')}
`.trim();

    navigator.clipboard.writeText(text);
    setCopied(true);
    setTimeout(() => setCopied(false), 2000);
  };

  const handlePrint = () => {
    window.print();
  };

  // Macro percentages calculation for visual bar
  const totalMacroGrams =
    foodValue.macros.protein +
    foodValue.macros.fat +
    foodValue.macros.carbohydrates +
    (foodValue.macros.fiber || 0);

  const proteinPercent = totalMacroGrams > 0 ? Math.round((foodValue.macros.protein / totalMacroGrams) * 100) : 0;
  const fatPercent = totalMacroGrams > 0 ? Math.round((foodValue.macros.fat / totalMacroGrams) * 100) : 0;
  const carbPercent = totalMacroGrams > 0 ? Math.round((foodValue.macros.carbohydrates / totalMacroGrams) * 100) : 0;

  return (
    <div className="space-y-8">

      {/* ============================================================ */}
      {/* 1. PRINCIPAL ITEM HERO & DELIVERABLE #2: TIME METRICS        */}
      {/* ============================================================ */}
      <div className="bg-[#FBF9F6] text-[#1D1D1B] rounded-xs border border-[#1D1D1B] shadow-xs overflow-hidden">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-0">
          
          {/* Left Column: Principal Food Hero (7 cols) */}
          <div className="lg:col-span-7 p-6 sm:p-9 sm:pr-10 relative flex flex-col justify-between">
            {/* Watermark decorative index number */}
            <span className="absolute -left-2 -top-4 sm:-left-3 sm:-top-6 text-[100px] sm:text-[140px] font-serif font-black text-[#EAE4D8] pointer-events-none select-none -z-0 leading-none">
              {CATEGORY_INDEX_CODE[foodItem.categoryId] || '01'}
            </span>

            <div className="relative z-10">
              {/* Eyebrows */}
              <div className="flex items-center gap-3 mb-3">
                <span className="w-7 h-px bg-[#1D1D1B]" />
                <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-bold text-[#C25E44]">
                  Principal Ingredient
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#1D1D1B]/5 border border-[#1D1D1B]/15 text-[#4A4540] font-mono capitalize">
                  {foodItem.categoryId.replace('_', ' & ')}
                </span>
              </div>

              {/* Title & Bangla in Editorial Display Type */}
              <h1 className="text-3xl sm:text-5xl lg:text-6xl font-serif font-black tracking-tight text-[#1D1D1B] mb-2 leading-tight flex flex-wrap items-baseline gap-2.5 sm:gap-4">
                <span>{foodItem.nameEn}</span>
                <span className="font-bengali font-bold text-2xl sm:text-4xl lg:text-5xl text-emerald-600">
                  ({foodItem.nameBn})
                </span>
              </h1>

              <p className="text-xl sm:text-2xl text-[#C25E44] font-serif italic mb-4">
                {recipe.titleEn}{' '}
                <span className="text-lg sm:text-xl font-bengali font-semibold text-emerald-600">
                  ({recipe.titleBn})
                </span>
              </p>

              <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed max-w-xl font-sans">
                {recipe.description}
              </p>
            </div>

            {/* Quick Action Buttons (Copy, Print) */}
            <div className="relative z-10 flex items-center gap-2.5 mt-6 pt-5 border-t border-[#1D1D1B]/15">
              <button
                type="button"
                onClick={handleCopyRecipe}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-[#1D1D1B] hover:bg-[#C25E44] text-xs font-sans font-bold uppercase tracking-wider text-white transition-colors shadow-2xs"
                title="Copy recipe and nutritional details to clipboard"
              >
                {copied ? <Check className="w-3.5 h-3.5 text-[#EAE4D8]" /> : <Copy className="w-3.5 h-3.5" />}
                <span>{copied ? 'Copied to Clipboard' : 'Copy Recipe'}</span>
              </button>
              <button
                type="button"
                onClick={handlePrint}
                className="inline-flex items-center gap-2 px-3.5 py-2 rounded-xs bg-white hover:bg-[#F2EDE4] text-xs font-sans font-bold uppercase tracking-wider text-[#1D1D1B] border border-[#1D1D1B]/30 transition-colors shadow-2xs"
                title="Print recipe for kitchen use"
              >
                <Printer className="w-3.5 h-3.5" />
                <span>Print Guide</span>
              </button>
            </div>
          </div>

          {/* Right Column: Signature Terracotta Time Metrics Block (5 cols) */}
          <div className="lg:col-span-5 border-t lg:border-t-0 lg:border-l border-[#1D1D1B] flex flex-col">
            
            {/* Top half: Terracotta Block with High-Contrast Typography */}
            <div className="p-6 sm:p-8 bg-[#C25E44] text-white flex-1 flex flex-col justify-center">
              <div className="flex items-center justify-between gap-2 mb-3">
                <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-white/80">
                  Time Metrics <span className="font-bengali text-emerald-200 text-xs sm:text-sm font-semibold tracking-normal ml-1">(রান্নার সময়কাল)</span>
                </span>
                <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-white/15 border border-white/20 font-mono font-medium">
                  {recipe.difficulty}
                </span>
              </div>

              <div className="flex items-baseline gap-2 mb-4">
                <span className="text-5xl sm:text-6xl font-serif font-black tracking-tight text-white leading-none">
                  {recipe.totalTimeMinutes}
                </span>
                <span className="text-xl sm:text-2xl font-serif italic text-white/90">minutes total</span>
              </div>

              <div className="grid grid-cols-2 gap-4 text-xs border-t border-white/25 pt-4">
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 font-sans font-bold mb-0.5">
                    Prep Time
                  </p>
                  <p className="text-base font-serif font-bold text-white">{recipe.prepTimeMinutes} Minutes</p>
                </div>
                <div>
                  <p className="text-[10px] uppercase tracking-widest text-white/70 font-sans font-bold mb-0.5">
                    Cook Time
                  </p>
                  <p className="text-base font-serif font-bold text-white">{recipe.cookTimeMinutes} Minutes</p>
                </div>
              </div>
            </div>

            {/* Bottom half: Culinary Heritage & Cuisine Note */}
            <div className="p-5 sm:p-6 bg-[#F2EDE4] text-[#1D1D1B] border-t border-[#1D1D1B] flex items-center justify-between gap-3">
              <div>
                <span className="text-[10px] uppercase tracking-widest text-[#8A847C] font-sans font-bold block mb-0.5">
                  Culinary Heritage & Style
                </span>
                <p className="font-serif font-bold text-sm text-[#1D1D1B]">
                  {recipe.cuisineType}
                </p>
              </div>
              <div className="w-10 h-10 rounded-full bg-[#1D1D1B] text-white flex items-center justify-center font-serif text-sm font-bold shrink-0">
                {foodItem.nameEn.charAt(0)}
              </div>
            </div>

          </div>

        </div>
      </div>

      {/* ============================================================ */}
      {/* 2. DELIVERABLE #3: ESSENTIAL FOOD VALUE (NUTRITIONAL VALUE)  */}
      {/* ============================================================ */}
      <section className="bg-[#FBF9F6] rounded-xs border border-[#1D1D1B] p-6 sm:p-8 shadow-xs">
        
        {/* Section Header with Artistic Flair Rules */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-6 border-b border-[#1D1D1B]/20">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-px bg-[#C25E44]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#C25E44]">
                Nutritional Assessment
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1D1D1B] flex flex-wrap items-baseline gap-2">
              <span>Essential Food Value of {foodItem.nameEn}</span>
              <span className="text-sm font-bengali text-emerald-600 font-semibold">
                (পুষ্টিমান ও খাদ্য উপাদান)
              </span>
            </h2>
          </div>

          <div className="flex items-center gap-2 text-[11px] font-mono uppercase tracking-wider text-[#4A4540] bg-[#F2EDE4] border border-[#1D1D1B]/20 px-3 py-1.5 rounded-xs self-start sm:self-auto font-bold">
            <Scale className="w-3.5 h-3.5 text-[#C25E44]" />
            <span>Serving Basis: {foodValue.servingSize}</span>
          </div>
        </div>

        {/* Editorial Rule-Line Macro Grid matching Artistic Flair design */}
        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 sm:gap-6 mb-7">
          <div className="border-b-2 border-[#1D1D1B] pb-2.5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8A847C] block mb-1">
              Energy / Calories
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-[#1D1D1B]">
                {foodValue.macros.calories}
              </span>
              <span className="text-xs font-serif italic text-[#8A847C]">kcal</span>
            </div>
            <span className="text-[10px] text-[#8A847C] mt-1 font-sans">per {foodValue.servingSize}</span>
          </div>

          <div className="border-b-2 border-[#1D1D1B] pb-2.5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8A847C] block mb-1">
              Protein
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-[#1D1D1B]">
                {foodValue.macros.protein}
              </span>
              <span className="text-xs font-serif italic text-[#8A847C]">grams</span>
            </div>
            <span className="text-[10px] text-[#C25E44] font-semibold mt-1 font-sans">{proteinPercent}% solid share</span>
          </div>

          <div className="border-b-2 border-[#1D1D1B] pb-2.5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8A847C] block mb-1">
              Carbohydrates
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-[#1D1D1B]">
                {foodValue.macros.carbohydrates}
              </span>
              <span className="text-xs font-serif italic text-[#8A847C]">grams</span>
            </div>
            <span className="text-[10px] text-[#8A847C] mt-1 font-sans">
              {foodValue.macros.fiber ? `Fiber: ${foodValue.macros.fiber}g` : `${carbPercent}% solid share`}
            </span>
          </div>

          <div className="border-b-2 border-[#1D1D1B] pb-2.5 flex flex-col justify-between">
            <span className="text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8A847C] block mb-1">
              Healthy Fats
            </span>
            <div className="flex items-baseline gap-1.5">
              <span className="text-3xl sm:text-4xl font-serif font-black text-[#1D1D1B]">
                {foodValue.macros.fat}
              </span>
              <span className="text-xs font-serif italic text-[#8A847C]">grams</span>
            </div>
            <span className="text-[10px] text-[#C25E44] font-semibold mt-1 font-sans">
              {foodItem.foodValue.omega3 ? `Omega-3: ${foodItem.foodValue.omega3}` : `${fatPercent}% solid share`}
            </span>
          </div>
        </div>

        {/* Editorial Macro Distribution Progress Bar */}
        {totalMacroGrams > 0 && (
          <div className="mb-7 p-3.5 bg-[#F2EDE4] rounded-xs border border-[#1D1D1B]/20">
            <div className="flex justify-between items-center text-xs font-sans font-bold text-[#1D1D1B] mb-2 uppercase tracking-wider">
              <span>Macronutrient Balance</span>
              <span className="text-[11px] font-mono text-[#4A4540]">
                Protein {proteinPercent}% • Carbs {carbPercent}% • Fat {fatPercent}%
              </span>
            </div>
            <div className="w-full h-2 rounded-xs overflow-hidden flex bg-[#EAE4D8]">
              <div style={{ width: `${proteinPercent}%` }} className="bg-[#1D1D1B] transition-all" title={`Protein: ${proteinPercent}%`} />
              <div style={{ width: `${carbPercent}%` }} className="bg-[#C25E44] transition-all" title={`Carbohydrates: ${carbPercent}%`} />
              <div style={{ width: `${fatPercent}%` }} className="bg-[#8A847C] transition-all" title={`Fats: ${fatPercent}%`} />
            </div>
          </div>
        )}

        {/* 3 Columns: Vitamins, Minerals & Therapeutic Benefits */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
          {/* Key Vitamins */}
          <div className="bg-[#F2EDE4] rounded-xs p-5 border border-[#1D1D1B]/20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1D1D1B] flex items-center gap-2 mb-3 pb-2 border-b border-[#1D1D1B]/15 font-sans">
              <Sparkles className="w-3.5 h-3.5 text-[#C25E44]" />
              <span>Key Vitamins</span>
            </h3>
            <ul className="space-y-2">
              {foodValue.keyVitamins.map((vit, i) => (
                <li key={i} className="text-xs text-[#4A4540] flex items-start gap-2 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25E44] mt-1.5 shrink-0" />
                  <span>{vit}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Key Minerals */}
          <div className="bg-[#F2EDE4] rounded-xs p-5 border border-[#1D1D1B]/20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#1D1D1B] flex items-center gap-2 mb-3 pb-2 border-b border-[#1D1D1B]/15 font-sans">
              <ShieldCheck className="w-3.5 h-3.5 text-[#1D1D1B]" />
              <span>Key Minerals</span>
            </h3>
            <ul className="space-y-2">
              {foodValue.keyMinerals.map((min, i) => (
                <li key={i} className="text-xs text-[#4A4540] flex items-start gap-2 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#1D1D1B] mt-1.5 shrink-0" />
                  <span>{min}</span>
                </li>
              ))}
            </ul>
          </div>

          {/* Health Benefits */}
          <div className="bg-[#F2EDE4] rounded-xs p-5 border border-[#1D1D1B]/20">
            <h3 className="text-xs font-bold uppercase tracking-[0.2em] text-[#C25E44] flex items-center gap-2 mb-3 pb-2 border-b border-[#1D1D1B]/15 font-sans">
              <HeartPulse className="w-3.5 h-3.5 text-[#C25E44]" />
              <span>Health Benefits</span>
            </h3>
            <ul className="space-y-2.5">
              {foodValue.healthBenefits.map((benefit, i) => (
                <li key={i} className="text-xs text-[#4A4540] leading-relaxed flex items-start gap-2 font-sans">
                  <span className="w-1.5 h-1.5 rounded-full bg-[#C25E44] mt-1.5 shrink-0" />
                  <span>{benefit}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </section>

      {/* ============================================================ */}
      {/* 3. DELIVERABLE #1: RECIPE WITH SELECTED ITEM AS MAJOR INGREDIENT */}
      {/* ============================================================ */}
      <section className="bg-[#FBF9F6] rounded-xs border border-[#1D1D1B] p-6 sm:p-8 shadow-xs">
        
        {/* Recipe Title & Servings Scaler Header */}
        <div className="pb-5 mb-6 border-b border-[#1D1D1B]/20 flex flex-col md:flex-row md:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1.5">
              <span className="w-5 h-px bg-[#1D1D1B]" />
              <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#C25E44]">
                Authentic Heritage Recipe
              </span>
            </div>
            <h2 className="font-serif text-2xl sm:text-3xl font-black text-[#1D1D1B] flex flex-wrap items-baseline gap-2">
              <span>{recipe.titleEn}</span>
              <span className="text-xl font-bengali text-emerald-600 font-semibold">
                ({recipe.titleBn})
              </span>
            </h2>
          </div>

          {/* Servings Scaler with Editorial Steppers */}
          <div className="bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs p-3 flex items-center gap-3 shrink-0 self-start md:self-center shadow-2xs">
            <div>
              <div className="text-[9px] font-bold text-[#8A847C] uppercase tracking-widest font-sans">Servings</div>
              <div className="text-base font-serif font-black text-[#1D1D1B]">{servings} portions</div>
            </div>
            <div className="flex items-center gap-1.5">
              <button
                type="button"
                onClick={() => setServings((s) => Math.max(1, s - 1))}
                disabled={servings <= 1}
                className="w-8 h-8 rounded-xs bg-white border border-[#1D1D1B]/30 flex items-center justify-center text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white disabled:opacity-40 transition-colors shadow-2xs"
                title="Decrease servings"
              >
                <Minus className="w-3.5 h-3.5" />
              </button>
              <button
                type="button"
                onClick={() => setServings((s) => Math.min(12, s + 1))}
                disabled={servings >= 12}
                className="w-8 h-8 rounded-xs bg-white border border-[#1D1D1B]/30 flex items-center justify-center text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white disabled:opacity-40 transition-colors shadow-2xs"
                title="Increase servings"
              >
                <Plus className="w-3.5 h-3.5" />
              </button>
            </div>
          </div>
        </div>

        {/* 2-Column Layout: Ingredients & Quick Timer on Left, Step Instructions on Right */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-7 items-start">
          
          {/* Left Column: Ingredients Checklist + Timer (5 cols) */}
          <div className="lg:col-span-5 space-y-6">
            
            {/* Ingredients Checklist */}
            <div className="bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs p-5">
              <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-[#1D1D1B]/15">
                <h3 className="font-serif font-bold text-base text-[#1D1D1B] flex items-center gap-1.5">
                  <span>Ingredients</span>
                  <span className="text-sm font-bengali font-semibold text-emerald-600">
                    (উপকরণ)
                  </span>
                </h3>
                <span className="text-[10px] font-mono uppercase tracking-wider text-[#C25E44] font-bold bg-white/80 px-2 py-0.5 rounded-xs border border-[#1D1D1B]/15">
                  x{servings} Portions
                </span>
              </div>

              <ul className="space-y-2">
                {recipe.ingredients.map((ing, idx) => {
                  const scaledAmount = ing.amount * scaleFactor;
                  const formattedAmount =
                    scaledAmount % 1 === 0
                      ? scaledAmount.toFixed(0)
                      : scaledAmount.toFixed(1).replace(/\.0$/, '');

                  return (
                    <li
                      key={idx}
                      className="p-2.5 rounded-xs bg-white text-[#1D1D1B] border border-[#1D1D1B]/20 flex items-start"
                    >
                      <div className="text-xs leading-relaxed flex-1 font-sans">
                        <span className="font-bold text-[#1D1D1B]">
                          {formattedAmount} {ing.unit}
                        </span>{' '}
                        <span className="font-serif text-[13px]">{ing.itemEn}</span>
                        {ing.itemBn && (
                          <span className="text-emerald-600 font-bengali ml-1 font-semibold">
                            ({ing.itemBn})
                          </span>
                        )}
                        {ing.notes && (
                          <span className="text-[10px] text-[#8A847C] italic block font-sans">
                            Note: {ing.notes}
                          </span>
                        )}
                      </div>
                    </li>
                  );
                })}
              </ul>
            </div>

          </div>

          {/* Right Column: Step-by-Step Cooking Instructions (7 cols) */}
          <div className="lg:col-span-7 space-y-4">
            <div className="flex items-center justify-between gap-2 pb-2.5 border-b border-[#1D1D1B]/20">
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B] flex items-center gap-2">
                <span>Cooking Steps & Technique</span>
                <span className="text-sm font-bengali font-semibold text-emerald-600">
                  (প্রণালী)
                </span>
              </h3>
              <span className="text-[11px] font-mono uppercase tracking-wider text-[#4A4540] font-bold">
                {Object.values(completedSteps).filter(Boolean).length} / {recipe.instructions.length} Completed
              </span>
            </div>

            {/* Instruction cards with editorial styling */}
            <div className="space-y-3.5">
              {recipe.instructions.map((st, idx) => {
                const isStepDone = completedSteps[idx];
                const stepTrans = getStepTranslation(foodItem.id, idx, st.instruction, st.title);
                const displayInstructionBn = st.instructionBn || stepTrans.instructionBn;
                const displayTitleBn = st.titleBn || stepTrans.titleBn;

                return (
                  <div
                    key={st.step}
                    id={`instruction-step-${st.step}`}
                    onClick={() => toggleStep(idx)}
                    className={`rounded-xs p-4 border transition-all cursor-pointer ${
                      isStepDone
                        ? 'bg-[#F2EDE4]/80 border-[#1D1D1B] shadow-2xs'
                        : 'bg-white border-[#1D1D1B]/20 hover:border-[#1D1D1B] shadow-2xs'
                    }`}
                  >
                    <div className="flex items-start gap-3.5">
                      <div
                        className={`w-7 h-7 rounded-xs flex items-center justify-center font-serif font-black text-xs shrink-0 transition-colors ${
                          isStepDone
                            ? 'bg-[#C25E44] text-white'
                            : 'bg-[#1D1D1B] text-white'
                        }`}
                      >
                        {isStepDone ? <Check className="w-4 h-4" /> : st.step}
                      </div>

                      <div className="flex-1 min-w-0">
                        <div className="flex items-center justify-between gap-2 mb-1.5">
                          {st.title && (
                            <h4 className="font-serif font-bold text-base text-[#1D1D1B] flex flex-wrap items-baseline gap-2">
                              <span>{st.title}</span>
                              {displayTitleBn && (
                                <span className="text-xs sm:text-sm font-bengali font-semibold text-emerald-600">
                                  ({displayTitleBn})
                                </span>
                              )}
                            </h4>
                          )}
                          {st.durationMinutes && (
                            <span className="text-[10px] font-mono font-bold text-[#C25E44] bg-[#F2EDE4] border border-[#1D1D1B]/15 px-2 py-0.5 rounded-xs shrink-0">
                              ~{st.durationMinutes} mins
                            </span>
                          )}
                        </div>

                        {/* English instruction sentence */}
                        <p className="text-xs sm:text-sm text-[#4A4540] leading-relaxed font-sans">
                          {st.instruction}
                        </p>

                        {/* Bangla Translation under the English sentence */}
                        {displayInstructionBn && (
                          <p className="text-sm sm:text-[15px] text-emerald-600 font-bengali font-semibold mt-2 leading-relaxed">
                            {displayInstructionBn}
                          </p>
                        )}

                        {st.tip && (
                          <div className="mt-2.5 p-2.5 bg-[#F2EDE4] rounded-xs border-l-2 border-[#C25E44] text-[11px] text-[#1D1D1B] flex items-start gap-2 font-sans">
                            <Sparkles className="w-3.5 h-3.5 text-[#C25E44] shrink-0 mt-0.5" />
                            <span><strong>Technique Note:</strong> {st.tip}</span>
                          </div>
                        )}
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Chef's Pro Tips in Oat Linen Box */}
            {recipe.chefTips && recipe.chefTips.length > 0 && (
              <div className="mt-6 p-5 bg-[#F2EDE4] border border-[#1D1D1B] rounded-xs">
                <h4 className="text-xs font-bold uppercase tracking-[0.25em] text-[#C25E44] flex flex-wrap items-center gap-2 mb-3 font-sans">
                  <ChefHat className="w-4 h-4 text-[#C25E44]" />
                  <span>Chef's Authentic Secrets</span>
                  <span className="font-bengali font-semibold text-emerald-600 tracking-normal normal-case text-xs sm:text-sm">
                    (শেফের বিশেষ পরামর্শ)
                  </span>
                </h4>
                <ul className="space-y-3">
                  {recipe.chefTips.map((tip, i) => {
                    const tipBn = getChefTipTranslation(foodItem.id, i);
                    return (
                      <li key={i} className="text-xs text-[#4A4540] flex items-start gap-2.5 font-sans leading-relaxed">
                        <span className="w-1.5 h-1.5 rounded-full bg-[#C25E44] mt-1.5 shrink-0" />
                        <div className="flex-1">
                          <p className="text-xs sm:text-[13px] text-[#1D1D1B] leading-relaxed">
                            {tip}
                          </p>
                          {tipBn && (
                            <p className="text-xs sm:text-[13px] font-bengali font-semibold text-emerald-600 mt-1 leading-relaxed">
                              {tipBn}
                            </p>
                          )}
                        </div>
                      </li>
                    );
                  })}
                </ul>
              </div>
            )}

          </div>

        </div>

      </section>

    </div>
  );
};
