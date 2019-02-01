<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
        <h3 class="title has-text-grey">Login</h3>
        <p class="subtitle has-text-grey">Please login to proceed.</p>
          <form @submit.prevent="signin" method="post">
            <div class="field">
              <div class="control">
                <input class="input" type="email" placeholder="Email" autofocus="" v-model="form.email">
              </div>
            </div>
            <div class="field">
              <div class="control">
                <input class="input" type="password" placeholder="Password" v-model="form.password">
              </div>
            </div>
            <Notifications :notify="notify" :messages="messages" theme="danger" @click="deleteNotify" />
            <button class="button is-block is-info is-fullwidth">Login</button>
          </form>
        </div>
        <p class="has-text-grey">
          <nuxt-link to="signup">Signup</nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="signup">Forgot Password</nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="signup">Signup</nuxt-link>
        </p>
      </div>
    </div>
  </div>
</section>
</template>

<script>
import Notifications from '@/components/notification/Notification'
export default {
  components: {
    Notifications
  },
  data() {
    return {
      form: {
        email: '',
        password: ''
      },
      notify: false,
      messages: ''
    }
  },

  middleware: [
    'redirectIfAuthenticated'
  ],
  methods: {
    async signin() {
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
