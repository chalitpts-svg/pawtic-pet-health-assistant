import { Home, FileText, Bell, User, Scan } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { cn } from '@/lib/utils';

interface NavItem {
  icon: React.ElementType;
  label: string;
  path: string;
}

const navItems: NavItem[] = [
  { icon: Home, label: 'หน้าหลัก', path: '/' },
  { icon: FileText, label: 'Pet Passport', path: '/passport' },
  { icon: Bell, label: 'แจ้งเตือน', path: '/reminders' },
  { icon: User, label: 'โปรไฟล์', path: '/profile' },
];

export function BottomNav() {
  const location = useLocation();

  return (
    <nav className="bottom-nav z-50">
      <div className="flex items-center justify-around relative">
        {/* Left nav items */}
        {navItems.slice(0, 2).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
              location.pathname === item.path 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}

        {/* Center Scan Button */}
        <Link
          to="/scan"
          className="flex flex-col items-center gap-1"
        >
          <div className="scan-button">
            <Scan className="w-7 h-7 text-primary-foreground" />
          </div>
          <span className="text-xs font-medium text-primary mt-1">สแกน</span>
        </Link>

        {/* Right nav items */}
        {navItems.slice(2).map((item) => (
          <Link
            key={item.path}
            to={item.path}
            className={cn(
              "flex flex-col items-center gap-1 py-2 px-4 transition-colors",
              location.pathname === item.path 
                ? "text-primary" 
                : "text-muted-foreground hover:text-foreground"
            )}
          >
            <item.icon className="w-6 h-6" />
            <span className="text-xs font-medium">{item.label}</span>
          </Link>
        ))}
      </div>
    </nav>
  );
}
