<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Users Management</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Manage all users in the system</p>
            </div>
            <button @click="showAddUserModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New User
            </button>
        </div>

        <div class="border-t border-gray-200">
            <div class="overflow-x-auto">
                <table class="min-w-full divide-y divide-gray-200">
                    <thead class="bg-gray-50">
                        <tr>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Name</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Email</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Role</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(user, index) in users" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">{{ user.firstName }} {{ user.lastName
                                        }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ user.email }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span
                                    class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800">
                                    {{ user.role }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="user.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ user.active ? 'Active' : 'Inactive' }}
                                </span>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                                <button class="text-indigo-600 hover:text-indigo-900 mr-3">Edit</button>
                                <button class="text-red-600 hover:text-red-900">Delete</button>
                            </td>
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    </div>

    <!-- Add User Modal -->
    <div v-if="showAddUserModal" class="fixed inset-0 overflow-y-auto h-full w-full z-50"
        style="background: radial-gradient(circle at center, rgba(229, 231, 235, 0.3) 0%, rgba(229, 231, 235, 0.1) 50%, transparent 100%);">
        <div class="relative top-20 mx-auto p-8 w-96 rounded-2xl bg-white border border-gray-200 shadow-lg">
            <div class="mt-3">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Add New User</h3>
                    <button @click="showAddUserModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="addUser">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">First Name</label>
                        <input v-model="newUser.firstName" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Last Name</label>
                        <input v-model="newUser.lastName" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Email</label>
                        <input v-model="newUser.email" type="email" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Role</label>
                        <select v-model="newUser.role" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Role</option>
                            <option value="Admin">Admin</option>
                            <option value="Investor">Investor</option>
                            <option value="Landowner">Landowner</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select v-model="newUser.active" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="showAddUserModal = false"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add User
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminUsers',
    data() {
        return {
            showAddUserModal: false,
            newUser: {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                active: true
            },
            users: [
                { firstName: 'ahmed', lastName: 'Ben salah', email: 'ahmed@gmail.com', role: 'Investor', active: true },
                { firstName: 'Menyar', lastName: 'Debbebi', email: 'menyardebbebi14@gmail.com', role: 'Admin', active: true },
                { firstName: 'Sami', lastName: 'Fki', email: 'sami@gmail.com', role: 'Landowner', active: false },
                { firstName: 'Mohamed', lastName: 'Ben mohamed', email: 'mohamed@gmail.com', role: 'Investor', active: true }
            ]
        }
    },
    methods: {
        addUser() {
            // Convert active string to boolean
            const userToAdd = {
                ...this.newUser,
                active: this.newUser.active === 'true' || this.newUser.active === true
            };

            this.users.push(userToAdd);
            this.showAddUserModal = false;
            this.resetForm();
        },
        resetForm() {
            this.newUser = {
                firstName: '',
                lastName: '',
                email: '',
                role: '',
                active: true
            };
        }
    }
}
</script>