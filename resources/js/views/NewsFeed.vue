<template>
  <div class="flex flex-col items-center py-4">
      <NewPost />

      <Post v-for="post in state.posts" :key="post.data.post_id" :post="post"/>
  </div>
</template>

<script>
import NewPost from '../components/NewPost'
import Post from '../components/Post'
import axios from "../plugins/axios";
import { onMounted, reactive } from "vue";

export default {
    setup() {
    const state = reactive({
      posts: [],
    });

    onMounted(async () => {
      const { data } = await axios.get(`/api/posts`);
      state.posts = data.data;
    });

    return { state };
  },
    name: "NewsFeed",

    components: {
        NewPost, Post
    },

    data: () => {
        return {
            posts: [],
        }
    },

    // mounted() { 
    //     axios.get('/api/posts')
    //         .then(res => {
    //             this.posts = res.data;
    //         })
    //         .catch(error => {
    //             console.log('Unable to fetch posts');
    //         });
    // }
}
</script>

<style>

</style>