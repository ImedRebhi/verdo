<template>
    <div class="min-h-screen bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white shadow rounded-lg p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-6">User Dashboard</h1>
                
                <div v-if="currentUser" class="space-y-6">
                    <div class="bg-gray-50 p-4 rounded-md">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Your Profile</h2>
                        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
                            <div>
                                <p class="text-sm text-gray-500">Name</p>
                                <p class="font-medium">{{ currentUser.user.firstName }} {{ currentUser.user.lastName }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Email</p>
                                <p class="font-medium">{{ currentUser.user.email }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Phone Number</p>
                                <p class="font-medium">{{ currentUser.user.phoneNumber }}</p>
                            </div>
                            <div>
                                <p class="text-sm text-gray-500">Entity Type</p>
                                <p class="font-medium capitalize">{{ currentUser.user.entityType }}</p>
                            </div>
                        </div>
                    </div>
                    
                    <div class="bg-gray-50 p-4 rounded-md">
                        <h2 class="text-lg font-medium text-gray-900 mb-4">Your Investments</h2>
                        <p class="text-gray-500">You don't have any investments yet.</p>
                        <router-link to="/opportunities" class="mt-4 inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive-dark hover:bg-olive-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                            Browse Opportunities
                        </router-link>
                    </div>
                    
                    <div class="mt-6">
                        <button @click="handleLogout" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500">
                            Logout
                        </button>
                    </div>
                </div>
                
                <div v-else class="text-center py-12">
                    <p class="text-gray-500">Loading your profile...</p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from "../services/AuthService";

export default {
    name: 'Dashboard',
    data() {
        return {
            currentUser: null
        }
    },
    created() {
        this.currentUser = AuthService.getCurrentUser();
        if (!this.currentUser) {
            this.$router.push('/login');
        }
    },
    methods: {
        handleLogout() {
            AuthService.logout();
            this.$router.push('/login');
        }
    }
}
</script> 