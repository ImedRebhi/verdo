<template>
  <div class="relative">
    <div v-if="currentUser && currentUser.user" class="flex items-center">
      <button @click="toggleMenu"
        class="theme-text flex items-center space-x-2 transition-colors duration-300 hover:theme-accent">
        <span class="font-medium">{{ currentUser.user.firstName || 'User' }}</span>
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd"
            d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z"
            clip-rule="evenodd" />
        </svg>
      </button>

      <!-- Dropdown Menu -->
      <div v-if="isMenuOpen" class="theme-surface-strong theme-border absolute right-0 top-full z-10 mt-2 w-48 rounded-md border py-1">
        <router-link to="/profile" class="theme-text theme-hover block px-4 py-2 text-sm">{{ t('header.profile') }}</router-link>

        <!-- Admin-specific links -->
        <template v-if="isAdmin">
          <router-link to="/admin/dashboard" class="theme-text theme-hover block px-4 py-2 text-sm">{{ t('header.adminPanel') }}</router-link>
        </template>

        <!-- Other role-specific links -->
        <template v-if="isLandowner">
          <router-link to="/landowner" class="theme-text theme-hover block px-4 py-2 text-sm">{{ t('header.landownerDashboard') }}</router-link>
        </template>

        <template v-if="isInvestor">
          <router-link to="/investor" class="theme-text theme-hover block px-4 py-2 text-sm">{{ t('header.investorDashboard') }}</router-link>
        </template>

        <button @click="handleLogout" class="theme-hover block w-full px-4 py-2 text-left text-sm text-red-600">
          {{ t('header.logout') }}
        </button>
      </div>
    </div>

    <div v-else>
      <a href="/login"
        class="theme-accent-bg inline-flex items-center gap-2 rounded-full px-6 py-2 font-medium text-white transition-all duration-300 transform hover:scale-105">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 9a3 3 0 100-6 3 3 0 000 6zm-7 9a7 7 0 1114 0H3z" clip-rule="evenodd" />
        </svg>
        <span>{{ t('header.login') }}</span>
      </a>
    </div>
  </div>
</template>

<script>
import AuthService from '../services/AuthService';
import { mapState } from 'vuex';
import { useI18n } from 'vue-i18n';

export default {
  name: 'UserMenu',
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      isMenuOpen: false
    };
  },
  computed: {
    ...mapState({
      storeUser: state => state.auth.user
    }),
    currentUser() {
      const user = this.storeUser || AuthService.getCurrentUser();
      if (!user || !user.user) {
        return null;
      }
      return user;
    },
    hasAdminRole() {
      if (!this.currentUser || !this.currentUser.user || !this.currentUser.user.roles) {
        return false;
      }
      return this.currentUser.user.roles.includes('admin');
    },
    isAdmin() {
      return AuthService.isAdmin();
    },
    isLandowner() {
      return AuthService.isLandowner();
    },
    isInvestor() {
      return AuthService.isInvestor();
    },
    userRoles() {
      return AuthService.getUserRoles();
    }
  },
  created() {
    // Listen for auth changes
    window.addEventListener('storage', this.checkAuth);
    // Close menu when clicking outside
    document.addEventListener('click', this.handleClickOutside);
    // Refresh user data from store
    this.$store.dispatch('auth/refreshUser');
  },
  beforeUnmount() {
    window.removeEventListener('storage', this.checkAuth);
    document.removeEventListener('click', this.handleClickOutside);
  },
  methods: {
    checkAuth() {
      this.$store.dispatch('auth/refreshUser');
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    handleLogout() {
      this.$store.dispatch('auth/logout');
      this.isMenuOpen = false;
      this.$router.push('/login');
    },
    closeMenu() {
      this.isMenuOpen = false;
    },
    handleClickOutside(event) {
      const menu = this.$el;
      if (menu && !menu.contains(event.target)) {
        this.isMenuOpen = false;
      }
    }
  }
};
</script>
