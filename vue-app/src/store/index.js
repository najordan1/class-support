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
        // for professor, see all/aggregated responses per question
        allResponses: {},
    },
    mutations: {
        addClassPeriod(state, name) {
            state.classPeriods.push(name);
        },
        addResponse(state, response) {
            state.responses.push(response);
        },
        removeClass(state, className) {
            state.classPeriods = state.classPeriods.filter((c) => c !== className)
        },
        removeQuestion(state, question) {
            state.questions = state.questions.filter((q) => q._id !== question);
        },
        setAllResponses(state, { question, responses }) {
            state.allResponses[question] = responses;
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
        toggleQuestionStatus(state, { question, status }) {
            const questionIndex = state.questions.findIndex((q) => q._id === question);
            state.questions[questionIndex].status = status;
        },
        toggleQuestionTitle(state, { question, title }) {
            const questionIndex = state.questions.findIndex((q) => q._id === question);
            state.questions[questionIndex].question = title;
        }
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
        async deleteClass({ commit }, { className }) {
            await axios.delete(`class/remove/${className}`);
            commit('removeClass', className);
        },
        async deleteQuestion({ commit }, { question }) {
            await axios.delete(`question/remove/${question}`);
            commit('removeQuestion', question);
        },
        async getClassPeriods({ commit }) {
            const options = await axios.get('class/getAll');
            commit('setClassPeriods', options?.data?.map((item) => item.name));
        },
        async getQuestions({ commit }, { classPeriod }) {
            const questions = await axios.get(`question/getQuestions/${classPeriod}`);
            commit('setQuestions', questions?.data);
        },
        async getResponses({ commit }, { question, responseType }) {
            let responses;
            if (responseType === 'Free Response') {
                responses = await axios.get(`response/getResponses/${question}`);
                responses = responses?.data.map((r) => r.answer);
            } else {
                if (responseType === 'Single Choice') responses = await axios.get(`response/aggregateResponses/${question}`);
                else responses = await axios.get(`mcresponse/aggregateMCResponses/${question}`);
                responses = responses?.data;
            }
            commit('setAllResponses', { question, responses });
        },
        setDisplayName({ commit }, { name }) {
            commit('setDisplayName', name);
        },
        async updateQuestionStatus({ commit }, { question, status }) {
            await axios.patch(`question/updateStatus`, { questionID: question, status });
            commit('toggleQuestionStatus', { question, status });
        },
        async updateQuestionTitle({ commit }, { question, title }) {
            await axios.patch(`question/updateTitle`, { questionID: question, title });
            commit('toggleQuestionTitle', { question, title });
        },
    },
});
