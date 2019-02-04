module.exports = {
  /*
   ** Headers of the page
   */
  head: {
    title: 'clientcart',
    script: [{
      src: 'https://js.stripe.com/v3/'
    }],
    meta: [{
        charset: 'utf-8'
      },
      {
        name: 'viewport',
        content: 'width=device-width, initial-scale=1.0, maximum-scale=1.0, user-scalable=no'
      },
      {
        hid: 'description',
        name: 'description',
        content: 'Nuxt.js project'
      }
    ],
    link: [{
        rel: 'icon',
        type: 'image/x-icon',
        href: '/favicon.ico'
      },
      {
        rel: 'stylesheet',
        href: 'https://use.fontawesome.com/releases/v5.7.0/css/all.css',
        integrity: 'sha384-lZN37f5QGtY3VHgisS14W3ExzMWZxybE1SJSEsQp9S+oqd12jhcu+A56Ebc1zFSJ',
        crossorigin: 'anonymous'
      },
      {
        rel: 'stylesheet',
        href: 'https://cdn.jsdelivr.net/npm/bulma-pageloader@2.1.0/dist/css/bulma-pageloader.min.css'
      }]
  },

  modules: [
    '@nuxtjs/axios',
    '@nuxtjs/auth',
    // 'nuxt-fontawesome',
  ],
  auth: {

    strategies: {
      local: {
        scopeKey: 'scope',
        endpoints: {
          login: {
            url: '/auth/login',
            method: 'post',
            propertyName: 'meta.token'
          },
          logout: {
            url: '/auth/logout',
            method: 'post'
          },
          user: {
            url: '/auth/me',
            method: 'get',
            propertyName: 'data'
          }
        },
        // tokenRequired: true,
        // tokenType: 'bearer',
      }
    }
  },

  axios: {
    baseURL: 'http://cart.test:8080/api'
  },
  // vendor: ["lodash"],
  plugins: [
    '@/plugins/mixins/pluralize',
    // '@/plugins/carousel
  ],

  // include bootstrap css
  css: [
    '@/assets/scss/main.scss',
    '@/assets/scss/carousel.scss',
    // '@/assets/scss/pageloader.scss',
  ],
  /*
   ** Customize the progress bar color
   */
  loading: {
    color : '#00d1b2'
  },
  /*
   ** Build configuration
   */
  build: {
    transpile: [
      'lodash-es'
    ],
    postcss: {
      plugins: {
        'postcss-custom-properties': false
      }
    },
    /*
     ** Run ESLint on save
     */
    extend(config, {
      isDev,
      isClient
    }) {
      if (isDev && isClient) {
        config.module.rules.push({
          enforce: 'pre',
          test: /\.(js|vue)$/,
          loader: 'eslint-loader',
          exclude: /(node_modules)/
        })
      }
    }
  }
}
