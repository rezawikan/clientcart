<template lang="html">
  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-12">
          <h1 class="title is-4">Products</h1>

          <article class="message" v-if="products.length">
            <div class="message-body">
              <table class="table is-hoverable is-fullwidth">
                <thead>
                  <tr>
                    <th>ID</th>
                    <th>Name</th>
                    <th>Price</th>
                    <th>Stocks</th>
                    <th>Status</th>
                    <th>Action</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="product in products" :key="product.id">
                    <td>{{product.id}}</td>
                    <td>{{product.name}}</td>
                    <td>{{product.price}} - {{product.price_varies}}</td>
                    <td>{{product.stock_count}}</td>
                    <td v-if="product.in_stock">Available</td>
                    <td v-else>Not Available</td>
                    <td>
                      <nuxt-link :to="{name: 'dashboard-products-edit-id', params: { id :product.id }}"
                      class="button is-info is-medium">
                        Edit
                      </nuxt-link>

                      <button @submit.prevent="remove" class="button is-info is-medium">
                        Delete
                      </button>
                    </td>
                  </tr>
                </tbody>
              </table>
            </div>
          </article>
          <p v-else>You have no orders</p>
        </div>
      </div>
      <div class="columns">
      <Pagination :meta="meta"/>
      </div>
    </div>
  </div>
</template>

<script>
import queryString from 'query-string'
import Pagination from '@/components/products/pagination/Pagination'
export default {
  watchQuery: ['page'],
  transition: 'bounce',
  components: {
    Pagination
  },

  methods: {
    remove(){

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
