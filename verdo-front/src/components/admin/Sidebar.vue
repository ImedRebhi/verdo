<template>
    <div class="bg-white h-screen w-64 fixed left-0 top-0 shadow-lg z-30">
        <!-- Logo Section -->
        <div class="flex items-center gap-2 p-6 border-b">
            <img src="@/assets/olive.png" alt="Logo" class="w-8 h-8" />
            <span class="text-xl font-bold text-gray-800">Admin Panel</span>
        </div>

        <!-- Navigation Menu -->
        <nav class="py-4">
            <router-link to="/admin/dashboard"
                class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                :class="{ 'bg-green-50 text-green-600': $route.path === '/admin/dashboard' }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M3 4a1 1 0 011-1h12a1 1 0 011 1v2a1 1 0 01-1 1H4a1 1 0 01-1-1V4zM3 10a1 1 0 011-1h6a1 1 0 011 1v6a1 1 0 01-1 1H4a1 1 0 01-1-1v-6zM14 9a1 1 0 00-1 1v6a1 1 0 001 1h2a1 1 0 001-1v-6a1 1 0 00-1-1h-2z" />
                </svg>
                Dashboard
            </router-link>

            <router-link to="/admin/products"
                class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                :class="{ 'bg-green-50 text-green-600': $route.path === '/admin/products' }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path d="M4 3a2 2 0 100 4h12a2 2 0 100-4H4z" />
                    <path fill-rule="evenodd"
                        d="M3 8h14v7a2 2 0 01-2 2H5a2 2 0 01-2-2V8zm5 3a1 1 0 011-1h2a1 1 0 110 2H9a1 1 0 01-1-1z"
                        clip-rule="evenodd" />
                </svg>
                Products
            </router-link>

            <router-link to="/admin/investments"
                class="flex items-center gap-3 px-6 py-3 text-gray-700 hover:bg-green-50 hover:text-green-600 transition-colors duration-200"
                :class="{ 'bg-green-50 text-green-600': $route.path === '/admin/investments' }">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path
                        d="M8.433 7.418c.155-.103.346-.196.567-.267v1.698a2.305 2.305 0 01-.567-.267C8.07 8.34 8 8.114 8 8c0-.114.07-.34.433-.582zM11 12.849v-1.698c.22.071.412.164.567.267.364.243.433.468.433.582 0 .114-.07.34-.433.582a2.305 2.305 0 01-.567.267z" />
                    <path fill-rule="evenodd"
                        d="M10 18a8 8 0 100-16 8 8 0 000 16zm1-13a1 1 0 10-2 0v.092a4.535 4.535 0 00-1.676.662C6.602 6.234 6 7.009 6 8c0 .99.602 1.765 1.324 2.246.48.32 1.054.545 1.676.662v1.941c-.391-.127-.68-.317-.843-.504a1 1 0 10-1.51 1.31c.562.649 1.413 1.076 2.353 1.253V15a1 1 0 102 0v-.092a4.535 4.535 0 001.676-.662C13.398 13.766 14 12.991 14 12c0-.99-.602-1.765-1.324-2.246A4.535 4.535 0 0011 9.092V7.151c.391.127.68.317.843.504a1 1 0 101.511-1.31c-.563-.649-1.413-1.076-2.354-1.253V5z"
                        clip-rule="evenodd" />
                </svg>
                Investments
            </router-link>

            <div class="px-6 py-4">
                <div class="border-t border-gray-200"></div>
            </div>

            <button @click="logout"
                class="flex items-center gap-3 px-6 py-3 w-full text-left text-gray-700 hover:bg-red-50 hover:text-red-600 transition-colors duration-200">
                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                    <path fill-rule="evenodd"
                        d="M3 3a1 1 0 011 1v12a1 1 0 11-2 0V4a1 1 0 011-1zm7.707 3.293a1 1 0 010 1.414L9.414 9H17a1 1 0 110 2H9.414l1.293 1.293a1 1 0 01-1.414 1.414l-3-3a1 1 0 010-1.414l3-3a1 1 0 011.414 0z"
                        clip-rule="evenodd" />
                </svg>
                Logout
            </button>
        </nav>
    </div>
</template>

<script>
export default {
    name: 'AdminSidebar',
    methods: {
        logout() {
            // Implement logout logic here
            this.$router.push('/login')
        }
    }
}
</script>