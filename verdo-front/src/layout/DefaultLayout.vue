<template>
  <div class="theme-shell min-h-screen flex flex-col">
    <Header />
    
    <main class="flex-1">
      <router-view />
    </main>
    
    <Footer />
  </div>
</template>

<script>
import Header from './Header.vue';
import Footer from './Footer.vue';

export default {
  name: 'DefaultLayout',
  components: {
    Header,
    Footer
  }
}
</script> 
