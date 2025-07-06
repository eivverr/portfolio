<script setup lang="ts">
import { onMounted, onUnmounted, ref } from 'vue'
import '@google/model-viewer'

const container = ref<HTMLDivElement | null>(null)
const scale = ref<number>(1)
const offsetX = ref<number>(0)
const offsetY = ref<number>(0)
const SWITCH_WIDTH = 1280
const SWITCH_HEIGHT = 720

function resize() {
    if (!container.value) return

    const containerWidth = container.value.clientWidth
    const containerHeight = container.value.clientHeight

    const scaleX = containerWidth / SWITCH_WIDTH
    const scaleY = containerHeight / SWITCH_HEIGHT

    scale.value = Math.min(scaleX, scaleY)

    // Calcul du centrage manuel
    offsetX.value = (containerWidth - SWITCH_WIDTH * scale.value) / 2
    offsetY.value = (containerHeight - SWITCH_HEIGHT * scale.value) / 2
}

onMounted(() => {
    resize()
    window.addEventListener('resize', resize)
})

onUnmounted(() => {
    window.removeEventListener('resize', resize)
})
</script>

<template>
    <div ref="container" class="relative w-full bg-stone-800" style="height: 100vh">
        <div
            class="absolute top-0 left-0 origin-top-left bg-gradient"
            :style="{
                width: `${SWITCH_WIDTH}px`,
                height: `${SWITCH_HEIGHT}px`,
                transform: `translate(${offsetX}px, ${offsetY}px) scale(${scale})`,
            }"
        >
            <div
                class="bg flex w-[600px]"
                style="filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))"
            >
                <div class="bg-dark-red"></div>
            </div>
            <div class="bg bg-red"></div>

            <img class="pokeball" src="@/assets/img/pokeball.png" />

            <RouterView />
        </div>
    </div>
</template>

<style scoped>
.bg-gradient {
    background: #ffffff;
    background: linear-gradient(45deg, rgba(255, 255, 255, 1) 30%, rgba(228, 236, 255, 1) 100%);
}

.bg {
    position: absolute;
    top: 0;
    left: 0;
    height: 100%;
    z-index: -1;
}

.bg-dark-red {
    background-color: var(--color-dark-red);
    flex-grow: 1;
    width: 100%;
    clip-path: polygon(0 0, 100% 0, 50% 100%, 0% 100%);
}

.bg-red {
    background-color: var(--color-red);
    width: 475px;
    clip-path: polygon(0 0, 100% 0, 35% 100%, 0% 100%);
}

.pokeball {
    position: absolute;
    bottom: 0;
    right: 0;
    width: 500px;
    z-index: -1;
}
</style>
