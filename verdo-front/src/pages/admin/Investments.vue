<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Investments Management</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Manage all investments in the system</p>
            </div>
            <button @click="showAddInvestmentModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New Investment
            </button>
        </div>

        <div class="border-t border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Project</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Investor</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Amount</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Date</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(investment, index) in investments" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">{{ investment.project }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ investment.investor }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ investment.amount.toLocaleString() }} DT</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ investment.date }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full" :class="{
                                    'bg-green-100 text-green-800': investment.status === 'Completed',
                                    'bg-yellow-100 text-yellow-800': investment.status === 'Pending',
                                    'bg-red-100 text-red-800': investment.status === 'Cancelled'
                                }">
                                    {{ investment.status }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button class="text-indigo-600 hover:text-indigo-900 mr-3">View</button>
                                <button class="text-red-600 hover:text-red-900">Cancel</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add Investment Modal -->
    <div v-if="showAddInvestmentModal" class="fixed inset-0 overflow-y-auto h-full w-full z-50"
        style="background: radial-gradient(circle at center, rgba(229, 231, 235, 0.3) 0%, rgba(229, 231, 235, 0.1) 50%, transparent 100%);">
        <div class="relative top-20 mx-auto p-8 w-96 rounded-2xl bg-white border border-gray-200 shadow-lg">
            <div class="mt-3">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Add New Investment</h3>
                    <button @click="showAddInvestmentModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="addInvestment">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Project</label>
                        <input v-model="newInvestment.project" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Investor</label>
                        <input v-model="newInvestment.investor" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Amount (DT)</label>
                        <input v-model="newInvestment.amount" type="number" min="0" step="0.01" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Date</label>
                        <input v-model="newInvestment.date" type="date" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select v-model="newInvestment.status" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Status</option>
                            <option value="Completed">Completed</option>
                            <option value="Pending">Pending</option>
                            <option value="Cancelled">Cancelled</option>
                        </select>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="showAddInvestmentModal = false"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add Investment
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminInvestments',
    data() {
        return {
            showAddInvestmentModal: false,
            newInvestment: {
                project: '',
                investor: '',
                amount: '',
                date: '',
                status: ''
            },
            investments: [
                { project: 'Olive Grove Expansion', investor: 'John Doe', amount: 5000, date: '2023-05-15', status: 'Completed' },
                { project: 'Sustainable Farming', investor: 'Jane Smith', amount: 10000, date: '2023-06-20', status: 'Pending' },
                { project: 'Organic Certification', investor: 'Bob Johnson', amount: 7500, date: '2023-07-10', status: 'Completed' },
                { project: 'Water Conservation', investor: 'Alice Williams', amount: 3000, date: '2023-08-05', status: 'Cancelled' }
            ]
        }
    },
    methods: {
        addInvestment() {
            const investmentToAdd = {
                ...this.newInvestment,
                amount: parseFloat(this.newInvestment.amount)
            };

            this.investments.push(investmentToAdd);
            this.showAddInvestmentModal = false;
            this.resetForm();
        },
        resetForm() {
            this.newInvestment = {
                project: '',
                investor: '',
                amount: '',
                date: '',
                status: ''
            };
        }
    }
}
</script>