<script lang="ts" setup>
import type { TTask, TResponse } from "~/type/task";

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

const dialogVisible = ref<boolean>(false);
const chosenTask = ref<TTask | null>(null);

const config = useRuntimeConfig();
const supabase = useSupabaseClient();
const {
  data: { session },
} = await supabase.auth.getSession();

async function getTasksAPI() {
  const { data } = await $fetch<TResponse<TTask[]>>(
    `${config.public.backendUrl}/api/task`,
    {
      headers: {
        Authorization: `Bearer ${session?.access_token}`,
      },
    }
  );

  return data;
}

const { data, status } = await useAsyncData<TTask[]>("tasks", () =>
  getTasksAPI()
);

const tasks = data?.value || null;

const buildData = tasks
  ? TASK_STATUS.map((stat) => {
      return {
        ...stat,
        data: tasks.filter((task) => {
          return task.status == stat.key ? task : undefined;
        }),
      };
    })
  : [];

const openModal = (data: TTask) => {
  dialogVisible.value = true;
  chosenTask.value = data;
};
</script>

<template>
  <div v-if="status === 'pending'">Loading ...</div>
  <div class="grid gap-6 grid-cols-[repeat(5,1fr)] my-8" v-else>
    <div v-for="state in buildData" :key="state.id">
      <div class="border border-green-700">
        <div class="p-2 border-b">
          <h2 class="text-md text-center font-bold" :class="state.color">
            {{ state.label }}
          </h2>
        </div>

        <div class="p-2 flex flex-col gap-2 max-h-[70vh] overflow-auto">
          <template v-if="state.data.length > 0">
            <card-task
              v-for="task in state.data"
              :key="task.id"
              :task="task"
              @click="openModal(task)"
            />
          </template>
          <div
            v-else
            class="text-sm text-gray-400 font-bold h-20 flex justify-center items-center"
          >
            No Task
          </div>
        </div>
      </div>
    </div>
  </div>

  <Dialog
    v-model:visible="dialogVisible"
    modal
    header="Edit Profile"
    :style="{ width: '80rem' }"
  >
    <template #header>
      <div class="inline-flex items-center justify-center gap-2">
        <span class="font-bold whitespace-nowrap">{{ chosenTask?.title }}</span>
      </div>
    </template>
    <template v-if="chosenTask">
      <add-form :task="chosenTask" />
    </template>
  </Dialog>
</template>
