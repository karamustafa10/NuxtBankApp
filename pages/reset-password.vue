<template>
  <div class="w-full h-[100vh] flex flex-row justify-center items-center">
    <div
      class="w-[60%] h-[90vh] flex flex-row justify-center items-center p-0 rounded-2xl shadow-2xl"
    >
      <div
        class="w-[50%] h-[100%] border-2 border-[#0177fb] border-opacity-70 rounded-l-2xl"
      >
        <div class="w-[50%] ml-[15%] mt-[10%]">
          <Logo />
        </div>
        <div class="ml-[15%] mt-[3%] text-3xl font-semibold">
          {{ $t("reset_password") }}
        </div>
        <div class="ml-[15%] mt-[3%] text-xs">
          {{ $t("you_remember_your_password") }}
          <span class="text-[#0177fb] underline"
            ><a href="/sign-in">{{ $t("sign_in_now") }}</a></span
          >
        </div>
        <div class="ml-[15%] mt-[7%]">
          <div class="text-xs">E-mail</div>
          <div class="w-[80%] mt-[1%]">
            <UInput
              color="blue"
              placeholder="someone@example.com"
              :ui="{ variant: { outline: 'bg-white' } }"
            />
          </div>
          <div class="text-xs mt-[5%]">{{ $t("e_mail_again") }}</div>
          <div class="w-[80%] mt-[1%]">
            <UInput
              color="blue"
              placeholder="someone@example.com"
              :ui="{ variant: { outline: 'bg-white' } }"
            />
          </div>
          <div class="mt-[7%] w-[80%]">
            <UButton
              block
              size="sm"
              color="blue"
              variant="solid"
              :label="$t('send_mail_for_reset_password')"
            />
          </div>
          <div class="flex flex-col w-[60%] justify-center ml-[10%] mt-[5%]">
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
      <div
        class="w-[50%] h-[100%] bg-[#0177fb] bg-opacity-70 rounded-r-2xl pt-[2%]"
      >
        <div class="flex justify-center">
          <div class="mr-[1%]">
            <UIcon name="i-heroicons-link" class="w-4 h-4 text-white" />
          </div>
          <div class="text-sm text-white">{{ $t("support") }}</div>
        </div>
        <div class="px-[15%] py-[10%]">
          <img
            class="rounded-2xl shadow-2xl"
            src="https://images.pexels.com/photos/730564/pexels-photo-730564.jpeg?auto=compress&cs=tinysrgb&w=600"
            alt=""
          />
        </div>
        <div class="flex justify-center text-2xl font-semibold text-white">
          {{ $t("check_y_b_w_r") }}
        </div>
        <div class="flex text-center mt-[2%] p-[2%] text-white">
          Lorem ipsum dolor sit amet consectetur adipisicing elit. Inventore
          culpa eligendi dolor facere iste vero consequatur repudiandae, rem
          totam suscipit quisquam alias, maiores eos sint aliquid in? Doloribus,
          ipsum provident.
        </div>
        <div class="flex justify-center items-center mt-[15%] text-white">
          <div class="flex items-center">
            <UIcon name="i-heroicons-at-symbol" class="w-3 h-3" />
          </div>
          <div class="text-sm">2024</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup lang="ts">
import { _white } from "#tailwind-config/theme/accentColor";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const changeLocale = (locale: string) => {
  localStorage.setItem("locale", locale);
  window.location.reload();
};

useHead({
  title: "Ridex | " + `${t("reset_password")}`,
});

definePageMeta({
  layout: false,
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-redirect",
});
</script>
