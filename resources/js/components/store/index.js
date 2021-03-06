import { createStore } from "vuex";
import User from './modules/user'
import Title from './modules/title'
import Profile from './modules/profile'
import Posts from './modules/posts'

const store = createStore({
    modules: {
        User, Title, Profile, Posts
    },
//   state() {
//     return {
//       isLoggedIn: false,
//       authUser: {},
//       isLoginOpen: false,
//     };
//   },
//   mutations: {
//     setIsLoggedIn(state, payload) {
//       state.isLoggedIn = payload;
//     },
//     setAuthUser(state, payload) {
//       state.authUser = payload;
//     },
//     setLoginModal(state, payload) {
//       state.isLoginOpen = payload;
//     },
//   },
});

export default store;
