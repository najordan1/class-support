import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import Multiselect from 'vue-multiselect';
import router from './router';
import store from './store';

const app = createApp(App)
    .use(router)
    .use(store);

app.component('vue-multiselect', Multiselect);

app.mount('#app')
