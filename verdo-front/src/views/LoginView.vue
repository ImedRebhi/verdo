<script>
import { mapActions } from 'vuex';

export default {
  name: 'LoginView',
  data() {
    return {
      email: '',
      password: '',
      loading: false,
      message: ''
    };
  },
  methods: {
    ...mapActions('auth', ['login']),
    async handleLogin() {
      this.loading = true;
      this.message = '';
      
      try {
        await this.login({
          email: this.email,
          password: this.password
        });
        this.$router.push('/dashboard');
      } catch (error) {
        this.message = error.message || 'Failed to login. Please check your credentials.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script> 