<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="createModalLabel">Add</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
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
                    <button type="submit" class="btn btn-primary">Create</button>
                </Form>
                <Form v-show="mode === 'question'" novalidate autocomplete="off" :validation-schema="questionSchema" v-on:submit="addQuestion">
                    <div class="form-group py-2">
                        <label for="question" class="form-label">Question *</label>
                        <Field id="question" v-slot="{field, meta}" v-model="question" name="question">
                            <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text" placeholder="e.g. How are you feeling today?">
                        </Field>
                        <ErrorMessage name="question" class="invalid-feedback" />
                    </div>
                    <div class="form-group py-2">
                        <label for="className" class="form-label">Class Name *</label>
                        <Field id="className" v-slot="{value, handleChange, meta}" v-model="className" name="className">
                            <vue-multiselect :model-value="value" :options="classOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                        </Field>
                        <ErrorMessage name="className" class="invalid-feedback" />
                    </div>
                    <div class="row py-2">
                        <div class="form-group col">
                            <label for="status" class="form-label">Status *</label>
                            <Field id="status" v-slot="{value, handleChange, meta}" v-model="status" name="status">
                                <vue-multiselect :model-value="value" :options="statusOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                            </Field>
                            <ErrorMessage name="status" class="invalid-feedback" />
                        </div>
                        <div class="form-group col">
                            <label for="responseType" class="form-label">Response Type *</label>
                            <Field id="responseType" v-slot="{value, handleChange, meta}" v-model="responseType" name="responseType">
                                <vue-multiselect :model-value="value" :options="responseTypeOptions" open-direction="bottom" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                            </Field>
                            <ErrorMessage name="responseType" class="invalid-feedback" />
                        </div>
                    </div>
                    <div v-if="responseType === 'Multiple Choice' || responseType === 'Single Choice'" class="row py-2">
                        <div class="form-group col">
                            <label for="numOptions" class="form-label">Number of options *</label>
                            <input id="numOptions" v-model="numOptions" name="numOptions" type="range" class="form-range" :min="2" :step="1" :max="5">
                            <span class="form-text">Selected: {{numOptions}}</span>
                        </div>
                    </div>
                    <button type="submit" class="btn btn-primary">Create</button>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
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
        const name = ref('');
        const className = ref(null);
        const responseType = ref(null);
        const status = ref(null);
        const question = ref('');
        const numOptions = ref(4);

        const classSchema = computed(() => yup.object({
            name: yup.string().required('Please enter a name'),
        }));
        const questionSchema = computed(() => yup.object({
            className: yup.string().required('Please select a class').typeError('Please select a class'),
            question: yup.string().required('Please enter a question'),
            responseType: yup.string().required('Please select a response type').typeError('Please select a response type'),
            status: yup.string().required('Please select a status').typeError('Please select a status'),
        }));

        const addClass = () => {
            console.log(`Adding class ${name.value}`);
        };
        const addQuestion = () => {
            console.log(`Adding question for class ${className.value}`);
        };

        return {
            addClass,
            addQuestion,
            className,
            classSchema,
            classOptions: computed(() => store.state.classPeriods),
            mode: ref('class'),
            name,
            numOptions,
            question,
            questionSchema,
            responseType,
            responseTypeOptions: ['Single Choice', 'Multiple Choice', 'Free Response'],
            status,
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
