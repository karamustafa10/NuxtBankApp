<template>
  <div class="rounded-lg h-[100%] bg-white border-2 p-[1%]">
    <div class="text-xl font-semibold mb-[2%]">Statics</div>
    <div class="flex justify-around">
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-10 h-10 bg-purple-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-user-plus" class="w-5 h-5 text-purple-500" />
        </div>
        <div class="ml-[4%] text-sm">
          <div class="font-semibold">220k</div>
          <div>Customers</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-10 h-10 bg-cyan-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon
            name="i-heroicons-rectangle-group"
            class="w-5 h-5 text-cyan-500"
          />
        </div>
        <div class="ml-[4%] text-sm">
          <div class="font-semibold">230k</div>
          <div>Remittance</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-10 h-10 bg-green-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-banknotes" class="w-5 h-5 text-green-500" />
        </div>
        <div class="ml-[4%] text-sm">
          <div class="font-semibold">270k</div>
          <div>Donations</div>
        </div>
      </div>
      <div class="flex items-center w-[20%]">
        <div
          class="flex rounded-full w-10 h-10 bg-orange-500 bg-opacity-20 justify-center items-center"
        >
          <UIcon name="i-heroicons-clock" class="w-5 h-5 text-orange-500" />
        </div>
        <div class="ml-[4%] text-sm">
          <div class="font-semibold">130k</div>
          <div>WatchTime</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts"></script>

<style scoped></style>
