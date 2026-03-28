<template>
  <div
    class="theme-surface theme-border fixed top-0 z-50 flex w-full items-center justify-between border-b p-4 md:p-6 header-animate"
    :class="{ 'header-hidden': !showHeader }"
  >
    <div class="flex items-center">
      <img
        :src="Logo"
        alt="Logo"
        class="h-12 w-12 flex-shrink-0 object-contain transition-transform duration-300 hover:rotate-3 md:h-16 md:w-16"
      />
      <div class="ml-2 text-lg font-bold theme-accent md:text-xl">VerdoLive</div>
    </div>

    <nav class="hidden items-center justify-center space-x-8 md:flex">
      <router-link
        v-for="(item, index) in menuItems"
        :key="index"
        :to="item.path"
        class="theme-text nav-link relative font-medium transition-colors duration-300"
        active-class="active"
      >
        {{ $t(`header.${item.translationKey}`) }}
      </router-link>
    </nav>

    <div class="hidden items-center space-x-4 md:flex">
      <div class="relative theme-dropdown">
        <button
          class="theme-text theme-hover flex items-center space-x-2 rounded-md px-3 py-2 transition-colors duration-200"
          @click="isThemeMenuOpen = !isThemeMenuOpen"
        >
          <span class="font-medium">{{ currentThemeLabel }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            :class="{ 'rotate-180 transform': isThemeMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          v-if="isThemeMenuOpen"
          class="theme-surface-strong theme-border absolute right-0 z-50 mt-2 w-44 rounded-md border py-1"
        >
          <button
            v-for="theme in themes"
            :key="theme.code"
            class="theme-text theme-hover flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors duration-200"
            :class="{ 'theme-accent font-medium': currentTheme === theme.code }"
            @click="changeTheme(theme.code)"
          >
            <span>{{ $t(theme.labelKey) }}</span>
            <svg
              v-if="currentTheme === theme.code"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 theme-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <div class="relative language-dropdown">
        <button
          class="theme-text theme-hover flex items-center space-x-2 rounded-md px-3 py-2 transition-colors duration-200"
          @click="isLanguageMenuOpen = !isLanguageMenuOpen"
        >
          <span class="font-medium">{{ currentLanguage }}</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            class="h-4 w-4"
            :class="{ 'rotate-180 transform': isLanguageMenuOpen }"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
          </svg>
        </button>

        <div
          v-if="isLanguageMenuOpen"
          class="theme-surface-strong theme-border absolute right-0 z-50 mt-2 w-36 rounded-md border py-1"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="theme-text theme-hover flex w-full items-center justify-between px-4 py-2 text-left text-sm transition-colors duration-200"
            :class="{ 'theme-accent font-medium': currentLanguage === lang.code }"
            @click="changeLanguage(lang.code)"
          >
            <span>{{ lang.name }}</span>
            <svg
              v-if="currentLanguage === lang.code"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 theme-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <UserMenu />
    </div>

    <div class="flex items-center space-x-3 md:hidden">
      <div class="relative">
        <button
          class="theme-text theme-hover flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200"
          @click="isMobileThemeOpen = !isMobileThemeOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 3v2.25M12 18.75V21m9-9h-2.25M5.25 12H3m15.114 6.364l-1.591-1.591M8.477 8.477 6.886 6.886m10.228 0-1.591 1.591M8.477 15.523l-1.591 1.591M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
          </svg>
        </button>

        <div
          v-if="isMobileThemeOpen"
          class="theme-surface-strong theme-border absolute right-0 z-50 mt-2 w-40 rounded-md border py-1"
        >
          <button
            v-for="theme in themes"
            :key="theme.code"
            class="theme-text theme-hover flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors duration-200"
            :class="{ 'theme-accent font-medium': currentTheme === theme.code }"
            @click="changeTheme(theme.code)"
          >
            <span>{{ $t(theme.labelKey) }}</span>
            <svg
              v-if="currentTheme === theme.code"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 theme-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <div class="relative">
        <button
          class="theme-text theme-hover flex h-8 w-8 items-center justify-center rounded-md transition-colors duration-200"
          @click="isMobileLanguageOpen = !isMobileLanguageOpen"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 12a9 9 0 01-9 9m9-9a9 9 0 00-9-9m9 9H3m9 9a9 9 0 01-9-9m9 9c1.657 0 3-4.03 3-9s-1.343-9-3-9m0 18c-1.657 0-3-4.03-3-9s1.343-9 3-9m-9 9a9 9 0 019-9" />
          </svg>
        </button>

        <div
          v-if="isMobileLanguageOpen"
          class="theme-surface-strong theme-border absolute right-0 z-50 mt-2 w-32 rounded-md border py-1"
        >
          <button
            v-for="lang in languages"
            :key="lang.code"
            class="theme-text theme-hover flex w-full items-center justify-between px-3 py-2 text-left text-sm transition-colors duration-200"
            :class="{ 'theme-accent font-medium': currentLanguage === lang.code }"
            @click="changeLanguage(lang.code)"
          >
            <span>{{ lang.name }}</span>
            <svg
              v-if="currentLanguage === lang.code"
              xmlns="http://www.w3.org/2000/svg"
              class="h-4 w-4 theme-accent"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
            </svg>
          </button>
        </div>
      </div>

      <button class="theme-text focus:outline-none" @click="toggleMenu">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path v-if="!isMenuOpen" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 6h16M4 12h16M4 18h16" />
          <path v-else stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
      </button>
    </div>

    <div
      v-if="isMenuOpen"
      class="theme-surface theme-border absolute left-0 right-0 top-full border-b shadow-lg transition-all duration-300 ease-in-out md:hidden"
      :class="{ 'translate-y-0 opacity-100': isMenuOpen, '-translate-y-4 opacity-0': !isMenuOpen }"
    >
      <div class="theme-border flex justify-center space-x-2 border-b py-4">
        <button
          v-for="lang in languages"
          :key="lang.code"
          class="rounded-md px-4 py-2 text-sm font-medium transition-colors duration-200"
          :class="currentLanguage === lang.code ? 'theme-accent-bg' : 'theme-text theme-hover'"
          @click="changeLanguage(lang.code)"
        >
          {{ lang.code }}
        </button>
      </div>

      <div class="px-2 py-4">
        <router-link
          v-for="(item, index) in menuItems"
          :key="index"
          :to="item.path"
          class="theme-text theme-hover my-1 block rounded-lg px-6 py-3 transition-all duration-300 hover:translate-x-2 hover:scale-102"
          :class="{ 'slide-in': isMenuOpen, 'active-mobile': $route.path === item.path }"
          :style="{ animationDelay: `${index * 0.1}s` }"
          @click="isMenuOpen = false"
        >
          <span :class="{ 'theme-accent font-medium': $route.path === item.path }">
            {{ $t(`header.${item.translationKey}`) }}
          </span>
        </router-link>

        <div class="px-4 pb-2 pt-4">
          <UserMenu />
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import { useI18n } from "vue-i18n";
import Logo from "../assets/olive.png";
import UserMenu from "../components/UserMenu.vue";
import ThemeService from "../services/ThemeService";

export default {
  name: "Header",
  components: {
    UserMenu,
  },
  setup() {
    const { t } = useI18n();
    return { t };
  },
  data() {
    return {
      Logo,
      lastScrollPosition: 0,
      showHeader: true,
      isMenuOpen: false,
      isLanguageMenuOpen: false,
      isMobileLanguageOpen: false,
      isThemeMenuOpen: false,
      isMobileThemeOpen: false,
      currentLanguage: (localStorage.getItem("language") || "en").toUpperCase(),
      currentTheme: ThemeService.getTheme(),
      languages: [
        { code: "EN", name: "English" },
        { code: "FR", name: "Français" },
        { code: "AR", name: "العربية" },
      ],
      themes: [
        { code: "standard", labelKey: "header.themes.standard" },
        { code: "dark", labelKey: "header.themes.dark" },
        { code: "light", labelKey: "header.themes.light" },
        { code: "spring", labelKey: "header.themes.spring" },
      ],
      menuItems: [
        { translationKey: "home", path: "/" },
        { translationKey: "about", path: "/about" },
        { translationKey: "howItWorks", path: "/how-it-works" },
        { translationKey: "opportunities", path: "/opportunities" },
        { translationKey: "impact", path: "/impact" },
        { translationKey: "geoai", path: "/geoai" },
      ],
    };
  },
  computed: {
    currentThemeLabel() {
      const activeTheme = this.themes.find((theme) => theme.code === this.currentTheme);
      return activeTheme ? this.$t(activeTheme.labelKey) : this.$t("header.themes.standard");
    },
  },
  mounted() {
    window.addEventListener("scroll", this.onScroll);
    window.addEventListener("resize", this.onResize);
    window.addEventListener("click", this.handleClickOutside);
  },
  beforeUnmount() {
    window.removeEventListener("scroll", this.onScroll);
    window.removeEventListener("resize", this.onResize);
    window.removeEventListener("click", this.handleClickOutside);
  },
  methods: {
    handleClickOutside(event) {
      const languageDropdown = document.querySelector(".language-dropdown");
      const themeDropdown = document.querySelector(".theme-dropdown");
      const genericRelative = event.target.closest(".relative");

      if (languageDropdown && !languageDropdown.contains(event.target)) {
        this.isLanguageMenuOpen = false;
      }

      if (themeDropdown && !themeDropdown.contains(event.target)) {
        this.isThemeMenuOpen = false;
      }

      if (!genericRelative) {
        this.isMobileLanguageOpen = false;
        this.isMobileThemeOpen = false;
      }
    },
    changeLanguage(lang) {
      this.currentLanguage = lang;
      localStorage.setItem("language", lang.toLowerCase());
      this.isLanguageMenuOpen = false;
      this.isMobileLanguageOpen = false;
      this.$i18n.locale = lang.toLowerCase();
      this.$emit("language-changed", lang);
      if (this.isMenuOpen) {
        this.isMenuOpen = false;
      }
      document.documentElement.dir = lang === "AR" ? "rtl" : "ltr";
    },
    changeTheme(theme) {
      this.currentTheme = ThemeService.setTheme(theme);
      this.isThemeMenuOpen = false;
      this.isMobileThemeOpen = false;
    },
    onScroll() {
      const currentScrollPosition = window.pageYOffset || document.documentElement.scrollTop;

      if (currentScrollPosition < 0) {
        return;
      }

      if (currentScrollPosition > 50) {
        this.showHeader = currentScrollPosition < this.lastScrollPosition;
      } else {
        this.showHeader = true;
      }

      this.lastScrollPosition = currentScrollPosition;

      if (this.isMenuOpen && !this.showHeader) {
        this.isMenuOpen = false;
      }
    },
    toggleMenu() {
      this.isMenuOpen = !this.isMenuOpen;
    },
    onResize() {
      if (window.innerWidth >= 768) {
        this.isMenuOpen = false;
        this.isMobileLanguageOpen = false;
        this.isMobileThemeOpen = false;
      }
    },
  },
};
</script>

<style scoped>
.header-animate {
  transition: all 0.3s ease;
  transform: translateY(0);
  opacity: 1;
  backdrop-filter: blur(5px);
}

.header-hidden {
  transform: translateY(-100%);
  opacity: 0;
}

.nav-link::after {
  content: "";
  position: absolute;
  bottom: -2px;
  left: 0;
  width: 0;
  height: 2px;
  background-color: var(--theme-accent);
  transition: width 0.3s ease;
}

.nav-link:hover::after,
.nav-link.active::after {
  width: 100%;
}

.nav-link.active {
  color: var(--theme-accent);
}

@keyframes slideIn {
  from {
    opacity: 0;
    transform: translateX(-20px);
  }

  to {
    opacity: 1;
    transform: translateX(0);
  }
}

.slide-in {
  animation: slideIn 0.5s ease forwards;
}

@media (max-width: 768px) {
  .header-animate {
    padding: 0.75rem 1rem;
  }

  .slide-in {
    opacity: 0;
  }
}

.hover\:scale-102:hover {
  transform: scale(1.02);
}

.active-mobile {
  background-color: var(--theme-accent-soft);
  border-left: 4px solid var(--theme-accent);
}
</style>
