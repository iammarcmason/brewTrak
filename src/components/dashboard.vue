<template>
  <div id="dashboard">
    <section>
      <div class="col1">
        <div class="profile">
          <h5>{{ userProfile.name }}</h5>
        </div>
      </div>
      <div class="col2">
        <div class="post" v-if="brews.length">
          <div v-for="brew in brews" :key="brew.id">
            <h5>{{ brew.brewname }}</h5>
            <span>{{ brew.createdOn | formatDate }}</span>
            <p>{{ brew.description | trimLength }}</p>
          </div>
        </div>
        <div v-else>
          <p class="no-results">
            There are currently no brews
          </p>
        </div>
        <span><router-link to="create">create new brew</router-link></span>
      </div>
    </section>
  </div>
</template>

<script>
import { mapState } from 'vuex';
import moment from 'moment';
export default {
  data () {
    return {};
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'brews'])
  },
  methods: {},
  filters: {
    formatDate (val) {
      if (!val) {
        return '-';
      }
      let date = val.toDate();
      return moment(date).fromNow();
    },
    trimLength (val) {
      if (val.length < 50) {
        return val;
      }
      return `${val.substring(0, 50)}...`;
    }
  }
};
</script>
