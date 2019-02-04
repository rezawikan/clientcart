<template>
  <div class="">
    <section class="hero is-primary">
      <div class="hero-body">
        <p class="title is-capitalized">{{ slug }}</p>
        <p class="subtitle">Everything you need to <strong>create a website</strong> with Bulma</p>
      </div>
    </section>
    <section class="hero">
      <div class="hero-body">
        <div class="container is-fluid">
          <div class="columns is-mobile is-multiline">
            <div class="column is-one-fifth-desktop is-one-third-tablet is-half-mobile" v-for="product in products" :key="product.slug">
              <Product :product="product"/>
            </div>
            <div class="column is-12">
              <Pagination :meta="meta"/>
            </div>
          </div>
        </div>
      </div>
  </section>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import queryString from 'query-string'
import Product from '@/components/products/Product'
import Pagination from '@/components/products/pagination/Pagination'
export default {
  transition: 'bounce',
  components: {
    Product,
    Pagination
  },
  watchQuery: ['page'],

  mounted () {
    this.$nextTick(() => {
      this.$nuxt.$loading.start()

      setTimeout(() => this.$nuxt.$loading.finish(), 500)
    })
  },

  computed: {
    slug () {
      return  this.$route.params.slug.replace(/[^a-zA-Z ]/g, " ")
    }
  },

  async asyncData({params, app, query}) {
    return await app.$axios.$get(`products?${queryString.stringify({...params, ...query})}`)
    .then( response => {
      return {
        products: response.data,
          meta: response.meta
      }
    })
  }
}
</script>
