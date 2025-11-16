<script lang="ts" setup>
definePageMeta({
  layout: "custom",
  middleware: "auth",
});

useHead({
  title: "Task Management System",
});
</script>

<template>
  <div class="max-w-[1280px] mx-auto p-4">
    <div class="grid">
      <task-list />
    </div>
  </div>
</template>
