import { useState } from 'react';
import { useNavigate, useSearchParams, Link } from 'react-router-dom';
import { ArrowLeft, Camera, Upload, ChevronRight, AlertCircle, Dog, Cat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import type { ScanCategory, TriageLevel } from '@/types';
import dogAvatar from '@/assets/dog-avatar.jpg';
import catAvatar from '@/assets/cat-avatar.jpg';

const categories: { id: ScanCategory; name: string; desc: string }[] = [
  { id: 'skin', name: 'ผิวหนัง/ขน', desc: 'ผื่น, คัน, ขนร่วง, ตุ่ม, แผล' },
  { id: 'eyes', name: 'ตา/หู', desc: 'ตาแดง, ตาบวม, น้ำตาไหล, หูอักเสบ' },
  { id: 'stool', name: 'อุจจาระ', desc: 'ท้องเสีย, ท้องผูก, มีเลือด' },
  { id: 'vomit', name: 'อาเจียน', desc: 'อาเจียน, คลื่นไส้' },
  { id: 'behavior', name: 'พฤติกรรม', desc: 'ซึม, กินน้อย, ไม่ร่าเริง' },
  { id: 'other', name: 'อื่นๆ', desc: 'อาการอื่นที่ไม่ระบุ' },
];

type Step = 'pet' | 'category' | 'photo' | 'details' | 'analyzing' | 'result';

const ScanPage = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const { pets, user, addScan, incrementScanQuota } = useAppStore();
  
  const [step, setStep] = useState<Step>('pet');
  const [selectedPetId, setSelectedPetId] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<ScanCategory | null>(
    (searchParams.get('category') as ScanCategory) || null
  );
  const [imagePreview, setImagePreview] = useState<string | null>(null);
  const [symptoms, setSymptoms] = useState('');
  const [duration, setDuration] = useState('');

  const canScan = user ? (user.plan === 'PRO' || user.scanQuotaUsed < user.maxFreeScans) : false;

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
        setStep('details');
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmitScan = () => {
    if (!selectedPetId || !selectedCategory) return;
    
    setStep('analyzing');
    
    // Simulate AI analysis
    setTimeout(() => {
      const mockResult: TriageLevel = 
        selectedCategory === 'emergency' ? 'EMERGENCY' :
        Math.random() > 0.7 ? 'SEE_VET' : 
        Math.random() > 0.5 ? 'OBSERVE' : 'NORMAL';
      
      const newScan = {
        id: Date.now().toString(),
        petId: selectedPetId,
        category: selectedCategory,
        imageUrl: imagePreview || undefined,
        textInput: symptoms,
        triageLevel: mockResult,
        summary: 'จากการวิเคราะห์เบื้องต้น พบว่าอาการของน้องอยู่ในระดับที่ต้องเฝ้าดูอาการ',
        likelyCauses: ['อาการระคายเคืองผิวหนังเล็กน้อย', 'อาจเกิดจากสภาพอากาศ'],
        doNow: ['ทำความสะอาดบริเวณที่มีอาการ', 'หลีกเลี่ยงการเกา'],
        watchFor: ['อาการบวมแดงเพิ่มขึ้น', 'น้องซึมลง', 'ไม่กินอาหาร'],
        disclaimer: 'ผลวิเคราะห์นี้เป็นเพียงการประเมินเบื้องต้น ไม่ใช่การวินิจฉัยโรค กรุณาปรึกษาสัตวแพทย์',
        affiliateTags: ['skin-care', 'shampoo'],
        createdAt: new Date().toISOString(),
      };
      
      addScan(newScan);
      incrementScanQuota();
      navigate(`/scan-result/${newScan.id}`);
    }, 3000);
  };

  if (!canScan) {
    return (
      <div className="min-h-screen bg-background p-4">
        <button onClick={() => navigate(-1)} className="flex items-center gap-2 text-muted-foreground mb-6">
          <ArrowLeft className="w-5 h-5" />
          <span>กลับ</span>
        </button>
        
        <div className="text-center py-12">
          <div className="w-20 h-20 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-4">
            <AlertCircle className="w-10 h-10 text-primary" />
          </div>
          <h1 className="text-2xl font-bold text-foreground mb-2">ใช้สิทธิ์ฟรีครบแล้ว</h1>
          <p className="text-muted-foreground mb-6">
            คุณใช้สแกนฟรี 5 ครั้งหมดแล้ว<br />
            อัพเกรดเป็น Pro เพื่อสแกนต่อไม่จำกัด
          </p>
          <Link to="/subscription">
            <Button size="lg">อัพเกรดเป็น Pro</Button>
          </Link>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-background">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => step === 'pet' ? navigate(-1) : setStep(
            step === 'category' ? 'pet' : 
            step === 'photo' ? 'category' : 
            step === 'details' ? 'photo' : 'pet'
          )}>
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">สแกนอาการ</h1>
        </div>
        
        {/* Progress */}
        <div className="flex gap-2 mt-3">
          {['pet', 'category', 'photo', 'details'].map((s, i) => (
            <div 
              key={s}
              className={cn(
                "h-1 flex-1 rounded-full transition-colors",
                ['pet', 'category', 'photo', 'details'].indexOf(step) >= i 
                  ? 'bg-primary' 
                  : 'bg-muted'
              )}
            />
          ))}
        </div>
      </header>

      <div className="p-4">
        {/* Step 1: Select Pet */}
        {step === 'pet' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-2">เลือกน้องที่ต้องการสแกน</h2>
            <p className="text-muted-foreground text-sm mb-6">เลือกสัตว์เลี้ยงของคุณ</p>
            
            {pets.length === 0 ? (
              <div className="text-center py-8">
                <div className="flex justify-center gap-4 mb-4">
                  <img src={dogAvatar} alt="Dog" className="w-16 h-16 rounded-full opacity-50" />
                  <img src={catAvatar} alt="Cat" className="w-16 h-16 rounded-full opacity-50" />
                </div>
                <p className="text-muted-foreground mb-4">ยังไม่มีสัตว์เลี้ยง</p>
                <Link to="/passport/add">
                  <Button>เพิ่มสัตว์เลี้ยงตัวแรก</Button>
                </Link>
              </div>
            ) : (
              <div className="space-y-3">
                {pets.map((pet) => (
                  <button
                    key={pet.id}
                    onClick={() => {
                      setSelectedPetId(pet.id);
                      setStep(selectedCategory ? 'photo' : 'category');
                    }}
                    className={cn(
                      "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                      selectedPetId === pet.id 
                        ? "border-primary bg-primary/5" 
                        : "border-border bg-card hover:border-primary/50"
                    )}
                  >
                    <div className="w-14 h-14 rounded-full overflow-hidden bg-muted flex items-center justify-center">
                      {pet.photoUrl ? (
                        <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                      ) : pet.species === 'dog' ? (
                        <Dog className="w-7 h-7 text-muted-foreground" />
                      ) : (
                        <Cat className="w-7 h-7 text-muted-foreground" />
                      )}
                    </div>
                    <div className="flex-1 text-left">
                      <h3 className="font-medium text-foreground">{pet.name}</h3>
                      <p className="text-sm text-muted-foreground">{pet.breed}</p>
                    </div>
                    <ChevronRight className="w-5 h-5 text-muted-foreground" />
                  </button>
                ))}
              </div>
            )}
          </div>
        )}

        {/* Step 2: Select Category */}
        {step === 'category' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-2">เลือกประเภทอาการ</h2>
            <p className="text-muted-foreground text-sm mb-6">น้องมีอาการด้านไหน?</p>
            
            <div className="space-y-3">
              {categories.map((cat) => (
                <button
                  key={cat.id}
                  onClick={() => {
                    setSelectedCategory(cat.id);
                    setStep('photo');
                  }}
                  className={cn(
                    "w-full flex items-center gap-4 p-4 rounded-2xl border-2 transition-all",
                    selectedCategory === cat.id 
                      ? "border-primary bg-primary/5" 
                      : "border-border bg-card hover:border-primary/50"
                  )}
                >
                  <div className="flex-1 text-left">
                    <h3 className="font-medium text-foreground">{cat.name}</h3>
                    <p className="text-sm text-muted-foreground">{cat.desc}</p>
                  </div>
                  <ChevronRight className="w-5 h-5 text-muted-foreground" />
                </button>
              ))}
            </div>
          </div>
        )}

        {/* Step 3: Photo */}
        {step === 'photo' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-2">ถ่ายรูปอาการ</h2>
            <p className="text-muted-foreground text-sm mb-6">ถ่ายหรืออัปโหลดรูปบริเวณที่มีอาการ</p>
            
            <div className="aspect-square rounded-3xl border-2 border-dashed border-border bg-muted/30 flex flex-col items-center justify-center mb-6 overflow-hidden">
              {imagePreview ? (
                <img src={imagePreview} alt="Preview" className="w-full h-full object-cover" />
              ) : (
                <>
                  <Camera className="w-12 h-12 text-muted-foreground mb-4" />
                  <p className="text-muted-foreground text-sm text-center px-4">
                    ถ่ายรูปให้ชัด<br />เห็นบริเวณที่มีอาการ
                  </p>
                </>
              )}
            </div>
            
            <div className="flex gap-3">
              <label className="flex-1">
                <input 
                  type="file" 
                  accept="image/*" 
                  capture="environment"
                  onChange={handleImageUpload}
                  className="hidden" 
                />
                <Button variant="default" className="w-full" asChild>
                  <span><Camera className="w-5 h-5 mr-2" /> ถ่ายรูป</span>
                </Button>
              </label>
              
              <label className="flex-1">
                <input 
                  type="file" 
                  accept="image/*"
                  onChange={handleImageUpload}
                  className="hidden" 
                />
                <Button variant="outline" className="w-full" asChild>
                  <span><Upload className="w-5 h-5 mr-2" /> อัปโหลด</span>
                </Button>
              </label>
            </div>
            
            <button 
              onClick={() => setStep('details')}
              className="w-full text-center text-muted-foreground text-sm mt-4 py-2"
            >
              ข้ามขั้นตอนนี้ →
            </button>
          </div>
        )}

        {/* Step 4: Details */}
        {step === 'details' && (
          <div className="animate-fade-in">
            <h2 className="text-xl font-semibold text-foreground mb-2">บอกรายละเอียดเพิ่มเติม</h2>
            <p className="text-muted-foreground text-sm mb-6">ยิ่งละเอียด AI วิเคราะห์ได้แม่นยำขึ้น</p>
            
            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">อาการที่พบ</label>
                <textarea
                  value={symptoms}
                  onChange={(e) => setSymptoms(e.target.value)}
                  placeholder="เช่น มีตุ่มแดงที่ท้อง เกาบ่อย ขนร่วง..."
                  className="w-full h-32 p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground resize-none focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
              
              <div>
                <label className="block text-sm font-medium text-foreground mb-2">ระยะเวลาที่เป็น</label>
                <input
                  type="text"
                  value={duration}
                  onChange={(e) => setDuration(e.target.value)}
                  placeholder="เช่น 2-3 วัน"
                  className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
                />
              </div>
            </div>
            
            <div className="mt-8">
              <Button onClick={handleSubmitScan} className="w-full" size="lg">
                เริ่มวิเคราะห์
              </Button>
            </div>
          </div>
        )}

        {/* Analyzing */}
        {step === 'analyzing' && (
          <div className="animate-fade-in text-center py-16">
            <div className="w-24 h-24 rounded-full bg-primary/10 flex items-center justify-center mx-auto mb-6 animate-pulse">
              <div className="w-16 h-16 rounded-full bg-primary/20 flex items-center justify-center">
                <div className="w-8 h-8 rounded-full bg-primary animate-bounce-soft" />
              </div>
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">กำลังวิเคราะห์...</h2>
            <p className="text-muted-foreground">AI กำลังประมวลผลข้อมูล</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ScanPage;
