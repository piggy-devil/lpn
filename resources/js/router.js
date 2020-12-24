import { createRouter, createWebHistory } from "vue-router";
// import Start from './views/Start.vue'
import NewsFeed from "./views/NewsFeed";
import UserShow from "./views/Users/Show";

const routes = [
    {
        path: "/",
        name: "home",
        component: NewsFeed,
        meta: { title: "News Feed" },
    },
    {
        path: "/users/:userId",
        name: "user.show",
        component: UserShow,
        meta: { title: "Profile" },
    },
];

const router = createRouter({
    history: createWebHistory(),
    routes,
});

export default router;
