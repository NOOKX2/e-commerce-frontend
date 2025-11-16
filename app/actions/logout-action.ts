"use server"

import { cookies } from 'next/headers';

export async function serverLogoutAction() {
    (await cookies()).delete('session_token');
}