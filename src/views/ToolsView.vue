<script setup lang="ts">
import InfoBlock from '@/components/misc/InfoBlock.vue'
import InfoLine from '@/components/misc/InfoLine.vue'
import { tools } from '@/data/toolsData.ts'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'
import { useNavigationStore } from '@/stores/navigationStore.ts'
import ArrowSelect from '@/components/misc/ArrowSelect.vue'

const emit = defineEmits<{
    (e: 'hasDetails'): void
    (e: 'seeDetails'): void
    (e: 'closeDetails'): void
}>()

const navigationStore = useNavigationStore()
const isCheckingTools = ref(false)
const currentToolIndex = ref<number | null>(null)
const currentTool = ref<Tool | null>(null)
const toolElements = ref<(HTMLElement | null)[]>([])

function setToolElement(el: HTMLElement | null, index: number) {
    toolElements.value[index] = el
}

function imageName(name: string) {
    const nameLower = name.toLowerCase().replace(/\./g, '')
    return `https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/${nameLower}/${nameLower}-original.svg`
}

function setCurrentTool(index: number, canScrollIntoView: boolean = true) {
    if (index < 0 || index >= tools.length) {
        return
    }

    currentToolIndex.value = index
    currentTool.value = tools[index]
    isCheckingTools.value = true
    navigationStore.setCanChangeRoute(false)
    emit('seeDetails')

    nextTick(() => {
        if (!canScrollIntoView) return
        const elements = toolElements.value
        if (!elements.length) return

        const target = elements[index - 5]

        if (target instanceof HTMLElement) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
            })
        }
    })
}

function resetCurrentTool() {
    currentToolIndex.value = null
    currentTool.value = null
    isCheckingTools.value = false
    navigationStore.setCanChangeRoute(true)
    emit('closeDetails')
}

const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'a' || event.key === 'A') && !currentTool.value) {
        setCurrentTool(0)
    } else if (event.key === 'Escape' || event.key === 'b' || event.key === 'B') {
        resetCurrentTool()
    } else if (event.key === 'ArrowDown') {
        if (currentToolIndex.value !== null && currentToolIndex.value < tools.length - 1) {
            setCurrentTool(currentToolIndex.value + 5)
        }
    } else if (event.key === 'ArrowUp') {
        if (currentToolIndex.value !== null && currentToolIndex.value > 0) {
            setCurrentTool(currentToolIndex.value - 5)
        }
    } else if (event.key === 'ArrowRight') {
        if (currentToolIndex.value !== null && currentToolIndex.value % 5 !== 4) {
            setCurrentTool(currentToolIndex.value + 1, false)
        }
    } else if (event.key === 'ArrowLeft') {
        if (currentToolIndex.value !== null && currentToolIndex.value % 5 !== 0) {
            setCurrentTool(currentToolIndex.value - 1, false)
        }
    }
}

onMounted(() => {
    emit('hasDetails')
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    navigationStore.setCanChangeRoute(true)
    document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
    <div class="flex flex-col gap-3">
        <InfoBlock size="small">
            <div class="py-2 w-full h-full">
                <div
                    class="flex flex-wrap gap-3 px-9 py-2 w-full h-full overflow-y-auto snap-y snap-mandatory"
                >
                    <div
                        v-for="(tool, i) in tools"
                        :key="i"
                        :ref="(el) => setToolElement(el, i)"
                        class="relative flex items-center justify-center p-2 w-[90px] h-[90px] shadow-md/20 snap-start cursor-pointer bg-white hover:bg-[#dbdbd9]"
                        @mousedown.prevent
                        @click="setCurrentTool(i)"
                    >
                        <img
                            :src="imageName(tool.name)"
                            :alt="`${tool.name} Icon`"
                            class="w-full h-auto"
                        />

                        <ArrowSelect v-if="currentToolIndex === i" />
                    </div>
                </div>
            </div>
        </InfoBlock>

        <div v-if="isCheckingTools" class="flex flex-col gap-1">
            <div class="flex flex-col shadow-md">
                <InfoLine title="Nom">
                    <p class="text-lg">{{ currentTool?.name }}</p>
                </InfoLine>
                <div class="flex border-box h-[125px] bg-white py-2 px-10 text-lg">
                    <p>{{ currentTool?.description }}</p>
                </div>
            </div>

            <InfoLine title="Niv. de maîtrise" shadow>
                <p class="text-lg">{{ currentTool?.masteryLevel }}</p>
            </InfoLine>
        </div>
    </div>
</template>

<style scoped></style>
