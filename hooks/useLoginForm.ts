"use client"

import { useState } from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';


export function useLoginForm() {
    const router = useRouter();
    const { login } = useAuth();
    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl") || "/";

    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const handleLogin = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        try {
            const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/auth/login`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Email or password incorrect");
            }

            if (data.token) {
                document.cookie = `session_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            }

            login(data.response || data.user);

            if (data.user.role == 'seller') {
                router.push('/seller');
            }
            else {
                router.push(callBackUrl);
            }

        } catch (error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }
    return { handleLogin, loading, error };
}