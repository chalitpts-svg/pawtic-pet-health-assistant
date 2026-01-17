import { useAppStore } from '@/stores/appStore';
import { Link } from 'react-router-dom';
import { Clock, ChevronRight } from 'lucide-react';
import { cn } from '@/lib/utils';
import type { TriageLevel } from '@/types';

const triageLevelConfig: Record<TriageLevel, { label: string; className: string }> = {
  NORMAL: { label: 'ปกติ', className: 'triage-normal' },
  OBSERVE: { label: 'เฝ้าดู', className: 'triage-observe' },
  SEE_VET: { label: 'พบหมอ', className: 'triage-seevet' },
  EMERGENCY: { label: 'ฉุกเฉิน', className: 'triage-emergency' },
};

const categoryLabels: Record<string, string> = {
  skin: 'ผิวหนัง/ขน',
  eyes: 'ตา/หู',
  stool: 'อุจจาระ',
  vomit: 'อาเจียน',
  behavior: 'พฤติกรรม',
  emergency: 'ฉุกเฉิน',
  other: 'อื่นๆ',
};

export function RecentScans() {
  const { scans, pets } = useAppStore();
  const recentScans = scans.slice(0, 3);

  if (recentScans.length === 0) {
    return (
      <div className="px-4 mt-6">
        <h2 className="text-lg font-semibold text-foreground mb-4">ประวัติสแกน</h2>
        <div className="bg-muted/50 rounded-2xl p-6 text-center">
          <Clock className="w-10 h-10 text-muted-foreground mx-auto mb-3" />
          <p className="text-muted-foreground text-sm">ยังไม่มีประวัติการสแกน</p>
          <Link to="/scan" className="text-primary text-sm font-medium mt-2 inline-block">
            เริ่มสแกนครั้งแรก →
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="px-4 mt-6">
      <div className="flex items-center justify-between mb-4">
        <h2 className="text-lg font-semibold text-foreground">ประวัติสแกน</h2>
        <Link to="/passport" className="text-sm text-muted-foreground hover:text-foreground transition-colors">
          ดูทั้งหมด
        </Link>
      </div>

      <div className="space-y-3">
        {recentScans.map((scan) => {
          const pet = pets.find(p => p.id === scan.petId);
          const triage = triageLevelConfig[scan.triageLevel];
          
          return (
            <Link 
              key={scan.id}
              to={`/scan-result/${scan.id}`}
              className="flex items-center gap-3 p-4 bg-card rounded-2xl border border-border/50 hover:border-primary/30 transition-colors"
            >
              <div className="flex-1">
                <div className="flex items-center gap-2 mb-1">
                  <span className="text-sm font-medium text-foreground">
                    {pet?.name || 'ไม่ระบุ'}
                  </span>
                  <span className={cn(
                    "px-2 py-0.5 rounded-full text-xs font-medium",
                    triage.className
                  )}>
                    {triage.label}
                  </span>
                </div>
                <p className="text-xs text-muted-foreground">
                  {categoryLabels[scan.category]} • {new Date(scan.createdAt).toLocaleDateString('th-TH')}
                </p>
              </div>
              <ChevronRight className="w-5 h-5 text-muted-foreground" />
            </Link>
          );
        })}
      </div>
    </div>
  );
}
