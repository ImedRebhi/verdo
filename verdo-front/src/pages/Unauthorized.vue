<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <div class="text-center">
                <svg xmlns="http://www.w3.org/2000/svg" class="mx-auto h-16 w-16 text-red-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-3L13.732 4c-.77-1.333-2.694-1.333-3.464 0L3.34 16c-.77 1.333.192 3 1.732 3z" />
                </svg>
                <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">Access Denied</h2>
                <p class="mt-2 text-center text-sm text-gray-600">
                    You don't have permission to access this page.
                </p>
            </div>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                <div class="space-y-6">
                    <p class="text-gray-700 text-center">
                        Please contact the administrator if you believe this is an error.
                    </p>
                    <div class="flex justify-center space-x-4">
                        <router-link to="/" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive-dark hover:bg-olive-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                            Go to Home
                        </router-link>
                        <router-link to="/dashboard" class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                            Go to Dashboard
                        </router-link>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'Unauthorized'
}
</script> 