<template>
  <div class="container">
    <h3 class="text-center my-3">Ask Doubt</h3>

    <div class="d-flex justify-content-center" v-if="isLoading">
      <div class="spinner-border text-danger" role="status">
        <span class="sr-only">Loading...</span>
      </div>
    </div>
    <form @submit="sendAskRequest">
      <div class="form-group">
        <textarea
          class="form-control"
          placeholder="Enter Question"
          rows="3"
          v-model="question"
        ></textarea>
      </div>
      <div class="form-group">
        <textarea
          v-model="code"
          class="form-control"
          placeholder="Enter Code"
          rows="6"
        ></textarea>
      </div>

      <div class="form-group">
        <label>Upload Error Image <small>(Only One Allowed)</small></label
        ><br />
        <button class="btn btn-info" @click="selectImage">Upload</button>
        <input
          type="file"
          style="display:none"
          ref="imageChooser"
          @change="choosedImage"
        />
      </div>

      <div class="form-row">
        <div class="form-group col-md-6">
          <img :src="choosenImage" height="100" />
        </div>
        <div class="form-group col-md-2">
          <select class="form-control" v-model="language">
            <option selected disabled value="">Choose language</option>
            <option value="none">None</option>
            <option value="javascript">JavaScript</option>
            <option value="javascript">JavaScript-JSX</option>
          </select>
        </div>
      </div>

      <div class="form-group">
        <button class="btn btn-success" :disabled="isLoading || !isFormValid">
          Submit
        </button>
      </div>
    </form>
  </div>
</template>

<script>
export default {
  data() {
    return {
      choosenImage: "",
      image: "",
      question: "",
      code: "",
      language: "",
    };
  },
  computed: {
    isLoading() {
      return this.$store.getters.isLoading;
    },
    isFormValid() {
      return (
        this.image !== null &&
        this.image !== "" &&
        this.question !== null &&
        this.question !== "" &&
        this.language !== null &&
        this.language !== ""
      );
    },
  },
  methods: {
    selectImage(e) {
      e.preventDefault();
      this.$refs.imageChooser.click();
    },
    choosedImage(e) {
      const file = e.target.files[0];
      let filename = file.name;
      if (filename.lastIndexOf(".") <= 0) {
        return alert("Choose a valid file");
      }
      const fileReader = new FileReader();
      fileReader.addEventListener("load", () => {
        this.choosenImage = fileReader.result;
      });
      fileReader.readAsDataURL(file);
      this.image = file;
    },

    sendAskRequest(e) {
      e.preventDefault();
      this.$store.dispatch("askDoubtRequest", {
        question: this.question,
        code: this.code,
        image: this.image,
        language: this.language,
      });
    },
  },
};
</script>
