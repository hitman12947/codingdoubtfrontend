<template>
  <div>
    <h3>My Answered Doubts: {{ myAnswered.count }}</h3>
    <SingleDoubt
      v-for="myDoubt in myAnswered.docs"
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
    myAnswered() {
      return this.$store.getters.getMyAnswered;
    },
  },
  created() {
    this.$store.dispatch("fetchMyAnswered");
  },
};
</script>
