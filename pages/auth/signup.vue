<template>
  <section class="hero is-fullheight">
    <div class="hero-body">
      <div class="container has-text-centered">
        <div class="column is-4 is-offset-4">
          <div class="box">
          <h3 class="title has-text-grey">Signup</h3>
          <p class="subtitle has-text-grey">Please login to proceed.</p>
            <form >
              <div class="field">
                <div class="control">
                  <input class="input" type="email" placeholder="Email" autofocus="">
                </div>
              </div>
              <div class="field">
                <div class="control">
                  <input class="input" type="password" placeholder="Password">
                </div>
              </div>
              <button class="button is-block is-info is-fullwidth">Login</button>
            </form>
          </div>
          <p class="has-text-grey">
            <nuxt-link to="signin">Sign In</nuxt-link> &nbsp;·&nbsp;
            <a href="../">Forgot Password</a> &nbsp;·&nbsp;
            <a href="../">Need Help?</a>
          </p>
        </div>
      </div>
    </div>
  </section>
</template>

<script>
export default {

}
</script>
