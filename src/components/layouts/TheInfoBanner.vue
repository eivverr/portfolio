<script setup lang="ts">
import { useBirthday } from '@/composables/useBirthday.ts'

const { currentAge } = useBirthday()
</script>

<template>
    <div
        class="self-end flex items-center gap-16 box-border mt-6 px-5 py-2 w-[650px] h-[50px] bg-black text-white"
        style="clip-path: polygon(2.9% 0, 100% 0, 100% 100%, 0% 100%)"
    >
        <img
            src="@/assets/img/sprite-masterball.png"
            alt="Sprite Master Ball"
            class="h-full w-auto"
            style="image-rendering: pixelated"
        />
        <p class="text-xl font-bold">Eivver</p>
        <span class="text-xl font-bold">N. {{ currentAge }}</span>
        <img
            src="@/assets/img/male-gender.svg"
            alt="Male gender icon"
            class="h-6 w-auto bg-blue-600 rounded-full"
        />
    </div>
</template>

<style scoped></style>
