'use server'

import { z } from "zod";
import { User } from "@/types/api";
import { cookies } from 'next/headers';


const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

export interface RegisterState {
    error?: string | {
        name?: string[];
        email?: string[];
        password?: string[];
    }
    user?: User | null;
}

export async function registerAction(prevState: RegisterState | undefined, formData: FormData): Promise<RegisterState> {
    const validateFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validateFields.data
    console.log(name, email, password)
    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })

        const data = await response.json();
        console.log("response data in register action",data)
          console.log("data message", data.message)
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }

        const cookiesStore = await cookies();

        cookiesStore.set('session_token', data.token, {
            httpOnly: true,
            secure: process.env.NODE_ENV === 'production',
            path: '/',
        });

        return {
            user: data.response || data.user
        }
    } catch (error: any) {
        console.log(error)
        return { error: error.message };
    }

}
