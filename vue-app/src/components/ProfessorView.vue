<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-xs-12 col-sm-6">
                <div class="card">
                    <div class="card-header">
                        <span>Questions</span>
                    </div>
                    <div class="card-body">
                        <vue-multiselect id="test" v-model="classPeriod" :options="classOptions" placeholder="Select a class period" />
                    </div>
                    <div v-if="!classPeriod || !questions?.length" class="card-body">
                        <span v-if="!classPeriod">Please select a class</span>
                        <span v-else>No questions found. Add one below!</span>
                    </div>
                    <ul v-else-if="questions?.length" class="list-group list-group-flush">
                        <li v-for="(item, index) in questions" :key="index" :class="['list-group-item', 'list-group-item-action', {'active': selectedQuestion?.question === item.question}]" v-on:click="selectedQuestion = item">
                            <circle-icon :class="{'text-success': item.status === 'Open', 'text-danger': item.status === 'Closed' || item.status === 'Hidden'}" />
                            {{item.question}}
                        </li>
                    </ul>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#createModal">
                            Add
                        </button>
                    </div>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <div v-if="selectedQuestion" class="card">
                    <div class="card-header">
                        Responses: {{selectedQuestion.question}}
                    </div>
                    <div class="card-body">
                        <div v-if="selectedQuestion.responseType === 'Free Response'">
                            <div v-if="!selectedResponses?.length">
                                No responses yet!
                            </div>
                            <ul v-else class="list-group list-group-flush">
                                <li v-for="(response, index) in selectedResponses" :key="index" class="list-group-item">
                                    {{response}}
                                </li>
                            </ul>
                        </div>
                        <div v-else>
                            <bar-chart :values="selectedResponses" />
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <div class="btn-group" role="group">
                            <button type="button" class="btn btn-danger" data-bs-toggle="modal" data-bs-target="#deleteModal">Delete</button>
                            <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#editModal">Edit</button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
        <!-- Modals: -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <create-modal />
        </div>
        <div class="modal fade" id="deleteModal" tabindex="-1" aria-labelledby="deleteModalLabel" aria-hidden="true">
            <delete-modal v-on:deleteQuestion="deleteQuestion" />
        </div>
        <div class="modal fade" id="editModal" tabindex="-1" aria-labelledby="editModalLabel" aria-hidden="true">
            <edit-modal :question="selectedQuestion ?? {}" />
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import createModal from './Modals/CreateModal.vue';
import deleteModal from './Modals/DeleteModal.vue';
import editModal from './Modals/EditModal.vue';
import barChart from './BarChart.vue';

export default {
    name: 'professor-view',
    components: {
        barChart,
        createModal,
        deleteModal,
        editModal,
    },
    setup() {
        const store = useStore();
        const classPeriod = ref(null); // vue-multiselect needs null to start usually
        onMounted(() => store.dispatch('getClassPeriods'));

        const selectedQuestion = ref(null);
        const selectedResponses = computed(() => {
            if (!selectedQuestion.value) return null;
            return store.state.allResponses[selectedQuestion.value._id];
        })

        watch(classPeriod, (to, from) => {
            if (to && to !== from) {
                store.dispatch('getQuestions', { classPeriod: classPeriod.value });
                selectedQuestion.value = null;
            }
        });
        watch(selectedQuestion, (to, from) => {
            if (to && to !== from) {
                store.dispatch('getResponses', { question: selectedQuestion.value._id, responseType: selectedQuestion.value.responseType });
            }
        });
        
        const deleteQuestion = () => {
            store.dispatch('deleteQuestion', { question: selectedQuestion.value._id });
            selectedQuestion.value = null;
        };

        return { 
            name: computed(() => store.state.displayName),
            deleteQuestion,
            classPeriod,
            classOptions: computed(() => store.state.classPeriods),
            questions: computed(() => store.state.questions),
            selectedQuestion,
            selectedResponses,
        };
    },
};
</script>
<style scoped>
    .list-group-item.list-group-item-action:not(.active) {
        cursor: pointer;
    }
</style>
