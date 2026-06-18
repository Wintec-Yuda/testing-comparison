<template>
  <div
    class="
      relative
      overflow-hidden
      bg-slate-900
      border border-slate-800
      rounded-3xl
      p-6
      transition-all
      duration-300
      hover:border-blue-500/50
      hover:shadow-2xl
      hover:shadow-blue-950/30
    "
  >
    <!-- Glow -->
    <div
      class="
        absolute
        -top-10
        -right-10
        w-24
        h-24
        rounded-full
        bg-blue-500/10
        blur-3xl
      "
    />

    <div class="relative z-10">
      <p
        class="text-slate-400 text-sm uppercase tracking-wider"
      >
        {{ title }}
      </p>

      <h3
        class="text-4xl font-bold text-white mt-3"
      >
        {{ value }}
      </h3>
    </div>
  </div>
</template>

<script setup lang="ts">
defineProps<{
  title: string
  value: number | string
}>()
</script>