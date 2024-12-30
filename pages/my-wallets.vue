<template>
  <div class="w-[100%] h-[90vh] flex justify-center items-center">
    {{ $t("work_in_progress") }}
  </div>
</template>

<script setup lang="ts">
import { useI18n } from "vue-i18n";

const { t } = useI18n();

useHead({
  title: "Ridex | " + `${t("my_wallets")}`,
});

definePageMeta({
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-required",
});
</script>
