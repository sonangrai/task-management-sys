<script setup lang="ts">
useHead({
  title: "Login - TMS",
});
import { createClient } from "@supabase/supabase-js";
const config = useRuntimeConfig();

const supabaseUrl = "https://rddzkxizeppagxxdczmn.supabase.co";
const supabaseKey = config.public.supabaseKey;
const supabase = createClient(supabaseUrl, supabaseKey);

const email = ref<string>("");
const loading = ref<boolean>(false);

const handleSubmit = async () => {
  loading.value = true;
  const { data, error } = await supabase.auth.signInWithOtp({
    email: email.value,
  });
  loading.value = false;

  if (error) console.log(error);
  else {
    console.log(data);
    email.value = "";
  }
};
</script>

<template>
  <main class="h-[100dvh] flex justify-center items-center">
    <form
      class="border border-green-500 rounded-md p-4 flex flex-col gap-4"
      @submit.prevent="handleSubmit"
    >
      <h2 class="text-gray-400 text-lg">Login to TMS</h2>

      <IconField>
        <InputIcon class="pi pi-envelope" />
        <InputText v-model="email" placeholder="Email" />
      </IconField>

      <Button label="Submit" type="submit" size="small" :loading="loading" />
    </form>
  </main>
</template>
