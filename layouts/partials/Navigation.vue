<template lang="html">
  <div>
    <nav class="navbar ">
      <div class="navbar-brand">
        <a class="navbar-item" href="http://bulma.io">
          <img src="http://bulma.io/images/bulma-logo.png" alt="Bulma: a modern CSS framework based on Flexbox" width="112" height="28">
        </a>

        <a class="navbar-item is-hidden-desktop" href="https://github.com/jgthms/bulma" target="_blank">
          <span class="icon" style="color: #333;">
            <i class="fa fa-github"></i>
          </span>
        </a>

        <a class="navbar-item is-hidden-desktop" href="https://twitter.com/jgthms" target="_blank">
          <span class="icon" style="color: #55acee;">
            <i class="fab fa-twitter"></i>
          </span>
        </a>

        <div class="navbar-burger burger" data-target="navMenubd-example">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div id="navMenubd-example" class="navbar-menu">

        <div class="navbar-start">
          <div class="navbar-item has-dropdown is-hoverable">
            <a class="navbar-link  is-active" href="/documentation/overview/start/">
              Docs
            </a>
            <div class="navbar-dropdown ">
              <a class="navbar-item " href="/documentation/overview/start/">
                Overview
              </a>
              <a class="navbar-item " href="http://bulma.io/documentation/modifiers/syntax/">
                Modifiers
              </a>
              <a class="navbar-item " href="http://bulma.io/documentation/columns/basics/">
                Columns
              </a>
              <a class="navbar-item " href="http://bulma.io/documentation/layout/container/">
                Layout
              </a>
              <a class="navbar-item " href="http://bulma.io/documentation/form/general/">
                Form
              </a>
              <a class="navbar-item " href="http://bulma.io/documentation/elements/box/">
                Elements
              </a>

              <a class="navbar-item is-active" href="http://bulma.io/documentation/components/breadcrumb/">
                Components
              </a>

              <hr class="navbar-divider">
              <div class="navbar-item">
                <div>
                  <p class="is-size-6-desktop">
                    <strong class="has-text-info">0.5.1</strong>
                  </p>

                  <small>
                    <a class="bd-view-all-versions" href="/versions">View all versions</a>
                  </small>

                </div>
              </div>
            </div>
          </div>
          <template v-for="category in categories">
            <template v-if="category.children.length">
              <div class="navbar-item has-dropdown is-hoverable is-mega" :key="category.slug">
                <div class="navbar-link">
                  <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }">
                  {{ category.name }}
                  </nuxt-link>
                </div>
                <div id="blogDropdown" class="navbar-dropdown " data-style="width: 18rem;">
                  <div class="container is-fluid">
                    <div class="columns">
                      <div class="column" v-for="child in category.children" :key="child.slug">
                        <h1 class="title is-6 is-mega-menu-title">
                          <nuxt-link :to="{ name: 'categories-slug', params: { slug: child.slug } }">
                          {{ child.name }}
                          </nuxt-link>
                        </h1>
                        <nuxt-link :to="{ name: 'categories-slug', params: { slug: last.slug } }" class="navbar-item" v-for="last in child.children" :key="last.slug">
                          {{ last.name }}
                        </nuxt-link>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </template>
            <template v-else>
              <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }" class="navbar-item" :key="category.slug">
              {{ category.name }}
              </nuxt-link>
            </template>
          </template>

          <div class="navbar-item has-dropdown is-hoverable">
            <div class="navbar-link">
              More
            </div>
            <div id="moreDropdown" class="navbar-dropdown ">
              <a class="navbar-item " href="http://bulma.io/extensions/">
                <div class="level is-mobile">
                  <div class="level-left">
                    <div class="level-item">
                      <p>
                        <strong>Extensions</strong>
                        <br>
                        <small>Side projects to enhance Bulma</small>
                      </p>
                    </div>
                  </div>
                  <div class="level-right">
                    <div class="level-item">
                      <span class="icon has-text-info">
                        <i class="fa fa-plug"></i>
                      </span>
                    </div>
                  </div>
                </div>
              </a>
            </div>
          </div>
          <a class="navbar-item " href="http://bulma.io/expo/">
            <span class="bd-emoji">🎨</span> &nbsp;Expo
          </a>
          <a class="navbar-item " href="http://bulma.io/love/">
            <span class="bd-emoji">❤️</span> &nbsp;Love
          </a>
        </div>

        <div class="navbar-end">
          <a class="navbar-item is-hidden-desktop-only" href="https://github.com/jgthms/bulma" target="_blank">
            <span class="icon" style="color: #333;">
              <i class="fa fa-github"></i>
            </span>
          </a>
          <a class="navbar-item is-hidden-desktop-only" href="https://twitter.com/jgthms" target="_blank">
            <span class="icon" style="color: #55acee;">
              <i class="fab fa-twitter"></i>
            </span>
          </a>
          <div class="navbar-item">
            <div class="field is-grouped">
              <p class="control">
                <a class="bd-tw-button button" data-social-network="Twitter" data-social-action="tweet" data-social-target="http://bulma.io" target="_blank" href="https://twitter.com/intent/tweet?text=Bulma: a modern CSS framework based on Flexbox&hashtags=bulmaio&url=http://bulma.io&via=jgthms">
                  <span class="icon">
                    <i class="fab fa-twitter"></i>
                  </span>
                  <span>
                    Tweet
                  </span>
                </a>
              </p>
              <p class="control">
                <a class="button is-primary" href="https://github.com/jgthms/bulma/archive/0.5.1.zip">
                  <span class="icon">
                    <i class="fa fa-download"></i>
                  </span>
                  <span>Download</span>
                </a>
              </p>
            </div>
          </div>
        </div>
      </div>
    </nav>
    <section class="hero is-primary">
      <div class="hero-body">
        <div class="container">
          <h1 class="title">
            Bulma.io with Full Width Menu (Mega Menu)
          </h1>
          <h2 class="subtitle">
            Hover over Blog
          </h2>
        </div>
      </div>
    </section>
  </div>
  <!-- <nav class="navbar is-white">
    <div class="container">
      <div class="navbar-brand">
        <nuxt-link :to="{ name: 'index'}" class="navbar-item">
          cart
        </nuxt-link>
        <div class="navbar-burger" data-target="nav">
          <span></span>
          <span></span>
          <span></span>
        </div>
      </div>

      <div class="navbar-menu">
        <template v-for="category in categories">
          <template v-if="category.children.length">
            <div class="navbar-item is-hoverable has-dropdown" :key="category.slug">
              <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }" class="navbar-link">
                {{ category.name }}
              </nuxt-link>
              <div class="navbar-dropdown">
                <nuxt-link :to="{ name: 'categories-slug', params: { slug: child.slug } }" class="navbar-item" v-for="child in category.children" :key="child.slug">
                  {{ child.name }}
                </nuxt-link>
              </div>
            </div>
          </template>
          <template v-else>
            <nuxt-link :to="{ name: 'categories-slug', params: { slug: category.slug } }" :key="category.slug" class="navbar-item">
              {{ category.name }}
            </nuxt-link>
          </template>
        </template>
      </div>

      <div id="nav" class="navbar-menu">
        <div class="navbar-end">
          <template v-if="!$auth.loggedIn">
            <nuxt-link :to="{ 'name' : 'auth-signin' }" class="navbar-item">Sign In</nuxt-link>
          </template >
          <template v-else>
            <a href="#" class="navbar-item">{{ $auth.user.name }}</a>
            <a href="#" class="navbar-item">Orders</a>
            <nuxt-link :to="{ 'name' : 'cart' }" class="navbar-item">Cart ({{ cartCount }})</nuxt-link>
          </template>
        </div>
      </div>
    </div>
</nav> -->
</template>

<script>
import {
  mapGetters
} from 'vuex'

export default {
  computed: {
    ...mapGetters({
      categories: 'categories',
      cartCount: 'cart/count'
    })
  }
}
</script>
<style lang="css" scoped>
.navbar-item.is-mega {
  position: static;

  .is-mega-menu-title {
    margin-bottom: 0;
    padding: .375rem 1rem;
  }
}

</style>
