<template>
  <div class="w-full max-h-[90vh] flex flex-col gap-2 p-4">
    <div class="flex flex-col justify-center items-center">
      <div class="flex justify-center mb-[2%] w-[100%]">
        <div class="font-semibold text-2xl w-[100%] text-center">
          All Transactions of All Users
        </div>
      </div>
      <div class="flex w-[100%] items-center justify-around mb-[2%]">
        <div class="flex w-[30%] justify-center items-center">
          <div class="text-center text-xs text-gray-500 mr-[2%]">
            Select Date :
          </div>
          <div>
            <UPopover :popper="{ placement: 'bottom-start' }">
              <UButton
                icon="i-heroicons-calendar-days-20-solid"
                color="blue"
                :style="{ width: '100%', height: '4vh', fontSize: '70%' }"
              >
                {{ format(selectedDate.start, "d MMM, yyy") }} -
                {{ format(selectedDate.end, "d MMM, yyy") }}
              </UButton>

              <template #panel="{ close }">
                <div
                  class="flex items-center sm:divide-x divide-gray-200 dark:divide-gray-800"
                >
                  <div class="hidden sm:flex flex-col py-4">
                    <UButton
                      v-for="(range, index) in ranges"
                      :key="index"
                      :label="range.label"
                      color="gray"
                      variant="ghost"
                      class="rounded-none px-6"
                      :class="[
                        isRangeSelected(range.duration)
                          ? 'bg-blue-100 dark:bg-blue-800'
                          : 'hover:bg-blue-50 dark:hover:bg-blue-800/50',
                      ]"
                      truncate
                      @click="selectRange(range.duration)"
                    />
                  </div>

                  <DatePicker v-model="selectedDate" @close="close" />
                </div>
              </template>
            </UPopover>
          </div>
        </div>
        <div class="flex w-[30%] justify-center items-center">
          <div class="text-center text-xs text-gray-500 mr-[2%]">
            Select Money Amount :
          </div>
          <div class="text-xs mr-[2%] text-blue-500 text-center">
            min ${{ minTrasferAmount }}
          </div>
          <div class="w-[50%]">
            <URange
              :min="minTrasferAmount"
              :max="maxTrasferAmount"
              size="sm"
              v-model="range"
              color="blue"
            />
            <div class="text-xs text-center mt-[7%]">
              <UInput v-model="range" size="2xs" />
            </div>
          </div>
          <div class="text-xs ml-[2%] text-blue-500 text-center">
            max ${{ maxTrasferAmount }}
          </div>
        </div>
        <div class="flex w-[30%] justify-center items-center">
          <div class="mr-[2%] text-xs text-gray-500">Choose a Card :</div>
          <div>
            <URadioGroup
              color="blue"
              :ui-radio="{ label: 'text-blue-500 dark:tw-text-blue-500' }"
              :options="[
                { value: 'debit', label: 'debit' },
                { value: 'credit', label: 'credit' },
                { value: 'all', label: 'all' },
              ]"
              v-model="selectedCard"
            />
          </div>
        </div>
      </div>
      <div class="h-[0.2vh] w-[100%] bg-gray-200"></div>
    </div>
    <div class="overflow-auto">
      <div
        v-for="(item, index) in filteredTransactions"
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
  </div>
</template>

<script setup lang="ts">
import { GetAllTransactionsStore } from "@/stores/transactionStore";
import { sub, format, isSameDay, type Duration } from "date-fns";

const getAllTransactions = GetAllTransactionsStore();
const range = ref(0);
const maxTrasferAmount = ref(0);
const minTrasferAmount = ref(0);
const selectedCard = ref("all");

const ranges = [
  { label: "Last 7 days", duration: { days: 7 } },
  { label: "Last 14 days", duration: { days: 14 } },
  { label: "Last 30 days", duration: { days: 30 } },
  { label: "Last 3 months", duration: { months: 3 } },
  { label: "Last 6 months", duration: { months: 6 } },
  { label: "Last year", duration: { years: 1 } },
];
const selectedDate = ref({
  start: sub(new Date(), { days: 14 }),
  end: new Date(),
});

function isRangeSelected(duration: Duration) {
  return (
    isSameDay(selectedDate.value.start, sub(new Date(), duration)) &&
    isSameDay(selectedDate.value.end, new Date())
  );
}

function selectRange(duration: Duration) {
  selectedDate.value = { start: sub(new Date(), duration), end: new Date() };
}

const clearFilter = async () => {
  await new Promise((resolve) => setTimeout(resolve, 1000));
  selectedDate.value = {
    start: sub(new Date(), { days: 14 }),
    end: new Date(),
  };
  range.value = minTrasferAmount.value;
  selectedCard.value = "all";
};

const filteredTransactions = computed(() => {
  return getAllTransactions.transactions.filter((item) => {
    const itemDate = new Date(item.date);
    const isWithinDateRange =
      itemDate >= selectedDate.value.start &&
      itemDate <= selectedDate.value.end;
    const isWithinAmountRange =
      parseFloat(item.amount) >= parseFloat(range.value.toString());
    const isCardTypeMatch =
      selectedCard.value === "all" || item.cardType === selectedCard.value;

    return isWithinDateRange && isWithinAmountRange && isCardTypeMatch;
  });
});

onUpdated(async () => {
  await getAllTransactions.fetchAllTransactions();
});

onMounted(async () => {
  await getAllTransactions.fetchAllTransactions();

  if (getAllTransactions.transactions.length > 0) {
    maxTrasferAmount.value = Math.max(
      ...getAllTransactions.transactions.map((t) => parseFloat(t.amount))
    );
  }
  if (getAllTransactions.transactions.length > 0) {
    minTrasferAmount.value = Math.min(
      ...getAllTransactions.transactions.map((t) => parseFloat(t.amount))
    );
  }
  range.value = minTrasferAmount.value;
});

console.log("filteredTransactions", filteredTransactions.value);
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
