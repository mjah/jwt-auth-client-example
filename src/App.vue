<template>
  <div id="app" class="d-flex flex-column h-100">
    <Header />
    <main role="main" class="flex-shrink-0 text-light">
      <router-view></router-view>
    </main>
    <Footer />
  </div>
</template>

<style>
#app {
  background-color: rgb(14, 15, 16);
}
main {
  padding: 60px 15px 0px;
  margin-top: 30px;
  background-color: rgb(14, 15, 16);
}
.form-control {
  background-color: rgb(43, 45, 47);
  color: rgb(202, 198, 190);
  border-color: rgb(54, 63, 72);
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
