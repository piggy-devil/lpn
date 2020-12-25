import axios from "../../../plugins/axios";

const state = {
    user: null,
    userStatus: true,
    posts: null,
    postStatus: true,
    postAlls: null,
    postAllStatus: true,
    friendButtonText: null,
};

const getters = {
    user: state => {
        return state.user;
    },
    userStatus: state => {
        return state.userStatus;
    },
    posts: state => {
        return state.posts;
    },
    postStatus: state => {
        return state.postStatus;
    },
    postAlls: state => {
        return state.postAlls;
    },
    postAllStatus: state => {
        return state.postAllStatus;
    },
    friendButtonText: state => {
        return state.friendButtonText;
    },
    friendship: state => {
        return state.user.data.attributes.friendship;
    }
};

const actions = {
    async fetchUser({commit, dispatch}, userId) {
        try {
            const { data } = await axios.get('/api/users/' + userId);
            commit('setUser', data);
            commit('setUserStatus', false);
            dispatch('setFriendButton')
        } catch (err) {
            console.log("Unable to fetch user");
        }
    },
    async fetchPosts({commit, state}, userId) {
        try {
            const { data } = await axios.get('/api/users/' + userId + '/posts');
            commit('setPosts', data);
            commit('setPostStatus', false);
        } catch (err) {
            console.log("Unable to fetch posts");
        }
    },
    async fetchAllPosts({commit, state}) {
        try {
            const { data } = await axios.get('/api/posts/');
            commit('setAllPosts', data);
            commit('setAllPostStatus', false);
        } catch (err) {
            console.log("Unable to fetch all posts");
        }
    },
    async sendFriendRequest({commit, state}, friendId) {
        await commit('setButtonText', 'Loading');

        try {
            const { data } = await axios.post('/api/friend-request', { 'friend_id': friendId })
            await commit('setButtonText', 'Pending Friend Request');
        } catch (err) {
            await commit('setButtonText', 'Add Friend');
        }
    },
    async setFriendButton({commit, getters}) {
        if (getters.friendship === null) {
            await commit('setButtonText', 'Add Friend');
        } else if (getters.friendship.data.attributes.confirmed_at === null) {
            await commit('setButtonText', 'Pending Friend Request');
        }
    }
};
const mutations = {
    setUser(state, user) {
        state.user = user;
    },
    setUserStatus(state, status) {
        state.userStatus = status;
    },
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostStatus(state, status) {
        state.postStatus = status;
    },
    setAllPosts(state, postAlls) {
        state.postAlls = postAlls;
    },
    setAllPostStatus(state, postAllStatus) {
        state.postAllStatus = postAllStatus;
    },
    setButtonText(state, text) {
        state.friendButtonText = text;
    },
};

export default {
    state, getters, actions, mutations
}