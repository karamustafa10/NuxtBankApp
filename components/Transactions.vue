<template>
  <div class="flex justify-between items-center">
    <div class="font-semibold">Recent Transactions</div>
    <div class="flex flex-row items-center justify-between w-[11%]">
      <div>View All</div>
      <UButton
        class="editButton"
        variant="ghost"
        icon="i-heroicons-chevron-right"
      />
    </div>
  </div>
  <div
    class="flex flex-col justify-around h-[20vh]"
    v-if="
      getTransactionStore.transactions &&
      getTransactionStore.transactions.length > 0
    "
  >
    <div
      v-for="(item, index) in getTransactionStore.transactions.slice(0, 3)"
      :key="index"
      class="flex justify-between items-center mt-[1%] px-[1%] rounded-lg transition duration-300 hover:bg-gray-500 hover:bg-opacity-10"
    >
      <!-- Avatar -->
      <div class="mr-[2%] w-[5%]">
        <UAvatar :alt="item?.user" />
      </div>

      <!-- Transaction Information -->
      <div class="flex justify-center w-[20%]">
        {{ item?.date.toString().slice(8, 10) }}/{{
          item?.date.toString().slice(5, 7)
        }}/{{ item?.date.toString().slice(0, 4) }}
        -
        {{
          String(Number(item?.date.toString().slice(11, 13)) + 3).padStart(
            2,
            "0"
          )
        }}{{ item?.date.toString().slice(13, 19) }}
      </div>

      <!-- Transaction Detail -->
      <div class="flex justify-center w-[25%]">
        {{ item?.detail }}
      </div>

      <!-- Card Number -->
      <div class="flex justify-center w-[15%]">
        {{ item?.number.slice(0, 2) }} ******
        {{ item?.number.slice(12, 16) }}
      </div>

      <!-- Transaction Amount -->
      <div
        :class="{
          'text-red-500': item?.amount?.startsWith('-'),
          'text-green-500': item?.amount?.startsWith('+'),
        }"
        class="flex justify-center w-[15%]"
      >
        {{ item?.amount }}$
      </div>

      <!-- Payment Status -->
      <div
        :class="[
          'h-[4vh] rounded-lg flex justify-center items-center w-[15%]',
          item?.state === 'success'
            ? 'bg-green-500 bg-opacity-10 text-green-500'
            : 'bg-orange-500 bg-opacity-10 text-orange-500',
        ]"
      >
        {{ item?.state }}
      </div>
    </div>
  </div>

  <div v-else>
    <div
      class="h-[20vh] flex text-center text-gray-500 justify-center items-center"
    >
      No Transactions Yet.
    </div>
  </div>
</template>

<script setup lang="ts">
import { GetTransactionStore } from "@/stores/transactionStore";

const getTransactionStore = GetTransactionStore();

onMounted(async () => {
  await getTransactionStore.fetchTransactions();
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
