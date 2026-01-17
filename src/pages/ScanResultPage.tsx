import { useParams, useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, MapPin, Phone, AlertTriangle, CheckCircle2, Clock, AlertCircle, Save, Bell, ShoppingBag } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import type { TriageLevel } from '@/types';

const triageConfig: Record<TriageLevel, { 
  label: string; 
  color: string; 
  bgColor: string;
  icon: React.ElementType;
  message: string;
}> = {
  NORMAL: { 
    label: 'ปกติ', 
    color: 'text-success', 
    bgColor: 'bg-success/10',
    icon: CheckCircle2,
    message: 'อาการดูปกติ สามารถดูแลที่บ้านได้'
  },
  OBSERVE: { 
    label: 'เฝ้าดูอาการ', 
    color: 'text-warning', 
    bgColor: 'bg-warning/10',
    icon: Clock,
    message: 'ควรเฝ้าดูอาการ 24-48 ชั่วโมง'
  },
  SEE_VET: { 
    label: 'ควรพบหมอ', 
    color: 'text-accent', 
    bgColor: 'bg-accent/10',
    icon: AlertCircle,
    message: 'ควรพาไปพบสัตวแพทย์ภายใน 24 ชั่วโมง'
  },
  EMERGENCY: { 
    label: 'ฉุกเฉิน!', 
    color: 'text-emergency', 
    bgColor: 'bg-emergency/10',
    icon: AlertTriangle,
    message: 'ต้องพาไปพบสัตวแพทย์ทันที!'
  },
};

const ScanResultPage = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { scans, pets } = useAppStore();
  
  const scan = scans.find(s => s.id === id);
  const pet = scan ? pets.find(p => p.id === scan.petId) : null;
  
  if (!scan) {
    return (
      <div className="min-h-screen bg-background p-4 flex items-center justify-center">
        <div className="text-center">
          <p className="text-muted-foreground mb-4">ไม่พบผลสแกน</p>
          <Button onClick={() => navigate('/')}>กลับหน้าหลัก</Button>
        </div>
      </div>
    );
  }
  
  const triage = triageConfig[scan.triageLevel];
  const TriageIcon = triage.icon;

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate('/')}>
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">ผลการวิเคราะห์</h1>
        </div>
      </header>

      <div className="p-4 space-y-4">
        {/* Triage Card */}
        <div className={cn("p-6 rounded-3xl", triage.bgColor)}>
          <div className="flex items-center gap-3 mb-3">
            <div className={cn("w-12 h-12 rounded-full flex items-center justify-center", triage.bgColor)}>
              <TriageIcon className={cn("w-6 h-6", triage.color)} />
            </div>
            <div>
              <span className={cn("text-lg font-bold", triage.color)}>{triage.label}</span>
              {pet && <p className="text-sm text-muted-foreground">{pet.name}</p>}
            </div>
          </div>
          <p className={cn("text-base font-medium", triage.color)}>{triage.message}</p>
        </div>

        {/* Emergency Actions */}
        {scan.triageLevel === 'EMERGENCY' && (
          <div className="space-y-3">
            <Link to="/emergency">
              <Button variant="emergency" className="w-full" size="lg">
                <MapPin className="w-5 h-5 mr-2" />
                ค้นหาคลินิกฉุกเฉินใกล้ฉัน
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="lg">
              <Phone className="w-5 h-5 mr-2" />
              โทรหาคลินิก 24 ชม.
            </Button>
          </div>
        )}

        {/* Summary */}
        <div className="bg-card rounded-2xl p-4 border border-border/50">
          <h3 className="font-semibold text-foreground mb-3">สรุปการวิเคราะห์</h3>
          <p className="text-muted-foreground text-sm leading-relaxed">{scan.summary}</p>
        </div>

        {/* Likely Causes */}
        {scan.likelyCauses.length > 0 && (
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <h3 className="font-semibold text-foreground mb-3">สาเหตุที่เป็นไปได้</h3>
            <ul className="space-y-2">
              {scan.likelyCauses.map((cause, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <span className="w-5 h-5 rounded-full bg-muted flex items-center justify-center flex-shrink-0 text-xs font-medium">
                    {i + 1}
                  </span>
                  {cause}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Do Now */}
        {scan.doNow.length > 0 && (
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <h3 className="font-semibold text-foreground mb-3">สิ่งที่ควรทำตอนนี้</h3>
            <ul className="space-y-2">
              {scan.doNow.map((action, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <CheckCircle2 className="w-5 h-5 text-success flex-shrink-0" />
                  {action}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Watch For */}
        {scan.watchFor.length > 0 && (
          <div className="bg-card rounded-2xl p-4 border border-border/50">
            <h3 className="font-semibold text-foreground mb-3">อาการที่ควรเฝ้าดู</h3>
            <ul className="space-y-2">
              {scan.watchFor.map((symptom, i) => (
                <li key={i} className="flex items-start gap-2 text-sm text-muted-foreground">
                  <AlertCircle className="w-5 h-5 text-warning flex-shrink-0" />
                  {symptom}
                </li>
              ))}
            </ul>
          </div>
        )}

        {/* Actions based on triage level */}
        {(scan.triageLevel === 'NORMAL' || scan.triageLevel === 'OBSERVE') && (
          <div className="space-y-3">
            <Button variant="default" className="w-full" size="lg">
              <Save className="w-5 h-5 mr-2" />
              บันทึกลง Pet Passport
            </Button>
            <Button variant="outline" className="w-full" size="lg">
              <Bell className="w-5 h-5 mr-2" />
              ตั้งเตือนติดตามอาการ
            </Button>
          </div>
        )}

        {scan.triageLevel === 'SEE_VET' && (
          <div className="space-y-3">
            <Link to="/emergency">
              <Button variant="accent" className="w-full" size="lg">
                <MapPin className="w-5 h-5 mr-2" />
                ค้นหาคลินิกใกล้ฉัน
              </Button>
            </Link>
            <Button variant="outline" className="w-full" size="lg">
              <Save className="w-5 h-5 mr-2" />
              บันทึกลง Pet Passport
            </Button>
          </div>
        )}

        {/* Affiliate Products */}
        {scan.affiliateTags.length > 0 && (
          <div className="bg-secondary/30 rounded-2xl p-4">
            <div className="flex items-center gap-2 mb-3">
              <ShoppingBag className="w-5 h-5 text-primary" />
              <h3 className="font-semibold text-foreground">สินค้าแนะนำ</h3>
            </div>
            <div className="flex gap-3 overflow-x-auto pb-2">
              {['แชมพูสุนัข', 'สเปรย์รักษาผิว', 'อาหารเสริม'].map((product, i) => (
                <a
                  key={i}
                  href="https://shopee.co.th"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="flex-shrink-0 w-28 bg-card rounded-xl p-3 border border-border/50"
                >
                  <div className="w-full aspect-square bg-muted rounded-lg mb-2" />
                  <p className="text-xs text-foreground font-medium truncate">{product}</p>
                  <p className="text-xs text-muted-foreground">฿199</p>
                </a>
              ))}
            </div>
          </div>
        )}

        {/* Disclaimer */}
        <div className="bg-muted/50 rounded-2xl p-4">
          <p className="text-xs text-muted-foreground leading-relaxed">
            <strong>คำเตือน:</strong> {scan.disclaimer}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ScanResultPage;
