<template>
  <div class="notification"
  v-if="notify"
  :class="[themes[theme]]"
  >
    <button class="delete" @click.prevent="$emit('click', false)"></button>
    {{ messages }}
  </div>
</template>

<script>
export default {
  data(){
    return {
      themes: {
        primary: 'is-primary',
        link: 'is-link',
        info: 'is-info',
        success: 'is-success',
        warning: 'is-warning',
        danger: 'is-danger'
      }
    }
  },
  props: {
    notify: {
      required:false,
      type: Boolean,
      default: false
    },
    messages: {
      required:false,
      type:String
    },
    theme: {
      required:false,
      type: String,
      default: 'primary'
    }
  }
}
</script>
