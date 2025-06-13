import { createApp } from 'vue';
import App from './App.vue';
import vuetify from './plugins/vuetify';
import { createPinia } from 'pinia';
import router from './router';
import i18n from './locales';
import './assets/styles/main.scss';
import 'animate.css';
import '@/assets/animations/transitions.scss'; // <-- Añade esta línea

const pinia = createPinia();
const app = createApp(App);

app.use(vuetify);
app.use(pinia);
app.use(router);
app.use(i18n);
app.mount('#app');