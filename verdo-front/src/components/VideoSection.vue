<!-- VideoSection.vue -->
<template>
    <div class="bg-white pt-16" ref="videoSection">
        <div class="max-w-[2000px] mx-auto px-4 sm:px-6 lg:px-8">
            <div class="relative rounded-2xl overflow-hidden shadow-2xl transform transition-all duration-700 delay-300 
                aspect-video w-[95%] mx-auto"
                :class="isVideoVisible ? 'translate-y-0 opacity-100 scale-100' : 'translate-y-10 opacity-0 scale-95'">

                <!-- Video Player -->
                <iframe
                    src="https://player.cloudinary.com/embed/?cloud_name=daav4neoy&public_id=verdolive_1_tdqviu&profile=player-verdo"
                    width="640" height="360" style="height: auto; width: 100%; aspect-ratio: 640 / 360;"
                    allow="autoplay; fullscreen; encrypted-media; picture-in-picture" allowfullscreen
                    frameborder="0"></iframe>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'VideoSection',
    data() {
        return {
            isVideoVisible: false,
            isPlaying: false,
            observer: null,
        }
    },
    mounted() {
        this.setupIntersectionObserver();
    },
    beforeDestroy() {
        if (this.observer) {
            this.observer.disconnect();
        }
    },
    methods: {
        setupIntersectionObserver() {
            this.observer = new IntersectionObserver(
                (entries) => {
                    entries.forEach(entry => {
                        if (entry.isIntersecting) {
                            this.isVideoVisible = true;
                            this.observer.disconnect();
                        }
                    });
                },
                {
                    threshold: 0.2
                }
            );

            this.observer.observe(this.$refs.videoSection);
        },
        playVideo() {
            const video = this.$refs.videoPlayer;
            video.play();
            this.isPlaying = true;
        },
        videoEnded() {
            this.isPlaying = false;
        },
    }
}
</script>