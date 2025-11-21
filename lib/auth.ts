import { User } from '@/types/api';
import { cookies } from 'next/headers';

interface UserResponse {
    message: String;
    response: User;
}

export async function getCurrentUser(): Promise<User | null> {
    const cookiesStore = await cookies();
    const token = cookiesStore.get('session_token')?.value;

    if (!token) {
        
        return null;
    }

    try {
        const response = await fetch(`${process.env.NEXT_PUBLIC_API_URL}/v1/profile`, {
            method: 'GET',
            headers: {
                'Cookie': `jwt=${token}`,
            },
            cache: 'no-store'
        });


        if (!response.ok) {
            return null;
        }

        const UserResponse: UserResponse = await response.json()
        
        return UserResponse.response;
    }
    catch (error) {
        return null;
    }
}