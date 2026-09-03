import { CategoryInfo } from '../types';

export const CATEGORIES: CategoryInfo[] = [
  {
    id: 'fish_seafood',
    nameEn: 'Fish & Seafood',
    nameBn: 'মাছ ও সামুদ্রিক খাদ্য',
    iconName: 'Fish',
    description: 'Freshwater river fish, estuarine delicacies, and coastal seafood rich in Omega-3 and lean protein.',
    count: 11,
  },
  {
    id: 'meat_poultry',
    nameEn: 'Meat & Poultry',
    nameBn: 'মাংস ও পোল্ট্রি',
    iconName: 'Beef',
    description: 'Traditional meats, game fowl, and nutrient-dense farm and duck eggs rich in iron and amino acids.',
    count: 8,
  },
  {
    id: 'dairy',
    nameEn: 'Dairy',
    nameBn: 'দুগ্ধজাত পণ্য',
    iconName: 'Milk',
    description: 'Wholesome dairy foods, artisanal cottage cheese, cultured curd, and pure clarified butter (ghee).',
    count: 8,
  },
  {
    id: 'vegetables',
    nameEn: 'Vegetables',
    nameBn: 'শাকসবজি',
    iconName: 'Carrot',
    description: 'Indigenous gourds, leafy greens, root vegetables, and nutrient-rich seasonal produce.',
    count: 24,
  },
];
