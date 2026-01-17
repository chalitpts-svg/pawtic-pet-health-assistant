import { ArrowLeft, User, Crown, Settings, Shield, HelpCircle, FileText, LogOut, ChevronRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate, Link } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';

const ProfilePage = () => {
  const navigate = useNavigate();
  const { user } = useAppStore();
  const isPro = user?.plan === 'PRO';

  const menuItems = [
    { icon: Crown, label: 'แพ็คเกจของฉัน', path: '/subscription', badge: isPro ? 'Pro' : null },
    { icon: Shield, label: 'ความเป็นส่วนตัวและข้อมูล', path: '/privacy' },
    { icon: Settings, label: 'ตั้งค่า', path: '/settings' },
    { icon: HelpCircle, label: 'ช่วยเหลือ', path: '/help' },
    { icon: FileText, label: 'ข้อกำหนดการใช้งาน', path: '/terms' },
  ];

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <h1 className="text-lg font-semibold text-foreground">โปรไฟล์</h1>
      </header>

      <div className="p-4 space-y-6">
        {/* User Card */}
        <div className="bg-card rounded-3xl border border-border/50 p-6">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 rounded-full bg-muted flex items-center justify-center">
              <User className="w-8 h-8 text-muted-foreground" />
            </div>
            <div className="flex-1">
              <h2 className="font-semibold text-foreground">{user?.email || 'Guest User'}</h2>
              <div className="flex items-center gap-2 mt-1">
                {isPro ? (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                    <Crown className="w-3 h-3" />
                    Pro
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2 py-0.5 bg-muted text-muted-foreground text-xs font-medium rounded-full">
                    Free
                  </span>
                )}
              </div>
            </div>
          </div>
          
          {!isPro && (
            <Link to="/subscription">
              <div className="mt-4 p-3 rounded-2xl gradient-primary flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <Crown className="w-5 h-5 text-primary-foreground" />
                  <span className="text-sm font-medium text-primary-foreground">อัพเกรดเป็น Pro</span>
                </div>
                <ChevronRight className="w-5 h-5 text-primary-foreground" />
              </div>
            </Link>
          )}
        </div>

        {/* Scan Quota */}
        {!isPro && (
          <div className="bg-card rounded-2xl border border-border/50 p-4">
            <div className="flex items-center justify-between mb-2">
              <span className="text-sm text-muted-foreground">สแกนที่ใช้ไป</span>
              <span className="text-sm font-medium text-foreground">
                {user?.scanQuotaUsed || 0}/{user?.maxFreeScans || 5}
              </span>
            </div>
            <div className="h-2 bg-muted rounded-full overflow-hidden">
              <div 
                className="h-full bg-primary rounded-full transition-all"
                style={{ width: `${((user?.scanQuotaUsed || 0) / (user?.maxFreeScans || 5)) * 100}%` }}
              />
            </div>
          </div>
        )}

        {/* Menu */}
        <div className="bg-card rounded-2xl border border-border/50 overflow-hidden">
          {menuItems.map((item, i) => (
            <Link 
              key={item.path}
              to={item.path}
              className="flex items-center gap-3 p-4 hover:bg-muted/50 transition-colors border-b border-border/50 last:border-b-0"
            >
              <item.icon className="w-5 h-5 text-muted-foreground" />
              <span className="flex-1 text-foreground">{item.label}</span>
              {item.badge && (
                <span className="px-2 py-0.5 bg-primary/10 text-primary text-xs font-medium rounded-full">
                  {item.badge}
                </span>
              )}
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          ))}
        </div>

        {/* Logout */}
        <Button variant="ghost" className="w-full text-destructive hover:text-destructive hover:bg-destructive/10">
          <LogOut className="w-5 h-5 mr-2" />
          ออกจากระบบ
        </Button>

        {/* Version */}
        <p className="text-center text-xs text-muted-foreground">
          Pawtic v1.0.0
        </p>
      </div>
    </div>
  );
};

export default ProfilePage;
