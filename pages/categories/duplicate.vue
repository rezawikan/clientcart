<template>
<div class="container">
  <div class="container is-fluid">
    <div class="columns is-multiline">
      <div class="column is-3" v-for="product in products" :key="product.slug">
        <Product :product="product"/>
      </div>
      <div class="column is-12">
        <Pagination :meta="meta"/>
      </div>
    </div>
  </div>
</div>
</template>

<script>
import { mapGetters, mapActions } from 'vuex'
// import queryString from 'query-string'
import Product from '@/components/products/Product'
import Pagination from '@/components/products/pagination/Pagination'
export default {
  transition: 'bounce',
  components: {
    Product,
    Pagination
  },
  watch: {
    '$route.query'(query){
      this.getProducts({ ...this.$route.params, ...query })
    }
  },
  watchQuery: ['page'],
  computed: {
    ...mapGetters({
      products: 'products/products',
      meta: 'products/meta'
    })
  },
  methods: {
    ...mapActions({
      getProducts: 'products/getProducts',
    })
  },
  created(){
    this.getProducts({ ...this.$route.params, ...this.$route.query })
  }
}
</script>
