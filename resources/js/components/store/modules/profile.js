import axios from "../../../plugins/axios";

const state = {
    user: null,
    userStatus: null,
    posts: null,
    postsStatus: null,
};

const getters = {
    user: state => {
        return state.user;
    },
    posts: state => {
        return state.posts;
    },
    status: state => {
        return {
            user: state.userStatus,
            posts: state.postsStatus
        }
    },
    // friendButtonText: state => {
    //     return state.friendButtonText;
    // },
    friendButtonText: (state, getters, rootState) => {
        if (state.user.data.user_id === rootState.User.authUser.data.user_id) {
            return '';
        } else if (getters.friendship === null) {
            console.log('Add Friend');
            return 'Add Friend';
        } else if (getters.friendship.data.attributes.confirmed_at === null
            && getters.friendship.data.attributes.friend_id !== rootState.User.authUser.data.user_id) {
                console.log('Pending Friend Request');
            return 'Pending Friend Request'
        } else if (getters.friendship.data.attributes.confirmed_at !== null) {
            console.log('null');
            return 'Friended';
        }
        console.log('Accept');
        return 'Accept';
    },
    friendship: state => {
        return state.user.data.attributes.friendship;
    }
};

const actions = {
    async fetchUser({commit, dispatch}, userId) {
        commit('setUserStatus', 'loading');
        try {
            const { data } = await axios.get('/api/users/' + userId);
            commit('setUser', data);
            commit('setUserStatus', 'success');
            // dispatch('setFriendButton', userId)
        } catch (err) {
            console.log("Unable to fetch user");
            commit('setUserStatus', 'error');
        }
    },
    async fetchUserPosts({commit, dispatch}, userId) {
        commit('setPostsStatus', 'loading');

        try {
            const { data } = await axios.get('/api/users/' + userId + '/posts');
            commit('setPosts', data);
            commit('setPostsStatus', 'success');
        } catch (err) {
            console.log("Unable to fetch user posts");
            commit('setPostsStatus', 'error');
        }
    },
    async sendFriendRequest({commit, getters}, friendId) {
        // await commit('setButtonText', 'Loading');
        if (getters.friendButtonText !== 'Add Friend') {
            return;
        }
        try {
            const { data } = await axios.post('/api/friend-request', { 'friend_id': friendId })
            console.log(data, 'sendFriendRequest');
            await commit('setUserFriendship', data);
            // await commit('setButtonText', 'Pending Friend Request');
        } catch (err) {
            // await commit('setButtonText', 'Add Friend');
        }
    },
    async acceptFriendRequest({commit, state}, userId) {
        // await commit('setButtonText', 'Loading');

        try {
            const { data } = await axios.post('/api/friend-request-response', { 'user_id': userId, 'status': 1 })
            await commit('setUserFriendship', data);
            // await commit('setButtonText', 'Pending Friend Request');
        } catch (err) {
            await commit('setButtonText', 'Add Friend');
        }
    },
    async ignoreFriendRequest({commit, state}, userId) {
        // await commit('setButtonText', 'Loading');
        console.log(userId, 'userId');
        try {
            await axios.delete('/api/friend-request-response/delete', { data: { 'user_id': userId } })
            await commit('setUserFriendship', null);
            // await commit('setButtonText', 'Pending Friend Request');
        } catch (err) {
            // await commit('setButtonText', 'Add Friend');
        }
    },
    // async setFriendButton({commit, getters}, userId) {
    //     if (getters.friendship === null) {
    //         await commit('setButtonText', 'Add Friend');
    //     } else if (getters.friendship.data.attributes.confirmed_at === null 
    //         && getters.friendship.data.attributes.friend_id !== userId) {
    //         await commit('setButtonText', 'Pending Friend Request');
    //     } else {
    //         await commit('setButtonText', 'Accept');
    //     }
    // }
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
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostsStatus(state, status) {
        state.postsStatus = status;
    },
    setButtonText(state, text) {
        state.friendButtonText = text;
    },
};

export default {
    state, getters, actions, mutations
}