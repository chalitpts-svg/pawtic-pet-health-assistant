import { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { ArrowLeft, Camera, Dog, Cat } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import type { PetSpecies, PetSex } from '@/types';

const AddPetPage = () => {
  const navigate = useNavigate();
  const { addPet, user, pets } = useAppStore();
  
  const [name, setName] = useState('');
  const [species, setSpecies] = useState<PetSpecies>('dog');
  const [breed, setBreed] = useState('');
  const [sex, setSex] = useState<PetSex>('male');
  const [weight, setWeight] = useState('');
  const [photoUrl, setPhotoUrl] = useState<string | null>(null);
  
  const canAddPet = user?.plan === 'PRO' || pets.length < 1;

  const handlePhotoUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setPhotoUrl(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSubmit = () => {
    if (!name.trim()) return;
    
    addPet({
      id: Date.now().toString(),
      name: name.trim(),
      species,
      breed: breed.trim() || (species === 'dog' ? 'สุนัขพันทาง' : 'แมวพันทาง'),
      sex,
      weight: weight ? parseFloat(weight) : undefined,
      photoUrl: photoUrl || undefined,
      isVaccinated: false,
      isCertified: false,
      createdAt: new Date().toISOString(),
    });
    
    navigate('/passport');
  };

  if (!canAddPet) {
    navigate('/subscription');
    return null;
  }

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-foreground">เพิ่มสัตว์เลี้ยง</h1>
        </div>
      </header>

      <div className="p-4 space-y-6">
        {/* Photo */}
        <div className="flex justify-center">
          <label className="relative cursor-pointer">
            <input 
              type="file" 
              accept="image/*"
              onChange={handlePhotoUpload}
              className="hidden" 
            />
            <div className="w-32 h-32 rounded-3xl bg-muted border-2 border-dashed border-border flex items-center justify-center overflow-hidden">
              {photoUrl ? (
                <img src={photoUrl} alt="Pet" className="w-full h-full object-cover" />
              ) : (
                <Camera className="w-8 h-8 text-muted-foreground" />
              )}
            </div>
            <div className="absolute bottom-2 right-2 w-8 h-8 rounded-full bg-primary flex items-center justify-center">
              <Camera className="w-4 h-4 text-primary-foreground" />
            </div>
          </label>
        </div>

        {/* Species */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">ประเภท</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSpecies('dog')}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                species === 'dog' ? "border-primary bg-primary/5" : "border-border bg-card"
              )}
            >
              <Dog className={cn("w-8 h-8", species === 'dog' ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("font-medium", species === 'dog' ? "text-primary" : "text-muted-foreground")}>
                สุนัข
              </span>
            </button>
            <button
              onClick={() => setSpecies('cat')}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 flex flex-col items-center gap-2 transition-all",
                species === 'cat' ? "border-primary bg-primary/5" : "border-border bg-card"
              )}
            >
              <Cat className={cn("w-8 h-8", species === 'cat' ? "text-primary" : "text-muted-foreground")} />
              <span className={cn("font-medium", species === 'cat' ? "text-primary" : "text-muted-foreground")}>
                แมว
              </span>
            </button>
          </div>
        </div>

        {/* Name */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">ชื่อ *</label>
          <input
            type="text"
            value={name}
            onChange={(e) => setName(e.target.value)}
            placeholder="ชื่อน้อง"
            className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Breed */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">สายพันธุ์</label>
          <input
            type="text"
            value={breed}
            onChange={(e) => setBreed(e.target.value)}
            placeholder={species === 'dog' ? 'เช่น โกลเด้นรีทรีฟเวอร์' : 'เช่น สก๊อตติชโฟลด์'}
            className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Sex */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-3">เพศ</label>
          <div className="flex gap-3">
            <button
              onClick={() => setSex('male')}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all",
                sex === 'male' ? "border-primary bg-primary/5" : "border-border bg-card"
              )}
            >
              <span className="text-xl">♂</span>
              <span className={cn("font-medium", sex === 'male' ? "text-primary" : "text-muted-foreground")}>
                ผู้
              </span>
            </button>
            <button
              onClick={() => setSex('female')}
              className={cn(
                "flex-1 p-4 rounded-2xl border-2 flex items-center justify-center gap-2 transition-all",
                sex === 'female' ? "border-primary bg-primary/5" : "border-border bg-card"
              )}
            >
              <span className="text-xl">♀</span>
              <span className={cn("font-medium", sex === 'female' ? "text-primary" : "text-muted-foreground")}>
                เมีย
              </span>
            </button>
          </div>
        </div>

        {/* Weight */}
        <div>
          <label className="block text-sm font-medium text-foreground mb-2">น้ำหนัก (kg)</label>
          <input
            type="number"
            step="0.1"
            value={weight}
            onChange={(e) => setWeight(e.target.value)}
            placeholder="เช่น 5.5"
            className="w-full p-4 rounded-2xl border border-border bg-card text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-primary"
          />
        </div>

        {/* Submit */}
        <Button 
          onClick={handleSubmit} 
          disabled={!name.trim()}
          className="w-full" 
          size="lg"
        >
          เพิ่มสัตว์เลี้ยง
        </Button>
      </div>
    </div>
  );
};

export default AddPetPage;
