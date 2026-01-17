import { ArrowLeft, Crown, Check, Sparkles } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';

const features = {
  free: [
    'AI Scan ฟรี 5 ครั้งตลอดชีพ',
    'บันทึกสัตว์เลี้ยง 1 ตัว',
    'ดูผลสแกนย้อนหลัง',
    'Emergency Finder พื้นฐาน',
  ],
  pro: [
    'AI Scan ไม่จำกัด',
    'บันทึกสัตว์เลี้ยงได้ไม่จำกัด',
    'Smart Reminder ครบทุกฟีเจอร์',
    'Emergency Finder รายละเอียดเต็ม',
    'Pet Passport ส่งออกได้',
    'ไม่มีโฆษณา',
    'ซัพพอร์ตลัดคิว',
  ],
};

const SubscriptionPage = () => {
  const navigate = useNavigate();
  const { user, setUser } = useAppStore();
  const isPro = user?.plan === 'PRO';

  const handleSubscribe = (plan: 'monthly' | 'yearly') => {
    // In real app, this would redirect to payment
    setUser({
      ...user!,
      plan: 'PRO',
      proExpireAt: new Date(Date.now() + (plan === 'monthly' ? 30 : 365) * 24 * 60 * 60 * 1000).toISOString(),
    });
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">แพ็คเกจ</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Hero */}
        <div className="text-center py-6">
          <div className="w-20 h-20 rounded-full gradient-primary flex items-center justify-center mx-auto mb-4 shadow-glow">
            <Crown className="w-10 h-10 text-primary-foreground" />
          </div>
          <h2 className="text-2xl font-bold text-foreground mb-2">Pawtic Pro</h2>
          <p className="text-muted-foreground">
            ปลดล็อกทุกฟีเจอร์<br />ดูแลน้องได้อย่างเต็มที่
          </p>
        </div>

        {/* Current Plan */}
        {isPro ? (
          <div className="bg-primary/10 border border-primary/30 rounded-2xl p-4 text-center">
            <div className="flex items-center justify-center gap-2 text-primary font-semibold mb-1">
              <Crown className="w-5 h-5" />
              คุณเป็นสมาชิก Pro อยู่แล้ว
            </div>
            <p className="text-sm text-muted-foreground">
              หมดอายุ: {user?.proExpireAt ? new Date(user.proExpireAt).toLocaleDateString('th-TH') : '-'}
            </p>
          </div>
        ) : (
          <>
            {/* Pricing Cards */}
            <div className="space-y-3">
              {/* Monthly */}
              <button
                onClick={() => handleSubscribe('monthly')}
                className="w-full bg-card border-2 border-border rounded-2xl p-4 text-left hover:border-primary/50 transition-colors"
              >
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">รายเดือน</h3>
                    <p className="text-sm text-muted-foreground">ยกเลิกได้ทุกเมื่อ</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">฿199</span>
                    <span className="text-sm text-muted-foreground">/เดือน</span>
                  </div>
                </div>
              </button>

              {/* Yearly */}
              <button
                onClick={() => handleSubscribe('yearly')}
                className="w-full bg-gradient-to-r from-primary/10 to-primary/5 border-2 border-primary rounded-2xl p-4 text-left relative overflow-hidden"
              >
                <div className="absolute top-0 right-0 bg-primary text-primary-foreground text-xs font-medium px-3 py-1 rounded-bl-xl">
                  ประหยัด 25%
                </div>
                <div className="flex items-center justify-between mb-2">
                  <div>
                    <h3 className="font-semibold text-foreground">รายปี</h3>
                    <p className="text-sm text-muted-foreground">คุ้มค่าที่สุด</p>
                  </div>
                  <div className="text-right">
                    <span className="text-2xl font-bold text-foreground">฿1,788</span>
                    <span className="text-sm text-muted-foreground">/ปี</span>
                    <p className="text-xs text-primary">≈ ฿149/เดือน</p>
                  </div>
                </div>
              </button>
            </div>
          </>
        )}

        {/* Features Comparison */}
        <div className="space-y-4">
          {/* Free */}
          <div className="bg-card border border-border/50 rounded-2xl p-4">
            <h3 className="font-semibold text-foreground mb-3">Free</h3>
            <ul className="space-y-2">
              {features.free.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-muted-foreground">
                  <Check className="w-4 h-4 text-muted-foreground flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>

          {/* Pro */}
          <div className="bg-gradient-to-r from-primary/10 to-primary/5 border border-primary/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <Crown className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">Pro</h3>
            </div>
            <ul className="space-y-2">
              {features.pro.map((feature, i) => (
                <li key={i} className="flex items-center gap-2 text-sm text-foreground">
                  <Check className="w-4 h-4 text-primary flex-shrink-0" />
                  {feature}
                </li>
              ))}
            </ul>
          </div>
        </div>

        {/* Disclaimer */}
        <p className="text-xs text-center text-muted-foreground">
          การสมัครสมาชิกจะต่ออายุอัตโนมัติ สามารถยกเลิกได้ก่อนหมดรอบบิล
        </p>
      </div>
    </div>
  );
};

export default SubscriptionPage;
