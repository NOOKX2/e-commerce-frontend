"use server"

import { z } from "zod";
import { cookies } from 'next/headers';
import { User } from "@/types/api";


const loginSchema = z.object({
    email: z.string().email(),
    password: z.string().min(5),
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

        console.log("response in login action",response)

        const cookiesStore = await cookies();

        cookiesStore.set('session_token', data.token, {
             httpOnly: true,
             secure: process.env.NODE_ENV === 'production',
             path: '/',
         });

         console.log(cookiesStore)

        
        return {
            user: data.response || data.user,
        };


    } catch (error: any) {
        return {
            error: error.message,
        };
    }

 
}