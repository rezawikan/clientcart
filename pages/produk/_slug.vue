<template>
<div class="section">
  <div class="columns">
    <div class="column is-half">
      <img src="https://via.placeholder.com/650x650" alt="Product Name">
    </div>
    <div class="column is-half">
      <section class="section">
        <h1 class="title is-4">{{ product.name }}</h1>
        <p v-if="product.description">{{ product.description }}</p>
        <hr>
        <span class="tag is-rounded is-dark" v-if="!product.in_stock">Out of Stock</span>
        <span class="tag is-rounded is-medium" v-if="product.in_stock">{{ min }}</span>
        <span v-if="!variations"> - </span>
        <span v-if="!variations" class="tag is-rounded is-medium">{{ max }} </span>
      </section>
      <section class="section">
        <form action="" @submit.prevent="add">
          <ProductVariation :variations="product.variations" v-model="form.variation" />
          <div class="field has-addons" v-if="form.variation.stock_count > 0">
            <div class="control">
              <div class="select is-fullwidth">
                <select class="" name="" v-model="form.quantity">
                  <option :value="x" v-for="x in parseInt(form.variation.stock_count)" :key="x"> {{ x }}</option>
                </select>
              </div>
            </div>
            <div class="control">
              <button type="submit" name="button" class="button is-info">Add cart</button>
            </div>
          </div>
        </form>
      </section>
    </div>
  </div>
</div>
</template>

<script>
import { mapActions } from 'vuex'
import { converter } from '@/plugins/helper/converter'
import ProductVariation from '@/components/products/ProductVariation'

export default {
  data() {
    return {
      product: null,
      form: {
        variation: '',
        quantity: 1
      }
    }
  },

  components: {
    ProductVariation
  },

  watch: {
    'form.variation'() {
      this.form.quantity = 1
    }
  },

  computed: {
    min() {
      return converter(this.findObject(this.product.variations, 'min'))
    },
    max() {
      return converter(this.findObject(this.product.variations, 'max'))
    },
    variations() {
      return this.min == this.max
    },
    // test () {
    //   return this.$auth.hasScope('scope')
    // }
  },

  methods: {
    ...mapActions({
      store: 'cart/store'
    }),

    findObject(array, value) {
      if (array.length < 1) {
          return this.product.price
      }
      let find;
      for (var key in array) {
        find = Object.assign({}, find, array[key].map(v => v.price))
      }

      if (value == 'min') {
          return Math.min.apply(null,Object.values(find))
      }

      return Math.max.apply(null,Object.values(find))

    },

    add() {
      this.store([{
        id: this.form.variation.id,
        quantity: this.form.quantity
      }])

      this.form = {
        variation: '',
        quantity: 1
      }


    }
  },

  async asyncData({params, app}) {
    let response = await app.$axios.$get(`products/${params.slug}`)

    return {
      product: response.data
    }
  }
}
</script>
