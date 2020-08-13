<template>
  <div>
    <h3>My Doubts: {{ myDoubts.count }}</h3>
    <SingleDoubt
      v-for="myDoubt in myDoubts.docs"
      :key="myDoubt._id"
      :singleDoubt="myDoubt"
    />
  </div>
</template>

<script>
import SingleDoubt from "./SingleDoubt";
export default {
  components: { SingleDoubt },
  computed: {
    myDoubts() {
      return this.$store.getters.getMyDoubts;
    },
  },
  created() {
    this.$store.dispatch("fetchMyDoubts");
  },
};
</script>
