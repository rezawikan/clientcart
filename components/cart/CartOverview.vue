<template>
  <table class="table is-hoverable is-fullwidth">
    <tbody>
      <CartOverviewProduct
      v-for="product in products"
      :key="product.id"
      :product="product"
      />
      <tr>
        <td colspan="3"></td>
        <td>
          <p class="has-text-weight-bold">SubTotal</p>
        </td>
        <td colspan="2">{{ subtotal }}</td>
      </tr>
      <slot name="rows"/>
    </tbody>
  </table>
</template>

<script>
import { mapGetters } from 'vuex'

import CartOverviewProduct from '@/components/cart/CartOverviewProduct'

export default {
  components: {
    CartOverviewProduct
  },
  data() {
    return {
      created: null
    }
  },
  computed: {
    ...mapGetters({
      products: 'cart/products',
      subtotal: 'cart/subtotal'
    })
  }
}
</script>
