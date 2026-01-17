import { Outlet } from 'react-router-dom';
import { BottomNav } from './BottomNav';

export function AppLayout() {
  return (
    <div className="app-container">
      <main className="pb-24 min-h-screen">
        <Outlet />
      </main>
      <BottomNav />
    </div>
  );
}
