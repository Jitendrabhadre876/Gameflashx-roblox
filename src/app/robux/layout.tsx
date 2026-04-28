'use client';

import { RobuxProvider } from './RobuxContext';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import RecentActivityToast from '@/components/rewards/RecentActivityToast';

export default function RobuxLayout({ children }: { children: React.ReactNode }) {
  return (
    <RobuxProvider>
      <div className="min-h-screen bg-[#070B14] text-white flex flex-col">
        <Navbar />
        <main className="flex-grow pt-28 pb-20 px-6">
          <div className="max-w-xl mx-auto w-full">
            {children}
          </div>
        </main>
        <Footer />
        <RecentActivityToast />
      </div>
    </RobuxProvider>
  );
}
