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
</script>

<template>
  <div>
    <div v-if="status === 'pending'">Loading ...</div>
    <div class="grid gap-6 grid-cols-[repeat(5,1fr)] my-8" v-else>
      <div v-for="state in buildData" :key="state.id">
        <div class="border border-green-700">
          <div class="p-2 border-b">
            <h2 class="text-md text-center font-bold" :class="state.color">
              {{ state.label }}
            </h2>
          </div>

          <div class="p-2 flex flex-col gap-2">
            <template v-if="state.data.length > 0">
              <card-task
                v-for="task in state.data"
                :key="task.id"
                :task="task"
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
  </div>
</template>
