'use client'

import { useFormStatus } from 'react-dom';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';
import { useRegisterForm } from '@/hooks/useRegisterForm';
import { useState } from 'react';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating Account...' : 'Create Account'}
        </Button>
    )
}

function RegisterPage() {
    const [state, formAction] = useRegisterForm()

    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');

    const fieldError = state?.error && typeof state.error !== "string" ? state.error : null;
    const logicError = state?.error && typeof state.error == "string" ? state.error : null;

    return (
        <div className='mx-auto max-w-md py-12'>
            <h1 className='text-3xl font-bold mb-6'>Register an Account</h1>
            <form action={formAction} className='space-y-4'>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' name='name' type='text' value={name} onChange={(e) => setName(e.target.value)} required />
                    {fieldError?.name && <p className="text-red-500 text-sm mt-1">{fieldError.name[0]}</p>}
                </div>
                <div>
                    <Label htmlFor='name'>Email</Label>
                    <Input id='email' name='email' type='email' value={email} onChange={(e) => setEmail(e.target.value)} required />
                    {fieldError?.email && <p className="text-red-500 text-sm mt-1">{fieldError.email[0]}</p>}
                </div>
                <div>
                    <Label htmlFor='name'>Password</Label>
                    <Input id='password' name='password' type='password' value={password} onChange={(e) => setPassword(e.target.value)} required />
                    {fieldError?.password && <p className="text-red-500 text-sm mt-1">{fieldError.password[0]}</p>}
                </div>
                {logicError && <p className='text-red-500 text-sm'>{logicError}</p>}
                <SubmitButton />
                <Link href='/login'><p className='text-blue-900'>Already have an account? Login an account</p></Link>

            </form>
        </div>
    )
}

export default RegisterPage
