<template>
  <div class="space-y-5">

    <!-- LOADING -->
    <div
      v-if="loading"
      class="bg-slate-900 border border-slate-800 rounded-2xl p-12 flex flex-col items-center justify-center"
    >
      <div class="w-10 h-10 border-2 border-blue-500 border-t-transparent rounded-full animate-spin"></div>

      <p class="text-white mt-4 font-medium">
        Validating Settlement Data
      </p>

      <p class="text-slate-400 text-sm mt-1">
        Comparing Website, Mobile and Command Center
      </p>
    </div>

    <template v-else>

      <!-- HEADER -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl p-6">
        <h1 class="text-xl font-semibold text-white">
          Settlement RFS Validation
        </h1>

        <p class="text-sm text-slate-400 mt-1">
          Monthly comparison between Website, Mobile and Command Center
        </p>
      </div>

      <!-- SUMMARY -->
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p class="text-slate-400 text-sm">Website Records</p>
          <h2 class="text-3xl font-bold text-white mt-2">
            {{ summary.website }}
          </h2>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p class="text-slate-400 text-sm">Mobile Records</p>
          <h2 class="text-3xl font-bold text-white mt-2">
            {{ summary.mobile }}
          </h2>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p class="text-slate-400 text-sm">Command Center Records</p>
          <h2 class="text-3xl font-bold text-white mt-2">
            {{ summary.commandCenter }}
          </h2>
        </div>
      </div>

      <!-- VALIDATION -->
      <div class="grid grid-cols-1 md:grid-cols-2 gap-4">

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p class="text-slate-400 text-sm">
            Website ↔ Mobile
          </p>

          <div class="flex items-center justify-between mt-3">
            <span class="text-3xl font-bold text-white">
              {{
                rows.filter(
                  item => item.websiteMobileMatch
                ).length
              }}/12
            </span>

            <span class="px-3 py-1 rounded-lg bg-emerald-500/10 text-emerald-400 text-xs font-medium">
              Match
            </span>
          </div>
        </div>

        <div class="bg-slate-900 border border-slate-800 rounded-2xl p-5">
          <p class="text-slate-400 text-sm">
            Website ↔ Command Center
          </p>

          <div class="flex items-center justify-between mt-3">
            <span class="text-3xl font-bold text-white">
              {{
                rows.filter(
                  item => item.websiteCCMatch
                ).length
              }}/12
            </span>

            <span class="px-3 py-1 rounded-lg bg-blue-500/10 text-blue-400 text-xs font-medium">
              Validation
            </span>
          </div>
        </div>

      </div>

      <!-- TABLE -->
      <div class="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden">

        <!-- TABLE HEADER -->
        <div class="px-6 py-4 border-b border-slate-800 flex items-center justify-between">
          <div>
            <h2 class="text-white font-semibold">
              Monthly Validation
            </h2>

            <p class="text-slate-500 text-sm mt-1">
              Settlement comparison by month
            </p>
          </div>

          <div class="px-3 py-1 rounded-lg bg-slate-800 text-slate-300 text-sm">
            {{ rows.length }} Months
          </div>
        </div>

        <!-- TABLE -->
        <div class="overflow-auto">
          <table class="w-full min-w-[1000px]">

            <thead class="bg-slate-950">
              <tr>
                <th class="px-6 py-4 text-left text-sm font-medium text-slate-400">
                  Month
                </th>

                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">
                  Website
                </th>

                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">
                  Mobile
                </th>

                <th class="px-6 py-4 text-right text-sm font-medium text-slate-400">
                  Command Center
                </th>

                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">
                  Web ↔ Mobile
                </th>

                <th class="px-6 py-4 text-center text-sm font-medium text-slate-400">
                  Web ↔ CC
                </th>
              </tr>
            </thead>

            <tbody>
              <tr
                v-for="row in rows"
                :key="row.month"
                :class="[
                  'border-t border-slate-800 hover:bg-slate-800/40 transition',
                  !row.websiteMobileMatch || !row.websiteCCMatch
                    ? 'bg-red-500/5'
                    : ''
                ]"
              >
                <td class="px-6 py-4 text-white font-medium">
                  <div class="flex items-center gap-3">
                    <div
                      :class="
                        !row.websiteMobileMatch || !row.websiteCCMatch
                          ? 'bg-red-500'
                          : 'bg-emerald-500'
                      "
                      class="w-2 h-2 rounded-full"
                    />

                    {{ getMonthName(row.month) }}
                  </div>
                </td>

                <td class="px-6 py-4 text-right text-white">
                  {{ formatter.format(row.website) }}
                </td>

                <td class="px-6 py-4 text-right text-white">
                  {{ formatter.format(row.mobile) }}
                </td>

                <td class="px-6 py-4 text-right text-white">
                  {{ formatter.format(row.commandCenter) }}
                </td>

                <td class="px-6 py-4 text-center">
                  <span
                    :class="
                      row.websiteMobileMatch
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    "
                    class="px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {{ row.websiteMobileMatch ? 'Match' : 'Mismatch' }}
                  </span>
                </td>

                <td class="px-6 py-4 text-center">
                  <span
                    :class="
                      row.websiteCCMatch
                        ? 'bg-emerald-500/10 text-emerald-400'
                        : 'bg-red-500/10 text-red-400'
                    "
                    class="px-3 py-1 rounded-lg text-xs font-medium"
                  >
                    {{ row.websiteCCMatch ? 'Match' : 'Mismatch' }}
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
import { ref, watch } from 'vue'

