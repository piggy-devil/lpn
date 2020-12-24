<template>
    <div class="flex flex-col flex-1 h-screen overflow-y-hidden">
        <Nav />
        <div class="flex overflow-y-hidden flex-1">
            <Sidebar />
            <div class="overflow-x-hidden w-2/3">
                <router-view></router-view>
            </div>
        </div>
    </div>
</template>

<script>
import Nav from "./Nav";
import Sidebar from "./Sidebar";
import { useStore } from "vuex";
import { onMounted, watch } from "vue";
import { useRoute } from "vue-router";

export default {
    name: "App",

    setup() {
        const store = useStore();
        const route = useRoute();

        store.dispatch('setPageTitle', route.meta.title);

        onMounted(() => {
            store.dispatch("fetchAuthUser");
        });

        watch(route, (to, from) => {
            store.dispatch("setPageTitle", to.meta.title);
        });
    },

    components: {
        Nav,
        Sidebar,
    },

    // mounted() {
    //     this.$store.dispatch('fetchAuthUser');
    // }
};
</script>

<style></style>
