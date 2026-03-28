<template>
    <div class="min-h-screen bg-gray-100 flex flex-col">
        <!-- Admin Header -->
        <header class="bg-white shadow-sm z-10 fixed w-full">
            <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div class="flex justify-between h-16 items-center">
                    <!-- Left side - Logo and mobile menu button -->
                    <div class="flex items-center">
                        <!-- Mobile menu button -->
                        <button @click="toggleSidebar"
                            class="md:hidden p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500 mr-3">
                            <svg class="h-6 w-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path v-if="sidebarOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                                <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M4 6h16M4 12h16M4 18h16" />
                            </svg>
                        </button>

                        <!-- Logo and title -->
                        <div class="flex items-center">
                            <img src="../assets/olive.png" alt="Logo" class="h-8 w-8 mr-2">
                            <span class="text-lg font-semibold text-gray-900 hidden sm:block">Verdo Admin Panel</span>
                            <span class="text-lg font-semibold text-gray-900 sm:hidden">Admin</span>
                        </div>
                    </div>

                    <!-- Right side - User info and actions -->
                    <div class="flex items-center space-x-2 sm:space-x-4">
                        <!-- Welcome message - hidden on small screens -->
                        <span class="text-sm text-gray-500 hidden md:block">Welcome, {{ adminName }}</span>

                        <!-- Back to website button - responsive -->
                        <router-link to="/"
                            class="inline-flex items-center px-2 py-2 sm:px-4 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg class="mr-1 sm:mr-2 -ml-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M10 19l-7-7m0 0l7-7m-7 7h18" />
                            </svg>
                            <span class="hidden sm:block">Back to Website</span>
                            <span class="sm:hidden">Back</span>
                        </router-link>

                        <!-- Logout button - responsive -->
                        <button @click="handleLogout"
                            class="inline-flex items-center px-2 py-2 sm:px-3 border border-gray-300 shadow-sm text-sm leading-4 font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-green-500">
                            <svg class="mr-1 sm:mr-2 -ml-0.5 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                            </svg>
                            <span class="hidden sm:block">Logout</span>
                            <span class="sm:hidden">Out</span>
                        </button>
                    </div>
                </div>
            </div>
        </header>

        <div class="pt-16 flex flex-1">
            <!-- Sidebar -->
            <div class="hidden md:flex md:flex-shrink-0">
                <div class="flex flex-col w-64 bg-white border-r border-gray-200 shadow-sm">
                    <div class="h-16 flex items-center px-6 border-b border-gray-200">
                        <div class="flex items-center">
                            <img src="../assets/olive.png" alt="Logo" class="h-8 w-8 mr-3">
                            <span class="text-lg font-bold text-gray-900">Verdo Admin</span>
                        </div>
                    </div>
                    <div class="flex-1 flex flex-col overflow-y-auto pt-6 pb-4">
                        <nav class="mt-2 flex-1 px-3 space-y-2">
                            <router-link to="/admin/dashboard"
                                class="group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/dashboard') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']">
                                <svg class="mr-3 h-6 w-6"
                                    :class="[$route.path.includes('/admin/dashboard') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </router-link>

                            <router-link to="/admin/users"
                                class="group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/users') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']">
                                <svg class="mr-3 h-6 w-6"
                                    :class="[$route.path.includes('/admin/users') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Users
                            </router-link>

                            <router-link to="/admin/products"
                                class="group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/products') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']">
                                <svg class="mr-3 h-6 w-6"
                                    :class="[$route.path.includes('/admin/products') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Products
                            </router-link>

                            <router-link to="/admin/investments"
                                class="group flex items-center px-3 py-3 text-sm font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/investments') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']">
                                <svg class="mr-3 h-6 w-6"
                                    :class="[$route.path.includes('/admin/investments') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Investments
                            </router-link>
                        </nav>
                    </div>
                </div>
            </div>



            <!-- Mobile sidebar -->
            <div v-if="sidebarOpen" class="fixed inset-0 flex z-40 md:hidden">
                <div class="fixed inset-0 bg-gray-600 bg-opacity-75 backdrop-blur-sm" @click="toggleSidebar"></div>
                <div class="relative flex-1 flex flex-col max-w-xs w-full bg-white shadow-xl">
                    <div class="absolute top-0 right-0 -mr-12 pt-2">
                        <button @click="toggleSidebar"
                            class="ml-1 flex items-center justify-center h-10 w-10 rounded-full bg-white shadow-lg focus:outline-none focus:ring-2 focus:ring-inset focus:ring-green-500">
                            <span class="sr-only">Close sidebar</span>
                            <svg class="h-6 w-6 text-gray-600" xmlns="http://www.w3.org/2000/svg" fill="none"
                                viewBox="0 0 24 24" stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                    </div>
                    <div class="flex-1 h-0 pt-5 pb-4 overflow-y-auto">
                        <div class="flex-shrink-0 flex items-center px-4 mb-6">
                            <img src="../assets/olive.png" alt="Logo" class="h-8 w-8 mr-3">
                            <span class="text-xl font-bold text-gray-900">Verdo Admin</span>
                        </div>
                        <nav class="mt-5 px-2 space-y-2">
                            <router-link to="/admin/dashboard"
                                class="group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/dashboard') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']"
                                @click="sidebarOpen = false">
                                <svg class="mr-4 h-6 w-6"
                                    :class="[$route.path.includes('/admin/dashboard') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                                </svg>
                                Dashboard
                            </router-link>

                            <router-link to="/admin/users"
                                class="group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/users') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']"
                                @click="sidebarOpen = false">
                                <svg class="mr-4 h-6 w-6"
                                    :class="[$route.path.includes('/admin/users') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 4.354a4 4 0 110 5.292M15 21H3v-1a6 6 0 0112 0v1zm0 0h6v-1a6 6 0 00-9-5.197M13 7a4 4 0 11-8 0 4 4 0 018 0z" />
                                </svg>
                                Users
                            </router-link>

                            <router-link to="/admin/products"
                                class="group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/products') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']"
                                @click="sidebarOpen = false">
                                <svg class="mr-4 h-6 w-6"
                                    :class="[$route.path.includes('/admin/products') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M20 7l-8-4-8 4m16 0l-8 4m8-4v10l-8 4m0-10L4 7m8 4v10M4 7v10l8 4" />
                                </svg>
                                Products
                            </router-link>

                            <router-link to="/admin/investments"
                                class="group flex items-center px-4 py-3 text-base font-medium rounded-lg transition-all duration-200"
                                :class="[$route.path.includes('/admin/investments') ? 'bg-green-100 text-green-800 shadow-sm' : 'text-gray-700 hover:bg-gray-100 hover:text-gray-900']"
                                @click="sidebarOpen = false">
                                <svg class="mr-4 h-6 w-6"
                                    :class="[$route.path.includes('/admin/investments') ? 'text-green-600' : 'text-gray-400 group-hover:text-gray-600']"
                                    xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                </svg>
                                Investments
                            </router-link>
                        </nav>
                    </div>
                </div>
            </div>

            <!-- Main content -->
            <div class="flex flex-col w-0 flex-1 overflow-hidden">
                <!-- Main content area with padding for fixed header -->
                <main class="flex-1 relative overflow-y-auto focus:outline-none">
                    <div class="py-6">
                        <div class="max-w-7xl mx-auto px-4 sm:px-6 md:px-8">
                            <router-view />
                        </div>
                    </div>
                </main>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../services/AuthService';

export default {
    name: 'AdminLayout',
    data() {
        return {
            sidebarOpen: false,
            adminName: 'Admin'
        };
    },
    computed: {
        currentUser() {
            return AuthService.getCurrentUser()?.user || {};
        }
    },
    methods: {
        hasPermission(permission) {
            return AuthService.hasPermission(permission);
        },
        handleLogout() {
            AuthService.logout();
            this.$router.push('/login');
        },
        toggleSidebar() {
            this.sidebarOpen = !this.sidebarOpen;
        }
    },
    created() {
        console.log("AdminLayout created, checking if admin...");
        console.log("Is admin?", AuthService.isAdmin());

        // Redirect if not admin
        if (!AuthService.isAdmin()) {
            console.log("Not admin, redirecting to unauthorized");
            this.$router.push('/unauthorized');
        } else {
            console.log("User is admin, proceeding to admin dashboard");
        }

        // Get admin name
        if (this.currentUser && this.currentUser.firstName) {
            this.adminName = this.currentUser.firstName;
        }
    }
}
</script>

<style>
/* Add custom styles for the admin layout */
.router-link-active {
    background-color: #f0fdf4;
    color: #15803d;
}
</style>