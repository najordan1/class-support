<template>
  <main>
    <navbar class="mb-2" />
    <router-view class="container px-2 pb-5 pt-2" />
  </main>
</template>

<script>
import navbar from './components/Navbar.vue';

export default {
  name: 'App',
  components: {
    navbar,
  },
  created() {
    document.title="Class Support";
  },
}
</script>

<style>
#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  color: #2c3e50;
}
</style>
