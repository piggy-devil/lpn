<template>
    <div>
        <img
            src="https://lumiere-a.akamaihd.net/v1/images/sa_pixar_virtualbg_coco_16x9_9ccd7110.jpeg?region=0,0,1920,1080"
            alt="user backgroud image"
            ref="userImage"
            class="object-cover w-full"
        />
    </div>
</template>

<script>
import Dropzone from "dropzone";
// import { ref, onMounted, computed } from 'vue';

export default {
    name: "UploadableImage",

    data() {
        return {
            dropzone: null,
        };
    },

    props: ["imageWidth", "imageHeight", "location"],

    mounted() {
        this.dropzone = new Dropzone(this.$refs.userImage, this.settings);
    },

    computed: {
        settings() {
            return {
                paramName: "image",
                url: "/api/user-images",
                acceptedFiles: "image/*",
                params: {
                    width: this.imageWidth,
                    height: this.imageHeight,
                    location: this.location,
                },
                headers: {
                    "X-CSRF-TOKEN": document.head.querySelector(
                        "meta[name=csrf-token]"
                    ).content,
                },
                success: (e, res) => {
                    alert("uploaded!");
                },
            };
        },
    },
};
</script>

<style></style>
