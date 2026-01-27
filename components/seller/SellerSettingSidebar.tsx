// interface SellerSettingSidebarProps {
//     tabs: Object
// }

// function SellerSettingSidebar({tabs}: SellerSettingSidebarProps) {
//     return (
//         <div className="w-full lg:w-64 shrink-0">
//             <nav className="flex lg:flex-col space-x-2 lg:space-x-0 lg:space-y-1 bg-white p-2 rounded-xl border border-gray-200 shadow-sm overflow-x-auto">
//                 {tabs.map((tab) => {
//                     const Icon = tab.icon;
//                     const isActive = activeTab === tab.id;
//                     return (
//                         <button
//                             key={tab.id}
//                             onClick={() => setActiveTab(tab.id)}
//                             className={`flex items-center px-4 py-3 text-sm font-medium rounded-lg transition-all w-full whitespace-nowrap ${isActive
//                                 ? 'bg-blue-50 text-blue-700 shadow-sm'
//                                 : 'text-gray-600 hover:bg-gray-50 hover:text-gray-900'
//                                 }`}
//                         >
//                             <Icon className={`mr-3 h-5 w-5 ${isActive ? 'text-blue-600' : 'text-gray-400'}`} />
//                             {tab.label}
//                         </button>
//                     );
//                 })}
//             </nav>
//         </div>
//     )
// }

// export default SellerSettingSidebar
