<script setup lang="ts">
import InfoLine from '@/components/misc/InfoLine.vue'
import CardProject from '@/components/misc/CardProject.vue'
import { projects } from '@/data/projectsData.ts'
import { nextTick, onMounted, onUnmounted, ref } from 'vue'

const emit = defineEmits<{
    (e: 'hasDetails'): void
    (e: 'seeDetails'): void
    (e: 'closeDetails'): void
}>()

const isCheckingProjects = ref(false)
const currentProjectIndex = ref<number | null>(null)
const lastProjectIndex = ref<number | null>(null)
const currentProject = ref<Project | null>(null)
const projectElements = ref<(any | null)[]>([])

function setProjectElement(el: any | null, index: number) {
    projectElements.value[index] = el
}

function setCurrentProject(index: number) {
    if (index < 0 || index >= projects.length || index === currentProjectIndex.value) {
        return
    }

    if (currentProjectIndex.value !== null) {
        lastProjectIndex.value = currentProjectIndex.value
    }

    currentProjectIndex.value = index
    currentProject.value = projects[index]
    isCheckingProjects.value = true
    emit('seeDetails')

    nextTick(() => {
        const elements = projectElements.value
        if (!elements.length) return

        const target =
            lastProjectIndex.value !== null && lastProjectIndex.value < index
                ? elements[index - 2]
                : elements[index - 1]

        if (target instanceof HTMLElement) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start',
                inline: 'start',
            })
        }
    })
}

function resetCurrentProject() {
    currentProjectIndex.value = null
    lastProjectIndex.value = null
    currentProject.value = null
    isCheckingProjects.value = false
    emit('closeDetails')
}

const handleKeyDown = (event: KeyboardEvent) => {
    if ((event.key === 'a' || event.key === 'A') && !currentProject.value) {
        setCurrentProject(0)
    } else if (event.key === 'Escape' || event.key === 'b' || event.key === 'B') {
        resetCurrentProject()
    } else if (event.key === 'ArrowDown') {
        if (currentProjectIndex.value !== null && currentProjectIndex.value < projects.length - 1) {
            setCurrentProject(currentProjectIndex.value + 1)
        }
    } else if (event.key === 'ArrowUp') {
        if (currentProjectIndex.value !== null && currentProjectIndex.value > 0) {
            setCurrentProject(currentProjectIndex.value - 1)
        }
    }
}

onMounted(() => {
    emit('hasDetails')
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
    <div class="flex flex-col">
        <div
            class="reverse-direction flex flex-col pl-10 ml-6 mb-20 max-h-[calc(64px*4)] overflow-y-auto snap-y snap-mandatory"
        >
            <CardProject
                v-for="(project, i) in projects"
                :key="i"
                :ref="(el) => setProjectElement((el as any)?.root ?? null, i)"
                :project="project"
                :active="currentProjectIndex === i"
                @mousedown.prevent
                @click="setCurrentProject(i)"
            />
        </div>

        <div v-if="isCheckingProjects" class="flex flex-col gap-1">
            <InfoLine title="Catégorie" shadow>
                <p class="text-lg">{{ currentProject?.category }}</p>
            </InfoLine>
            <InfoLine title="Nb. Personnes" shadow>
                <p class="text-lg">{{ currentProject?.nbPeople }}</p>
            </InfoLine>
            <InfoLine title="Lien" shadow>
                <a :href="currentProject?.link" target="_blank">Voir le projet</a>
            </InfoLine>
            <div class="border-box h-[100px] bg-white py-2 px-10 text-lg shadow-md">
                <p>{{ currentProject?.description }}</p>
            </div>
        </div>
    </div>
</template>

<style scoped>
.reverse-direction {
    direction: rtl;
}

.reverse-direction > * {
    direction: ltr;
}
</style>
