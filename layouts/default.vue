<template>
  <div class="w-[100%] h-[100vh] flex">
    <div class="w-[15%] h-[100vh] bg-gray-100">
      <div class="w-full h-[10vh] pl-[8%] pt-[8%]">
        <Logo />
      </div>
      <div class="w-full h-[90vh] flex flex-col justify-between rounded-r-2xl">
        <div class="w-[95%] space-y-2 ml-[5%]">
          <UButton
            v-for="(button, index) in buttons"
            :key="index"
            :class="[
              'w-[95%] h-[5vh] text-md side-button',
              isActive(button.url) ? 'side-button-route' : '',
            ]"
            :icon="button.icon"
            variant="ghost"
            :label="button.label"
            :trailing="false"
            @click="navigateTo(button.url)"
          />
        </div>
        <div class="w-[95%] space-y-2 ml-[5%]">
          <UButton
            v-for="(button, index) in footerButtons"
            :key="index"
            :class="[
              'w-[95%] h-[5vh] text-md side-button',
              isActive(button.url) ? 'side-button-route' : '',
            ]"
            :icon="button.icon"
            variant="ghost"
            :label="button.label"
            :trailing="false"
            @click="navigateTo(button.url)"
          />
          <div>
            <div class="ml-[5%] mb-[5%] text-gray-400">
              {{ $t("select_a_language") }} :
            </div>
            <div class="flex justify-around mb-[10%]">
              <div class="flex justify-center w-[20%]">
                <UButton
                  color="blue"
                  variant="ghost"
                  class="flex w-[100%] justify-center"
                  @click="changeLocale('tr')"
                  ><img
                    src="https://cdn-icons-png.flaticon.com/512/197/197518.png"
                    alt="tr"
                /></UButton>
              </div>
              <div class="flex justify-center w-[20%]">
                <UButton
                  color="blue"
                  variant="ghost"
                  class="flex w-[100%] justify-center"
                  @click="changeLocale('en')"
                  ><img
                    src="https://cdn-icons-png.flaticon.com/512/197/197484.png"
                    alt="en"
                /></UButton>
              </div>
              <div class="flex justify-center w-[20%]">
                <UButton
                  color="blue"
                  variant="ghost"
                  class="flex w-[100%] justify-center"
                  @click="changeLocale('fr')"
                  ><img
                    src="https://cdn-icons-png.flaticon.com/512/197/197560.png"
                    alt="fr"
                /></UButton>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
    <div class="w-[85%] h-[100vh] flex flex-col justify-start">
      <div
        class="w-[100%] h-[8vh] bg-gray-100 flex items-center justify-end pr-[1%] rounded-b-xl"
      >
        <div class="mr-[1%]">
          <UPopover>
            <UButton
              class="header-button"
              variant="ghost"
              icon="i-heroicons-magnifying-glass"
            />
            <template #panel>
              <div class="p-4">
                <Placeholder class="h-20 w-48" />
                <div class="flex p-[5%]">
                  <UInput
                    class="mr-[3%]"
                    color="blue"
                    variant="outline"
                    :placeholder="$t('search')"
                  />
                  <UButton
                    class="search-button"
                    icon="i-heroicons-magnifying-glass"
                    size="sm"
                  />
                </div>
              </div>
            </template>
          </UPopover>
        </div>
        <div class="mr-[1%]">
          <UPopover>
            <UChip color="blue">
              <UButton
                class="header-button"
                variant="ghost"
                icon="i-heroicons-bell"
              />
            </UChip>
            <template #panel>
              <div class="p-4">
                <Placeholder class="h-20 w-48" />
                <div>{{ $t("no_notif_here") }}</div>
              </div>
            </template>
          </UPopover>
        </div>
        <div>
          <button class="rounded-md border-[1px] border-gray-500">
            <UPopover>
              <UAvatar :alt="userName" />
              <template #panel>
                <div class="p-4 items-start justify-center">
                  <Placeholder class="h-20 w-48" />
                  <div>
                    <UButton
                      class="w-[100%] editprofile-button"
                      :label="$t('edit_profile')"
                      @click="editProfile, (isEditProfileOpen = true)"
                    />
                    <UModal
                      v-model="isEditProfileOpen"
                      :ui="{ width: 'min-w-[20%]', height: 'min-h-[65vh]' }"
                    >
                      <div class="p-8">
                        <div class="flex justify-between">
                          <div
                            class="text-2xl font-semibold text-center mb-[5%]"
                          >
                            {{ $t("edit_profile") }}
                          </div>
                          <div>
                            <UButton
                              label="x"
                              color="red"
                              @click="isEditProfileOpen = false"
                            />
                          </div>
                        </div>
                        <div class="flex mb-[3%]">
                          <div class="mr-[6%] w-[47%]">
                            <div class="text-xs mr-[42%] ml-[1%] mb-[1%]">
                              {{ $t("first_name") }}
                            </div>
                            <UInput color="blue" v-model="editFirstName" />
                          </div>
                          <div class="w-[47%]">
                            <div class="text-xs ml-[1%] mb-[1%]">{{ $t("last_name") }}</div>
                            <UInput color="blue" v-model="editLastName" />
                          </div>
                        </div>
                        <div class="flex">
                          <div class="text-xs mb-[0.5%] mr-[45.5%]">E-Mail</div>
                          <div class="text-xs mb-[0.5%]">{{ $t("phone") }}</div>
                        </div>
                        <div class="flex mb-[3%]">
                          <div class="w-[47%] mr-[6%]">
                            <UInput color="blue" v-model="editMail" />
                          </div>
                          <div class="w-[47%]">
                            <UInput color="blue" v-model="editPhone" />
                          </div>
                        </div>
                        <div class="text-xs mb-[0.5%]">
                          {{ $t("old_password") }}
                        </div>
                        <div class="mb-[3%]">
                          <UInput
                            color="blue"
                            type="password"
                            v-model="oldPassword"
                          />
                        </div>
                        <div class="text-xs mb-[0.5%]">
                          {{ $t("new_password") }}
                        </div>
                        <div class="mb-[3%]">
                          <UInput
                            color="blue"
                            type="password"
                            v-model="newPassword"
                          />
                        </div>
                        <div class="text-xs mb-[0.5%]">
                          {{ $t("new_password_again") }}
                        </div>
                        <div class="mb-[5%]">
                          <UInput
                            color="blue"
                            type="password"
                            v-model="newPasswordAgain"
                          />
                        </div>
                        <div class="flex justify-center">
                          <UButton
                            color="blue"
                            :label="$t('edit_profile')"
                            @click="editProfile"
                          />
                        </div>
                      </div>
                    </UModal>
                  </div>
                  <div class="mt-[5%]">
                    <UButton
                      class="w-[100%] logout-button text-center"
                      :label="$t('log_out')"
                      @click="handleLogout"
                    />
                  </div>
                </div>
              </template>
            </UPopover>
          </button>
        </div>
      </div>
      <div>
        <NuxtPage />
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { useRoute, useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const changeLocale = (locale: string) => {
  localStorage.setItem("locale", locale);
  window.location.reload();
};

let userIdString;
const toast = useToast();

const response = (await $fetch("/api/userInfo")) as any;
if (response.success && response.userId) {
  userIdString = response.userId;
}

const userId = Number(userIdString);

const user = await $fetch("/api/getUserWithId", {
  method: "POST",
  body: {
    id: userId,
  },
});

await $fetch("/api/getCardWithId", {
  method: "POST",
  body: {
    id: userId,
  },
});

const userName = ref(`${user?.firstName} ${user?.lastName}`);

const route = useRoute();
const router = useRouter();
const isEditProfileOpen = ref(false);

const editFirstName = ref();
const editLastName = ref();
const editMail = ref();
const oldPassword = ref("");
const editPhone = ref();
const newPassword = ref("");
const newPasswordAgain = ref("");

onMounted(() => {
  editFirstName.value = user?.firstName;
  editLastName.value = user?.lastName;
  editMail.value = user?.mail;
  editPhone.value = "+" + user?.phone;
});

const isActive = (url: string) => {
  return route.path === `/${url.toLowerCase()}`;
};

const navigateTo = (url: string) => {
  router.push(`/${url.toLowerCase()}`);
};

const buttons = [
  { label: t("dashboard"), url: "", icon: "i-heroicons-home" },
  {
    label: t("invoices"),
    url: "invoices",
    icon: "i-heroicons-receipt-percent",
  },
  {
    label: t("messages"),
    url: "messages",
    icon: "i-heroicons-chat-bubble-left-right",
  },
  { label: t("my_wallets"), url: "my-wallets", icon: "i-heroicons-wallet" },
  { label: t("activity"), url: "activity", icon: "i-heroicons-chart-pie" },
  {
    label: t("analytics"),
    url: "analytics",
    icon: "i-heroicons-chart-bar-square",
  },
];
const footerButtons = [
  {
    label: t("get_help"),
    url: "get-help",
    icon: "i-heroicons-question-mark-circle",
  },
  {
    label: t("settings"),
    url: "settings",
    icon: "i-heroicons-adjustments-horizontal",
  },
];

const handleLogout = async () => {
  try {
    await $fetch("/api/logout", { method: "POST" });
    router.push("/sign-in"); // Giriş sayfasına yönlendirme
    toast.info(t("logged_out_successfully"), {
      position: POSITION.TOP_CENTER,
    });
  } catch (error) {
    alert("Logout failed: " + error);
  }
};

const editProfile = async () => {
  const response = await $fetch("/api/editUserInfo", {
    method: "POST",
    body: {
      id: userId.toString(),
      firstName: editFirstName.value,
      lastName: editLastName.value.toUpperCase(),
      mail: editMail.value,
      phone: editPhone.value.toString(),
      oldPassword: oldPassword.value,
      newPassword: newPassword.value,
      newPasswordAgain: newPasswordAgain.value,
    },
  });

  if (response && response.success) {
    toast.success(t("profile_edited_successfully"), {
      position: POSITION.TOP_CENTER,
    });

    await new Promise((resolve) => setTimeout(resolve, 2000));

    isEditProfileOpen.value = false;
    oldPassword.value = "";
    newPassword.value = "";
    newPasswordAgain.value = "";
    window.location.reload();
  } else if (response) {
    toast.error(`${response.message}`, {
      position: POSITION.TOP_CENTER,
    });
  } else {
    toast.error(t("an_unknown_error_occurred"), {
      position: POSITION.TOP_CENTER,
    });
  }
};
</script>

<style scoped>
.side-button {
  background-color: #f3f4f6;
  color: gray;
  transition: 0.3s;
}

.side-button:hover {
  background-color: rgba(128, 128, 128, 0.2);
  transition: 0.3s;
}

.side-button-route {
  background-color: #0176fb10;
  color: #0177fb;
}

.header-button {
  background-color: #f3f4f6;
  color: gray;
  transition: 0.3s;
  border: 1px solid gray;
}

.header-button:hover {
  background-color: gray;
  color: white;
  transition: 0.3s;
}

.editprofile-button {
  background-color: #f3f4f6;
  color: #0177fb;
  transition: 0.3s;
  border: 1px solid #0177fb;
}

.editprofile-button:hover {
  background-color: #0177fb;
  color: white;
  transition: 0.3s;
}

.logout-button {
  background-color: #f3f4f6;
  color: red;
  transition: 0.3s;
  border: 1px solid red;
  display: flex;
  justify-content: center;
  align-items: center;
}

.logout-button:hover {
  background-color: red;
  color: white;
  transition: 0.3s;
}

.search-button {
  background-color: #0176fb10;
  color: #0177fb;
  transition: 0.3s;
}

.search-button:hover {
  background-color: #0177fb;
  color: white;
  transition: 0.3s;
}
</style>
