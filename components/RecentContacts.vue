<template>
  <div>
    <div class="flex flex-row items-center justify-between">
      <div class="font-semibold">Recent Contacts</div>
      <div class="mr-[5%]">
        <UButton class="editButton" variant="ghost" icon="i-heroicons-pencil" />
        <UButton
          class="searchButton"
          variant="ghost"
          icon="i-heroicons-magnifying-glass"
        />
      </div>
    </div>
    <div class="text-xs text-gray-500">18 Recipients</div>
    <div class="mt-[5%] flex items-center justify-between">
      <div>
        <UAvatarGroup size="xs" :max="5">
          <UAvatar src="https://avatar.iran.liara.run/public/43" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/57" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/78" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/12" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/89" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/90" alt="" />
          <UAvatar src="https://avatar.iran.liara.run/public/45" alt="" />
        </UAvatarGroup>
      </div>
      <div class="mr-[5%]">
        <UButton
          class="editButton"
          variant="ghost"
          icon="i-heroicons-chevron-right"
        />
      </div>
    </div>
    <div class="rounded-lg shadow-2xl mt-[5%] mb-[1%] pl-[5%] pt-[3%]">
      <div class="text-gray-500">
        Group<span class="text-black"> Party</span>
      </div>
      <div class="mt-[5%] flex items-center justify-between mr-[5%]">
        <div>
          <UAvatarGroup size="xs" :max="3">
            <UAvatar src="https://avatar.iran.liara.run/public/78" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/12" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/89" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/90" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/45" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/78" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/12" alt="" />
            <UAvatar src="https://avatar.iran.liara.run/public/89" alt="" />
          </UAvatarGroup>
        </div>
        <div>
          <UChip color="blue">
            <UButton
              class="editButton border-2"
              variant="ghost"
              icon="i-heroicons-bell"
            />
          </UChip>
        </div>
      </div>
      <div class="flex items-center justify-between pb-[6%]">
        <div class="flex items-center mt-[5%]">
          <div class="mr-[10%]">
            <UAvatar
              size="md"
              src="https://avatar.iran.liara.run/public/43"
              alt="Avatar"
            />
          </div>
          <div>
            <div class="text-sm">Dakota Milk</div>
            <div class="text-gray-400 text-sm">$ 420.00</div>
          </div>
        </div>
        <div class="mr-[5%]">
          <UButton
            class="editButton"
            variant="ghost"
            icon="i-heroicons-chevron-right"
          />
        </div>
      </div>
    </div>
  </div>
  <div></div>
</template>

<script setup lang="ts"></script>

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
