<script lang="ts" setup>
const TASK_STATUS = [
  {
    id: 1,
    key: "pending",
    label: "Pending",
    color: "text-pink-600",
  },
  {
    id: 2,
    key: "in_progress",
    label: "In Progress",
    color: "text-blue-600",
  },
  {
    id: 3,
    key: "completed",
    label: "Completed",
    color: "text-green-600",
  },
  {
    id: 4,
    key: "cancelled",
    label: "Cancelled",
    color: "text-red-600",
  },
  {
    id: 5,
    key: "on_hold",
    label: "On Hold",
    color: "text-yellow-600",
  },
];
</script>

<template>
  <div class="grid gap-6 grid-cols-[repeat(5,1fr)] my-8">
    <div v-for="state in TASK_STATUS" :key="state.id">
      <div class="border border-green-700">
        <div class="p-2 border-b">
          <h2 class="text-md text-center font-bold" :class="state.color">
            {{ state.label }}
          </h2>
        </div>

        <div class="p-2">
          <ul>
            <li>HEHE</li>
          </ul>
        </div>
      </div>
    </div>
  </div>
</template>
