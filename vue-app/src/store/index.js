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
        // for students, store what questions they've responded to
        responses: [],
    },
    mutations: {
        addClassPeriod(state, name) {
            state.classPeriods.push(name);
        },
        addResponse(state, response) {
            state.responses.push(response);
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
        async addResponse({ commit }, { question, responseType, answer }) {
            let correctAnswer;
            if (responseType === 'Multiple Choice') {
                await axios.post('mcresponse/add', { answer, question })
                    .then((r) => correctAnswer = r.data.answer);
            } else {
                await axios.post('response/add', { answer, question })
                    .then((r) => correctAnswer = r.data.answer);
            }
            commit('addResponse', { answer, question, correctAnswer });
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
