<template>
  <div class="w-[100%] h-[92vh]">
    <div class="flex w-[100%] h-[92vh]">
      <div class="w-[25%] p-[1%] pl-[2%]">
        <div class="h-[25%] flex flex-col justify-center p-0 mb-2">
          <BankCard />
        </div>
        <div class="h-[41%] rounded-lg border-2 p-2 mb-3">
          <SendMoney />
        </div>
        <div class="w-[100%] h-[31.4%] rounded-md border-2 p-[3%]">
          <QuickSend />
        </div>
      </div>
      <div class="w-[75%]">
        <div class="flex w-[100%] h-[45vh]">
          <div class="w-[70%] p-[2%]">
            <div
              class="w-[100%] h-[100%] rounded-lg flex justify-center items-center"
            >
              <Chart />
            </div>
          </div>
          <div class="w-[30%] p-[2%]">
            <RecentContacts />
          </div>
        </div>
        <div
          class="h-[28vh] w-[98%] p-[2%] pt-0 pb-0 flex flex-col justify-center"
        >
          <Transactions />
        </div>
        <div class="h-[17.6vh] pt-[0%] mr-[2%]">
          <Statics />
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
useHead({
  title: "Ridex | Future Bank App",
});

definePageMeta({
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-required",
});
</script>

<style scoped></style>
