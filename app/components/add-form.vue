<script lang="ts" setup>
const wishList = useWishlistStore();
const newValue = ref("");

const handleSubmit = () => {
  if (newValue.value.trim() != "") {
    wishList.addWish(newValue.value);
  }
  newValue.value = "";
};
</script>

<template>
  <form class="mt-2 w-full" @submit.prevent="handleSubmit">
    <div class="flex gap-2">
      <input
        type="text"
        class="border grow-2 p-2 rounded-md"
        placeholder="Item of wish"
        name="newValue"
        v-model="newValue"
      />
      <button
        type="submit"
        class="bg-cyan-800 text-white w-[100px] cursor-pointer rounded-md"
      >
        Add
      </button>
    </div>
  </form>
</template>
