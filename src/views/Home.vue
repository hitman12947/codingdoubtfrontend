<template>
  <div class="container">
    <h3 class="my-3">Latest Feeds</h3>

    <AllDoubts />

    <span class="askIcon mt-auto">
      <router-link to="/askdoubt">
        <button
          class="btn rounded-pill"
          :style="{ 'background-color': askIconColor }"
          style="color:#fff"
        >
          Ask Doubt
        </button>
        <!-- <i class="fa fa-plus" :style="{ color: askIconColor }"></i> -->
      </router-link>
    </span>
  </div>
</template>

<script>
import Color from "../constants/colors";
import AllDoubts from "../components/doubtSection/AllDoubts";

export default {
  components: { AllDoubts },
  data() {
    return {
      askIconColor: Color.primary,
    };
  },
  created() {
    this.$store.dispatch("fetchDoubts");
  },
};
</script>

<style scoped>
.container {
  max-width: 700px;
}
.askIcon {
  position: fixed;
  bottom: 20px;
  right: 10px;
  /* font-size: 40px; */
  cursor: pointer;
}

@media (min-width: 768px) {
  .askIcon {
    margin-right: 40px;
    margin-bottom: 40px;
    font-size: 60px;
  }
}
</style>
