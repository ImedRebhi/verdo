<template>
    <div>
        <!-- Hero Section -->
        <div class="relative h-screen">
            <!-- Background Image -->
            <div class="absolute inset-0 z-0">
                <img src="https://images.unsplash.com/photo-1500382017468-9049fed747ef?q=80&w=2532&auto=format&fit=crop"
                    alt="Beautiful farmland landscape" class="w-full h-full object-cover" />
                <div class="absolute inset-0 bg-black/40"></div>
            </div>

            <!-- Hero Content -->
            <div class="relative z-10 flex flex-col items-center justify-center h-full text-center px-4 md:px-8">
                <div class="text-white max-w-4xl mx-auto">
                    <h1 class="text-4xl md:text-6xl font-bold mb-6">{{ t('howItWorks.hero.title') }}</h1>
                    <p class="text-lg md:text-xl leading-relaxed">
                        {{ t('howItWorks.hero.subtitle') }}
                    </p>
                </div>
            </div>
        </div>

        <!-- Integrated Farmland System Section -->
        <div class="relative py-16 md:py-24 bg-gray-50" @click="handleOutsideClick">
            <div class="container mx-auto px-4">
                <div class="grid grid-cols-1 md:grid-cols-2 gap-16 items-start">
                    <!-- Left Column -->
                    <div class="bg-white p-8 rounded-2xl shadow-xl">
                        <div class="max-w-xl">
                            <div class="inline-block px-4 py-2 bg-orange-100 rounded-full mb-6">
                                <h3 class="text-orange-500 font-semibold tracking-wide uppercase text-sm">{{
                                    t('howItWorks.system.title') }}</h3>
                            </div>
                            <h2 class="text-3xl md:text-4xl font-bold text-gray-800 mb-6">{{
                                t('howItWorks.system.subtitle') }}</h2>
                            <p class="text-gray-600 leading-relaxed mb-8 text-lg">
                                {{ t('howItWorks.system.description') }}
                            </p>
                            <div class="relative overflow-hidden rounded-2xl shadow-2xl">
                                <img src="https://images.unsplash.com/photo-1625246333195-78d9c38ad449?q=80&w=1000&auto=format&fit=crop"
                                    alt="Farm System Map"
                                    class="w-full h-80 object-cover transform hover:scale-105 transition-transform duration-500" />
                            </div>
                        </div>
                    </div>

                    <!-- Right Column - Accordion -->
                    <div class="space-y-4">
                        <div v-for="(item, index) in accordionItems" :key="index"
                            class="bg-white rounded-xl overflow-hidden shadow-lg hover:shadow-xl transition-shadow duration-300">
                            <button @click.stop="toggleAccordion(index)"
                                class="w-full px-8 py-6 flex justify-between items-center hover:bg-gray-50 transition-colors duration-200">
                                <span class="text-lg font-semibold text-gray-700 flex items-center">
                                    <span
                                        class="w-12 h-12 flex items-center justify-center bg-orange-100 rounded-full mr-4">
                                        <component :is="item.icon" class="w-6 h-6 text-orange-500" />
                                    </span>
                                    {{ item.title }}
                                </span>
                                <svg class="w-5 h-5 text-orange-500 transform transition-transform duration-300"
                                    :class="{ 'rotate-180': openAccordionIndex === index }"
                                    xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="none"
                                    stroke="currentColor">
                                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2"
                                        d="M19 9l-7 7-7-7" />
                                </svg>
                            </button>
                            <div v-if="openAccordionIndex === index"
                                class="px-8 py-6 bg-orange-50/30 border-t border-orange-100">
                                <p class="text-gray-600 leading-relaxed text-lg" v-html="item.content"></p>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>

        <!-- Étude de l'opportunité Section -->
        <div class="py-20 bg-gradient-to-br from-white via-gray-50 to-orange-50">
            <div class="container mx-auto px-4">
                <div class="text-center mb-16">
                    <span class="inline-block px-8 py-6 bg-orange-100 rounded-full mb-4">
                        <h3 class="text-orange-500 font-semibold tracking-wide uppercase text-2xl">{{
                            t('howItWorks.ourProcess.title') }}</h3>
                    </span>
                    <p class="text-xl text-gray-600 max-w-3xl mx-auto">
                        {{ t('howItWorks.ourProcess.description') }}
                    </p>
                </div>

                <!-- Timeline Section -->
                <div class="relative flex flex-col space-y-8 px-4">
                    <!-- Timeline Line -->
                    <div
                        class="absolute left-8 top-0 bottom-0 w-1 bg-gradient-to-b from-orange-500/50 to-orange-300/50">
                    </div>

                    <!-- Step 1 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            1
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step1.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step1.description.part1') }}

                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step1.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 2 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            2
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step2.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step2.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step2.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 3 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            3
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step3.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step3.description.part1') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 4 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            4
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step4.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step4.description.part1') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 5 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            5
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step5.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step5.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step5.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 6 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            6
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step6.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step6.description.part1') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 7 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            7
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step7.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step7.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step7.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 8 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            8
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step8.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step8.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step8.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 9 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            9
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step9.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step9.description.part1') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 10 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            10
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step10.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step10.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step10.description.part2') }}
                            </p>
                        </div>
                    </div>

                    <!-- Step 11 -->
                    <div class="relative pl-24">
                        <div
                            class="absolute left-4 -translate-x-1/2 w-12 h-12 bg-orange-500 rounded-full flex items-center justify-center text-white font-bold text-xl shadow-lg border-4 border-white z-10">
                            11
                        </div>
                        <div class="bg-white rounded-2xl p-8 shadow-lg hover:shadow-xl transition-all duration-300">
                            <h3 class="text-xl font-bold text-gray-900 mb-4">{{
                                t('howItWorks.ourProcess.steps.step11.title') }}</h3>
                            <p class="text-gray-600 leading-relaxed">
                                - {{ t('howItWorks.ourProcess.steps.step11.description.part1') }}
                                <br>
                                - {{ t('howItWorks.ourProcess.steps.step11.description.part2') }}
                            </p>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>
