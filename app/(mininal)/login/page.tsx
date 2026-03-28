"use client"

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useLoginForm } from '@/hooks/useLoginForm'; 
import { useState } from 'react';

function LoginPage() {
    const { handleLogin, loading, error } = useLoginForm();
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-100 space-y-8">
                
                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Login Your Account
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Enter your details to access your account
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white p-8 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                    <form onSubmit={handleLogin} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Email Address
                            </Label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="name@company.com"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <div className="flex justify-between items-center ml-1">
                                <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400">
                                    Password
                                </Label>
                                <Link href="#" className="text-[11px] font-bold text-blue-600 hover:underline">
                                    Forgot?
                                </Link>
                            </div>
                            <Input 
                                id="password" 
                                name="password" 
                                type="password" 
                                placeholder="••••••••"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4"
                                value={password} 
                                onChange={(e) => setPassword(e.target.value)} 
                                required 
                            />
                        </div>

                        {error && (
                            <div className="bg-red-50 border border-red-100 text-red-600 text-xs font-bold py-3 px-4 rounded-xl animate-in fade-in slide-in-from-top-1">
                                {error}
                            </div>
                        )}

                        <Button 
                            type="submit" 
                            className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all active:scale-[0.98] shadow-lg shadow-slate-200" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Logging in...
                                </span>
                            ) : 'Sign In'}
                        </Button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm font-medium text-slate-500">
                    Don't have an account?{' '}
                    <Link href="/register" className="text-blue-600 font-bold hover:underline transition-all">
                        Create an account
                    </Link>
                </p>
            </div>
        </div>
    );
}

export default LoginPage;