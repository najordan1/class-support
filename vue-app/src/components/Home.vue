<template>
    <div class="row justify-content-center">
        <div class="col-12 col-sm-6">
            <div class="card">
                <div class="card-header">
                    <ul class="nav nav-tabs card-header-tabs">
                        <li class="nav-item">
                            <div :class="['nav-link', {'active': mode === 'student'}]" v-on:click="mode = 'student'">
                                Student Log-in
                            </div>
                        </li>
                        <li class="nav-item">
                            <div :class="['nav-link', {'active': mode === 'professor'}]" v-on:click="mode = 'professor'">
                                Professor Log-in
                            </div>
                        </li>
                    </ul>
                </div>
                <Form v-show="mode === 'student'" novalidate autocomplete="off" :validation-schema="studentSchema" v-on:submit="submitStudent">
                    <div class="card-body">
                        <div class="form-group py-2">
                            <label for="name">Display Name</label>
                            <Field id="name" v-slot="{field, meta}" v-model="displayName" name="name">
                                <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="text" placeholder="e.g. Danny">
                            </Field>
                            <ErrorMessage name="name" class="invalid-feedback" />
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Go</button>
                    </div>
                </Form>
                <Form v-show="mode === 'professor'" novalidate autocomplete="off" :validation-schema="professorSchema" v-on:submit="login">
                    <div class="card-body">
                        <div class="form-group py-2">
                            <label for="password">Password</label>
                            <Field id="password" v-slot="{field, meta}" v-model="displayName" name="password">
                                <input v-bind="field" :class="['form-control', {'is-invalid': meta.touched && !meta.valid}]" type="password">
                            </Field>
                            <ErrorMessage name="password" class="invalid-feedback" />
                        </div>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="submit" class="btn btn-primary">Log in</button>
                    </div>
                </Form>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';
import * as yup from 'yup';
import { Form, Field, ErrorMessage } from 'vee-validate';

export default {
    name: 'home',
    components: {
        Form,
        Field,
        ErrorMessage,
    },
    setup() {
        const store = useStore();
        const router = useRouter();

        const mode = ref('student');
        const displayName = ref('');
        const password = ref('');

        const studentSchema = computed(() => yup.object({
            name: yup.string().required("Please enter a display name"),
        }));
        const professorSchema = computed(() => yup.object({
            // probably a yup.password()??
            password: yup.string().required("Please enter your password"),
        }))

        const submitStudent = () => {
            store.dispatch('setDisplayName', { name: displayName.value });
            router.push({ name: 'student' }); // go to the student page
        };
        const login = () => {
            // TODO: add professor login
            store.dispatch('setDisplayName', { name: 'Hammurabi' });
            router.push({ name: 'professor' }); // go to the professor page
        };

        return {
            displayName,
            mode,
            studentSchema,
            password,
            professorSchema,
            submitStudent,
            login,
        };
    },
};
</script>
<style scoped>
    .nav-link:not(.active) {
        cursor: pointer;
    }
</style>
