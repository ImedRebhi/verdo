<template>
    <header class="bg-white border-b border-gray-200 fixed top-0 right-0 left-64 h-16 z-20">
        <div class="h-full px-6 flex items-center justify-between">
            <!-- Left side - Page Title -->
            <div class="flex items-center">
                <h1 class="text-xl font-bold text-gray-800">{{ pageTitle }}</h1>
            </div>

            <!-- Right side -->
            <div class="flex items-center space-x-6">
                <!-- View Site Button -->
                <router-link to="/"
                    class="flex items-center gap-2 px-4 py-2 text-sm font-medium text-gray-700 bg-gray-100 hover:bg-gray-200 rounded-lg transition-all duration-200"
                    :class="{ 'bg-gray-100': $route.path === '/' }">
                    <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                        <path d="M10 12a2 2 0 100-4 2 2 0 000 4z" />
                        <path fill-rule="evenodd"
                            d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z"
                            clip-rule="evenodd" />
                    </svg>
                    Voir le site
                </router-link>

                <!-- User Profile -->
                <div class="flex items-center gap-3">
                    <div class="flex flex-col items-end">
                        <span class="text-sm font-medium text-gray-900">{{ userData.firstName }} {{ userData.lastName
                        }}</span>
                        <span class="text-xs text-gray-500">Administrateur</span>
                    </div>
                    <img :src="`https://ui-avatars.com/api/?name=${userData.firstName}+${userData.lastName}&background=22C55E&color=ffffff`"
                        :alt="userData.firstName" class="w-9 h-9 rounded-full border-2 border-green-500" />
                </div>
            </div>
        </div>
    </header>
</template>

<script>
export default {
    name: 'AdminHeader',
    data() {
        return {
            userData: {
                firstName: 'John',
                lastName: 'Doe'
            }
        }
    },
    computed: {
        pageTitle() {
            const path = this.$route.path
            if (path.includes('/admin/dashboard')) return 'Dashboard'
            if (path.includes('/admin/products')) return 'Products'
            if (path.includes('/admin/investments')) return 'Investments'
            return 'Admin Panel'
        }
    }
}
</script>