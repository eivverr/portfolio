<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        title: string
        shadow?: boolean
    }>(),
    {
        shadow: false,
    },
)
</script>

<template>
    <div class="flex h-[40px] box-content" :class="{ 'shadow-md': props.shadow }">
        <div
            class="flex items-center justify-center w-[45%]"
            style="background-color: var(--color-grey-light)"
        >
            <p class="text-lg">{{ props.title }}</p>
        </div>
        <div class="grow flex items-center bg-white px-6">
            <slot />
        </div>
    </div>
</template>

<style scoped></style>
