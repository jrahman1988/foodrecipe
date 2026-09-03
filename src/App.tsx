import React, { useState, useMemo } from 'react';
import { ALL_FOOD_ITEMS, CATEGORIES, searchFoodItems } from './data/foodItems';
import { FoodItem } from './types';
import { Navbar } from './components/Navbar';
import { CategoryDropdowns } from './components/CategoryDropdowns';
import { FoodDetailView } from './components/FoodDetailView';
import { UserGuideModal } from './components/UserGuideModal';
import { Utensils, CheckCircle, Smartphone, Monitor, BookOpen } from 'lucide-react';

export default function App() {
  // Default to Hilsa (the first requested item)
  const [selectedItem, setSelectedItem] = useState<FoodItem>(ALL_FOOD_ITEMS[0]);
  const [searchQuery, setSearchQuery] = useState('');
  const [isUserGuideOpen, setIsUserGuideOpen] = useState(false);

  // Live filtered items based on search query
  const searchResults = useMemo(() => {
    return searchFoodItems(searchQuery);
  }, [searchQuery]);

  const handleSelectItem = (item: FoodItem) => {
    setSelectedItem(item);
    setSearchQuery('');
    // Smooth scroll down to details on mobile screens
    if (window.innerWidth < 768) {
      window.scrollTo({ top: 380, behavior: 'smooth' });
    }
  };

  return (
    <div className="min-h-screen bg-[#FBF9F6] text-[#1D1D1B] flex flex-col font-sans selection:bg-[#C25E44]/20 selection:text-[#1D1D1B]">
      
      {/* Top Application Bar with Integrated Live Search and User Guide Button */}
      <Navbar
        searchQuery={searchQuery}
        onSearchChange={setSearchQuery}
        searchResults={searchResults}
        onSelectItem={handleSelectItem}
        totalItemsCount={ALL_FOOD_ITEMS.length}
        onOpenUserGuide={() => setIsUserGuideOpen(true)}
      />

      {/* Main Container */}
      <main className="flex-1 max-w-7xl w-full mx-auto px-4 sm:px-6 lg:px-8 py-6 sm:py-9">
        
        {/* Category Dropdowns: Each category has its own dedicated dropdown */}
        <CategoryDropdowns
          categories={CATEGORIES}
          selectedItem={selectedItem}
          onSelectItem={handleSelectItem}
        />

        {/* Deliverables 1, 2, and 3: Recipe, Preparation/Cooking Times, and Essential Food Value */}
        <FoodDetailView foodItem={selectedItem} />

      </main>

      {/* User Guide & Manual Modal */}
      <UserGuideModal
        isOpen={isUserGuideOpen}
        onClose={() => setIsUserGuideOpen(false)}
      />

      {/* Footer in Editorial Artistic Flair Ink Palette */}
      <footer className="bg-[#1D1D1B] text-[#EAE4D8] border-t border-[#1D1D1B] py-7 mt-14 text-xs">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-4">
          <div className="flex items-center gap-2.5 text-[#FBF9F6] font-serif font-bold text-sm">
            <span className="w-2 h-2 rounded-full bg-[#C25E44]" />
            <Utensils className="w-4 h-4 text-[#C25E44]" />
            <span>
              The Seasonal Pantry & Recipe Explorer •{' '}
              <span className="font-bengali text-emerald-400 font-semibold">
                খাদ্য ও পুষ্টি নির্দেশিকা
              </span>
            </span>
          </div>

          <div className="flex flex-wrap items-center justify-center gap-4 text-[#8A847C] text-xs font-sans">
            <button
              type="button"
              id="footer-user-guide-btn"
              onClick={() => setIsUserGuideOpen(true)}
              className="inline-flex items-center gap-1.5 text-emerald-400 font-semibold hover:text-emerald-300 hover:underline cursor-pointer"
            >
              <BookOpen className="w-3.5 h-3.5" />
              <span>User Guide (ব্যবহারকারী নির্দেশিকা)</span>
            </button>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Smartphone className="w-3.5 h-3.5 text-[#EAE4D8]" />
              <span>Mobile & Touch Ready</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5">
              <Monitor className="w-3.5 h-3.5 text-[#EAE4D8]" />
              <span>Desktop Precision</span>
            </span>
            <span>•</span>
            <span className="inline-flex items-center gap-1.5 text-[#C25E44] font-medium">
              <CheckCircle className="w-3.5 h-3.5" />
              <span>Artistic Flair Theme</span>
            </span>
          </div>
        </div>
      </footer>

    </div>
  );
}
