<template>
    <div>
        <h1 class="text-2xl font-semibold text-gray-900">Admin Dashboard</h1>

        <div class="mt-6 grid grid-cols-1 gap-5 sm:grid-cols-2 lg:grid-cols-3">
            <!-- Card 1 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-green-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">
                                    Total Users
                                </dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">
                                        42
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                        <router-link to="/admin/users" class="font-medium text-olive-dark hover:text-olive-medium">
                            View all users
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Card 2 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-blue-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">
                                    Total Products
                                </dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">
                                        24
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                        <router-link to="/admin/products" class="font-medium text-olive-dark hover:text-olive-medium">
                            View all products
                        </router-link>
                    </div>
                </div>
            </div>

            <!-- Card 3 -->
            <div class="bg-white overflow-hidden shadow rounded-lg">
                <div class="px-4 py-5 sm:p-6">
                    <div class="flex items-center">
                        <div class="flex-shrink-0 bg-yellow-500 rounded-md p-3">
                            <svg class="h-6 w-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                            </svg>
                        </div>
                        <div class="ml-5 w-0 flex-1">
                            <dl>
                                <dt class="text-sm font-medium text-gray-500 truncate">
                                    Total Investments
                                </dt>
                                <dd>
                                    <div class="text-lg font-medium text-gray-900">
                                        $125,000
                                    </div>
                                </dd>
                            </dl>
                        </div>
                    </div>
                </div>
                <div class="bg-gray-50 px-4 py-4 sm:px-6">
                    <div class="text-sm">
                        <router-link to="/admin/investments"
                            class="font-medium text-olive-dark hover:text-olive-medium">
                            View all investments
                        </router-link>
                    </div>
                </div>
            </div>
        </div>

        <!-- Make Money Section -->
        <div class="mt-8">
            <div class="flex items-center justify-between mb-6">
                <div>
                    <h2 class="text-2xl font-bold text-gray-900 tracking-wider">MAKE MONEY TWO WAYS</h2>
                    <p class="mt-2 text-gray-600">Track and manage your revenue streams effectively</p>
                </div>
                <button
                    class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive-dark hover:bg-olive-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                    <svg class="mr-2 h-5 w-5" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                        stroke="currentColor">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                            d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
                    </svg>
                    Add New Revenue
                </button>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <!-- Crop Profits Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="relative h-48">
                        <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop"
                            alt="Crop Profits" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4">
                            <div class="bg-green-500 rounded-full p-3">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Crop Profits</h3>
                        <p class="text-gray-600 mb-4">Monthly return on investments from agricultural projects</p>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">Monthly Revenue</p>
                                <p class="text-2xl font-bold text-green-600">$2,500</p>
                            </div>
                            <div class="bg-green-50 px-3 py-1 rounded-full">
                                <span class="text-green-600 font-medium">+12.5%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Product Sales Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="relative h-48">
                        <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop"
                            alt="Product Sales" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4">
                            <div class="bg-blue-500 rounded-full p-3">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Product Sales</h3>
                        <p class="text-gray-600 mb-4">Revenue from direct product sales and commissions</p>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">Monthly Revenue</p>
                                <p class="text-2xl font-bold text-blue-600">$4,800</p>
                            </div>
                            <div class="bg-blue-50 px-3 py-1 rounded-full">
                                <span class="text-blue-600 font-medium">+8.3%</span>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Partnership Revenue Card -->
                <div class="bg-white rounded-lg shadow-lg overflow-hidden">
                    <div class="relative h-48">
                        <img src="https://images.unsplash.com/photo-1552664730-d307ca884978?w=800&auto=format&fit=crop"
                            alt="Partnership Revenue" class="w-full h-full object-cover" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent"></div>
                        <div class="absolute bottom-4 left-4">
                            <div class="bg-yellow-500 rounded-full p-3">
                                <svg class="h-6 w-6 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                                </svg>
                            </div>
                        </div>
                    </div>
                    <div class="p-6">
                        <h3 class="text-xl font-bold text-gray-900 mb-2">Partnership Revenue</h3>
                        <p class="text-gray-600 mb-4">Income from strategic partnerships and collaborations</p>
                        <div class="flex items-center justify-between">
                            <div>
                                <p class="text-sm text-gray-500">Monthly Revenue</p>
                                <p class="text-2xl font-bold text-yellow-600">$3,200</p>
                            </div>
                            <div class="bg-yellow-50 px-3 py-1 rounded-full">
                                <span class="text-yellow-600 font-medium">+15.7%</span>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Recent Activity Section -->
        <div class="mt-8">
            <h2 class="text-lg font-medium text-gray-900">Recent Activity</h2>
            <div class="mt-4 bg-white shadow overflow-hidden sm:rounded-md">
                <ul class="divide-y divide-gray-200">
                    <li v-for="(activity, index) in recentActivities" :key="index">
                        <div class="px-4 py-4 sm:px-6">
                            <div class="flex items-center justify-between">
                                <p class="text-sm font-medium text-olive-dark truncate">
                                    {{ activity.title }}
                                </p>
                                <div class="ml-2 flex-shrink-0 flex">
                                    <p class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                        :class="getStatusClass(activity.type)">
                                        {{ activity.type }}
                                    </p>
                                </div>
                            </div>
                            <div class="mt-2 sm:flex sm:justify-between">
                                <div class="sm:flex">
                                    <p class="flex items-center text-sm text-gray-500">
                                        {{ activity.description }}
                                    </p>
                                </div>
                                <div class="mt-2 flex items-center text-sm text-gray-500 sm:mt-0">
                                    <svg class="flex-shrink-0 mr-1.5 h-5 w-5 text-gray-400"
                                        xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                        <path fill-rule="evenodd"
                                            d="M6 2a1 1 0 00-1 1v1H4a2 2 0 00-2 2v10a2 2 0 002 2h12a2 2 0 002-2V6a2 2 0 00-2-2h-1V3a1 1 0 10-2 0v1H7V3a1 1 0 00-1-1zm0 5a1 1 0 000 2h8a1 1 0 100-2H6z"
                                            clip-rule="evenodd" />
                                    </svg>
                                    <p>
                                        {{ activity.date }}
                                    </p>
                                </div>
                            </div>
                        </div>
                    </li>
                </ul>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminDashboard',
    data() {
        return {
            recentActivities: [
                {
                    title: 'New User Registration',
                    type: 'User',
                    description: 'John Doe registered as an investor',
                    date: 'Today at 10:30 AM'
                },
                {
                    title: 'New Investment',
                    type: 'Investment',
                    description: 'Jane Smith invested $5,000 in Olive Grove Project',
                    date: 'Yesterday at 2:45 PM'
                },
                {
                    title: 'Product Update',
                    type: 'Product',
                    description: 'Olive Tree - Medium price updated to $149.99',
                    date: '2 days ago'
                },
                {
                    title: 'New Landowner',
                    type: 'User',
                    description: 'Maria Garcia registered as a landowner',
                    date: '3 days ago'
                }
            ]
        };
    },
    methods: {
        getStatusClass(type) {
            switch (type) {
                case 'User':
                    return 'bg-green-100 text-green-800';
                case 'Investment':
                    return 'bg-blue-100 text-blue-800';
                case 'Product':
                    return 'bg-yellow-100 text-yellow-800';
                default:
                    return 'bg-gray-100 text-gray-800';
            }
        }
    }
};
</script>