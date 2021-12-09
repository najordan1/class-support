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
                                <div v-if="selectedResponse">
                                    Your answer: {{selectedResponse.answer}}
                                </div>
                                <Form v-else novalidate autocomplete="off" :validation-schema="freeResponseSchema" v-on:submit="submit">
                                    <div class="form-group py-2">
                                        <label for="shortAnswer" class="form-label">Answer:</label>
                                        <Field id="shortAnswer" v-slot="{field, meta}" v-model="shortAnswer" name="shortAnswer">
                                            <textarea v-bind="field" :class="['form-control', 'm-2', {'is-invalid': meta.touched && !meta.valid}]" :rows="8" />
                                        </Field>
                                        <ErrorMessage class="invalid-feedback" name="shortAnswer" />
                                    </div>
                                    <div class="d-flex justify-content-end py-2">
                                        <button :class="['btn', 'btn-primary', {'disabled': selectedQuestion.status === 'Closed'}]" type="submit">
                                            Submit
                                        </button>
                                    </div>
                                </Form>
                            </div>
                        </div>
                        <div v-else-if="selectedQuestion.responseType === 'Single Choice'">
                            <Form novalidate autocomplete="off" :validation-schema="singleChoiceSchema" v-on:submit="submit">
                                <div class="form-group">
                                    <Field id="singleChoice" v-slot="{field, meta}" v-model="singleChoice" name="singleChoice">
                                        <div v-for="(choice, index) in selectedQuestion.choices" :key="index" class="form-check">
                                            <label class="form-check-label" :for="`radio-${index}`">
                                                <span v-if="selectedResponse && selectedResponse.correctAnswer">
                                                    <check-icon v-if="selectedResponse.correctAnswer.includes(choice)" class="text-success" />
                                                    <close-icon v-else class="text-danger" />
                                                </span>
                                                {{selectedQuestion.choices[index]}}
                                            </label>
                                            <input :id="`radio-${index}`" v-bind="field" :value="choice" :class="['form-check-input', {'is-invalid': meta.touched && !meta.valid}]" type="radio" name="singleRadio" :checked="selectedResponse && selectedResponse.answer === choice" :disabled="selectedQuestion.status === 'Closed' || selectedResponse">
                                        </div>
                                    </Field>
                                </div>
                                <!-- TODO this isn't working -->
                                <ErrorMessage class="invalid-feedback" name="singleChoice" />
                                <div class="d-flex justify-content-end py-2">
                                    <button :class="['btn', 'btn-primary', {'disabled': selectedQuestion.status === 'Closed'  || selectedResponse}]" type="submit">
                                        Submit
                                    </button>
                                </div>
                            </Form>
                        </div>
                        <div v-else-if="selectedQuestion.responseType === 'Multiple Choice'">
                            <div v-for="(choice, index) in selectedQuestion.choices" :key="index" class="form-check">
                                <label class="form-check-label" :for="`check-${index}`">
                                    <span v-if="selectedResponse && selectedResponse.correctAnswer">
                                        <check-icon v-if="selectedResponse.correctAnswer.includes(choice)" class="text-success" />
                                        <close-icon v-else class="text-danger" />
                                    </span>
                                    {{selectedQuestion.choices[index]}}
                                </label>
                                <input :id="`check-${index}`" v-model="multipleChoice" :value="choice" class="form-check-input" type="checkbox" name="singleCheck" :disabled="selectedQuestion.status === 'Closed' || selectedResponse" :checked="selectedResponse  && selectedResponse?.answer?.includes(choice)">
                            </div>
                            <div class="d-flex justify-content-end py-2">
                                <button :class="['btn', 'btn-primary', {'disabled': selectedQuestion.status === 'Closed'  || selectedResponse || !multipleChoice.length}]" type="button" v-on:click="submit">
                                    Submit
                                </button>
                            </div>
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
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'student-view',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
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
        const responses = computed(() => store.state.responses);
        const selectedResponse = computed(() => {
            if (!selectedQuestion.value) return null;
            const response = responses.value.filter((r) => r.question === selectedQuestion.value._id);
            return response.length? response[0] : null;
        });
        const freeResponseSchema = computed(() => yup.object({
            shortAnswer: yup.string().required('Please enter an answer'),
        }));
        const singleChoiceSchema = computed(() => yup.object({
            singleChoice: yup.string().required('Please select an option').typeError('Please select an option'),
        }));

        const submit = () => {
            const answer = {
                question: selectedQuestion.value._id,
                responseType: selectedQuestion.value.responseType,
            }
            if (answer.responseType === 'Free Response') answer.answer = shortAnswer.value;
            else if (answer.responseType === 'Multiple Choice') {
                if (!multipleChoice.value.length) return;
                answer.answer = multipleChoice.value;
            } else answer.answer = singleChoice.value;
            store.dispatch('addResponse', answer);
        };

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
            freeResponseSchema,
            multipleChoice,
            questions,
            responses,
            selectedQuestion,
            selectedResponse,
            shortAnswer,
            singleChoice,
            singleChoiceSchema,
            submit,
        };
    },
};
</script>
<style scoped>
    .list-group-item.list-group-item-action:not(.active) {
        cursor: pointer;
    }
</style>
