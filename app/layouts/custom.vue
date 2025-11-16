<template>
  <header
    class="p-4 flex justify-between border-b-[1px] border-green-700 items-center"
  >
    <h1 class="text-sm text-green-700 font-bold">
      <span class="pi-list"></span>
      TMS
    </h1>

    <Button
      icon="pi pi-sign-out"
      size="small"
      severity="danger"
      aria-label="Logout"
      variant="text"
      label="Logout"
    />
  </header>
  <div>
    <slot />
  </div>
</template>
