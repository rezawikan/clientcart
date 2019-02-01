<template lang="html">
 <select @change="changed">
   <option value="">Choose</option>
   <option :value="subdistrict.id" v-for="subdistrict in filterSubdistricts" :key="subdistrict.id">
     {{ subdistrict.subdistrict }}
   </option>
 </select>
</template>

<script>
export default {
  props: {
    city: {
      required: true,
    },
  },
  data() {
    return {
      subdistricts : []
    }
  },
  computed: {
    filterSubdistricts() {
      var filtered = this.city
      return _.filter(this.subdistricts, (v) => v.city_id == filtered)
    }
  },
  methods: {
    async getSubdistricts() {
      let response = await this.$axios.$get('subdistricts')
      this.subdistricts = response.data
    },
    changed($event){
      this.$emit('input', $event.target.value)
    }
  },
  created() {
    this.getSubdistricts()
    console.log(this.filterSubdistricts);
    // this.$emit('input', $event.target.value)
  }
}
</script>
