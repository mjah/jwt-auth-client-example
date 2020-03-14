<template>
  <div id="app" class="d-flex flex-column h-100">
    <Header />
    <main role="main" class="flex-shrink-0">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
main {
  padding: 60px 15px 0;
}
</style>

<script>
import Header from '@/components/Header';
import Footer from '@/components/Footer';

export default {
  name: 'app',
  components: {
    Header,
    Footer
  }
};
</script>
