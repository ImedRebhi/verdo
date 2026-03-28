<script>
import { mapActions } from 'vuex';

export default {
  name: 'RegisterView',
  data() {
    return {
      firstName: '',
      lastName: '',
      email: '',
      phoneNumber: '',
      password: '',
      confirmPassword: '',
      entityType: 'individual',
      loading: false,
      message: ''
    };
  },
  methods: {
    ...mapActions('auth', ['register']),
    async handleRegister() {
      this.loading = true;
      this.message = '';
      
      if (this.password !== this.confirmPassword) {
        this.message = 'Passwords do not match';
        this.loading = false;
        return;
      }
      
      try {
        await this.register({
          firstName: this.firstName,
          lastName: this.lastName,
          email: this.email,
          phoneNumber: this.phoneNumber,
          password: this.password,
          entityType: this.entityType
        });
        
        this.$router.push('/login');
        this.message = 'Registration successful! Please login.';
      } catch (error) {
        this.message = error.message || 'Failed to register. Please try again.';
      } finally {
        this.loading = false;
      }
    }
  }
};
</script> 