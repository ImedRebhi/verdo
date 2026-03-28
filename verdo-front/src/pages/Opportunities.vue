<template>
    <div class="container mx-auto px-4 py-24 my-16">
        <!-- Header Section -->
        <div class="text-center mb-16 px-8 py-4">

            <h2 class="text-4xl font-bold text-gray-900 mb-4">{{ $t('opportunities.title') }}</h2>
            <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                {{ $t('opportunities.subtitle') }}
            </p>
        </div>

        <!-- Filter Tabs -->
        <div class="flex justify-center gap-8 mb-8 border-b border-gray-200">
            <button v-for="filter in filters" :key="filter.id" @click="activeFilter = filter.id" :class="[
                'pb-4 font-medium transition-colors duration-200',
                activeFilter === filter.id
                    ? 'text-olive-dark border-b-2 border-olive-dark'
                    : 'text-gray-500 hover:text-olive-dark'
            ]">
                {{ filter.name }}
            </button>
        </div>

        <!-- Farm Cards Grid -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            <div v-for="farm in filteredFarms" :key="farm.id"
                class="farm-card bg-white rounded-xl overflow-hidden shadow-lg transition-all duration-300 hover:shadow-2xl group cursor-pointer"
                @click="openFarmDetails(farm)">
                <!-- Farm Image -->
                <div class="relative h-56 overflow-hidden">
                    <img :src="farm.image" :alt="farm.name"
                        class="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                        loading="lazy" />
                    <div class="status-ribbon" :class="[
                        farm.status.id === 'available' ? 'bg-green-600' : 'bg-orange-600',
                        $i18n.locale === 'ar' ? 'left-[-35px]' : 'right-[-35px]'
                    ]">
                        {{ farm.status.name }}
                    </div>
                    <div
                        class="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300">
                    </div>
                </div>

                <!-- Farm Details -->
                <div class="p-6 space-y-4">
                    <!-- Location -->
                    <div class="flex items-center gap-2 text-gray-600" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 text-olive-dark" viewBox="0 0 20 20"
                            fill="currentColor">
                            <path fill-rule="evenodd"
                                d="M5.05 4.05a7 7 0 119.9 9.9L10 18.9l-4.95-4.95a7 7 0 010-9.9zM10 11a2 2 0 100-4 2 2 0 000 4z"
                                clip-rule="evenodd" />
                        </svg>
                        <span class="text-sm font-medium">{{ farm.location }}</span>
                    </div>

                    <!-- Farm Name -->
                    <h3
                        class="text-2xl font-bold text-gray-900 group-hover:text-olive-dark transition-colors duration-300">
                        {{ farm.name }}
                    </h3>

                    <!-- Farm Properties -->
                    <div class="space-y-3 pt-2">
                        <div class="flex justify-between items-center property-row" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                            <span class="text-gray-600 text-sm">{{ $t('opportunities.farm.crop') }}</span>
                            <span
                                class="px-3 py-1.5 bg-olive-dark bg-opacity-10 text-olive-dark rounded-full text-sm font-medium transition-all duration-300 hover:bg-olive-dark hover:text-white hover:scale-105">
                                {{ farm.crop }}
                            </span>
                        </div>

                        <div class="flex justify-between items-center property-row" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                            <span class="text-gray-600 text-sm">{{ $t('opportunities.farm.stage') }}</span>
                            <span
                                class="px-3 py-1.5 bg-olive-dark bg-opacity-10 text-olive-dark rounded-full text-sm font-medium transition-all duration-300 hover:bg-olive-dark hover:text-white hover:scale-105">
                                {{ farm.stage || 'Not specified' }}
                            </span>
                        </div>

                        <div class="flex justify-between items-center property-row" :class="{ 'flex-row-reverse': $i18n.locale === 'ar' }">
                            <span class="text-gray-600 text-sm">{{ $t('opportunities.farm.ownershipType') }}</span>
                            <span
                                class="px-3 py-1.5 bg-olive-dark bg-opacity-10 text-olive-dark rounded-full text-sm font-medium transition-all duration-300 hover:bg-olive-dark hover:text-white hover:scale-105">
                                {{ farm.ownershipType }}
                            </span>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Farm Details Modal -->
        <div v-if="selectedFarm" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeFarmDetails">
            <div class="min-h-screen px-4 flex items-center justify-center">
                <div class="fixed inset-0 bg-black/80 transition-opacity"></div>

                <!-- Modal container -->
                <div
                    class="inline-block w-full max-w-6xl my-8 text-left align-middle transition-all transform bg-white shadow-xl rounded-2xl overflow-hidden">
                    <!-- Mobile close button -->
                    <button @click="closeFarmDetails"
                        class="absolute top-4 right-4 z-50 md:hidden bg-white/10 backdrop-blur-sm p-2 rounded-full">
                        <svg class="w-6 h-6 text-white" xmlns="http://www.w3.org/2000/svg" fill="none"
                            viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                d="M6 18L18 6M6 6l12 12" />
                        </svg>
                    </button>

                    <div class="flex flex-col md:flex-row">
                        <!-- Left side - Image -->
                        <div class="relative w-full md:w-2/3 h-[300px] md:h-[600px]">
                            <img :src="selectedFarm.image" :alt="selectedFarm.name"
                                class="w-full h-full object-cover" />
                            <div class="absolute inset-0 bg-gradient-to-t from-black/60 via-black/30 to-transparent">
                            </div>

                            <!-- Farm name overlay -->
                            <div class="absolute bottom-0 left-0 right-0 p-6 text-white">
                                <h3 class="text-2xl md:text-4xl font-bold mb-2">{{ selectedFarm.name }}</h3>
                                <div class="flex items-center gap-2">
                                    <svg class="w-5 h-5" xmlns="http://www.w3.org/2000/svg" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                                    </svg>
                                    <span class="text-sm md:text-base">{{ selectedFarm.location }}</span>
                                </div>
                            </div>
                        </div>

                        <!-- Right side - Details -->
                        <div class="w-full md:w-1/3 p-6 md:p-8 bg-white">
                            <!-- Desktop close button -->
                            <button @click="closeFarmDetails"
                                class="hidden md:block absolute top-4 right-4 text-gray-500 hover:text-gray-700">
                                <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M6 18L18 6M6 6l12 12" />
                                </svg>
                            </button>

                            <!-- Status badge -->
                            <div class="mb-6">
                                <span :class="[
                                    'inline-flex items-center px-3 py-1 rounded-full text-sm font-medium',
                                    selectedFarm.status.id === 'available'
                                        ? 'bg-green-100 text-green-800'
                                        : 'bg-red-100 text-red-800'
                                ]">
                                    {{ selectedFarm.status.name }}
                                </span>
                            </div>

                            <!-- Farm details -->
                            <div class="space-y-6">
                                <div>
                                    <h4 class="text-sm text-gray-500 mb-1">{{ $t('opportunities.farm.crop') }}</h4>
                                    <p class="text-lg font-medium text-gray-900">{{ selectedFarm.crop }}</p>
                                </div>

                                <div>
                                    <h4 class="text-sm text-gray-500 mb-1">{{ $t('opportunities.farm.stage') }}</h4>
                                    <p class="text-lg font-medium text-gray-900">
                                        {{ selectedFarm.stage || 'Not specified' }}
                                    </p>
                                </div>

                                <div>
                                    <h4 class="text-sm text-gray-500 mb-1">{{ $t('opportunities.farm.ownershipType') }}</h4>
                                    <p class="text-lg font-medium text-gray-900">{{ selectedFarm.ownershipType }}</p>
                                </div>

                                <div>
                                    <h4 class="text-sm text-gray-500 mb-1">{{ $t('opportunities.farm.description') }}</h4>
                                    <p class="text-gray-600">Experience the beauty and potential of this {{
                                        selectedFarm.crop.toLowerCase() }} farm in {{ selectedFarm.location }}. This
                                        investment opportunity offers a unique chance to be part of Tunisia's
                                        agricultural future.</p>
                                </div>

                                <!-- Action buttons -->
                                <div class="space-y-3 pt-6">
                                    <button v-if="selectedFarm.status === 'Available'"
                                        class="w-full bg-green-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-green-700 transition-colors duration-200">
                                        {{ $t('opportunities.farm.actions.invest') }}
                                    </button>
                                    <button @click="showMoreInfo = true"
                                        class="w-full border border-gray-300 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-50 transition-colors duration-200">
                                        {{ $t('opportunities.farm.actions.moreInfo') }}
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- More Information Modal -->
        <div v-if="showMoreInfo" class="fixed inset-0 z-50 overflow-y-auto" @click.self="closeMoreInfo">
            <div class="min-h-screen px-4 text-center">
                <div class="fixed inset-0 bg-black/80 transition-opacity backdrop-blur-sm" @click="closeMoreInfo"></div>

                <div
                    class="inline-block w-full max-w-4xl my-8 text-left align-middle transition-all transform bg-white shadow-2xl rounded-2xl overflow-hidden animate-modal-entry">
                    <!-- Header with Close Button -->
                    <div class="relative bg-green-600 p-6 text-white">
                        <button @click="closeMoreInfo"
                            class="absolute top-4 right-4 text-white/80 hover:text-white transition-colors">
                            <svg class="w-6 h-6" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24"
                                stroke="currentColor">
                                <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                    d="M6 18L18 6M6 6l12 12" />
                            </svg>
                        </button>
                        <h2 class="text-2xl font-bold">Investment Details</h2>
                        <p class="mt-2 text-white/80">Complete information about this agricultural opportunity</p>
                    </div>

                    <div class="p-8">
                        <!-- Basic Info Section -->
                        <div class="mb-8 bg-gray-50 rounded-xl p-6 transform hover:scale-[1.02] transition-transform">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="p-2 bg-olive-dark/10 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-olive-dark" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900">Basic Information</h3>
                            </div>
                            <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Location</p>
                                        <p class="text-gray-600">Skhira, Sfax</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Size</p>
                                        <p class="text-gray-600">2 hectares</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M5 13l4 4L19 7" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Land Type</p>
                                        <p class="text-gray-600">Unplanted</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Ownership Model</p>
                                        <p class="text-gray-600">Full ownership</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Agricultural Potential Section -->
                        <div class="mb-8 bg-gray-50 rounded-xl p-6 transform hover:scale-[1.02] transition-transform">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="p-2 bg-olive-dark/10 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-olive-dark" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M3 6l3 1m0 0l-3 9a5.002 5.002 0 006.001 0M6 7l3 9M6 7l6-2m6 2l3-1m-3 1l-3 9a5.002 5.002 0 006.001 0M18 7l3 9m-3-9l-6-2m0-2v2m0 16V5m0 16H9m3 0h3" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900">Agricultural Potential</h3>
                            </div>
                            <div class="space-y-6">
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Suitable for</p>
                                        <p class="text-gray-600">Olive trees</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Soil Quality & Water Access</p>
                                        <p class="text-gray-600">Evaluated</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M19 21V5a2 2 0 00-2-2H7a2 2 0 00-2 2v16m14 0h2m-2 0h-5m-9 0H3m2 0h5M9 7h1m-1 4h1m4-4h1m-1 4h1m-5 10v-5a1 1 0 011-1h2a1 1 0 011 1v5m-4 0h4" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Existing Infrastructure</p>
                                        <p class="text-gray-600">2 km far from main road, electricity available</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- Financial Information Section -->
                        <div class="mb-8 bg-gray-50 rounded-xl p-6 transform hover:scale-[1.02] transition-transform">
                            <div class="flex items-center gap-3 mb-4">
                                <div class="p-2 bg-olive-dark/10 rounded-lg">
                                    <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 text-olive-dark" fill="none"
                                        viewBox="0 0 24 24" stroke="currentColor">
                                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                            d="M12 8c-1.657 0-3 .895-3 2s1.343 2 3 2 3 .895 3 2-1.343 2-3 2m0-8c1.11 0 2.08.402 2.599 1M12 8V7m0 1v8m0 0v1m0-1c-1.11 0-2.08-.402-2.599-1M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                                    </svg>
                                </div>
                                <h3 class="text-lg font-semibold text-gray-900">Financial Information</h3>
                            </div>
                            <div class="space-y-6">
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Land Price</p>
                                        <p class="text-gray-600">Starting from 0.9 DT/m² (Minimum 1 hectare)</p>
                                    </div>
                                </div>
                                <div class="flex items-start gap-3">
                                    <div class="p-1.5 bg-olive-dark/10 rounded-lg">
                                        <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 text-olive-dark"
                                            fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                                d="M9 7h6m0 10v-3m-3 3h.01M9 17h.01M9 14h.01M12 14h.01M15 11h.01M12 11h.01M9 11h.01M7 21h10a2 2 0 002-2V5a2 2 0 00-2-2H7a2 2 0 00-2 2v14a2 2 0 002 2z" />
                                        </svg>
                                    </div>
                                    <div>
                                        <p class="text-sm font-medium text-gray-900">Planting & Farming Package</p>
                                        <p class="text-gray-600">From 35,000 TND per hectare</p>
                                        <p class="text-sm text-gray-500 mt-1">Includes soil preparation, irrigation,
                                            tree planting, fertilization, and management for 3 years</p>
                                    </div>
                                </div>
                            </div>
                        </div>

                        <!-- ROI Information -->
                        <div
                            class="bg-gradient-to-br from-green-50 to-olive-50 rounded-xl p-6 transform hover:scale-[1.02] transition-transform">

                            <div class="flex items-center gap-6">
                                <div class="flex-1 bg-white rounded-lg p-4 shadow-sm">
                                    <p class="text-2xl font-bold text-olive-dark">6 years</p>
                                    <p class="text-gray-600 mt-1">Expected ROI Period</p>
                                </div>
                                <div class="flex-1 bg-white rounded-lg p-4 shadow-sm">
                                    <p class="text-2xl font-bold text-olive-dark">Progressive</p>
                                    <p class="text-gray-600 mt-1">Returns grow each year as trees mature</p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import img1 from '../assets/img1.jpg'
