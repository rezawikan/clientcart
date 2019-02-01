<template>
<div class="card">
  <div class="card-image">
    <figure class="image is-4by3">
      <nuxt-link :to="link" class="title is-5">
        <img src="https://via.placeholder.com/650x650" alt="">
      </nuxt-link>
    </figure>
  </div>
  <div class="card-content">
    <div class="media">
      <div class="media-content">
        <nuxt-link :to="link" class="title is-5">{{ product.name }}</nuxt-link>
      </div>
    </div>
    <div class="content">
      <p v-if="product.description">
        {{ product.description }}
      </p>
      <span class="tag is-rounded is-medium">{{ price }}</span>
    </div>
  </div>
</div>
</template>

<script>
import { converter } from '@/plugins/helper/converter'
export default {
  transition: 'bounce',
  props: {
    product: {
      required: true,
      type: Object
    }
  },
  computed: {
    link() {
      return {
        name: 'products-slug',
        params: {
          slug: this.product.slug,
        }
      }
    },
    price () {
      return converter(this.product.price)
    }
  }
}
</script>
