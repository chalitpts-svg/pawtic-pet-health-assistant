import { CategoryCard } from './CategoryCard';
import type { Category } from '@/types';

const categories: Category[] = [
  { id: 'skin', name: 'ผิวหนัง/ขน', icon: 'skin', color: 'pink' },
  { id: 'eyes', name: 'ตา/หู', icon: 'eyes', color: 'lavender' },
  { id: 'stool', name: 'อุจจาระ', icon: 'stool', color: 'mint' },
  { id: 'vomit', name: 'อาเจียน', icon: 'vomit', color: 'peach' },
  { id: 'behavior', name: 'พฤติกรรม', icon: 'behavior', color: 'lavender' },
  { id: 'emergency', name: 'ฉุกเฉิน', icon: 'emergency', color: 'red' },
];

export function CategoryGrid() {
  return (
    <div className="px-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">หมวดหมู่อาการ</h2>
        <button className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ดูทั้งหมด
        </button>
      </div>
      
      <div className="grid grid-cols-3 gap-3">
        {categories.map((category) => (
          <CategoryCard key={category.id} {...category} />
        ))}
      </div>
    </div>
  );
}
