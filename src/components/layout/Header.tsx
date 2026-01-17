import { MapPin, Bell, ChevronDown } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';

interface HeaderProps {
  location?: string;
}

export function Header({ location = "กรุงเทพฯ" }: HeaderProps) {
  return (
    <header className="flex items-center justify-between px-4 py-3 bg-card sticky top-0 z-40 border-b border-border/50">
      <div className="flex items-center gap-2">
        <div className="w-9 h-9 rounded-full bg-muted flex items-center justify-center">
          <MapPin className="w-5 h-5 text-muted-foreground" />
        </div>
        <div className="flex flex-col">
          <button className="flex items-center gap-1 text-sm font-medium text-foreground">
            {location}
            <ChevronDown className="w-4 h-4 text-muted-foreground" />
          </button>
          <span className="text-xs text-muted-foreground">ประเทศไทย</span>
        </div>
      </div>
      
      <Link to="/notifications">
        <Button variant="ghost" size="icon-sm" className="relative">
          <Bell className="w-5 h-5" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-accent rounded-full" />
        </Button>
      </Link>
    </header>
  );
}
