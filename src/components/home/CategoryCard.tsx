import { Link } from 'react-router-dom';
import { 
  Stethoscope, 
  Eye, 
  Droplets, 
  Activity, 
  AlertTriangle,
  Heart
} from 'lucide-react';
import type { ScanCategory } from '@/types';
import { cn } from '@/lib/utils';

interface CategoryCardProps {
  id: ScanCategory;
  name: string;
  icon: string;
  color: string;
}

const iconMap: Record<string, React.ElementType> = {
  skin: Stethoscope,
  eyes: Eye,
  stool: Droplets,
  vomit: Droplets,
  behavior: Activity,
  emergency: AlertTriangle,
  other: Heart,
};

const colorMap: Record<string, string> = {
  pink: 'gradient-card-pink',
  lavender: 'gradient-card-lavender',
  mint: 'gradient-card-mint',
  peach: 'gradient-card-peach',
  red: 'bg-emergency/10',
};

export function CategoryCard({ id, name, icon, color }: CategoryCardProps) {
  const Icon = iconMap[icon] || Heart;
  
  return (
    <Link to={`/scan?category=${id}`}>
      <div 
        className={cn(
          "p-4 rounded-2xl transition-all hover:scale-[1.02] active:scale-[0.98]",
          colorMap[color] || 'bg-muted'
        )}
      >
        <div className="w-10 h-10 rounded-xl bg-card/50 flex items-center justify-center mb-3">
          <Icon className={cn(
            "w-5 h-5",
            id === 'emergency' ? 'text-emergency' : 'text-foreground'
          )} />
        </div>
        <h3 className="text-sm font-medium text-foreground">{name}</h3>
      </div>
    </Link>
  );
}
