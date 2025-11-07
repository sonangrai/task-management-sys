<script setup lang="ts">
definePageMeta({
  middleware: "auth",
});
useHead({
  title: "Login - TMS",
});
const route = useRoute();
const supabase = useSupabaseClient();

const email = ref<string>("");
const otp = ref<string>("");
const loading = ref<boolean>(false);
const verifying = ref<boolean>(false);

const otpGenerated = ref<boolean>(false);

const handleSubmit = async () => {
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.value,
  });
  loading.value = false;

  if (error) console.log(error);
  else {
    otpGenerated.value = true;
  }
};

const handleVerify = async () => {
  verifying.value = true;
  const {
    data: { session },
    error,
  } = await supabase.auth.verifyOtp({
    email: email.value,
    token: otp.value,
    type: "email",
  });

  if (error) console.log(error);
  else {
    const returnUrl = route.query.returnUrl;
    verifying.value = false;
    if (returnUrl) await navigateTo(returnUrl as string);
    else await navigateTo("/");
  }
};
</script>

<template>
  <main class="h-[100dvh] flex justify-center items-center">
    <form
      class="border border-green-500 rounded-md p-4 flex flex-col gap-4 w-[80%] max-w-[400px]"
      @submit.prevent="handleSubmit"
      v-if="otpGenerated.valueOf() == false"
    >
      <h2 class="text-gray-400 text-lg">Login to TMS</h2>

      <IconField>
        <InputIcon class="pi pi-envelope" />
        <InputText class="w-full" v-model="email" placeholder="Email" />
      </IconField>

      <Button label="Submit" type="submit" size="small" :loading="loading" />
    </form>

    <form
      class="border border-green-500 rounded-md p-4 flex flex-col gap-4 w-[80%] max-w-[400px]"
      @submit.prevent="handleVerify"
      v-else
    >
      <h2 class="text-gray-400 text-lg">Please enter OTP</h2>
      <p class="text-gray-300 text-sm block">
        OTP has been sent to the provided email
      </p>

      <InputOtp
        class="mx-auto"
        v-model="otp"
        size="small"
        variant="filled"
        integerOnly
        :length="6"
      />

      <Button label="Verify" type="submit" size="small" :loading="verifying" />
    </form>
  </main>
</template>
