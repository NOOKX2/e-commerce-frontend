"use client"

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { registerAction } from '@/app/actions/register-action';
import type { RegisterState } from '@/app/actions/register-action'; 

const wrapperAction = (prevState: RegisterState  | undefined, formData: FormData) => {
    return registerAction(prevState, formData);
};

export function useRegisterForm() {
    const router = useRouter();
    const auth = useAuth();

    const [state, action] = useActionState(wrapperAction, undefined);

    useEffect(() => {
        if (state?.user) {
            auth.login(state.user);
            router.push("/");
        }
    }, [state, auth, router])

    return [state, action] as const
}