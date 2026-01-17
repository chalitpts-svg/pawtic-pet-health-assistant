import { Header } from '@/components/layout/Header';
import { HeroCard } from '@/components/home/HeroCard';
import { CategoryGrid } from '@/components/home/CategoryGrid';
import { RecentScans } from '@/components/home/RecentScans';
import { useAppStore } from '@/stores/appStore';
import { Crown, Sparkles } from 'lucide-react';
import { Link } from 'react-router-dom';

const HomePage = () => {
  const { user } = useAppStore();
  const remainingScans = user ? user.maxFreeScans - user.scanQuotaUsed : 0;

  return (
    <div className="min-h-screen bg-background">
      <Header />
      
      {/* Scan quota banner for free users */}
      {user?.plan === 'FREE' && (
        <Link to="/subscription" className="block mx-4 mt-4">
          <div className="flex items-center justify-between p-3 rounded-2xl bg-secondary/50 border border-secondary">
            <div className="flex items-center gap-2">
              <div className="w-8 h-8 rounded-full bg-primary/20 flex items-center justify-center">
                <Sparkles className="w-4 h-4 text-primary" />
              </div>
              <div>
                <p className="text-sm font-medium text-foreground">
                  เหลือสแกนฟรี {remainingScans}/{user.maxFreeScans} ครั้ง
                </p>
                <p className="text-xs text-muted-foreground">อัพเกรด Pro เพื่อสแกนไม่จำกัด</p>
              </div>
            </div>
            <Crown className="w-5 h-5 text-primary" />
          </div>
        </Link>
      )}
      
      <HeroCard />
      <CategoryGrid />
      <RecentScans />
      
      {/* Bottom spacing for nav */}
      <div className="h-8" />
    </div>
  );
};

export default HomePage;
