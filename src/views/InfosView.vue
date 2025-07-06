<script setup lang="ts">
import InfoLineGroup from '@/components/misc/InfoLineGroup.vue'
import InfoLine from '@/components/misc/InfoLine.vue'
import { useBirthday } from '@/composables/useBirthday.ts'

const { daysSinceBorn, daysUntilBirthday } = useBirthday()
</script>

<template>
    <div class="flex flex-col gap-1">
        <InfoLineGroup>
            <InfoLine title="Name">
                <p class="text-lg">Loris Weier</p>
            </InfoLine>
            <InfoLine title="Type">
                <img
                    src="@/assets/img/type-acier.png"
                    alt="Type Acier"
                    class="h-2/3 w-auto rounded"
                />
            </InfoLine>
            <InfoLine title="Status actuel">
                <p class="text-lg">Étudiant en Informatique</p>
            </InfoLine>
            <InfoLine title="Github">
                <a href="https://github.com/eivverr" target="_blank" class="text-lg"
                    >github.com/eivverr</a
                >
            </InfoLine>
        </InfoLineGroup>

        <InfoLineGroup>
            <InfoLine title="Points d'Expérience">
                <p class="text-lg">{{ daysSinceBorn }}</p>
            </InfoLine>
            <InfoLine title="Niveau suivant">
                <div class="flex flex-col w-full text-right">
                    <p class="m-0">{{ daysUntilBirthday }}</p>
                    <progress :value="365 - daysUntilBirthday" max="365"></progress>
                </div>
            </InfoLine>
        </InfoLineGroup>

        <div class="flex flex-col shadow-md">
            <InfoLine title="Objet">
                <div class="flex items-center h-full text-lg">
                    <img src="@/assets/img/object.png" alt="Objet" class="h-full w-auto pr-2" />
                    Adresse mail
                </div>
            </InfoLine>
            <div class="flex border-box h-[100px] bg-white py-2 px-10 text-lg">
                <p>
                    Cet objet permet à son détenteur d'être contacté via cette adresse mail :
                    <a href="mailto:loris.weier57@gmail.com">loris.weier57@gmail.com</a>
                </p>
            </div>
        </div>
    </div>
</template>

<style scoped></style>
