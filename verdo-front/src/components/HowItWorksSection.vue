<!-- HowItWorksSection.vue -->
<template>
    <div class="bg-white py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-6">
                    {{ $t('home.howItWorks.title') }}
                </h2>
                <p class="max-w-3xl mx-auto text-xl text-gray-500">
                    {{ $t('home.howItWorks.description') }}
                </p>
            </div>

            <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
                <!-- Card 1: Sign Up -->
                <div
                    class="text-center p-8 rounded-2xl bg-white hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 card-shadow hover:shadow-xl">
                    <div class="relative mb-8">
                        <div
                            class="w-32 h-32 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12">
                            <span class="text-6xl font-bold text-white drop-shadow-lg">1</span>
                        </div>
                        <div
                            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-[#1B4332] to-transparent opacity-50">
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">
                        {{ $t('home.howItWorks.signUp.title') }}
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        {{ $t('home.howItWorks.signUp.description') }}
                    </p>
                </div>

                <!-- Card 2: Invest -->
                <div
                    class="text-center p-8 rounded-2xl bg-white hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 card-shadow hover:shadow-xl">
                    <div class="relative mb-8">
                        <div
                            class="w-32 h-32 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12">
                            <span class="text-6xl font-bold text-white drop-shadow-lg">2</span>
                        </div>
                        <div
                            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-[#1B4332] to-transparent opacity-50">
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">
                        {{ $t('home.howItWorks.invest.title') }}
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        {{ $t('home.howItWorks.invest.description') }}
                    </p>
                </div>

                <!-- Card 3: Monitor -->
                <div
                    class="text-center p-8 rounded-2xl bg-white hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 card-shadow hover:shadow-xl">
                    <div class="relative mb-8">
                        <div
                            class="w-32 h-32 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12">
                            <span class="text-6xl font-bold text-white drop-shadow-lg">3</span>
                        </div>
                        <div
                            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-[#1B4332] to-transparent opacity-50">
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">
                        {{ $t('home.howItWorks.monitor.title') }}
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        {{ $t('home.howItWorks.monitor.description') }}
                    </p>
                </div>

                <!-- Card 4: Collect -->
                <div
                    class="text-center p-8 rounded-2xl bg-white hover:bg-gray-50 transform hover:-translate-y-2 transition-all duration-300 card-shadow hover:shadow-xl">
                    <div class="relative mb-8">
                        <div
                            class="w-32 h-32 bg-[#1B4332] text-white rounded-full flex items-center justify-center mx-auto transform transition-transform duration-300 hover:rotate-12">
                            <span class="text-6xl font-bold text-white drop-shadow-lg">4</span>
                        </div>
                        <div
                            class="absolute -bottom-2 left-1/2 transform -translate-x-1/2 w-40 h-2 bg-gradient-to-r from-transparent via-[#1B4332] to-transparent opacity-50">
                        </div>
                    </div>
                    <h3 class="text-2xl font-bold text-gray-900 mb-4">
                        {{ $t('home.howItWorks.collect.title') }}
                    </h3>
                    <p class="text-gray-600 leading-relaxed">
                        {{ $t('home.howItWorks.collect.description') }}
                    </p>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
    name: 'HowItWorksSection',
    setup() {
        const { t } = useI18n();
        return { t };
    }
}
</script>

<style scoped>
.card-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 0 0 1px rgba(0, 0, 0, 0.05);
}
</style>