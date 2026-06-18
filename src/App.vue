<template>
  <div
    class="min-h-screen bg-gradient-to-br from-slate-950 via-slate-900 to-slate-950 p-8"
  >
    <div class="max-w-7xl mx-auto">

      <!-- HEADER -->
      <div class="mb-8">
        <h1
          class="text-4xl font-bold text-white"
        >
          Settlement Validation Center
        </h1>

        <p
          class="text-slate-400 mt-2"
        >
          Compare Website & Mobile Settlement Data with FS Validation Engine
        </p>
      </div>

      <!-- FORM -->
      <div
        class="bg-slate-900/70 backdrop-blur-xl border border-slate-800 rounded-3xl p-8 shadow-2xl"
      >
        <div
          class="grid grid-cols-1 lg:grid-cols-2 gap-6"
        >
          <!-- WEB -->
          <div>
            <label
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Website / CC Token
            </label>

            <textarea
              v-model="webToken"
              rows="5"
              placeholder="Paste website token..."
              class="w-full rounded-2xl bg-slate-950 border border-slate-800 text-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>

          <!-- MOBILE -->
          <div>
            <label
              class="block text-sm font-medium text-slate-300 mb-2"
            >
              Mobile Token
            </label>

            <textarea
              v-model="mobileToken"
              rows="5"
              placeholder="Paste mobile token..."
              class="w-full rounded-2xl bg-slate-950 border border-slate-800 text-white p-4 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all"
            />
          </div>
        </div>

        <!-- FOOTER -->
        <div
          class="flex flex-col lg:flex-row items-center justify-between gap-4 mt-6"
        >
          <div class="flex items-center gap-3 w-full lg:w-auto">
            <span
              class="text-slate-400 text-sm whitespace-nowrap"
            >
              Validation Year
            </span>

            <input
              v-model="year"
              type="number"
              class="bg-slate-950 border border-slate-800 rounded-xl px-4 py-3 text-white w-36 focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>

          <button
            @click="startValidation"
            class="
              w-full lg:w-auto
              px-8 py-3
              rounded-xl
              bg-gradient-to-r
              from-blue-600
              to-cyan-500
              text-white
              font-semibold
              shadow-lg
              shadow-blue-900/40
              hover:scale-105
              hover:shadow-blue-500/20
              transition-all
            "
          >
            Validate All
          </button>
        </div>
      </div>

      <!-- STATS -->
      <div
        v-if="isValidated"
        class="grid grid-cols-1 md:grid-cols-3 gap-4 mt-6"
      >
        <div
          class="bg-slate-900 border border-slate-800 rounded-2xl p-5"
        >
          <p class="text-slate-400 text-sm">
            Validation Status
          </p>

          <p class="text-green-400 font-bold text-xl mt-2">
            Running
          </p>
        </div>

        <div
          class="bg-slate-900 border border-slate-800 rounded-2xl p-5"
        >
          <p class="text-slate-400 text-sm">
            Source
          </p>

          <p class="text-white font-semibold mt-2">
            Website vs Mobile
          </p>
        </div>

        <div
          class="bg-slate-900 border border-slate-800 rounded-2xl p-5"
        >
          <p class="text-slate-400 text-sm">
            Year
          </p>

          <p class="text-white font-semibold mt-2">
            {{ year }}
          </p>
        </div>
      </div>

      <!-- RESULT -->
      <div
        v-if="isValidated"
        class="mt-6"
      >
        <SettlementFSValidator
          :year="year"
          :web-token="webToken"
          :mobile-token="mobileToken"
        />
        <SettlementRFSValidator
          :year="year"
          :web-token="webToken"
          :mobile-token="mobileToken"
        />
        <SettlementRKValidator
          :year="year"
          :web-token="webToken"
          :mobile-token="mobileToken"
        />
        <SettlementPenetrationValidator
          :year="year"
          :web-token="webToken"
          :mobile-token="mobileToken"
        />
      </div>

    </div>
  </div>
</template>

<script setup lang="ts">
import { ref } from 'vue'
import SettlementFSValidator from './components/SettlementFSValidator.vue'
import SettlementRFSValidator from './components/SettlementRFSValidator.vue'
import SettlementPenetrationValidator from './components/SettlementPenetrationValidator.vue'
import SettlementRKValidator from './components/SettlementRKValidator.vue'

const year = ref(2026)
const webToken = ref('')
const mobileToken = ref('')
const isValidated = ref(false)

function startValidation() {
  isValidated.value = true
}
</script>