<template>
<div class="field">
  <div class="field">
    <div class="select is-fullwidth">
      <select v-model="type">
        <option value="">Please Choose</option>
        <option v-for="(variation, key) in variations" :key="key" :value="key">
          {{ key }}
        </option>
      </select>
    </div>
  </div>
  <div class="field">
    <div class="select is-fullwidth">
      <select v-model="detail" @change="changed($event)">
        <option value="">Please Choose</option>
        <option v-for="variation in variations[type]" :key="variation.id" :value="variation.id" :disabled="!variation.in_stock">
          {{ variation.name }}

          <template v-if="!variation.in_stock">
           (Out Of Stock)
          </template>
        </option>
      </select>
    </div>
  </div>
</div>
</template>

<script>
export default {
  props: {
    variations: {
      required: true,
      type: Object/Array
    }
  },

  watch: {
    'type'() {
      this.$emit('input', '')
    }
  },

  methods: {
    changed(event) {
      if (event.target.value) {
        this.$emit('input', this.findVariation(event.target.value))
      }
    },
    findVariation(id) {
      let variation = this.variations[this.type].find(v => v.id == id)

      if (typeof variation === 'undefined') {
        return null
      }

      return variation
    }
  },
  data() {
    return {
      type: '',
      detail: ''
    }
  }
}
</script>
