'use client'

import { useFormStatus } from 'react-dom';
import { useActionState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import Link from 'next/link';

import { registerAction } from '../actions/register-action';

function SubmitButton() {
    const { pending } = useFormStatus();
    return (
        <Button type="submit" className="w-full" disabled={pending}>
            {pending ? 'Creating Account...' : 'Create Account'}
        </Button>
    )
}

function RegisterPage() {
    const [state, formAction] = useActionState(registerAction, undefined)
    return (
        <div className='mx-auto max-w-md py-12'>
            <h1 className='text-3xl font-bold mb-6'>Register an Account</h1>
            <form action={formAction} className='space-y-4'>
                <div>
                    <Label htmlFor='name'>Name</Label>
                    <Input id='name' name='name' type='text' required />
                    {state?.error && typeof state.error !== "string" && state?.error?.name && <p className="text-red-500 text-sm mt-1">{state.error.name[0]}</p>}
                </div>
                <div>
                    <Label htmlFor='name'>Email</Label>
                    <Input id='email' name='email' type='email' required />
                    {state?.error && typeof state.error !== "string" && state?.error?.email && <p className="text-red-500 text-sm mt-1">{state.error.email[0]}</p>}
                </div>
                <div>
                    <Label htmlFor='name'>Password</Label>
                    <Input id='password' name='password' type='password' required />
                    {state?.error && typeof state.error !== "string" && state?.error?.password && <p className="text-red-500 text-sm mt-1">{state.error.password[0]}</p>}
                </div>
                <SubmitButton />
                <Link href='/login'><p className='text-blue-900'>Already have an account? Login an account</p></Link>

            </form>
        </div>
    )
}

export default RegisterPage
