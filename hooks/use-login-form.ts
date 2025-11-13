"use client"

import { useActionState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { loginAction } from '@/app/actions/login-action';
import type { LoginState } from '@/app/actions/login-action';

const wrapperAction = (prevState: LoginState | undefined, formData: FormData) => {
    return loginAction(prevState, formData);
};

export function useLoginForm() {
    const router = useRouter();
    const auth = useAuth();

    const [state, action] = useActionState(wrapperAction, undefined);

    useEffect(() => {
        if (state?.user) {
            auth.login(state.user);

            router.push("/");
        }
    }, [state, auth, router])
    

    return [state, action] as const;
}