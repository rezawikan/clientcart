<template>
  <form class="" action="#" @submit.prevent="store">
    <div class="field">
      <div id="card-element" class="">

      </div>
      <div class="field">
        <p class="control">
          <button type="submit" class="button is-info" :disabled="storing">
            Store Card
          </button>
          <a href="#" class="button is-text" @click.prevent="$emit('cancel')">
            Cancel
          </a>
        </p>
      </div>
    </div>
  </form>
</template>

<script>
export default {

  data () {
    return {
      stripe: null,
      card: null,
      storing: false
    }
  },

  methods: {
      async store() {

        this.storing = true

        const { token, error } =  await this.stripe.createToken(this.card)

        if (error) {

        } else {
            let response = await this.$axios.$post('payment-methods',{
              token: token.id
            })

            this.$emit('added', response.data)
        }

        this.storing = false
      }

  },

  mounted () {
    const stripe = Stripe('pk_test_b8SaSNtgVIkNqjaLM7syB7jy')

    this.stripe = stripe

    this.card = this.stripe.elements().create('card', {
      style: {
        base: {
          fontSize: '16px'
        }
      }
    })

    this.card.mount('#card-element')
  }
}
</script>
