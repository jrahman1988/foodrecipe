import React from 'react';
import { Fish, Beef, Milk, Carrot, ChevronDown, CheckCircle2, Sparkles } from 'lucide-react';
import { CategoryId, CategoryInfo, FoodItem } from '../types';
import { FOOD_ITEMS_BY_CATEGORY } from '../data/foodItems';

interface CategoryDropdownsProps {
  categories: CategoryInfo[];
  selectedItem: FoodItem;
  onSelectItem: (item: FoodItem) => void;
}

const CATEGORY_ICONS: Record<CategoryId, React.ElementType> = {
  fish_seafood: Fish,
  meat_poultry: Beef,
  dairy: Milk,
  vegetables: Carrot,
};

const CATEGORY_NUMBERS: Record<CategoryId, string> = {
  fish_seafood: '01',
  meat_poultry: '02',
  dairy: '03',
  vegetables: '04',
};

export const CategoryDropdowns: React.FC<CategoryDropdownsProps> = ({
  categories,
  selectedItem,
  onSelectItem,
}) => {
  return (
    <section className="bg-[#F2EDE4] rounded-xs border border-[#1D1D1B] p-5 sm:p-7 mb-8 shadow-xs">
      
      {/* Header section with editorial hierarchy */}
      <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 pb-5 mb-5 border-b border-[#1D1D1B]/20">
        <div>
          <div className="flex items-center gap-2 mb-1.5">
            <span className="w-5 h-px bg-[#C25E44]" />
            <span className="text-[10px] uppercase tracking-[0.3em] font-sans font-bold text-[#C25E44]">
              Select Principal Ingredient
            </span>
          </div>
          <h2 className="font-serif text-xl sm:text-2xl font-black text-[#1D1D1B] flex flex-wrap items-baseline gap-2">
            <span>Recipe of Common Foods and their Food Value</span>
            <span className="text-base sm:text-lg font-bengali text-emerald-600 font-semibold">
              (সাধারণ খাদ্যের রন্ধন প্রণালী ও পুষ্টিমান)
            </span>
          </h2>
          <p className="text-xs sm:text-sm text-[#4A4540] mt-1 font-sans">
            Choose any staple ingredient below to reveal its authentic heritage recipe, precise timing, and essential food value.
          </p>
          <p className="text-xs sm:text-sm font-bengali text-emerald-600 font-semibold mt-1 leading-relaxed">
            ঐতিহ্যবাহী খাঁটি রন্ধন প্রণালী, রান্নার সঠিক সময় এবং প্রয়োজনীয় পুষ্টিমান জানতে নিচে যেকোনো সাধারণ খাদ্য উপাদান নির্বাচন করুন।
          </p>
        </div>

        {/* Currently Selected Pill */}
        <div className="flex items-center gap-2 self-start sm:self-center shrink-0">
          <span className="text-[10px] uppercase tracking-widest text-[#8A847C] font-sans font-bold">Selected:</span>
          <span className="inline-flex items-center gap-2 text-xs font-semibold px-3 py-1.5 rounded-xs bg-[#1D1D1B] text-white shadow-xs font-sans">
            <span className="w-1.5 h-1.5 rounded-full bg-[#C25E44]" />
            <span className="font-serif font-bold text-sm text-[#FBF9F6]">{selectedItem.nameEn}</span>
            <span className="font-bengali text-sm font-semibold text-emerald-400">({selectedItem.nameBn})</span>
          </span>
        </div>
      </div>

      {/* 4 Category Dropdown Cards Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
        {categories.map((cat) => {
          const Icon = CATEGORY_ICONS[cat.id];
          const numberCode = CATEGORY_NUMBERS[cat.id];
          const items = FOOD_ITEMS_BY_CATEGORY[cat.id];
          const isCurrentCategory = selectedItem.categoryId === cat.id;

          return (
            <div
              key={cat.id}
              id={`category-card-${cat.id}`}
              className={`rounded-xs p-4 border transition-all duration-200 bg-[#FBF9F6] relative overflow-hidden ${
                isCurrentCategory
                  ? 'border-2 border-[#1D1D1B] shadow-xs'
                  : 'border border-[#1D1D1B]/20 hover:border-[#1D1D1B]/60'
              }`}
            >
              {/* Category Number Accent */}
              <span className="absolute -right-1 -top-3 text-4xl font-serif font-bold text-[#EAE4D8] pointer-events-none select-none">
                {numberCode}
              </span>

              {/* Category Header with Icon and Badge */}
              <div className="flex items-center justify-between gap-2 mb-3 relative z-10">
                <div className="flex items-center gap-2.5 min-w-0">
                  <div
                    className={`w-8 h-8 rounded-xs flex items-center justify-center shrink-0 border ${
                      isCurrentCategory
                        ? 'bg-[#1D1D1B] text-[#FBF9F6] border-[#1D1D1B]'
                        : 'bg-white text-[#1D1D1B] border-[#1D1D1B]/20'
                    }`}
                  >
                    <Icon className="w-4 h-4" />
                  </div>
                  <div className="min-w-0">
                    <h3 className="font-serif font-bold text-sm text-[#1D1D1B] truncate">
                      {cat.nameEn}
                    </h3>
                    <p className="text-sm font-bengali font-semibold text-emerald-600 truncate">
                      {cat.nameBn}
                    </p>
                  </div>
                </div>

                <span className="text-[10px] font-mono uppercase tracking-wider px-1.5 py-0.5 rounded-xs bg-[#1D1D1B]/5 border border-[#1D1D1B]/15 text-[#4A4540] shrink-0 font-medium">
                  {items.length}
                </span>
              </div>

              {/* Dedicated Category Dropdown List */}
              <div className="relative mt-2">
                <label
                  htmlFor={`dropdown-${cat.id}`}
                  className="block text-[10px] uppercase tracking-[0.2em] font-sans font-bold text-[#8A847C] mb-1.5"
                >
                  {cat.nameEn} Dropdown
                </label>
                <div className="relative">
                  <select
                    id={`dropdown-${cat.id}`}
                    value={isCurrentCategory ? selectedItem.id : ''}
                    onChange={(e) => {
                      const found = items.find((i) => i.id === e.target.value);
                      if (found) onSelectItem(found);
                    }}
                    className={`w-full appearance-none pl-3 pr-8 py-2 bg-white border rounded-xs text-sm font-serif font-medium text-[#1D1D1B] cursor-pointer shadow-2xs focus:outline-none transition-all ${
                      isCurrentCategory
                        ? 'border-[#1D1D1B] ring-1 ring-[#1D1D1B]'
                        : 'border-[#1D1D1B]/25 hover:border-[#1D1D1B]/60'
                    }`}
                  >
                    <option value="" disabled>
                      Select an item... ({items.length})
                    </option>
                    {items.map((item) => (
                      <option key={item.id} value={item.id}>
                        {item.nameEn} ({item.nameBn})
                      </option>
                    ))}
                  </select>
                  <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2.5 text-[#1D1D1B]">
                    <ChevronDown className="w-4 h-4" />
                  </div>
                </div>
              </div>

              {/* Quick-select chips / pills for top items */}
              <div className="mt-3 pt-2.5 border-t border-[#1D1D1B]/10 flex flex-wrap gap-1">
                <span className="text-[9px] uppercase tracking-wider text-[#8A847C] w-full mb-0.5 font-sans font-semibold">
                  Quick Pick:
                </span>
                {items.slice(0, 3).map((item) => {
                  const isItemActive = selectedItem.id === item.id;
                  return (
                    <button
                      key={item.id}
                      type="button"
                      id={`quick-pick-${item.id}`}
                      onClick={() => onSelectItem(item)}
                      className={`text-xs px-2 py-1 rounded-xs transition-all font-sans whitespace-nowrap ${
                        isItemActive
                          ? 'bg-[#C25E44] text-white font-bold shadow-2xs'
                          : 'bg-white text-[#1D1D1B] hover:bg-[#F2EDE4] border border-[#1D1D1B]/20 font-medium'
                      }`}
                    >
                      {item.nameEn}
                    </button>
                  );
                })}
              </div>

            </div>
          );
        })}
      </div>

    </section>
  );
};
