<template>
  <div>
    <Nav />
    <router-view />
  </div>
</template>

<script>
import Nav from "./Nav";
export default {
  components: {
    Nav,
  },
};
</script>
