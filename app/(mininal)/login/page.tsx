"use client"

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useLoginForm } from '@/hooks/use-login-form'; 
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Logging In.....' : 'Login'}
        </Button>
    )
}

function LoginPage() {

    const [state, formAction] = useLoginForm()

    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    return (
        <div className='mx-auto max-w-md py-12'>
            <h1 className='text-3xl font-bold mb-6'>Login Account</h1>
            <form action={formAction} className='space-y-4'>
                <div>
                    <Label htmlFor="email">Email</Label>
                    <Input id="email" name="email" type="email" value={email} onChange={(e) => setEmail(e.target.value)} required />
                </div>
                <div>
                    <Label htmlFor="password">Password</Label>
                    <Input id="password" name="password" type="password" value={password} onChange={(e) => setPassword(e.target.value)} required />
                </div>
                {state?.error && <p className="text-red-500">{state.error}</p>}
                <SubmitButton />
                <Link href='/register'><p className='text-blue-900'>Don't have an account? Register an account</p></Link>
            </form>
        </div>
    )
}

export default LoginPage
