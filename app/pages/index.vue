<script lang="ts" setup>
definePageMeta({
  layout: "custom",
});

useHead({
  title: "A Shop List",
});
</script>

<template>
  <div class="max-w-[600px] mx-auto">
    <List />
    <AddForm />
  </div>
</template>