import img2 from '../assets/img2.jpg'
import img3 from '../assets/img3.jpg'
import img4 from '../assets/img4.jpg'
import img5 from '../assets/img5.jpg'
import img6 from '../assets/img6.jpg'
import img7 from '../assets/img7.jpg'
import img8 from '../assets/img8.jpg'
import img9 from '../assets/img9.jpg'
import img10 from '../assets/img10.jpg'


export default {
    name: 'Opportunities',
    data() {
        return {
            activeFilter: 'all',
            selectedFarm: null,
            showMoreInfo: false,
        }
    },
    computed: {
        filters() {
            return [
                { id: 'all', name: this.$t('opportunities.filters.all') },
                { id: 'unplanted', name: this.$t('opportunities.filters.unplanted') },
                { id: 'developing', name: this.$t('opportunities.filters.developing') },
                { id: 'mature', name: this.$t('opportunities.filters.mature') }
            ]
        },
        farms() {
            return [
                {
                    id: 1,
                    name: 'Pistachio Grove',
                    location: 'Sfax, Tunisia',
                    image: img7,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Pistachios',
                    stage: 'Developing',
                    ownershipType: 'Full ownership'
                },
                {
                    id: 2,
                    name: 'Date Palm Oasis',
                    location: 'Tozeur, Tunisia',
                    image: img1,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Dates',
                    stage: 'Mature',
                    ownershipType: 'Loan'
                },
                {
                    id: 3,
                    name: 'Olive Valley',
                    location: 'Sfax, Tunisia',
                    image: img3,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Olives',
                    stage: 'Mature',
                    ownershipType: 'Full ownership'
                },
                {
                    id: 4,
                    name: 'Green Gold Olives',
                    location: 'Monastir, Tunisia',
                    image: img2,
                    status: { id: 'soldOut', name: this.$t('opportunities.farm.status.soldOut') },
                    crop: 'Olives',
                    stage: 'Mature',
                    ownershipType: 'Loan'
                },
                {
                    id: 5,
                    name: 'Desert Dates',
                    location: 'Kebili, Tunisia',
                    image: img5,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Dates',
                    stage: 'Unplanted',
                    ownershipType: 'Full ownership'
                },
                {
                    id: 6,
                    name: 'Pistachio Paradise',
                    location: 'Kairouan, Tunisia',
                    image: img8,
                    status: { id: 'soldOut', name: this.$t('opportunities.farm.status.soldOut') },
                    crop: 'Pistachios',
                    stage: 'Developing',
                    ownershipType: 'Loan'
                },
                {
                    id: 7,
                    name: 'Olive Garden Estate',
                    location: 'Sousse, Tunisia',
                    image: img3,
                    status: { id: 'soldOut', name: this.$t('opportunities.farm.status.soldOut') },
                    crop: 'Olives',
                    stage: 'Mature',
                    ownershipType: 'Loan'
                },
                {
                    id: 8,
                    name: 'Golden Date Farm',
                    location: 'Gabès, Tunisia',
                    image: img4,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Dates',
                    stage: 'Developing',
                    ownershipType: 'Full ownership'
                },
                {
                    id: 9,
                    name: 'Mediterranean Grove',
                    location: 'Nabeul, Tunisia',
                    image: img9,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Olives',
                    stage: 'Unplanted',
                    ownershipType: 'Full ownership'
                },
                {
                    id: 10,
                    name: 'Desert Pistachio Oasis',
                    location: 'Gafsa, Tunisia',
                    image: img10,
                    status: { id: 'available', name: this.$t('opportunities.farm.status.available') },
                    crop: 'Pistachios',
                    stage: 'Developing',
                    ownershipType: 'Loan'
                }
            ]
        },
        filteredFarms() {
            if (this.activeFilter === 'all') return this.farms
            return this.farms.filter(farm => {
                switch (this.activeFilter) {
                    case 'unplanted':
                        return farm.stage === 'Unplanted'
                    case 'developing':
                        return farm.stage === 'Developing'
                    case 'mature':
                        return farm.stage === 'Mature'
                    default:
                        return true
                }
            })
        }
    },
    methods: {
        openFarmDetails(farm) {
            this.selectedFarm = farm;
            document.body.style.overflow = 'hidden';
        },
        closeFarmDetails() {
            this.selectedFarm = null;
            document.body.style.overflow = 'auto';
            this.showMoreInfo = false;
        },
        closeMoreInfo() {
            this.showMoreInfo = false;
            document.body.style.overflow = 'auto';
        }
    }
}
</script>

