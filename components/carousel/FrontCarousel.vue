<template lang="html">
  <div class='carousel carousel-animated carousel-animate-slide' id="bulmaCarousel">
  <div class='carousel-container'>
    <div class='carousel-item has-background is-active'>
      <img class="is-background" src="https://wikiki.github.io/images/merry-christmas.jpg" alt="" width="400" height="310" />
    </div>
    <div class='carousel-item has-background'>
      <img class="is-background" src="https://wikiki.github.io/images/singer.jpg" alt="" width="400" height="310" />
    </div>
    <div class='carousel-item has-background'>
      <img class="is-background" src="https://wikiki.github.io/images/sushi.jpg" alt="" width="400" height="310" />
    </div>
    <div class='carousel-item has-background'>
      <img class="is-background" src="https://wikiki.github.io/images/life.jpg" alt="" width="400" height="310" />
    </div>
  </div>
  <div class="carousel-navigation is-overlay">
    <div class="carousel-nav-left">
      <i class="fa fa-chevron-left" aria-hidden="true"></i>
    </div>
    <div class="carousel-nav-right">
      <i class="fa fa-chevron-right" aria-hidden="true"></i>
    </div>
  </div>
</div>
</template>

<script>
import bulmaCarousel from "@/node_modules/bulma-extensions/bulma-carousel/dist/js/bulma-carousel.min.js";
export default {
  mounted: function() {
    new bulmaCarousel(document.getElementById("bulmaCarousel"));
  }
}
</script>

<style lang="scss" scoped>

.carousel .carousel-container .carousel-item.has-background .is-background {
  height: 300px;
}

</style>
