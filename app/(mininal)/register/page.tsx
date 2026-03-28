'use client'

import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useState } from 'react';

function RegisterPage() {
    const { handleRegister, loading, error } = useRegisterForm()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    return (
        <div className="flex flex-col items-center justify-center px-4 py-12">
            <div className="w-full max-w-112.5 space-y-8">
                
                {/* Header Section */}
                <div className="text-center space-y-2">
                    <h1 className="text-3xl font-black tracking-tight text-slate-900">
                        Create an Account
                    </h1>
                    <p className="text-sm font-medium text-slate-500">
                        Join us today and start your journey
                    </p>
                </div>

                {/* Main Card */}
                <div className="bg-white p-10 rounded-[2.5rem] border border-slate-100 shadow-[0_8px_30px_rgb(0,0,0,0.04)] space-y-6">
                    <form onSubmit={handleRegister} className="space-y-5">
                        <div className="space-y-2">
                            <Label htmlFor="name" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Full Name
                            </Label>
                            <Input 
                                id="name" 
                                name="name" 
                                type="text" 
                                placeholder="John Doe"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4"
                                value={name} 
                                onChange={(e) => setName(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="email" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Email Address
                            </Label>
                            <Input 
                                id="email" 
                                name="email" 
                                type="email" 
                                placeholder="name@example.com"
                                className="h-12 rounded-2xl border-slate-100 bg-slate-50/50 focus:bg-white transition-all px-4"
                                value={email} 
                                onChange={(e) => setEmail(e.target.value)} 
                                required 
                            />
                        </div>

                        <div className="space-y-2">
                            <Label htmlFor="password" className="text-xs font-bold uppercase tracking-widest text-slate-400 ml-1">
                                Password
                            </Label>
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
                            className="w-full h-12 rounded-2xl bg-slate-900 hover:bg-slate-800 text-white font-bold transition-all active:scale-[0.98] shadow-lg shadow-slate-200 mt-2" 
                            disabled={loading}
                        >
                            {loading ? (
                                <span className="flex items-center gap-2">
                                    <div className="h-4 w-4 animate-spin rounded-full border-2 border-white/30 border-t-white" />
                                    Creating...
                                </span>
                            ) : 'Create Account'}
                        </Button>
                    </form>
                </div>

                {/* Footer Link */}
                <p className="text-center text-sm font-medium text-slate-500">
                    Already have an account?{' '}
                    <Link href="/login" className="text-blue-600 font-bold hover:underline">
                        Log in here
                    </Link>
                </p>
            </div>
        </div>
    )
}

export default RegisterPage