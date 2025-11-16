<script lang="ts" setup>
definePageMeta({
  layout: "custom",
  middleware: "auth",
});

useHead({
  title: "Create - Task Management System",
});

const data = ref({
  title: "",
  description: "",
  status: "",
  priority: "",
  due: null,
});

const status = ref([
  {
    id: 1,
    code: "pending",
    name: "Pending",
    color: "text-pink-600",
  },
  {
    id: 2,
    code: "in_progress",
    name: "In Progress",
    color: "text-blue-600",
  },
  {
    id: 3,
    code: "completed",
    name: "Completed",
    color: "text-green-600",
  },
  {
    id: 4,
    code: "cancelled",
    name: "Cancelled",
    color: "text-red-600",
  },
  {
    id: 5,
    code: "on_hold",
    name: "On Hold",
    color: "text-yellow-600",
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
</script>

<template>
  <div class="max-w-[1280px] mx-auto py-8">
    <h2 class="mb-4 text-lg font-bold">Create a Task</h2>
    <form class="flex gap-6">
      <div class="grow-2 flex flex-col gap-4">
        <InputGroup>
          <InputText v-model="data.title" placeholder="Title" />
        </InputGroup>

        <InputGroup>
          <Editor v-model="data.description" class="w-full h-[70vh]" />
        </InputGroup>
      </div>

      <div class="w-[300px] flex flex-col gap-4">
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
          />
        </InputGroup>

        <InputGroup>
          <Button type="submit" icon="pi pi-plus" class="w-full" label="Create"
        /></InputGroup>
      </div>
    </form>
  </div>
</template>
