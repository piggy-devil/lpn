import axios from "../../../plugins/axios";

const state = {
    user: null,
    userStatus: true,
};

const getters = {
    authUser: state => {
        return state;
    }
};

const actions = {
    async fetchAuthUser({commit, state}) {
        const { data } = await axios.get('/api/auth-user');
        commit('setAuthUser', data);
    }
    // fetchAuthUser({commit, state}) {
    //     axios.get('/api/auth-user')
    //         .then( res => {
    //             commit('setAuthUser', res.data);
    //         })
    //         .catch(error => {
    //             console.log('Unable to fetch auth user');
    //         })
    // }
};
const mutations = {
    setAuthUser(state, user) {
        state.user = user;
        state.userStatus = false;
    }
};

export default {
    state, getters, actions, mutations
}