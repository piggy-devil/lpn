import axios from "../../../plugins/axios";

const state = {
    user: null,
    userStatus: true,
    posts: null,
    postStatus: true,
    postAlls: null,
    postAllStatus: true,
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
};

const actions = {
    async fetchUser({commit, state}, userId) {
        try {
            const { data } = await axios.get('/api/users/' + userId);
            commit('setUser', data);
            commit('setUserStatus', false);
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
};

export default {
    state, getters, actions, mutations
}