<template>
    <div class="flex flex-col items-center py-4">
        <NewPost />

        <p v-if="newsStatus === 'loading'">Loading posts...</p>
        <Post
            v-else-if="posts"
            v-for="(post, postKey) in posts.data"
            :key="postKey"
            :post="post"
            :postKey="postKey"
        />
    </div>
</template>

<script>
import NewPost from "../components/NewPost";
import Post from "../components/Post";
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";

export default {
    name: "NewsFeed",

    components: {
        NewPost,
        Post,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        const posts = computed(() => {
            return store.getters.posts;
        });

        const newsStatus = computed(() => {
            return store.getters.newsStatus;
        });

        const authUser = computed( function() {
            return store.getters.authUser;
        });

        onMounted(async () => {
            await store.dispatch("fetchNewsPosts");
        });

        return { posts, newsStatus, authUser };
    },
};
</script>

<style></style>
