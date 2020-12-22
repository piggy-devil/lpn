import { createRouter, createWebHistory } from "vue-router";
// import Start from './views/Start.vue'
import App from './components/App'

const routes = [
    { path: "/", name: 'home', component: App },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;