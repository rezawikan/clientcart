<template lang="html">
 <select @change="changed">
   <option value="">Choose</option>
   <option :value="province.id" v-for="province in provinces" :key="province.id">
     {{ province.name }}
   </option>
 </select>
</template>

<script>
export default {
  data() {
    return {
      provinces : []
    }
  },
  methods: {
    async getProvinces() {
      let response = await this.$axios.$get('provinces')
      this.provinces = response.data
    },
    changed($event){
      this.$emit('input', $event.target.value)
    }
  },
  created() {
    this.getProvinces()
  }
}
</script>
