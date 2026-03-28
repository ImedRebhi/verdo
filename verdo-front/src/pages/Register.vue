<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <!-- Logo -->
            <img class="mx-auto h-16 w-auto" :src="Logo" alt="Verdolive" />
            <h2 class="mt-6 text-center text-3xl font-bold text-gray-900" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('register.title') }}</h2>
            <p class="mt-2 text-center text-sm text-gray-600" :class="{ 'text-right': $i18n.locale === 'ar' }">
                {{ $t('register.haveAccount') }}
                <router-link to="/login" class="font-medium text-olive-dark hover:text-olive-light transition-colors">
                    {{ $t('register.signIn') }}
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-xl">
            <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                <form class="space-y-8" @submit.prevent="handleRegister">
                    <!-- Personal Information Section -->
                    <div>
                        <h3 class="text-xl font-semibold text-gray-900 mb-6">{{ $t('register.personalInfo') }}</h3>
                        <div class="grid grid-cols-1 gap-6 sm:grid-cols-2">
                            <!-- First Name -->
                            <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <label for="firstName" class="block text-sm font-medium text-gray-700">
                                    {{ $t('register.firstName') }}
                                </label>
                                <div class="mt-1">
                                    <input type="text" id="firstName" name="firstName" v-model="form.firstName" required
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                                </div>
                            </div>

                            <!-- Last Name -->
                            <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <label for="lastName" class="block text-sm font-medium text-gray-700">
                                    {{ $t('register.lastName') }}
                                </label>
                                <div class="mt-1">
                                    <input type="text" id="lastName" name="lastName" v-model="form.lastName" required
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                                </div>
                            </div>

                            <!-- Email -->
                            <div class="sm:col-span-2" :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <label for="email" class="block text-sm font-medium text-gray-700">
                                    {{ $t('register.email') }}
                                </label>
                                <div class="mt-1">
                                    <input type="email" id="email" name="email" v-model="form.email" required
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                                </div>
                            </div>

                            <!-- Phone Number -->
                            <div class="sm:col-span-2" :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <label for="phone" class="block text-sm font-medium text-gray-700">
                                    {{ $t('register.phone') }}
                                </label>
                                <div class="mt-1">
                                    <input type="tel" id="phone" name="phone" v-model="form.phone" required
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                                </div>
                            </div>

                            <!-- Password -->
                            <div class="sm:col-span-2" :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <label for="password" class="block text-sm font-medium text-gray-700">
                                    {{ $t('register.password') }}
                                </label>
                                <div class="mt-1 relative">
                                    <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                                        v-model="form.password" required
                                        class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                                    <button type="button" @click="togglePassword"
                                        class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                :d="showPassword ? 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'" />
                                        </svg>
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Entity Type Section -->
                    <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                        <h3 class="text-xl font-semibold text-gray-900 mb-4">{{ $t('register.entityType') }}</h3>
                        <p class="text-sm text-gray-500 mb-6">{{ $t('register.entityTypeDescription') }}</p>

                        <div class="space-y-4" :class="{ 'text-right': $i18n.locale === 'ar' }">
                            <!-- Individual Option -->
                            <div 
                                class="relative border rounded-md p-4 cursor-pointer transition-all"
                                :class="form.entityType === 'individual' ? 'border-olive-dark bg-green-50' : 'border-gray-200 hover:border-gray-300'"
                                @click="form.entityType = 'individual'"
                            >
                                <div class="flex items-start" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                                    <div class="flex items-center h-5 mt-1">
                                        <input id="individual" name="entityType" type="radio" v-model="form.entityType"
                                            value="individual"
                                            class="h-4 w-4 text-olive-dark focus:ring-olive-dark border-gray-300" />
                                    </div>
                                    <div class="ml-3" :class="{ 'text-right mr-3': $i18n.locale === 'ar' }">
                                        <label for="individual" class="font-medium text-gray-700">{{ $t('register.individual.title') }}</label>
                                        <p class="text-gray-500 text-sm">{{ $t('register.individual.description') }}</p>
                                    </div>
                                </div>
                            </div>

                            <!-- Group Option -->
                            <div 
                                class="relative border rounded-md p-4 cursor-pointer transition-all"
                                :class="form.entityType === 'group' ? 'border-olive-dark bg-green-50' : 'border-gray-200 hover:border-gray-300'"
                                @click="form.entityType = 'group'"
                            >
                                <div class="flex items-start" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                                    <div class="flex items-center h-5 mt-1">
                                        <input id="group" name="entityType" type="radio" v-model="form.entityType"
                                            value="group"
                                            class="h-4 w-4 text-olive-dark focus:ring-olive-dark border-gray-300" />
                                    </div>
                                    <div class="ml-3" :class="{ 'text-right mr-3': $i18n.locale === 'ar' }">
                                        <label for="group" class="font-medium text-gray-700">{{ $t('register.group.title') }}</label>
                                        <p class="text-gray-500 text-sm">{{ $t('register.group.description') }}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>

                    <!-- Add error message display -->
                    <div v-if="error" 
                        class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md" 
                        :class="{ 'border-r-4 border-l-0': $i18n.locale === 'ar' }">
                        <div class="flex items-start" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3" :class="{ 'mr-3 ml-0': $i18n.locale === 'ar' }">
                                <p class="text-sm text-red-700">{{ error }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Register Button -->
                    <div>
                        <button type="submit" :disabled="loading"
                            class="w-full flex justify-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-olive-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark transition-colors">
                            <span v-if="loading">{{ $t('register.processing') }}</span>
                            <span v-else>{{ $t('register.register') }}</span>
                        </button>
                    </div>
                </form>
            </div>
        </div>
    </div>
</template>

<script>
import Logo from "../assets/olive.png";
import AuthService from "../services/AuthService";

export default {
    name: 'Register',
    data() {
        return {
            Logo,
            showPassword: false,
            form: {
                firstName: '',
                lastName: '',
                email: '',
                phone: '',
                password: '',
                confirmPassword: '',
                entityType: 'individual'
            },
            loading: false,
            error: ''
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        async handleRegister() {
            this.loading = true;
            this.error = '';
            
            try {
                // Validate form fields
                if (this.form.firstName.length < 2) {
                    throw new Error(this.$t('register.errors.invalidFirstName'));
                }
                if (this.form.lastName.length < 2) {
                    throw new Error(this.$t('register.errors.invalidLastName'));
                }
                if (!this.form.email.match(/^[^\s@]+@[^\s@]+\.[^\s@]+$/)) {
                    throw new Error(this.$t('register.errors.invalidEmail'));
                }
                if (!this.form.phone.match(/^\+?[\d\s-]{8,}$/)) {
                    throw new Error(this.$t('register.errors.invalidPhone'));
                }
                if (this.form.password.length < 6 || !/\d/.test(this.form.password)) {
                    throw new Error(this.$t('register.errors.invalidPassword'));
                }

                await AuthService.register(
                    this.form.firstName,
                    this.form.lastName,
                    this.form.email,
                    this.form.phone,
                    this.form.password,
                    this.form.entityType
                );
                
                this.$router.push('/login?registered=true');
            } catch (error) {
                if (error.response) {
                    // Handle specific API error messages
                    const errorKey = error.response.data.errorKey || 'registrationFailed';
                    this.error = this.$t(`register.errors.${errorKey}`);
                } else if (error.request) {
                    this.error = this.$t('register.errors.noResponse');
                } else {
                    this.error = error.message || this.$t('register.errors.registrationFailed');
                }
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>