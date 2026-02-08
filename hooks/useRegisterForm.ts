"use client"

import { useState} from 'react';
import { useRouter, useSearchParams } from 'next/navigation';
import { useAuth } from '@/context/auth-context';
import { z } from 'zod';

const registerSchema = z.object({
    name: z.string().min(2, "Name must be at least 2 characters"),
    email: z.string().email("Invalid email format"),
    password: z.string().min(6, "Password must be at least 6 characters"),
});

export function useRegisterForm() {
    const router = useRouter();
    const { login } = useAuth();
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);
    const searchParams = useSearchParams();
    const callBackUrl = searchParams.get("callbackUrl") || "/";

    const handleRegister = async (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        setLoading(true);
        setError(null);

        const formData = new FormData(e.currentTarget);
        const payload = Object.fromEntries(formData.entries());

        const validation = registerSchema.safeParse(payload);
        if (!validation.success) {
            setError(validation.error.issues[0].message);
            setLoading(false);
            return;
        }

        try{
            const response = await fetch(`${process.env.NEXT_PUBLIC_CLIENT_API_URL}/v1/auth/register`, {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(payload),
            });

            const data = await response.json();

            if (!response.ok) {
                throw new Error(data.message || "Registration failed");
            }

            if (data.token) {
                
                document.cookie = `session_token=${data.token}; path=/; max-age=86400; SameSite=Lax`;
            }

            login(data.response || data.user);

            router.push(callBackUrl);
        } catch(error: any) {
            setError(error.message);
        } finally {
            setLoading(false);
        }
    }

    return {handleRegister, loading, error}
}