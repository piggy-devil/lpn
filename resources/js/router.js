import { createRouter, createWebHistory } from "vue-router";
// import Start from './views/Start.vue'
import NewsFeed from './views/NewsFeed'

const routes = [
    { path: "/", name: 'home', component: NewsFeed },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;