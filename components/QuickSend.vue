<template>
  <div class="text-sm font-semibold">{{ $t("quick_transfer") }}</div>
  <div class="w-[100%] mt-[3%]">
    <USelectMenu
      color="blue"
      v-model="cardSelectedQuick"
      value-attribute="type"
      option-attribute="cardName"
      class="w-[100%]"
      :placeholder="$t('select_a_card')"
      :options="
        getCardWithIdStore.cards.map((card) => ({
          ...card,
          cardName: `${card.cardName} ( ${Number(card.cardAmount).toFixed(
            2
          )}$ )`,
        }))
      "
    />
  </div>
  <div class="mt-[5%]">
    <UInput
      color="blue"
      type="number"
      class="w-[100%]"
      v-model="enterAmountQuick"
      :placeholder="$t('enter_amount')"
    />
  </div>
  <div class="flex justify-between mt-[5%] w-[100%]">
    <div class="flex flex-col items-center w-[23%]">
      <UButton
        class="text-xs sendButton flex flex-col items-center w-full"
        icon="i-heroicons-arrow-up-tray"
      >
        <div class="icon mb-1"></div>
        <span>{{ $t("send") }}</span>
      </UButton>
    </div>
    <div class="flex flex-col items-center w-[23%]">
      <UButton
        class="text-xs sendButton flex flex-col items-center w-full"
        icon="i-heroicons-arrow-down-tray"
      >
        <div class="icon mb-1"></div>
        <span>{{ $t("reiceve") }}</span>
      </UButton>
    </div>
    <div class="flex flex-col items-center w-[23%]">
      <UButton
        class="text-xs sendButton flex flex-col items-center w-full"
        icon="i-heroicons-receipt-percent"
      >
        <div class="icon mb-1"></div>
        <span>{{ $t("invoicing") }}</span>
      </UButton>
    </div>
    <div class="flex flex-col items-center w-[23%]">
      <UButton
        class="text-xs sendButton flex flex-col items-center w-full"
        icon="i-heroicons-squares-plus"
      >
        <div class="icon mb-1"></div>
        <span>{{ $t("more") }}</span>
      </UButton>
    </div>
  </div>
</template>

<script setup lang="ts">
import type { Card } from "@/models/card";
import { UserInfoStore } from "@/stores/userStore";
import { GetCardWithIdStore } from "@/stores/cardStore";

const enterAmountQuick = ref();
const cardSelectedQuick = ref<Card>();

const userInfoStore = UserInfoStore();
const getCardWithIdStore = GetCardWithIdStore();

onMounted(async () => {
  await userInfoStore.fetchUserInfo();
  await getCardWithIdStore.fetchCardWithId();
});
</script>

<style scoped>
.sendButton {
  background-color: white;
  color: #0177fb;
  border: 1px solid #0177fb;
  transition: 0.3s;
}

.sendButton:hover {
  background-color: #0177fb;
  color: white;
}

.editButton {
  background-color: none;
  background: none;
  color: rgba(128, 128, 128, 0.5);
  transition: 0.3s;
}

.editButton:hover {
  background-color: gray;
  color: white;
  transition: 0.3s;
}

.searchButton {
  background-color: none;
  background: none;
  color: #0177fb;
  transition: 0.3s;
}

.searchButton:hover {
  background-color: #0177fb;
  color: white;
  transition: 0.3s;
}
</style>
