<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="editModalLabel">Edit: {{question.question}}</h5>
            </div>
            <div class="modal-body">
                <Form v-if="mode === 'edit'" novalidate autocomplete="off" :validation-schema="validationSchema" v-on:submit="submit">
                    <div class="form-group py-2">
                        <label for="title" class="form-label">Question Title *</label>
                        <Field id="title" v-slot="{field, meta}" v-model="title" name="title">
                            <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text" placeholder="e.g. How are you feeling today?">
                        </Field>
                        <ErrorMessage name="title" class="invalid-feedback" />
                    </div>
                    <div class="form-group py-2">
                        <label for="status" class="form-label">Status *</label>
                        <Field id="status" v-slot="{value, handleChange, meta}" v-model="status" name="status">
                            <vue-multiselect :model-value="value" :options="statusOptions" :class="[{'is-invalid': meta.touched && !meta.valid}]" v-on:update:model-value="handleChange" />
                        </Field>
                        <ErrorMessage name="status" class="invalid-feedback" />
                    </div>
                    <div class="d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Update</button>
                    </div>
                </Form>
                <span v-else>
                    Question successfully updated.
                </span>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, watch, computed, toRefs } from 'vue';
import { useStore } from 'vuex';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'edit-modal',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    props: {
        question: {
            type: Object,
            required: true,
        },
    },
    setup(props) {
        const store = useStore();
        const { question } = toRefs(props);
        const mode = ref('edit');
        const title = ref(null);
        const status = ref(null);
        watch(question, (to, from) => {
            if (to._id && to._id !== from._id) {
                title.value = to.question;
                status.value = to.status;
                mode.value = 'edit';
            }
        }, { immediate: true });

        const validationSchema = computed(() => yup.object({
            title: yup.string().required('This field is required'),
            status: yup.string().required('Please select a status').typeError('Please select a status'),
        }));

        const submit = () => {
            if (status.value !== question.value.status) store.dispatch('updateQuestionStatus', {
                question: question.value._id,
                status: status.value,
            })
            if (title.value !== question.value.question) store.dispatch('updateQuestionTitle', {
                question: question.value._id,
                title: title.value,
            })
            mode.value = 'done';
        };

        return {
            mode,
            status,
            statusOptions: ['Open', 'Closed', 'Hidden'],
            submit,
            title,
            validationSchema,
        };
    },
}
</script>
