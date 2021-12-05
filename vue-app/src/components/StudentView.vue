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
                        <span v-else>No questions found.</span>
                    </div>
                    <ul v-else-if="questions.length" class="list-group list-group-flush">
                        <li v-for="(item, index) in questions" :key="index" :class="['list-group-item', 'list-group-item-action', {'active': selectedQuestion?.question === item.question}]" v-on:click="selectedQuestion = item">
                            <circle-icon :class="{'text-success': item.status === 'Open', 'text-danger': item.status === 'Closed'}" />
                            {{item.question}}
                        </li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-12 col-sm-6">
                <div v-if="selectedQuestion" class="card">
                    <div class="card-header">
                        {{selectedQuestion.question}}
                    </div>
                    <div class="card-body">
                        <div v-if="selectedQuestion.responseType === 'Free Response'">
                            <div v-if="selectedQuestion.status === 'Closed'">
                                This question is currently closed.
                            </div>
                            <div v-else>
                                <label for="shortAnswer">Answer:</label>
                                <textarea id="shortAnswer" v-model="shortAnswer" name="shortAnswer" :rows="8" class="form-control m-2" />
                            </div>
                        </div>
                        <div v-else-if="selectedQuestion.responseType === 'Single Choice'">
                            <div v-for="(choice, index) in selectedQuestion.choices" :key="index" class="form-check">
                                <label class="form-check-label" :for="`radio-${index}`">
                                    {{selectedQuestion.choices[index]}}
                                </label>
                                <input :id="`radio-${index}`" v-model="singleChoice" :value="choice" class="form-check-input" type="radio" name="singleRadio" :disabled="selectedQuestion.status === 'Closed'">
                            </div>
                        </div>
                        <div v-else-if="selectedQuestion.responseType === 'Multiple Choice'">
                            <div v-for="(choice, index) in selectedQuestion.choices" :key="index" class="form-check">
                                <label class="form-check-label" :for="`check-${index}`">
                                    {{selectedQuestion.choices[index]}}
                                </label>
                                <input :id="`check-${index}`" v-model="multipleChoice" :value="choice" class="form-check-input" type="checkbox" name="singleCheck" :disabled="selectedQuestion.status === 'Closed'">
                            </div>
                        </div>
                    </div>
                    <div class="card-footer">
                        <div class="d-flex justify-content-end">
                            <button :class="['btn', 'btn-primary', {'disabled': selectedQuestion.status === 'Closed'}]" type="button">
                                Submit
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, onMounted, watch } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'student-view',
    setup() {
        const store = useStore();
        const classPeriod = ref(null); // vue-multiselect needs null to start usually
        onMounted(() => store.dispatch('getClassPeriods'));

        const selectedQuestion = ref(null);
        const shortAnswer = ref('');
        const singleChoice = ref(null);
        const multipleChoice = ref([]);
        const questions = computed(() => {
            const all = store.state.questions;
            return all.filter((q) => q.status !== 'Hidden');
        });

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
            multipleChoice,
            questions,
            selectedQuestion,
            shortAnswer,
            singleChoice,
        };
    },
};
</script>
<style scoped>
    .list-group-item.list-group-item-action:not(.active) {
        cursor: pointer;
    }
</style>
