"use server"

import { z } from "zod";
import { redirect } from 'next/navigation';
import { cookies } from 'next/headers';


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
});

interface LoginState {
    error?: string;
    token?: string;
}

export async function loginAction(prevState: LoginState|undefined, formData: FormData): Promise<LoginState> {
    const validateFields = loginSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    console.log("validate field",validateFields)

    if (!validateFields.success) {
        return {
            error: "Invalid data format.",
        }
    }
    
    const { email, password } = validateFields.data;

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        })

        const data = await response.json();

        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }

        const cookiesStore = await cookies();

        cookiesStore.set('session_token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

    } catch (error: any) {
        return {
            error: error.message,
        };
    }

    redirect("/");
}