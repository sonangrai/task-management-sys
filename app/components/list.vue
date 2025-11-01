<script setup lang="ts">
import { onMounted, ref } from "vue";

const wishList = ref();

onMounted(() => {
  const wishLocal = localStorage.getItem("wishList");
  if (wishLocal) wishList.value = JSON.parse(wishLocal);
});
</script>

<template>
  <div class="border border-gray-300 rounded-md">
    <div v-if="!wishList">Nothing Yet</div>
    <div v-else class="p-4">
      <ul class="list-decimal pl-4">
        <li v-for="item of wishList">{{ item }}</li>
      </ul>
    </div>
  </div>
</template>
