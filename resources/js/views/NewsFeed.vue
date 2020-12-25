<template>
    <div class="flex flex-col items-center py-4">
        <NewPost />

        <p v-if="postAllStatus">Loading posts...</p>
        <Post
            v-else
            v-for="post in postAlls.data"
            :key="post.data.post_id"
            :post="post"
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

        const postAlls = computed(() => {
            return store.getters.postAlls;
        });
        const postAllStatus = computed(() => {
            return store.getters.postAllStatus;
        });

        onMounted(async () => {
            await store.dispatch("fetchAllPosts");
        });

        return { postAlls, postAllStatus };
    },
};
</script>

<style></style>
