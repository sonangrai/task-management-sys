<script lang="ts" setup>
import type { TTask } from "~/type/task";

const props = defineProps<{ task: TTask }>();
</script>

<template>
  <div class="border border-green-700 cursor-pointer p-2">
    <h2 class="text-md font-medium">
      {{ props.task.title }}
    </h2>

    <p class="font-sm italic">Due: {{ props.task.due.slice(0, 10) }}</p>

    <Tag severity="secondary" value="Secondary" rounded>{{
      props.task.priority
    }}</Tag>
  </div>
</template>
