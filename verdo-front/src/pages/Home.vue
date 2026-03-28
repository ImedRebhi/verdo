<template>
    <div>
        <HeroSection />
        <VideoSection />
        <HowItWorksSection />
        <WhyInvestSection />
        <CropsSection />
    </div>
</template>

<script>
import HeroSection from '../components/HeroSection.vue'
import VideoSection from '../components/VideoSection.vue'
import HowItWorksSection from '../components/HowItWorksSection.vue'
import WhyInvestSection from '../components/WhyInvestSection.vue'
import CropsSection from '../components/CropsSection.vue'

export default {
    name: "Home",
    components: {
        HeroSection,
        VideoSection,
        HowItWorksSection,
        WhyInvestSection,
        CropsSection
    }
}
</script>

<style scoped>
.wave-separator {
    position: relative;
    width: 100%;
    height: 150px;
    overflow: hidden;
    line-height: 0;
    transform: rotate(180deg);
}

.wave-separator svg {
    position: relative;
    display: block;
    width: calc(100% + 1.3px);
    height: 150px;
}

.wave-separator .shape-fill {
    fill: #F9FAFB;
}

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

.curved-separator {
    position: relative;
    height: 150px;
    margin-top: -150px;
    z-index: 1;
    pointer-events: none;
}

.curve {
    position: absolute;
    height: 250px;
    width: 100%;
    bottom: 0;
    text-align: center;
}

.curve::before {
    content: '';
    display: block;
    position: absolute;
    border-radius: 100% 50%;
    width: 55%;
    height: 100%;
    background-color: white;
    transform: translate(85%, 60%);
}

.curve::after {
    content: '';
    display: block;
    position: absolute;
    border-radius: 100% 50%;
    width: 55%;
    height: 100%;
    background-color: white;
    transform: translate(-4%, 40%);
    z-index: -1;
}

.half-circle-separator {
    position: relative;
    height: 150px;
    margin-top: -150px;
    overflow: hidden;
}

.half-circle {
    position: absolute;
    bottom: -50%;
    left: -50%;
    right: -50%;
    height: 300px;
    background-color: white;
    border-radius: 50%;
}

.card-shadow {
    box-shadow: 0 4px 6px -1px rgba(0, 0, 0, 0.1),
        0 2px 4px -1px rgba(0, 0, 0, 0.06),
        0 0 0 1px rgba(0, 0, 0, 0.05);
}

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