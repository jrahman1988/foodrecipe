import React from 'react';
import { UtensilsCrossed, Search, Sparkles, BookOpen } from 'lucide-react';
import { FoodItem } from '../types';

interface NavbarProps {
  searchQuery: string;
  onSearchChange: (q: string) => void;
  searchResults: FoodItem[];
  onSelectItem: (item: FoodItem) => void;
  totalItemsCount: number;
  onOpenUserGuide: () => void;
}

export const Navbar: React.FC<NavbarProps> = ({
  searchQuery,
  onSearchChange,
  searchResults,
  onSelectItem,
  totalItemsCount,
  onOpenUserGuide,
}) => {
  const [isSearchOpen, setIsSearchOpen] = React.useState(false);
  const searchContainerRef = React.useRef<HTMLDivElement>(null);

  React.useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target as Node)) {
        setIsSearchOpen(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, []);

  return (
    <header className="sticky top-0 z-40 bg-[#F2EDE4] text-[#1D1D1B] border-b border-[#1D1D1B] shadow-xs">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 sm:h-20 gap-3">
          
          {/* Brand Logo & Title in Culinary Studio Editorial Style */}
          <div className="flex items-center gap-3 min-w-0">
            <div className="w-10 h-10 rounded-xs bg-[#1D1D1B] text-white flex items-center justify-center shrink-0 shadow-xs">
              <UtensilsCrossed className="w-5 h-5 text-[#F2EDE4]" />
            </div>
            <div className="min-w-0">
              <div className="flex items-center gap-2">
                <span className="text-[10px] uppercase tracking-[0.35em] font-sans font-bold text-[#C25E44]">
                  Culinary Studio
                </span>
                <span className="hidden md:inline-flex text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#1D1D1B] text-white font-mono font-medium">
                  {totalItemsCount} Food Items
                </span>
              </div>
              <div className="flex items-baseline gap-2">
                <h1 className="font-serif italic font-bold text-base sm:text-xl tracking-tight text-[#1D1D1B] truncate">
                  The Seasonal Pantry & Recipe Explorer
                </h1>
                <span className="hidden sm:inline text-xs text-emerald-600 font-bengali font-semibold truncate">
                  (খাদ্য উপাদান ও পুষ্টি গাইড)
                </span>
              </div>
            </div>
          </div>

          {/* Search Bar - Editorial Minimalist Style */}
          <div ref={searchContainerRef} className="relative flex-1 max-w-xs sm:max-w-md">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none text-[#8A847C]">
                <Search className="h-4 w-4" />
              </div>
              <input
                id="food-search-input"
                type="text"
                placeholder="Search food item (e.g., Hilsa, ইলিশ, Potato, ডিম)..."
                value={searchQuery}
                onChange={(e) => {
                  onSearchChange(e.target.value);
                  setIsSearchOpen(true);
                }}
                onFocus={() => setIsSearchOpen(true)}
                className="w-full pl-9 pr-4 py-2 text-sm bg-white/90 border border-[#1D1D1B]/30 rounded-xs text-[#1D1D1B] placeholder-[#8A847C] focus:outline-none focus:border-[#1D1D1B] focus:ring-1 focus:ring-[#1D1D1B] transition-all font-sans"
              />
            </div>

            {/* Live Search Dropdown */}
            {isSearchOpen && searchQuery.trim().length > 0 && (
              <div className="absolute left-0 right-0 mt-1.5 bg-[#FBF9F6] text-[#1D1D1B] rounded-xs shadow-2xl border-2 border-[#1D1D1B] max-h-80 overflow-y-auto z-50 divide-y divide-[#1D1D1B]/10">
                {searchResults.length === 0 ? (
                  <div className="p-4 text-center text-xs text-[#8A847C] font-sans uppercase tracking-wider">
                    No matching food item found for "{searchQuery}".
                  </div>
                ) : (
                  searchResults.slice(0, 8).map((item) => (
                    <button
                      key={item.id}
                      type="button"
                      id={`search-item-${item.id}`}
                      onClick={() => {
                        onSelectItem(item);
                        setIsSearchOpen(false);
                      }}
                      className="w-full text-left px-4 py-3 hover:bg-[#F2EDE4] transition-colors flex items-center justify-between group"
                    >
                      <div className="min-w-0 pr-3">
                        <div className="flex items-center gap-2">
                          <span className="font-serif font-bold text-base text-[#1D1D1B] group-hover:text-[#C25E44]">
                            {item.nameEn}
                          </span>
                          <span className="text-emerald-600 font-semibold text-xs font-bengali">
                            ({item.nameBn})
                          </span>
                        </div>
                        <div className="text-xs text-[#8A847C] truncate mt-0.5 font-sans">
                          Recipe: <span className="text-[#4A4540]">{item.recipe.titleEn}</span>
                        </div>
                      </div>
                      <div className="text-right shrink-0">
                        <span className="text-[10px] uppercase tracking-wider px-2 py-0.5 rounded-xs bg-[#1D1D1B]/10 text-[#1D1D1B] font-mono font-medium capitalize">
                          {item.categoryId.replace('_', ' ')}
                        </span>
                      </div>
                    </button>
                  ))
                )}
              </div>
            )}
          </div>

          {/* User Guide Action Button */}
          <button
            type="button"
            id="navbar-user-guide-btn"
            onClick={onOpenUserGuide}
            title="Open User Guide / ব্যবহারকারী নির্দেশিকা"
            className="flex items-center gap-1.5 px-3 py-1.5 sm:px-3.5 sm:py-2 bg-white border border-[#1D1D1B] rounded-xs text-xs font-sans font-bold text-[#1D1D1B] hover:bg-[#1D1D1B] hover:text-white transition-all shadow-xs shrink-0 cursor-pointer group"
          >
            <BookOpen className="w-3.5 h-3.5 sm:w-4 sm:h-4 text-[#C25E44] group-hover:text-[#FBF9F6] transition-colors" />
            <span className="hidden xs:inline">User Guide</span>
            <span className="font-bengali text-emerald-600 font-semibold group-hover:text-emerald-400 text-xs transition-colors">
              (নির্দেশিকা)
            </span>
          </button>

          {/* Quick Info Badge */}
          <div className="hidden xl:flex items-center gap-1.5 text-[11px] uppercase tracking-widest text-[#4A4540] bg-white/70 border border-[#1D1D1B]/20 px-3 py-1.5 rounded-xs shrink-0 font-sans font-semibold">
            <Sparkles className="w-3.5 h-3.5 text-[#C25E44]" />
            <span>Artistic Edition • 100% Client-Side</span>
          </div>

        </div>
      </div>
    </header>
  );
};
