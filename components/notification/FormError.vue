<template>
  <div class="">
    <span class="help-block" v-for="error in errors" :key="error">
        {{ error }}
    </span>
  </div>

</template>

<script>
    export default {
        props: ['errors'],
    }
</script>
