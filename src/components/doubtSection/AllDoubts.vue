<template>
  <div>
    <SingleDoubt
      v-for="doubt in allDoubts"
      :key="doubt._id"
      :singleDoubt="doubt"
    />
  </div>
</template>

<script>
import SingleDoubt from "./SingleDoubt";

export default {
  components: { SingleDoubt },
  computed: {
    allDoubts() {
      return this.$store.getters.getAllDoubts;
    },
  },
};
</script>

<style></style>
