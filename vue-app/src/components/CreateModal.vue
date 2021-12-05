<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalLabel">Add</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="mode === 'class' || mode === 'question'">
                    <ul class="nav nav-pills">
                        <li class="nav-item">
                            <div :class="['nav-link', {'active': mode === 'class'}]" v-on:click="mode = 'class'">
                                Class Period
                            </div>
                        </li>
                        <li class="nav-item">
                            <div :class="['nav-link', {'active': mode === 'question'}]" v-on:click="mode = 'question'">
                                Question
                            </div>
                        </li>
                    </ul>
                    <Form v-show="mode === 'class'" novalidate autocomplete="off" :validation-schema="classSchema" v-on:submit="addClass">
                        <div class="form-group py-2">
                            <label for="name" class="form-label">Class Name</label>
                            <Field id="name" v-slot="{field, meta}" v-model="name" name="name">
                                <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text">
                            </Field>
                            <ErrorMessage name="name" class="invalid-feedback" />
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </Form>
                    <Form v-show="mode === 'question'" novalidate autocomplete="off" :validation-schema="questionSchema" v-on:submit="addQuestion">
                        <div class="form-group py-2">
                            <label for="question" class="form-label">Question *</label>
                            <Field id="question" v-slot="{field, meta}" v-model="question.question" name="question">
                                <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text" placeholder="e.g. How are you feeling today?">
                            </Field>
                            <ErrorMessage name="question" class="invalid-feedback" />
                        </div>
                        <div class="form-group py-2">
                            <label for="className" class="form-label">Class Name *</label>
                            <Field id="className" v-slot="{value, handleChange, meta}" v-model="question.className" name="className">
                                <vue-multiselect :model-value="value" :options="classOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                            </Field>
                            <ErrorMessage name="className" class="invalid-feedback" />
                        </div>
                        <div class="row py-2">
                            <div class="form-group col">
                                <label for="status" class="form-label">Status *</label>
                                <Field id="status" v-slot="{value, handleChange, meta}" v-model="question.status" name="status">
                                    <vue-multiselect :model-value="value" :options="statusOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                                </Field>
                                <ErrorMessage name="status" class="invalid-feedback" />
                            </div>
                            <div class="form-group col">
                                <label for="responseType" class="form-label">Response Type *</label>
                                <Field id="responseType" v-slot="{value, handleChange, meta}" v-model="question.responseType" name="responseType">
                                    <vue-multiselect :model-value="value" :options="responseTypeOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                                </Field>
                                <ErrorMessage name="responseType" class="invalid-feedback" />
                            </div>
                        </div>
                        <div v-if="question.responseType === 'Multiple Choice' || question.responseType === 'Single Choice'">
                            <div class="row py-2">
                                <div class="form-group col">
                                    <label for="numOptions" class="form-label">Number of options *</label>
                                    <Field id="numOptions" v-slot="{field, meta}" v-model="question.numOptions" name="numOptions">
                                        <input v-bind="field" :class="['form-range', {'is-invalid': meta.touched && !meta.valid}]" type="range" :min="2" :step="1" :max="5">
                                    </Field>
                                    <span class="form-text">Selected: {{question.numOptions}}</span>
                                </div>
                                <div class="form-group col">
                                    <label for="correctAnswer" class="form-label">Correct Answer (optional)</label>
                                    <Field id="correctAnswer" v-slot="{value, handleChange, meta}" v-model="question.correctAnswer" name="correctAnswer">
                                        <vue-multiselect :model-value="value" :options="correctAnswerOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                                    </Field>
                                    <ErrorMessage name="correctAnswer" />
                                </div>
                            </div>
                            <div class="row">
                                <div v-for="(option, index) in correctAnswerOptions" :key="index" class="form-group col-6 py-2">
                                    <label :for="`option${index+1}`" class="form-label">{{option}} *</label>
                                    <Field :id="`option${index+1}`" v-slot="{field, meta}" v-model="question.choices[index]" :name="`option${index+1}`">
                                        <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text">
                                    </Field>
                                    <ErrorMessage :name="`option${index+1}`" class="invalid-feedback" />
                                </div>
                            </div>
                            <span class="form-text">* denotes a required field</span>
                        </div>
                        <div class="d-flex justify-content-end">
                            <button type="submit" class="btn btn-primary">Create</button>
                        </div>
                    </Form>
                </div>
                <div v-else-if="mode === 'pending'" class="d-flex justify-content-center">
                    <div class="spinner-border" role="status">
                        <span class="visually-hidden">Loading...</span>
                    </div>
                </div>
                <div v-else-if="mode === 'done'">
                    Submitted successfully!
                    <div class="d-flex justify-content-end">
                        <button class="btn btn-primary" type="button" v-on:click="reset()">
                            Add another
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed, watch } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'create-modal',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();
        const mode = ref('class');
        const name = ref('');
        const answerOptions = ['Option 1', 'Option 2', 'Option 3', 'Option 4', 'Option 5'];
        const correctAnswerOptions = computed(() => answerOptions.slice(0, question.value.numOptions));

        const defaultQuestion = {
            question: '',
            status: null,
            responseType: null,
            className: null,
            correctAnswer: null,
            choices: ['','','','',''],
            numOptions: 4,
        };

        const question = ref({ ...defaultQuestion });

        // Computed here is needed for the watch, which can't watch a property of a ref(object)
        const correctAnswer = computed(() => question.value.correctAnswer);
        watch(correctAnswer, (to, from) => {
            if(to && to !== from) question.value.correctAnswer = null;
        });

        const classSchema = computed(() => yup.object({
            name: yup.string().required('Please enter a name'),
        }));
        const questionSchema = computed(() => yup.object({
            className: yup.string().required('Please select a class').typeError('Please select a class'),
            question: yup.string().required('Please enter a question'),
            responseType: yup.string().required('Please select a response type').typeError('Please select a response type'),
            status: yup.string().required('Please select a status').typeError('Please select a status'),
            numOptions: yup.number().integer(),
            correctAnswer: yup.string().nullable(),
            option1: yup.string().when('responseType', {
                is: (responseType) => responseType && responseType !== 'Free Response',
                then: yup.string().required('Option 1 is required'),
            }),
            option2: yup.string().when('numOptions', {
                is: (numOptions) => numOptions >= 2,
                then: yup.string().required('Option 2 is required'),
            }),
            option3: yup.string().when('numOptions', {
                is: (numOptions) => numOptions >= 3,
                then: yup.string().required('Option 3 is required'),
            }),
            option4: yup.string().when('numOptions', {
                is: (numOptions) => numOptions >= 4,
                then: yup.string().required('Option 4 is required'),
            }),
            option5: yup.string().when('numOptions', {
                is: (numOptions) => numOptions == 5,
                then: yup.string().required('Option 5 is required'),
            }),
        }));

        const formattedQuestion = computed(() => {
            const returnObject = {
                question: question.value.question,
                className: question.value.className,
                status: question.value.status,
                responseType: question.value.responseType,
            };
            if (question.value.responseType === 'Free Response') return returnObject;
            returnObject.choices = question.value.choices.slice(0, question.value.numOptions);
            if (question.value.correctAnswer) {
                // Convert from 'Option x' to the actual option
                const answerIndex = correctAnswerOptions.value.findIndex((option) => option === question.value.correctAnswer);
                returnObject.correctAnswer = question.value.choices[answerIndex];
            }
            return returnObject;
        });

        const addClass = async () => {
            mode.value = 'pending';
            await store.dispatch('addClassPeriod', { name: name.value });
            mode.value = 'done';
        };
        const addQuestion = async () => {
            mode.value = 'pending';
            store.dispatch('addQuestion', formattedQuestion.value);
            mode.value = 'done';
        }
        const reset = () => {
            name.value = '';
            question.value = { ...defaultQuestion };
            mode.value = 'class';
        };

        return {
            addClass,
            addQuestion,
            correctAnswerOptions,
            classSchema,
            classOptions: computed(() => store.state.classPeriods),
            mode,
            name,
            question,
            questionSchema,
            reset,
            responseTypeOptions: ['Single Choice', 'Multiple Choice', 'Free Response'],
            statusOptions: ['Open', 'Closed', 'Hidden'],
        };
    },
};
</script>

<style scoped>
    .nav-link:not(.active) {
        cursor: pointer;
    }
</style>
