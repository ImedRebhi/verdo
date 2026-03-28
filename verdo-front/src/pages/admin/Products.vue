<template>
    <div class="bg-white shadow overflow-hidden sm:rounded-md">
        <div class="px-4 py-5 sm:px-6 flex justify-between items-center">
            <div>
                <h3 class="text-lg leading-6 font-medium text-gray-900">Products Management</h3>
                <p class="mt-1 max-w-2xl text-sm text-gray-500">Manage all products in the system</p>
            </div>
            <button @click="showAddProductModal = true"
                class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
                Add New Product
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
                                Category</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Price</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Status</th>
                            <th scope="col"
                                class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                                Actions</th>
                        </tr>
                    </thead>
                    <tbody class="bg-white divide-y divide-gray-200">
                        <tr v-for="(product, index) in products" :key="index">
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="flex items-center">
                                    <div class="text-sm font-medium text-gray-900">{{ product.name }}</div>
                                </div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ product.category }}</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <div class="text-sm text-gray-900">{{ product.price }} DT</div>
                            </td>
                            <td class="px-6 py-4 whitespace-nowrap">
                                <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                                    :class="product.active ? 'bg-green-100 text-green-800' : 'bg-red-100 text-red-800'">
                                    {{ product.active ? 'Active' : 'Inactive' }}
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

    <!-- Add Product Modal -->
    <div v-if="showAddProductModal" class="fixed inset-0 overflow-y-auto h-full w-full z-50"
        style="background: radial-gradient(circle at center, rgba(229, 231, 235, 0.3) 0%, rgba(229, 231, 235, 0.1) 50%, transparent 100%);">
        <div class="relative top-20 mx-auto p-8 w-96 rounded-2xl bg-white border border-gray-200 shadow-lg">
            <div class="mt-3">
                <div class="flex justify-between items-center mb-4">
                    <h3 class="text-lg font-medium text-gray-900">Add New Product</h3>
                    <button @click="showAddProductModal = false" class="text-gray-400 hover:text-gray-600">
                        <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12"></path>
                        </svg>
                    </button>
                </div>

                <form @submit.prevent="addProduct">
                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Product Name</label>
                        <input v-model="newProduct.name" type="text" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Category</label>
                        <select v-model="newProduct.category" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="">Select Category</option>
                            <option value="Trees">Trees</option>
                            <option value="Oil">Oil</option>
                            <option value="Seeds">Seeds</option>
                            <option value="Tools">Tools</option>
                        </select>
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Price (DT)</label>
                        <input v-model="newProduct.price" type="number" min="0" step="0.01" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                    </div>

                    <div class="mb-4">
                        <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
                        <select v-model="newProduct.active" required
                            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500">
                            <option value="true">Active</option>
                            <option value="false">Inactive</option>
                        </select>
                    </div>

                    <div class="flex justify-end space-x-3">
                        <button type="button" @click="showAddProductModal = false"
                            class="px-4 py-2 text-sm font-medium text-gray-700 bg-gray-200 rounded-md hover:bg-gray-300 focus:outline-none focus:ring-2 focus:ring-gray-500">
                            Cancel
                        </button>
                        <button type="submit"
                            class="px-4 py-2 text-sm font-medium text-white bg-blue-600 rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500">
                            Add Product
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'AdminProducts',
    data() {
        return {
            showAddProductModal: false,
            newProduct: {
                name: '',
                category: '',
                price: '',
                active: true
            },
            products: [
                { name: 'Olive Tree - Small', category: 'Trees', price: 99.99, active: true },
                { name: 'Olive Tree - Medium', category: 'Trees', price: 149.99, active: true },
                { name: 'Olive Tree - Large', category: 'Trees', price: 199.99, active: false },
                { name: 'Olive Oil - Premium', category: 'Oil', price: 29.99, active: true }
            ]
        }
    },
    methods: {
        addProduct() {
            const productToAdd = {
                ...this.newProduct,
                price: parseFloat(this.newProduct.price),
                active: this.newProduct.active === 'true' || this.newProduct.active === true
            };

            this.products.push(productToAdd);
            this.showAddProductModal = false;
            this.resetForm();
        },
        resetForm() {
            this.newProduct = {
                name: '',
                category: '',
                price: '',
                active: true
            };
        }
    }
}
</script>