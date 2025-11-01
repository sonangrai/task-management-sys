import { defineStore } from "pinia";

type TWish = string[];

export const useWishlistStore = defineStore("wishes", {
  state: () => {
    return { wish: [] as TWish };
  },
  actions: {
    addWish(item: string) {
      this.wish.push(item);
    },

    removeWish(index: number) {
      this.wish.splice(index, 1);
    },
  },
});
