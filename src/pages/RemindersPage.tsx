import { useState } from 'react';
import { ArrowLeft, Plus, Bell, Clock, Syringe, Bug, Pill, Calendar, ToggleRight, Trash2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { useNavigate } from 'react-router-dom';
import { cn } from '@/lib/utils';
import type { ReminderType } from '@/types';

const reminderTypeConfig: Record<ReminderType, { label: string; icon: React.ElementType; color: string }> = {
  vaccine: { label: 'วัคซีน', icon: Syringe, color: 'text-info' },
  parasite: { label: 'ถ่ายพยาธิ/เห็บหมัด', icon: Bug, color: 'text-warning' },
  medication: { label: 'ยา', icon: Pill, color: 'text-accent' },
  checkup: { label: 'ตรวจสุขภาพ', icon: Calendar, color: 'text-success' },
  followup: { label: 'ติดตามอาการ', icon: Clock, color: 'text-primary' },
};

const RemindersPage = () => {
  const navigate = useNavigate();
  const { reminders, pets, updateReminder, deleteReminder, user } = useAppStore();
  const [showAddModal, setShowAddModal] = useState(false);

  const isPro = user?.plan === 'PRO';

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">การแจ้งเตือน</h1>
          <Button size="sm" variant="ghost" onClick={() => setShowAddModal(true)}>
            <Plus className="w-5 h-5" />
          </Button>
        </div>
      </header>

      <div className="p-4">
        {reminders.length === 0 ? (
          <div className="text-center py-16">
            <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
              <Bell className="w-10 h-10 text-primary" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">ยังไม่มีการแจ้งเตือน</h2>
            <p className="text-muted-foreground mb-6">
              ตั้งแจ้งเตือนวัคซีน ถ่ายพยาธิ<br />หรือติดตามอาการน้อง
            </p>
            <Button onClick={() => setShowAddModal(true)}>
              <Plus className="w-5 h-5 mr-2" />
              เพิ่มการแจ้งเตือน
            </Button>
          </div>
        ) : (
          <div className="space-y-3">
            {reminders.map((reminder) => {
              const pet = pets.find(p => p.id === reminder.petId);
              const config = reminderTypeConfig[reminder.type];
              const Icon = config.icon;
              
              return (
                <div 
                  key={reminder.id}
                  className={cn(
                    "bg-card rounded-2xl p-4 border border-border/50",
                    !reminder.enabled && "opacity-50"
                  )}
                >
                  <div className="flex items-start gap-3">
                    <div className={cn(
                      "w-10 h-10 rounded-xl flex items-center justify-center bg-muted",
                      config.color
                    )}>
                      <Icon className="w-5 h-5" />
                    </div>
                    
                    <div className="flex-1">
                      <h3 className="font-medium text-foreground">{reminder.title}</h3>
                      <p className="text-sm text-muted-foreground">
                        {pet?.name || 'ไม่ระบุ'} • {config.label}
                      </p>
                      <p className="text-xs text-muted-foreground mt-1">
                        {new Date(reminder.scheduleAt).toLocaleDateString('th-TH', {
                          year: 'numeric',
                          month: 'long',
                          day: 'numeric',
                          hour: '2-digit',
                          minute: '2-digit',
                        })}
                      </p>
                    </div>
                    
                    <div className="flex items-center gap-2">
                      <button
                        onClick={() => updateReminder(reminder.id, { enabled: !reminder.enabled })}
                        className={cn(
                          "p-2 rounded-lg transition-colors",
                          reminder.enabled ? "text-success" : "text-muted-foreground"
                        )}
                      >
                        <ToggleRight className="w-6 h-6" />
                      </button>
                      <button
                        onClick={() => deleteReminder(reminder.id)}
                        className="p-2 rounded-lg text-muted-foreground hover:text-destructive transition-colors"
                      >
                        <Trash2 className="w-5 h-5" />
                      </button>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        )}

        {!isPro && reminders.length > 0 && (
          <div className="mt-6 p-4 rounded-2xl bg-secondary/30 border border-secondary text-center">
            <p className="text-sm text-muted-foreground">
              อัพเกรดเป็น Pro เพื่อใช้ระบบแจ้งเตือนแบบครบครัน
            </p>
            <Button variant="link" className="mt-2" onClick={() => navigate('/subscription')}>
              ดูแพ็คเกจ Pro →
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};

export default RemindersPage;
