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
                <div class="card-body">
                    <form>
                        <div v-if="mode === 'student'">
                            <label for="name" class="form-label">Display Name</label>
                            <input id="name" v-model="displayName" name="name" required type="text" :class="['form-control', {'is-invalid': needsValidation && !displayName.length}]">
                            <div class="invalid-feedback">
                                Please enter a display name.
                            </div>
                        </div>
                        <div v-else-if="mode === 'professor'">
                            <label for="username" class="form-label">Password</label>
                            <input id="password" v-model="password" required name="password" type="password" :class="['form-control', {'is-invalid': needsValidation && !password.length}]">
                            <div class="invalid-feedback">
                                Please enter your password.
                            </div>
                        </div>
                    </form>
                </div>
                <div class="card-footer d-flex justify-content-end">
                    <button type="submit" class="btn btn-primary" v-on:click="submit">Go</button>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';
import { useStore } from 'vuex';
import { useRouter } from 'vue-router';

export default {
    name: 'home',
    setup() {
        const store = useStore();
        const router = useRouter();

        const mode = ref('student');
        const needsValidation = ref(false);
        const displayName = ref('');
        const password = ref('');

        const submit = () => {
            needsValidation.value = true;
            // Return if invalid and display an error message
            if ((mode.value === 'student' && !displayName.value.length) || (mode.value === 'professor' && !password.value.length)) return;
            
            if (mode.value === 'student') {
                store.dispatch('setDisplayName', { name: displayName.value });
                // go to the student page
                router.push({ name: 'student' });
            } else {
                // TODO: add professor login
                store.dispatch('setDisplayName', { name: 'Hammurabi' });
                // go to the professor page
                router.push({ name: 'professor' });
            }            
        };

        return {
            displayName,
            mode,
            needsValidation,
            password,
            submit,
        };
    },
};
</script>
<style scoped>
    .nav-link:not(.active) {
        cursor: pointer;
    }
</style>
