<template lang="html">
  <article class="message">
    <div class="message-body">
      <h1 class="title is-5">Payment Mehtod</h1>

      <template v-if="selecting">
        <PaymentMethodsSelector
        :payment-methods="paymentMethods"
        :selected-payment-method="selectedPaymentMethod"
        @click="paymentMethodSelected"
        />

      </template>

      <template v-else-if="creating">
        <PaymentMethodCreator
        @cancel="creating"
        @added="created"
        />
      </template>

      <template v-else>
        <template v-if="selectedPaymentMethod">
          <p>
            {{ selectedPaymentMethod.card_type }}<br>
            {{ selectedPaymentMethod.last_four }}<br>
          </p>
          <br/>

        </template>


        <div class="field is-grouped">
          <p class="control" v-if="paymentMethods.length">
            <a href="#" class="button is-info" @click.prevent="selecting = true">Change payment method</a>
          </p>
          <p class="control">
            <a href="#" class="button is-info" @click.prevent="creating = true">Add a payment methods</a>
          </p>
        </div>
      </template>


    </div>
  </article>
</template>

<script>
import PaymentMethodsSelector from './PaymentMethodsSelector'
import PaymentMethodCreator from './PaymentMethodCreator'

export default {

  data() {
    return {
      selecting: false,
      creating: false,
      localPaymentMethods: this.paymentMethods,
      selectedPaymentMethod: null,

    }
  },
  components: {
    PaymentMethodsSelector,
    PaymentMethodCreator
  },
  props: {
    paymentMethods : {
      required: true,
      type: Array
    }
  },
  computed: {
    defaultPaymentMethod() {
      return this.localPaymentMethods.find( a =>  a.default === true)
    }
  },
  watch: {
    selectedPaymentMethod(paymentMethod) {
      this.$emit('input', paymentMethod.id)
    }
  },
  methods: {
    paymentMethodSelected(paymentMethod){
      console.log(paymentMethod);
      this.switchPaymentMethod(paymentMethod)
      this.selecting = false
    },
    switchPaymentMethod(paymentMethod){
      this.selectedPaymentMethod = paymentMethod
    },
    created(paymentMethod){
      this.localPaymentMethods.push(paymentMethod)
      this.creating = false

      this.switchPaymentMethod(paymentMethod)
    }
  },

  created() {
    if (this.paymentMethods.length) {
      this.switchPaymentMethod(this.defaultPaymentMethod)
    }
  }
}
</script>
