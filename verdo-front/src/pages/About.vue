<template>
    <div class="bg-white">
        <!-- Hero Section -->
        <div class="relative h-screen">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&fit=crop"
                    alt="Beautiful farmland landscape" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40"></div>
            </div>

            <!-- Hero Content -->
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
                <div class="text-white max-w-4xl mx-auto">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ t("about.hero.title") }}</h1>
                    <p class="text-lg md:text-xl leading-relaxed">
                        {{ t("about.hero.subtitle") }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Mission Section -->
        <div class="py-24 bg-white">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-[#2D5A46]">{{ t("about.mission.title") }}</h2>
                    <div class="w-24 h-1 bg-[#4CAF50] mx-auto mt-4"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-12">
                    <!-- Mission Item 1 -->
                    <div class="flex flex-col hover:transform hover:scale-105 transition-all duration-300">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="currentColor">
                                    <path d="M7,2V13H10V22L17,10H13L17,2H7Z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">{{ t("about.mission.mission1.title") }}</h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            {{ t("about.mission.mission1.description") }}
                        </p>
                    </div>

                    <!-- Mission Item 2 -->
                    <div class="flex flex-col hover:transform hover:scale-105 transition-all duration-300">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M12,5.5A3.5,3.5 0 0,1 15.5,9A3.5,3.5 0 0,1 12,12.5A3.5,3.5 0 0,1 8.5,9A3.5,3.5 0 0,1 12,5.5M5,8C5.56,8 6.08,8.15 6.53,8.42C6.38,9.85 6.8,11.27 7.66,12.38C7.16,13.34 6.16,14 5,14A3,3 0 0,1 2,11A3,3 0 0,1 5,8M19,8A3,3 0 0,1 22,11A3,3 0 0,1 19,14C17.84,14 16.84,13.34 16.34,12.38C17.2,11.27 17.62,9.85 17.47,8.42C17.92,8.15 18.44,8 19,8M5.5,18.25C5.5,16.18 8.41,14.5 12,14.5C15.59,14.5 18.5,16.18 18.5,18.25V20H5.5V18.25M0,20V18.5C0,17.11 1.89,15.94 4.45,15.6C3.86,16.28 3.5,17.22 3.5,18.25V20H0M24,20H20.5V18.25C20.5,17.22 20.14,16.28 19.55,15.6C22.11,15.94 24,17.11 24,18.5V20Z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">{{ t("about.mission.mission2.title") }}</h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            {{ t("about.mission.mission2.description") }}
                        </p>
                    </div>

                    <!-- Mission Item 3 -->
                    <div class="flex flex-col hover:transform hover:scale-105 transition-all duration-300">
                        <div class="flex items-center gap-4 mb-4">
                            <div class="w-12 h-12 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-6 h-6 text-[#4CAF50]" viewBox="0 0 24 24" fill="currentColor">
                                    <path
                                        d="M17.5,12A1.5,1.5 0 0,1 16,10.5A1.5,1.5 0 0,1 17.5,9A1.5,1.5 0 0,1 19,10.5A1.5,1.5 0 0,1 17.5,12M14.5,8A1.5,1.5 0 0,1 13,6.5A1.5,1.5 0 0,1 14.5,5A1.5,1.5 0 0,1 16,6.5A1.5,1.5 0 0,1 14.5,8M9.5,8A1.5,1.5 0 0,1 8,6.5A1.5,1.5 0 0,1 9.5,5A1.5,1.5 0 0,1 11,6.5A1.5,1.5 0 0,1 9.5,8M6.5,12A1.5,1.5 0 0,1 5,10.5A1.5,1.5 0 0,1 6.5,9A1.5,1.5 0 0,1 8,10.5A1.5,1.5 0 0,1 6.5,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3Z" />
                                </svg>
                            </div>
                            <h3 class="text-xl font-semibold text-gray-800">{{ t("about.mission.mission3.title") }}</h3>
                        </div>
                        <p class="text-gray-600 leading-relaxed">
                            {{ t("about.mission.mission3.description") }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Values Section -->
        <div class="py-24 bg-[#F8FAF8]">
            <div class="max-w-7xl mx-auto px-4">
                <div class="text-center mb-16">
                    <h2 class="text-4xl font-bold text-[#2D5A46]">{{ t("about.values.title") }}</h2>
                    <div class="w-24 h-1 bg-[#4CAF50] mx-auto mt-4"></div>
                </div>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Value Card 1 -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 3v1m0 16v1m9-9h-1M4 12H3m15.364 6.364l-.707-.707M6.343 6.343l-.707-.707m12.728 0l-.707.707M6.343 17.657l-.707.707">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-semibold text-[#2D5A46] text-center mb-4">{{
                            t("about.values.value1.title") }}</h3>
                        <p class="text-gray-600 text-center">
                            {{ t("about.values.value1.description") }}
                        </p>
                    </div>

                    <!-- Value Card 2 -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-semibold text-[#2D5A46] text-center mb-4">{{
                            t("about.values.value2.title") }}</h3>
                        <p class="text-gray-600 text-center">
                            {{ t("about.values.value2.description") }}
                        </p>
                    </div>

                    <!-- Value Card 3 -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M12 8v13m0-13V6a2 2 0 112 2h-2zm0 0V5.5A2.5 2.5 0 109.5 8H12zm-7 4h14M5 12a2 2 0 110-4h14a2 2 0 110 4M5 12v7a2 2 0 002 2h10a2 2 0 002-2v-7">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-semibold text-[#2D5A46] text-center mb-4">{{
                            t("about.values.value3.title") }}</h3>
                        <p class="text-gray-600 text-center">
                            {{ t("about.values.value3.description") }}
                        </p>
                    </div>
                    <!-- Value Card 4 -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M13 10V3L4 14h7v7l9-11h-7z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-semibold text-[#2D5A46] text-center mb-4">{{
                            t("about.values.value4.title") }}</h3>
                        <p class="text-gray-600 text-center">
                            {{ t("about.values.value4.description") }}
                        </p>
                    </div>
                    <!-- Value Card 5 -->
                    <div class="bg-white rounded-xl p-8 shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <div class="flex items-center justify-center mb-6">
                            <div class="w-16 h-16 bg-[#4CAF50]/10 rounded-full flex items-center justify-center">
                                <svg class="w-8 h-8 text-[#4CAF50]" fill="none" stroke="currentColor"
                                    viewBox="0 0 24 24">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z">
                                    </path>
                                </svg>
                            </div>
                        </div>
                        <h3 class="text-2xl font-semibold text-[#2D5A46] text-center mb-4">{{
                            t("about.values.value5.title") }}</h3>
                        <p class="text-gray-600 text-center">
                            {{ t("about.values.value5.description") }}
                        </p>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from "vue-i18n";

export default {
    name: 'About',
    setup() {
        const { t } = useI18n();
        return { t };
    }
}
</script>

<style scoped>
.bg-olive-light {
    background-color: #2D5A46;
}

.text-olive-dark {
    color: #1B4332;
}

.text-gradient {
    background: linear-gradient(to right, #1B4332, #2F855A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Add smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Animation for stats */
@keyframes fadeInUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}

.stats-item {
    animation: fadeInUp 0.8s ease-out forwards;
}
</style>