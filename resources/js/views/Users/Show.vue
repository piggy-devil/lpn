<template>
    <div class="flex flex-col items-center">
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden">
                <img
                    src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?region=0,0,1920,1080"
                    alt="user backgroud image"
                    class="object-cover w-full"
                />
            </div>
            <div
                class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12 z-20"
            >
                <div class="w-32">
                    <img
                        src="https://image.freepik.com/free-photo/mand-holding-cup_1258-340.jpg"
                        alt="profile image for user"
                        class="object-cover w-32 h-32 bordor-4 border-gray-200 rounded-full shadow-lg"
                    />
                </div>
                <p v-if="userStatus">Loading posts...</p>
                <p v-else class="text-2xl text-gray-100 ml-4">
                    {{ user.data.attributes.name }}
                </p>
            </div>

            <div
                class="absolute flex items-center bottom-0 right-0 mb-4 mr-12 z-20"
            >
                <button v-if="friendButtonText" class="py-1 px-3 bg-gray-400 rounded"
                    @click="store.dispatch('sendFriendRequest', route.params.userId)">
                    {{friendButtonText}}
                </button>
            </div>
        </div>
        <p v-if="postStatus">Loading posts...</p>
        <Post
            v-else
            v-for="post in posts.data"
            :key="post.data.post_id"
            :post="post"
        />
    </div>
</template>

<script>
import { useRoute } from "vue-router";
import { useStore } from "vuex";
import { onMounted, computed } from "vue";
import Post from "../../components/Post";

export default {
    components: {
        Post,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        const user = computed(() => {
            return store.getters.user;
        });
        const userStatus = computed(() => {
            return store.getters.userStatus;
        });

        const posts = computed(() => {
            return store.getters.posts;
        });
        const postStatus = computed(() => {
            return store.getters.postStatus;
        });

        const friendButtonText = computed(() => {
            return store.getters.friendButtonText;
        });

        onMounted(async () => {
            await store.dispatch("fetchUser", route.params.userId);
            await store.dispatch("fetchPosts", route.params.userId);
        });

        return { user, userStatus, posts, postStatus, store, route, friendButtonText };
    },
};
</script>

<style></style>
