<template>
  <div class="space-y-6">
    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]"
    >
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p class="text-white mt-6 font-semibold text-lg">
        Validating Settlement Penetration
      </p>
      <p class="text-slate-400 text-sm mt-2">
        Comparing Website & Mobile (Per Bank + Total)
      </p>
    </div>

    <template v-else>
      <!-- HEADER -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h1 class="text-2xl font-semibold text-white">
          Settlement Penetration Validation
        </h1>
        <p class="text-slate-400 mt-1">
          Monthly comparison between Website and Mobile • {{ year }}
        </p>
      </div>

      <!-- SUMMARY -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p class="text-slate-400 text-sm">Website Records</p>
          <h2 class="text-3xl font-bold text-white mt-3">
            {{ summary.website }}
          </h2>
        </div>
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p class="text-slate-400 text-sm">Mobile Records</p>
          <h2 class="text-3xl font-bold text-white mt-3">
            {{ summary.mobile }}
          </h2>
        </div>
      </div>

      <!-- OVERALL MATCH SUMMARY -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <p class="text-slate-400 text-sm mb-4">Overall Match (Website ↔ Mobile)</p>
        <div class="flex items-center justify-between">
          <span class="text-3xl font-bold text-white">
            {{ matchedMonths }}/12 Months
          </span>
          <span
            class="px-6 py-2 rounded-2xl text-sm font-semibold"
            :class="matchedMonths === 12
              ? 'bg-emerald-500/10 text-emerald-400'
              : 'bg-amber-500/10 text-amber-400'"
          >
            {{ matchedMonths === 12 ? 'FULL MATCH' : 'PARTIAL MATCH' }}
          </span>
        </div>
      </div>

      <!-- TABLE -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h2 class="text-white font-semibold text-lg">Monthly Penetration Validation</h2>
            <p class="text-slate-500 text-sm">Website vs Mobile — Total & Per Bank</p>
          </div>
          <div class="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-xl">
            12 Months
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1800px]">
            <thead class="bg-slate-950 sticky top-0">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-slate-400">Month</th>
                
                <!-- Total -->
                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">Website Total</th>
                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">Mobile Total</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">Total Match</th>

                <!-- Per Bank -->
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">Mandiri</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">BNI</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">BRI</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">BCA</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">DKI</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rows"
                :key="row.month"
                class="border-t border-slate-800 hover:bg-slate-800/50 transition-colors"
                :class="{ 'bg-red-500/5': !row.totalMatch }"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div
                      :class="row.totalMatch ? 'bg-emerald-500' : 'bg-red-500'"
                      class="w-3 h-3 rounded-full flex-shrink-0"
                    />
                    <span class="font-medium text-white">{{ getMonthName(row.month) }}</span>
                  </div>
                </td>

                <!-- Total -->
                <td class="px-6 py-5 text-right text-white font-medium">
                  {{ formatter.format(row.websiteTotal) }}
                </td>
                <td class="px-6 py-5 text-right text-white font-medium">
                  {{ formatter.format(row.mobileTotal) }}
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.totalMatch
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-4 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.totalMatch ? 'MATCH' : 'MISMATCH' }}
                  </span>
                </td>

                <!-- Per Bank Match Status -->
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.mandiriMatch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-3 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.mandiriMatch ? '✓' : '✕' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.bniMatch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-3 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.bniMatch ? '✓' : '✕' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.briMatch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-3 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.briMatch ? '✓' : '✕' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.bcaMatch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-3 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.bcaMatch ? '✓' : '✕' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.dkiMatch ? 'bg-emerald-500/10 text-emerald-400' : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-3 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.dkiMatch ? '✓' : '✕' }}
                  </span>
                </td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </template>
  </div>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue'
import {
  fetchWebsiteSettlementPenetration,
  fetchMobileSettlementPenetration,
} from '../services/api'

interface PenetrationRow {
  month: number
  websiteTotal: number
  mobileTotal: number
  totalMatch: boolean

  mandiri: number
  bni: number
  bri: number
  bca: number
  dki: number

  mandiriMatch: boolean
  bniMatch: boolean
  briMatch: boolean
  bcaMatch: boolean
  dkiMatch: boolean
}

const props = defineProps<{
  year: number
  webToken: string
  mobileToken: string
}>()

const loading = ref(false)
const rows = ref<PenetrationRow[]>([])

const summary = ref({
  website: 0,
  mobile: 0,
})

const formatter = new Intl.NumberFormat('id-ID', { maximumFractionDigits: 0 })

const matchedMonths = computed(() =>
  rows.value.filter(r => r.totalMatch).length
)

function totalPenetration(item: any): number {
  return (
    (item?.mandiri || 0) +
    (item?.bni || 0) +
    (item?.bri || 0) +
    (item?.bca || 0) +
    (item?.dki || 0)
  )
}

function getMonthName(month: number): string {
  const months = [
    '', 'January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'
  ]
  return months[month] || ''
}

async function validatePenetration() {
  if (!props.webToken || !props.mobileToken || !props.year) return

  loading.value = true
  rows.value = []

  try {
    const [webRes, mobileRes] = await Promise.all([
      fetchWebsiteSettlementPenetration(props.year, props.webToken),
      fetchMobileSettlementPenetration(props.year, props.mobileToken),
    ])

    const websiteData = webRes?.payload?.data || []
    const mobileData = mobileRes?.payload?.data || []

    summary.value = {
      website: websiteData.length,
      mobile: mobileData.length,
    }

    const result: PenetrationRow[] = []

    for (let month = 1; month <= 12; month++) {
      const web = websiteData.find((item: any) => item.month === month)
      const mob = mobileData.find((item: any) => item.month === month)

      const webTotal = web ? totalPenetration(web) : 0
      const mobileTotal = mob ? totalPenetration(mob) : 0

      const totalMatch = webTotal === mobileTotal

      const mandiriMatch = (web?.mandiri || 0) === (mob?.mandiri || 0)
      const bniMatch = (web?.bni || 0) === (mob?.bni || 0)
      const briMatch = (web?.bri || 0) === (mob?.bri || 0)
      const bcaMatch = (web?.bca || 0) === (mob?.bca || 0)
      const dkiMatch = (web?.dki || 0) === (mob?.dki || 0)

      result.push({
        month,
        websiteTotal: webTotal,
        mobileTotal: mobileTotal,
        totalMatch,

        mandiri: web?.mandiri || 0,
        bni: web?.bni || 0,
        bri: web?.bri || 0,
        bca: web?.bca || 0,
        dki: web?.dki || 0,

        mandiriMatch,
        bniMatch,
        briMatch,
        bcaMatch,
        dkiMatch,
      })
    }

    rows.value = result
  } catch (error) {
    console.error('Settlement Penetration Validation Error:', error)
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.year, props.webToken, props.mobileToken],
  validatePenetration,
  { immediate: true }
)
</script>