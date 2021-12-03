<template>
    <div>
        <div class="row justify-content-center">
            <div class="col-xs-12 col-sm-4">
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
                        <li v-for="(question, index) in questions" :key="index" class="list-group-item">{{question}}</li>
                    </ul>
                </div>
            </div>
            <div class="col-xs-12 col-sm-8">
                <div class="card">
                    <div class="card-header">
                        I feel like the question itself could go here?
                    </div>
                    <div class="card-body">
                        Here is where you can answer, see graphs and stuff idk
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

        watch(classPeriod, (to, from) => {
            if (to && to !== from) store.dispatch('getQuestions', { classPeriod: classPeriod.value });
        });

        return { 
            name: computed(() => store.state.displayName),
            classPeriod,
            classOptions: computed(() => store.state.classPeriods),
            questions: computed(() => store.state.questions),
        };
    },
};
</script>