<style scoped>
.container {
    max-width: 1280px;
}

.farm-card {
    position: relative;
    backdrop-filter: blur(10px);
    border: 1px solid rgba(255, 255, 255, 0.1);
}

.status-ribbon {
    position: absolute;
    top: 20px;
    padding: 8px 30px;
    color: white;
    font-weight: 500;
    transform: rotate(45deg);
    z-index: 10;
    text-align: center;
    min-width: 150px;
    box-shadow: 0 2px 4px rgba(0, 0, 0, 0.1);
    text-transform: uppercase;
    font-size: 0.875rem;
    letter-spacing: 0.05em;
}

.status-ribbon::before,
.status-ribbon::after {
    content: '';
    position: absolute;
    top: 100%;
    z-index: -1;
    border-bottom: 3px solid transparent;
    border-top: 3px solid rgba(0, 0, 0, 0.2);
}

.status-ribbon::before {
    left: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid rgba(0, 0, 0, 0.2);
}

.status-ribbon::after {
    right: 0;
    border-left: 3px solid rgba(0, 0, 0, 0.2);
    border-right: 3px solid transparent;
}

/* RTL specific styles */
[dir="rtl"] .status-ribbon {
    transform: rotate(-45deg);
}

[dir="rtl"] .status-ribbon::before {
    left: auto;
    right: 0;
    border-left: 3px solid rgba(0, 0, 0, 0.2);
    border-right: 3px solid transparent;
}

[dir="rtl"] .status-ribbon::after {
    right: auto;
    left: 0;
    border-left: 3px solid transparent;
    border-right: 3px solid rgba(0, 0, 0, 0.2);
}

/* Add smooth transition for modal */
.modal-enter-active,
.modal-leave-active {
    transition: opacity 0.3s ease;
}

.modal-enter-from,
.modal-leave-to {
    opacity: 0;
}

@keyframes modal-entry {
    from {
        opacity: 0;
        transform: scale(0.95) translateY(-10px);
    }

    to {
        opacity: 1;
        transform: scale(1) translateY(0);
    }
}

.animate-modal-entry {
    animation: modal-entry 0.3s ease-out forwards;
}
</style>