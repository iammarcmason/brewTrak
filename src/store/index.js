import Vue from 'vue';
import Vuex from 'vuex';
const fb = require('@/configFirebase.js');

Vue.use(Vuex);

export const store = new Vuex.Store({
  state: {
    currentUser: null,
    userProfile: {},
    ingredients: [],
    brews: [],
    hiddenbrews: []
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
    },
    setBrews (state, val) {
      state.brews = val;
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

    // get ingredients
    fb.ingredientsCollection.orderBy('name').onSnapshot(querySnapshot => {
      let ingredientsArray = [];
      querySnapshot.forEach(doc => {
        let ingredient = doc.data();
        ingredient.id = doc.id;
        ingredientsArray.push(ingredient);
      });
      store.commit('setIngredients', ingredientsArray);
    });

    // get brews
    fb.brewsCollection
      .orderBy('createdOn', 'desc')
      .onSnapshot(querySnapshot => {
        // check if created by currentUser
        let createdByCurrentUser;
        if (querySnapshot.docs.length) {
          createdByCurrentUser =
            store.state.currentUser.uid ===
            querySnapshot.docChanges()[0].doc.data().userId;
        }

        // add new brews to hiddenbrews array after initial load
        if (
          querySnapshot.docChanges().length !== querySnapshot.docs.length &&
          querySnapshot.docChanges()[0].type === 'added' &&
          !createdByCurrentUser
        ) {
          let brew = querySnapshot.docChanges()[0].doc.data();
          brew.id = querySnapshot.docChanges()[0].doc.id;

          store.commit('setHiddenbrews', brew);
        } else {
          let brewsArray = [];

          querySnapshot.forEach(doc => {
            let brew = doc.data();
            brew.id = doc.id;
            brewsArray.push(brew);
          });

          store.commit('setBrews', brewsArray);
        }
      });

    fb.usersCollection.doc(user.uid).onSnapshot(doc => {
      store.commit('setUserProfile', doc.data());
    });
  }
});
