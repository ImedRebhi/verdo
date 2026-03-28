<template>
    <div class="min-h-screen bg-gray-50 flex flex-col justify-center py-12 sm:px-6 lg:px-8">
        <div class="sm:mx-auto sm:w-full sm:max-w-md">
            <!-- Logo -->
            <img class="mx-auto h-16 w-auto" :src="Logo" alt="Verdolive" />
            <h2 class="mt-6 text-center text-3xl font-bold text-gray-900">{{ $t('login.title') }}</h2>
            <p class="mt-2 text-center text-sm text-gray-600">
                {{ $t('login.noAccount') }}
                <router-link to="/register"
                    class="font-medium text-olive-dark hover:text-olive-light transition-colors">
                    {{ $t('login.signUp') }}
                </router-link>
            </p>
        </div>

        <div class="mt-8 sm:mx-auto sm:w-full sm:max-w-md">
            <div class="bg-white py-8 px-4 shadow-xl sm:rounded-lg sm:px-10 border border-gray-100">
                <form class="space-y-6" @submit.prevent="handleLogin">
                    <!-- Email Input -->
                    <div>
                        <label for="email" class="block text-sm font-medium text-gray-700">
                            {{ $t('login.email') }}
                        </label>
                        <div class="mt-1">
                            <input id="email" name="email" type="email" autocomplete="email" required v-model="email"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                        </div>
                    </div>

                    <!-- Password Input -->
                    <div>
                        <label for="password" class="block text-sm font-medium text-gray-700">
                            {{ $t('login.password') }}
                        </label>
                        <div class="mt-1 relative">
                            <input :type="showPassword ? 'text' : 'password'" id="password" name="password"
                                autocomplete="current-password" required v-model="password"
                                class="appearance-none block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm placeholder-gray-400 focus:outline-none focus:ring-olive-dark focus:border-olive-dark sm:text-sm" />
                            <!-- Toggle Password Visibility -->
                            <button type="button" @click="togglePassword"
                                class="absolute inset-y-0 right-0 pr-3 flex items-center">
                                <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-gray-400" fill="none"
                                    viewBox="0 0 24 24" stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        :d="showPassword ? 'M3 9l9-7 9 7v11a2 2 0 01-2 2H5a2 2 0 01-2-2V9z' : 'M15 12a3 3 0 11-6 0 3 3 0 016 0z'" />
                                </svg>
                            </button>
                        </div>
                    </div>

                    <!-- Remember Me & Forgot Password -->
                    <div class="flex items-center justify-between">
                        <div class="flex items-center">
                            <input id="remember-me" name="remember-me" type="checkbox" v-model="rememberMe"
                                class="h-4 w-4 text-olive-dark focus:ring-olive-dark border-gray-300 rounded" />
                            <label for="remember-me" class="ml-2 block text-sm text-gray-900">
                                {{ $t('login.rememberMe') }}
                            </label>
                        </div>

                        <div class="text-sm">
                            <a href="#" class="font-medium text-olive-dark hover:text-olive-light transition-colors">
                                {{ $t('login.forgotPassword') }}
                            </a>
                        </div>
                    </div>

                    <!-- Add error message display -->
                    <div v-if="message" 
                        class="bg-red-50 border-l-4 border-red-400 p-4 rounded-md" 
                        :class="{ 'border-r-4 border-l-0': $i18n.locale === 'ar' }">
                        <div class="flex items-start" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                            <div class="flex-shrink-0">
                                <svg class="h-5 w-5 text-red-400" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor">
                                    <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                                </svg>
                            </div>
                            <div class="ml-3" :class="{ 'mr-3 ml-0': $i18n.locale === 'ar' }">
                                <p class="text-sm text-red-700">{{ message }}</p>
                            </div>
                        </div>
                    </div>

                    <!-- Update login button to show loading state -->
                    <div>
                        <button type="submit" :disabled="loading"
                            class="w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-600 hover:bg-olive-light focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-olive-dark transition-colors">
                            <span v-if="loading">{{ $t('login.processing') }}</span>
                            <span v-else>{{ $t('login.signIn') }}</span>
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
    name: 'Login',
    data() {
        return {
            Logo,
            email: '',
            password: '',
            rememberMe: false,
            showPassword: false,
            loading: false,
            message: ''
        }
    },
    methods: {
        togglePassword() {
            this.showPassword = !this.showPassword;
        },
        async handleLogin() {
            this.loading = true;
            this.message = '';

            try {
                const response = await this.$store.dispatch('auth/login', {
                    email: this.email,
                    password: this.password
                });

                await this.$store.dispatch('auth/refreshUser');

                const user = AuthService.getCurrentUser();
                if (user && user.user) {
                    if (AuthService.isAdmin()) {
                        this.$router.push('/admin/dashboard');
                    } else if (AuthService.isLandowner()) {
                        this.$router.push('/landowner');
                    } else if (AuthService.isInvestor()) {
                        this.$router.push('/investor');
                    } else {
                        this.$router.push('/profile');
                    }
                } else {
                    this.$router.push('/profile');
                }
            } catch (error) {
                this.loading = false;

                if (error.response) {
                    // Handle specific API error messages
                    const errorKey = error.response.data.errorKey || 'authenticationFailed';
                    this.message = this.$t(`login.errors.${errorKey}`);
                } else if (error.request) {
                    this.message = this.$t('login.errors.noResponse');
                } else {
                    this.message = this.$t('login.errors.error', { message: error.message });
                }
            } finally {
                this.loading = false;
            }
        }
    }
}
</script>