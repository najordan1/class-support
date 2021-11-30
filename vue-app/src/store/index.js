import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'

export default createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        displayName: '',
    },
    mutations: {
        setDisplayName(state, name) {
            state.displayName = name;
        },
    },
    actions: {
        setDisplayName({ commit }, { name }) {
            commit('setDisplayName', name);
        },
    },
});
