
'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth, useFirebase } from '@/firebase';
import { signInWithEmailAndPassword } from 'firebase/auth';
import { doc, getDoc } from 'firebase/firestore';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Gamepad2, ShieldAlert } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function AdminLoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const { auth, firestore } = useFirebase();
  const router = useRouter();
  const { toast } = useToast();

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const user = userCredential.user;

      // Check if user is admin
      const adminRef = doc(firestore, 'roles_admin', user.uid);
      const adminSnap = await getDoc(adminRef);

      if (adminSnap.exists()) {
        toast({ title: "Welcome back, Admin", description: "Access granted." });
        router.push('/admin1/dashboard');
      } else {
        toast({ 
          variant: "destructive", 
          title: "Access Denied", 
          description: "You do not have administrative privileges." 
        });
        await auth.signOut();
      }
    } catch (error: any) {
      toast({ 
        variant: "destructive", 
        title: "Login Failed", 
        description: error.message || "Invalid credentials." 
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background p-6">
      <Card className="w-full max-w-md glass-morphism border-white/10">
        <CardHeader className="text-center space-y-4">
          <div className="mx-auto w-12 h-12 rounded-xl bg-gradient-to-br from-primary to-secondary flex items-center justify-center neon-glow-primary">
            <Gamepad2 className="text-white w-7 h-7" />
          </div>
          <CardTitle className="text-3xl font-black text-white">Admin Portal</CardTitle>
          <CardDescription className="text-white/50">
            Secure access for Gameflashx administrators.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <form onSubmit={handleLogin} className="space-y-6">
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70">Email Address</label>
              <Input 
                type="email" 
                placeholder="admin@gameflashx.com" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <div className="space-y-2">
              <label className="text-sm font-bold text-white/70">Password</label>
              <Input 
                type="password" 
                placeholder="••••••••" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="bg-white/5 border-white/10 text-white"
                required
              />
            </div>
            <Button 
              type="submit" 
              className="w-full bg-primary hover:bg-primary/80 text-primary-foreground font-bold h-12 rounded-full neon-glow-primary"
              disabled={loading}
            >
              {loading ? "Verifying..." : "Login to Dashboard"}
            </Button>
          </form>
          
          <div className="mt-8 p-4 rounded-xl bg-destructive/10 border border-destructive/20 flex gap-3 items-start">
            <ShieldAlert className="text-destructive w-5 h-5 flex-shrink-0 mt-0.5" />
            <p className="text-xs text-white/60">
              Unauthorized access attempts are logged and monitored. Administrative roles are managed via internal Firestore policies.
            </p>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
