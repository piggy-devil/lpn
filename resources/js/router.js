import { createRouter, createWebHistory } from "vue-router";
// import Start from './views/Start.vue'
import NewsFeed from './views/NewsFeed'
import UserShow from './views/Users/Show'

const routes = [
    { path: "/", name: 'home', component: NewsFeed },
    { path: "/users/:userId", name: 'user.show', component: UserShow },
  ];
  
  const router = createRouter({
    history: createWebHistory(),
    routes,
  });

  export default router;