import { User } from '@/types/user';
import { cookies } from 'next/headers';

interface UserResponse {
    message: String;
    response: User;
}

export async function getCurrentUser(): Promise<User | null> {
    const cookiesStore = await cookies();
    

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/profile`, {
            method: 'GET',
            headers: {
                'Content-Type': 'application/json',
                'Cookie': cookiesStore.toString(),
            },
            cache: 'no-store'
        });

       
        if (!response.ok) {
            const errorData = await response.json();
            console.log("error", errorData)
            return null;
        }

        const UserResponse: UserResponse = await response.json()
        return UserResponse.response;
    }
    catch (error) {
        console.log('catch error')
        return null;
    }
}