import { useI18n } from 'vue-i18n';
export default {
    name: 'HowItWorks',
    setup() {
        const { t } = useI18n();
        return { t };
    },
    computed: {
        accordionItems() {
            return [
                {
                    title: this.t('howItWorks.system.ownership.title'),
                    content: `${this.t('howItWorks.system.ownership.description.part1')}: 
                    ${this.t('howItWorks.system.ownership.description.part2')}
                    ${this.t('howItWorks.system.ownership.description.part3')}
                    `,
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.operations.title'),
                    content: this.t('howItWorks.system.operations.description'),
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.governance.title'),
                    content: `${this.t('howItWorks.system.governance.description.part1')}<br><br>
                    ${this.t('howItWorks.system.governance.description.part2')}<br><br>
                    - ${this.t('howItWorks.system.governance.description.part3')}<br>
                    - ${this.t('howItWorks.system.governance.description.part4')}<br>
                    - ${this.t('howItWorks.system.governance.description.part5')}<br>
                    - ${this.t('howItWorks.system.governance.description.part6')}<br>
                    - ${this.t('howItWorks.system.governance.description.part7')}`,
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 6V4m0 2a2 2 0 100 4m0-4a2 2 0 110 4m-6 8a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4m6 6v10m6-2a2 2 0 100-4m0 4a2 2 0 110-4m0 4v2m0-6V4" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.commercialization.title'),
                    content: this.t('howItWorks.system.commercialization.description'),
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.administration.title'),
                    content: this.t('howItWorks.system.administration.description'),
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.communication.title'),
                    content: this.t('howItWorks.system.communication.description'),
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
                        </svg>`
                    }
                },
                {
                    title: this.t('howItWorks.system.smartFarming.title'),
                    content: this.t('howItWorks.system.smartFarming.description'),
                    isOpen: false,
                    icon: {
                        template: `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                        </svg>`
                    }
                }
            ];
        }
    },
    data() {
        return {
            openAccordionIndex: null
        };
    },
    methods: {
        toggleAccordion(index) {
            this.openAccordionIndex = this.openAccordionIndex === index ? null : index;
        },
        handleOutsideClick(event) {
            if (!event.target.closest('button')) {
                this.openAccordionIndex = null;
            }
        }
    }
}
</script>

<style scoped>
.text-olive-light {
    color: #98FB98;
}

.accordion-enter-active,
.accordion-leave-active {
    transition: max-height 0.3s ease-in-out;
    overflow: hidden;
}

.accordion-enter-from,
.accordion-leave-to {
    max-height: 0;
}

.accordion-enter-to,
.accordion-leave-from {
    max-height: 500px;
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

.grid>div {
    animation: fadeInUp 0.6s ease-out forwards;
    opacity: 0;
}

.grid>div:nth-child(1) {
    animation-delay: 0.1s;
}

.grid>div:nth-child(2) {
    animation-delay: 0.2s;
}

.grid>div:nth-child(3) {
    animation-delay: 0.3s;
}

.grid>div:nth-child(4) {
    animation-delay: 0.4s;
}

.grid>div:nth-child(5) {
    animation-delay: 0.5s;
}

.grid>div:nth-child(6) {
    animation-delay: 0.6s;
}

.group:hover .w-16 {
    transform: rotate(6deg) scale(1.1);
}

/* Ajout des styles pour les cartes numérotées */
.group {
    overflow: visible !important;
}

.group:hover {
    transform: translateY(-0.5rem);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Animation pour les numéros */
.group:hover .absolute.-left-4.-top-4 {
    transform: scale(1.1);
    transition: transform 0.3s ease;
}

/* Animation pour la ligne décorative */
.group:hover .absolute.top-0.left-0 {
    background: linear-gradient(to right, #f97316, #fb923c, #f97316);
    transition: background 0.3s ease;
}

/* Animation pour les icônes */
.group:hover .w-16.h-16 {
    transform: rotate(12deg) scale(1.1);
    transition: all 0.3s ease;
}

/* Style pour le texte */
.text-xl.font-bold.text-gray-900 {
    position: relative;
    display: inline-block;
}

.text-xl.font-bold.text-gray-900::after {
    content: '';
    position: absolute;
    bottom: -4px;
    left: 0;
    width: 0;
    height: 2px;
    background-color: #f97316;
    transition: width 0.3s ease;
}

.group:hover .text-xl.font-bold.text-gray-900::after {
    width: 100%;
}

/* Timeline styles */
.timeline-container {
    position: relative;
    padding-left: 2rem;
}

/* Animation for step appearance */
.relative.pl-24 {
    opacity: 0;
    animation: fadeInStep 0.5s ease forwards;
}

@keyframes fadeInStep {
    from {
        opacity: 0;
        transform: translateX(-20px);
    }

    to {
        opacity: 1;
        transform: translateX(0);
    }
}

/* Delay animation for each step */
.relative.pl-24:nth-child(1) {
    animation-delay: 0.1s;
}

.relative.pl-24:nth-child(2) {
    animation-delay: 0.2s;
}

.relative.pl-24:nth-child(3) {
    animation-delay: 0.3s;
}

.relative.pl-24:nth-child(4) {
    animation-delay: 0.4s;
}

.relative.pl-24:nth-child(5) {
    animation-delay: 0.5s;
}

.relative.pl-24:nth-child(6) {
    animation-delay: 0.6s;
}

.relative.pl-24:nth-child(7) {
    animation-delay: 0.7s;
}

.relative.pl-24:nth-child(8) {
    animation-delay: 0.8s;
}

.relative.pl-24:nth-child(9) {
    animation-delay: 0.9s;
}

.relative.pl-24:nth-child(10) {
    animation-delay: 1s;
}

.relative.pl-24:nth-child(11) {
    animation-delay: 1.1s;
}

/* Hover effects */
.bg-white.rounded-2xl {
    transition: all 0.3s ease;
}

.bg-white.rounded-2xl:hover {
    transform: translateX(10px);
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04);
}

/* Number circle animation */
.absolute.left-4 {
    transition: all 0.3s ease;
}

.relative.pl-24:hover .absolute.left-4 {
    transform: translateX(-50%) scale(1.1);
    background-color: #f97316;
}
</style>