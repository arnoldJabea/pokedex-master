import './assets/main.css'

import { createApp } from 'vue'
import App from './App.vue'
import WelcomePage from "@/components/WelcomePage.vue";
import PokemonCardList from "@/components/pokemon/PokemonCardList.vue";
import { createRouter, createWebHistory } from 'vue-router';
import MyDeck from "@/components/deck/MyDeck.vue";
import store from "@/store/index.js";

const routes = [
    { path: '/', name: 'main', component: WelcomePage},
    { path: '/pokemon-list', name: 'pokemon-list', component: PokemonCardList },
    { path: '/my-deck', name: 'my-deck', component: MyDeck },
];

const router = createRouter({
    history: createWebHistory(),
    routes
});

const app = createApp(App);
app.use(router);
// Use the Vuex store
app.use(store);
app.mount('#app')
