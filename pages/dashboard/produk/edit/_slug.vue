<template lang="html">
  <div class="section">
    <div class="columns">
      <div class="column">
        <p>Edit</p>
        <form class="" action="index.html" method="post">
          <div class="field">
            <label class="label">Name</label>
            <div class="control">
              <input class="input" type="text" v-model="product.name">
            </div>
          </div>
          <div class="field">
            <label class="label">Slug</label>
            <div class="control">
              <input class="input" type="text" disabled v-model="product.slug">
            </div>
          </div>
          <div class="field">
            <label class="label">Default Price</label>
            <div class="control">
              <input class="input" type="email" v-model="product.price">
            </div>
          </div>
          <div class="box">
            <article class="media" v-for="(variation, key) in product.variations" :key="key">
              <div class="media-content">
                <div class="section">
                  <div class="field">
                    <label class="label">{{key}}</label>
                    <div class="control">
                      {{ Object.keys(product.variations)[Object.keys(product.variations).indexOf(key)]}}
                      <!-- <input class="input" type="text" v-model="product.variations.indexOf(key)" > -->
                    </div>
                  </div>
                  <!-- <div class="field" v-for="vars in variation" :key="vars.id">
                    <label class="label">Variasi {{ vars.type}}</label>
                    <div class="control">
                      <input class="input" type="email" v-model="vars.name">
                      {{variation.indexOf('Gamis')}}
                    </div>
                  </div> -->
                </div>
              </div>
            </article>
          </div>

        </form>
      </div>
    </div>
  </div>
</template>

<script>
export default {

  data() {
    return {
      product: null
    }
  },
  async asyncData({params, app}) {
    let response = await app.$axios.$get(`products/${params.slug}/edit`)

    return {
      product: response.data
    }
  }
}
</script>
