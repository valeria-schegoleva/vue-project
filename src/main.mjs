
import { createApp } from 'vue';
import App from './App.vue';
import UsersTable from './components/UsersTable.vue';
import SearchForm from './components/SearchForm.vue';
import ClearFilters from './components/ClearFilters.vue';
import './assets/css/normalize.css';
import './assets/css/main.css';

const app = createApp(App);
app.component('UsersTable', UsersTable);
app.component('SearchForm', SearchForm);
app.component('ClearFilters', ClearFilters);

app.mount('#app');

