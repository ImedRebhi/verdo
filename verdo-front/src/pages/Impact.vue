<!-- OurImpact.vue -->
<template>
    <div class="bg-white">
        <!-- Hero Section -->
        <div class="relative min-h-screen">
            <!-- Background Image with Parallax Effect -->
            <div class="absolute inset-0 overflow-hidden">
                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=1600&fit=crop"
                    alt="Hero Background" class="w-full h-full object-cover transform scale-105 origin-center" />
                <div class="absolute inset-0 bg-gradient-to-b from-black/70 to-black/30"></div>
            </div>

            <!-- Content -->
            <div class="relative z-10 flex flex-col justify-start min-h-screen px-4">
                <div class="max-w-7xl mx-auto w-full mt-42">
                    <div class="">
                        <!-- Badge -->
                        <div
                            class="inline-flex items-center px-3 py-1.5  md:px-4 md:py-2 rounded-full bg-white/10 backdrop-blur-sm border border-white/20 mb-6 md:mb-8">
                            <span class="text-white/90 text-xs md:text-sm font-medium">{{ $t('impact.hero.badge') }}</span>
                        </div>

                        <!-- Main Title -->
                        <h1 class="text-4xl sm:text-5xl md:text-7xl font-bold text-white mb-6 md:mb-8 leading-tight">
                            {{ $t('impact.hero.title') }}
                        </h1>

                        <!-- Description -->
                        <p class="text-base md:text-xl text-white/90 mb-8 md:mb-12 leading-relaxed max-w-3xl">
                            {{ $t('impact.hero.description') }}
                        </p>

                        <!-- Stats Section -->
                        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4 md:gap-8 mt-8 md:mt-12 max-w-3xl">
                            <div
                                class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 transform hover:scale-105 transition-all duration-300"
                                :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <div class="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-1 md:mb-2" dir="ltr" style="unicode-bidi: isolate;">500K+</div>
                                <div class="text-white/80 text-sm md:text-base">{{ $t('impact.stats.treesPlanted') }}</div>
                            </div>
                            <div
                                class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 transform hover:scale-105 transition-all duration-300"
                                :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <div class="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-1 md:mb-2" dir="ltr" style="unicode-bidi: isolate;">85%</div>
                                <div class="text-white/80 text-sm md:text-base">{{ $t('impact.stats.carbonReduction') }}</div>
                            </div>
                            <div
                                class="bg-white/10 backdrop-blur-sm border border-white/20 rounded-xl p-4 md:p-6 transform hover:scale-105 transition-all duration-300 sm:col-span-2 md:col-span-1"
                                :class="{ 'text-right': $i18n.locale === 'ar' }">
                                <div class="text-3xl md:text-4xl font-bold text-[#4CAF50] mb-1 md:mb-2" dir="ltr" style="unicode-bidi: isolate;">1000+</div>
                                <div class="text-white/80 text-sm md:text-base">{{ $t('impact.stats.farmersConnected') }}</div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>

            <!-- Decorative Curved Separator -->
            <div class="absolute bottom-0 left-0 right-0 h-16 md:h-24 bg-gradient-to-t from-white to-transparent"></div>
        </div>

        <!-- Agribusiness Section -->
        <div class="relative h-[40vh] md:h-[60vh] bg-cover bg-center"
            style="background-image: url('https://images.unsplash.com/photo-1523741543316-beb7fc7023d8?w=1600&fit=crop')">
            <div class="absolute inset-0 bg-black/50"></div>
            <div class="relative z-10 max-w-7xl mx-auto px-4 h-full flex flex-col justify-center">
                <div class="text-white">
                    <h2 class="text-3xl md:text-4xl font-bold mb-4 md:mb-6">{{ $t('impact.commitment.title') }}</h2>
                    <p class="text-base md:text-xl max-w-3xl">
                        {{ $t('impact.commitment.description') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Environmental Impact -->
        <div class="py-12 md:py-16">
            <div class="max-w-7xl mx-auto px-4">
                <h2 class="text-2xl md:text-3xl font-semibold text-[#e06513] mb-2 md:mb-4">{{ $t('impact.ourImpact') }}</h2>
                <h3 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12">{{ $t('impact.environmental.title') }}</h3>

                <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24">
                    <div class="w-full md:w-1/2">
                        <div class="space-y-4 md:space-y-6">
                            <div v-for="(item, index) in environmentalItems" :key="index"
                                class="flex items-start md:items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                <div class="w-2 h-2 bg-[#4CAF50] rounded-full mt-2 md:mt-0"></div>
                                <p class="text-gray-700 text-sm md:text-base">
                                    {{ item }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1441974231531-c6227db76b6e?w=800&auto=format&fit=crop"
                            alt="Environmental Impact - Nature Forest"
                            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>

                <!-- Social Impact Section -->
                <h3 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12">{{ $t('impact.social.title') }}</h3>
                <div class="flex flex-col-reverse md:flex-row items-center gap-8 md:gap-16 mb-16 md:mb-24">
                    <div class="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1591628001888-76cc02e0c276?w=800&auto=format&fit=crop"
                            alt="Social Impact - Farmers Community"
                            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>

                    <div class="w-full md:w-1/2">
                        <div class="space-y-4 md:space-y-6">
                            <div v-for="(item, index) in socialItems" :key="index"
                                class="flex items-start md:items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                <div class="w-2 h-2 bg-[#4CAF50] rounded-full mt-2 md:mt-0"></div>
                                <p class="text-gray-700 text-sm md:text-base">
                                    {{ item }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>

                <!-- Governance Section -->
                <h3 class="text-2xl md:text-3xl font-bold mb-8 md:mb-12">{{ $t('impact.governance.title') }}</h3>
                <div class="flex flex-col md:flex-row items-center gap-8 md:gap-16">
                    <div class="w-full md:w-1/2">
                        <div class="space-y-4 md:space-y-6">
                            <div v-for="(item, index) in governanceItems" :key="index"
                                class="flex items-start md:items-center gap-3 md:gap-4 p-4 rounded-lg hover:bg-gray-50 transition-colors duration-300">
                                <div class="w-2 h-2 bg-[#4CAF50] rounded-full mt-2 md:mt-0"></div>
                                <p class="text-gray-700 text-sm md:text-base">
                                    {{ item }}
                                </p>
                            </div>
                        </div>
                    </div>

                    <div class="w-full md:w-1/2 h-[300px] md:h-[400px] rounded-lg overflow-hidden">
                        <img src="https://images.unsplash.com/photo-1600880292203-757bb62b4baf?w=800&auto=format&fit=crop"
                            alt="Governance Impact"
                            class="w-full h-full object-cover transform hover:scale-105 transition-transform duration-700" />
                        <div class="absolute inset-0 bg-gradient-to-t from-black/30 to-transparent"></div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
export default {
    name: 'OurImpact',
    computed: {
        environmentalItems() {
            return [
                this.$t('impact.environmental.items.0'),
                this.$t('impact.environmental.items.1'),
                this.$t('impact.environmental.items.2')
            ]
        },
        socialItems() {
            return [
                this.$t('impact.social.items.0'),
                this.$t('impact.social.items.1'),
                this.$t('impact.social.items.2'),
                this.$t('impact.social.items.3')
            ]
        },
        governanceItems() {
            return [
                this.$t('impact.governance.items.0'),
                this.$t('impact.governance.items.1'),
                this.$t('impact.governance.items.2'),
                this.$t('impact.governance.items.3')
            ]
        }
    }
}
</script>

<style scoped>
.text-gradient {
    background: linear-gradient(to right, #1B4332, #2F855A);
    -webkit-background-clip: text;
    -webkit-text-fill-color: transparent;
}

/* Add smooth scroll behavior */
html {
    scroll-behavior: smooth;
}

/* Stats animation */
@keyframes countUp {
    from {
        transform: translateY(20px);
        opacity: 0;
    }

    to {
        transform: translateY(0);
        opacity: 1;
    }
}

/* Add animation for stats on mobile */
@media (max-width: 768px) {
    .stat-item {
        animation: countUp 0.6s ease-out forwards;
    }
}

/* Optimize images for mobile */
@media (max-width: 768px) {
    img {
        object-position: center;
    }
}

/* Enhance touch interactions on mobile */
@media (hover: none) {
    .hover\:bg-gray-50:active {
        background-color: rgba(249, 250, 251, 0.8);
    }
}
</style>