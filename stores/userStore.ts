import { defineStore } from "pinia";
import { ref } from "vue";
import type { People } from "~/models/people";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

export const UserInfoStore = defineStore("userInfo", () => {
  const userId = ref<number | undefined>();

  const fetchUserInfo = async () => {
    try {
      const response = (await $fetch("/api/userInfo")) as any;
      if (response?.success && response?.userId) {
        userId.value = response.userId;
      }
    } catch (error) {
      console.error("Error fetching user info:", error);
    }
  };

  return { userId, fetchUserInfo };
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
      alert("All fields must be filled!");
      return;
    }

    if (!emailRegex.test(mail.value)) {
      alert("Please enter a valid email address!");
      return;
    }

    if (!phoneRegex.test(phone.value)) {
      alert("Please enter a valid phone number in the format +XXXXXXXXXXX");
      return;
    }

    if (password.value.length < 8) {
      alert("Password must be at least 8 characters long!");
      return;
    }

    if (password.value !== confirmPassword.value) {
      alert("Passwords do not match!");
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
      toast.info(`${response.message}`, {
        position: POSITION.TOP_CENTER,
      });
      if (response.success) {
        router.push("/");
      }
    } catch (error) {
      if (error instanceof Error) {
        alert(`Error: ${error.message}`);
      } else {
        alert("An unknown error occurred.");
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
