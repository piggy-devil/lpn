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
        try {
            const { data } = await axios.get('/api/auth-user');
            commit('setAuthUser', data);
        } catch (err) {
            console.log('Unable to fetch auth user');
        }
    }
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