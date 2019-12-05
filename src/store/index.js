import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('@/configFirebase.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    ingredients: []
  },
  mutations: {
    setCurrentUser (state, val) {
      state.currentUser = val;
    },
    setUserProfile (state, val) {
      state.userProfile = val;
    },
    setIngredients (state, val) {
      state.ingredients = val;
    }
  },
  actions: {
    fetchUserProfile ({ commit, state }) {
      fb.usersCollection
        .doc(fb.auth.currentUser.uid)
        .get()
        .then(res => {
          commit('setUserProfile', res.data());
        })
        .catch(err => {
          console.log(err);
        });
    },
    clearData ({ commit }) {
      commit('setCurrentUser', null);
      commit('setUserProfile', {});
      commit('setIngredients', null);
    }
  },
  modules: {}
});
export default store;

// handle page reload
fb.auth.onAuthStateChanged(user => {
  if (user) {
    store.commit('setCurrentUser', user);
    store.dispatch('fetchUserProfile');

    fb.ingredientsCollection.orderBy('name').onSnapshot(querySnapshot => {
      let ingredientsArray = [];

      querySnapshot.forEach(doc => {
        let ingredient = doc.data();
        ingredient.id = doc.id;
        ingredientsArray.push(ingredient);
      });

      store.commit('setIngredients', ingredientsArray);
    });

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data());
    });
  }
});
