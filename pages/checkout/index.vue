<template lang="html">

  <div class="section">
    <div class="container is-fluid">
      <div class="columns">
        <div class="column is-three-quarters">
          <ShippingAddress
          :addresses="addresses" v-model="form.address_id"
          />
          <article class="message" v-if="shippingMethodId">
            <div class="message-body">
              <h1 class="title is-5">Shipping</h1>
              <div class="control">
                  <div class="select is-fullwidth">
                    <select v-model="shippingMethodId">
                      <option :value="shippingMethod.id" v-for="shippingMethod in shippingMethods" :key="shippingMethod.id">
                        {{ shippingMethod.courier }} - {{ shippingMethod.type }} - {{ shippingMethod.price * weight }} - {{ shippingMethod.estimation }} - {{ shippingMethod.id }}
                      </option>
                    </select>
                  </div>
                </div>
            </div>
          </article>

          <PaymentMethods
          :paymentMethods="paymentMethods"
          v-model="form.payment_method_id"
          />


          <article class="message" v-if="products.length">
            <div class="message-body">
              <h1 class="title is-5">Cart Summary</h1>
              <CartOverview>
                <template slot="rows" v-if="shippingMethodId">
                  <tr>
                    <td colspan="3"></td>
                    <td class="has-text-weight-bold">Shipping</td>
                    <td>{{ shipping.price * weight }}</td>
                    <td></td>
                  </tr>
                  <tr>
                    <td colspan="3"></td>
                    <td class="has-text-weight-bold">Total</td>
                    <td>{{ total }}</td>
                    <td></td>
                  </tr>
                </template>
              </CartOverview>
            </div>
          </article>
        </div>
        <div class="column is-one-quarter">
          <article class="message">
            <div class="message-body">
              <button
              @click.prevent="order"
              :disabled="empty || submitting"
              type="button"
              class="button is-info is fullwidth is-medium"
              name="button">
              Place Order
            </button>
            </div>
          </article>
        </div>
      </div>
    </div>
  </div>

</template>

<script>
import { mapGetters, mapActions } from 'vuex'
import CartOverview from '@/components/cart/CartOverview.vue'
import ShippingAddress from '@/components/checkout/addresses/ShippingAddress.vue'
import PaymentMethods from '@/components/checkout/PaymentMethods/PaymentMethods.vue'

export default {
  data() {
      return {
        submitting:false,
        addresses: [],
        shippingMethods: [],
        paymentMethods:[],
        form: {
          address_id: null,
          payment_method_id: null
        }
      }
  },

  components : {
    CartOverview,
    ShippingAddress,
    PaymentMethods
  },

  watch: {
    'form.address_id'(addressId) {
      this.getShippingMethodsForAddress(addressId).then(() => {
        this.setShipping(this.shippingMethods[0])
      })
    },
    shippingMethodId() {
      this.getCart()
    }
  },

  computed: {
    ...mapGetters({
      total: 'cart/total',
      products: 'cart/products',
      empty : 'cart/empty',
      shipping: 'cart/shipping',
      weight: 'cart/weight'
    }),

    shippingMethodId: {
      get() {
        return this.shipping ? this.shipping.id : ''
      },
      set(shippingMethodId) {
        console.log(shippingMethodId)
        this.setShipping(
          this.shippingMethods.find(s => s.id == shippingMethodId)
        )
      }
    }
  },

  methods: {
    ...mapActions({
        setShipping: 'cart/setShipping',
        getCart: 'cart/getCart',
        flash: 'alert/flash'
    }),

    async order() {

      this.submitting = true

      try {
        await this.$axios.$post('orders', {
          ...this.form,
          shipping_method_id: this.shippingMethodId
        })

        await this.getCart()

        this.$router.replace({
          name: 'orders'
        })
      } catch (e) {
          this.flash(e.response.data.message)

          this.getCart()

          this.submitting = false
      }
    },

    async getShippingMethodsForAddress(addressId) {
      let response = await this.$axios.$get(`addresses/${addressId}/shipping`)
      this.shippingMethods = response.data

      return response
    }
  },

  async asyncData({ app }) {
    let addresses = await app.$axios.$get('addresses')
    let paymentMethods = await app.$axios.$get('payment-methods')
//
    return {
      addresses: addresses.data,
      paymentMethods: paymentMethods.data
    }
  }
}
</script>
