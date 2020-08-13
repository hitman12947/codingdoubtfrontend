<template>
  <div>
    <div class="container">
      <h2 class="text-center my-3">About Me</h2>
      <div class="row author-info">
        <div
          class="col-md-4 col-sm-12 offset-md-2 justify-content-center d-flex"
        >
          <img src="../assets/images/img.jpg" />
        </div>
        <div
          class="col-md-4 col-sm-12 d-flex flex-column justify-content-center"
        >
          <h4>Rahul Meena</h4>
          <p>FullStack and Android Developer</p>
        </div>
      </div>
      <div class="row mt-3">
        <div
          class="col-md-4 offset-md-2 d-flex justify-content-center align-items-center font-weight-bold"
        >
          Skills
        </div>
        <div class="col-md-4">
          <ul>
            <li>FullStack Web Development</li>
            <li>Android Development</li>
          </ul>
        </div>
      </div>
      <div class="row mt-3">
        <div
          class="col-md-4 offset-md-2 d-flex justify-content-center align-items-center font-weight-bold"
        >
          Technology
        </div>
        <div class="col-md-4">
          <ul>
            <li>FullStack Web Development</li>
            <li>Android Development</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>

<style scoped>
img {
  border-radius: 50%;
}

@media (max-width: 767.98px) {
  .author-info h4,
  p {
    text-align: center;
  }
}
</style>
