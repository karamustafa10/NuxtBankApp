import { defineStore } from "pinia";
import { ref } from "vue";
import type { People } from "~/models/people";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";
import { useI18n } from "vue-i18n";

export const UserInfoStore = defineStore("userInfo", () => {
  const toast = useToast();
  const userId = ref<number | undefined>();
  const userRole = ref<string | undefined>();

  const fetchUserInfo = async () => {
    try {
      const response = (await $fetch("/api/userInfo")) as any;
      if (response?.success && response?.userId) {
        userId.value = response.userId;
        userRole.value = response.userRole;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  const checkSessionCookie = async () => {
    try {
      const response = await $fetch("/api/userInfo");
      if (!response.success) {
        toast.error("Invalid user information in session!", {
          position: POSITION.TOP_CENTER,
        });
        navigateTo("/sign-in");
      }
    } catch (error) {
      console.error("Error checking session cookie:", error);
    }
  };

  return { userId, userRole, fetchUserInfo, checkSessionCookie };
});

export const GetUserWithIdStore = defineStore("getUserWithId", () => {
  const user = ref<People | undefined>();
  const userInfoStore = UserInfoStore();

  const fetchUserWithId = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch<People>("/api/getUserWithId", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response) {
        user.value = response;
      }
    } catch (error) {
      console.error("Error fetching user:", error);
    }
  };

  return {
    user,
    fetchUserWithId,
  };
});

export const GetAllUsersStore = defineStore("getAllUsers", () => {
  const users = ref<People[]>([]);
  const userInfoStore = UserInfoStore();

  const fetchAllUsers = async () => {
    try {
      await userInfoStore.fetchUserInfo();
      const userId = userInfoStore.$state.userId;

      const response = await $fetch("/api/getAllUsers", {
        method: "POST",
        body: {
          id: userId,
        },
      });

      if (response) {
        users.value = response.map((user: any) => ({
          id: user.userId,
          firstName: user.firstName,
          lastName: user.lastName,
          mail: "",
          phone: "",
        }));
      }
    } catch (error) {
      console.error("Error fetching users:", error);
    }
  };

  return {
    users,
    fetchAllUsers,
  };
});

export const addUserStore = defineStore("addUser", () => {
  const toast = useToast();
  const firstName = ref();
  const lastName = ref();
  const phone = ref();
  const mail = ref();
  const password = ref();
  const confirmPassword = ref();
  const router = useRouter();

  const { t } = useI18n();

  const handleSubmit = async () => {
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    const phoneRegex = /^\+\d{10,14}$/;

    if (
      !firstName.value ||
      !lastName.value ||
      !phone.value ||
      !mail.value ||
      !password.value ||
      !confirmPassword.value
    ) {
      toast.error(t("all_fields_must_be_filled"), {
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

    if (!phoneRegex.test(phone.value)) {
      toast.error(t("please_enter_valid_phone"), {
        position: POSITION.TOP_CENTER,
      });
      return;
    }

    if (password.value.length < 8) {
      toast.error(t("please_enter_valid_password"), {
        position: POSITION.TOP_CENTER,
      });
      return;
    }

    if (password.value !== confirmPassword.value) {
      toast.error(t("password_do_not_match"), {
        position: POSITION.TOP_CENTER,
      });
      return;
    }

    try {
      const response = await $fetch("/api/addUser", {
        method: "POST",
        body: {
          firstName: firstName.value,
          lastName: lastName.value,
          phone: phone.value.toString(),
          mail: mail.value,
          password: password.value,
        },
      });

      if (response.message === "Telefon numarası zaten kullanımda.") {
        toast.error(t("phone_number_already_in_use"), {
          position: POSITION.TOP_CENTER,
        });
        return;
      } else if (response.message === "E-posta adresi zaten kullanımda.") {
        toast.error(t("email_already_in_use"), {
          position: POSITION.TOP_CENTER,
        });
        return;
      } else if (response.success === true) {
        toast.success(t("welcome") + response.message, {
          position: POSITION.TOP_CENTER,
        });
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        toast.error(`Error: ${error.message}`, {
          position: POSITION.TOP_CENTER,
        });
      } else {
        toast.error(t("an_unknown_error_occurred"), {
          position: POSITION.TOP_CENTER,
        });
      }
    }
  };

  return {
    firstName,
    lastName,
    phone,
    mail,
    password,
    confirmPassword,
    handleSubmit,
  };
});
