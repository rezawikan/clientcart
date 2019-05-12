<template>
<section class="hero is-fullheight">
  <div class="hero-body">
    <div class="container has-text-centered">
      <div class="column is-4 is-offset-4">
        <div class="box">
          <h3 class="title has-text-grey">Masuk</h3>
          <p class="subtitle has-text-grey">Silakan masuk ke dalam akun kamu</p>
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
            <button class="button is-block is-info is-fullwidth">Masuk</button>
          </form>
        </div>
        <div class="is-divider" data-content="ATAU"></div>

        <a @click="$auth.loginWith('google')" class="button is-success is-fullwidth">
          <span class="icon is-small">
            <i class="fab fa-facebook"></i>
          </span>
          <span>Masuk dengan Facebook</span>
        </a>
        &nbsp;
        <a  @click="$auth.loginWith('google')" class="button is-success is-fullwidth">
          <span class="icon is-small">
            <i class="fab fa-google"></i>
          </span>
          <span>Masuk dengan Google</span>
        </a>
        <p class="has-text-grey">
          Belum punya akun?
          <nuxt-link to="daftar">Daftar</nuxt-link> &nbsp;·&nbsp;
          <nuxt-link to="masuk">Forgot Password</nuxt-link>
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
