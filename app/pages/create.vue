<script lang="ts" setup>
definePageMeta({
  layout: "custom",
  middleware: "auth",
});

useHead({
  title: "Create - Task Management System",
});
const toast = useToast();
const supabase = useSupabaseClient();

const {
  data: { session },
} = await supabase.auth.getSession();
const config = useRuntimeConfig();

const creating = ref<boolean>(false);

const initialData = {
  title: "",
  description: "",
  status: {
    code: "pending",
    name: "Pending",
  },
  priority: {
    code: "moderate",
    name: "Moderate",
  },
  due: null,
};

const data = ref<{
  title: string;
  description: string;
  status: {
    code: string;
    name: string;
  };
  priority: {
    code: string;
    name: string;
  };
  due: null;
}>(initialData);

const status = ref([
  {
    code: "pending",
    name: "Pending",
  },
  {
    code: "in_progress",
    name: "In Progress",
  },
  {
    code: "completed",
    name: "Completed",
  },
  {
    code: "cancelled",
    name: "Cancelled",
  },
  {
    code: "on_hold",
    name: "On Hold",
  },
]);

const priority = ref([
  {
    code: "urgent",
    name: "Urgent",
  },
  {
    code: "high",
    name: "High",
  },
  {
    code: "medium",
    name: "Medium",
    color: "text-green-600",
  },
  {
    code: "moderate",
    name: "Moderate",
  },
  {
    code: "low",
    name: "Low",
  },
]);

const handleSubmit = async () => {
  creating.value = true;
  const payload = {
    ...data.value,
    status: data?.value?.status.code,
    priority: data?.value?.priority.code,
  };

  try {
    await $fetch(`${config.public.backendUrl}/api/task`, {
      method: "POST",
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
        "Content-Type": "application/json",
      },
      body: JSON.stringify(payload),
    });

    toast.add({
      severity: "success",
      summary: "Created Task",
      detail: "Successfully created the task",
      life: 3000,
    });
    creating.value = false;

    data.value = initialData;
  } catch {
    toast.add({
      severity: "error",
      summary: "Failed to create",
      detail: "Failed to create the task",
      life: 3000,
    });
    creating.value = false;
  }
};
</script>

<template>
  <div class="max-w-[1280px] mx-auto px-2 py-8">
    <Toast />
    <h2 class="mb-4 text-lg font-bold">Create a Task</h2>
    <form
      class="flex flex-col md:flex-row gap-6"
      @submit.prevent="handleSubmit"
    >
      <div class="grow-2 flex flex-col gap-4">
        <InputGroup>
          <InputText v-model="data.title" placeholder="Title" required="true" />
        </InputGroup>

        <InputGroup>
          <Editor
            v-model="data.description"
            class="w-full h-[500px] md:h-[70vh]"
            required
          />
        </InputGroup>
      </div>

      <div class="w-full md:w-[300px] flex flex-col gap-4">
        <InputGroup>
          <Select
            v-model="data.status"
            :options="status"
            optionLabel="name"
            placeholder="Select a Status"
            class="w-full"
          />
        </InputGroup>

        <InputGroup>
          <Select
            v-model="data.priority"
            :options="priority"
            optionLabel="name"
            placeholder="Select a priority"
            class="w-full"
          />
        </InputGroup>

        <InputGroup>
          <DatePicker
            id="datepicker-12h"
            v-model="data.due"
            showTime
            hourFormat="12"
            placeholder="Due"
            fluid
            required
          />
        </InputGroup>

        <InputGroup>
          <Button
            type="submit"
            icon="pi pi-plus"
            class="w-full"
            label="Create"
            :loading="creating"
        /></InputGroup>
      </div>
    </form>
  </div>
</template>
