import axios from "../../../plugins/axios";

const state = {
    user: null,
    userStatus: null,
};

const getters = {
    user: state => {
        return state.user;
    },
    status: state => {
        return {
            user: state.userStatus,
        }
    },
    friendship: state => {
        return state.user.data.attributes.friendship;
    },
    friendButtonText: (state, getters, rootState) => {
        if (rootState.User.authUser) {
            if (state.user.data.user_id === rootState.User.authUser.data.user_id) {
                return '';
            }
        }
        
        if (getters.friendship === null) {
            return 'Add Friend';
        } else if (getters.friendship.data.attributes.confirmed_at === null
            && getters.friendship.data.attributes.friend_id !== rootState.User.authUser.data.user_id) {
            return 'Pending Friend Request'
        } else if (getters.friendship.data.attributes.confirmed_at !== null) {
            return 'Friended';
        }
        return 'Accept';
    },
};

const actions = {
    async fetchUser({commit, dispatch}, userId) {
        commit('setUserStatus', 'loading');
        try {
            const { data } = await axios.get('/api/users/' + userId);
            commit('setUser', data);
            commit('setUserStatus', 'success');
        } catch (err) {
            console.log("Unable to fetch user");
            commit('setUserStatus', 'error');
        }
    },
    async sendFriendRequest({commit, getters}, friendId) {
        if (getters.friendButtonText !== 'Add Friend') {
            return;
        }
        try {
            const { data } = await axios.post('/api/friend-request', { 'friend_id': friendId })
            console.log(data, 'sendFriendRequest');
            await commit('setUserFriendship', data);

        } catch (err) {

        }
    },
    async acceptFriendRequest({commit, state}, userId) {

        try {
            const { data } = await axios.post('/api/friend-request-response', { 'user_id': userId, 'status': 1 })
            await commit('setUserFriendship', data);
        } catch (err) {

        }
    },
    async ignoreFriendRequest({commit, state}, userId) {
        try {
            await axios.delete('/api/friend-request-response/delete', { data: { 'user_id': userId } })
            await commit('setUserFriendship', null);
        } catch (err) {

        }
    },
};
const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setUserFriendship(state, friendship) {
        state.user.data.attributes.friendship = friendship;
    },
    setUserStatus(state, status) {
        state.userStatus = status;
    },
};

export default {
    state, getters, actions, mutations
}