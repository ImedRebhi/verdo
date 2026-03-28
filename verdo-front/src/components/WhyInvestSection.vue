<!-- WhyInvestSection.vue -->
<template>
    <div class="bg-white py-24">
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <!-- Title Section -->
            <div class="text-center mb-16">
                <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('home.whyInvest.title') }}</h2>
                <p class="max-w-2xl mx-auto text-lg text-gray-600">
                    {{ $t('home.whyInvest.description') }}
                </p>
            </div>

            <!-- Pagination Circles -->
            <div class="flex justify-center gap-8 mb-16">
                <button v-for="n in 3" :key="n" @click="currentPage = n" :class="[
                    'w-16 h-16 rounded-full border-2 flex items-center justify-center transition-all duration-300 text-xl font-medium',
                    currentPage === n ? 'border-[#1B4332] bg-[#1B4332]/10' : 'border-gray-300 text-white bg-[#1B4332]'
                ]">
                    {{ n }}
                </button>
            </div>

            <!-- Investment Cards Page 1 -->
            <div v-if="currentPage === 1" class="grid grid-cols-1 md:grid-cols-2 gap-x-16 gap-y-12">
                <!-- Card 1: Industry That Matters -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M20,10C22,13 17,22 15,22C13,22 13,21 12,21C11,21 11,22 9,22C7,22 2,13 4,10C6,7 9,7 11,8V5C5.38,8.07 4.11,3.78 4.11,3.78C4.11,3.78 6.77,0.19 11,5V3H13V8C15,7 18,7 20,10Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.industry.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.industry.description') }}
                        </p>
                    </div>
                </div>

                <!-- Card 2: They're Not Making Any More Land -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path d="M14,6L10.25,11L13.1,14.8L11.5,16C9.81,13.75 7,10 7,10L1,18H23L14,6Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.passiveIncome.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.passiveIncome.description') }}

                        </p>
                    </div>
                </div>

                <!-- Card 3: Demand for Food -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,3L4,9V21H20V9L12,3M12,7.75C13.24,7.75 14.25,8.76 14.25,10C14.25,11.24 13.24,12.25 12,12.25C10.76,12.25 9.75,11.24 9.75,10C9.75,8.76 10.76,7.75 12,7.75M12,15C14.5,15 16.5,16.34 16.5,18V19H7.5V18C7.5,16.34 9.5,15 12,15Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.foodDemand.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.foodDemand.description') }}
                        </p>
                    </div>
                </div>

                <!-- Card 4: Long Term Investment Strategy -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M3,13H7V23H3V13M10,14H14V23H10V14M17,9H21V23H17V9M17,1H21V5H17V1M10,6H14V10H10V6M3,5H7V9H3V5Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.longTerm.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.longTerm.description') }}
                        </p>
                    </div>
                </div>

                <!-- Card 5: More Stability Than The Stock Market -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M21,8V6H7V8H21M21,11V9H7V11H21M21,14V12H7V14H21M21,17V15H7V17H21M5,8V6H3V8H5M5,11V9H3V11H5M5,14V12H3V14H5M5,17V15H3V17H5Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.stability.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.stability.description') }}
                        </p>
                    </div>
                </div>

                <!-- Card 6: Hedge Against Inflation -->
                <div class="flex items-start gap-6">
                    <div class="w-16 h-16 bg-[#B8C4C0] rounded-full flex items-center justify-center flex-shrink-0">
                        <svg class="w-8 h-8 text-gray-600" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,1L21,5V11C21,16.55 17.16,21.74 12,23C6.84,21.74 3,16.55 3,11V5L12,1M12,3.18L5,6.3V11.22C5,15.54 8.25,19.82 12,20.93C15.75,19.82 19,15.54 19,11.22V6.3L12,3.18M12,6A3,3 0 0,1 15,9A3,3 0 0,1 12,12A3,3 0 0,1 9,9A3,3 0 0,1 12,6M12,8A1,1 0 0,0 11,9A1,1 0 0,0 12,10A1,1 0 0,0 13,9A1,1 0 0,0 12,8Z" />
                        </svg>
                    </div>
                    <div>
                        <h3 class="text-lg font-bold text-gray-900 mb-2">{{ $t('home.whyInvest.hedgeAgainstInflation.title') }}</h3>
                        <p class="text-gray-600 text-sm">
                            {{ $t('home.whyInvest.hedgeAgainstInflation.description') }}
                        </p>
                    </div>
                </div>
            </div>

            <!-- image (Page 2) -->
            <div v-if="currentPage === 2" class="investment-reason">

                <div class="w-full h-full">
                    <img :src="stats" alt="Hedge" class="w-full h-full object-cover" />
                </div>
            </div>

            <!-- Additional Content for Page 3 -->
            <div v-if="currentPage === 3" class="investment-reason mb-16">
                <h2 class="text-2xl font-bold text-center mb-16">{{ $t('home.whyInvest.title') }}</h2>

                <div class="grid grid-cols-1 md:grid-cols-3 gap-8">
                    <!-- Card 1 -->
                    <div class="bg-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-[#2F855A] text-2xl font-semibold mb-4">{{ $t('home.whyInvest.cards.card1.title') }}</h3>
                        <p class="text-gray-600 leading-relaxed">
                            {{ $t('home.whyInvest.cards.card1.description') }}
                        </p>
                    </div>

                    <!-- Card 2 -->
                    <div class="bg-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-[#2F855A] text-2xl font-semibold mb-4">{{ $t('home.whyInvest.cards.card2.title') }}</h3>
                        <p class="text-gray-600 leading-relaxed">
                            {{ $t('home.whyInvest.cards.card2.description') }}
                        </p>
                    </div>

                    <!-- Card 3 -->
                    <div class="bg-gray-200 p-8 rounded-lg shadow-lg hover:shadow-xl transition-shadow duration-300">
                        <h3 class="text-[#2F855A] text-2xl font-semibold mb-4">{{ $t('home.whyInvest.cards.card3.title') }}</h3>
                        <p class="text-gray-600 leading-relaxed">
                            {{ $t('home.whyInvest.cards.card3.description') }}
                        </p>
                    </div>
                </div>
            </div>
        </div>

        <!-- Make Money Two Ways Content -->
        <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 mt-16">
            <div class="flex flex-col lg:flex-row gap-16">
                <!-- Left Content -->
                <div class="lg:w-1/3 flex flex-col justify-center">
                    <h3 class="text-2xl font-bold text-gray-900 tracking-wider mb-8">{{ $t('home.makeMoneyTwoWays.title') }}</h3>
                    <p class="text-lg text-gray-600 mb-8">
                        {{ $t('home.makeMoneyTwoWays.description') }}
                    </p>
                    <button
                        class="bg-[#1B4332] text-white px-8 py-3 rounded-md hover:bg-[#2d5a46] transition-colors duration-300 w-fit">
                        {{ $t('home.makeMoneyTwoWays.button') }}
                    </button>
                </div>
                <div class="lg:w-2/3">
                    <div class="grid grid-cols-1 md:grid-cols-2 gap-8">
                        <!-- Card 1: Crop Profits -->
                        <div class="relative group overflow-hidden rounded-lg shadow-lg h-[400px]">
                            <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?w=800&auto=format&fit=crop"
                                alt="Crop Profits"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h3 class="text-xl font-bold text-white mb-2">1. {{ $t('home.makeMoneyTwoWays.cards.card1.title') }}</h3>
                                <p class="text-white/90 text-sm">
                                    {{ $t('home.makeMoneyTwoWays.cards.card1.description') }}
                                </p>
                            </div>
                        </div>

                        <!-- Card 2: Own the Land -->
                        <div class="relative group overflow-hidden rounded-lg shadow-lg h-[400px]">
                            <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?w=800&auto=format&fit=crop"
                                alt="Own the Land"
                                class="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500" />
                            <div
                                class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent flex flex-col justify-end p-6">
                                <h3 class="text-xl font-bold text-white mb-2">2. {{ $t('home.makeMoneyTwoWays.cards.card2.title') }}</h3>
                                <p class="text-white/90 text-sm">
                                    {{ $t('home.makeMoneyTwoWays.cards.card2.description') }}
                                </p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import stats from "../assets/stat.png";
import { useI18n } from 'vue-i18n';

export default {
    name: 'WhyInvestSection',
    setup() {
        const { t } = useI18n();
        return { t };
    },
    data() {
        return {
            currentPage: 1,
            stats: stats
        }
    }
}
</script>

<style scoped>
.investment-reason {
    opacity: 0;
    transform: translateY(20px);
    animation: fadeInUp 0.6s ease-out forwards;
}

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
</style>