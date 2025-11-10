'use server'

import { z } from "zod";
import { redirect } from 'next/navigation';


const registerSchema = z.object({
    name: z.string().min(2, "Name is too short"),
    email: z.string().email(),
    password: z.string().min(5, "Password must be at least 5 characters"),
});

interface RegisterState {
    error?: string | {
        name?: string[];
        email?: string[];
        password?: string[];
    }
}

export async function registerAction(prevState: RegisterState|undefined, formData: FormData): Promise<RegisterState> {
    const validateFields = registerSchema.safeParse(Object.fromEntries(formData.entries()));
    console.log(validateFields)
    if (!validateFields.success) {
        return {
            error: validateFields.error.flatten().fieldErrors,
        };
    }

    const { name, email, password } = validateFields.data
    console.log(name, email, password)
    try {
        console.log("Calling backend API at:", `${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`);

        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/auth/register`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ name, email, password }),
        })
        console.log("3. Received response from backend. Status:", response.status, "OK:", response.ok);

        const data = await response.json();
        console.log(data)
        if (!response.ok) {
            throw new Error(data.message || "Registration failed");
        }
    } catch(error: any) {
        return {error: error.message};
    }

    redirect("/")
}
