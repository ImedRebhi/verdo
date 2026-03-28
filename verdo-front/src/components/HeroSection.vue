<!-- HeroSection.vue -->
<template>
    <div class="relative min-h-screen">
        <div class="absolute inset-0 overflow-hidden">
            <img :src="heroImage" alt="Hero Image" class="w-full h-full object-cover" />
            <div class="absolute inset-0 bg-black/50"></div>
        </div>

        <!-- Content -->
        <div class="relative z-10 flex items-center min-h-screen px-8 md:px-16 max-w-7xl mx-auto">
            <div class="w-full md:w-2/3 text-white space-y-6 hero-content">
                <h1 class="text-4xl md:text-6xl font-bold leading-tight animate-slide-up">
                    {{ $t('home.hero.title') }}
                    <span class="text-green-400">{{ $t('home.hero.subtitle') }} </span>
                </h1>
                <p class="text-xl md:text-2xl text-gray-200 max-w-2xl animate-slide-up-delay-1">
                    {{ $t('home.hero.description') }}
                </p>
                <div class="flex gap-4 pt-4 animate-slide-up-delay-2">
                    <button
                        class="bg-olive-dark hover:bg-green-500 px-8 py-3 rounded-full transition-all duration-300 transform hover:scale-105 font-medium">
                        {{ $t('home.hero.button') }}
                    </button>
                </div>
            </div>
        </div>

        <!-- Animated Scroll Indicator -->
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 animate-bounce">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24"
                stroke="currentColor">
                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 14l-7 7m0 0l-7-7m7 7V3" />
            </svg>
        </div>

        <!-- Half Oval Separator -->
        <div class="relative">
            <div class="absolute -bottom-1 left-0 right-0 h-[150px] overflow-hidden">
                <svg viewBox="0 0 1440 160" class="w-full h-full" preserveAspectRatio="none">
                    <path fill="white"
                        d="M0,128L48,122.7C96,117,192,107,288,101.3C384,96,480,96,576,101.3C672,107,768,117,864,122.7C960,128,1056,128,1152,122.7C1248,117,1344,107,1392,101.3L1440,96L1440,160L1392,160C1344,160,1248,160,1152,160C1056,160,960,160,864,160C768,160,672,160,576,160C480,160,384,160,288,160C192,160,96,160,48,160L0,160Z">
                    </path>
                </svg>
            </div>
        </div>
    </div>
</template>

<script>
import HeroImage from "../assets/olive_field.jpg";
import { useI18n } from 'vue-i18n';

export default {
    name: 'HeroSection',
    setup() {
        const { t } = useI18n();
        return { t };
    },
    data() {
        return {
            heroImage: HeroImage,
        }
    }
}
</script>

<style scoped>
.hero-content {
    opacity: 0;
    animation: fadeIn 1s ease-out forwards;
}

@keyframes fadeIn {
    from {
        opacity: 0;
    }

    to {
        opacity: 1;
    }
}

.animate-slide-up {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.8s ease-out forwards;
}

.animate-slide-up-delay-1 {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.8s ease-out 0.2s forwards;
}

.animate-slide-up-delay-2 {
    opacity: 0;
    transform: translateY(20px);
    animation: slideUp 0.8s ease-out 0.4s forwards;
}

@keyframes slideUp {
    from {
        opacity: 0;
        transform: translateY(20px);
    }

    to {
        opacity: 1;
        transform: translateY(0);
    }
}
</style>