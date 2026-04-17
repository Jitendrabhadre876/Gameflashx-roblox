
'use client';

import { useEffect, useState } from 'react';
import { useRouter, usePathname } from 'next/navigation';
import { useUser, useFirebase } from '@/firebase';
import { doc, getDoc } from 'firebase/firestore';
import Link from 'next/link';
import { 
  LayoutDashboard, 
  PlusCircle, 
  Layers, 
  BarChart3, 
  LogOut, 
  Gamepad2,
  ChevronRight
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { cn } from '@/lib/utils';

export default function AdminLayout({ children }: { children: React.ReactNode }) {
  const { user, isUserLoading } = useUser();
  const { auth, firestore } = useFirebase();
  const [isAdmin, setIsAdmin] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    async function checkAdmin() {
      if (isUserLoading) return;
      
      if (!user) {
        setIsAdmin(false);
        if (pathname !== '/admin1') {
          router.push('/admin1');
        }
        return;
      }

      if (firestore) {
        try {
          const adminRef = doc(firestore, 'roles_admin', user.uid);
          const adminSnap = await getDoc(adminRef);
          
          if (!adminSnap.exists()) {
            setIsAdmin(false);
            if (pathname !== '/admin1') {
              router.push('/admin1');
            }
          } else {
            setIsAdmin(true);
          }
        } catch (error) {
          console.error("Error checking admin status:", error);
          setIsAdmin(false);
        }
      }
    }
    checkAdmin();
  }, [user, isUserLoading, pathname, firestore, router]);

  const handleLogout = () => {
    if (auth) {
      auth.signOut().then(() => router.push('/admin1'));
    }
  };

  // If we're on the login page, just render children without the admin layout
  if (pathname === '/admin1') {
    return <>{children}</>;
  }
  
  // Show loading state while checking user/admin status
  if (isUserLoading || isAdmin === null) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#070B14]">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary"></div>
      </div>
    );
  }

  // If not admin and not on login page, render nothing (useEffect will redirect)
  if (!isAdmin) {
    return null;
  }

  const menuItems = [
    { label: 'Dashboard', icon: LayoutDashboard, href: '/admin1/dashboard' },
    { label: 'Add Game', icon: PlusCircle, href: '/admin1/add' },
    { label: 'Manage Games', icon: Layers, href: '/admin1/manage' },
    { label: 'Analytics', icon: BarChart3, href: '/admin1/analytics' },
  ];

  return (
    <div className="flex min-h-screen bg-[#070B14]">
      {/* Sidebar */}
      <aside className="w-64 border-r border-white/5 bg-card/30 backdrop-blur-xl flex flex-col fixed inset-y-0 z-50">
        <div className="p-8">
          <Link href="/" className="flex items-center gap-2 group mb-10">
            <div className="w-10 h-10 rounded-lg bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary">
              <Gamepad2 className="text-white w-6 h-6" />
            </div>
            <span className="text-xl font-black text-white">ADMIN<span className="text-primary">X</span></span>
          </Link>

          <nav className="space-y-2">
            {menuItems.map((item) => (
              <Link 
                key={item.href} 
                href={item.href}
                className={cn(
                  "flex items-center gap-3 px-4 py-3 rounded-xl transition-all group",
                  pathname === item.href 
                    ? "bg-primary text-primary-foreground font-bold shadow-lg shadow-primary/20" 
                    : "text-white/50 hover:text-white hover:bg-white/5"
                )}
              >
                <item.icon className="w-5 h-5" />
                <span>{item.label}</span>
                {pathname === item.href && <ChevronRight className="ml-auto w-4 h-4" />}
              </Link>
            ))}
          </nav>
        </div>

        <div className="mt-auto p-8">
          <Button 
            variant="ghost" 
            className="w-full justify-start gap-3 text-destructive hover:bg-destructive/10 hover:text-destructive rounded-xl"
            onClick={handleLogout}
          >
            <LogOut className="w-5 h-5" />
            Logout
          </Button>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 ml-64 p-8">
        <header className="flex justify-between items-center mb-12">
          <div>
            <h1 className="text-3xl font-black text-white">
              {menuItems.find(i => i.href === pathname)?.label || 'Administration'}
            </h1>
            <p className="text-white/40 text-sm mt-1">Manage your premium gaming marketplace content.</p>
          </div>
          <div className="flex items-center gap-4">
            <div className="text-right">
              <p className="text-white font-bold text-sm">{user?.email}</p>
              <p className="text-primary text-xs font-black uppercase tracking-tighter">System Administrator</p>
            </div>
            <div className="w-10 h-10 rounded-full bg-primary/20 border border-primary/30 flex items-center justify-center text-primary font-bold">
              {user?.email?.[0].toUpperCase()}
            </div>
          </div>
        </header>
        {children}
      </main>
    </div>
  );
}
