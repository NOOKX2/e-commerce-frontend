"use client";

import ProfileIcon from "@/components/shared/ProfileIcon";
import { Bell, Search } from "lucide-react";

export default function AdminHeader() {
    return (
        <header className="h-16 bg-white border-b border-gray-200 flex items-center justify-between px-8 sticky top-0 z-10">
            <div className="flex items-center w-full max-w-md">
                <div className="relative w-full">
                </div>
            </div>

            <div className="flex items-center space-x-4">
                <button className="relative p-2 text-gray-400 hover:text-gray-500 hover:bg-gray-100 rounded-full transition-colors">
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-6 w-6" />
                    <span className="absolute top-2 right-2 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white"></span>
                </button>

                <ProfileIcon />
            </div>
        </header>
    );
}
