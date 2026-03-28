<template>
    <div class="min-h-screen bg-gray-100 py-12">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="bg-white shadow rounded-lg p-6">
                <h1 class="text-2xl font-bold text-gray-900 mb-6">Investor Dashboard</h1>
                
                <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                    <div class="bg-green-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Total Invested</h2>
                        <p class="text-3xl font-bold text-olive-dark">$25,500</p>
                    </div>
                    <div class="bg-blue-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Active Investments</h2>
                        <p class="text-3xl font-bold text-blue-600">4</p>
                    </div>
                    <div class="bg-yellow-50 p-4 rounded-lg shadow">
                        <h2 class="text-lg font-medium text-gray-900 mb-2">Total Returns</h2>
                        <p class="text-3xl font-bold text-yellow-600">$3,200</p>
                    </div>
                </div>
                
                <div class="bg-gray-50 p-6 rounded-lg shadow mb-8">
                    <h2 class="text-xl font-medium text-gray-900 mb-4">Your Investments</h2>
                    <div class="overflow-x-auto">
                        <table class="min-w-full divide-y divide-gray-200">
                            <thead class="bg-gray-100">
                                <tr>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Project</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Returns</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                                    <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
                                </tr>
                            </thead>
                            <tbody class="bg-white divide-y divide-gray-200">
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Olive Grove Expansion</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$10,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-01-15</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$1,200</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Sustainable Farming</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$5,500</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-03-20</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$800</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Organic Certification</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$7,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-05-10</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$700</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                                <tr>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">Water Conservation</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$3,000</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">2023-06-05</td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">$500</td>
                                    <td class="px-6 py-4 whitespace-nowrap">
                                        <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">Active</span>
                                    </td>
                                    <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                        <button class="text-indigo-600 hover:text-indigo-900">View Details</button>
                                    </td>
                                </tr>
                            </tbody>
                        </table>
                    </div>
                </div>
                
                <div class="flex justify-center">
                    <router-link to="/opportunities" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-olive-dark hover:bg-olive-medium focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark">
                        Explore New Opportunities
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import AuthService from '../../services/AuthService';

export default {
    name: 'InvestorDashboard',
    created() {
        // Redirect if not an investor
        if (!AuthService.isInvestor()) {
            this.$router.push('/unauthorized');
        }
    }
}
</script> 