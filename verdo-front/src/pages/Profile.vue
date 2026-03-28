<template>
  <div class="min-h-screen bg-gray-100 py-12">
    <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
      <div class="bg-white shadow rounded-lg p-6">
        <h1 class="text-2xl font-bold text-gray-900 mb-6" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.title') }}</h1>
        
        <div v-if="currentUser" class="space-y-6">
          <!-- User Information -->
          <div class="bg-gray-50 p-6 rounded-lg shadow">
            <h2 class="text-xl font-medium text-gray-900 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.personalInfo.title') }}</h2>
            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.firstName') }}</p>
                <p class="text-lg font-medium">{{ currentUser.user.firstName }}</p>
              </div>
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.lastName') }}</p>
                <p class="text-lg font-medium">{{ currentUser.user.lastName }}</p>
              </div>
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.email') }}</p>
                <p class="text-lg font-medium">{{ currentUser.user.email }}</p>
              </div>
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.phone') }}</p>
                <p class="text-lg font-medium">{{ currentUser.user.phoneNumber }}</p>
              </div>
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.accountType') }}</p>
                <p class="text-lg font-medium capitalize">{{ currentUser.user.entityType }}</p>
              </div>
              <div :class="{ 'text-right': $i18n.locale === 'ar' }">
                <p class="text-sm text-gray-500">{{ $t('profile.personalInfo.roles') }}</p>
                <div class="flex flex-wrap gap-2 mt-1" :class="{ 'justify-end': $i18n.locale === 'ar' }">
                  <span v-for="(role, index) in currentUser.user.roles" :key="index" 
                        class="px-2 py-1 text-xs font-medium rounded-full bg-green-100 text-green-800 capitalize">
                    {{ role }}
                  </span>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Role-specific sections -->
          <div v-if="isAdmin" class="bg-blue-50 p-6 rounded-lg shadow">
            <h2 class="text-xl font-medium text-gray-900 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.adminTools.title') }}</h2>
            <p class="text-gray-700 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.adminTools.description') }}</p>
            <router-link to="/admin/dashboard" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500">
              {{ $t('profile.adminTools.dashboardButton') }}
            </router-link>
          </div>
          
          <div v-if="isInvestor" class="bg-green-50 p-6 rounded-lg shadow">
            <h2 class="text-xl font-medium text-green-900 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.investorTools.title') }}</h2>
            <div class="flex flex-wrap gap-4" :class="{ 'justify-end': $i18n.locale === 'ar' }">
              <router-link to="/investor" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                {{ $t('profile.investorTools.dashboardButton') }}
              </router-link>
              <router-link to="/opportunities" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-green-600 hover:bg-green-700">
                {{ $t('profile.investorTools.opportunitiesButton') }}
              </router-link>
            </div>
          </div>
          
          <div v-if="isLandowner" class="bg-yellow-50 p-6 rounded-lg shadow">
            <h2 class="text-xl font-medium text-yellow-900 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.landownerTools.title') }}</h2>
            <div class="flex flex-wrap gap-4" :class="{ 'justify-end': $i18n.locale === 'ar' }">
              <router-link to="/landowner" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700">
                {{ $t('profile.landownerTools.dashboardButton') }}
              </router-link>
              <router-link to="/landowner/properties" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-yellow-600 hover:bg-yellow-700">
                {{ $t('profile.landownerTools.propertiesButton') }}
              </router-link>
            </div>
          </div>
          
          <!-- Account Settings -->
          <div class="bg-gray-50 p-6 rounded-lg shadow">
            <h2 class="text-xl font-medium text-gray-900 mb-4" :class="{ 'text-right': $i18n.locale === 'ar' }">{{ $t('profile.accountSettings.title') }}</h2>
            <div class="flex flex-wrap gap-4" :class="{ 'justify-end': $i18n.locale === 'ar' }">
              <button class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                {{ $t('profile.accountSettings.editProfile') }}
              </button>
              <button class="inline-flex items-center px-4 py-2 border border-gray-300 text-sm font-medium rounded-md shadow-sm text-gray-700 bg-white hover:bg-gray-50">
                {{ $t('profile.accountSettings.changePassword') }}
              </button>
              <button @click="handleLogout" class="inline-flex items-center px-4 py-2 border border-transparent text-sm font-medium rounded-md shadow-sm text-white bg-red-600 hover:bg-red-700">
                {{ $t('profile.accountSettings.logout') }}
              </button>
            </div>
          </div>
        </div>
        
        <div v-else class="text-center py-12">
          <p class="text-gray-500">{{ $t('profile.loading') }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import AuthService from '../services/AuthService';

export default {
  name: 'Profile',
  computed: {
    ...mapState({
      storeUser: state => state.auth.user
    }),
    currentUser() {
      return this.storeUser || AuthService.getCurrentUser();
    },
    isAdmin() {
      return AuthService.isAdmin();
    },
    isLandowner() {
      return AuthService.isLandowner();
    },
    isInvestor() {
      return AuthService.isInvestor();
    }
  },
  methods: {
    handleLogout() {
      this.$store.dispatch('auth/logout');
      this.$router.push('/login');
    }
  }
}
</script> 
