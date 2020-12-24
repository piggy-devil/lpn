import { createStore } from "vuex";
import User from './modules/user'

const store = createStore({
    modules: {
        User,
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
