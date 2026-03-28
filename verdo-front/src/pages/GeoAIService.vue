<template>
  <div class="min-h-screen bg-[linear-gradient(180deg,#f4f1e8_0%,#faf8f3_38%,#eef6ef_100%)] py-12">
    <div class="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
      <div class="mb-8">
        <p class="text-sm font-semibold uppercase tracking-[0.3em] text-emerald-700">{{ $t("geoai.badge") }}</p>
        <h1 class="mt-3 text-4xl font-semibold text-stone-900">{{ $t("geoai.page.title") }}</h1>
        <p class="mt-3 max-w-4xl text-sm leading-6 text-stone-600">
          {{ $t("geoai.page.description") }}
        </p>
      </div>

      <div class="grid gap-8 xl:grid-cols-[1fr_1.25fr]">
        <section class="rounded-[2rem] border border-stone-200 bg-white/90 p-6 shadow-[0_20px_60px_rgba(76,88,56,0.08)]">
          <form class="space-y-6" @submit.prevent="analyze">
            <div class="rounded-3xl border border-stone-200 bg-stone-50 p-4">
              <div class="flex flex-wrap gap-3">
                <button type="button" class="rounded-full px-4 py-2 text-sm font-medium" :class="form.locationMode==='map' ? activeBtn : passiveBtn" @click="form.locationMode='map'">{{ $t("geoai.location.useMap") }}</button>
                <button type="button" class="rounded-full px-4 py-2 text-sm font-medium" :class="form.locationMode==='coordinates' ? activeBtn : passiveBtn" @click="form.locationMode='coordinates'">{{ $t("geoai.location.useCoordinates") }}</button>
              </div>
              <p class="mt-3 text-sm text-stone-600">{{ form.locationMode === "map" ? $t("geoai.location.mapHelp") : $t("geoai.location.coordinatesHelp") }}</p>
            </div>

            <div v-show="form.locationMode === 'map'" class="space-y-3">
              <div class="rounded-[1.75rem] border border-stone-200 bg-white p-4">
                <div class="mb-3 flex items-center justify-between gap-3">
                  <div>
                    <h3 class="text-lg font-semibold text-stone-900">{{ $t("geoai.location.mapTitle") }}</h3>
                    <p class="text-sm text-stone-500">{{ $t("geoai.location.mapHelp") }}</p>
                  </div>
                  <div class="flex flex-wrap items-center gap-3">
                    <label class="flex items-center gap-2 text-sm font-medium text-stone-700">
                      <span>{{ $t("geoai.location.mapType") }}</span>
                      <select
                        v-model="form.mapType"
                        class="rounded-full border border-stone-300 bg-white px-4 py-2 text-sm font-medium text-stone-700 outline-none focus:border-emerald-600"
                        @change="updateMapLayer"
                      >
                        <option v-for="option in mapTypeOptions" :key="option.value" :value="option.value">
                          {{ option.label }}
                        </option>
                      </select>
                    </label>
                    <button
                      type="button"
                      class="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                      @click="resetMapView"
                    >
                      {{ $t("geoai.location.centerMap") }}
                    </button>
                  </div>
                </div>

                <div class="relative">
                  <div
                    ref="mapContainer"
                    class="w-full rounded-2xl border border-stone-200 bg-stone-100"
                    style="height: 360px; min-height: 360px;"
                  ></div>
                  <div
                    v-if="mapLoading"
                    class="absolute inset-0 flex items-center justify-center rounded-2xl bg-white/80 text-sm font-medium text-stone-700"
                  >
                    {{ $t("geoai.location.loadingMap") }}
                  </div>
                </div>

                <div v-if="mapError" class="mt-3 rounded-2xl border border-amber-200 bg-amber-50 px-4 py-3 text-sm text-amber-800">
                  {{ mapError }}
                </div>
              </div>
              <p class="text-sm text-stone-500">{{ $t("geoai.location.selectedPoint") }} <span class="font-semibold text-stone-800">{{ coordinatePreview }}</span></p>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div>
                <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.latitude") }}</label>
                <input v-model="form.lat" type="number" step="any" required class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600" />
              </div>
              <div>
                <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.longitude") }}</label>
                <input v-model="form.lon" type="number" step="any" required class="w-full rounded-2xl border border-stone-300 bg-stone-50 px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600" />
              </div>
            </div>

            <div class="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
              <div class="flex flex-wrap gap-3">
                <button type="button" class="rounded-full px-4 py-2 text-sm font-medium" :class="form.analysisMode==='full' ? activeBtn : passiveBtn" @click="form.analysisMode='full'">{{ $t("geoai.analysis.full") }}</button>
                <button type="button" class="rounded-full px-4 py-2 text-sm font-medium" :class="form.analysisMode==='specific' ? activeBtn : passiveBtn" @click="form.analysisMode='specific'">{{ $t("geoai.analysis.specific") }}</button>
              </div>
              <div v-if="form.analysisMode==='specific'" class="mt-4">
                <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.analysis.treeToTest") }}</label>
                <select v-model="form.selectedCrop" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600">
                  <option disabled value="">{{ $t("geoai.analysis.selectTree") }}</option>
                  <option v-for="crop in crops" :key="crop.key" :value="crop.key">{{ crop.name }}</option>
                </select>
              </div>
            </div>

            <div class="grid gap-4 md:grid-cols-2">
              <div class="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
                <h3 class="text-lg font-semibold text-stone-900">{{ $t("geoai.sections.waterTerrain") }}</h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.waterAccess") }}</label>
                    <select v-model="form.waterAccess" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600">
                      <option value="unknown">{{ $t("geoai.options.unknown") }}</option>
                      <option value="true">{{ $t("geoai.options.available") }}</option>
                      <option value="false">{{ $t("geoai.options.limited") }}</option>
                    </select>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">
                      {{ $t("geoai.form.slope") }}
                      <span class="font-semibold">{{ form.slopeMax === "" ? $t("geoai.options.unknown") : `${form.slopeMax}%` }}</span>
                    </label>
                    <input v-model="form.slopeMax" type="range" min="0" max="30" step="1" class="w-full accent-emerald-700" />
                    <button type="button" class="mt-2 text-xs font-medium text-stone-500 underline-offset-2 hover:underline" @click="form.slopeMax=''">
                      {{ $t("geoai.form.clearOptional") }}
                    </button>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.waterSalinity") }}</label>
                    <input v-model="form.waterSalinity" type="number" step="0.1" min="0" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600" />
                  </div>
                </div>
              </div>

              <div class="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
                <h3 class="text-lg font-semibold text-stone-900">{{ $t("geoai.sections.soilTest") }}</h3>
                <div class="mt-4 space-y-4">
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">
                      {{ $t("geoai.form.soilPh") }}
                      <span class="font-semibold">{{ form.soilPh === "" ? $t("geoai.options.unknown") : Number(form.soilPh).toFixed(1) }}</span>
                    </label>
                    <input v-model="form.soilPh" type="range" min="4" max="9" step="0.1" class="w-full accent-emerald-700" />
                    <button type="button" class="mt-2 text-xs font-medium text-stone-500 underline-offset-2 hover:underline" @click="form.soilPh=''">
                      {{ $t("geoai.form.clearOptional") }}
                    </button>
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.organicMatter") }}</label>
                    <input v-model="form.organicMatter" type="number" step="0.1" min="0" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600" />
                  </div>
                  <div>
                    <label class="mb-2 block text-sm font-medium text-stone-700">{{ $t("geoai.form.nitrogen") }}</label>
                    <select v-model="form.nitrogen" class="w-full rounded-2xl border border-stone-300 bg-white px-4 py-3 text-sm text-stone-900 outline-none focus:border-emerald-600">
                      <option value="unknown">{{ $t("geoai.options.unknown") }}</option>
                      <option value="low">{{ $t("geoai.options.low") }}</option>
                      <option value="medium">{{ $t("geoai.options.medium") }}</option>
                      <option value="high">{{ $t("geoai.options.high") }}</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            <div v-if="error" class="rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{{ error }}</div>

            <div class="flex flex-wrap items-center gap-3">
              <button type="submit" :disabled="loading" class="rounded-full bg-emerald-700 px-6 py-3 text-sm font-medium text-white transition hover:bg-emerald-800 disabled:opacity-60">
                {{ loading ? $t("geoai.actions.analyzing") : $t("geoai.actions.analyze") }}
              </button>
              <button type="button" class="rounded-full border border-stone-300 px-6 py-3 text-sm font-medium text-stone-700 transition hover:bg-stone-100" @click="loadHistory">{{ $t("geoai.actions.refreshHistory") }}</button>
            </div>
          </form>
        </section>

        <section class="space-y-6">
          <div ref="printSection" class="rounded-[2rem] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(76,88,56,0.08)] print-card">
            <div class="flex flex-wrap items-start justify-between gap-4">
              <div>
                <h2 class="text-2xl font-semibold text-stone-900">{{ $t("geoai.latestResult.title") }}</h2>
                <p class="mt-1 text-sm text-stone-500">{{ $t("geoai.latestResult.subtitle") }}</p>
              </div>
              <button
                v-if="result"
                type="button"
                class="no-print inline-flex h-12 w-12 items-center justify-center rounded-full border border-stone-300 bg-white text-stone-700 shadow-sm transition hover:border-emerald-500 hover:text-emerald-700"
                :title="$t('geoai.actions.printPdf')"
                :aria-label="$t('geoai.actions.printPdf')"
                @click="printResult"
              >
                <svg viewBox="0 0 24 24" class="h-5 w-5" fill="none" stroke="currentColor" stroke-width="1.8" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                  <path d="M7 8V4h10v4" />
                  <rect x="6" y="14" width="12" height="6" rx="1.5" />
                  <path d="M6 10H5a2 2 0 0 0-2 2v4h3" />
                  <path d="M18 16h3v-4a2 2 0 0 0-2-2h-1" />
                  <path d="M17 12h.01" />
                </svg>
              </button>
            </div>

            <template v-if="result">
              <div class="mt-6 grid gap-4 lg:grid-cols-4">
                <article v-for="item in summaryCards" :key="item.label" class="rounded-3xl border border-stone-200 bg-stone-50 p-4">
                  <p class="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{{ item.label }}</p>
                  <p class="mt-3 text-2xl font-semibold text-stone-900">{{ item.value }}</p>
                  <p class="mt-2 text-sm text-stone-600">{{ item.note }}</p>
                </article>
              </div>

              <div class="mt-6 rounded-3xl p-6 text-white" :class="isAgricultureAvailable ? 'bg-gradient-to-r from-emerald-900 via-emerald-800 to-lime-700' : 'bg-gradient-to-r from-rose-900 via-rose-800 to-orange-700'">
                <p class="text-xs font-semibold uppercase tracking-[0.25em] text-white/80">{{ $t("geoai.recommendation.title") }}</p>
                <h3 class="mt-3 text-2xl font-semibold">{{ headline }}</h3>
                <p class="mt-3 max-w-3xl text-sm leading-6 text-white/90">{{ summary }}</p>
              </div>

              <div v-if="!isAgricultureAvailable" class="mt-6 rounded-3xl border border-rose-200 bg-rose-50 p-6">
                <h3 class="text-xl font-semibold text-rose-800">{{ $t("geoai.status.notSuitable") }}</h3>
                <p class="mt-2 text-sm leading-6 text-rose-700">{{ buildingText }}</p>
              </div>

              <template v-else-if="form.analysisMode==='specific' && specificCrop">
                <div class="mt-6 grid gap-5 lg:grid-cols-[1.1fr_0.9fr]">
                  <article class="overflow-hidden rounded-[1.75rem] border border-stone-200 bg-white shadow-sm">
                    <img :src="specificCrop.image" :alt="specificCrop.name" class="h-56 w-full object-cover" />
                    <div class="p-5">
                      <div class="flex items-start justify-between gap-3">
                        <div>
                          <h4 class="text-2xl font-semibold text-stone-900">{{ specificCrop.name }}</h4>
                          <p class="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{{ specificCrop.localName }}</p>
                        </div>
                        <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]" :class="specificCrop.badgeClass">{{ specificCrop.verdict }}</span>
                      </div>
                      <p class="mt-4 text-sm leading-6 text-stone-700">{{ specificCrop.recommendation }}</p>
                      <div class="mt-4 rounded-2xl bg-stone-50 p-4">
                        <p class="text-xs font-semibold uppercase tracking-[0.16em] text-stone-500">{{ $t("geoai.analysis.decisionForTree") }}</p>
                        <p class="mt-2 text-lg font-semibold" :class="specificCrop.verdictKey==='notRecommended' ? 'text-rose-700' : 'text-emerald-700'">{{ specificDecision }}</p>
                      </div>
                    </div>
                  </article>
                  <article class="rounded-[1.75rem] border border-stone-200 bg-stone-50 p-5">
                    <p class="text-xs font-semibold uppercase tracking-[0.2em] text-stone-500">{{ $t("geoai.analysis.bestAlternative") }}</p>
                    <h4 class="mt-3 text-2xl font-semibold text-stone-900">{{ bestCrop.name }}</h4>
                    <p class="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{{ bestCrop.localName }}</p>
                    <p class="mt-4 text-sm leading-6 text-stone-700">{{ bestCrop.simpleMessage }}</p>
                  </article>
                </div>
              </template>

              <template v-else>
                <div class="mt-6 space-y-8">
                  <div>
                    <div class="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 class="text-xl font-semibold text-stone-900">{{ $t("geoai.full.recommendedTitle") }}</h3>
                        <p class="text-sm text-stone-500">{{ $t("geoai.full.recommendedSubtitle") }}</p>
                      </div>
                      <span class="rounded-full bg-emerald-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-emerald-800">
                        {{ recommendedCrops.length }} options
                      </span>
                    </div>

                    <div class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                      <article
                        v-for="crop in recommendedCrops"
                        :key="crop.key"
                        class="overflow-hidden rounded-[1.75rem] border border-emerald-100 bg-emerald-50/70 shadow-sm"
                      >
                        <img :src="crop.image" :alt="crop.name" class="h-44 w-full object-cover" />
                        <div class="p-5">
                          <div class="flex items-start justify-between gap-3">
                            <div>
                              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-emerald-700">{{ $t("geoai.full.recommendedBadge") }}</p>
                              <h4 class="mt-2 text-xl font-semibold text-stone-900">{{ crop.name }}</h4>
                              <p class="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{{ crop.localName }}</p>
                            </div>
                            <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]" :class="crop.badgeClass">
                              {{ crop.verdict }}
                            </span>
                          </div>
                          <p class="mt-4 text-sm leading-6 text-stone-700">{{ crop.simpleMessage }}</p>
                          <ul class="mt-4 space-y-2 text-sm text-stone-600">
                            <li v-for="reason in crop.reasons" :key="reason">• {{ reason }}</li>
                          </ul>
                        </div>
                      </article>
                    </div>
                  </div>

                  <div>
                    <div class="mb-4 flex items-center justify-between gap-3">
                      <div>
                        <h3 class="text-xl font-semibold text-stone-900">{{ $t("geoai.full.notRecommendedTitle") }}</h3>
                        <p class="text-sm text-stone-500">{{ $t("geoai.full.notRecommendedSubtitle") }}</p>
                      </div>
                      <span class="rounded-full bg-rose-100 px-3 py-1 text-xs font-semibold uppercase tracking-[0.16em] text-rose-800">
                        {{ notRecommendedCrops.length }} options
                      </span>
                    </div>

                    <div v-if="notRecommendedCrops.length" class="grid gap-4 lg:grid-cols-2 xl:grid-cols-3">
                      <article
                        v-for="crop in notRecommendedCrops"
                        :key="crop.key"
                        class="overflow-hidden rounded-[1.75rem] border border-rose-100 bg-rose-50/70 shadow-sm"
                      >
                        <img :src="crop.image" :alt="crop.name" class="h-44 w-full object-cover" />
                        <div class="p-5">
                          <div class="flex items-start justify-between gap-3">
                            <div>
                              <p class="text-xs font-semibold uppercase tracking-[0.18em] text-rose-700">{{ $t("geoai.full.notRecommendedBadge") }}</p>
                              <h4 class="mt-2 text-xl font-semibold text-stone-900">{{ crop.name }}</h4>
                              <p class="mt-1 text-xs font-medium uppercase tracking-[0.14em] text-stone-500">{{ crop.localName }}</p>
                            </div>
                            <span class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]" :class="crop.badgeClass">
                              {{ crop.verdict }}
                            </span>
                          </div>
                          <p class="mt-4 text-sm leading-6 text-stone-700">{{ crop.simpleMessage }}</p>
                          <ul class="mt-4 space-y-2 text-sm text-stone-600">
                            <li v-for="reason in crop.reasons" :key="reason">• {{ reason }}</li>
                          </ul>
                        </div>
                      </article>
                    </div>
                    <div v-else class="rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
                      {{ $t("geoai.full.allAcceptable") }}
                    </div>
                  </div>
                </div>
              </template>
            </template>

            <p v-else class="mt-6 text-sm text-stone-500">{{ $t("geoai.emptyResult") }}</p>
          </div>

          <div class="rounded-[2rem] border border-stone-200 bg-white/95 p-6 shadow-[0_20px_60px_rgba(76,88,56,0.08)]">
            <div class="flex items-center justify-between gap-3">
              <div>
                <h2 class="text-2xl font-semibold text-stone-900">{{ $t("geoai.history.title") }}</h2>
                <p class="mt-1 text-sm text-stone-500">{{ $t("geoai.history.subtitle") }}</p>
              </div>
              <button
                type="button"
                class="rounded-full border border-stone-300 px-4 py-2 text-sm font-medium text-stone-700 transition hover:bg-stone-100"
                @click="loadHistory"
              >
                {{ $t("geoai.history.refresh") }}
              </button>
            </div>

            <div v-if="historyLoading" class="mt-6 rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
              {{ $t("geoai.history.loading") }}
            </div>

            <div v-else-if="!history.length" class="mt-6 rounded-3xl border border-stone-200 bg-stone-50 p-5 text-sm text-stone-600">
              {{ $t("geoai.history.empty") }}
            </div>

            <div v-else class="mt-6 space-y-4">
              <button
                v-for="entry in history"
                :key="entry._id"
                type="button"
                class="w-full rounded-[1.5rem] border border-stone-200 bg-stone-50 p-4 text-left transition hover:border-emerald-300 hover:bg-emerald-50"
                @click="selectHistory(entry)"
              >
                <div class="flex flex-wrap items-start justify-between gap-3">
                  <div>
                    <p class="text-sm font-semibold text-stone-900">
                      {{ Number(entry.lat).toFixed(5) }}, {{ Number(entry.lon).toFixed(5) }}
                    </p>
                    <p class="mt-1 text-sm text-stone-600">
                      {{ formatHistoryDate(entry.createdAt) }}
                    </p>
                  </div>
                  <span
                    class="rounded-full px-3 py-1 text-xs font-semibold uppercase tracking-[0.15em]"
                    :class="entry.result?.siteAssessment?.isAgricultureAvailable === false ? 'bg-rose-100 text-rose-800' : 'bg-emerald-100 text-emerald-800'"
                  >
                    {{ entry.result?.siteAssessment?.isAgricultureAvailable === false ? $t("geoai.history.notAgricultural") : $t("geoai.history.agricultural") }}
                  </span>
                </div>
                <p class="mt-3 text-sm leading-6 text-stone-600">
                  {{
                    entry.result?.siteAssessment?.isAgricultureAvailable === false
                      ? $t("geoai.status.notAvailableHeadline")
                      : entry.result?.siteAssessment?.isAgricultureAvailable === true
                      ? $t("geoai.status.availableHeadline")
                      : (entry.result?.siteAssessment?.headline || $t("geoai.history.savedAnalysis"))
                  }}
                </p>
              </button>
            </div>
          </div>
        </section>
      </div>
    </div>

    <section v-if="result" class="print-certificate">
      <div class="print-certificate__header">
        <p class="print-certificate__eyebrow">{{ $t("geoai.certificate.eyebrow") }}</p>
        <h1 class="print-certificate__title">{{ $t("geoai.certificate.title") }}</h1>
        <p class="print-certificate__subtitle">{{ $t("geoai.certificate.subtitle") }}</p>
      </div>

      <div class="print-certificate__meta">
        <div>
          <p class="print-certificate__label">{{ $t("geoai.certificate.location") }}</p>
          <p class="print-certificate__value">{{ coordinatePreview }}</p>
        </div>
        <div>
          <p class="print-certificate__label">{{ $t("geoai.certificate.date") }}</p>
          <p class="print-certificate__value">{{ printDate }}</p>
        </div>
      </div>

      <div class="print-certificate__map" v-if="printMapMarkup">
        <div
          class="print-certificate__map-frame"
          :aria-label="$t('geoai.certificate.mapAlt')"
          v-html="printMapMarkup"
        ></div>
      </div>

      <div class="print-certificate__body">
        <div class="print-certificate__block">
          <p class="print-certificate__label">{{ $t("geoai.certificate.decision") }}</p>
          <h2 class="print-certificate__headline">{{ headline }}</h2>
          <p class="print-certificate__text">{{ summary }}</p>
        </div>

        <div v-if="isAgricultureAvailable" class="print-certificate__block">
          <p class="print-certificate__label">{{ $t("geoai.certificate.recommendations") }}</p>
          <ul class="print-certificate__list">
            <li v-for="crop in recommendedCrops.slice(0, 3)" :key="`print-${crop.key}`">
              <strong>{{ crop.name }}:</strong> {{ crop.simpleMessage }}
            </li>
          </ul>
        </div>

        <div v-else class="print-certificate__block">
          <p class="print-certificate__label">{{ $t("geoai.certificate.status") }}</p>
          <p class="print-certificate__text">{{ buildingText }}</p>
        </div>
      </div>

      <footer class="print-certificate__footer">
        {{ $t("geoai.certificate.footer") }}
      </footer>
    </section>
  </div>
