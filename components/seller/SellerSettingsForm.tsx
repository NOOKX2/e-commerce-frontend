"use client";

import { useState } from 'react';
import { Store, Bell, CreditCard, Lock, Save, Upload } from 'lucide-react';

const tabs = [
    { id: 'profile', label: 'Store Profile', icon: Store },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'billing', label: 'Billing & Payout', icon: CreditCard },
    { id: 'security', label: 'Security', icon: Lock },
];

export default function SellerSettingsForm() {
    const [activeTab, setActiveTab] = useState('profile');

    return (
        <div className="flex flex-col lg:flex-row gap-8">
            {/* Sidebar Navigation */}
            <div className="w-full lg:w-64 shrink-0">
                <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 bg-white p-2 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
                    {tabs.map((tab) => {
                        const Icon = tab.icon;
                        const isActive = activeTab === tab.id;
                        return (
                            <button
                                key={tab.id}
                                onClick={() => setActiveTab(tab.id)}
                                className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all w-full whitespace-nowrap ${isActive
                                        ? 'bg-blue-50 text-blue-700 shadow-sm'
                                        : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
                                    }`}
                            >
                                <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
                                {tab.label}
                            </button>
                        );
                    })}
                </nav>
            </div>

            {/* Content Area */}
            <div className="flex-1">
                <div className="bg-white rounded-2xl shadow-sm border border-gray-200 overflow-hidden">
                    {activeTab === 'profile' && (
                        <div className="p-6 sm:p-8 space-y-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Store Profile</h2>
                                <p className="text-sm text-gray-500 mt-1">Manage your public store information.</p>
                            </div>

                            <div className="grid grid-cols-1 gap-y-6 gap-x-8 sm:grid-cols-2">
                                <div className="sm:col-span-2">
                                    <label className="block text-sm font-medium text-gray-700">Store Logo</label>
                                    <div className="mt-2 flex items-center space-x-6">
                                        <div className="h-24 w-24 rounded-full bg-gray-100 flex items-center justify-center border-2 border-dashed border-gray-300">
                                            <Store className="h-8 w-8 text-gray-400" />
                                        </div>
                                        <button className="flex items-center px-4 py-2 border border-gray-200 rounded-lg text-sm font-medium text-gray-700 bg-white hover:bg-gray-50 transition-colors">
                                            <Upload className="h-4 w-4 mr-2" />
                                            Upload Logo
                                        </button>
                                    </div>
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="store-name" className="block text-sm font-medium text-gray-700">Store Name</label>
                                    <input
                                        type="text"
                                        id="store-name"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                                        defaultValue="My Awesome Store"
                                    />
                                </div>

                                <div className="sm:col-span-2">
                                    <label htmlFor="description" className="block text-sm font-medium text-gray-700">Description</label>
                                    <textarea
                                        id="description"
                                        rows={4}
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                                        defaultValue="We sell high quality electronics and gadgets."
                                    />
                                </div>

                                <div>
                                    <label htmlFor="email" className="block text-sm font-medium text-gray-700">Contact Email</label>
                                    <input
                                        type="email"
                                        id="email"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                                        defaultValue="contact@store.com"
                                    />
                                </div>

                                <div>
                                    <label htmlFor="phone" className="block text-sm font-medium text-gray-700">Phone Number</label>
                                    <input
                                        type="text"
                                        id="phone"
                                        className="mt-1 block w-full rounded-xl border-gray-200 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm py-2.5 px-3 border"
                                        defaultValue="+1 (555) 000-0000"
                                    />
                                </div>
                            </div>

                            <div className="pt-6 border-t border-gray-200 flex justify-end">
                                <button className="flex items-center px-6 py-2.5 bg-blue-600 text-white rounded-xl hover:bg-blue-700 font-medium shadow-md shadow-blue-200 transition-all">
                                    <Save className="h-4 w-4 mr-2" />
                                    Save Changes
                                </button>
                            </div>
                        </div>
                    )}

                    {activeTab === 'notifications' && (
                        <div className="p-6 sm:p-8 space-y-8">
                            <div>
                                <h2 className="text-xl font-bold text-gray-900">Notifications</h2>
                                <p className="text-sm text-gray-500 mt-1">Configure how you receive alerts.</p>
                            </div>
                            <div className="space-y-4">
                                {['New order received', 'Product out of stock', 'New customer registration', 'Weekly performance report'].map((item, idx) => (
                                    <div key={idx} className="flex items-center justify-between py-3 border-b border-gray-100 last:border-0">
                                        <span className="text-gray-700 font-medium">{item}</span>
                                        <label className="relative inline-flex items-center cursor-pointer">
                                            <input type="checkbox" className="sr-only peer" defaultChecked={idx < 2} />
                                            <div className="w-11 h-6 bg-gray-200 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-blue-100 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-0.5 after:left-0.5 after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-blue-600"></div>
                                        </label>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )}

                    {(activeTab === 'billing' || activeTab === 'security') && (
                        <div className="p-12 flex flex-col items-center justify-center text-center">
                            <div className="bg-gray-100 p-4 rounded-full mb-4">
                                {activeTab === 'billing' ? <CreditCard className="h-8 w-8 text-gray-400" /> : <Lock className="h-8 w-8 text-gray-400" />}
                            </div>
                            <h3 className="text-lg font-medium text-gray-900">Coming Soon</h3>
                            <p className="text-gray-500 mt-1">This section is currently under development.</p>
                        </div>
                    )}
                </div>
            </div>
        </div>
    );
}
