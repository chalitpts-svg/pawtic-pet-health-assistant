import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { ArrowLeft, Plus, Dog, Cat, ChevronRight, MoreHorizontal, Clock, Syringe } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useAppStore } from '@/stores/appStore';
import { cn } from '@/lib/utils';
import dogAvatar from '@/assets/dog-avatar.jpg';
import catAvatar from '@/assets/cat-avatar.jpg';

const PetPassportPage = () => {
  const navigate = useNavigate();
  const { pets, scans, user } = useAppStore();
  
  const canAddPet = user?.plan === 'PRO' || pets.length < 1;

  return (
    <div className="min-h-screen bg-background pb-24">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-card border-b border-border/50 px-4 py-3">
        <div className="flex items-center justify-between">
          <h1 className="text-lg font-semibold text-foreground">Pet Passport</h1>
          {canAddPet && (
            <Link to="/passport/add">
              <Button size="sm" variant="ghost">
                <Plus className="w-5 h-5" />
              </Button>
            </Link>
          )}
        </div>
      </header>

      <div className="p-4">
        {pets.length === 0 ? (
          <div className="text-center py-16">
            <div className="flex justify-center gap-4 mb-6">
              <img src={dogAvatar} alt="Dog" className="w-20 h-20 rounded-full opacity-50" />
              <img src={catAvatar} alt="Cat" className="w-20 h-20 rounded-full opacity-50" />
            </div>
            <h2 className="text-xl font-semibold text-foreground mb-2">ยังไม่มีสัตว์เลี้ยง</h2>
            <p className="text-muted-foreground mb-6">เพิ่มน้องของคุณเพื่อบันทึกประวัติสุขภาพ</p>
            <Link to="/passport/add">
              <Button>
                <Plus className="w-5 h-5 mr-2" />
                เพิ่มสัตว์เลี้ยง
              </Button>
            </Link>
          </div>
        ) : (
          <div className="space-y-4">
            {pets.map((pet) => {
              const petScans = scans.filter(s => s.petId === pet.id);
              
              return (
                <Link 
                  key={pet.id}
                  to={`/passport/${pet.id}`}
                  className="block"
                >
                  <div className="bg-card rounded-3xl border border-border/50 overflow-hidden">
                    {/* Pet Header */}
                    <div className="relative gradient-card-lavender p-6 pb-16">
                      {/* Decorative elements */}
                      <div className="absolute top-4 right-4 w-2 h-2 bg-card/40 rounded-full" />
                      <div className="absolute top-8 right-8 w-1 h-1 bg-card/30 rounded-full" />
                      <div className="absolute bottom-4 left-4 opacity-10">
                        <svg width="40" height="40" viewBox="0 0 24 24" fill="currentColor">
                          <path d="M12 2C6.48 2 2 6.48 2 12s4.48 10 10 10 10-4.48 10-10S17.52 2 12 2z"/>
                        </svg>
                      </div>
                      
                      <div className="flex justify-between">
                        <div>
                          <span className="text-xs text-secondary-foreground/70">Pet Passport</span>
                        </div>
                        <button onClick={(e) => e.preventDefault()}>
                          <MoreHorizontal className="w-5 h-5 text-secondary-foreground/70" />
                        </button>
                      </div>
                    </div>
                    
                    {/* Pet Avatar */}
                    <div className="relative px-6 -mt-12">
                      <div className="w-24 h-24 rounded-2xl overflow-hidden border-4 border-card shadow-medium bg-card">
                        {pet.photoUrl ? (
                          <img src={pet.photoUrl} alt={pet.name} className="w-full h-full object-cover" />
                        ) : (
                          <div className="w-full h-full flex items-center justify-center bg-muted">
                            {pet.species === 'dog' ? (
                              <Dog className="w-10 h-10 text-muted-foreground" />
                            ) : (
                              <Cat className="w-10 h-10 text-muted-foreground" />
                            )}
                          </div>
                        )}
                      </div>
                    </div>
                    
                    {/* Pet Info */}
                    <div className="p-6 pt-3">
                      <h2 className="text-xl font-semibold text-foreground">{pet.name}</h2>
                      <p className="text-sm text-muted-foreground mb-4">{pet.breed}</p>
                      
                      {/* Chips */}
                      <div className="flex flex-wrap gap-2 mb-4">
                        <span className="chip">
                          {pet.sex === 'male' ? '♂ ผู้' : '♀ เมีย'}
                        </span>
                        {pet.isVaccinated && (
                          <span className="chip chip-primary">
                            <Syringe className="w-3 h-3" /> ฉีดวัคซีนแล้ว
                          </span>
                        )}
                        {pet.weight && (
                          <span className="chip">{pet.weight} kg</span>
                        )}
                      </div>
                      
                      {/* Quick Stats */}
                      <div className="flex items-center justify-between pt-4 border-t border-border">
                        <div className="flex items-center gap-2 text-sm text-muted-foreground">
                          <Clock className="w-4 h-4" />
                          <span>{petScans.length} ครั้งสแกน</span>
                        </div>
                        <ChevronRight className="w-5 h-5 text-muted-foreground" />
                      </div>
                    </div>
                  </div>
                </Link>
              );
            })}
            
            {/* Add more button */}
            {canAddPet && (
              <Link to="/passport/add">
                <div className="flex items-center justify-center gap-2 p-6 rounded-3xl border-2 border-dashed border-border text-muted-foreground hover:border-primary hover:text-primary transition-colors">
                  <Plus className="w-5 h-5" />
                  <span>เพิ่มสัตว์เลี้ยง</span>
                </div>
              </Link>
            )}
            
            {!canAddPet && (
              <Link to="/subscription">
                <div className="flex items-center justify-center gap-2 p-6 rounded-3xl bg-secondary/30 border border-secondary">
                  <span className="text-sm text-muted-foreground">
                    อัพเกรดเป็น Pro เพื่อเพิ่มสัตว์เลี้ยงได้ไม่จำกัด
                  </span>
                </div>
              </Link>
            )}
          </div>
        )}
      </div>
    </div>
  );
};

export default PetPassportPage;
