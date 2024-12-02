import { defineStore } from "pinia";
import { ref } from "vue";
import { useRouter } from "vue-router";
import { useToast, POSITION } from "vue-toastification";

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
