<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
        </div>
      </div>
      <div class="col2">
        <div>
          <p class="no-results">
            There are currently no brews
          </p>
          <span><router-link to="create">create new brew</router-link></span>
        </div>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
// const fb = require('../configFirebase.js');

export default {
  data () {
    return {};
  },
  computed: {
    ...mapState(['userProfile'])
  },
  methods: {}
};
</script>
