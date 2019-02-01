<template lang="html">
 <select @change="changed">
   <option value="">Choose</option>
   <option :value="city.id" v-for="city in filterCities" :key="city.id">
     {{ city.name }}
   </option>
 </select>
</template>

<script>
import _ from 'lodash'
export default {
  props: {
    province: {
      required: true,
    },
  },
  data() {
    return {
      cities: [],
    }
  },
  computed: {
    filterCities() {
      var filtered = this.province
      return _.filter(this.cities, (v) => v.province_id == filtered)
    }
  },
  methods: {
    async getCities() {
      let response = await this.$axios.$get('cities')
      this.cities = response.data
    },
    changed($event) {
      this.$emit('input', $event.target.value)
    }
  },
  created() {
    this.getCities()
  }
}
</script>
