import { createApp } from 'vue'
import App from './App.vue'
import 'bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';
import 'vue-multiselect/dist/vue-multiselect.css';
import router from './router';
import store from './store';
import Multiselect from 'vue-multiselect';
import CircleIcon from 'vue-material-design-icons/Circle.vue';

const app = createApp(App)
    .use(router)
    .use(store);

app.component('vue-multiselect', Multiselect);
app.component('circle-icon', CircleIcon);

app.mount('#app')
