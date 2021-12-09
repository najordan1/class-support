<template>
    <div class="modal-dialog">
        <div class="modal-content">
            <div class="modal-header">
                <h5 class="modal-title" id="deleteModalLabel">Delete Question</h5>
                <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
            </div>
            <div class="modal-body">
                <div v-if="mode === 'warning'">
                    Are you sure you wish to delete the question, and all of its responses? This action cannot be undone.
                    <div class="pt-2 d-flex justify-content-end">
                        <button class="btn btn-danger" role="button" v-on:click="deleteQuestion()">Delete</button>
                    </div>
                </div>
                <div v-else>
                    Question removed.
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { ref } from 'vue';

export default {
    name: 'delete-modal',
    emits: ['deleteQuestion'],
    setup(props, { emit }) {
        const mode = ref('warning');
        const deleteQuestion = () => {
            emit('deleteQuestion');
            mode.value = 'done';
        }
        return {
            deleteQuestion,
            mode,
        };
    },
}
</script>
