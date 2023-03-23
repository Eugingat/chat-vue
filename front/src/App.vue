<template>
  <header>
    <router-link to="/" class="logout" v-if="isMain"> Sign out</router-link>
  </header>
  <router-view></router-view>
  <footer></footer>
</template>

<script>

export default {
  name: 'App',
  components: {},
  data() {
    return {}
  },
  computed: {
    isMain() {
      return this.$route.path !== '/';
    }
  }
}
</script>

<style>
body {
  margin: 0;
}

header,
footer {
  height: 50px;
  background-color: black;
}

header {
  display: flex;
  flex-direction: row-reverse;
  align-items: center;
  padding: 0 25px;
}

footer {
  position: fixed;
  width: 100%;
  bottom: 0;
}

.logout {
  text-decoration: none;
  color: white;
  font-size: 24px;
}

</style>
