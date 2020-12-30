<template>
    <div
        v-if="userStatus === 'success' && user"
        class="flex flex-col items-center"
    >
        <div class="relative mb-8">
            <div class="w-100 h-64 overflow-hidden z-10">
                <UploadableImage
                    image-width="1500"
                    image-height="300"
                    alt="user backgroud image"
                    classes="object-cover w-full"
                    location="cover"
                    :user-image="user.data.attributes.cover_image"
                />
            </div>
            <div
                class="absolute flex items-center bottom-0 left-0 -mb-8 ml-12 z-20"
            >
                <div class="w-32">
                    <UploadableImage
                        image-width="1500"
                        image-height="300"
                        alt="profile image for user"
                        classes="object-cover w-32 h-32 bordor-4 border-gray-200 rounded-full shadow-lg"
                        location="profile"
                        :user-image="user.data.attributes.profile_image"
                    />
                </div>
                <p class="text-2xl text-gray-100 ml-4">
                    {{ user.data.attributes.name }}
                </p>
            </div>

            <div
                v-if="friendButtonText"
                class="absolute flex items-center bottom-0 right-0 mb-4 mr-12 z-20"
            >
                <button
                    v-if="friendButtonText !== 'Accept'"
                    class="py-1 px-3 bg-gray-400 rounded"
                    @click="
                        store.dispatch('sendFriendRequest', route.params.userId)
                    "
                >
                    {{ friendButtonText }}
                </button>
                <button
                    v-if="friendButtonText === 'Accept'"
                    class="mr-2 py-1 px-3 bg-blue-500 rounded"
                    @click="
                        store.dispatch(
                            'acceptFriendRequest',
                            route.params.userId
                        )
                    "
                >
                    Accept
                </button>
                <button
                    v-if="friendButtonText === 'Accept'"
                    class="py-1 px-3 bg-gray-400 rounded"
                    @click="
                        store.dispatch(
                            'ignoreFriendRequest',
                            route.params.userId
                        )
                    "
                >
                    Ignore
                </button>
            </div>
        </div>
        <p v-if="postsStatus === 'loading'">Loading posts...</p>
        <div v-else-if="posts && posts.length < 1">
            No posts found. Get Started...
        </div>
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
import { useRoute } from "vue-router";
import { useStore, mapGetters } from "vuex";
import { onMounted, computed } from "vue";
import Post from "../../components/Post";
import UploadableImage from "../../components/UploadableImage";

export default {
    components: {
        Post,
        UploadableImage,
    },
    setup() {
        const route = useRoute();
        const store = useStore();

        const user = computed(() => {
            return store.getters.user;
        });

        const posts = computed(() => {
            return store.getters.posts;
        });

        const userStatus = computed(() => {
            return store.getters.status.user;
        });

        const postsStatus = computed(() => {
            return store.getters.newsStatus;
        });

        const friendButtonText = computed(() => {
            return store.getters.friendButtonText;
        });

        onMounted(async () => {
            await store.dispatch("fetchUser", route.params.userId);
            await store.dispatch("fetchUserPosts", route.params.userId);
        });

        return {
            user,
            posts,
            userStatus,
            postsStatus,
            store,
            route,
            friendButtonText,
        };
    },
    computed: {
        ...mapGetters({
            authUser: "authUser",
        }),
    },

    mounted() {
        this.$store.dispatch("fetchAuthUser");
    },
};
</script>

<style></style>
