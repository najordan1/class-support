<template>
    <nav class="navbar navbar-dark bg-dark">
        <div class="container-fluid">
            <span class="navbar-brand mb-0 h1">Class Support</span>
            <span v-if="$route.name !== 'home'" class="navbar-text">Hello, {{displayName}}</span>
        </div>
    </nav>
</template>

<script>
import { computed } from 'vue';
import { useStore } from 'vuex';
export default {
    name: 'navbar',
    setup() {
        const store = useStore();
        return {
            displayName: computed(() => store.state.displayName)
        };
    },
};
</script>
