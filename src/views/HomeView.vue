<script setup lang="ts">
import TheFooter from '@/components/layouts/TheFooter.vue'
import TheNavbar from '@/components/layouts/TheNavbar.vue'
import TheInfoBanner from '@/components/layouts/TheInfoBanner.vue'
import { ref, watch } from 'vue'
import { useRoute } from 'vue-router'
import { useSeeDetailsStore } from '@/stores/seeDetailsStore.ts'

const seeDetailsStore = useSeeDetailsStore()
const route = useRoute()
const hasDetails = ref(false)

watch(
    () => route.fullPath,
    () => {
        hasDetails.value = false
        seeDetailsStore.setShowDetails(false)
    },
)
</script>

<template>
    <main class="flex flex-col w-full h-full">
        <div class="relative grow flex">
            <div class="flex flex-col w-[600px]">
                <TheNavbar />

                <div class="grow">
                    <RouterView v-slot="{ Component }">
                        <component
                            :is="Component"
                            @hasDetails="hasDetails = true"
                            @seeDetails="seeDetailsStore.setShowDetails(true)"
                            @closeDetails="seeDetailsStore.setShowDetails(false)"
                        />
                    </RouterView>
                </div>
            </div>

            <div class="flex flex-col w-[680px]">
                <TheInfoBanner />

                <div class="grow flex justify-center px-5 pt-5 pb-20">
                    <!--<model-viewer src="/3d_model/loris.glb" camera-orbit="25deg auto auto" autoplay />-->
                    <img
                        src="@/assets/img/Spr_B2W2_Blue.png"
                        alt="Sprite Black 2/White 2 Blue"
                        class="h-full w-auto"
                        style="image-rendering: pixelated"
                    />
                </div>
            </div>

            <div
                v-if="hasDetails && !seeDetailsStore.showDetails"
                class="absolute bottom-0 right-0 w-[300px] h-[50px]"
                style="filter: drop-shadow(0px 0px 10px rgba(0, 0, 0, 0.5))"
            >
                <div
                    class="flex items-center justify-center gap-2 w-full h-full bg-white text-2xl"
                    style="clip-path: polygon(7% 0, 100% 0, 100% 100%, 0% 100%)"
                >
                    <span
                        class="flex items-center justify-center w-[25px] h-[25px] font-bold text-white bg-black rounded-full"
                    >
                        A
                    </span>
                    <p>Voir les détails</p>
                </div>
            </div>
        </div>

        <TheFooter />
    </main>
</template>

<style scoped></style>
