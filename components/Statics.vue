<template>
  <div class="flex flex-col w-[100%] rounded-lg h-[100%] bg-white border-2 p-[1%]">
    <div class="font-semibold text-lg pb-2 pl-2">Statics</div>
    <div class="flex w-[100%] justify-around">
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-8 h-8 bg-purple-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-user-plus" class="w-4 h-4 text-purple-500" />
        </div>
        <div class="ml-[4%] text-xs">
          <div class="font-semibold">220k</div>
          <div>Customers</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-8 h-8 bg-cyan-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon
            name="i-heroicons-rectangle-group"
            class="w-4 h-4 text-cyan-500"
          />
        </div>
        <div class="ml-[4%] text-xs">
          <div class="font-semibold">230k</div>
          <div>Remittance</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-8 h-8 bg-green-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-banknotes" class="w-4 h-4 text-green-500" />
        </div>
        <div class="ml-[4%] text-xs">
          <div class="font-semibold">270k</div>
          <div>Donations</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-8 h-8 bg-orange-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-clock" class="w-4 h-4 text-orange-500" />
        </div>
        <div class="ml-[4%] text-xs">
          <div class="font-semibold">130k</div>
          <div>WatchTime</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
