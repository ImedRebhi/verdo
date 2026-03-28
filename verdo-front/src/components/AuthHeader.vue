<template>
  <div class="flex items-center space-x-4">
    <template v-if="currentUser">
      <span class="text-sm font-medium">{{ currentUser.user.firstName }} {{ currentUser.user.lastName }}</span>
      <button @click="handleLogout" class="text-sm text-red-600 hover:text-red-800">
        Logout
      </button>
    </template>
    <template v-else>
      <router-link to="/login" class="text-sm font-medium text-olive-dark hover:text-olive-medium">
        Login
      </router-link>
      <router-link to="/register" class="text-sm font-medium text-olive-dark hover:text-olive-medium">
        Register
      </router-link>
    </template>
  </div>
</template>

<script>
import { mapState, mapActions } from 'vuex';

export default {
  name: 'AuthHeader',
  computed: {
    ...mapState('auth', {
      currentUser: state => state.user
    })
  },
  methods: {
    ...mapActions('auth', ['logout']),
    handleLogout() {
      this.logout();
      this.$router.push('/login');
    }
  }
};
</script> 