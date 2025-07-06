<script setup lang="ts">
import { computed } from 'vue'

const props = defineProps<{
    project: Project
}>()

const name = computed(() =>
    props.project?.language.shortName
        ? props.project?.language.shortName
        : props.project?.language.name,
)
</script>

<template>
    <div
        class="flex items-center text-white rounded-sm w-[135px] h-1/2 text-2xl font-bold uppercase overflow-hidden"
        :style="{ backgroundColor: props.project?.language.color }"
    >
        <i
            class="flex items-center h-full pl-1"
            :class="`devicon-${props.project?.language.name.toLowerCase()}-plain`"
        ></i>
        <p
            class="w-full text-center pl-2"
            style="
                background-color: rgba(77, 77, 77, 0.9);
                clip-path: polygon(13% 0, 100% 0, 100% 100%, 0% 100%);
            "
        >
            {{ name }}
        </p>
    </div>
</template>

<style scoped></style>
