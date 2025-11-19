<script lang="ts" setup>
import type { TTask } from "~/type/task";

const props = defineProps<{ task: TTask }>();
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

const initialData = {
  ...props.task,
  due: new Date(props.task.due),
  status: {
    code: props.task.status,
    name: props.task.status[0]?.toUpperCase() + "" + props.task.status.slice(1),
  },
  priority: {
    code: props.task.priority,
    name:
      props.task.priority[0]?.toUpperCase() + "" + props.task.priority.slice(1),
  },
};

console.log(initialData);
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
  due: Date | null;
}>(initialData);

const handleSubmit = () => {};
</script>

<template>
  <form class="flex flex-col md:flex-row gap-6" @submit.prevent="handleSubmit">
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
          severity="secondary"
          icon="pi pi-pencil"
          class="w-full"
          label="Update"
      /></InputGroup>
    </div>
  </form>
</template>
