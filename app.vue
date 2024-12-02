<template>
  <NuxtLayout>
    <NuxtPage />
  </NuxtLayout>
</template>

<script setup lang="ts">
definePageMeta({
  layoutTransition: { name: "page", mode: "out-in" },
});
</script>
