import { createStore } from 'vuex';
import createPersistedState from 'vuex-persistedstate'
import axios from 'axios';

export default createStore({
    plugins: [createPersistedState({
        storage: window.sessionStorage,
    })],
    state: {
        classPeriods: [],
        displayName: '',
    },
    mutations: {
        setClassPeriods(state, classPeriods) {
            state.classPeriods = classPeriods;
        },
        setDisplayName(state, name) {
            state.displayName = name;
        },
    },
    // every other component can call actions
    actions: {
        async getClassPeriods({ commit }) {
            const options = await axios.get('class/getAll');
            commit('setClassPeriods', options?.data?.map((item) => item.name));
        },
        setDisplayName({ commit }, { name }) {
            commit('setDisplayName', name);
        },
    },
});
