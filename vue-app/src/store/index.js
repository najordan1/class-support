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
        questions: [],
    },
    mutations: {
        addClassPeriod(state, name) {
            state.classPeriods.push(name);
        },
        setClassPeriods(state, classPeriods) {
            state.classPeriods = classPeriods;
        },
        setDisplayName(state, name) {
            state.displayName = name;
        },
        setQuestions(state, questions) {
            state.questions = questions;
        },
    },
    // every component can call actions
    actions: {
        async addClassPeriod({ commit }, { name }) {
            axios.post('class/add', { name })
                .then(() => commit('addClassPeriod', name));
        },
        async addQuestion(state, body){
            await axios.post('question/add', body);
        },
        async getClassPeriods({ commit }) {
            const options = await axios.get('class/getAll');
            commit('setClassPeriods', options?.data?.map((item) => item.name));
        },
        async getQuestions({ commit }, { classPeriod }) {
            const questions = await axios.get(`question/getQuestions/${classPeriod}`);
            commit('setQuestions', questions?.data);
        },
        setDisplayName({ commit }, { name }) {
            commit('setDisplayName', name);
        },
    },
});
