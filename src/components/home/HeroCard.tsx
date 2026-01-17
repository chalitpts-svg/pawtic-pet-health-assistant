import { Sparkles, ArrowRight } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Link } from 'react-router-dom';
import catAvatar from '@/assets/cat-avatar.jpg';

export function HeroCard() {
  return (
    <div className="relative overflow-hidden rounded-3xl gradient-card-pink p-5 mx-4 mt-4">
      {/* Decorative elements */}
      <div className="absolute top-4 right-4 w-2 h-2 bg-card/40 rounded-full" />
      <div className="absolute top-8 right-8 w-1.5 h-1.5 bg-card/30 rounded-full" />
      <div className="absolute bottom-6 left-6 w-1 h-1 bg-card/20 rounded-full" />
      
      <div className="flex items-center justify-between">
        <div className="flex-1 pr-4">
          <div className="inline-flex items-center gap-1.5 px-3 py-1 bg-card/30 rounded-full mb-3">
            <Sparkles className="w-4 h-4 text-foreground" />
            <span className="text-xs font-medium text-foreground">AI Vet Assistant</span>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">
            สแกนอาการ<br />น้องรักของคุณ
          </h2>
          <Link to="/scan">
            <Button variant="chip-active" size="sm" className="mt-2">
              เริ่มสแกนเลย
              <ArrowRight className="w-4 h-4 ml-1" />
            </Button>
          </Link>
        </div>
        
        <div className="relative w-28 h-28 flex-shrink-0">
          <img 
            src={catAvatar} 
            alt="Cute cat" 
            className="w-full h-full object-cover rounded-2xl shadow-medium"
          />
        </div>
      </div>
    </div>
  );
}
