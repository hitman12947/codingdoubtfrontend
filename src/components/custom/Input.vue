<template>
  <div class="form-group">
    <input
      :name="name"
      :type="type"
      :placeholder="placeholder"
      @change="handleInput"
      v-model="inputValue"
      class="form-control"
    />
  </div>
</template>

<script>
export default {
  props: ["name", "type", "placeholder"],
  methods: {
    handleInput() {
      this.$emit("handleInputChange", {
        name: this.name,
        value: this.inputValue,
      });
    },
  },
  data() {
    return {
      inputValue: "",
    };
  },
};
</script>
