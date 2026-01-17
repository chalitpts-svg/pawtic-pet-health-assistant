import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { PawPrint, Shield, Sparkles, ArrowRight, Check } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import catAvatar from '@/assets/cat-avatar.jpg';
import dogAvatar from '@/assets/dog-avatar.jpg';

const OnboardingPage = () => {
  const navigate = useNavigate();
  const { setHasAcceptedDisclaimer, setHasCompletedOnboarding } = useAppStore();
  const [step, setStep] = useState(0);
  const [accepted, setAccepted] = useState({
    disclaimer: false,
    privacy: false,
    terms: false,
  });

  const allAccepted = accepted.disclaimer && accepted.privacy && accepted.terms;

  const handleComplete = () => {
    setHasAcceptedDisclaimer(true);
    setHasCompletedOnboarding(true);
    navigate('/');
  };

  return (
    <div className="min-h-screen bg-background flex flex-col">
      {/* Welcome Steps */}
      {step === 0 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="relative mb-8">
            <div className="w-32 h-32 rounded-full gradient-primary flex items-center justify-center shadow-glow">
              <PawPrint className="w-16 h-16 text-primary-foreground" />
            </div>
            <div className="absolute -right-2 -bottom-2 w-12 h-12 rounded-full overflow-hidden border-4 border-background">
              <img src={catAvatar} alt="Cat" className="w-full h-full object-cover" />
            </div>
            <div className="absolute -left-2 -bottom-2 w-12 h-12 rounded-full overflow-hidden border-4 border-background">
              <img src={dogAvatar} alt="Dog" className="w-full h-full object-cover" />
            </div>
          </div>
          
          <h1 className="text-3xl font-bold text-foreground text-center mb-3">
            ยินดีต้อนรับสู่ Pawtic
          </h1>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            AI Pet Health Assistant<br />
            ผู้ช่วยดูแลสุขภาพน้องรักของคุณ
          </p>
          
          <Button size="lg" onClick={() => setStep(1)} className="w-full max-w-xs">
            เริ่มต้นใช้งาน
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === 1 && (
        <div className="flex-1 flex flex-col items-center justify-center p-6 animate-fade-in">
          <div className="w-24 h-24 rounded-full bg-secondary flex items-center justify-center mb-6">
            <Sparkles className="w-12 h-12 text-primary" />
          </div>
          
          <h2 className="text-2xl font-bold text-foreground text-center mb-3">
            AI วิเคราะห์อาการเบื้องต้น
          </h2>
          <p className="text-muted-foreground text-center mb-8 max-w-xs">
            ถ่ายรูปหรือบอกอาการ<br />
            AI จะช่วยประเมินความรุนแรง<br />
            และแนะนำขั้นตอนต่อไป
          </p>
          
          <Button size="lg" onClick={() => setStep(2)} className="w-full max-w-xs">
            ต่อไป
            <ArrowRight className="w-5 h-5 ml-2" />
          </Button>
        </div>
      )}

      {step === 2 && (
        <div className="flex-1 flex flex-col p-6 animate-fade-in">
          <div className="flex-1">
            <div className="w-20 h-20 rounded-full bg-warning/10 flex items-center justify-center mb-6 mx-auto">
              <Shield className="w-10 h-10 text-warning" />
            </div>
            
            <h2 className="text-2xl font-bold text-foreground text-center mb-3">
              ข้อกำหนดและข้อตกลง
            </h2>
            <p className="text-muted-foreground text-center mb-6">
              กรุณาอ่านและยอมรับข้อตกลงก่อนใช้งาน
            </p>

            {/* Disclaimer */}
            <div className="space-y-3">
              <button
                onClick={() => setAccepted(prev => ({ ...prev, disclaimer: !prev.disclaimer }))}
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                  accepted.disclaimer ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                  accepted.disclaimer ? "border-primary bg-primary" : "border-border"
                )}>
                  {accepted.disclaimer && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">ข้อจำกัดความรับผิดชอบ</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    Pawtic เป็นเพียง <strong>เครื่องมือช่วยตัดสินใจ (Decision Support Tool)</strong> ไม่ใช่การวินิจฉัยโรคหรือการรักษาทางการแพทย์ และไม่สามารถแทนที่สัตวแพทย์ได้
                  </p>
                </div>
              </button>

              <button
                onClick={() => setAccepted(prev => ({ ...prev, privacy: !prev.privacy }))}
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                  accepted.privacy ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                  accepted.privacy ? "border-primary bg-primary" : "border-border"
                )}>
                  {accepted.privacy && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">นโยบายความเป็นส่วนตัว</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ฉันยินยอมให้ Pawtic เก็บรวบรวมและใช้ข้อมูลตาม PDPA
                  </p>
                </div>
              </button>

              <button
                onClick={() => setAccepted(prev => ({ ...prev, terms: !prev.terms }))}
                className={cn(
                  "w-full flex items-start gap-3 p-4 rounded-2xl border-2 text-left transition-all",
                  accepted.terms ? "border-primary bg-primary/5" : "border-border bg-card"
                )}
              >
                <div className={cn(
                  "w-6 h-6 rounded-full border-2 flex items-center justify-center flex-shrink-0 mt-0.5",
                  accepted.terms ? "border-primary bg-primary" : "border-border"
                )}>
                  {accepted.terms && <Check className="w-4 h-4 text-primary-foreground" />}
                </div>
                <div>
                  <h3 className="font-medium text-foreground">ข้อกำหนดการใช้งาน</h3>
                  <p className="text-sm text-muted-foreground mt-1">
                    ฉันยอมรับเงื่อนไขการใช้งานแอปพลิเคชัน Pawtic
                  </p>
                </div>
              </button>
            </div>
          </div>

          <Button 
            size="lg" 
            onClick={handleComplete} 
            disabled={!allAccepted}
            className="w-full mt-6"
          >
            ยอมรับและเริ่มใช้งาน
          </Button>
        </div>
      )}

      {/* Progress Dots */}
      <div className="flex justify-center gap-2 py-6">
        {[0, 1, 2].map((i) => (
          <div 
            key={i}
            className={cn(
              "w-2 h-2 rounded-full transition-colors",
              step === i ? "bg-primary" : "bg-muted"
            )}
          />
        ))}
      </div>
    </div>
  );
};

export default OnboardingPage;