import {
  fetchWebsiteSettlementRFS,
  fetchMobileSettlementRFS,
  fetchCommandCenter,
} from '../../services/api'

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

const formatter =
  new Intl.NumberFormat('id-ID')

function totalBank(item: any) {
  return (
    (item.mandiri || 0) +
    (item.bni || 0) +
    (item.bri || 0) +
    (item.bca || 0) +
    (item.dki || 0)
  )
}

function getMonthName(month: number) {
  const months = [
    '',
    'January',
    'February',
    'March',
    'April',
    'May',
    'June',
    'July',
    'August',
    'September',
    'October',
    'November',
    'December',
  ]

  return months[month]
}

async function validateData() {
  if (
    !props.webToken ||
    !props.mobileToken
  ) {
    return
  }

  loading.value = true

  try {
    const [
      webRes,
      mobileRes,
      ccRes,
    ] = await Promise.all([
      fetchWebsiteSettlementRFS(
        props.year,
        props.webToken
      ),

      fetchMobileSettlementRFS(
        props.year,
        props.mobileToken
      ),

      fetchCommandCenter(
        props.year,
        props.webToken
      ),
    ])

    const website =
      webRes.payload.data || []

    const mobile =
      mobileRes.payload.data || []

    const commandCenter =
      ccRes.payload.data.monthly_breakdown || []

    summary.value = {
      website: website.length,
      mobile: mobile.length,
      commandCenter:
        commandCenter.length,
    }

    const result: ValidationRow[] = []

    for (
      let month = 1;
      month <= 12;
      month++
    ) {
      const web =
        website.find(
          (item: any) =>
            item.month === month
        )

      const mob =
        mobile.find(
          (item: any) =>
            item.month === month
        )

      const cc =
        commandCenter.find(
          (item: any) =>
            item.month === month
        )

      const webTotal = web
        ? totalBank(web)
        : 0

      const mobileTotal = mob
        ? totalBank(mob)
        : 0

      const ccTotal =
        cc?.rfs_total || 0

      result.push({
        month,

        website: webTotal,

        mobile: mobileTotal,

        commandCenter: ccTotal,

        websiteMobileMatch:
          webTotal === mobileTotal,

        websiteCCMatch:
          webTotal === ccTotal,
      })
    }

    rows.value = result
  } catch (error) {
    console.error(
      'Validation Error',
      error
    )
  } finally {
    loading.value = false
  }
}

watch(
  () => [
    props.year,
    props.webToken,
    props.mobileToken,
  ],
  () => {
    validateData()
  },
  {
    immediate: true,
  }
)
</script>