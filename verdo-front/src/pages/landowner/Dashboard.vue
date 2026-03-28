<template>
    <div class="min-h-screen bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white shadow rounded-lg p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-6">Landowner Dashboard</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-green-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Total Land</h2>
                        <p class="text-3xl font-bold text-olive-dark">25 acres</p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Active Projects</h2>
                        <p class="text-3xl font-bold text-blue-600">3</p>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Total Revenue</h2>
                        <p class="text-3xl font-bold text-yellow-600">$12,500</p>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg shadow mb-8">
                    <h2 class="text-xl font-medium text-gray-900 mb-4">Your Properties</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Property Name</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Size</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Olive Grove East</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Tuscany, Italy</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">10 acres</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Olive Grove West</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Andalusia, Spain</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">8 acres</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">Manage</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Olive Grove North</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">Crete, Greece</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">7 acres</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-yellow-100 text-yellow-800">Pending</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">Manage</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <button class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive-dark hover:bg-olive-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                        Register New Property
                    </button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../../services/AuthService';

export default {
    name: 'LandownerDashboard',
    created() {
        // Redirect if not a landowner
        if (!AuthService.isLandowner()) {
            this.$router.push('/unauthorized');
        }
    }
}
</script> 