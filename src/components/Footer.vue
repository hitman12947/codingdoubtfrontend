<template>
  <footer class="footer py-2 text-light">
    <div class="container">
      <p class="small text-center">Follow on Social Media</p>
      <div class="row">
        <div class="col-md-6 offset-md-3 d-flex justify-content-between">
          <div class="socialPlatform">
            <a
              href="https://www.facebook.com/Coding-Doubts-112480647150955"
              target="_blank"
            >
              <i class="fa fa-facebook"></i>
            </a>
          </div>
          <div class="socialPlatform">
            <a
              href="https://www.instagram.com/hitman_silentassassin/"
              target="_blank"
            >
              <i class="fa fa-instagram"></i>
            </a>
          </div>
          <div class="socialPlatform">
            <a
              target="_blank"
              href="https://www.linkedin.com/in/rahul-singh-03a566124"
            >
              <i class="fa fa-linkedin"></i>
            </a>
          </div>
        </div>
      </div>
    </div>
  </footer>
</template>

<style scoped>
footer {
  background-color: #e65100;
  width: 100%;
  bottom: 0;
}
.socialPlatform {
  cursor: pointer;
}
a {
  color: #fff;
}
a:hover {
  color: #192a56;
}

@media (min-width: 768px) {
  footer {
    position: absolute;
  }
}
</style>
