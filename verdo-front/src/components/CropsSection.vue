<template>
    <div>
        <!-- Hero Section -->
        <div class="bg-white py-16 md:py-24">
            <div class="max-w-7xl mx-auto px-4 flex flex-col items-center">
                <h1 class="text-3xl md:text-3xl font-bold text-gray-900 mb-4 text-center mx-auto">
                    {{ t('home.crops.title') }}
                </h1>
                <p class="text-xl text-gray-600 max-w-2xl text-center mx-auto">
                    {{ t('home.crops.description') }}
                </p>
            </div>
        </div>

        <!-- Crops Section -->
        <div class="max-w-7xl mx-auto px-4 py-16">
            <!-- Header Row -->
            <div class="flex justify-between items-center mb-4 border-b pb-4">
                <div class="flex-1 text-center">
                    <div class="w-8 h-8 mx-auto mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-gray-600" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path d="M13,20H11V8L5.5,13.5L4.08,12.08L12,4.16L19.92,12.08L18.5,13.5L13,8V20Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-600">{{ t('home.crops.table.columns.farmland') }}</span>
                </div>
                <div class="flex-1 text-center">
                    <div class="w-8 h-8 mx-auto mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-gray-600" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M19,3H5C3.89,3 3,3.89 3,5V19A2,2 0 0,0 5,21H19A2,2 0 0,0 21,19V5C21,3.89 20.1,3 19,3M19,5V19H5V5H19Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-600">{{ t('home.crops.table.columns.packaging') }}</span>
                </div>
                <div class="flex-1 text-center">
                    <div class="w-8 h-8 mx-auto mb-2">
                        <svg xmlns="http://www.w3.org/2000/svg" class="w-full h-full text-gray-600" viewBox="0 0 24 24"
                            fill="currentColor">
                            <path
                                d="M11.8,10.9C9.53,10.31 8.8,9.7 8.8,8.75C8.8,7.66 9.81,6.9 11.5,6.9C13.28,6.9 13.94,7.75 14,9H16.21C16.14,7.28 15.09,5.7 13,5.19V3H10V5.16C8.06,5.58 6.5,6.84 6.5,8.77C6.5,11.08 8.41,12.23 11.2,12.9C13.7,13.5 14.2,14.38 14.2,15.31C14.2,16 13.71,17.1 11.5,17.1C9.44,17.1 8.63,16.18 8.5,15H6.32C6.44,17.19 8.08,18.42 10,18.83V21H13V18.85C14.95,18.5 16.5,17.35 16.5,15.3C16.5,12.46 14.07,11.5 11.8,10.9Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium text-gray-600">{{ t('home.crops.table.columns.salesRevenue') }}</span>
                </div>
            </div>

            <!-- Olives Row -->
            <div class="flex items-center py-6 border-b">
                <div class="w-24">
                    <div class="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17,8C8,10 5.9,16.17 3.82,21.34L5.71,22L6.66,19.7C7.14,19.87 7.64,20 8,20C19,20 22,3 22,3C21,5 14,5.25 9,6.25C4,7.25 2,11.5 2,13.5C2,15.5 3.75,17.25 3.75,17.25C7,8 17,8 17,8Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium mt-2 block">{{ t('home.crops.table.rows.olives') }}</span>
                </div>
                <div class="flex-1 flex justify-center">
                    <div class="text-center">
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.current') }} : 0 {{ t('home.crops.table.acres') }}</div>
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.target') }} : 4000 {{ t('home.crops.table.acres') }}</div>
                    </div>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.tons') }}</span>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.currency') }}</span>
                </div>
            </div>

            <!-- Dates Row -->
            <div class="flex items-center py-6 border-b">
                <div class="w-24">
                    <div class="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M17,12C17,14.76 14.76,17 12,17C9.24,17 7,14.76 7,12C7,9.24 9.24,7 12,7C14.76,7 17,9.24 17,12M12,3A9,9 0 0,0 3,12A9,9 0 0,0 12,21A9,9 0 0,0 21,12A9,9 0 0,0 12,3M12,19C8.13,19 5,15.87 5,12C5,8.13 8.13,5 12,5C15.87,5 19,8.13 19,12C19,15.87 15.87,19 12,19M11,10H13V12H11V10Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium mt-2 block">{{ t('home.crops.table.rows.dates') }}</span>
                </div>
                <div class="flex-1 flex justify-center">
                    <div class="text-center">
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.current') }} : 0 {{ t('home.crops.table.acres') }}</div>
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.target') }} : 4000 {{ t('home.crops.table.acres') }}</div>
                    </div>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.tons') }}</span>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.currency') }}</span>
                </div>
            </div>

            <!-- Pistachio Row -->
            <div class="flex items-center py-6">
                <div class="w-24">
                    <div class="w-12 h-12 bg-[#E8F5E9] rounded-full flex items-center justify-center">
                        <svg class="w-6 h-6 text-[#2E7D32]" viewBox="0 0 24 24" fill="currentColor">
                            <path
                                d="M12,2A10,10 0 0,0 2,12A10,10 0 0,0 12,22A10,10 0 0,0 22,12A10,10 0 0,0 12,2M12,4A8,8 0 0,1 20,12A8,8 0 0,1 12,20A8,8 0 0,1 4,12A8,8 0 0,1 12,4M12,6A6,6 0 0,0 6,12A6,6 0 0,0 12,18A6,6 0 0,0 18,12A6,6 0 0,0 12,6M12,8A4,4 0 0,1 16,12A4,4 0 0,1 12,16A4,4 0 0,1 8,12A4,4 0 0,1 12,8Z" />
                        </svg>
                    </div>
                    <span class="text-sm font-medium mt-2 block">{{ t('home.crops.table.rows.pistachios') }}</span>
                </div>
                <div class="flex-1 flex justify-center">
                    <div class="text-center">
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.current') }} : 0 {{ t('home.crops.table.acres') }}</div>
                        <div class="text-sm text-gray-600">{{ t('home.crops.table.target') }} : 4000 {{ t('home.crops.table.acres') }}</div>
                    </div>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.tons') }}</span>
                </div>
                <div class="flex-1 text-center">
                    <span class="text-sm font-medium">0 {{ t('home.crops.table.currency') }}</span>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n'; 

export default {
    name: 'CropsSection',
    setup() {
        const { t } = useI18n();
        return { t };
    }
}
</script>

<style scoped>
[class~="bg-[#E8F5E9]"] {
    background-color: #E8F5E9;
}

[class~="text-[#2E7D32]"] {
    color: #2E7D32;
}
</style>