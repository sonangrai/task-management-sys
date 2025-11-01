<script lang="ts" setup>
import { onMounted, ref } from "vue";

const wishList = ref<string[]>([]);

onMounted(() => {
  const localWish = localStorage.getItem("wishList");
  if (localWish && JSON.parse(localWish)) {
    wishList.value = JSON.parse(localWish);
  }
});

const newValue = ref("");

const handleSubmit = () => {
  if (newValue.value.trim() != "") {
    wishList.value.push(newValue.value);

    localStorage.setItem("wishList", JSON.stringify(wishList.value));
  }
  newValue.value = "";
};
</script>

<template>
  <form class="mt-2 w-full" @submit.prevent="handleSubmit">
    <div class="flex gap-2">
      <input
        type="text"
        class="border grow-2 p-2"
        placeholder="Item of wish"
        name="newValue"
        v-model="newValue"
      />
      <button
        type="submit"
        class="bg-cyan-800 text-white w-[100px] cursor-pointer"
      >
        Add
      </button>
    </div>
  </form>
</template>
