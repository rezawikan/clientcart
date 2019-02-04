<template>
<div>
  <Navigation/>
  <nuxt/>
</div>
</template>

<script>
import Navigation from '@/layouts/partials/Navigation'
import FrontCarousel from '@/components/carousel/FrontCarousel'


export default {
  components: {
    Navigation
  },
  
}
</script>

<style lang="css">
body {
  padding: 52px 0 0 0;
}
</style>
