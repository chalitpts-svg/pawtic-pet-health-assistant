import { ArrowLeft, MapPin, Phone, Navigation, Clock, Star, Filter } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';
import { cn } from '@/lib/utils';

// Mock clinics data
const mockClinics = [
  {
    id: '1',
    name: 'โรงพยาบาลสัตว์ทองหล่อ',
    lat: 13.7340,
    lng: 100.5790,
    phone: '02-123-4567',
    openHours: '24 ชม.',
    is24h: true,
    distance: 0.8,
    rating: 4.8,
  },
  {
    id: '2',
    name: 'คลินิกรักสัตว์',
    lat: 13.7380,
    lng: 100.5820,
    phone: '02-234-5678',
    openHours: '08:00 - 22:00',
    is24h: false,
    distance: 1.2,
    rating: 4.5,
  },
  {
    id: '3',
    name: 'โรงพยาบาลสัตว์เพ็ทแคร์',
    lat: 13.7420,
    lng: 100.5850,
    phone: '02-345-6789',
    openHours: '24 ชม.',
    is24h: true,
    distance: 2.1,
    rating: 4.9,
  },
];

const EmergencyPage = () => {
  const navigate = useNavigate();
  const [filter, setFilter] = useState<'all' | '24h' | 'open'>('all');

  const filteredClinics = mockClinics.filter(clinic => {
    if (filter === '24h') return clinic.is24h;
    if (filter === 'open') return true; // In real app, check actual hours
    return true;
  });

  const handleCall = (phone: string) => {
    window.location.href = `tel:${phone}`;
  };

  const handleNavigate = (clinic: typeof mockClinics[0]) => {
    window.open(`https://www.google.com/maps/dir/?api=1&destination=${clinic.lat},${clinic.lng}`, '_blank');
  };

  return (
    <div className="min-h-screen bg-background pb-8">
      {/* Header */}
      <header className="sticky top-0 z-40 bg-emergency px-4 py-3">
        <div className="flex items-center gap-3">
          <button onClick={() => navigate(-1)}>
            <ArrowLeft className="w-5 h-5 text-emergency-foreground" />
          </button>
          <h1 className="text-lg font-semibold text-emergency-foreground">คลินิกฉุกเฉินใกล้ฉัน</h1>
        </div>
      </header>

      {/* Emergency Banner */}
      <div className="bg-emergency/10 border-b border-emergency/20 p-4">
        <div className="flex items-center gap-3">
          <Phone className="w-6 h-6 text-emergency animate-pulse" />
          <div>
            <p className="text-sm font-medium text-foreground">สายด่วนสัตว์ฉุกเฉิน</p>
            <a href="tel:1669" className="text-lg font-bold text-emergency">1669</a>
          </div>
        </div>
      </div>

      {/* Filters */}
      <div className="px-4 py-3 flex gap-2 overflow-x-auto">
        <Button 
          variant={filter === 'all' ? 'chip-active' : 'chip'} 
          size="chip"
          onClick={() => setFilter('all')}
        >
          ทั้งหมด
        </Button>
        <Button 
          variant={filter === '24h' ? 'chip-active' : 'chip'} 
          size="chip"
          onClick={() => setFilter('24h')}
        >
          <Clock className="w-4 h-4 mr-1" />
          24 ชม.
        </Button>
        <Button 
          variant={filter === 'open' ? 'chip-active' : 'chip'} 
          size="chip"
          onClick={() => setFilter('open')}
        >
          เปิดอยู่
        </Button>
      </div>

      {/* Map Placeholder */}
      <div className="mx-4 h-48 bg-muted rounded-2xl flex items-center justify-center mb-4">
        <div className="text-center">
          <MapPin className="w-10 h-10 text-muted-foreground mx-auto mb-2" />
          <p className="text-sm text-muted-foreground">แผนที่จะแสดงที่นี่</p>
        </div>
      </div>

      {/* Clinics List */}
      <div className="px-4 space-y-3">
        <h2 className="font-semibold text-foreground">คลินิกใกล้ฉัน ({filteredClinics.length})</h2>
        
        {filteredClinics.map((clinic) => (
          <div 
            key={clinic.id}
            className="bg-card rounded-2xl p-4 border border-border/50"
          >
            <div className="flex items-start justify-between mb-3">
              <div>
                <div className="flex items-center gap-2">
                  <h3 className="font-medium text-foreground">{clinic.name}</h3>
                  {clinic.is24h && (
                    <span className="px-2 py-0.5 bg-success/10 text-success text-xs rounded-full font-medium">
                      24 ชม.
                    </span>
                  )}
                </div>
                <div className="flex items-center gap-2 mt-1">
                  <Star className="w-4 h-4 text-primary fill-primary" />
                  <span className="text-sm text-muted-foreground">{clinic.rating}</span>
                  <span className="text-muted-foreground">•</span>
                  <span className="text-sm text-muted-foreground">{clinic.distance} km</span>
                </div>
              </div>
            </div>
            
            <p className="text-sm text-muted-foreground mb-3">
              <Clock className="w-4 h-4 inline mr-1" />
              {clinic.openHours}
            </p>
            
            <div className="flex gap-2">
              <Button 
                variant="emergency" 
                className="flex-1"
                onClick={() => handleCall(clinic.phone)}
              >
                <Phone className="w-4 h-4 mr-2" />
                โทร
              </Button>
              <Button 
                variant="outline" 
                className="flex-1"
                onClick={() => handleNavigate(clinic)}
              >
                <Navigation className="w-4 h-4 mr-2" />
                นำทาง
              </Button>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default EmergencyPage;
