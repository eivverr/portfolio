<script setup lang="ts">
const props = withDefaults(
    defineProps<{
        size?: 'small' | 'medium'
    }>(),
    {
        size: 'medium',
    },
)
</script>

<template>
    <div
        class="box-content flex bg-white border-l-20 shadow-md"
        :class="{
            'h-[325px]': props.size === 'small',
            'h-[375px]': props.size === 'medium',
        }"
        style="border-color: var(--color-grey-light)"
    >
        <slot />
    </div>
</template>

<style scoped></style>
