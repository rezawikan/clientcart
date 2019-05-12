<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
          <h3 class="title has-text-grey">Daftar</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
            <form @submit.prevent="signup" method="post">
              <div class="field">
                <div class="control">
                  <input class="input" type="text" placeholder="Nama Lengkap" autofocus="" v-model="form.name">
                  <FormError v-if="messages.name" :errors="messages.name"/>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Alamat Email" v-model="form.email">
                  <FormError v-if="messages.email" :errors="messages.email"/>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Password" v-model="form.password">
                  <FormError v-if="messages.password" :errors="messages.password"/>
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Konfirmasi Password" v-model="form.password_confirmation ">
                  <FormError v-if="messages.password_confirmation" :errors="messages.password_confirmation"/>
                </div>
              </div>
              <button class="button is-block is-info is-fullwidth">Daftar</button>
              <Notifications :notify="notify" :messages="messages" theme="danger" @click="deleteNotify" />
            </form>
          </div>
          <p class="has-text-grey">
            <nuxt-link to="signin">Masuk</nuxt-link> &nbsp;·&nbsp;
            <a href="../">Lupa Password</a> &nbsp;·&nbsp;
            <a href="../">Butuh bantuan?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
import FormError from '@/components/notification/FormError'
export default {

  components: {
    FormError
  },
  data() {
    return {
      form: {
        name: '',
        email: '',
        password: '',
        password_confirmation : ''
      },
      notify: false,
      messages: ''
    }
  },

  middleware: [
    'redirectIfAuthenticated'
  ],

  methods: {
    async signup() {
      await this.$axios.$post('auth/register',{
        ...this.form
      }).then((response) => {
        this.login()
      })
      .catch((data) => {
          this.messages = data.response.data.errors
          this.notify = true
        })
    },
    async login() {
      await this.$auth.loginWith('local', {
          data: this.form
        })
        .then((response) => {

          this.$store.dispatch('cart/getCart')

          if (this.$route.query.redirect) {
            this.$router.replace(this.$route.query.redirect)
            return
          }

          this.$router.replace({
            name: 'index'
          })
        })
        .catch((data) => {
          this.messages = data.response.data.errors.email[0]
          this.notify = true
        })
    },
    deleteNotify(data) {
      this.notify = data
    },
  }

}
</script>
