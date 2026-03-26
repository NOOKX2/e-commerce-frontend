"use client";

import { useState } from 'react';
import { Store, Bell, CreditCard, Lock, Save, Upload } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Button } from '@/components/ui/button';

const tabs = [
    { id: 'profile', label: 'Store Profile', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Payout', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
];

export default function SellerSettingsForm() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex flex-col gap-8 lg:flex-row lg:gap-10">
            <nav className="flex shrink-0 gap-1 overflow-x-auto pb-1 lg:w-56 lg:flex-col lg:gap-0.5 lg:pb-0">
                {tabs.map((tab) => {
                    const Icon = tab.icon;
                    const isActive = activeTab === tab.id;
                    return (
                        <button
                            key={tab.id}
                            type="button"
                            onClick={() => setActiveTab(tab.id)}
                            className={cn(
                                'flex items-center gap-3 rounded-2xl px-3 py-2.5 text-left text-sm whitespace-nowrap transition-colors lg:whitespace-normal',
                                isActive
                                    ? 'font-semibold text-blue-600'
                                    : 'font-normal text-neutral-500 hover:text-neutral-800'
                            )}
                        >
                            <Icon
                                className={cn(
                                    'h-5 w-5 shrink-0',
                                    isActive ? 'text-blue-600' : 'text-neutral-400'
                                )}
                            />
                            {tab.label}
                        </button>
                    );
                })}
            </nav>

            <div className="min-w-0 flex-1 overflow-hidden rounded-3xl bg-white shadow-sm">
                {activeTab === 'profile' && (
                    <div className="space-y-8 p-8 sm:p-10">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                                Store profile
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                Manage your public store information.
                            </p>
                        </div>

                        <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                            <div className="sm:col-span-2">
                                <label className="block text-sm font-medium text-slate-900">
                                    Store logo
                                </label>
                                <div className="mt-3 flex flex-wrap items-center gap-6">
                                    <div className="flex h-24 w-24 items-center justify-center rounded-full bg-neutral-100">
                                        <Store className="h-8 w-8 text-neutral-400" />
                                    </div>
                                    <Button
                                        type="button"
                                        variant="secondary"
                                        className="h-10 rounded-2xl bg-neutral-100 font-medium text-slate-900 shadow-none hover:bg-neutral-200/80"
                                    >
                                        <Upload className="h-4 w-4" />
                                        Upload logo
                                    </Button>
                                </div>
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="store-name" className="block text-sm font-medium text-slate-900">
                                    Store name
                                </label>
                                <input
                                    type="text"
                                    id="store-name"
                                    className="mt-2 block w-full rounded-2xl bg-neutral-50 px-4 py-2.5 text-sm text-slate-900 shadow-inner outline-none transition-[box-shadow] focus-visible:ring-2 focus-visible:ring-blue-500/25"
                                    defaultValue="My Awesome Store"
                                />
                            </div>

                            <div className="sm:col-span-2">
                                <label htmlFor="description" className="block text-sm font-medium text-slate-900">
                                    Description
                                </label>
                                <textarea
                                    id="description"
                                    rows={4}
                                    className="mt-2 block w-full rounded-2xl bg-neutral-50 px-4 py-2.5 text-sm text-slate-900 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25"
                                    defaultValue="We sell high quality electronics and gadgets."
                                />
                            </div>

                            <div>
                                <label htmlFor="email" className="block text-sm font-medium text-slate-900">
                                    Contact email
                                </label>
                                <input
                                    type="email"
                                    id="email"
                                    className="mt-2 block w-full rounded-2xl bg-neutral-50 px-4 py-2.5 text-sm text-slate-900 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25"
                                    defaultValue="contact@store.com"
                                />
                            </div>

                            <div>
                                <label htmlFor="phone" className="block text-sm font-medium text-slate-900">
                                    Phone number
                                </label>
                                <input
                                    type="text"
                                    id="phone"
                                    className="mt-2 block w-full rounded-2xl bg-neutral-50 px-4 py-2.5 text-sm text-slate-900 shadow-inner outline-none focus-visible:ring-2 focus-visible:ring-blue-500/25"
                                    defaultValue="+1 (555) 000-0000"
                                />
                            </div>
                        </div>

                        <div className="flex justify-end border-t border-neutral-100 pt-8">
                            <Button
                                type="button"
                                className="h-11 rounded-2xl bg-blue-600 px-6 text-white shadow-sm hover:bg-blue-700"
                            >
                                <Save className="h-4 w-4" />
                                Save changes
                            </Button>
                        </div>
                    </div>
                )}

                {activeTab === 'notifications' && (
                    <div className="space-y-8 p-8 sm:p-10">
                        <div>
                            <h2 className="text-xl font-semibold tracking-tight text-slate-900">
                                Notifications
                            </h2>
                            <p className="mt-1 text-sm text-neutral-500">
                                Configure how you receive alerts.
                            </p>
                        </div>
                        <div className="divide-y divide-neutral-100">
                            {[
                                'New order received',
                                'Product out of stock',
                                'New customer registration',
                                'Weekly performance report',
                            ].map((item, idx) => (
                                <div
                                    key={idx}
                                    className="flex items-center justify-between py-4 first:pt-0"
                                >
                                    <span className="font-medium text-slate-900">{item}</span>
                                    <label className="relative inline-flex cursor-pointer items-center">
                                        <input
                                            type="checkbox"
                                            className="peer sr-only"
                                            defaultChecked={idx < 2}
                                        />
                                        <div className="peer h-6 w-11 rounded-full bg-neutral-200 after:absolute after:top-0.5 after:left-0.5 after:h-5 after:w-5 after:rounded-full after:bg-white after:shadow-sm after:transition-all peer-checked:bg-blue-600 peer-checked:after:translate-x-5 peer-focus-visible:ring-2 peer-focus-visible:ring-blue-500/30" />
                                    </label>
                                </div>
                            ))}
                        </div>
                    </div>
                )}

                {(activeTab === 'billing' || activeTab === 'security') && (
                    <div className="flex flex-col items-center justify-center px-8 py-20 text-center sm:py-24">
                        <div className="mb-4 flex h-14 w-14 items-center justify-center rounded-2xl bg-neutral-100">
                            {activeTab === 'billing' ? (
                                <CreditCard className="h-7 w-7 text-neutral-400" />
                            ) : (
                                <Lock className="h-7 w-7 text-neutral-400" />
                            )}
                        </div>
                        <h3 className="text-lg font-semibold text-slate-900">Coming soon</h3>
                        <p className="mt-2 max-w-sm text-sm text-neutral-500">
                            This section is currently under development.
                        </p>
                    </div>
                )}
            </div>
        </div>
    );
}
