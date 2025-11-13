"use client";

import { createContext, useContext, useState, ReactNode } from 'react';
import Cookies from 'js-cookie';
import { User } from '@/types/api';
import { serverLogoutAction } from '@/app/actions/logout-action';

interface AuthContextType {
    user: User | null;
    login: (userData: User) => void;
    logout: () => void;
    isLoading: boolean
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export default function AuthProvider({children, initialUser}: {children: ReactNode, initialUser: User | null}) {
    const [user, setUser] = useState<User | null>(initialUser)
    const [isLoading, setIsLoading] = useState(false)

    const login = (userData: User) => {
      setUser(userData)
    }

    const logout = async () => {
        setUser(null)
        Cookies.remove('session_token')
        await serverLogoutAction()
    };

    const value = {user, isLoading, login, logout}
  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  )
}


export function useAuth() {
    const context = useContext(AuthContext);

    if (context === undefined){
        throw new Error("useAuth must be used within an AuthProvider")
    }

    return context
}