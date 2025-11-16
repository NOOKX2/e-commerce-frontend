"use server"

import { z } from "zod";
import { cookies } from 'next/headers';
import { User } from "@/types/api";


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

export interface LoginState {
    error?: string;
    user?: User | null;
}

export async function loginAction(prevState: LoginState|undefined, formData: FormData): Promise<LoginState> {
    const validateFields = loginSchema.safeParse(
        Object.fromEntries(formData.entries())
    );

    console.log("validate field",validateFields)

    if (!validateFields.success) {
        return {
            error: validateFields.error.issues[0].message,
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
        console.log("login response data ",data)
        if (!response.ok) {
            throw new Error(data.message || "Login failed");
        }


        const cookiesStore = await cookies();

        cookiesStore.set('session_token', data.token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             path: '/',
         });
        
        return {
            user: data.response || data.user,
        };

   } catch (error: any) {
        return {
            error: error.message,
        };
    }

 
}