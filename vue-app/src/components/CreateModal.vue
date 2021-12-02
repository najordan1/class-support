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
                <vue-multiselect id="selectClass" v-model="classPeriod" :options="classOptions" placeholder="Select a class period" />
            </div>
            <div class="modal-footer">
                <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
                <button type="button" class="btn btn-primary">Create</button>
            </div>
        </div>
    </div>
</template>

<script>
import { ref, computed } from 'vue';
import { useStore } from 'vuex';

export default {
    name: 'create-modal',
    setup() {
        const store = useStore();
        return {
            classOptions: computed(() => store.state.classPeriods),
            classPeriod: ref(null),
            mode: ref('class')
        };
    },
};
</script>

<style scoped>
    .nav-link:not(.active) {
        cursor: pointer;
    }
</style>
