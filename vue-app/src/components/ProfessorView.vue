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
                    <div v-if="!classPeriod || !questions.length" class="card-body">
                        <span v-if="!classPeriod">Please select a class</span>
                        <span v-else>No questions found. Add one below!</span>
                    </div>
                    <ul v-else-if="questions.length" class="list-group list-group-flush">
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
                        Question is of type {{selectedQuestion.responseType}}
                    </div>
                </div>
            </div>
        </div>
        <!-- Modal: -->
        <div class="modal fade" id="createModal" tabindex="-1" aria-labelledby="createModalLabel" aria-hidden="true">
            <create-modal />
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';
import createModal from './CreateModal.vue';

export default {
    name: 'professor-view',
    components: {
        createModal
    },
    setup() {
        const store = useStore();
        const classPeriod = ref(null); // vue-multiselect needs null to start usually
        onMounted(() => store.dispatch('getClassPeriods'));

        const selectedQuestion = ref(null);
        watch(classPeriod, (to, from) => {
            if (to && to !== from) {
                store.dispatch('getQuestions', { classPeriod: classPeriod.value });
                selectedQuestion.value = null;
            }
        });

        return { 
            name: computed(() => store.state.displayName),
            classPeriod,
            classOptions: computed(() => store.state.classPeriods),
            questions: computed(() => store.state.questions),
            selectedQuestion,
        };
    },
};
</script>
<style scoped>
    .list-group-item.list-group-item-action:not(.active) {
        cursor: pointer;
    }
</style>
