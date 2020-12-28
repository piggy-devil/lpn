import axios from "../../../plugins/axios";

const state = {
    authUser: null,
    authStatus: null,
};

const getters = {
    authUser: state => {
        return state.authUser;
    },
    authStatus: state => {
        return state.authStatus;
    }
};

const actions = {
    async fetchAuthUser({commit, state}) {
        commit('setAuthStatus', 'loading')
        try {
            const { data } = await axios.get('/api/auth-user');
            commit('setAuthUser', data);
            commit('setAuthStatus', 'success')
        } catch (err) {
            commit('setAuthStatus', 'error')
            console.log('Unable to fetch auth user');
        }
    }
};
const mutations = {
    setAuthUser(state, authuser) {
        state.authUser = authuser;
    },
    setAuthStatus(state, status) {
        state.authStatus = status;
    },
};

export default {
    state, getters, actions, mutations
}