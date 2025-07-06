<script setup lang="ts">
import InfoBlock from '@/components/misc/InfoBlock.vue'
import InfoLine from '@/components/misc/InfoLine.vue'
import ChartRadar from '@/components/misc/ChartRadar.vue'
</script>

<template>
    <div class="flex flex-col gap-1">
        <InfoBlock>
            <ChartRadar />
        </InfoBlock>

        <div class="flex flex-col shadow-md">
            <InfoLine title="Talent">
                <p class="text-lg">Adaptabilité</p>
            </InfoLine>
            <div class="flex border-box h-[100px] bg-white py-2 px-10 text-lg">
                <p>Peut s'adapter à n'importe quelle situation.</p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
