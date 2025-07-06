<script setup lang="ts">
import TypeCustom from '@/components/misc/TypeCustom.vue'
import { ref } from 'vue'
import ArrowSelect from '@/components/misc/ArrowSelect.vue'

const props = defineProps<{
    project: Project
    active: boolean
}>()

const root = ref<HTMLElement | null>(null)

defineExpose({ root })
</script>

<template>
    <div
        ref="root"
        :class="[
            'relative flex items-center w-full h-[60px] min-h-[60px] mb-1 rounded-full shadow-md text-2xl cursor-pointer snap-start ',
            props.active ? 'bg-black text-white' : 'bg-white hover:bg-[#dbdbd9]',
        ]"
    >
        <p class="pl-6">{{ props.project.name }}</p>
        <div class="flex items-center h-full ml-auto">
            <TypeCustom :project="props.project" />
            <span
                class="flex items-center px-8 h-full bg-[#4d4d4d] text-white rounded-r-full"
                style="clip-path: polygon(20% 0, 100% 0, 100% 100%, 0% 100%)"
            >
                10/10
            </span>
        </div>

        <ArrowSelect v-if="props.active" />
    </div>
</template>

<style scoped></style>
