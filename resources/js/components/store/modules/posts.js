import axios from "../../../plugins/axios";

const state = {
    newsPosts: null,
    newsPostsStatus: null,
    postMessage: '',
};

const getters = {
    newsPosts: state => {
        return state.newsPosts;
    },
    newsStatus: state => {
        // return { 
        //     newsPostsStatus: state.newsPostsStatus,
        // }
        return state.newsPostsStatus;
    },
    postMessage: state => {
        return state.postMessage;
    }
};

const actions = {
    async fetchNewsPosts({commit, state}) {
        commit('setPostsStatus', 'loading');
        try {
            const { data } = await axios.get('/api/posts/');
            commit('setPosts', data);
            commit('setPostsStatus', 'success');
        } catch (err) {
            console.log("Unable to fetch news posts");
            commit('setPostsStatus', 'error');
        }
    },
    async postMessage({commit, state}) {
        commit('setPostsStatus', 'loading');
        try {
            const { data } = await axios.post('/api/posts', { body: state.postMessage });
            commit('pushPost', data);
            commit('updateMessage', '');
            commit('setPostsStatus', 'success');
        } catch (err) {
            console.log("Unable to postMessage");
            commit('setPostsStatus', 'error');
        }
    },
    async likePost({commit, state}, dat) {
        try {
            const { data } = await axios.post('/api/posts/'+ dat.postId + '/like');
            commit('pushLikes', { likes: data, postKey: dat.postKey });
        } catch (err) {
            console.log("Unable to Like Post");
        }
    }
};
const mutations = {
    setPosts(state, posts) {
        state.newsPosts = posts;
    },
    setPostsStatus(state, status) {
        state.newsPostsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.newsPosts.data.unshift(post);
    },
    pushLikes(state, data) {
        state.newsPosts.data[data.postKey].data.attributes.likes = data.likes;
    },
};

export default {
    state, getters, actions, mutations
}