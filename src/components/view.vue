<template>
  <div class="viewBrew"></div>
</template>

<script>
export default {
  name: 'view',
  data () {
    return {
      brew: [],
      page_id: this.$route.params.brewID
    };
  }
};
</script>
