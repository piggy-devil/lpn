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
                <p v-if="loading">Loading posts...</p>
                <p v-else class="text-2xl text-gray-100 ml-4">{{ state.posts.attributes.name }}</p>
            </div>
        </div>
    </div>
</template>

<script>
import { onMounted, reactive, ref } from "vue";
import axios from "../../plugins/axios";

// How to use route interceptor inside the component
import { useRoute } from "vue-router";

export default {
    setup() {
        const route = useRoute();
        const state = reactive({
            posts: [],
            user: {},
        });
        const loading = ref(true);

        onMounted(async () => {
            try {
                const { data } = await axios.get('/api/users/' + route.params.userId);
                state.posts = data.data;
                loading.value = false;
            } catch (err) {
                console.log("Unable to fetch posts");
                loading.value = false;
            };

            async () => {
                const { dat } = await axios.get('/api/users/' + route.params.userId);
                state.user = dat.data;
            }
        });
        // In-component routing
        // const router = useRouter();
        // const route = useRoute();
        // const state = reactive({
        //     user: [],
        //     posts: [],
        // });
        // const loading = ref(true);

        // onMounted(async () => {
            // try {
            //     const { data } = await axios.get(
            //         "/api/users/" + route.params.userId
            //     );
            //     state.user = data.data;
            //     console.log(data.data);

            // } catch (error) {
            //     console.log("Unable to fetch the user from the server.");
            // } finally {
                
            // }
            // try {
            //     const { dataPosts } = await axios.get.get("/api/users/" + route.params.userId + "/posts");
            //     console.log(dataPosts);
            //     state.posts = dataPosts;

            // } catch (error) {
            //     console.log("Unable to fetch the user from the server.");
            // } finally {
                
            // }
            // const { dUser } = await axios.get("/api/users/"+ route.params.userId);
            // const { dPost } = await axios.get(`/api/users/`+ route.params.userId + `/post`);
            // loading.value = false;
            // console.log(dUser.data);
            // state.user = dUser.data;
            // state.posts = dPost.data;

        // });

        return { state, route, loading };
    },
    data: () => {
        return {
            posts: [],
            user: [],
        };
    },

    computed: {
        datatest() {
            // return this.user.data.attributes.name;
            return "muupa";
        },
    },

    mounted() {
        axios
            .get("/api/users/" + this.$route.params.userId)
            .then((res) => {
                this.user = res.data;
            })
            .catch((error) => {
                console.log("Unable to fetch user");
            });
        axios
            .get("/api/users/" + this.$route.params.userId + "/posts")
            .then((res) => {
                this.posts = res.data;
            })
            .catch((error) => {
                console.log("Unable to fetch posts");
            });
    },
};
</script>

<style></style>
