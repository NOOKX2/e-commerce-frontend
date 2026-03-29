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
                credentials: "include",
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Email or password incorrect");
            }

            const u = data.user ?? data.response;
            login(u);

            if (u.role == 'seller') {
                router.push('/seller');
            }

            else if (u.role == 'admin') {
                router.push('/admin');
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