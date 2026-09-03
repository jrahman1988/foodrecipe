import React, { useState, useEffect } from 'react';
import {
  X,
  Printer,
  BookOpen,
  Search,
  Utensils,
  Clock,
  HeartPulse,
  ChefHat,
  Share2,
  Check,
  Languages,
} from 'lucide-react';

interface UserGuideModalProps {
  isOpen: boolean;
  onClose: () => void;
}

type LanguageTab = 'bilingual' | 'en' | 'bn';

export const UserGuideModal: React.FC<UserGuideModalProps> = ({ isOpen, onClose }) => {
  const [activeTab, setActiveTab] = useState<LanguageTab>('bilingual');
  const [copied, setCopied] = useState(false);

  // Close on Escape key
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isOpen) {
        onClose();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isOpen, onClose]);

  // Prevent background scrolling when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handlePrint = () => {
    window.print();
  };

  const handleCopyGuide = () => {
    const guideText = `RECIPE OF COMMON FOODS AND THEIR FOOD VALUE - USER GUIDE
খাদ্য ও পুষ্টি নির্দেশিকা - ব্যবহারকারী সহায়িকা

1. OVERVIEW / পরিচিতি
A comprehensive culinary reference featuring 51 staple Bengali food items across 4 categories with heritage recipes, cooking times, nutritional profiles, and chef's secrets.
বাঙালি সংস্কৃতির বহুল ব্যবহৃত ৫১টি সাধারণ খাদ্য উপাদানের ঐতিহ্যবাহী রন্ধন প্রণালী, পুষ্টিমান এবং শেফের বিশেষ পরামর্শের একটি পূর্ণাঙ্গ গাইড।

2. SELECTING INGREDIENTS / খাদ্য উপাদান নির্বাচন
- Choose a category: Fish & Seafood (11 items), Meat & Poultry (8 items), Dairy (8 items), or Vegetables (24 items).
- Use the category dropdown or Quick Pick shortcut buttons.
- Search instantly in English or Bangla (e.g., 'Hilsa' or 'ইলিশ').

3. COOKING METRICS & STEPS / রান্নার সময়কাল ও প্রণালী
- Check Total, Prep, and Cooking times in minutes along with difficulty rating.
- Follow sequential steps with English instructions and authentic Bangla translations.
- Read Chef's Authentic Secrets for authentic traditional taste.

4. ESSENTIAL FOOD VALUE / পুষ্টিমান ও খাদ্যগুণ
- View calories, protein, carbohydrates, fats, key vitamins, and dietary badges.

5. COPY & PRINT / প্রিন্ট ও সংরক্ষণ
- Copy recipes to clipboard or print physical copies anytime.`;

    navigator.clipboard.writeText(guideText).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    });
  };

  const showEn = activeTab === 'bilingual' || activeTab === 'en';
  const showBn = activeTab === 'bilingual' || activeTab === 'bn';

  return (
    <div
      id="user-guide-modal-backdrop"
      className="fixed inset-0 z-50 flex items-center justify-center p-3 sm:p-6 bg-[#1D1D1B]/70 backdrop-blur-xs overflow-y-auto print:p-0 print:bg-white print:static"
      onClick={(e) => {
        if (e.target === e.currentTarget) onClose();
      }}
    >
      <div
        id="user-guide-modal-container"
        className="bg-[#FBF9F6] text-[#1D1D1B] w-full max-w-4xl max-h-[90vh] rounded-xs shadow-2xl border-2 border-[#1D1D1B] flex flex-col my-auto overflow-hidden print:max-h-none print:shadow-none print:border-none print:w-full print:m-0"
      >
        {/* Modal Top Header Bar */}
        <div className="bg-[#F2EDE4] border-b border-[#1D1D1B] px-5 py-4 flex items-center justify-between gap-3 shrink-0 print:border-b-2 print:border-black">
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-9 h-9 rounded-xs bg-[#C25E44] text-white flex items-center justify-center shrink-0 shadow-xs">
              <BookOpen className="w-5 h-5 text-white" />
            </div>
            <div className="min-w-0">
              <span className="text-[10px] uppercase tracking-[0.25em] font-sans font-bold text-[#C25E44] block">
                User Guide & Documentation
              </span>
              <h2 className="font-serif font-bold text-base sm:text-lg text-[#1D1D1B] truncate flex flex-wrap items-baseline gap-2">
                <span>Application Manual</span>
                <span className="font-bengali text-emerald-600 font-semibold text-sm sm:text-base">
                  (ব্যবহারকারী নির্দেশিকা)
                </span>
              </h2>
            </div>
          </div>

          {/* Header Action Controls */}
          <div className="flex items-center gap-2 shrink-0 no-print">
            {/* Language Filter Tabs */}
            <div className="hidden sm:inline-flex items-center bg-white border border-[#1D1D1B]/20 p-0.5 rounded-xs text-xs font-sans">
              <button
                type="button"
                onClick={() => setActiveTab('bilingual')}
                className={`px-2.5 py-1 rounded-xs transition-colors font-medium ${
                  activeTab === 'bilingual'
                    ? 'bg-[#1D1D1B] text-white font-semibold'
                    : 'text-[#4A4540] hover:bg-[#F2EDE4]'
                }`}
              >
                Both / উভয়
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('en')}
                className={`px-2.5 py-1 rounded-xs transition-colors font-medium ${
                  activeTab === 'en'
                    ? 'bg-[#1D1D1B] text-white font-semibold'
                    : 'text-[#4A4540] hover:bg-[#F2EDE4]'
                }`}
              >
                English
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('bn')}
                className={`px-2.5 py-1 rounded-xs transition-colors font-bengali font-semibold ${
                  activeTab === 'bn'
                    ? 'bg-emerald-700 text-white'
                    : 'text-emerald-700 hover:bg-[#F2EDE4]'
                }`}
              >
                বাংলা
              </button>
            </div>

            {/* Print Button */}
            <button
              type="button"
              id="user-guide-print-btn"
              onClick={handlePrint}
              title="Print user guide / প্রিন্ট করুন"
              className="inline-flex items-center gap-1.5 px-3 py-1.5 bg-white border border-[#1D1D1B] rounded-xs text-xs font-sans font-bold text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white transition-colors shadow-xs"
            >
              <Printer className="w-3.5 h-3.5" />
              <span className="hidden xs:inline">Print</span>
            </button>

            {/* Copy Guide Text Button */}
            <button
              type="button"
              id="user-guide-copy-btn"
              onClick={handleCopyGuide}
              title="Copy guide text / কপি করুন"
              className="inline-flex items-center gap-1 px-2.5 py-1.5 bg-white border border-[#1D1D1B]/40 rounded-xs text-xs font-sans text-[#4A4540] hover:bg-[#F2EDE4] transition-colors"
            >
              {copied ? (
                <>
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span className="text-[11px] text-emerald-600 font-semibold">Copied!</span>
                </>
              ) : (
                <Share2 className="w-3.5 h-3.5" />
              )}
            </button>

            {/* Close Modal Button */}
            <button
              type="button"
              id="user-guide-close-btn"
              onClick={onClose}
              title="Close / বন্ধ করুন"
              className="w-8 h-8 rounded-xs bg-[#1D1D1B] text-white hover:bg-[#C25E44] flex items-center justify-center transition-colors ml-1"
            >
              <X className="w-4 h-4" />
            </button>
          </div>
        </div>

        {/* Mobile Language Switcher */}
        <div className="sm:hidden px-4 py-2 bg-white/70 border-b border-[#1D1D1B]/15 flex items-center justify-between text-xs no-print">
          <span className="text-[#8A847C] flex items-center gap-1">
            <Languages className="w-3.5 h-3.5 text-[#C25E44]" />
            <span>Language:</span>
          </span>
          <div className="flex gap-1">
            <button
              type="button"
              onClick={() => setActiveTab('bilingual')}
              className={`px-2 py-0.5 rounded-xs ${
                activeTab === 'bilingual' ? 'bg-[#1D1D1B] text-white font-semibold' : 'bg-white border'
              }`}
            >
              Both
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('en')}
              className={`px-2 py-0.5 rounded-xs ${
                activeTab === 'en' ? 'bg-[#1D1D1B] text-white font-semibold' : 'bg-white border'
              }`}
            >
              EN
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('bn')}
              className={`px-2 py-0.5 rounded-xs font-bengali ${
                activeTab === 'bn' ? 'bg-emerald-700 text-white font-semibold' : 'bg-white border text-emerald-700'
              }`}
            >
              বাংলা
            </button>
          </div>
        </div>

        {/* Scrollable Document Content */}
        <div className="p-6 sm:p-8 overflow-y-auto space-y-8 font-sans print:p-0 print:overflow-visible">
          
          {/* Document Banner */}
          <div className="border-b border-[#1D1D1B] pb-5">
            <div className="flex items-center gap-2 mb-1.5">
              <span className="text-[11px] uppercase tracking-[0.25em] font-sans font-bold text-[#C25E44]">
                The Seasonal Pantry & Recipe Explorer
              </span>
              <span className="text-[10px] uppercase font-mono px-2 py-0.5 bg-[#1D1D1B]/10 rounded-xs">
                v2.0 • Complete Guide
              </span>
            </div>
            <h1 className="font-serif font-black text-2xl sm:text-3xl text-[#1D1D1B] tracking-tight">
              Recipe of Common Foods and their Food Value
            </h1>
            <p className="font-bengali text-lg sm:text-xl font-semibold text-emerald-600 mt-1">
              সাধারণ খাদ্যের রন্ধন প্রণালী ও পুষ্টিমান - ব্যবহার নির্দেশিকা
            </p>
          </div>

          {/* Section 1: Overview */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                1
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                Application Overview & Purpose
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (অ্যাপ পরিচিতি ও উদ্দেশ্য)
              </span>
            </div>

            {showEn && (
              <p className="text-sm text-[#4A4540] leading-relaxed">
                <strong>The Seasonal Pantry & Recipe Explorer</strong> is an authoritative, interactive bilingual culinary catalog designed for home cooks, culinary students, and nutrition enthusiasts. It delivers authentic Bengali heritage recipes paired with laboratory-grade macronutrient metrics and health benefits for <strong>51 core dietary staples</strong>.
              </p>
            )}
            {showBn && (
              <p className="text-sm font-bengali text-emerald-600 font-semibold leading-relaxed">
                <strong>সাধারণ খাদ্যের রন্ধন প্রণালী ও পুষ্টিমান</strong> অ্যাপটি বাঙালি খাদ্যাভ্যাসের বহুল পরিচিত ৫১টি প্রধান খাদ্য উপাদানের খাঁটি ঐতিহ্যবাহী রন্ধন প্রণালী, রান্নার সঠিক সময়কাল এবং প্রয়োজনীয় পুষ্টিগুণের একটি সুসংগঠিত ডিজিটাল সহায়িকা।
              </p>
            )}
          </section>

          {/* Section 2: 4 Core Categories & Selection */}
          <section className="space-y-3">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                2
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                The 4 Food Categories & Ingredient Selection
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (খাদ্য বিভাগ ও উপাদান নির্বাচন)
              </span>
            </div>

            {showEn && (
              <p className="text-sm text-[#4A4540] leading-relaxed">
                All 51 staples are categorized into 4 distinct pantry pillars. Each category card contains a dedicated dropdown and quick-pick pills for instant selection:
              </p>
            )}
            {showBn && (
              <p className="text-sm font-bengali text-emerald-600 font-semibold leading-relaxed">
                অ্যাপের সমস্ত ৫১টি খাদ্য উপাদানকে ৪টি মূল বিভাগে বিন্যস্ত করা হয়েছে। প্রতিটি বিভাগের জন্য রয়েছে স্বতন্ত্র ড্রপডাউন এবং সরাসরি ক্লিক করে বাছাই করার সুবিধাজনক বাটন:
              </p>
            )}

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 pt-1">
              <div className="p-3 bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#1D1D1B]">1. Fish & Seafood</span>
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-[#1D1D1B] text-white rounded-xs">11 Items</span>
                </div>
                <p className="font-bengali text-xs font-semibold text-emerald-600 mb-1">মাছ ও সামুদ্রিক খাদ্য</p>
                <p className="text-xs text-[#4A4540]">Hilsa (ইলিশ), Rohu (রুই), Catla (কাতলা), Barramundi (ভেটকি), Prawn (চিংড়ি), Climbing Perch (কই), Walking Catfish (মাগুর), Stinging Catfish (শিং), Tengra (টেংরা), Pomfret (রূপচাঁদা), Kingfish (সুরমাই)।</p>
              </div>

              <div className="p-3 bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#1D1D1B]">2. Meat & Poultry</span>
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-[#1D1D1B] text-white rounded-xs">8 Items</span>
                </div>
                <p className="font-bengali text-xs font-semibold text-emerald-600 mb-1">মাংস ও পোল্ট্রি</p>
                <p className="text-xs text-[#4A4540]">Mutton (খাসির মাংস), Lamb (ভেড়ার মাংস), Chicken (মুরগির মাংস), Duck (হাঁসের মাংস), Quail (কোয়েল পাখি), Pigeon (কবুতরের মাংস), Chicken Eggs (মুরগির ডিম), Duck Eggs (হাঁসের ডিম)।</p>
              </div>

              <div className="p-3 bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#1D1D1B]">3. Dairy & Essentials</span>
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-[#1D1D1B] text-white rounded-xs">8 Items</span>
                </div>
                <p className="font-bengali text-xs font-semibold text-emerald-600 mb-1">দুগ্ধজাত পণ্য ও খাঁটি উপাদান</p>
                <p className="text-xs text-[#4A4540]">Cow's Milk (গরুর দুধ), Curd / Yogurt (দই), Clarified Butter (ঘি), Fresh Cottage Cheese (ছানা), Solidified Milk Fat (ক্ষীর), Solid Milk (মাওয়া), Buttermilk (ঘোল), Butter (মাখন)।</p>
              </div>

              <div className="p-3 bg-[#F2EDE4] border border-[#1D1D1B]/30 rounded-xs">
                <div className="flex items-center justify-between mb-1">
                  <span className="font-serif font-bold text-sm text-[#1D1D1B]">4. Vegetables & Greens</span>
                  <span className="text-xs font-mono px-1.5 py-0.2 bg-[#1D1D1B] text-white rounded-xs">24 Items</span>
                </div>
                <p className="font-bengali text-xs font-semibold text-emerald-600 mb-1">শাকসবজি ও শাক</p>
                <p className="text-xs text-[#4A4540]">Potato, Eggplant, Cauliflower, Cabbage, Bottle Gourd, Pointed Gourd, Bitter Gourd, Ridge Gourd, Snake Gourd, Ash Gourd, Pumpkin, Green Papaya, Green Jackfruit, Drumstick, Taro Root, Taro Stem, Plantain, Banana Blossom, Okra, Spinach, Red Amaranth, Malabar Spinach, Radish, Tomato.</p>
              </div>
            </div>
          </section>

          {/* Section 3: Live Search Engine */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                3
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                Bilingual Live Search Bar
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (দ্বিভাষিক সার্চ বার)
              </span>
            </div>

            {showEn && (
              <p className="text-sm text-[#4A4540] leading-relaxed">
                The top header features an instant live search bar that recognizes queries in <strong>English, Bengali phonetics, or native Bengali script</strong> (e.g. typing <em>"Ilish"</em>, <em>"ইলিশ"</em>, <em>"Egg"</em>, or <em>"ডিম"</em>). Clicking any search result immediately loads that item’s complete recipe, culinary metrics, and nutritional profile.
              </p>
            )}
            {showBn && (
              <p className="text-sm font-bengali text-emerald-600 font-semibold leading-relaxed">
                স্ক্রিনের ওপরের সার্চ বারে ইংরেজি বা বাংলা যেকোনো ভাষায় টাইপ করে (যেমন: <em>Hilsa</em> বা <em>ইলিশ</em>, <em>Dim</em> বা <em>ডিম</em>) মুহূর্তেই পছন্দের খাদ্য উপাদানটি খুঁজে বের করা যায়।
              </p>
            )}
          </section>

          {/* Section 4: Recipe & Step-by-Step Instructions */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                4
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                Authentic Heritage Recipes & Step-by-Step Cooking
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (ঐতিহ্যবাহী রন্ধন প্রণালী ও রান্নার ধাপ)
              </span>
            </div>

            {showEn && (
              <div className="text-sm text-[#4A4540] space-y-1.5 leading-relaxed">
                <p>For each selected ingredient, the application displays:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong>Time Metrics (রান্নার সময়কাল):</strong> Total recipe time, prep time, cook time, and difficulty level (Easy, Medium, Advanced).</li>
                  <li><strong>Ingredients List (উপকরণ):</strong> Complete proportional measurements with both English and Bengali ingredient names.</li>
                  <li><strong>Cooking Technique (প্রণালী):</strong> Clear, sequential steps with titles and descriptions in English, accompanied by authentic Bengali instructions in light green font.</li>
                  <li><strong>Chef's Authentic Secrets (শেফের বিশেষ পরামর্শ):</strong> Time-tested traditional culinary tips with bilingual Bengali translations.</li>
                </ul>
              </div>
            )}
            {showBn && (
              <div className="text-sm font-bengali text-emerald-600 font-semibold space-y-1.5 leading-relaxed">
                <p>নির্বাচিত প্রতিটি খাদ্যের জন্য বিশদ বিবরণ উপস্থাপিত হয়:</p>
                <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm">
                  <li><strong>রান্নার সময়কাল (Time Metrics):</strong> মোট রান্নার সময়, প্রস্তুতি ও চুলার সময় এবং রান্নার কাঠিন্যের মাত্রা।</li>
                  <li><strong>প্রয়োজনীয় উপকরণ:</strong> সঠিক পরিমাপ সহ ইংরেজি ও বাংলা উপকরণের তালিকা।</li>
                  <li><strong>ধাপভিত্তিক প্রণালী:</strong> প্রতিটি রান্নার ধাপের পরিষ্কার ইংরেজি বর্ণনা এবং তার নিচে হালকা সবুজ ফন্টে সহজবোধ্য বাংলা অনুবাদ।</li>
                  <li><strong>শেফের বিশেষ পরামর্শ:</strong> প্রতিটি রান্নার বিশেষ গোপনীয় কৌশল ও খাঁটি স্বাদ পাওয়ার টিপস।</li>
                </ul>
              </div>
            )}
          </section>

          {/* Section 5: Essential Food Value & Nutritional Profile */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                5
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                Essential Food Value & Dietary Profile
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (পুষ্টিমান ও খাদ্য উপাদান)
              </span>
            </div>

            {showEn && (
              <p className="text-sm text-[#4A4540] leading-relaxed">
                Directly below the recipe hero card, the <strong>Essential Food Value</strong> module breaks down the item's clinical nutritional profile per standardized 100g serving:
              </p>
            )}
            {showBn && (
              <p className="text-sm font-bengali text-emerald-600 font-semibold leading-relaxed">
                রেসিপির সাথে সাথে প্রতিটি উপাদানের প্রতি ১০০ গ্রামে থাকা পুষ্টিমানের বিস্তারিত চার্ট দেওয়া হয়েছে:
              </p>
            )}

            <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 text-center text-xs pt-1">
              <div className="p-2.5 bg-[#F2EDE4] border border-[#1D1D1B]/20 rounded-xs">
                <span className="font-bold text-[#C25E44] block text-sm sm:text-base">Calories (ক্যালোরি)</span>
                <span className="text-[#8A847C] text-[11px]">Energy density (kcal)</span>
              </div>
              <div className="p-2.5 bg-[#F2EDE4] border border-[#1D1D1B]/20 rounded-xs">
                <span className="font-bold text-[#1D1D1B] block text-sm sm:text-base">Protein (প্রোটিন)</span>
                <span className="text-[#8A847C] text-[11px]">Muscle & tissue health (g)</span>
              </div>
              <div className="p-2.5 bg-[#F2EDE4] border border-[#1D1D1B]/20 rounded-xs">
                <span className="font-bold text-[#1D1D1B] block text-sm sm:text-base">Carbs (শর্করা)</span>
                <span className="text-[#8A847C] text-[11px]">Complex carbohydrates (g)</span>
              </div>
              <div className="p-2.5 bg-[#F2EDE4] border border-[#1D1D1B]/20 rounded-xs">
                <span className="font-bold text-[#1D1D1B] block text-sm sm:text-base">Fat (স্নেহ পদার্থ)</span>
                <span className="text-[#8A847C] text-[11px]">Healthy fatty acids (g)</span>
              </div>
            </div>

            {showEn && (
              <p className="text-xs text-[#4A4540] leading-relaxed mt-1">
                Also includes key vitamins (e.g. Omega-3, Vitamin A, B12, C, Iron, Calcium) and dietary tags (e.g., High Protein, Brain Health, Heart Healthy, Diabetic Friendly, Bone Density).
              </p>
            )}
            {showBn && (
              <p className="text-xs font-bengali text-emerald-600 font-semibold leading-relaxed mt-1">
                এছাড়াও রয়েছে প্রয়োজনীয় ভিটামিন ও খনিজ (যেমন: ওমেগা-৩, ভিটামিন এ, বি১২, ক্যালসিয়াম, আয়রন) এবং স্বাস্থ্যগত গুণাগুণ।
              </p>
            )}
          </section>

          {/* Section 6: Copy, Share & Print Features */}
          <section className="space-y-2">
            <div className="flex items-center gap-2 border-b border-[#1D1D1B]/15 pb-1">
              <span className="w-5 h-5 rounded-full bg-[#1D1D1B] text-white text-xs font-mono font-bold flex items-center justify-center shrink-0">
                6
              </span>
              <h3 className="font-serif font-bold text-lg text-[#1D1D1B]">
                Copying to Clipboard & Printing
              </h3>
              <span className="font-bengali text-sm font-semibold text-emerald-600">
                (কপি ও প্রিন্ট করার নিয়ম)
              </span>
            </div>

            {showEn && (
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm text-[#4A4540]">
                <li><strong>Copy Full Recipe:</strong> Click the <em>"Copy Full Recipe & Food Value"</em> button on the recipe card to copy the entire formatted recipe, ingredients, steps, and nutrition facts directly to your device clipboard.</li>
                <li><strong>Print This Guide:</strong> Click the <strong>Print</strong> button at the top of this modal window (or press <kbd className="px-1.5 py-0.5 bg-gray-200 rounded-xs font-mono text-xs">Ctrl+P</kbd> / <kbd className="px-1.5 py-0.5 bg-gray-200 rounded-xs font-mono text-xs">Cmd+P</kbd>) to generate a clean, printer-optimized document or save as PDF without website clutter.</li>
              </ul>
            )}
            {showBn && (
              <ul className="list-disc pl-5 space-y-1 text-xs sm:text-sm font-bengali text-emerald-600 font-semibold">
                <li><strong>রেসিপি ও পুষ্টিমান কপি:</strong> রেসিপি কার্ডে থাকা <em>"Copy Full Recipe & Food Value"</em> বাটনে চাপ দিয়ে সম্পূর্ণ রেসিপিটি ক্লিপবোর্ডে কপি করে নোট বা মেসেজে শেয়ার করা যায়।</li>
                <li><strong>সহায়িকা প্রিন্ট:</strong> এই উইন্ডোর ওপরে থাকা <strong>Print</strong> বাটনে ক্লিক করে সহজেই এই ব্যবহারকারী নির্দেশিকাটি কাগজে প্রিন্ট করতে পারেন অথবা PDF ফাইল হিসেবে সংরক্ষণ করতে পারেন।</li>
              </ul>
            )}
          </section>

          {/* Section 7: Quick Shortcut Reference Table */}
          <section className="space-y-2 pt-2 border-t border-[#1D1D1B]">
            <div className="flex items-center justify-between">
              <h4 className="font-serif font-bold text-sm text-[#1D1D1B] uppercase tracking-wider">
                Quick Action Reference / সংক্ষিপ্ত অ্যাকশন তালিকা
              </h4>
              <span className="text-[10px] font-mono text-[#8A847C]">100% Client-Side Ready</span>
            </div>
            <div className="overflow-x-auto">
              <table className="w-full text-left text-xs border border-[#1D1D1B]/20 divide-y divide-[#1D1D1B]/20">
                <thead className="bg-[#F2EDE4] font-semibold text-[#1D1D1B]">
                  <tr>
                    <th className="p-2.5">Action (কাজ)</th>
                    <th className="p-2.5">How to Execute (পদ্ধতি)</th>
                    <th className="p-2.5">Result (ফলাফল)</th>
                  </tr>
                </thead>
                <tbody className="divide-y divide-[#1D1D1B]/10 bg-white">
                  <tr>
                    <td className="p-2.5 font-medium">Switch Food / খাদ্য বদলান</td>
                    <td className="p-2.5">Click any Quick Pick pill or select from category dropdown</td>
                    <td className="p-2.5 text-[#4A4540]">Immediately displays new recipe, timer & nutrition</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Search Food / সার্চ করুন</td>
                    <td className="p-2.5">Type name in English or Bengali into top search input</td>
                    <td className="p-2.5 text-[#4A4540]">Shows live matches from all 51 items</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Print Guide / নির্দেশিকা প্রিন্ট</td>
                    <td className="p-2.5">Click "Print" button on this modal</td>
                    <td className="p-2.5 text-[#4A4540]">Opens browser print dialog with optimized layout</td>
                  </tr>
                  <tr>
                    <td className="p-2.5 font-medium">Copy Recipe / রেসিপি কপি</td>
                    <td className="p-2.5">Click "Copy Full Recipe & Food Value" button</td>
                    <td className="p-2.5 text-[#4A4540]">Copies bilingual recipe & nutrition to clipboard</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Document Footer */}
          <div className="pt-4 border-t border-[#1D1D1B]/20 text-center text-xs text-[#8A847C]">
            <p>The Seasonal Pantry & Recipe Explorer • খাদ্য ও পুষ্টি নির্দেশিকা</p>
            <p className="font-bengali text-emerald-600 font-semibold mt-0.5">
              ঐতিহ্যবাহী স্বাদ ও স্বাস্থ্যকর পুষ্টির বিশ্বস্ত ডিজিটাল সংকলন
            </p>
          </div>

        </div>

        {/* Modal Bottom Action Footer Bar */}
        <div className="p-4 bg-[#F2EDE4] border-t border-[#1D1D1B] flex items-center justify-between gap-3 shrink-0 no-print">
          <div className="text-xs text-[#8A847C] font-sans hidden sm:block">
            Press <kbd className="px-1.5 py-0.5 bg-white border border-[#1D1D1B]/30 rounded-xs font-mono text-[11px] text-[#1D1D1B]">ESC</kbd> or click Close to return
          </div>
          <div className="flex items-center gap-2.5 ml-auto">
            <button
              type="button"
              id="user-guide-footer-print-btn"
              onClick={handlePrint}
              className="inline-flex items-center gap-1.5 px-4 py-2 bg-white border border-[#1D1D1B] rounded-xs text-xs font-sans font-bold text-[#1D1D1B] hover:bg-[#FBF9F6] transition-colors shadow-xs"
            >
              <Printer className="w-4 h-4 text-[#C25E44]" />
              <span>Print Guide (প্রিন্ট করুন)</span>
            </button>
            <button
              type="button"
              id="user-guide-footer-close-btn"
              onClick={onClose}
              className="px-5 py-2 bg-[#1D1D1B] text-white hover:bg-[#C25E44] rounded-xs text-xs font-sans font-bold transition-colors shadow-xs"
            >
              Close (বন্ধ করুন)
            </button>
          </div>
        </div>

      </div>
    </div>
  );
};
