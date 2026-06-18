<template>
  <div class="space-y-6">

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-slate-900 border border-slate-800 rounded-3xl p-12 flex flex-col items-center justify-center min-h-[400px]"
    >
      <div class="w-12 h-12 border-4 border-blue-500 border-t-transparent rounded-full animate-spin" />
      <p class="text-white mt-6 font-semibold text-lg">
        Validating Settlement RFS
      </p>
      <p class="text-slate-400 text-sm mt-2">
        Comparing Website, Mobile & Command Center
      </p>
    </div>

    <template v-else>
      <!-- HEADER -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
        <h1 class="text-2xl font-semibold text-white">
          Settlement RFS Validation
        </h1>
        <p class="text-slate-400 mt-1">
          Monthly comparison between Website, Mobile and Command Center • {{ year }}
        </p>
      </div>

      <!-- SUMMARY -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
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
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p class="text-slate-400 text-sm">Command Center Records</p>
          <h2 class="text-3xl font-bold text-white mt-3">
            {{ summary.commandCenter }}
          </h2>
        </div>
      </div>

      <!-- MATCH SUMMARY -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p class="text-slate-400 text-sm">Website ↔ Mobile</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-3xl font-bold text-white">
              {{ matchedWebMobile }}/12
            </span>
            <span class="px-4 py-1.5 rounded-2xl bg-emerald-500/10 text-emerald-400 text-sm font-semibold">
              MATCH
            </span>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-3xl p-6">
          <p class="text-slate-400 text-sm">Website ↔ Command Center</p>
          <div class="flex items-center justify-between mt-4">
            <span class="text-3xl font-bold text-white">
              {{ matchedWebCC }}/12
            </span>
            <span class="px-4 py-1.5 rounded-2xl bg-blue-500/10 text-blue-400 text-sm font-semibold">
              VALIDATION
            </span>
          </div>
        </div>
      </div>

      <!-- TABLE -->
      <div class="bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden">
        <div class="px-6 py-5 border-b border-slate-800 flex items-center justify-between bg-slate-950">
          <div>
            <h2 class="text-white font-semibold text-lg">Monthly Validation</h2>
            <p class="text-slate-500 text-sm">Website vs Mobile vs Command Center (RFS)</p>
          </div>
          <div class="px-4 py-1.5 bg-slate-800 text-slate-300 text-sm rounded-xl">
            12 Months
          </div>
        </div>

        <div class="overflow-x-auto">
          <table class="w-full min-w-[1100px]">
            <thead class="bg-slate-950">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-slate-400">Month</th>
                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">Website</th>
                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">Mobile</th>
                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">Command Center</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">Web ↔ Mobile</th>
                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">Web ↔ CC</th>
              </tr>
            </thead>
            <tbody>
              <tr
                v-for="row in rows"
                :key="row.month"
                :class="[
                  'border-t border-slate-800 hover:bg-slate-800/50 transition-colors',
                  (!row.websiteMobileMatch || !row.websiteCCMatch) ? 'bg-red-500/5' : ''
                ]"
              >
                <td class="px-6 py-5">
                  <div class="flex items-center gap-3">
                    <div
                      :class="(!row.websiteMobileMatch || !row.websiteCCMatch) ? 'bg-red-500' : 'bg-emerald-500'"
                      class="w-3 h-3 rounded-full flex-shrink-0"
                    />
                    <span class="font-medium text-white">{{ getMonthName(row.month) }}</span>
                  </div>
                </td>
                <td class="px-6 py-5 text-right text-white font-medium">
                  {{ formatter.format(row.website) }}
                </td>
                <td class="px-6 py-5 text-right text-white font-medium">
                  {{ formatter.format(row.mobile) }}
                </td>
                <td class="px-6 py-5 text-right text-white font-medium">
                  {{ formatter.format(row.commandCenter) }}
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.websiteMobileMatch
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-4 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.websiteMobileMatch ? 'MATCH' : 'MISMATCH' }}
                  </span>
                </td>
                <td class="px-6 py-5 text-center">
                  <span
                    :class="row.websiteCCMatch
                      ? 'bg-emerald-500/10 text-emerald-400'
                      : 'bg-red-500/10 text-red-400'"
                    class="inline-block px-4 py-1 rounded-2xl text-xs font-semibold"
                  >
                    {{ row.websiteCCMatch ? 'MATCH' : 'MISMATCH' }}
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
  fetchWebsiteSettlementRFS,
  fetchMobileSettlementRFS,
  fetchCommandCenter,
} from '../services/api'

interface ValidationRow {
  month: number
  website: number
  mobile: number
  commandCenter: number
  websiteMobileMatch: boolean
  websiteCCMatch: boolean
}

const props = defineProps<{
  year: number
  webToken: string
  mobileToken: string
}>()

const loading = ref(false)
const rows = ref<ValidationRow[]>([])

const summary = ref({
  website: 0,
  mobile: 0,
  commandCenter: 0,
})

const formatter = new Intl.NumberFormat('id-ID')

const matchedWebMobile = computed(() => 
  rows.value.filter(r => r.websiteMobileMatch).length
)

const matchedWebCC = computed(() => 
  rows.value.filter(r => r.websiteCCMatch).length
)

function totalBank(item: any): number {
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

async function validateData() {
  if (!props.webToken || !props.mobileToken || !props.year) return

  loading.value = true
  rows.value = []

  try {
    const [webRes, mobileRes, ccRes] = await Promise.all([
      fetchWebsiteSettlementRFS(props.year, props.webToken),
      fetchMobileSettlementRFS(props.year, props.mobileToken),
      fetchCommandCenter(props.year, props.webToken),
    ])

    const websiteData = webRes?.payload?.data || []
    const mobileData = mobileRes?.payload?.data || []
    const ccData = ccRes?.payload?.data?.monthly_breakdown || []

    summary.value = {
      website: websiteData.length,
      mobile: mobileData.length,
      commandCenter: ccData.length,
    }

    const result: ValidationRow[] = []

    for (let month = 1; month <= 12; month++) {
      const web = websiteData.find((item: any) => item.month === month)
      const mob = mobileData.find((item: any) => item.month === month)
      const cc = ccData.find((item: any) => item.month === month)

      const webTotal = web ? totalBank(web) : 0
      const mobileTotal = mob ? totalBank(mob) : 0
      const ccTotal = cc?.rfs_total || 0

      result.push({
        month,
        website: webTotal,
        mobile: mobileTotal,
        commandCenter: ccTotal,
        websiteMobileMatch: webTotal === mobileTotal,
        websiteCCMatch: webTotal === ccTotal,
      })
    }

    rows.value = result
  } catch (error) {
    console.error('Settlement RFS Validation Error:', error)
  } finally {
    loading.value = false
  }
}

watch(
  () => [props.year, props.webToken, props.mobileToken],
  validateData,
  { immediate: true }
)
</script>