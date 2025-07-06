<script setup lang="ts">
import { useRoute, useRouter } from 'vue-router'
import { computed, onMounted, onUnmounted, ref } from 'vue'
import { useNavigationStore } from '@/stores/navigationStore.ts'

const navigationStore = useNavigationStore()
const router = useRouter()
const currentRoute = useRoute()
const leftArrowAnim = ref(false)
const rightArrowAnim = ref(false)
const images = import.meta.glob('@/assets/img/nav-icons/*', { eager: true, import: 'default' })

const navRoutes = computed(() => router.getRoutes().filter((r) => r.name && r.name !== 'home'))

function getNavIcon(routeName: string, color: string, imageType: string): string {
    return images[`/src/assets/img/nav-icons/nav-icon-${routeName}-${color}.${imageType}`] || ''
}

function animateArrow(direction: 'left' | 'right') {
    if (direction === 'left') {
        leftArrowAnim.value = true
        setTimeout(() => (leftArrowAnim.value = false), 300)
    } else {
        rightArrowAnim.value = true
        setTimeout(() => (rightArrowAnim.value = false), 300)
    }
}

function nextRoute() {
    const currentIndex = navRoutes.value.findIndex((route) => route.path === currentRoute.path)
    const nextIndex = (currentIndex + 1) % navRoutes.value.length
    animateArrow('right')
    router.push(navRoutes.value[nextIndex].path)
}

function previousRoute() {
    const currentIndex = navRoutes.value.findIndex((route) => route.path === currentRoute.path)
    const previousIndex = (currentIndex - 1 + navRoutes.value.length) % navRoutes.value.length
    animateArrow('left')
    router.push(navRoutes.value[previousIndex].path)
}

const handleKeyDown = (event: KeyboardEvent) => {
    if (event.key === 'ArrowRight' && navigationStore.canChangeRoute) {
        nextRoute()
    } else if (event.key === 'ArrowLeft' && navigationStore.canChangeRoute) {
        previousRoute()
    }
}

onMounted(() => {
    document.addEventListener('keydown', handleKeyDown)
})

onUnmounted(() => {
    document.removeEventListener('keydown', handleKeyDown)
})
</script>

<template>
    <nav class="flex items-end justify-center gap-4 h-[55px] my-[10px]">
        <img
            src="@/assets/img/caret-left.png"
            alt="Caret Left"
            class="nav-arrow"
            :class="{ 'nav-arrow--animate-left': leftArrowAnim }"
            @click="previousRoute"
        />

        <RouterLink
            v-for="route in navRoutes"
            :key="route.path"
            :to="route.path"
            class="flex items-end h-full"
        >
            <img
                :src="
                    currentRoute.name === route.name
                        ? getNavIcon(route.name, 'black', route.name === 'infos' ? 'png' : 'svg')
                        : getNavIcon(route.name, 'white', route.name === 'infos' ? 'png' : 'svg')
                "
                alt="Nav Icon"
                :class="['nav-item', currentRoute.name === route.name ? 'nav-item--active' : '']"
            />
        </RouterLink>

        <img
            src="@/assets/img/caret-right.png"
            alt="Caret Right"
            class="nav-arrow"
            :class="{ 'nav-arrow--animate-right': rightArrowAnim }"
            @click="nextRoute"
        />
    </nav>
</template>

<style scoped>
.nav-arrow {
    height: 45px;
    width: auto;
    cursor: pointer;
    filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, 0.5));
}

.nav-arrow--animate-left {
    animation: slide-left 0.1s ease;
}

.nav-arrow--animate-right {
    animation: slide-right 0.1s ease;
}

@keyframes slide-left {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(-8px);
    }
    100% {
        transform: translateX(0);
    }
}

@keyframes slide-right {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(8px);
    }
    100% {
        transform: translateX(0);
    }
}

.nav-item {
    height: 45px;
    width: 45px;
    color: white;
    transform-origin: bottom;
    transition: transform 200ms;
    filter: drop-shadow(-1px 1px 1px rgba(0, 0, 0, 0.5));
}

.nav-item:hover {
    transform: scale(1.22);
}

.nav-item--active {
    transform: scale(1.22);
    filter: none;
}
</style>
