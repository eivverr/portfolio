<script setup lang="ts"></script>

<template>
    <img
        src="@/assets/img/arrow-select.png"
        alt="Select Arrow"
        class="absolute left-[-35px] w-[55px] h-[55px] arrow-select"
    />
</template>

<style scoped>
.arrow-select {
    animation: arrow-select 0.75s ease-in-out infinite;
}

@keyframes arrow-select {
    0% {
        transform: translateX(0);
    }
    50% {
        transform: translateX(10px);
    }
    100% {
        transform: translateX(0);
    }
}
</style>
