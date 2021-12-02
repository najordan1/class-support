import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        classPeriods: [],
        displayName: '',
    },
    mutations: {
        setDisplayName(state, name) {
            state.displayName = name;
        },
    },
    // every other component can call actions
    actions: {
        setDisplayName({ commit }, { name }) {
            commit('setDisplayName', name);
        },
    },
});