</template>

<script>
import { nextTick } from "vue";
import GeoAIService from "../services/GeoAIService";
import { crops, getCropResults } from "../utils/treeConditions";

const loadStylesheet = (id, href) =>
  new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      resolve();
      return;
    }
    const link = document.createElement("link");
    link.id = id;
    link.rel = "stylesheet";
    link.href = href;
    link.onload = () => resolve();
    link.onerror = () => reject(new Error(`Failed to load stylesheet: ${href}`));
    document.head.appendChild(link);
  });

const loadScriptTag = (id, src) =>
  new Promise((resolve, reject) => {
    const existing = document.getElementById(id);
    if (existing) {
      if (existing.dataset.loaded === "true" && window.L) {
        resolve(window.L);
        return;
      }
      existing.addEventListener("load", () => resolve(window.L), { once: true });
      existing.addEventListener("error", () => reject(new Error(`Failed to load script: ${src}`)), { once: true });
      return;
    }
    const script = document.createElement("script");
    script.id = id;
    script.src = src;
    script.onload = () => {
      script.dataset.loaded = "true";
      resolve(window.L);
    };
    script.onerror = () => reject(new Error(`Failed to load script: ${src}`));
    document.body.appendChild(script);
  });

const loadLeaflet = async () => {
  if (window.L) return window.L;
  const cssSources = [
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.css",
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.css",
  ];
  let cssLoaded = false;
  for (const [index, href] of cssSources.entries()) {
    try {
      await loadStylesheet(`leaflet-css-${index}`, href);
      cssLoaded = true;
      break;
    } catch (error) {
      continue;
    }
  }
  if (!cssLoaded) {
    throw new Error("The map stylesheet could not be loaded.");
  }

  const scriptSources = [
    "https://unpkg.com/leaflet@1.9.4/dist/leaflet.js",
    "https://cdn.jsdelivr.net/npm/leaflet@1.9.4/dist/leaflet.js",
  ];
  for (const [index, src] of scriptSources.entries()) {
    try {
      const leaflet = await loadScriptTag(`leaflet-js-${index}`, src);
      if (leaflet) return leaflet;
    } catch (error) {
      continue;
    }
  }
  throw new Error("The interactive map could not be loaded from the available map providers.");
};

