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
                    <div class="card-body">
                        <span>Questions will appear here</span>
                    </div>
                    <div class="card-footer d-flex justify-content-end">
                        <button type="button" class="btn btn-primary">Add</button>
                    </div>
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
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'professor-view',
    setup() {
        const store = useStore();
        return { 
            name: computed(() => store.state.displayName),
            classPeriod: ref(null), // vue-multiselect needs null to start usually
            classOptions: ['Class 15: B plus trees', 'Class 16: HW4 walkthrough'],
        };
    },
};
</script>
