"use client";

import { Bell } from "lucide-react";
import ProfileIcon from "../shared/ProfileIcon";

export default function SellerHeader() {
    return (
        <header className="sticky top-0 z-10 flex h-14 shrink-0 items-center justify-end bg-white/80 px-4 backdrop-blur-md shadow-sm sm:h-16 sm:px-6 lg:px-8">
            <div className="flex items-center gap-2 sm:gap-3">
                <button
                    type="button"
                    className="relative rounded-full p-2 text-neutral-400 transition-colors hover:text-neutral-700"
                >
                    <span className="sr-only">View notifications</span>
                    <Bell className="h-5 w-5" />
                    <span className="absolute right-1.5 top-1.5 block h-2 w-2 rounded-full bg-red-500 ring-2 ring-white" />
                </button>
                <ProfileIcon />
            </div>
        </header>
    );
}