const MAP_TILE_LAYERS = {
  standard: {
    url: "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    options: {
      attribution: "&copy; OpenStreetMap contributors",
      maxZoom: 19,
    },
  },
  satellite: {
    url: "https://server.arcgisonline.com/ArcGIS/rest/services/World_Imagery/MapServer/tile/{z}/{y}/{x}",
    options: {
      attribution: "Tiles &copy; Esri",
      maxZoom: 19,
    },
  },
  terrain: {
    url: "https://{s}.tile.opentopomap.org/{z}/{x}/{y}.png",
    options: {
      attribution: "Map data: &copy; OpenStreetMap contributors, SRTM | Map style: &copy; OpenTopoMap",
      maxZoom: 17,
    },
  },
};

const boolVal = (value) => value === "true" ? true : value === "false" ? false : null;

const badgeClassForVerdict = (verdictKey) => {
  if (verdictKey === "excellent") {
    return "bg-emerald-100 text-emerald-800";
  }
  if (verdictKey === "good") {
    return "bg-lime-100 text-lime-800";
  }
  if (verdictKey === "possible") {
    return "bg-amber-100 text-amber-800";
  }
  return "bg-rose-100 text-rose-800";
};

const escapeHtml = (value) =>
  String(value ?? "")
    .replace(/&/g, "&amp;")
    .replace(/</g, "&lt;")
    .replace(/>/g, "&gt;")
    .replace(/"/g, "&quot;")
    .replace(/'/g, "&#39;");

export default {
  name: "GeoAIService",
  data() {
    return { activeBtn: "bg-emerald-700 text-white", passiveBtn: "border border-stone-300 bg-white text-stone-700", form: { locationMode: "map", mapType: "standard", analysisMode: "full", selectedCrop: "", lat: "34.7406", lon: "10.7603", waterAccess: "unknown", waterSalinity: "", slopeMax: "", soilPh: "", organicMatter: "", nitrogen: "unknown" }, loading: false, error: "", result: null, historyLoading: false, history: [], map: null, mapLayer: null, marker: null, mapError: "", mapLoading: false };
  },
  computed: {
    crops() { return crops; },
    printDate() { return new Date().toLocaleDateString(); },
    printMapMarkup() {
      const container = this.$refs.mapContainer;
      if (!container) return "";
      return container.innerHTML || "";
    },
    mapTypeOptions() {
      return [
        { value: "standard", label: this.$t("geoai.location.mapTypes.standard") },
        { value: "satellite", label: this.$t("geoai.location.mapTypes.satellite") },
        { value: "terrain", label: this.$t("geoai.location.mapTypes.terrain") },
      ];
    },
    coordinatePreview() { const a = Number(this.form.lat), b = Number(this.form.lon); return Number.isFinite(a) && Number.isFinite(b) ? `${a.toFixed(5)}, ${b.toFixed(5)}` : this.$t("geoai.location.noPoint"); },
    isAgricultureAvailable() { return this.result?.siteAssessment?.isAgricultureAvailable ?? this.result?.landUseCheck?.isAgricultureAvailable ?? true; },
    buildingText() { return this.result?.siteAssessment?.summary || this.$t("geoai.status.notAvailableSummary"); },
    summaryCards() {
        const a = Number(this.form.lat), b = Number(this.form.lon), ph = Number(this.form.soilPh), slope = Number(this.form.slopeMax);
        const hasPh = this.form.soilPh !== "" && Number.isFinite(ph);
        const hasSlope = this.form.slopeMax !== "" && Number.isFinite(slope);
      return [
        { label: this.$t("geoai.summaryCards.landStatus.label"), value: this.isAgricultureAvailable ? this.$t("geoai.summaryCards.landStatus.open") : this.$t("geoai.summaryCards.landStatus.built"), note: this.isAgricultureAvailable ? (this.result?.landUseCheck?.summary || this.$t("geoai.summaryCards.landStatus.note")) : this.$t("geoai.summaryCards.landStatus.urbanDetected") },
        { label: this.$t("geoai.summaryCards.position.label"), value: Number.isFinite(a) && Number.isFinite(b) ? `${a.toFixed(4)}, ${b.toFixed(4)}` : this.$t("geoai.options.unknown"), note: this.$t("geoai.summaryCards.position.note") },
        { label: this.$t("geoai.summaryCards.soilPh.label"), value: hasPh ? ph.toFixed(1) : this.$t("geoai.options.unknown"), note: hasPh ? (ph >= 6 && ph <= 8 ? this.$t("geoai.summaryCards.soilPh.good") : this.$t("geoai.summaryCards.soilPh.warning")) : this.$t("geoai.summary.missing") },
        { label: this.$t("geoai.summaryCards.slope.label"), value: hasSlope ? `${slope}%` : this.$t("geoai.options.unknown"), note: hasSlope ? (slope <= 12 ? this.$t("geoai.summaryCards.slope.good") : this.$t("geoai.summaryCards.slope.warning")) : this.$t("geoai.summary.missing") },
      ];
    },
    cropResults() {
      if (!this.result || !this.isAgricultureAvailable) return [];
      try {
        return getCropResults({
          form: this.form,
          result: this.result,
          t: this.$t,
          badgeClassForVerdict,
        });
      } catch (error) {
        return [];
      }
    },
    bestCrop() { return Array.isArray(this.cropResults) ? this.cropResults[0] || null : null; },
    topCrops() { return Array.isArray(this.cropResults) ? this.cropResults.slice(0, 3) : []; },
    recommendedCrops() {
      return Array.isArray(this.cropResults)
        ? this.cropResults.filter((crop) => crop.verdictKey !== "notRecommended")
        : [];
    },
    notRecommendedCrops() {
      return Array.isArray(this.cropResults)
        ? this.cropResults.filter((crop) => crop.verdictKey === "notRecommended")
        : [];
    },
    specificCrop() { return this.form.analysisMode === "specific" && Array.isArray(this.cropResults) ? this.cropResults.find((crop) => crop.key === this.form.selectedCrop) || null : null; },
    specificDecision() { return this.specificCrop?.verdictKey === "notRecommended" ? this.$t("geoai.analysis.notRecommendedForLand") : this.$t("geoai.analysis.recommendedForLand"); },
    headline() { if (!this.result) return this.$t("geoai.friendly.noRecommendation"); if (!this.isAgricultureAvailable) return this.result?.siteAssessment?.headline || this.$t("geoai.status.notAvailableHeadline"); if (this.specificCrop) return `${this.specificCrop.name}: ${this.specificDecision}`; return this.bestCrop ? this.$t("geoai.friendly.headline", { crop: this.bestCrop.name }) : this.$t("geoai.friendly.noRecommendation"); },
    summary() { if (!this.result) return this.$t("geoai.friendly.runAnalysis"); if (!this.isAgricultureAvailable) return this.buildingText; if (this.specificCrop) return this.specificCrop.verdictKey === "notRecommended" && this.bestCrop ? this.$t("geoai.analysis.betterFirstChoice", { current: this.specificCrop.name, best: this.bestCrop.name }) : this.$t("geoai.analysis.looksForLand", { crop: this.specificCrop.name, verdict: this.specificCrop.verdict.toLowerCase() }); return this.bestCrop ? this.$t("geoai.friendly.bestOption", { crop: this.bestCrop.name.toLowerCase() }) : this.$t("geoai.friendly.runAnalysis"); },
  },
  watch: {
    "form.locationMode": { async handler(mode) { if (mode === "map") { await nextTick(); await this.initMap(); this.refreshMapSize(); } } },
    "form.mapType"() { this.updateMapLayer(); },
    "form.lat"() { this.syncMarker(); },
    "form.lon"() { this.syncMarker(); },
  },
  async mounted() { await this.loadHistory(); await nextTick(); await this.initMap(); },
  methods: {
    async initMap() {
      if (this.map || !this.$refs.mapContainer) return;
      try {
        this.mapLoading = true;
        this.mapError = "";
        const L = await loadLeaflet();
        const a = Number(this.form.lat), b = Number(this.form.lon);
        this.map = L.map(this.$refs.mapContainer, { zoomControl: true }).setView([a, b], 9);
        this.updateMapLayer();
        this.marker = L.marker([a, b]).addTo(this.map);
        this.map.on("click", (e) => { this.form.lat = e.latlng.lat.toFixed(6); this.form.lon = e.latlng.lng.toFixed(6); });
        this.refreshMapSize();
      } catch (error) { this.mapError = error.message || this.$t("geoai.location.mapFailed"); }
      finally { this.mapLoading = false; }
    },
    updateMapLayer() {
      if (!this.map || !window.L) return;
      const layerConfig = MAP_TILE_LAYERS[this.form.mapType] || MAP_TILE_LAYERS.standard;
      if (this.mapLayer) {
        this.map.removeLayer(this.mapLayer);
      }
      this.mapLayer = window.L.tileLayer(layerConfig.url, layerConfig.options).addTo(this.map);
    },
    refreshMapSize() {
      if (!this.map) return;
      setTimeout(() => this.map && this.map.invalidateSize(), 100);
      setTimeout(() => this.map && this.map.invalidateSize(), 500);
    },
    resetMapView() {
      if (!this.map) return;
      const a = Number(this.form.lat), b = Number(this.form.lon);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return;
      this.map.setView([a, b], 10);
      this.refreshMapSize();
    },
    syncMarker() {
      if (!this.marker) return;
      const a = Number(this.form.lat), b = Number(this.form.lon);
      if (!Number.isFinite(a) || !Number.isFinite(b)) return;
      this.marker.setLatLng([a, b]);
      if (this.map && this.form.locationMode === "map") {
        this.map.panTo([a, b], { animate: true });
      }
    },
    async analyze() {
      this.loading = true; this.error = "";
      try {
        if (this.form.analysisMode === "specific" && !this.form.selectedCrop) throw new Error(this.$t("geoai.analysis.selectTreeError"));
        const constraints = { country: "TN" };
        const water = boolVal(this.form.waterAccess);
        if (water !== null) constraints.water_access = water;
        if (this.form.slopeMax !== "") constraints.slope_max = Number(this.form.slopeMax);
        if (this.form.waterSalinity !== "") constraints.water_ec_dS_m = Number(this.form.waterSalinity);
        const soil_test = {};
        if (this.form.soilPh !== "") soil_test.ph = Number(this.form.soilPh);
        if (this.form.organicMatter !== "") soil_test.organic_matter = Number(this.form.organicMatter);
        if (this.form.nitrogen !== "unknown") soil_test.nitrogen = this.form.nitrogen;
        const response = await GeoAIService.analyze({ lat: Number(this.form.lat), lon: Number(this.form.lon), constraints, soil_test });
        this.result = response.result;
        await this.loadHistory();
      } catch (error) { this.error = error.response?.data?.message || error.message || this.$t("geoai.errors.analysisFailed"); } finally { this.loading = false; }
    },
    async loadHistory() {
      this.historyLoading = true;
      try { const response = await GeoAIService.getHistory(); this.history = response.data || []; }
      catch (error) { this.error = error.response?.data?.message || error.message || this.$t("geoai.errors.historyFailed"); }
      finally { this.historyLoading = false; }
    },
    selectHistory(entry) {
      this.result = entry.result; this.form.lat = String(entry.lat); this.form.lon = String(entry.lon);
      const constraints = entry.constraints || {}, soil = entry.soilTest || {};
      this.form.waterAccess = typeof constraints.water_access === "boolean" ? String(constraints.water_access) : "unknown";
      this.form.slopeMax = constraints.slope_max ?? ""; this.form.waterSalinity = constraints.water_ec_dS_m ?? "";
      this.form.soilPh = soil.ph ?? ""; this.form.organicMatter = soil.organic_matter ?? ""; this.form.nitrogen = soil.nitrogen || "unknown";
    },
    formatHistoryDate(value) {
      if (!value) return this.$t("geoai.history.unknownDate");
      const date = new Date(value);
      if (Number.isNaN(date.getTime())) return this.$t("geoai.history.unknownDate");
      return date.toLocaleString();
    },
    buildCertificateHtml() {
      const locale = typeof this.$i18n?.locale === "string"
        ? this.$i18n.locale
        : this.$i18n?.locale?.value || "en";
      const isRtl = String(locale).startsWith("ar");
      const mapMarkup = this.printMapMarkup || "";
      const recommendations = this.isAgricultureAvailable
        ? this.recommendedCrops.slice(0, 3).map((crop) => `
            <li class="certificate-list-item">
              <span class="certificate-list-title">${escapeHtml(crop.name)}</span>
              <span>${escapeHtml(crop.simpleMessage)}</span>
            </li>
          `).join("")
        : "";
      const bodyBlock = this.isAgricultureAvailable
        ? `
          <section class="certificate-section">
            <p class="certificate-label">${escapeHtml(this.$t("geoai.certificate.recommendations"))}</p>
            <ul class="certificate-list">${recommendations}</ul>
          </section>
        `
        : `
          <section class="certificate-section">
            <p class="certificate-label">${escapeHtml(this.$t("geoai.certificate.status"))}</p>
            <p class="certificate-text">${escapeHtml(this.buildingText)}</p>
          </section>
        `;

      return `<!doctype html>
<html lang="${escapeHtml(locale)}" dir="${isRtl ? "rtl" : "ltr"}">
<head>
  <meta charset="utf-8" />
  <meta name="viewport" content="width=device-width, initial-scale=1" />
  <title>${escapeHtml(this.$t("geoai.certificate.title"))}</title>
  <link rel="stylesheet" href="https://unpkg.com/leaflet@1.9.4/dist/leaflet.css" />
  <style>
    @page { size: A4 portrait; margin: 14mm; }
    * { box-sizing: border-box; }
    body {
      margin: 0;
      background: #f5f0e4;
      color: #173224;
      font-family: Georgia, "Times New Roman", serif;
    }
    .certificate {
      width: 100%;
      min-height: calc(100vh - 2px);
      padding: 26px;
      background: linear-gradient(180deg, #fffef9 0%, #fbf8ef 100%);
      border: 1px solid #d8decf;
      border-radius: 22px;
      position: relative;
      overflow: hidden;
    }
    .certificate::before {
      content: "";
      position: absolute;
      inset: 14px;
      border: 2px solid #1f6b43;
      border-radius: 18px;
      pointer-events: none;
    }
    .certificate-inner {
      position: relative;
      z-index: 1;
    }
    .certificate-eyebrow {
      margin: 0;
      text-align: center;
      color: #1f6b43;
      font-size: 12px;
      font-weight: 700;
      letter-spacing: 0.24em;
      text-transform: uppercase;
    }
    .certificate-title {
      margin: 16px 0 10px;
      text-align: center;
      font-size: 34px;
      line-height: 1.15;
      color: #163224;
    }
    .certificate-subtitle {
      margin: 0 auto;
      max-width: 700px;
      text-align: center;
      color: #536459;
      font-size: 15px;
      line-height: 1.7;
    }
    .certificate-meta {
      margin-top: 24px;
      display: grid;
      grid-template-columns: repeat(2, minmax(0, 1fr));
      gap: 18px;
    }
    .certificate-meta-card,
    .certificate-section {
      background: rgba(255,255,255,0.82);
      border: 1px solid #d8decf;
      border-radius: 18px;
      padding: 18px 20px;
    }
    .certificate-label {
      margin: 0 0 8px;
      color: #1f6b43;
      font-size: 11px;
      font-weight: 700;
      letter-spacing: 0.18em;
      text-transform: uppercase;
    }
    .certificate-value {
      margin: 0;
      font-size: 20px;
      font-weight: 700;
      line-height: 1.4;
    }
    .certificate-map {
      margin-top: 22px;
      border-radius: 22px;
      overflow: hidden;
      border: 1px solid #d8decf;
      background: #e8efe6;
    }
    .certificate-map-frame {
      width: 100%;
      height: 420px;
      position: relative;
      overflow: hidden;
    }
    .certificate-map-frame .leaflet-control-container,
    .certificate-map-frame .leaflet-control-attribution,
    .certificate-map-frame .leaflet-control-zoom {
      display: none !important;
    }
    .certificate-map-frame .leaflet-container,
    .certificate-map-frame .leaflet-pane,
    .certificate-map-frame .leaflet-map-pane,
    .certificate-map-frame .leaflet-tile-pane,
    .certificate-map-frame .leaflet-marker-pane,
    .certificate-map-frame .leaflet-shadow-pane,
    .certificate-map-frame .leaflet-overlay-pane {
      width: 100% !important;
      height: 100% !important;
    }
    .certificate-map-frame img {
      max-width: none !important;
    }
    .certificate-body {
      margin-top: 22px;
      display: grid;
      gap: 18px;
    }
    .certificate-headline {
      margin: 0;
      font-size: 28px;
      line-height: 1.3;
      color: #173224;
    }
    .certificate-text {
      margin: 12px 0 0;
      font-size: 16px;
      line-height: 1.8;
      color: #33473b;
    }
    .certificate-list {
      margin: 12px 0 0;
      padding-${isRtl ? "right" : "left"}: 20px;
    }
    .certificate-list-item {
      margin: 0 0 10px;
      font-size: 16px;
      line-height: 1.8;
      color: #33473b;
    }
    .certificate-list-title {
      font-weight: 700;
      color: #173224;
      display: inline-block;
      margin-${isRtl ? "left" : "right"}: 6px;
    }
    .certificate-footer {
      margin-top: 26px;
      padding-top: 18px;
      border-top: 1px solid #d8decf;
      text-align: center;
      font-size: 15px;
      color: #4c5d52;
    }
  </style>
</head>
<body>
  <main class="certificate">
    <div class="certificate-inner">
      <p class="certificate-eyebrow">${escapeHtml(this.$t("geoai.certificate.eyebrow"))}</p>
      <h1 class="certificate-title">${escapeHtml(this.$t("geoai.certificate.title"))}</h1>
      <p class="certificate-subtitle">${escapeHtml(this.$t("geoai.certificate.subtitle"))}</p>

      <section class="certificate-meta">
        <div class="certificate-meta-card">
          <p class="certificate-label">${escapeHtml(this.$t("geoai.certificate.location"))}</p>
          <p class="certificate-value">${escapeHtml(this.coordinatePreview)}</p>
        </div>
        <div class="certificate-meta-card">
          <p class="certificate-label">${escapeHtml(this.$t("geoai.certificate.date"))}</p>
          <p class="certificate-value">${escapeHtml(this.printDate)}</p>
        </div>
      </section>

      ${mapMarkup ? `
        <section class="certificate-map" aria-label="${escapeHtml(this.$t("geoai.certificate.mapAlt"))}">
          <div class="certificate-map-frame">${mapMarkup}</div>
        </section>
      ` : ""}

      <div class="certificate-body">
        <section class="certificate-section">
          <p class="certificate-label">${escapeHtml(this.$t("geoai.certificate.decision"))}</p>
          <h2 class="certificate-headline">${escapeHtml(this.headline)}</h2>
          <p class="certificate-text">${escapeHtml(this.summary)}</p>
        </section>
        ${bodyBlock}
      </div>

      <footer class="certificate-footer">${escapeHtml(this.$t("geoai.certificate.footer"))}</footer>
    </div>
  </main>
</body>
</html>`;
    },
    printResult() {
      if (!this.result) return;
      const lat = Number(this.form.lat);
      const lon = Number(this.form.lon);
      const printableName = Number.isFinite(lat) && Number.isFinite(lon)
        ? `geoai-analysis-${lat.toFixed(4)}-${lon.toFixed(4)}`
        : "geoai-analysis";
      const printWindow = window.open("", "_blank", "width=1100,height=900");
      if (!printWindow) return;
      printWindow.document.open();
      printWindow.document.write(this.buildCertificateHtml());
      printWindow.document.close();
      printWindow.document.title = printableName;
      printWindow.focus();
      printWindow.onload = () => {
        printWindow.print();
      };
    },
  },
};
</script>

<style>
@media print {
  .min-h-screen > .mx-auto {
    display: none !important;
  }

  .print-certificate {
    display: block !important;
    position: static;
    width: auto;
    min-height: auto;
    margin: 0;
    padding: 28px 36px;
    background: #ffffff !important;
    color: #122019;
    font-family: Georgia, "Times New Roman", serif;
  }

  .no-print {
    display: none !important;
  }
}

.print-certificate {
  display: none;
}

.print-certificate__header {
  text-align: center;
  border-bottom: 2px solid #1f6b43;
  padding-bottom: 16px;
}

.print-certificate__eyebrow {
  margin: 0 0 8px;
  font-size: 12px;
  font-weight: 700;
  letter-spacing: 0.24em;
  text-transform: uppercase;
  color: #1f6b43;
}

.print-certificate__title {
  margin: 0;
  font-size: 30px;
  line-height: 1.2;
  color: #122019;
}

.print-certificate__subtitle {
  margin: 10px 0 0;
  font-size: 14px;
  color: #506057;
}

.print-certificate__meta {
  display: grid;
  grid-template-columns: repeat(2, minmax(0, 1fr));
  gap: 16px;
  margin-top: 18px;
}

.print-certificate__label {
  margin: 0 0 6px;
  font-size: 11px;
  font-weight: 700;
  letter-spacing: 0.16em;
  text-transform: uppercase;
  color: #1f6b43;
}

.print-certificate__value {
  margin: 0;
  font-size: 16px;
  font-weight: 600;
}

.print-certificate__map {
  margin-top: 18px;
  border: 1px solid #d9e2db;
  border-radius: 16px;
  overflow: hidden;
}

.print-certificate__map img {
  display: block;
  width: 100%;
  height: auto;
}

.print-certificate__map-frame {
  position: relative;
  width: 100%;
  height: 520px;
  overflow: hidden;
  background: #eef3ee;
}

.print-certificate__map-frame .leaflet-control-container,
.print-certificate__map-frame .leaflet-control-attribution,
.print-certificate__map-frame .leaflet-control-zoom {
  display: none !important;
}

.print-certificate__map-frame .leaflet-container,
.print-certificate__map-frame .leaflet-pane,
.print-certificate__map-frame .leaflet-map-pane,
.print-certificate__map-frame .leaflet-tile-pane,
.print-certificate__map-frame .leaflet-marker-pane,
.print-certificate__map-frame .leaflet-shadow-pane,
.print-certificate__map-frame .leaflet-overlay-pane {
  width: 100% !important;
  height: 100% !important;
}

.print-certificate__map-frame img {
  max-width: none !important;
}

.print-certificate__body {
  margin-top: 22px;
  display: grid;
  gap: 16px;
}

.print-certificate__block {
  border: 1px solid #d9e2db;
  border-radius: 16px;
  padding: 18px;
  background: #fbfcfa;
}

.print-certificate__headline {
  margin: 0;
  font-size: 22px;
  line-height: 1.3;
}

.print-certificate__text {
  margin: 10px 0 0;
  font-size: 14px;
  line-height: 1.7;
}

.print-certificate__list {
  margin: 10px 0 0;
  padding-left: 18px;
  font-size: 14px;
  line-height: 1.7;
}

.print-certificate__footer {
  margin-top: 24px;
  padding-top: 16px;
  border-top: 1px solid #d9e2db;
  text-align: center;
  font-size: 13px;
  color: #506057;
}
</style>
