<template>
  <div class="w-[100%] h-[90vh] flex justify-center items-center">
    Work in Progress...
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Ridex | Get Help",
});

definePageMeta({
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-required",
});
</script>
