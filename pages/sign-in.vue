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
          {{ $t("sign_in") }}
        </div>
        <div class="ml-[15%] mt-[3%] text-xs">
          {{ $t("dont_have_account") }}
          <span class="text-[#0177fb] underline"
            ><a href="/sign-up">{{ $t("create_now") }}</a></span
          >
        </div>
        <div class="ml-[15%] mt-[7%]">
          <div class="text-xs">E-mail</div>
          <div class="w-[80%] mt-[1%]">
            <UInput
              color="blue"
              v-model="mail"
              placeholder="someone@example.com"
              :ui="{ variant: { outline: 'bg-white' } }"
            />
          </div>
          <div class="text-xs mt-[5%]">{{ $t("password") }}</div>
          <div class="w-[80%] mt-[1%]">
            <UInput
              type="password"
              v-model="password"
              color="blue"
              variant="outline"
              placeholder="********"
              :ui="{ variant: { outline: 'bg-white' } }"
            />
          </div>
          <div
            class="flex justify-between items-center w-[80%] text-xs mt-[3%]"
          >
            <div class="flex items-center w-[35%]">
              <UCheckbox color="blue" name="rememberMe" v-model="rememberMe" />
              <div class="ml-[2%]">{{ $t("remember_me") }}</div>
            </div>
            <div class="text-[#0177fb] underline">
              <a href="/reset-password">{{ $t("forgot_password") }}</a>
            </div>
          </div>
          <div class="mt-[10%] w-[80%]">
            <UButton
              block
              size="sm"
              color="blue"
              variant="solid"
              :label="$t('sign_in')"
              @click="handleSignIn"
            />
          </div>
          <div class="w-[80%] mt-[5%]">
            <UDivider
              :label="$t('or')"
              type="solid"
              size="xs"
              :ui="{ border: { base: 'border-blue-400' } }"
            />
          </div>
          <div class="mt-[5%] w-[80%] border-2 border-blue-500 rounded-lg">
            <UButton
              block
              size="sm"
              color="white"
              variant="solid"
              :label="$t('sign_with_google')"
            />
          </div>
          <div class="mt-[3%] w-[80%] border-2 border-blue-500 rounded-lg">
            <UButton
              block
              size="sm"
              color="white"
              variant="solid"
              :label="$t('sign_with_facebook')"
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
        <div
          class="flex text-center justify-center text-2xl font-semibold text-white"
        >
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
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";
import { useI18n } from "vue-i18n";

const { t } = useI18n();

const mail = ref("");
const password = ref("");
const rememberMe = ref(false);
const router = useRouter();
const toast = useToast();

const handleSignIn = async () => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (!mail.value || !password.value) {
    toast.error(t("both_fields_must_be_filled"), {
      position: POSITION.TOP_CENTER,
    });
    return;
  }

  if (!emailRegex.test(mail.value)) {
    toast.error(t("please_enter_a_valid_email_address"), {
      position: POSITION.TOP_CENTER,
    });
    return;
  }

  try {
    const response = await $fetch("/api/getUser", {
      method: "POST",
      body: {
        mail: mail.value,
        password: password.value,
        rememberMe: rememberMe.value,
      },
    });

    if (response.success) {
      toast.info(`${t("welcome_back")}, ${response.firstName}!`, {
        position: POSITION.TOP_CENTER,
      });
      router.push("/"); // Redirect to the home page or another page
    } else {
      if (response.message === "User not found...") {
        toast.error(`${t("user_not_found")}`, {
          position: POSITION.TOP_CENTER,
        });
      } else if (response.message === "Wrong password...") {
        toast.error(`${t("wrong_password")}`, {
          position: POSITION.TOP_CENTER,
        });
      }
    }
  } catch (error) {
    if (error instanceof Error) {
      toast.error(`${error}`, {
        position: POSITION.TOP_CENTER,
      });
    } else {
      toast.error(t("an_unknown_error_occurred"), {
        position: POSITION.TOP_CENTER,
      });
    }
  }
};

const changeLocale = (locale: string) => {
  localStorage.setItem("locale", locale);
  window.location.reload();
};

useHead({
  title: "Ridex | " + t("sign_in"),
});

definePageMeta({
  layout: false,
  colorMode: "_light" as "light" | "dark",
  middleware: "auth-redirect",
});
</script>
