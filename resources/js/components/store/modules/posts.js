import axios from "../../../plugins/axios";

const state = {
    posts: null,
    postsStatus: null,
    postMessage: '',
};

const getters = {
    posts: state => {
        return state.posts;
    },
    newsStatus: state => {
        // return { 
        //     postsStatus: state.postsStatus,
        // }
        return state.postsStatus;
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
    },
    async commentPost({commit, state}, dat) {
        try {
            const { data } = await axios.post('/api/posts/'+ dat.postId + '/comment', { body: dat.body });
            commit('pushComments', { comments: data, postKey: dat.postKey });
        } catch (err) {
            console.log("Unable to Comment Post");
        }
    },
};
const mutations = {
    setPosts(state, posts) {
        state.posts = posts;
    },
    setPostsStatus(state, status) {
        state.postsStatus = status;
    },
    updateMessage(state, message) {
        state.postMessage = message;
    },
    pushPost(state, post) {
        state.posts.data.unshift(post);
    },
    pushLikes(state, data) {
        state.posts.data[data.postKey].data.attributes.likes = data.likes;
    },
    pushComments(state, data) {
        state.posts.data[data.postKey].data.attributes.comments = data.comments;
    },
};

export default {
    state, getters, actions, mutations
}