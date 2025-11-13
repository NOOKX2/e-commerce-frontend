"use client";

import { useAuth } from '@/context/auth-context';
import { DropdownMenu, DropdownMenuContent, DropdownMenuTrigger, DropdownMenuLabel, DropdownMenuItem } from '../ui/dropdown-menu';
import { Button } from '../ui/button';
import { CircleUserRound, LogOut } from 'lucide-react';
import Link from 'next/link';
import { DropdownMenuSeparator } from '@radix-ui/react-dropdown-menu';

function ProfileIcon() {
    const { user, isLoading, logout } = useAuth()
    console.log("user from profile icon", user)
    return (
        <div>
            {isLoading ? (
                <div className='h-10 w-10 rounded-full bg-muted animate-pulse' />
            ) : (
                user ? (
                    <DropdownMenu>
                        <DropdownMenuTrigger asChild>
                            <Button variant="ghost" className='flex items-center h-10 pr-3 '>
                                <CircleUserRound className="size-10" />
                                 <span className="text-sm font-medium leading-none">
                                    {user.name}
                                </span>
                            </Button>
                        </DropdownMenuTrigger>
                        <DropdownMenuContent className='w-56 '>
                            <DropdownMenuLabel className="font-normal">
                                <div className="flex flex-col space-y-1">
                                    <p className="text-sm font-medium leading-none">{user.name}</p>
                                    <p className="text-xs leading-none text-muted-foreground">
                                        {user.email}
                                    </p>
                                </div>
                            </DropdownMenuLabel>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/profile">Profile</Link>
                            </DropdownMenuItem>
                            <DropdownMenuItem asChild className="cursor-pointer">
                                <Link href="/orders">My Orders</Link>
                            </DropdownMenuItem>
                            <DropdownMenuSeparator />
                            <DropdownMenuItem onClick={logout} className='tex-red-500 focus:bg-red-500 focus: text-red-600 cursor-pointer'>
                                <LogOut className='mr-2 h-4 w-4' />
                                <span>Log out</span>
                            </DropdownMenuItem>
                        </DropdownMenuContent>
                    </DropdownMenu>

                ) : (
                    <Link href='/login' passHref>
                        <Button>Login</Button>
                    </Link>
                )
            )}

        </div>
    )
}

export default ProfileIcon
