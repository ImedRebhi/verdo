<script setup>
import Header from "./layout/Header.vue";
import AuthService from './services/AuthService';
</script>

<template>
  <router-view />
</template>

<script>
import i18n from './i18n';

export default {
  created() {
    // Check authentication status when app loads
    if (AuthService.isAuthenticated()) {
      console.log('User is authenticated');
      // You could dispatch an action to update the auth state if using Vuex
    }

    const currentLocale = localStorage.getItem('language');
    if (currentLocale) {
      i18n.locale = currentLocale;
    }
  }
}
</script>
