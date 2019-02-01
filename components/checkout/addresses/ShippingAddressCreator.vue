<template>
<form @submit.prevent="store">
    <div class="field">
      <label class="label">Name</label>
      <div class="control">
        <input class="input" type="text" v-model="form.name">
      </div>
    </div>

    <div class="field">
      <label class="label">Address Line 1</label>
      <div class="control">
        <input class="input" type="text" v-model="form.address_1">
      </div>
    </div>

    <div class="field">
      <label class="label">Province</label>
      <div class="control">
          <div class="select is-fullwidth">
            <ProvinceDropdown v-model="province_id"/>
          </div>
        <!-- <input class="input" type="text" v-model="form.province"> -->
      </div>
    </div>

    <div class="field">
      <label class="label">City</label>
      <div class="control">
          <div class="select is-fullwidth">
            <CityDropdown v-model="city_id" :province="province_id"/>
          </div>
      </div>
    </div>

    <div class="field">
      <label class="label">Subdistrict</label>
      <div class="control">
          <div class="select is-fullwidth">
            <SubdistrictDropdown v-model="form.subdistrict_id" :city="city_id" />
          </div>
      </div>
    </div>

    <div class="field">
      <p class="control">
        <button class="button is-info">Add Address</button>
        <a href="#" class="button is-text" @click.prevent="$emit('cancel')">Cancel</a>
      </p>
    </div>

</form>
</template>

<script>
import ProvinceDropdown from '@/components/form/ProvinceDropdown'
import CityDropdown from '@/components/form/CityDropdown'
import SubdistrictDropdown from '@/components/form/SubdistrictDropdown'

export default {
  data() {
    return {
      province_id: '',
      city_id: '',
      form: {
        name: '',
        address_1: '',
        subdistrict_id: '',
        default: 'true'
      }
    }
  },
  components: {
    ProvinceDropdown,
    CityDropdown,
    SubdistrictDropdown
  },
  methods: {
    async store() {
      let response = await this.$axios.post('addresses', this.form)

      this.$emit('created', response.data.data)
    }
  }
}
</script>
