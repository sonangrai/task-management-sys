<script setup lang="ts">
import { useWishlistStore } from "~/stores/wishlist";

const wishList = useWishlistStore();
</script>

<template>
  <div class="border border-gray-300 rounded-md">
    <div
      v-if="wishList.wish.length == 0"
      class="p-4 text-center text-green-800"
    >
      Nothing Yet in your wish
    </div>
    <div v-else class="p-4">
      <ul class="pl-4 flex flex-col gap-2">
        <li
          v-for="(item, i) of wishList.wish"
          :key="item"
          class="flex gap-2 items-center"
        >
          <span class="font-bold">{{ i + 1 }}.</span>
          <span class="text-lg">{{ item }}</span>

          <button
            @click="wishList.removeWish(i)"
            class="bg-red-500 text-white rounded-sm px-2 py-1 text-xs cursor-pointer"
          >
            Remove
          </button>
        </li>
      </ul>
    </div>
  </div>
</template>
