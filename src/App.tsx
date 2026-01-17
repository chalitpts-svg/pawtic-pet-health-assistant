import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { useAppStore } from "@/stores/appStore";

// Layout
import { AppLayout } from "@/components/layout/AppLayout";

// Pages
import OnboardingPage from "@/pages/OnboardingPage";
import HomePage from "@/pages/HomePage";
import ScanPage from "@/pages/ScanPage";
import ScanResultPage from "@/pages/ScanResultPage";
import PetPassportPage from "@/pages/PetPassportPage";
import AddPetPage from "@/pages/AddPetPage";
import RemindersPage from "@/pages/RemindersPage";
import EmergencyPage from "@/pages/EmergencyPage";
import SubscriptionPage from "@/pages/SubscriptionPage";
import ProfilePage from "@/pages/ProfilePage";
import NotFound from "@/pages/NotFound";

const queryClient = new QueryClient();

function AppRoutes() {
  const { hasCompletedOnboarding } = useAppStore();

  if (!hasCompletedOnboarding) {
    return (
      <Routes>
        <Route path="*" element={<OnboardingPage />} />
      </Routes>
    );
  }

  return (
    <Routes>
      <Route element={<AppLayout />}>
        <Route path="/" element={<HomePage />} />
        <Route path="/passport" element={<PetPassportPage />} />
        <Route path="/reminders" element={<RemindersPage />} />
        <Route path="/profile" element={<ProfilePage />} />
      </Route>
      
      {/* Full screen pages (no bottom nav) */}
      <Route path="/scan" element={<ScanPage />} />
      <Route path="/scan-result/:id" element={<ScanResultPage />} />
      <Route path="/passport/add" element={<AddPetPage />} />
      <Route path="/emergency" element={<EmergencyPage />} />
      <Route path="/subscription" element={<SubscriptionPage />} />
      <Route path="/onboarding" element={<OnboardingPage />} />
      
      {/* Catch all */}
      <Route path="*" element={<NotFound />} />
    </Routes>
  );
}

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <div className="max-w-md mx-auto bg-background min-h-screen shadow-xl">
          <AppRoutes />
        </div>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
