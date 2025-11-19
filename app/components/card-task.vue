<script lang="ts" setup>
import type { TTask } from "~/type/task";

const props = defineProps<{ task: TTask }>();

let priorityColor = "secondary";

switch (props.task.priority) {
  case "urgent":
    priorityColor = "danger";
    break;

  case "high":
    priorityColor = "warn";
    break;

  case "medium":
    priorityColor = "info";
    break;

  case "moderate":
    priorityColor = "contrast";
    break;

  case "low":
    priorityColor = "success";
    break;

  default:
    priorityColor = "";
    break;
}
</script>

<template>
  <div class="border border-green-700 cursor-pointer p-2">
    <h2 class="text-md font-medium">
      {{ props.task.title }}
    </h2>

    <p class="font-sm italic">Due: {{ props.task.due.slice(0, 10) }}</p>

    <Tag :severity="priorityColor" value="Secondary" rounded>{{
      props.task.priority
    }}</Tag>
  </div>
</template>
