<template>
  <span
    class="
      inline-flex
      items-center
      gap-2
      px-3
      py-1.5
      rounded-full
      text-xs
      font-bold
      border
      backdrop-blur-sm
    "
    :class="
      matched
        ? 'bg-emerald-500/10 text-emerald-300 border-emerald-500/30 shadow-lg shadow-emerald-500/10'
        : 'bg-red-500/10 text-red-300 border-red-500/30 shadow-lg shadow-red-500/10'
    "
  >
    <span
      class="relative flex h-2 w-2"
    >
      <span
        class="
          absolute
          inline-flex
          h-full
          w-full
          animate-ping
          rounded-full
        "
        :class="
          matched
            ? 'bg-emerald-400'
            : 'bg-red-400'
        "
      />

      <span
        class="
          relative
          inline-flex
          rounded-full
          h-2
          w-2
        "
        :class="
          matched
            ? 'bg-emerald-400'
            : 'bg-red-400'
        "
      />
    </span>

    {{ matched ? 'MATCH' : 'DIFFERENT' }}
  </span>
</template>

<script setup lang="ts">
defineProps<{
  matched: boolean
}>()
</script>