<template>
  <section>
    <div class="create-brew col1">
      <h5>create a brew</h5>
      <form @submit.prevent>
        <textarea v-model.trim="brew.name" placeholder="Brew Name"></textarea>
        <textarea
          v-model.trim="brew.description"
          placeholder="Brew Description"
        ></textarea>
        <div v-if="ingredients.length">
          <h5>ingredients</h5>
          <div
            v-for="ingredient in ingredients"
            :key="ingredient.id"
            class="ingredient"
          >
            <label>
              <input
                type="checkbox"
                v-model="brew.ingredients"
                :value="ingredient"
              />
              {{ ingredient.name }} by {{ ingredient.manufacturer }}
            </label>
          </div>
        </div>
        <button
          @click="createbrew"
          :disabled="brew.description == ''"
          class="button"
        >
          add brew
        </button>
      </form>
    </div>
    <div class="create-brew col2">
      <h5>selected ingredients</h5>
      <ul>
        <li v-for="selected in brew.ingredients" :key="selected.id">
          {{ selected.name }} by {{ selected.manufacturer }}
        </li>
      </ul>
    </div>
  </section>
</template>

<script>
import { mapState } from 'vuex';

const fb = require('../configFirebase.js');
export default {
  data () {
    return {
      brew: {
        name: '',
        description: '',
        ingredients: []
      }
    };
  },
  computed: {
    ...mapState(['userProfile', 'currentUser', 'ingredients'])
  },
  methods: {
    createbrew () {
      fb.brewsCollection
        .add({
          createdOn: new Date(),
          brewname: this.brew.name,
          description: this.brew.description,
          userId: fb.auth.currentUser.uid,
          userName: this.userProfile.name,
          ingredients: this.brew.ingredients,
          comments: 0,
          likes: 0
        })
        .then(ref => {
          this.brew.description = '';
        })
        .catch(err => {
          console.log(err);
        });
    }
  }
};
</script>
<style scoped>
.small-input {
  width: 65px;
  margin-left: 25px;
}
</style>
